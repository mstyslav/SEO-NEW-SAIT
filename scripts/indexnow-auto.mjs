// Post-deploy IndexNow run: submits only URLs that are new, meaningfully changed or gone since the last run.
//
//   node scripts/indexnow-auto.mjs --state <dir> [--commit <sha>] [--wait <seconds>] [--dry]
//   node scripts/indexnow-auto.mjs --state <dir> --seed [<sha>]   one-off: baseline from the live site, nothing submitted
//
// How it works (workflow: .github/workflows/indexnow.yml, state kept on branch `indexnow-state`):
//   1. Production must serve /build-manifest.json of the expected commit (written by astro-integrations/build-manifest.mjs).
//      Otherwise nothing is submitted and the state is untouched (BLOCKED) – a failed/slow deploy never triggers IndexNow.
//   2. diff(previous manifest in state, production manifest) → added / updated / removed canonical URLs. Content hashes come
//      from the rendered HTML (see hashPage), so a shared component change is detected on every page it renders.
//   3. Live check of every URL; only live, canonical, indexable pages go out as new/updated; removed pages go out only when
//      production answers 404/410, a redirect, or noindex.
//   4. Batch submit with retries. A 200/202 is never repeated; URLs that could not be delivered stay in `pending` for the
//      next run. The full sitemap is never used as a fallback.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { diffManifests, hashPage, KEY, KEY_LOCATION, MANIFEST_PATH, ORIGIN, sitemapPaths, submitIndexNow } from './lib/indexnow-core.mjs';

const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));
const HISTORY_LIMIT = 30;

async function pMap(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; out[idx] = await fn(items[idx]); }
  }));
  return out;
}

/** Live classification of one URL path: what production answers right now. */
async function probe(pathname, fetchImpl) {
  try {
    const res = await fetchImpl(ORIGIN + pathname, { redirect: 'manual', headers: UA });
    if (res.status >= 300 && res.status < 400) return { kind: 'redirect', status: res.status };
    if (res.status === 404 || res.status === 410) return { kind: 'gone', status: res.status };
    if (res.status !== 200) return { kind: 'error', status: res.status };
    const html = await res.text();
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/i) || [])[1];
    if (/<meta name="robots" content="[^"]*noindex/i.test(html)) return { kind: 'noindex', status: 200 };
    if (canonical !== ORIGIN + pathname) return { kind: 'noncanonical', status: 200, canonical };
    return { kind: 'live', status: 200 };
  } catch {
    return { kind: 'error', status: 0 };
  }
}

const UA = { 'User-Agent': 'space-glass-indexnow/1.0 (+https://space-glass.com.ua)' };

/** Returns { manifest } or { why } (why = what was seen instead, for the log). */
async function fetchProdManifest(fetchImpl) {
  try {
    const res = await fetchImpl(`${ORIGIN}${MANIFEST_PATH}?t=${Date.now()}`, { headers: { 'Cache-Control': 'no-cache', ...UA } });
    if (res.status !== 200) return { why: `HTTP ${res.status} ${res.headers?.get?.('cf-mitigated') ? '(cf-mitigated: ' + res.headers.get('cf-mitigated') + ')' : ''}`.trim() };
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { return { why: `HTTP 200 but not JSON: ${text.slice(0, 80).replace(/\s+/g, ' ')}` }; }
    return json?.version === 1 && json.pages ? { manifest: json } : { why: 'JSON without manifest fields' };
  } catch (e) {
    return { why: `network error: ${e.message}` };
  }
}

/** Waits until production serves the expected commit. Returns { manifest } or { blocked }. */
async function confirmProduction({ fetchImpl, sleep, commit, waitMs, pollMs, log }) {
  const deadline = Date.now() + waitMs;
  let seen = null;
  let why = 'production manifest unavailable';
  for (;;) {
    const r = await fetchProdManifest(fetchImpl);
    if (r.manifest) {
      seen = r.manifest;
      if (!commit || seen.commit === commit) return { manifest: seen };
      log(`waiting: production serves ${String(seen.commit).slice(0, 7)}, expected ${commit.slice(0, 7)}`);
    } else {
      why = r.why;
      log(`waiting: ${r.why}`);
    }
    if (Date.now() >= deadline) break;
    await sleep(pollMs);
  }
  return { blocked: seen ? `production serves ${String(seen.commit).slice(0, 7)}, expected ${String(commit).slice(0, 7)}` : why };
}

export async function run({ state = {}, commit = null, fetchImpl = fetch, sleep = defaultSleep, waitMs = 0, pollMs = 30000, dry = false, retries = 4, retryDelayMs = 30000, log = (m) => console.error(m), now = () => new Date().toISOString() } = {}) {
  const result = { status: '', reason: '', commit: null, changed: { added: [], updated: [], removed: [] }, submitted: 0, accepted: 0, failed: 0, dropped: [], removedHandling: [], responses: [], pending: 0 };
  const next = structuredClone({ version: 1, lastCommit: null, manifest: null, pending: [], history: [], ...state });

  const prod = await confirmProduction({ fetchImpl, sleep, commit, waitMs, pollMs, log });
  if (prod.blocked) return { ...result, status: 'BLOCKED', reason: `PRODUCTION VERSION MISMATCH: ${prod.blocked}`, state, nextState: state };
  const manifest = prod.manifest;
  result.commit = manifest.commit;

  const advance = () => { next.manifest = { commit: manifest.commit, pages: manifest.pages }; next.lastCommit = manifest.commit; };
  const record = () => {
    next.history = [{ at: now(), commit: manifest.commit, status: result.status, submitted: result.submitted, accepted: result.accepted, failed: result.failed, reason: result.reason }, ...next.history].slice(0, HISTORY_LIMIT);
    result.pending = next.pending.length;
    return { ...result, state, nextState: dry ? state : next };
  };

  if (!next.manifest) {
    advance();
    result.status = 'BASELINE';
    result.reason = 'no previous manifest: baseline stored, nothing submitted';
    return record();
  }
  if (next.lastCommit === manifest.commit && !next.pending.length) {
    result.status = 'SKIPPED';
    result.reason = 'ALREADY PROCESSED: this commit was handled before';
    return record();
  }

  const diff = diffManifests(next.manifest, manifest);
  result.changed = diff;
  const wantLive = new Map(); // path → kind: URLs that must be live + canonical + indexable
  const wantGone = new Map(); // path → kind: URLs that must be 404/410/redirect/noindex
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

  const keyText = await fetchImpl(KEY_LOCATION).then((r) => r.text()).catch(() => '');
  if (keyText.trim() !== KEY) {
    // Nothing is lost: pending keeps every URL, the baseline moves on so the diff is not recomputed.
    for (const [p, kind] of [...wantLive, ...wantGone]) if (!next.pending.some((x) => x.path === p)) next.pending.push({ path: p, kind });
    advance();
    result.status = 'FAILED';
    result.reason = 'IndexNow key file is not served by production; URLs kept as pending';
    return record();
  }

  const toSend = new Map(); // path → kind
  const keep = []; // transient problems: stay pending
  await pMap([...wantLive], 12, async ([p, kind]) => {
    const r = await probe(p, fetchImpl);
    if (r.kind === 'live') toSend.set(p, kind);
    else if (r.kind === 'error') keep.push({ path: p, kind });
    else result.dropped.push({ path: p, why: `not indexable now (${r.kind}${r.status ? ' ' + r.status : ''})` });
  });
  await pMap([...wantGone], 12, async ([p, kind]) => {
    const r = await probe(p, fetchImpl);
    if (r.kind === 'gone' || r.kind === 'redirect' || r.kind === 'noindex') {
      toSend.set(p, kind);
      result.removedHandling.push({ path: p, handling: r.kind === 'gone' ? `${r.status} (gone)` : r.kind === 'redirect' ? `${r.status} redirect` : 'noindex' });
    } else if (r.kind === 'error') keep.push({ path: p, kind });
    else result.dropped.push({ path: p, why: `left the sitemap but production still serves it (${r.kind}); not submitted as removed` });
  });

  const urls = [...toSend.keys()].sort().map((p) => ORIGIN + p);
  result.submitted = urls.length;
  next.pending = [...keep];
  if (dry) {
    result.status = urls.length ? 'DRY-RUN' : 'SKIPPED';
    result.reason = urls.length ? `would submit ${urls.length} URL(s)` : 'NO ELIGIBLE URLS';
    result.wouldSubmit = urls;
    return { ...result, pending: keep.length, state, nextState: state };
  }

  if (urls.length) {
    const sent = await submitIndexNow(urls, { fetchImpl, sleep, retries, baseDelayMs: retryDelayMs });
    result.accepted = sent.accepted.length;
    result.failed = sent.failed.length;
    result.responses = sent.responses;
    for (const url of sent.failed) { const p = new URL(url).pathname; next.pending.push({ path: p, kind: toSend.get(p) }); }
  }
  advance();
  if (!urls.length) { result.status = 'SKIPPED'; result.reason = 'NO ELIGIBLE URLS'; }
  else if (!result.failed && !keep.length) result.status = 'SUBMITTED';
  else { result.status = 'FAILED'; result.reason = `${result.failed} URL(s) not accepted, ${keep.length} not verifiable; kept as pending for retry`; }
  return record();
}

/** One-off baseline: hashes the live site with the same normalisation as the build manifest. */
export async function seedFromProd({ fetchImpl = fetch, commit = null } = {}) {
  const prod = await fetchProdManifest(fetchImpl);
  const sitemap = await fetchImpl(`${ORIGIN}/sitemap.xml`).then((r) => r.text());
  const pages = {};
  await pMap(sitemapPaths(sitemap), 12, async (p) => { pages[p] = hashPage(await fetchImpl(ORIGIN + p).then((r) => r.text())); });
  return { commit: commit ?? prod?.commit ?? 'seed', pages };
}

function parseArgs(argv) {
  const get = (name) => { const i = argv.indexOf(name); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : null; };
  return { stateDir: get('--state'), commit: get('--commit'), waitS: Number(get('--wait') ?? 0), dry: argv.includes('--dry'), seed: argv.includes('--seed'), seedCommit: get('--seed') };
}

function summary(r) {
  const lines = [
    '### IndexNow after deploy',
    `INDEXNOW STATUS: ${r.status}${r.reason ? `\nREASON: ${r.reason}` : ''}`,
    `commit: ${String(r.commit).slice(0, 7)}`,
    `changed: ${r.changed.added.length} new, ${r.changed.updated.length} updated, ${r.changed.removed.length} removed`,
    `submitted: ${r.submitted} · accepted: ${r.accepted} · failed: ${r.failed} · pending: ${r.pending} · HTTP: ${r.responses.join(',') || '-'}`
  ];
  if (r.dropped.length) lines.push(`not submitted (${r.dropped.length}): ` + r.dropped.slice(0, 20).map((d) => `${d.path} — ${d.why}`).join('; '));
  if (r.removedHandling.length) lines.push('removed URLs: ' + r.removedHandling.slice(0, 20).map((d) => `${d.path} → ${d.handling}`).join('; '));
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (!args.stateDir) { console.error('--state <dir> is required'); process.exit(64); }
  fs.mkdirSync(args.stateDir, { recursive: true });
  const stateFile = path.join(args.stateDir, 'state.json');
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, 'utf8')) : {};

  if (args.seed) {
    const m = await seedFromProd({ commit: args.seedCommit });
    fs.writeFileSync(stateFile, JSON.stringify({ version: 1, lastCommit: m.commit, manifest: m, pending: [], history: [] }, null, 1));
    console.log(`Baseline stored: ${Object.keys(m.pages).length} URLs @ ${String(m.commit).slice(0, 7)} (nothing submitted)`);
    process.exit(0);
  }

  const result = await run({ state, commit: args.commit, waitMs: args.waitS * 1000, dry: args.dry });
  const text = summary(result);
  console.log(text);
  if (result.wouldSubmit) console.log(result.wouldSubmit.join('\n'));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text + '\n');
  if (!args.dry && result.status !== 'BLOCKED') {
    fs.writeFileSync(stateFile, JSON.stringify(result.nextState, null, 1));
    fs.writeFileSync(path.join(args.stateDir, 'last-run.json'), JSON.stringify({ ...result, state: undefined, nextState: undefined }, null, 1));
  }
  process.exit(result.status === 'BLOCKED' ? 2 : result.status === 'FAILED' ? 1 : 0);
}
