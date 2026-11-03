// Regression tests of the cart helpers (src/lib/cart-safe.mjs) and of the cart wiring.  Run: npm run test:cart-safety
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { safeInternalPath, safeImagePath, ledLinks, priceKey, applyPriceUpdates } from '../src/lib/cart-safe.mjs';

const pub = JSON.parse(fs.readFileSync('src/data/led-mirrors/public.json', 'utf8'));
const photos = JSON.parse(fs.readFileSync('src/data/led-mirrors/photos.json', 'utf8'));
const models = new Map(pub.models.map((m) => [m.id, m]));
let failed = 0;
const t = (name, fn) => { try { fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

t('URL safety: only internal paths pass', () => {
  for (const bad of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', ' javascript:alert(1)', 'data:text/html,<script>1</script>', 'https://evil.example/x', 'http://evil.example', '//evil.example/x', '/\\evil.example', '\\\\evil', 'vbscript:x', '/shop/../../etc', '/shop/%2e%2e/x', '/a b', '/shop/"onmouseover="x', '', null, undefined, 42, {}])
    assert.equal(safeInternalPath(bad), null, `must reject ${JSON.stringify(bad)}`);
  for (const ok of ['/shop/mirrors/led/yamato/', '/ru/shop/mirrors/led/agnes/', '/shop/mirrors/led/como/?size=600x600', '/catalog/'])
    assert.equal(safeInternalPath(ok), ok);
});
t('image safety: only /images/ files', () => {
  for (const bad of ['javascript:x', 'https://evil/x.webp', '//evil/x.webp', '/images/../secret.webp', '/other/x.webp', '/images/x.svg', '/images/x.webp"onerror="y', null, 5]) assert.equal(safeImagePath(bad), null);
  assert.equal(safeImagePath('/images/led-mirrors/yamato-1-480.webp'), '/images/led-mirrors/yamato-1-480.webp');
});
t('all 48 models: photo and link come from the model data (UA and RU), the file exists', () => {
  assert.equal(models.size, 48);
  for (const m of pub.models) for (const loc of ['uk', 'ru']) {
    const r = ledLinks({ kind: 'led-mirror', modelId: m.id }, models, photos, loc);
    assert.equal(r.url, `${loc === 'ru' ? '/ru' : ''}/shop/mirrors/led/${m.slug}/`);
    assert.equal(r.image, `/images/led-mirrors/${m.slug}-1-480.webp`, m.slug);
    assert.ok(fs.existsSync(`public${r.image}`), `${r.image} missing`);
    assert.ok(fs.existsSync(`dist${r.url}index.html`) || !fs.existsSync('dist'), `${r.url} not built`);
  }
});
t('a stored foreign image/url never wins for a LED line (stale cart, homepage picture, javascript: link)', () => {
  const yamato = pub.models.find((m) => m.slug === 'yamato');
  const r = ledLinks({ kind: 'led-mirror', modelId: yamato.id, image: '/images/s20/product-main.webp', url: 'javascript:alert(1)', slug: 'agnes' }, models, photos);
  assert.equal(r.image, '/images/led-mirrors/yamato-1-480.webp'); assert.equal(r.url, '/shop/mirrors/led/yamato/');
});
t('unknown model or a model without photo: no picture and no link (never a stand-in)', () => {
  assert.deepEqual(ledLinks({ modelId: 999999 }, models, photos), { url: null, image: null });
  const m = pub.models[0];
  assert.equal(ledLinks({ modelId: m.id }, models, {}).image, null);
});

const line = (o = {}) => ({ id: 'a', kind: 'led-mirror', modelId: 1, w: 600, h: 600, options: { color: 'x' }, price: 100, quantity: 1, ...o });
t('refreshPrices race: quantity changed during the request is kept, price is updated', () => {
  const sent = [line()]; const latest = { items: [line({ quantity: 5 })], note: 'hi' };
  const { project, changed } = applyPriceUpdates(latest, sent.map(priceKey), [{ ok: true, total_uah: 120 }]);
  assert.equal(changed, true); assert.equal(project.items[0].quantity, 5); assert.equal(project.items[0].price, 120); assert.equal(project.note, 'hi');
});
t('refreshPrices race: a line removed during the request is not resurrected', () => {
  const sent = [line(), line({ id: 'b', w: 700, h: 700 })]; const latest = { items: [line({ id: 'b', w: 700, h: 700 })] };
  const { project } = applyPriceUpdates(latest, sent.map(priceKey), [{ ok: true, total_uah: 120 }, { ok: true, total_uah: 130 }]);
  assert.equal(project.items.length, 1); assert.equal(project.items[0].id, 'b'); assert.equal(project.items[0].price, 130);
});
t('refreshPrices race: a cart cleared during the request stays empty', () => {
  const { project, changed } = applyPriceUpdates({ items: [], note: '' }, [priceKey(line())], [{ ok: true, total_uah: 120 }]);
  assert.equal(changed, false); assert.deepEqual(project.items, []);
});
t('refreshPrices race: a line whose configuration changed meanwhile is not repriced with the old answer', () => {
  const sent = [line()]; const latest = { items: [line({ options: { color: 'y' }, price: 500 })] };
  const { project, changed } = applyPriceUpdates(latest, sent.map(priceKey), [{ ok: true, total_uah: 120 }]);
  assert.equal(changed, false); assert.equal(project.items[0].price, 500);
});
t('failed price answers change nothing', () => {
  const { changed } = applyPriceUpdates({ items: [line()] }, [priceKey(line())], [{ ok: false }, undefined]);
  assert.equal(changed, false);
});

const cart = fs.readFileSync('src/components/cart/ProjectCart.astro', 'utf8');
const print = fs.readFileSync('src/pages/project-print/index.astro', 'utf8');
t('comment wiring: textarea hydrated from and saved to project.note, sent to the order, shown in print', () => {
  assert.match(cart, /data-project-note/); assert.match(cart, /noteEl\.value = readProject\(\)\.note/);
  assert.match(cart, /noteEl\.addEventListener\('input'[\s\S]*p\.note = noteEl\.value/);
  assert.match(cart, /comment: fd\.get\('comment'\)/);
  assert.match(print, /project\.note/);
});
t('cart and print never trust stored links/images', () => {
  assert.doesNotMatch(cart, /a\.href = [^;]*item\.url/); assert.doesNotMatch(cart, /img\.src = item\.image/);
  assert.match(cart, /safeInternalPath/); assert.match(cart, /ledLinks/);
  assert.doesNotMatch(print, /src="\$\{item\.image/); assert.match(print, /esc\(/);
});
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
