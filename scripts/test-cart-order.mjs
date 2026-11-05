// Server-side cart order rules (worker/cart-order.ts) with a mocked CRM.  Run: npm run test:cart
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const secretFile = new URL('../worker/private/led-mirrors.secret.txt', import.meta.url);
if (!fs.existsSync(secretFile)) { console.warn('SKIPPED: worker/private/led-mirrors.secret.txt is missing'); process.exit(0); }
const SECRET = fs.readFileSync(secretFile, 'utf8').trim();
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cart-test-')), 'cart-order.mjs');
await build({ entryPoints: [new URL('../worker/cart-order.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error' });
const { handleCartOrder } = await import(out);
const out2 = path.join(path.dirname(out), 'led-mirrors.mjs');
await build({ entryPoints: [new URL('../worker/led-mirrors.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'node', outfile: out2, logLevel: 'error' });
const ledMod = await import(out2);
let pricesSecret = SECRET;

const store = new Map();
globalThis.caches = { default: { match: async (r) => store.get(r.url)?.clone(), put: async (r, res) => void store.set(r.url, res) } };
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });
let delivered = [], crmResult = { status: 201, body: { order_ref: 'WEB-7' } }, crmDown = false;
const deps = () => ({ json, normalisePhone: (p) => (/^0\d{9}$/.test(p) ? `+38${p}` : null), ledPrice: (cfg) => ledMod.priceOf({ LED_MIRRORS_PRICES: pricesSecret }, cfg), modelName: ledMod.modelName, catalogDate: ledMod.catalogDate, crm: async (p) => { if (crmDown) return null; if (crmResult.status < 300) delivered.push(p); return crmResult; }, rateLimited: async () => false, dryRun: false });
const call = async (body, headers = { 'x-sg-form': '1' }) => {
  const res = await handleCartOrder(new Request('https://space-glass.com.ua/api/cart-order', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) }), {}, deps());
  return { status: res.status, body: await res.json() };
};
const led = { kind: 'led-mirror', modelId: 283, w: 700, h: 700, options: {}, price: 5616, quantity: 2 };
const base = { orderId: 'order-aaaa-0001', locale: 'uk', name: 'Тест', phone: '0671234567', _js: 'sg-x', items: [led] };
let failed = 0;
const t = async (name, fn) => { try { await fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

await t('valid order is delivered once, with retail line total', async () => {
  const r = await call(base);
  assert.equal(r.status, 200); assert.equal(r.body.subtotal_uah, 11232);
  assert.equal(r.body.order_ref, 'WEB-7');
  assert.equal(delivered.length, 1);
  const p = delivered[0], it = p.items[0];
  assert.equal(p.version, 1); assert.equal(p.source, 'Space Glass Website Cart'); assert.equal(p.order_id, base.orderId); assert.equal(p.locale, 'uk');
  assert.deepEqual([it.kind, it.product_id, it.name, it.width_mm, it.height_mm, it.quantity, it.unit_price_uah, it.price_status], ['led-mirror', 283, 'Дзеркало AGNES', 700, 700, 2, 5616, 'verified']);
  assert.deepEqual(p.totals, { currency: 'UAH', subtotal_uah: 11232, unpriced_items: 0, complete: true });
  assert.equal(p.customer.phone, '+380671234567');
  assert.ok(!/purchase|markup|base_uah|c0/i.test(JSON.stringify(p)));
});
await t('same orderId again: duplicate, nothing sent twice', async () => {
  const r = await call(base);
  assert.equal(r.status, 200); assert.equal(r.body.duplicate, true); assert.equal(delivered.length, 1);
});
await t('wrong / tampered price is rejected with the server price, nothing sent', async () => {
  const n = delivered.length;
  const r = await call({ ...base, orderId: 'order-aaaa-0002', items: [{ ...led, price: 100 }] });
  assert.equal(r.status, 409); assert.deepEqual(r.body.changed, [{ index: 0, unit_uah: 5616 }]); assert.equal(delivered.length, n);
});
await t('CRM unreachable: 503, not remembered, a retry with the same id succeeds; no other channel is used', async () => {
  const id = 'order-aaaa-0003';
  crmDown = true;
  const n = delivered.length;
  const bad = await call({ ...base, orderId: id });
  assert.equal(bad.status, 503); assert.equal(bad.body.error, 'crm_unavailable'); assert.equal(delivered.length, n);
  crmDown = false;
  const r = await call({ ...base, orderId: id });
  assert.equal(r.status, 200); assert.ok(!r.body.duplicate); assert.equal(delivered.length, n + 1);
});
await t('CRM answers: 409 conflict, 429, 401/500 hidden as unavailable, 400 invalid', async () => {
  for (const [crmStatus, status, error] of [[409, 409, 'order_conflict'], [429, 429, 'too_many_requests'], [401, 503, 'crm_unavailable'], [500, 503, 'crm_unavailable'], [400, 400, 'invalid_order']]) {
    crmResult = { status: crmStatus, body: { error: 'x' } };
    const r = await call({ ...base, orderId: `order-crm-${crmStatus}00` });
    assert.equal(r.status, status, String(crmStatus)); assert.equal(r.body.error, error);
  }
  crmResult = { status: 201, body: { order_ref: 'WEB-7' } };
});
await t('unpriced line: partial subtotal is labelled, not final', async () => {
  const r = await call({ ...base, orderId: 'order-aaaa-0004', items: [led, { kind: 'other', name: 'Душова кабіна', price: 0, quantity: 1 }] });
  assert.equal(r.status, 200); assert.equal(r.body.unpriced, 1);
  const p = delivered.at(-1);
  assert.equal(p.totals.complete, false); assert.equal(p.totals.unpriced_items, 1); assert.equal(p.totals.subtotal_uah, 11232);
  assert.deepEqual([p.items[1].price_status, p.items[1].unit_price_uah], ['on_request', null]);
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
await t('prices secret missing or damaged: 503 prices_unavailable, nothing sent, no fake price', async () => {
  const n = delivered.length;
  for (const bad of ['', 'garbage']) {
    pricesSecret = bad;
    const r = await call({ ...base, orderId: 'order-eeee-000' + bad.length });
    assert.equal(r.status, 503); assert.equal(r.body.error, 'prices_unavailable'); assert.equal(delivered.length, n);
  }
  pricesSecret = SECRET;
});
await t('kind=other: the browser price is NEVER passed on as a price (on_request); the estimate is only text, labelled unconfirmed', async () => {
  const r = await call({ ...base, orderId: 'order-dddd-0001', items: [{ kind: 'other', name: 'Дзеркало на замовлення', configuration: 'width: 1000', price: 4430, quantity: 1 }] });
  assert.equal(r.status, 200); assert.equal(r.body.subtotal_uah, 0); assert.equal(r.body.unpriced, 1);
  const p = delivered.at(-1), it = p.items[0];
  assert.deepEqual([it.price_status, it.unit_price_uah], ['on_request', null]);
  assert.match(it.options.configuration, /Орієнтовна ціна з сайту: 4 430 грн\/шт, не підтверджена; width: 1000/);
  assert.deepEqual([p.totals.subtotal_uah, p.totals.unpriced_items, p.totals.complete], [0, 1, false]);
});
await t('kind=other with an absurd or fake price cannot create a verified or priced line (also a LED mirror posted as "other")', async () => {
  const r = await call({ ...base, orderId: 'order-dddd-0002', items: [{ kind: 'other', name: 'Дзеркало AGNES', modelId: 283, price: 1, quantity: 1 }, { kind: 'other', name: 'X', price: 99999999999, quantity: 2 }, { kind: 'future-category', name: 'Нова категорія', price: 777, quantity: 1 }] });
  assert.equal(r.status, 200); assert.equal(r.body.unpriced, 3);
  for (const it of delivered.at(-1).items) assert.deepEqual([it.price_status, it.unit_price_uah], ['on_request', null]);
});
await t('only chosen options reach the CRM: every «Без …» value is dropped, characteristics and chosen add-ons stay', async () => {
  const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
  const opts = Object.fromEntries(pub.models.find((m) => m.id === 283).option_groups.map((g) => [g.key, g.options[0]])); // defaults: all «Без …» + characteristics
  opts.heating = pub.models.find((m) => m.id === 283).option_groups.find((g) => g.key === 'heating').options[1];
  const price = await ledMod.priceOf({ LED_MIRRORS_PRICES: pricesSecret }, { modelId: 283, w: 700, h: 700, options: opts });
  assert.ok(price.ok, 'the option set must be valid for the model');
  assert.ok(Object.values(opts).some((v) => /^Без /.test(v)), 'the test needs unchosen add-ons');
  const r = await call({ ...base, orderId: 'order-dddd-0003', items: [{ ...led, options: opts, price: price.price.total_uah }] });
  assert.equal(r.status, 200);
  const o = delivered.at(-1).items[0].options;
  assert.ok(!Object.values(o).some((v) => /^Без /.test(v)), JSON.stringify(o)); assert.equal(o.heating, opts.heating); assert.equal(o.color, opts.color); assert.equal(o.thickness, opts.thickness);
});
await t('product links are validated on the server: own origin + model page only, anything else is dropped (order still accepted)', async () => {
  const bad = ['javascript:alert(1)', 'data:text/html,x', 'https://evil.example/shop/mirrors/led/agnes/', 'https://space-glass.com.ua.evil.example/shop/mirrors/led/agnes/', '//evil.example/x', 'https://space-glass.com.ua/catalog/', 'https://space-glass.com.ua/shop/mirrors/led/../../x/', 'https://user:p@space-glass.com.ua/shop/mirrors/led/agnes/'];
  for (const [i, url] of bad.entries()) {
    const r = await call({ ...base, orderId: `order-url-bad-${i}`, items: [{ ...led, url }] });
    assert.equal(r.status, 200, url); assert.equal(delivered.at(-1).items[0].url, null, `kept ${url}`);
  }
  const ok = ['https://space-glass.com.ua/shop/mirrors/led/agnes/', 'https://space-glass.com.ua/ru/shop/mirrors/led/agnes/'];
  for (const [i, url] of ok.entries()) { await call({ ...base, orderId: `order-url-ok-${i}`, items: [{ ...led, url }] }); assert.equal(delivered.at(-1).items[0].url, url); }
  await call({ ...base, orderId: 'order-url-oth-1', items: [{ kind: 'other', name: 'Кабіна', price: 100, quantity: 1, url: 'javascript:alert(1)' }] });
  assert.equal(delivered.at(-1).items[0].url, null);
  await call({ ...base, orderId: 'order-url-oth-2', items: [{ kind: 'other', name: 'Кабіна', price: 100, quantity: 1, url: 'https://space-glass.com.ua/dushovi-kabiny/' }] });
  assert.equal(delivered.at(-1).items[0].url, 'https://space-glass.com.ua/dushovi-kabiny/');
});
await t('honeypot answers ok and delivers nothing', async () => {
  const n = delivered.length;
  const r = await call({ ...base, orderId: 'order-cccc-0001', website: 'http://spam' });
  assert.equal(r.status, 200); assert.equal(delivered.length, n);
});
await t('the buyer comment reaches the CRM payload unchanged', async () => {
  const n = delivered.length;
  const comment = 'Звонить после 18:00. Доставка в Одессу, 3 этаж.';
  const r = await call({ ...base, orderId: 'order-comment-0001', comment });
  assert.equal(r.status, 200); assert.equal(delivered.length, n + 1);
  assert.equal(delivered[delivered.length - 1].customer.comment, comment);
});
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
