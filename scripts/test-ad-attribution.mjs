// Advertising attribution of a cart order (worker/ad-attribution.ts): consent is required, ids are validated.  Run: npm run test:ad-attribution
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'adattr-')), 'ad.mjs');
await build({ entryPoints: [new URL('../worker/ad-attribution.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error' });
const { cleanAdAttribution } = await import(out);
const ID = 'Cj0KCQiA_test-GCLID_1234567890';
let failed = 0;
const t = (name, fn) => { try { fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

t('advertising consent + a valid click id passes, normalised', () => {
  const r = cleanAdAttribution({ gclid: ID, captured_at: '2026-11-01T10:00:00Z', landing: '/shop/mirrors/led/agnes/', consent: { ad_user_data: 'granted', ad_personalization: 'granted' } });
  assert.deepEqual(r, { gclid: ID, gbraid: null, wbraid: null, captured_at: '2026-11-01T10:00:00.000Z', landing: '/shop/mirrors/led/agnes/', consent: { ad_user_data: 'granted', ad_personalization: 'granted' } });
});
t('no consent / denied / missing: nothing leaves the site', () => {
  for (const c of [undefined, {}, { ad_user_data: 'denied' }, { ad_user_data: true }, { ad_personalization: 'granted' }])
    assert.equal(cleanAdAttribution({ gclid: ID, consent: c }), null, JSON.stringify(c));
});
t('invalid or missing ids, garbage input', () => {
  const ok = { ad_user_data: 'granted' };
  for (const a of [{ consent: ok }, { gclid: 'short', consent: ok }, { gclid: 'bad id with spaces!', consent: ok }, { gclid: 'x'.repeat(600), consent: ok }, null, 'text', 42, []])
    assert.equal(cleanAdAttribution(a), null, JSON.stringify(a));
});
t('gbraid / wbraid alone are accepted; personalization defaults to denied; a bad landing / date is dropped', () => {
  const r = cleanAdAttribution({ wbraid: ID, landing: 'https://evil.example/', captured_at: 'nope', consent: { ad_user_data: 'granted' } });
  assert.equal(r.wbraid, ID); assert.equal(r.gclid, null); assert.equal(r.landing, null); assert.equal(r.captured_at, null); assert.equal(r.consent.ad_personalization, 'denied');
});
if (failed) process.exit(1);
console.log('all ad attribution tests passed');
