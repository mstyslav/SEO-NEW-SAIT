// Scenario tests for the post-deploy IndexNow automation. No real network: GitHub, Cloudflare production and the
// IndexNow API are mocked; page eligibility runs against a real temporary dist/ through the production code.
//   npm run test:indexnow
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildProbe, diffManifests, hashPage, isChallenge, KEY, ORIGIN, parseRedirects } from './lib/indexnow-core.mjs';
import { confirmDeployment, isSuperseded, run } from './indexnow-auto.mjs';

const SHA = (c) => c.padEnd(40, '0');
const page = (p, extra = '') => `<!doctype html><html><head><title>T ${p}</title><meta name="description" content="D ${p}"><link rel="canonical" href="${ORIGIN}${p}"></head><body><header>Menu <a href="/x/">X</a></header><main><h1>H ${p}</h1>${extra}</main><footer>Footer v1</footer></body></html>`;

/**
 * A fake world: the built site (pages), what GitHub says about the Cloudflare deployment, what production's
 * /deploy-version.txt answers and how the IndexNow API behaves. `commit` is the pushed commit under test.
 */
function world({ pages = {}, commit = 'aaa' } = {}) {
  const w = {
    pages, commit, redirects: '', sitemap: Object.keys(pages),
    checkRun: { status: 'completed', conclusion: 'success' }, // Workers Builds check-run of the commit
    ghStatus: 200, mainSha: SHA(commit), prodSha: SHA(commit), prodMode: 'ok', // prodMode: ok | challenge | down
    api: [], apiScript: [], github: 0, prodReads: 0, keyOk: true
  };
  w.manifest = () => ({ version: 1, commit: SHA(w.commit), pages: Object.fromEntries(w.sitemap.map((p) => [p, hashPage(w.pages[p].html)])) });
  w.dist = () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-test-'));
    for (const [p, v] of Object.entries(w.pages)) {
      fs.mkdirSync(path.join(dir, p), { recursive: true });
      fs.writeFileSync(path.join(dir, p, 'index.html'), v.html);
    }
    fs.writeFileSync(path.join(dir, '_redirects'), w.redirects);
    return dir;
  };
  w.fetch = async (url, opts = {}) => {
    const u = new URL(url);
    if (u.host === 'api.indexnow.org') {
      w.api.push(JSON.parse(opts.body).urlList);
      return new Response('{}', { status: w.apiScript.length ? w.apiScript.shift() : 200 });
    }
    if (u.host === 'api.github.com') {
      w.github++;
      if (w.ghStatus === 'throw') throw new Error('ECONNRESET');
      if (w.ghStatus !== 200) return new Response('{}', { status: w.ghStatus });
      if (u.pathname.endsWith('/check-runs')) return Response.json({ check_runs: w.checkRun ? [{ name: 'Workers Builds: seo-new-sait', ...w.checkRun }] : [] });
      if (u.pathname.endsWith('/git/ref/heads/main')) return Response.json({ object: { sha: w.mainSha } });
    }
    if (u.pathname === '/deploy-version.txt') {
      w.prodReads++;
      if (w.prodMode === 'challenge') return new Response('<html>Just a moment...</html>', { status: 403, headers: { 'cf-mitigated': 'challenge' } });
      if (w.prodMode === 'down') throw new Error('ETIMEDOUT');
      return new Response(w.prodSha, { status: 200 });
    }
    return new Response('nf', { status: 404 });
  };
  return w;
}
const ok = (html) => ({ html });
const sentUrls = (w) => w.api.flat().sort();
const withMarker = (html) => html.replace('<main>', '<main><p>changed</p>');

/** Runs the automation the way the CLI wires it. */
function exec(w, state, extra = {}) {
  const sha = SHA(w.commit);
  const common = { fetchImpl: w.fetch, sleep: async () => {}, repo: 'o/r', token: 't', log: () => {} };
  return run({
    state, manifest: w.manifest(), commit: sha, retries: 2,
    probe: buildProbe(w.dist()),
    deploy: () => confirmDeployment({ commit: sha, waitMs: extra.waitMs ?? 0, ...common }),
    superseded: () => isSuperseded({ commit: sha, ...common }),
    keyServed: async () => w.keyOk,
    fetchImpl: w.fetch, sleep: async () => {},
    ...extra
  });
}

const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push([name, 'PASS']); } catch (e) { results.push([name, `FAIL ${e.message}`]); process.exitCode = 1; }
};

async function baselined(pages) {
  const w = world({ pages, commit: 'aaa' });
  const r = await exec(w, {});
  assert.equal(r.status, 'BASELINE');
  assert.equal(w.api.length, 0, 'baseline must not submit');
  assert.equal(w.prodReads, 0, 'baseline needs no deployment wait');
  return { w, state: r.nextState };
}
const deploy = (w, commit) => { w.commit = commit; w.mainSha = SHA(commit); w.prodSha = SHA(commit); };
const touch = (w, p) => { w.pages[p] = ok(withMarker(w.pages[p].html)); };

await test('1 successful deployment (check-run success + production SHA) → only the changed URLs are submitted', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')), '/b/': ok(page('/b/')) });
  w.pages['/new/'] = ok(page('/new/')); w.sitemap.push('/new/'); touch(w, '/a/'); deploy(w, 'bbb');
  const r = await exec(w, state);
  assert.equal(r.status, 'SUBMITTED');
  assert.match(r.verifiedVia, /production \/deploy-version\.txt/);
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/a/`, `${ORIGIN}/new/`]);
});

await test('2 Cloudflare 403 challenge on production → retried 3×, authenticated check-run stands, then submits', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.prodMode = 'challenge';
  const r = await exec(w, state, { waitMs: 600000 });
  assert.equal(r.status, 'SUBMITTED');
  assert.match(r.verifiedVia, /production SHA unverifiable/);
  assert.equal(w.prodReads, 3);
});

await test('2b challenge AND no Workers Builds check-run → BLOCKED, nothing submitted, state untouched', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.prodMode = 'challenge'; w.checkRun = null;
  const r = await exec(w, state);
  assert.equal(r.status, 'BLOCKED');
  assert.match(r.reason, /DEPLOYMENT NOT CONFIRMED/);
  assert.equal(w.api.length, 0);
  assert.deepEqual(r.nextState, state);
});

await test('2c failed production deployment (check-run failure) → BLOCKED immediately', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.checkRun = { status: 'completed', conclusion: 'failure' };
  const r = await exec(w, state);
  assert.equal(r.status, 'BLOCKED');
  assert.match(r.reason, /DEPLOYMENT FAILED/);
  assert.equal(w.api.length, 0);
});

await test('2d deployment still running → polls repeatedly and is BLOCKED at the deadline', async () => {
  const w = world({ pages: { '/a/': ok(page('/a/')) } });
  w.checkRun = { status: 'in_progress', conclusion: null };
  let t = 0;
  const realNow = Date.now; Date.now = () => t;
  try {
    const r = await confirmDeployment({ commit: SHA('aaa'), waitMs: 100, pollMs: 30, fetchImpl: w.fetch, sleep: async (ms) => { t += ms; }, repo: 'o/r', token: 't' });
    assert.match(r.blocked, /Workers Builds still running/);
    assert.ok(w.github >= 4, `polled ${w.github}×`);
  } finally { Date.now = realNow; }
});

await test('3 temporary network failure → retried, then verified', async () => {
  const w = world({ pages: { '/a/': ok(page('/a/')) } });
  let n = 0;
  const flaky = async (url, o) => { if (new URL(url).host === 'api.github.com' && n++ < 2) throw new Error('ECONNRESET'); return w.fetch(url, o); };
  let t = 0; const realNow = Date.now; Date.now = () => t;
  try {
    const r = await confirmDeployment({ commit: SHA('aaa'), waitMs: 1000, pollMs: 10, fetchImpl: flaky, sleep: async (ms) => { t += ms; }, repo: 'o/r', token: 't' });
    assert.equal(r.ok, true);
    assert.ok(n >= 3);
  } finally { Date.now = realNow; }
});

await test('4 incorrect production SHA → no submission (BLOCKED at the deadline)', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.prodSha = SHA('fff');
  let t = 0; const realNow = Date.now; Date.now = () => t;
  try {
    const sha = SHA('bbb');
    const r = await run({
      state, manifest: w.manifest(), commit: sha, probe: buildProbe(w.dist()), fetchImpl: w.fetch, sleep: async () => {},
      deploy: () => confirmDeployment({ commit: sha, waitMs: 100, pollMs: 30, fetchImpl: w.fetch, sleep: async (ms) => { t += ms; }, repo: 'o/r', token: 't' })
    });
    assert.equal(r.status, 'BLOCKED');
    assert.match(r.reason, /production serves fff/);
    assert.equal(w.api.length, 0);
  } finally { Date.now = realNow; }
});

await test('4b build manifest of another commit than the pushed one → BLOCKED', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  deploy(w, 'bbb');
  const r = await exec(w, state, { commit: SHA('ccc') });
  assert.equal(r.status, 'BLOCKED');
  assert.match(r.reason, /LOCAL BUILD MISMATCH/);
});

await test('5+9 duplicate workflow run / retry after success → nothing is sent again', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb');
  const r1 = await exec(w, state);
  assert.equal(r1.status, 'SUBMITTED');
  const r2 = await exec(w, r1.nextState);
  assert.equal(r2.status, 'SKIPPED');
  assert.match(r2.reason, /ALREADY PROCESSED/);
  assert.equal(w.api.length, 1);
});

await test('6+7 IndexNow API failure → pending kept; retry sends only the pending URL once', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.apiScript = [503, 503, 503];
  const r1 = await exec(w, state);
  assert.equal(r1.status, 'FAILED');
  assert.deepEqual(r1.nextState.pending, [{ path: '/a/', kind: 'updated' }]);
  w.api.length = 0;
  const r2 = await exec(w, r1.nextState); // manual retry of the same commit
  assert.equal(r2.status, 'SUBMITTED');
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/a/`]);
  assert.equal(r2.nextState.pending.length, 0);
});

await test('6b 503 then 200 inside one run → one accepted batch, no duplicate', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.apiScript = [503, 200];
  const r = await exec(w, state);
  assert.equal(r.status, 'SUBMITTED');
  assert.equal(w.api.length, 2);
});

await test('8 no changed URLs (new commit, identical pages) → SKIPPED NO CHANGED URLS, API untouched, baseline advances', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  deploy(w, 'bbb');
  const r = await exec(w, state);
  assert.equal(r.status, 'SKIPPED');
  assert.equal(r.reason, 'NO CHANGED URLS');
  assert.equal(w.api.length, 0);
  assert.equal(r.nextState.lastCommit, SHA('bbb'));
});

await test('9b new production commit during execution → superseded, nothing submitted, state untouched', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.mainSha = SHA('ccc');
  const r = await exec(w, state);
  assert.equal(r.status, 'SKIPPED');
  assert.match(r.reason, /SUPERSEDED/);
  assert.equal(w.api.length, 0);
  assert.deepEqual(r.nextState, state);
});

await test('9c main moves while the run is in progress (superseded flips right before submit)', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb');
  let calls = 0;
  const r = await exec(w, state, { superseded: async () => ++calls >= 3 });
  assert.equal(r.status, 'SKIPPED');
  assert.equal(w.api.length, 0);
  assert.deepEqual(r.nextState, state);
});

await test('10 GitHub authentication failure → BLOCKED, no submission', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.ghStatus = 403;
  const r = await exec(w, state, { superseded: async () => false });
  assert.equal(r.status, 'BLOCKED');
  assert.match(r.reason, /AUTH FAILED/);
  assert.equal(w.api.length, 0);
});

await test('removed pages: 404, 301 (_redirects) and noindex are announced; a page still served is not', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')), '/gone/': ok(page('/gone/')), '/moved/': ok(page('/moved/')), '/hidden/': ok(page('/hidden/')), '/still/': ok(page('/still/')) });
  delete w.pages['/gone/'];
  w.pages['/moved/'] = ok(page('/moved/')); // file may linger in dist, the redirect rule wins (as on Cloudflare)
  w.redirects = '/moved/ /a/ 301\n';
  w.pages['/hidden/'] = ok(page('/hidden/').replace('</head>', '<meta name="robots" content="noindex,follow"></head>'));
  w.sitemap = ['/a/']; // /gone/, /moved/, /hidden/, /still/ all left the sitemap; /still/ is still a normal indexable page
  deploy(w, 'bbb');
  const r = await exec(w, state);
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/gone/`, `${ORIGIN}/hidden/`, `${ORIGIN}/moved/`]);
  assert.deepEqual(r.removedHandling.map((x) => x.handling).sort(), ['301 redirect', '404 (gone)', 'noindex']);
  assert.ok(r.dropped.some((d) => d.path === '/still/'));
});

await test('shared component change → all affected pages detected; build noise is ignored', async () => {
  const pages = Object.fromEntries(['/a/', '/b/', '/c/'].map((p) => [p, ok(page(p))]));
  const { w, state } = await baselined(pages);
  for (const p of Object.keys(pages)) w.pages[p] = ok(page(p).replace('Footer v1', 'Footer v2'));
  deploy(w, 'bbb');
  const r = await exec(w, state);
  assert.deepEqual(r.changed.updated, ['/a/', '/b/', '/c/']);
  const noisy = page('/a/').replace('</head>', '<link rel="stylesheet" href="/_astro/x.ABC123.css"><script>var t=1</script></head>').replace('<main>', '<!-- build 42 --><main>');
  assert.equal(hashPage(noisy), hashPage(page('/a/')));
});

await test('large change is HELD (state kept) and only goes out with force', async () => {
  const pages = Object.fromEntries(['/a/', '/b/', '/c/'].map((p) => [p, ok(page(p))]));
  const { w, state } = await baselined(pages);
  for (const p of Object.keys(pages)) w.pages[p] = ok(page(p).replace('Footer v1', 'Footer v2'));
  deploy(w, 'bbb');
  const held = await exec(w, state, { maxUrls: 2 });
  assert.equal(held.status, 'HELD');
  assert.equal(w.api.length, 0);
  assert.deepEqual(held.nextState, state);
  const forced = await exec(w, state, { maxUrls: 2, force: true });
  assert.equal(forced.status, 'SUBMITTED');
  assert.equal(sentUrls(w).length, 3);
});

await test('key file not served → FAILED, URLs kept pending, nothing sent', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  touch(w, '/a/'); deploy(w, 'bbb'); w.keyOk = false;
  const r = await exec(w, state);
  assert.equal(r.status, 'FAILED');
  assert.equal(w.api.length, 0);
  assert.equal(r.nextState.pending.length, 1);
});

await test('noindex new page is never submitted; dry run submits nothing and keeps state', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/n/'] = ok(page('/n/').replace('</head>', '<meta name="robots" content="noindex"></head>')); w.sitemap.push('/n/');
  touch(w, '/a/'); deploy(w, 'bbb');
  const dry = await exec(w, state, { dry: true });
  assert.equal(dry.status, 'DRY-RUN');
  assert.deepEqual(dry.wouldSubmit, [`${ORIGIN}/a/`]);
  assert.equal(w.api.length, 0);
  assert.deepEqual(dry.nextState, state);
  assert.equal(dry.dropped.length, 1);
});

await test('helpers: challenge detection, redirect parsing, manifest diff', () => {
  assert.equal(isChallenge(new Response('', { status: 403, headers: { 'cf-mitigated': 'challenge' } })), true);
  assert.equal(isChallenge(new Response('ok', { status: 200 }), 'ok'), false);
  assert.deepEqual([...parseRedirects('# c\n/a/ /b/ 301\n/c /d/ 308\n').entries()], [['/a/', 301], ['/c', 308]]);
  assert.deepEqual(diffManifests({ pages: { '/a/': '1', '/b/': '2', '/c/': '3' } }, { pages: { '/a/': '1', '/b/': 'x', '/d/': '4' } }), { added: ['/d/'], updated: ['/b/'], removed: ['/c/'] });
  assert.equal(KEY.length, 32);
});

for (const [name, res] of results) console.log(`${res.startsWith('PASS') ? 'PASS' : 'FAIL'}  ${name}${res.startsWith('FAIL') ? ' — ' + res.slice(5) : ''}`);
console.log(`${results.filter((r) => r[1] === 'PASS').length}/${results.length} passed`);
