// The LED_MIRRORS_PRICES secret path: codec, 20 000-configuration comparison with the full private catalog, damaged / missing secret.
// Run: npm run test:led-secret   (needs the local files made by scripts/build-led-mirrors-catalog.mjs; skipped without them)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync, gunzipSync } from 'node:zlib';
import { build } from 'esbuild';
import { mirrorPrice, modelOptionGroups } from '../src/lib/led-mirror-price.mjs';
import { decodePrices } from '../src/lib/led-prices-codec.mjs';

const fullFile = new URL('../worker/private/led-mirrors.json', import.meta.url);
const secretFile = new URL('../worker/private/led-mirrors.secret.txt', import.meta.url);
if (!fs.existsSync(fullFile) || !fs.existsSync(secretFile)) { console.warn('SKIPPED: local private files are missing (run scripts/build-led-mirrors-catalog.mjs)'); process.exit(0); }
const full = JSON.parse(fs.readFileSync(fullFile, 'utf8'));
const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const secret = fs.readFileSync(secretFile, 'utf8').trim();
let failed = 0;
const t = async (name, fn) => { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };
const enc = (obj) => gzipSync(JSON.stringify(obj)).toString('base64');
const require_gunzip = (s) => gunzipSync(Buffer.from(s, 'base64')).toString('utf8');

const decoded = await decodePrices(secret, pub);

await t('secret is small (fits the 5 KB limit) and holds no names or text', () => {
  assert.ok(secret.length < 5000, `length ${secret.length}`);
  const text = require_gunzip(secret);
  assert.ok(!/[A-Za-zА-Яа-яІіЇїЄє]{3,}/.test(text.replace(/"v"|"k"|"m"/g, '')), 'unexpected text in the table');
});

await t('20 000 random configurations: decoded secret == full private catalog (retail totals, lines, standard flag)', () => {
  let n = 0;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  for (const m of full.models) {
    const groups = modelOptionGroups(full, m);
    const L = m.size_limits_mm;
    const cases = [];
    for (const s of m.standard_sizes) cases.push([s.w, s.h]);
    cases.push([L.width[0], L.height[0]], [L.width[1], L.height[1]], [L.width[0], L.height[1]], [L.width[1], L.height[0]]);
    while (cases.length < 417) cases.push([rnd(L.width[0], L.width[1]), rnd(L.height[0], L.height[1])]);
    for (const [w, h] of cases) {
      const o = Object.fromEntries(groups.map((g) => [g.key, g.options[rnd(0, g.options.length - 1)].name]));
      assert.deepEqual(mirrorPrice(decoded, m.id, w, h, o), mirrorPrice(full, m.id, w, h, o), `${m.name_short} ${w}x${h}`);
      n++;
    }
  }
  assert.ok(n >= 20000, `only ${n}`);
  console.log(`      compared ${n} configurations, 48 models`);
});

await t('markup is applied to the totals (retail = ceil(purchase x markup))', () => {
  const m = full.models.find((x) => x.name_short === 'AGNES');
  const std = m.standard_sizes[1];
  const purchase = std.price_uah;
  assert.equal(mirrorPrice(decoded, m.id, std.w, std.h).total_uah, Math.ceil(purchase * decoded.markup - 1e-9));
});

await t('damaged secrets are refused (prices_invalid), nothing is partially accepted', async () => {
  const good = JSON.parse(require_gunzip(secret));
  const variants = {
    empty: '', garbage: 'not-base64!!', truncated: secret.slice(0, 200), notGzip: Buffer.from('{"v":1}').toString('base64'),
    wrongVersion: enc({ ...good, v: 2 }), fewModels: enc({ ...good, m: good.m.slice(1) }), markupMissing: enc({ ...good, k: undefined }),
    badNumber: enc({ ...good, m: good.m.map((r, i) => (i ? r : [r[0], 'x', ...r.slice(2)])) }),
    wrongSizes: enc({ ...good, m: good.m.map((r, i) => (i ? r : [r[0], r[1], r[2], r[3].map(([w, h, p]) => [w + 1, h, p]), r[4]])) }),
    wrongRows: enc({ ...good, m: good.m.map((r, i) => (i ? r : [r[0], r[1], r[2], r[3], r[4].slice(1)])) }),
    unknownId: enc({ ...good, m: good.m.map((r, i) => (i ? r : [999999, ...r.slice(1)])) })
  };
  for (const [name, v] of Object.entries(variants)) await assert.rejects(() => decodePrices(v, pub), /prices_invalid/, name);
});

// the Worker module itself, bundled the way wrangler does (no private JSON import any more)
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'led-secret-')), 'led-mirrors.mjs');
await build({ entryPoints: [new URL('../worker/led-mirrors.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error' });
const worker = await import(out);
const AGNES = { modelId: 283, w: 700, h: 700, options: {} };

await t('worker bundle contains no purchase data', () => {
  const code = fs.readFileSync(out, 'utf8');
  assert.ok(!/mat_uah_per_m2":\s*\d|"c0":\s*\d|base_uah":\s*\d/.test(code) && !code.includes(secret.slice(0, 60)));
  for (const m of full.models) for (const s of m.standard_sizes) assert.ok(!new RegExp(`price_uah"?:\\s*${s.price_uah}\\b`).test(code));
});
await t('worker: secret present -> retail price; missing / damaged -> controlled error, no prices', async () => {
  const ok = await worker.priceOf({ LED_MIRRORS_PRICES: secret }, AGNES);
  assert.equal(ok.ok, true); assert.equal(ok.price.total_uah, mirrorPrice(full, 283, 700, 700).total_uah);
  for (const env of [{}, { LED_MIRRORS_PRICES: '' }, { LED_MIRRORS_PRICES: 'garbage' }, { LED_MIRRORS_PRICES: secret.slice(0, 300) }]) {
    const r = await worker.priceOf(env, AGNES);
    assert.deepEqual(r, { ok: false, error: 'prices_unavailable' });
  }
});
await t('worker: bad input is still rejected with the right code (all 48 models answer)', async () => {
  const env = { LED_MIRRORS_PRICES: secret };
  assert.equal((await worker.priceOf(env, { ...AGNES, w: 5 })).error, 'invalid_size');
  assert.equal((await worker.priceOf(env, { ...AGNES, options: { backlight: 'RGB (з пультом)' } })).error, 'invalid_option');
  assert.equal((await worker.priceOf(env, { ...AGNES, modelId: 1 })).error, 'model_not_found');
  for (const m of pub.models) { const s = m.standard_sizes[0]; const r = await worker.priceOf(env, { modelId: m.id, w: s.w, h: s.h, options: {} }); assert.ok(r.ok && r.price.total_uah === m.default_uah, m.name_short); }
});
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
