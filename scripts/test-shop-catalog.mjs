// Catalog data + filter engine on the REAL data (48 models). Run: npm run test:shop-catalog
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { buildProducts, buildSchema, clientProducts } from '../src/lib/shop-catalog.mjs';
import { emptyState, filtersFor, filterProducts, sortProducts, facetCount, switchCategory, activeFilterCount } from '../src/lib/shop-filter.mjs';

const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const products = buildProducts(pub);
const rec = clientProducts(products);
let failed = 0;
const t = (name, fn) => { try { fn(); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); } };

for (const locale of ['uk', 'ru']) {
  const schema = buildSchema(locale, pub, products);
  const cat = (k) => schema.categories.find((c) => c.key === k);
  const mirrors = cat('mirrors');
  const run = (st) => filterProducts(rec, schema, st);

  t(`[${locale}] 48 products; only mirrors active; showers / partitions inactive with no filters`, () => {
    assert.equal(rec.length, 48);
    assert.deepEqual(schema.categories.map((c) => [c.key, c.active, c.filters.length > 0]), [['mirrors', true, true], ['showers', false, false], ['partitions', false, false]]);
  });
  t(`[${locale}] "all" shows every product and the mirror filters (the only active category)`, () => {
    assert.equal(run(emptyState('all')).length, 48);
    assert.deepEqual(filtersFor(schema, 'all').map((f) => f.key), mirrors.filters.map((f) => f.key));
  });
  t(`[${locale}] real mirror filters only, none empty / useless`, () => {
    const keys = mirrors.filters.map((f) => f.key);
    assert.deepEqual(keys, ['type', 'shape', 'light', 'mount', 'extras', 'width', 'height', 'price']);
    for (const f of mirrors.filters) {
      if (f.options) assert.ok(f.options.length >= 2, `${f.key} has ${f.options.length} option(s)`);
      else assert.ok(f.min < f.max, `${f.key} range`);
    }
    assert.equal(mirrors.filters.find((f) => f.key === 'shape').options.length, 8);
    assert.equal(mirrors.filters.find((f) => f.key === 'extras').options.length, 7);
  });
  t(`[${locale}] every option matches at least one product and counts add up`, () => {
    for (const f of mirrors.filters.filter((x) => x.options)) {
      for (const o of f.options) { const n = run({ ...emptyState('mirrors'), sel: { [f.key]: [o.value] } }).length; assert.ok(n > 0, `${f.key}=${o.value}`); assert.equal(n, facetCount(rec, schema, emptyState('mirrors'), f.key, o.value)); }
      if (f.kind === 'enum') assert.equal(f.options.reduce((s, o) => s + facetCount(rec, schema, emptyState('mirrors'), f.key, o.value), 0), 48);
    }
  });
  t(`[${locale}] search by name (AGNES, COMO, case-insensitive, partial, none)`, () => {
    const s = (q) => run({ ...emptyState('all'), q }).map((p) => p.n);
    assert.deepEqual(s('agnes'), ['AGNES']); assert.deepEqual(s('COMO'), ['COMO']);
    assert.ok(s('mega').length >= 6); assert.deepEqual(s('zzzz'), []);
  });
  t(`[${locale}] combined filters + search narrow the result (AND across filters, OR inside enum, AND inside extras)`, () => {
    const round = { ...emptyState('mirrors'), sel: { shape: ['Круг'] } };
    const a = run(round).length, b = run({ ...round, sel: { ...round.sel, type: ['frameless'] } }).length, c = run({ ...round, sel: { ...round.sel, type: ['frameless'], extras: ['heating', 'clock'] } }).length;
    assert.ok(a > b && b >= c && c >= 0);
    assert.equal(run({ ...emptyState('mirrors'), sel: { shape: ['Круг', 'Арка'] } }).length, run({ ...emptyState('mirrors'), sel: { shape: ['Круг'] } }).length + run({ ...emptyState('mirrors'), sel: { shape: ['Арка'] } }).length);
    for (const p of run({ ...round, q: 'a' })) assert.ok(p.n.toLowerCase().includes('a') && p.a.shape === 'Круг');
  });
  t(`[${locale}] width / height: only models that can be made with the typed size`, () => {
    for (const w of [400, 1000, 3200, 3201, 399]) {
      const r = run({ ...emptyState('mirrors'), range: { width: w } });
      for (const p of r) assert.ok(w >= p.a.width[0] && w <= p.a.width[1]);
      assert.equal(r.length, rec.filter((p) => w >= p.a.width[0] && w <= p.a.width[1]).length);
    }
    assert.equal(run({ ...emptyState('mirrors'), range: { width: 99999 } }).length, 0);
  });
  t(`[${locale}] price filter uses retail prices only; products without a price never match it`, () => {
    const min = mirrors.filters.find((f) => f.key === 'price').min;
    const r = run({ ...emptyState('mirrors'), pmin: min, pmax: min + 2000 });
    assert.ok(r.length > 0 && r.every((p) => p.p >= min && p.p <= min + 2000));
    const noPrice = rec.map((p, i) => (i === 0 ? { ...p, p: null } : p));
    assert.equal(filterProducts(noPrice, schema, { ...emptyState('mirrors'), pmin: 0 }).length, 47);
    assert.equal(filterProducts(noPrice, schema, emptyState('mirrors')).length, 48);
  });
  t(`[${locale}] sorting: default order, price asc / desc, name A-Z; unpriced last`, () => {
    const all = run(emptyState('all'));
    const asc = sortProducts(all, 'price-asc', locale).map((p) => p.p), desc = sortProducts(all, 'price-desc', locale).map((p) => p.p);
    assert.deepEqual(asc, [...asc].sort((a, b) => a - b)); assert.deepEqual(desc, [...desc].sort((a, b) => b - a));
    const names = sortProducts(all, 'name', locale).map((p) => p.n); assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, locale)));
    assert.deepEqual(sortProducts(all, 'default').map((p) => p.o), all.map((p) => p.o).sort((a, b) => a - b));
    const mixed = [{ ...all[0], p: null }, all[1], all[2]];
    assert.equal(sortProducts(mixed, 'price-asc')[2].p, null); assert.equal(sortProducts(mixed, 'price-desc')[2].p, null);
  });
  t(`[${locale}] switching category drops incompatible filters, keeps search and price`, () => {
    const st = { ...emptyState('mirrors'), q: 'ag', sel: { shape: ['Круг'], opening: ['x'] }, range: { width: 700, glass: 8 }, pmin: 5000 };
    const s = switchCategory(st, schema, 'all');
    assert.equal(s.q, 'ag'); assert.deepEqual(s.sel, { shape: ['Круг'] }); assert.equal(s.pmin, 5000);
    const sh = switchCategory(st, schema, 'showers'); // inactive category: no filters at all
    assert.deepEqual(sh.sel, {}); assert.deepEqual(sh.range, {}); assert.equal(sh.pmin, null);
    assert.equal(run({ ...emptyState('showers') }).length, 0);
  });
  t(`[${locale}] activeFilterCount and reset`, () => {
    const st = { ...emptyState('mirrors'), sel: { shape: ['Круг', 'Арка'], type: ['framed'] }, range: { width: 700 }, pmin: 1 };
    assert.equal(activeFilterCount(st), 5); assert.equal(activeFilterCount(emptyState('mirrors')), 0);
  });
}
t('no purchase data reaches the client records', () => {
  const text = JSON.stringify(rec) + JSON.stringify(buildSchema('uk', pub, products));
  assert.ok(!/mat_uah|base_uah|price_uah|markup|"c0"|studio/i.test(text));
  assert.ok(rec.every((p) => p.p === null || (Number.isInteger(p.p) && p.p > 0)));
});
if (failed) { console.error(`${failed} failed`); process.exit(1); }
console.log('all passed');
