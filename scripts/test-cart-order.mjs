// Server-side cart order rules (worker/cart-order.ts) with mocked delivery.  Run: npm run test:cart
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

if (!fs.existsSync(new URL('../worker/private/led-mirrors.json', import.meta.url))) { console.warn('SKIPPED: worker/private/led-mirrors.json is missing'); process.exit(0); }
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cart-test-')), 'cart-order.mjs');
await build({ entryPoints: [new URL('../worker/cart-order.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error' });
const { handleCartOrder } = await import(out);

const store = new Map();
globalThis.caches = { default: { match: async (r) => store.get(r.url)?.clone(), put: async (r, res) => void store.set(r.url, res) } };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });
let delivered = [], deliverOk = true;
const deps = () => ({ json, normalisePhone: (p) => (/^0\d{9}$/.test(p) ? `+38${p}` : null), deliver: async (l) => { if (deliverOk) delivered.push(l); return deliverOk; }, rateLimited: async () => false, dryRun: false });
const call = async (body, headers = { 'x-sg-form': '1' }) => {
  const res = await handleCartOrder(new Request('https://space-glass.com.ua/api/cart-order', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) }), {}, deps());
  return { status: res.status, body: await res.json() };
};
const led = { kind: 'led-mirror', modelId: 283, w: 700, h: 700, options: {}, price: 5148, quantity: 2 };
const base = { orderId: 'order-aaaa-0001', locale: 'uk', name: 'Тест', phone: '0671234567', _js: 'sg-x', items: [led] };
let failed = 0;
const t = async (name, fn) => { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

await t('valid order is delivered once, with retail line total', async () => {
  const r = await call(base);
  assert.equal(r.status, 200); assert.equal(r.body.subtotal_uah, 10296);
  assert.equal(delivered.length, 1);
  assert.match(delivered[0].configuration, /2 шт\. × 5 148 грн = 10 296 грн/);
  assert.equal(delivered[0]['Джерело'], 'Space Glass Website Cart');
});
await t('same orderId again: duplicate, nothing sent twice', async () => {
  const r = await call(base);
  assert.equal(r.status, 200); assert.equal(r.body.duplicate, true); assert.equal(delivered.length, 1);
});
await t('wrong / tampered price is rejected with the server price, nothing sent', async () => {
  const n = delivered.length;
  const r = await call({ ...base, orderId: 'order-aaaa-0002', items: [{ ...led, price: 100 }] });
  assert.equal(r.status, 409); assert.deepEqual(r.body.changed, [{ index: 0, unit_uah: 5148 }]); assert.equal(delivered.length, n);
});
await t('delivery failure: 502, not remembered, a retry with the same id is delivered', async () => {
  deliverOk = false;
  const id = 'order-aaaa-0003';
  assert.equal((await call({ ...base, orderId: id })).status, 502);
  deliverOk = true;
  const r = await call({ ...base, orderId: id });
  assert.equal(r.status, 200); assert.ok(!r.body.duplicate);
});
await t('unpriced line: partial subtotal is labelled, not final', async () => {
  const r = await call({ ...base, orderId: 'order-aaaa-0004', items: [led, { kind: 'other', name: 'Душова кабіна', price: 0, quantity: 1 }] });
  assert.equal(r.status, 200); assert.equal(r.body.unpriced, 1);
  const l = delivered.at(-1); assert.match(l.estimatedPrice, /не остаточна сума/); assert.match(l.configuration, /ціна уточнюється/);
});
await t('validation: header, phone, name, quantity, size, option, items, order id', async () => {
  assert.equal((await call(base, {})).status, 403);
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0001', phone: '12' })).body.error, 'invalid_phone');
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0002', name: 'A' })).body.error, 'invalid_name');
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0003', items: [{ ...led, quantity: 0 }] })).body.error, 'invalid_quantity');
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0004', items: [{ ...led, w: 5 }] })).body.error, 'invalid_size');
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0005', items: [{ ...led, options: { backlight: 'RGB (з пультом)' } }] })).body.error, 'invalid_option');
  assert.equal((await call({ ...base, orderId: 'order-bbbb-0006', items: [] })).body.error, 'invalid_items');
  assert.equal((await call({ ...base, orderId: 'x' })).body.error, 'invalid_order_id');
});
await t('honeypot answers ok and delivers nothing', async () => {
  const n = delivered.length;
  const r = await call({ ...base, orderId: 'order-cccc-0001', website: 'http://spam' });
  assert.equal(r.status, 200); assert.equal(delivered.length, n);
});
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
