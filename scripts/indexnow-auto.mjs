// Post-deploy IndexNow run: submits only URLs that are new, meaningfully changed or gone since the last run.
//
//   node scripts/indexnow-auto.mjs --state <dir> --manifest dist/build-manifest.json [--commit <sha>] [--wait <s>] [--dry] [--force]
//   node scripts/indexnow-auto.mjs --state <dir> --manifest dist/build-manifest.json --baseline   one-off: store baseline, submit nothing
//
// Runs in GitHub Actions after `npm run build` of the pushed commit (.github/workflows/indexnow.yml; state on branch
// `indexnow-state`). Cloudflare challenges requests from GitHub runner IPs (managed challenge on every HTML/JSON URL),
// so this script never depends on fetching pages from the site:
//   1. Deployment: the "Workers Builds" check-run of the commit (GitHub API, authenticated) must be completed + success.
//      As an extra confirmation /deploy-version.txt is read from production; if it shows ANOTHER commit we keep waiting,
//      if Cloudflare challenges it the check-run alone stands. No check-run success → BLOCKED, nothing submitted.
//   2. Content: the build is deterministic (hashes equal the live site's, verified), so the CI build manifest is what
//      was deployed. diff(previous manifest in state, this manifest) → added / updated / removed canonical URLs.
//   3. Eligibility and removed-URL handling come from the build output (canonical, noindex, _redirects, missing file).
//   4. Batch submit with retries; 200/202 is never repeated; the rest stays in `pending`. Never the full sitemap.
//   5. Safety: a newer commit on main supersedes this run; a very large diff is held for a manual run (--force).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProbe, diffManifests, isChallenge, KEY, ORIGIN, submitIndexNow } from './lib/indexnow-core.mjs';

const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));
const HISTORY_LIMIT = 30;
const MAX_AUTO_URLS = 500; // larger diffs are held for a manual run: a site-wide template change should be a decision
const UA = { 'User-Agent': 'space-glass-indexnow/1.0 (+https://space-glass.com.ua)' };
const GH = (token) => ({ ...UA, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {}) });
const timeout = () => AbortSignal.timeout(20000);

/** State of the Cloudflare Workers Builds check-run of a commit: success | failure | pending | missing | auth-error | unavailable. */
async function checkRunState({ fetchImpl, repo, token, commit }) {
  try {
    const res = await fetchImpl(`https://api.github.com/repos/${repo}/commits/${commit}/check-runs?per_page=100`, { headers: GH(token), signal: timeout() });
    if (res.status === 401 || res.status === 403 || res.status === 404) return { state: 'auth-error', detail: `HTTP ${res.status}` };
    if (res.status !== 200) return { state: 'unavailable', detail: `HTTP ${res.status}` };
    const run = (await res.json()).check_runs?.find((c) => /^Workers Builds/i.test(c.name));
    if (!run) return { state: 'missing' };
    if (run.status !== 'completed') return { state: 'pending' };
    return run.conclusion === 'success' ? { state: 'success' } : { state: 'failure', detail: run.conclusion };
  } catch (e) {
    return { state: 'unavailable', detail: e.message };
  }
}

/** What production says about its own version: { sha } | { challenged } | { unavailable }. */
async function productionVersion(fetchImpl) {
  try {
    const res = await fetchImpl(`${ORIGIN}/deploy-version.txt?t=${Date.now()}`, { headers: { 'Cache-Control': 'no-cache', ...UA }, signal: timeout() });
    const text = (await res.text().catch(() => '')).trim();
    if (isChallenge(res, text)) return { challenged: true };
    if (res.status === 200 && /^[0-9a-f]{40}$/.test(text)) return { sha: text };
    return { unavailable: `HTTP ${res.status}` };
  } catch (e) {
    return { unavailable: e.message };
  }
}

/** Waits for the deployment of `commit`. Returns { ok, via } or { blocked }. */
export async function confirmDeployment({ commit, fetchImpl = fetch, sleep = defaultSleep, waitMs = 0, pollMs = 30000, repo, token, log = () => {} }) {
  const deadline = Date.now() + waitMs;
  let last = 'no answer yet';
  let unreadable = 0;
  for (;;) {
    const check = await checkRunState({ fetchImpl, repo, token, commit });
    if (check.state === 'auth-error') return { blocked: `GITHUB API AUTH FAILED (${check.detail}): cannot verify the deployment` };
    if (check.state === 'failure') return { blocked: `DEPLOYMENT FAILED: Workers Builds check-run concluded "${check.detail}"` };
    if (check.state === 'success') {
      const prod = await productionVersion(fetchImpl);
      if (prod.sha === commit) return { ok: true, via: 'Workers Builds check-run + production /deploy-version.txt' };
      if (prod.sha) { last = `production serves ${prod.sha.slice(0, 7)}, expected ${commit.slice(0, 7)}`; log(`waiting: ${last}`); }
      else if (++unreadable >= 3) {
        // Cloudflare challenge / outage on the public file: the authenticated deployment status stands on its own.
        log(`production version unverifiable (${prod.challenged ? 'Cloudflare challenge' : prod.unavailable}); relying on the Workers Builds check-run`);
        return { ok: true, via: 'Workers Builds check-run (production SHA unverifiable)' };
      } else log(`production version not readable (${prod.challenged ? 'Cloudflare challenge' : prod.unavailable}), retrying`);
    } else {
      last = check.state === 'pending' ? 'Workers Builds still running' : check.state === 'missing' ? 'no Workers Builds check-run for this commit yet' : `GitHub API ${check.detail}`;
      log(`waiting: ${last}`);
    }
    if (Date.now() >= deadline) return { blocked: `DEPLOYMENT NOT CONFIRMED in time: ${last}` };
    await sleep(pollMs);
  }
}

/** True when main has moved past `commit` (a newer run handles the cumulative diff). */
export async function isSuperseded({ commit, fetchImpl = fetch, repo, token }) {
  try {
    const res = await fetchImpl(`https://api.github.com/repos/${repo}/git/ref/heads/main`, { headers: GH(token), signal: timeout() });
    if (res.status !== 200) return false;
    const sha = (await res.json()).object?.sha;
    return Boolean(sha) && sha !== commit;
  } catch {
    return false;
  }
}

async function pMap(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]); }
  }));
  return out;
}

export async function run({
  state = {}, manifest, commit = manifest?.commit, probe, deploy, superseded = async () => false, keyServed = async () => true,
  fetchImpl = fetch, sleep = defaultSleep, dry = false, force = false, maxUrls = MAX_AUTO_URLS, retries = 4, retryDelayMs = 30000, now = () => new Date().toISOString()
}) {
  const result = { status: '', reason: '', commit, verifiedVia: null, changed: { added: [], updated: [], removed: [] }, submitted: 0, accepted: 0, failed: 0, dropped: [], removedHandling: [], responses: [], pending: 0 };
  const next = structuredClone({ version: 1, lastCommit: null, manifest: null, pending: [], history: [], ...state });
  const advance = () => { next.manifest = { commit: manifest.commit, pages: manifest.pages }; next.lastCommit = manifest.commit; };
  const record = () => {
    next.history = [{ at: now(), commit, status: result.status, submitted: result.submitted, accepted: result.accepted, failed: result.failed, reason: result.reason }, ...next.history].slice(0, HISTORY_LIMIT);
    result.pending = next.pending.length;
    return { ...result, nextState: dry ? state : next };
  };
  const stop = (status, reason) => ({ ...result, status, reason, pending: state.pending?.length ?? 0, nextState: state });

  if (manifest.commit !== commit) return stop('BLOCKED', `LOCAL BUILD MISMATCH: build manifest is for ${String(manifest.commit).slice(0, 7)}, expected ${String(commit).slice(0, 7)}`);
  if (await superseded()) return stop('SKIPPED', 'SUPERSEDED BY A NEWER COMMIT: its own run handles the diff');

  if (!next.manifest) {
    advance();
    result.status = 'BASELINE';
    result.reason = 'no previous manifest: baseline stored, nothing submitted';
    return record();
  }
  if (next.lastCommit === commit && !next.pending.length) return stop('SKIPPED', 'ALREADY PROCESSED: this commit was handled before');

  // Nothing may advance the baseline (or be submitted) before the deployment is confirmed.
  const dep = await deploy();
  if (dep.blocked) return stop('BLOCKED', dep.blocked);
  result.verifiedVia = dep.via;
  if (await superseded()) return stop('SKIPPED', 'SUPERSEDED BY A NEWER COMMIT: its own run handles the diff');

  const diff = diffManifests(next.manifest, manifest);
  result.changed = diff;
  const wantLive = new Map();
  const wantGone = new Map();
  for (const p of diff.added) wantLive.set(p, 'added');
  for (const p of diff.updated) wantLive.set(p, 'updated');
  for (const p of diff.removed) wantGone.set(p, 'removed');
  for (const item of next.pending) {
    if (item.kind === 'removed') { if (!(item.path in manifest.pages)) wantGone.set(item.path, 'removed'); }
    else if (item.path in manifest.pages) wantLive.set(item.path, wantLive.get(item.path) ?? item.kind);
  }

  if (!wantLive.size && !wantGone.size) {
    advance();
    result.status = 'SKIPPED';
    result.reason = 'NO CHANGED URLS';
    return record();
  }
  if (wantLive.size + wantGone.size > maxUrls && !force) {
    return stop('HELD', `LARGE CHANGE: ${wantLive.size + wantGone.size} URLs exceed the automatic limit of ${maxUrls}; nothing submitted, state kept. Run the workflow manually with "force" to send them`);
  }

  if (!(await keyServed())) {
    // Nothing is lost: pending keeps every URL, the baseline moves on so the diff is not recomputed.
    for (const [p, kind] of [...wantLive, ...wantGone]) if (!next.pending.some((x) => x.path === p)) next.pending.push({ path: p, kind });
    advance();
    result.status = 'FAILED';
    result.reason = 'IndexNow key file is not served by production; URLs kept as pending';
    return record();
  }

  const toSend = new Map();
  await pMap([...wantLive], 12, async ([p, kind]) => {
    const r = await probe(p);
    if (r.kind === 'live') toSend.set(p, kind);
    else result.dropped.push({ path: p, why: `not indexable (${r.kind}${r.status ? ' ' + r.status : ''})` });
  });
  await pMap([...wantGone], 12, async ([p, kind]) => {
    const r = await probe(p);
    if (r.kind === 'gone' || r.kind === 'redirect' || r.kind === 'noindex') {
      toSend.set(p, kind);
      result.removedHandling.push({ path: p, handling: r.kind === 'gone' ? `${r.status} (gone)` : r.kind === 'redirect' ? `${r.status} redirect` : 'noindex' });
    } else result.dropped.push({ path: p, why: `left the sitemap but the build still serves it (${r.kind}); not submitted as removed` });
  });

  const urls = [...toSend.keys()].sort().map((p) => ORIGIN + p);
  result.submitted = urls.length;
  next.pending = [];
  if (dry) {
    result.status = urls.length ? 'DRY-RUN' : 'SKIPPED';
    result.reason = urls.length ? `would submit ${urls.length} URL(s)` : 'NO ELIGIBLE URLS';
    result.wouldSubmit = urls;
    return { ...result, nextState: state };
  }
  if (urls.length && await superseded()) return stop('SKIPPED', 'SUPERSEDED BY A NEWER COMMIT during the run: nothing submitted');

  if (urls.length) {
    const sent = await submitIndexNow(urls, { fetchImpl, sleep, retries, baseDelayMs: retryDelayMs });
    result.accepted = sent.accepted.length;
    result.failed = sent.failed.length;
    result.responses = sent.responses;
    for (const url of sent.failed) { const p = new URL(url).pathname; next.pending.push({ path: p, kind: toSend.get(p) }); }
  }
  advance();
  if (!urls.length) { result.status = 'SKIPPED'; result.reason = 'NO ELIGIBLE URLS'; }
  else if (!result.failed) result.status = 'SUBMITTED';
  else { result.status = 'FAILED'; result.reason = `${result.failed} URL(s) not accepted by the IndexNow API; kept as pending for retry`; }
  return record();
}

function parseArgs(argv) {
  const get = (name) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : null; };
  return { stateDir: get('--state'), manifestFile: get('--manifest'), dist: get('--dist') ?? 'dist', commit: get('--commit'), waitS: Number(get('--wait') ?? 0), dry: argv.includes('--dry'), force: argv.includes('--force'), baseline: argv.includes('--baseline') };
}

function summary(r) {
  const lines = [
    '### IndexNow after deploy',
    `INDEXNOW STATUS: ${r.status}${r.reason ? `\nREASON: ${r.reason}` : ''}`,
    `commit: ${String(r.commit).slice(0, 7)}${r.verifiedVia ? ` · deployment verified via ${r.verifiedVia}` : ''}`,
    `changed: ${r.changed.added.length} new, ${r.changed.updated.length} updated, ${r.changed.removed.length} removed`,
    `submitted: ${r.submitted} · accepted: ${r.accepted} · failed: ${r.failed} · pending: ${r.pending} · HTTP: ${r.responses.join(',') || '-'}`
  ];
  if (r.dropped.length) lines.push(`not submitted (${r.dropped.length}): ` + r.dropped.slice(0, 20).map((d) => `${d.path} — ${d.why}`).join('; '));
  if (r.removedHandling.length) lines.push('removed URLs: ' + r.removedHandling.slice(0, 20).map((d) => `${d.path} → ${d.handling}`).join('; '));
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (!args.stateDir || !args.manifestFile) { console.error('--state <dir> and --manifest <file> are required'); process.exit(64); }
  fs.mkdirSync(args.stateDir, { recursive: true });
  const stateFile = path.join(args.stateDir, 'state.json');
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};
  const manifest = JSON.parse(fs.readFileSync(args.manifestFile, 'utf8'));
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  const commit = args.commit ?? manifest.commit;

  if (args.baseline) {
    fs.writeFileSync(stateFile, JSON.stringify({ version: 1, lastCommit: manifest.commit, manifest: { commit: manifest.commit, pages: manifest.pages }, pending: [], history: [] }, null, 1));
    console.log(`Baseline stored: ${Object.keys(manifest.pages).length} URLs @ ${String(manifest.commit).slice(0, 7)} (nothing submitted)`);
    process.exit(0);
  }
  if (!repo) { console.error('GITHUB_REPOSITORY is required to verify the deployment'); process.exit(64); }

  const keyFile = path.join(args.dist, `${KEY}.txt`);
  const result = await run({
    state, manifest, commit, dry: args.dry, force: args.force,
    probe: buildProbe(args.dist),
    deploy: () => confirmDeployment({ commit, repo, token, waitMs: args.waitS * 1000, log: console.error }),
    superseded: () => isSuperseded({ commit, repo, token }),
    keyServed: async () => {
      if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, 'utf8').trim() !== KEY) return false;
      // best effort: the key is a .txt file that Cloudflare serves to runners; a challenge or outage is not a failure
      try { const r = await fetch(`${ORIGIN}/${KEY}.txt`, { headers: UA, signal: timeout() }); return r.status !== 200 || (await r.text()).trim() === KEY; } catch { return true; }
    }
  });
  const text = summary(result);
  console.log(text);
  if (result.wouldSubmit) console.log(result.wouldSubmit.join('\n'));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text + '\n');
  if (!args.dry && result.nextState !== state) { // BLOCKED / HELD / SKIPPED-duplicate leave the stored state untouched
    fs.writeFileSync(stateFile, JSON.stringify(result.nextState, null, 1));
    fs.writeFileSync(path.join(args.stateDir, 'last-run.json'), JSON.stringify({ ...result, nextState: undefined }, null, 1));
  }
  process.exit(result.status === 'BLOCKED' ? 2 : result.status === 'FAILED' ? 1 : 0);
}
