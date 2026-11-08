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

// The cart (worker/cart-order.ts) with a mocked CRM: only an individual construction (no server price), so no private price file is needed.
const out2 = path.join(path.dirname(out), 'cart-order.mjs');
await build({ entryPoints: [new URL('../worker/cart-order.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out2, logLevel: 'error' });
const { handleCartOrder } = await import(out2);
globalThis.caches = { default: { match: async () => undefined, put: async () => undefined } };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });
const sent = [];
const deps = { json, normalisePhone: (p) => (/^0\d{9}$/.test(p) ? `+38${p}` : null), ledPrice: async () => { throw new Error('not used'); }, modelName: () => undefined, catalogDate: () => '2026-11-03', rateLimited: async () => false, dryRun: false,
  crm: async (payload) => { sent.push(payload); return { status: 201, body: { order_ref: 'WEB-1' } }; } };
let n = 0;
const order = async (extra = {}) => {
  const res = await handleCartOrder(new Request('https://space-glass.com.ua/api/cart-order', { method: 'POST', headers: { 'content-type': 'application/json', 'x-sg-form': '1' }, body: JSON.stringify({ orderId: `order-ad-${String(++n).padStart(4, '0')}`, locale: 'uk', name: 'Тест', phone: '0671234567', items: [{ kind: 'other', name: 'Душова кабіна', quantity: 1 }], ...extra }) }), {}, deps);
  return { status: res.status, body: await res.json() };
};
const tt = async (name, fn) => { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };
await tt('cart: consent granted + click id → attribution reaches the CRM payload', async () => {
  sent.length = 0;
  const r = await order({ attribution: { gclid: ID, captured_at: '2026-11-01T10:00:00Z', landing: '/dzerkala/', consent: { ad_user_data: 'granted', ad_personalization: 'granted' } } });
  assert.equal(r.status, 200); assert.equal(sent.length, 1);
  assert.equal(sent[0].attribution.gclid, ID); assert.equal(sent[0].attribution.consent.ad_user_data, 'granted');
  assert.equal(sent[0].version, 1); assert.equal(sent[0].customer.phone, '+380671234567');      // the rest of the order is untouched
});
await tt('cart: no attribution / denied consent / garbage → the payload has NO attribution key, the order still succeeds', async () => {
  for (const att of [undefined, null, { gclid: ID, consent: { ad_user_data: 'denied' } }, { gclid: ID }, 'x', { gclid: 'bad!', consent: { ad_user_data: 'granted' } }]) {
    sent.length = 0;
    const r = await order(att === undefined ? {} : { attribution: att });
    assert.equal(r.status, 200, JSON.stringify(att)); assert.equal(sent.length, 1); assert.equal('attribution' in sent[0], false, JSON.stringify(att));
  }
});
if (failed) process.exit(1);
console.log('all ad attribution tests passed');
