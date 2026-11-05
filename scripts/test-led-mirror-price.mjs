// Retail price checks (supplier price x markup, rounded up) + rejection / boundary cases for src/lib/led-mirror-price.mjs.
// Run: npm run test:led-mirrors. With SUPPLIER_CATALOG=<supplier catalog.json> (kept outside the repo) it also
// cross-checks 20 000 random configurations against ceil(supplier total x markup).
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mirrorPrice, fromPrice, modelOptionGroups } from '../src/lib/led-mirror-price.mjs';

const privateFile = new URL('../worker/private/led-mirrors.json', import.meta.url);
if (!fs.existsSync(privateFile)) { console.warn('SKIPPED: worker/private/led-mirrors.json is missing (run scripts/build-led-mirrors-catalog.mjs <supplier-catalog.json>)'); process.exit(0); }
const catalog = JSON.parse(fs.readFileSync(privateFile, 'utf8'));
const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const t6 = '6мм Saint-Gobain Glass MIRALITE® PURE';
const heat = 'Підігрів дзеркала';
const rgb = 'RGB (з пультом)';

const cases = [
  ['AGNES 1000x1000 6mm + heating', 283, 1000, 1000, { thickness: t6, heating: heat }, 13293],
  ['AGNES 700x700 standard', 283, 700, 700, {}, 5616],
  ['COMO 1200x700 heating + main RGB', 193, 1200, 700, { heating: heat, main_lighting: rgb }, 14660],
  ['AZURITE 1500x800 RAL + heating + back RGB', 769, 1500, 800, { color: 'RAL K7 Classic', heating: heat, backlight: rgb }, 23817],
  ['AZURITE 1100x1900', 769, 1100, 1900, {}, 21003],
  ['AVANGUARD 2400x1300', 893, 2400, 1300, {}, 30970],
  ['AVANGUARD 500x800 standard', 893, 500, 800, {}, 9023],
  ['BLOSSOM 2290x3040', 187, 2290, 3040, {}, 82874]
];
let failed = 0;
const check = (name, fn) => { try { fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

for (const [name, id, w, h, opts, expected] of cases) {
  check(name, () => assert.equal(mirrorPrice(catalog, id, w, h, opts).total_uah, expected));
}
check('option group absent in model is rejected (AGNES backlight)', () => assert.throws(() => mirrorPrice(catalog, 283, 700, 700, { backlight: rgb }), /invalid_option/));
check('unknown option name rejected', () => assert.throws(() => mirrorPrice(catalog, 283, 700, 700, { heating: 'x' }), /invalid_option/));
check('unknown model rejected', () => assert.throws(() => mirrorPrice(catalog, 1, 700, 700), /model_not_found/));
check('size below / above limits rejected, limits accepted', () => {
  for (const m of catalog.models) {
    const { width: [w0, w1], height: [h0, h1] } = m.size_limits_mm;
    assert.throws(() => mirrorPrice(catalog, m.id, w0 - 1, h0), /invalid_size/);
    assert.throws(() => mirrorPrice(catalog, m.id, w0, h1 + 1), /invalid_size/);
    for (const [w, h] of [[w0, h0], [w1, h1]]) assert.ok(mirrorPrice(catalog, m.id, w, h).total_uah > 0);
  }
});
check('every model: default config priced, has a "from" price, option groups resolve', () => {
  for (const m of catalog.models) {
    assert.ok(Number.isFinite(fromPrice(m, catalog.markup)) && fromPrice(m, catalog.markup) > 0, `${m.name_short} from`);
    const groups = modelOptionGroups(catalog, m);
    assert.ok(groups.length > 0);
    const s = m.standard_sizes[0];
    assert.equal(mirrorPrice(catalog, m.id, s.w, s.h).total_uah, Math.ceil(s.price_uah * catalog.markup - 1e-9), `${m.name_short} default = standard price x markup`);
  }
});
check('backlight only for common_with_backlight', () => {
  for (const m of catalog.models.filter((x) => x.options !== 'own')) {
    const has = modelOptionGroups(catalog, m).some((g) => g.key === 'backlight');
    assert.equal(has, m.options === 'common_with_backlight', m.name_short);
  }
});
check('public catalog holds no purchase prices, markup or supplier data', () => {
  const text = JSON.stringify(pub);
  assert.ok(!/studio\s*glass|markup|"c0"|"ca"|"cp"|"cw"|mat_uah|base_uah|price_uah/i.test(text));
  assert.equal(pub.models.length, 48);
  for (const m of pub.models) assert.equal(m.default_uah, mirrorPrice(catalog, m.id, m.standard_sizes[0].w, m.standard_sizes[0].h).total_uah);
});
check('markup applies and lines add up to the total', () => {
  assert.ok(catalog.markup > 1);
  const r = mirrorPrice(catalog, 193, 1200, 700, { heating: heat, main_lighting: rgb });
  assert.equal(r.base_uah + r.options.reduce((a, o) => a + o.uah, 0), r.total_uah);
});
if (process.env.SUPPLIER_CATALOG) {
  const require = createRequire(import.meta.url);
  const sup = JSON.parse(fs.readFileSync(process.env.SUPPLIER_CATALOG, 'utf8'));
  const supplierPrice = require(process.env.SUPPLIER_PRICE_JS ?? '/dev/null').mirrorPrice;
  check('retail = ceil(supplier x markup) on random configurations', () => {
    for (const m of catalog.models) {
      const groups = modelOptionGroups(catalog, m);
      for (let i = 0; i < 100; i++) {
        const w = m.size_limits_mm.width[0] + Math.floor(Math.random() * (m.size_limits_mm.width[1] - m.size_limits_mm.width[0] + 1));
        const h = m.size_limits_mm.height[0] + Math.floor(Math.random() * (m.size_limits_mm.height[1] - m.size_limits_mm.height[0] + 1));
        const o = Object.fromEntries(groups.map((g) => [g.key, g.options[Math.floor(Math.random() * g.options.length)].name]));
        assert.equal(mirrorPrice(catalog, m.id, w, h, o).total_uah, Math.ceil(supplierPrice(sup, m.id, w, h, o).total_uah * catalog.markup - 1e-9), `${m.name_short} ${w}x${h}`);
      }
    }
  });
}
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
