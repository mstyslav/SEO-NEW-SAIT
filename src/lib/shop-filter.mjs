// Pure filtering / sorting engine of the shop catalog (runs in the browser and in Node tests).
// state: { cat: 'all' | categoryKey, q: string, sel: { filterKey: string[] }, range: { width?: number, height?: number }, pmin?: number, pmax?: number, sort: 'default'|'price-asc'|'price-desc'|'name' }

export const emptyState = (cat = 'all') => ({ cat, q: '', sel: {}, range: {}, pmin: null, pmax: null, sort: 'default' });

/** Filters shown for a category: its own list; for "all" the filters every active category has (one active category = its full list). */
export function filtersFor(schema, cat) {
  const active = schema.categories.filter((c) => c.active);
  if (cat !== 'all') return schema.categories.find((c) => c.key === cat)?.filters ?? [];
  if (active.length === 1) return active[0].filters;
  const common = active[0]?.filters.filter((f) => active.every((c) => c.filters.some((g) => g.key === f.key && g.kind === f.kind))) ?? [];
  return common;
}

const inCategory = (p, cat) => cat === 'all' || p.c === cat;
const matchesFilter = (p, f, state) => {
  if (f.kind === 'enum') { const s = state.sel[f.key]; return !s?.length || s.includes(p.a[f.key]); }
  if (f.kind === 'multi') { const s = state.sel[f.key]; return !s?.length || s.every((v) => p.a[f.key]?.includes(v)); }
  if (f.kind === 'range') { const v = state.range[f.key]; return v == null || (p.a[f.key] && v >= p.a[f.key][0] && v <= p.a[f.key][1]); }
  if (f.kind === 'price') {
    if (state.pmin == null && state.pmax == null) return true;
    if (p.p == null) return false; // no price from the server side data: never guess, never match a price filter
    return (state.pmin == null || p.p >= state.pmin) && (state.pmax == null || p.p <= state.pmax);
  }
  return true;
};

/** Products matching category, search and every active filter (`skip` = filter key ignored, used for facet counts). */
export function filterProducts(products, schema, state, skip = null) {
  const filters = filtersFor(schema, state.cat);
  const q = state.q.trim().toLowerCase();
  return products.filter((p) => inCategory(p, state.cat) && (!q || p.n.toLowerCase().includes(q)) && filters.every((f) => f.key === skip || matchesFilter(p, f, state)));
}

/** Sorted copy. Products without a price go last in both price orders. */
export function sortProducts(list, sort, locale = 'uk') {
  const by = {
    default: (a, b) => a.o - b.o,
    name: (a, b) => a.n.localeCompare(b.n, locale),
    'price-asc': (a, b) => (a.p == null) - (b.p == null) || a.p - b.p || a.o - b.o,
    'price-desc': (a, b) => (a.p == null) - (b.p == null) || b.p - a.p || a.o - b.o
  }[sort] ?? ((a, b) => a.o - b.o);
  return [...list].sort(by);
}

/** Number of products an option would give if it were switched on (the other active filters stay applied). */
export function facetCount(products, schema, state, filterKey, value) {
  const base = filterProducts(products, schema, state, filterKey);
  const f = filtersFor(schema, state.cat).find((x) => x.key === filterKey);
  return base.filter((p) => (f.kind === 'multi' ? p.a[filterKey]?.includes(value) : p.a[filterKey] === value)).length;
}

/** Switching category: keep what still makes sense (search, price), drop filters the new category does not have. */
export function switchCategory(state, schema, cat) {
  const keys = new Set(filtersFor(schema, cat).map((f) => f.key));
  const sel = Object.fromEntries(Object.entries(state.sel).filter(([k]) => keys.has(k)));
  const range = Object.fromEntries(Object.entries(state.range).filter(([k]) => keys.has(k)));
  const price = keys.has('price');
  return { ...state, cat, sel, range, pmin: price ? state.pmin : null, pmax: price ? state.pmax : null };
}

export const activeFilterCount = (state) => Object.values(state.sel).reduce((n, v) => n + v.length, 0) + Object.keys(state.range).filter((k) => state.range[k] != null).length + (state.pmin != null || state.pmax != null ? 1 : 0);
