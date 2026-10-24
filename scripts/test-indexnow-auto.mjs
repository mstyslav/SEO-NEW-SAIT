// Scenario tests for the post-deploy IndexNow automation (no network: production and the IndexNow API are mocked).
//   npm run test:indexnow
import assert from 'node:assert/strict';
import { diffManifests, hashPage, KEY, ORIGIN } from './lib/indexnow-core.mjs';
import { run } from './indexnow-auto.mjs';

const page = (p, extra = '') => `<!doctype html><html><head><title>T ${p}</title><meta name="description" content="D ${p}"><link rel="canonical" href="${ORIGIN}${p}"></head><body><header>Menu <a href="/x/">X</a></header><main><h1>H ${p}</h1>${extra}</main><footer>Footer v1</footer></body></html>`;

/** A fake production: pages, the deployed manifest and an IndexNow endpoint with a scripted response sequence. */
function world({ pages = {}, commit = 'aaa', keyOk = true } = {}) {
  const w = { pages, commit, keyOk, api: [], apiScript: [], sitemap: Object.keys(pages) };
  w.manifest = () => ({ version: 1, commit: w.commit, pages: Object.fromEntries(w.sitemap.map((p) => [p, hashPage(w.pages[p].html)])) });
  w.fetch = async (url, opts = {}) => {
    const u = new URL(url);
    if (u.host === 'api.indexnow.org') {
      const body = JSON.parse(opts.body);
      w.api.push(body.urlList);
      const status = w.apiScript.length ? w.apiScript.shift() : 200;
      return new Response('{}', { status });
    }
    if (u.pathname === '/build-manifest.json') return new Response(JSON.stringify(w.manifest()), { status: 200 });
    if (u.pathname === `/${KEY}.txt`) return new Response(w.keyOk ? KEY : 'nope', { status: 200 });
    const p = w.pages[u.pathname];
    if (!p) return new Response('nf', { status: 404 });
    if (p.status && p.status !== 200) return new Response('', { status: p.status, headers: { location: '/' } });
    return new Response(p.html, { status: 200 });
  };
  return w;
}
const ok = (html) => ({ html, status: 200 });
const opts = (w, extra = {}) => ({ fetchImpl: w.fetch, sleep: async () => {}, retries: 2, log: () => {}, ...extra });
const sentUrls = (w) => w.api.flat().sort();

const results = [];
const test = async (name, fn) => {
  try { await fn(); results.push([name, 'PASS']); } catch (e) { results.push([name, `FAIL ${e.message}`]); process.exitCode = 1; }
};

// baseline helper: prod at commit aaa, baseline stored
async function baselined(pages) {
  const w = world({ pages, commit: 'aaa' });
  const r = await run({ ...opts(w), state: {}, commit: 'aaa' });
  assert.equal(r.status, 'BASELINE');
  assert.equal(w.api.length, 0, 'baseline must not submit');
  return { w, state: r.nextState };
}

await test('1 new page → only the new URL is submitted', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')), '/b/': ok(page('/b/')) });
  w.pages['/new/'] = ok(page('/new/')); w.sitemap.push('/new/'); w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r.status, 'SUBMITTED');
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/new/`]);
  assert.deepEqual(r.changed.added, ['/new/']);
});

await test('2 updated page → only that URL; build noise is ignored', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')), '/b/': ok(page('/b/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>new paragraph</p>'));
  // noise on /b/: new hashed asset names, inline script, comment — not a content change
  w.pages['/b/'] = ok(page('/b/').replace('</head>', '<link rel="stylesheet" href="/_astro/x.ABC123.css"><script>var t=1</script></head>').replace('<main>', '<!-- build 42 --><main>'));
  w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.deepEqual(r.changed.updated, ['/a/']);
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/a/`]);
});

await test('3 removed page → submitted only once production answers 404/410/redirect/noindex', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')), '/gone/': ok(page('/gone/')), '/moved/': ok(page('/moved/')), '/hidden/': ok(page('/hidden/')), '/still/': ok(page('/still/')) });
  for (const p of ['/gone/', '/moved/', '/hidden/', '/still/']) w.sitemap = w.sitemap.filter((x) => x !== p);
  delete w.pages['/gone/'];
  w.pages['/moved/'] = { status: 301 };
  w.pages['/hidden/'] = ok(page('/hidden/').replace('</head>', '<meta name="robots" content="noindex,follow"></head>'));
  w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/gone/`, `${ORIGIN}/hidden/`, `${ORIGIN}/moved/`]);
  assert.deepEqual(r.removedHandling.map((x) => x.handling).sort(), ['301 redirect', '404 (gone)', 'noindex']);
  assert.ok(r.dropped.some((d) => d.path === '/still/'), 'still served and indexable: not announced as removed');
});

await test('4 shared component change → every page that renders it is detected', async () => {
  const pages = Object.fromEntries(['/a/', '/b/', '/c/'].map((p) => [p, ok(page(p))]));
  const { w, state } = await baselined(pages);
  for (const p of Object.keys(pages)) w.pages[p] = ok(page(p).replace('Footer v1', 'Footer v2'));
  w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.deepEqual(r.changed.updated, ['/a/', '/b/', '/c/']);
  assert.equal(sentUrls(w).length, 3);
});

await test('5 no content changes → SKIPPED, API untouched', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.commit = 'bbb'; // new commit, identical pages
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r.status, 'SKIPPED');
  assert.equal(r.reason, 'NO CHANGED URLS');
  assert.equal(w.api.length, 0);
  assert.equal(r.nextState.lastCommit, 'bbb');
});

await test('6 failed production deployment → BLOCKED, nothing submitted, state untouched', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); // merged, but production still serves commit aaa
  const r = await run({ ...opts(w), state, commit: 'bbb', waitMs: 0 });
  assert.equal(r.status, 'BLOCKED');
  assert.equal(w.api.length, 0);
  assert.deepEqual(r.nextState, state);
});

await test('7a temporary API failure → pending kept, retry sends only the pending URLs once', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); w.commit = 'bbb';
  w.apiScript = [503, 503, 503];
  const r1 = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r1.status, 'FAILED');
  assert.equal(r1.failed, 1);
  assert.deepEqual(r1.nextState.pending, [{ path: '/a/', kind: 'updated' }]);
  w.api.length = 0;
  const r2 = await run({ ...opts(w), state: r1.nextState, commit: 'bbb' }); // manual retry, same commit
  assert.equal(r2.status, 'SUBMITTED');
  assert.deepEqual(sentUrls(w), [`${ORIGIN}/a/`]);
  assert.equal(r2.nextState.pending.length, 0);
});

await test('7b 503 then 200 inside one run → one accepted batch, no duplicate', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); w.commit = 'bbb';
  w.apiScript = [503, 200];
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r.status, 'SUBMITTED');
  assert.equal(w.api.length, 2); // 1 failed attempt + 1 accepted
});

await test('8+9 duplicate workflow run / retry after success → nothing is sent again', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); w.commit = 'bbb';
  const r1 = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r1.status, 'SUBMITTED');
  const r2 = await run({ ...opts(w), state: r1.nextState, commit: 'bbb' });
  assert.equal(r2.status, 'SKIPPED');
  assert.match(r2.reason, /ALREADY PROCESSED/);
  assert.equal(w.api.length, 1);
});

await test('10 production version mismatch → BLOCKED', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.commit = 'ccc';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r.status, 'BLOCKED');
  assert.match(r.reason, /PRODUCTION VERSION MISMATCH/);
  assert.equal(w.api.length, 0);
});

await test('extra: key file not served → FAILED, URLs kept pending, nothing sent', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); w.commit = 'bbb'; w.keyOk = false;
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(r.status, 'FAILED');
  assert.equal(w.api.length, 0);
  assert.equal(r.nextState.pending.length, 1);
});

await test('extra: new page that is noindex/404 is never submitted', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/n/'] = ok(page('/n/').replace('</head>', '<meta name="robots" content="noindex"></head>')); w.sitemap.push('/n/'); w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb' });
  assert.equal(w.api.length, 0);
  assert.equal(r.dropped.length, 1);
});

await test('extra: dry run never submits and never changes state', async () => {
  const { w, state } = await baselined({ '/a/': ok(page('/a/')) });
  w.pages['/a/'] = ok(page('/a/', '<p>x</p>')); w.commit = 'bbb';
  const r = await run({ ...opts(w), state, commit: 'bbb', dry: true });
  assert.equal(r.status, 'DRY-RUN');
  assert.deepEqual(r.wouldSubmit, [`${ORIGIN}/a/`]);
  assert.equal(w.api.length, 0);
  assert.deepEqual(r.nextState, state);
});

await test('extra: diffManifests classifies added / updated / removed', () => {
  const d = diffManifests({ pages: { '/a/': '1', '/b/': '2', '/c/': '3' } }, { pages: { '/a/': '1', '/b/': 'x', '/d/': '4' } });
  assert.deepEqual(d, { added: ['/d/'], updated: ['/b/'], removed: ['/c/'] });
});

for (const [name, res] of results) console.log(`${res.startsWith('PASS') ? 'PASS' : 'FAIL'}  ${name}${res.startsWith('FAIL') ? ' — ' + res.slice(5) : ''}`);
console.log(`${results.filter((r) => r[1] === 'PASS').length}/${results.length} passed`);
