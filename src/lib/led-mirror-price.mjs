// LED / metal-frame mirror price calculation. Pure ES module, no dependencies; used by the
// build (card "from" prices), the browser calculator and scripts/test-led-mirror-price.mjs.
// The catalog holds purchase prices (UAH) and catalog.markup; every figure returned here is RETAIL:
// total = ceil(purchase total x markup). Purchase prices are never displayed. No installation / delivery / measurement.
const ceil = (x) => Math.ceil(x - 1e-9); // immune to float noise (5388.0000001)

/** Options the model offers: its own rows, or the common table (backlight only for common_with_backlight). */
export function modelOptionRows(catalog, model) {
  return model.options === 'own'
    ? model.own_options
    : catalog.common_options.filter((o) => o.grp !== 'backlight' || model.options === 'common_with_backlight');
}

/** Option groups of a model in catalog group order, each with its ordered options (first = free default). */
export function modelOptionGroups(catalog, model) {
  const rows = modelOptionRows(catalog, model);
  return catalog.groups
    .map((g) => ({ key: g.key, label: g.label, options: rows.filter((o) => o.grp === g.key) }))
    .filter((g) => g.options.length > 0);
}

/** options: {group: optionName}; missing groups take the first (free) option of the group. */
export function mirrorPrice(catalog, modelId, w, h, options = {}) {
  const m = catalog.models.find((x) => x.id === modelId);
  if (!m) throw new Error('model_not_found');
  const L = m.size_limits_mm;
  if (!Number.isFinite(w) || !Number.isFinite(h) || w < L.width[0] || w > L.width[1] || h < L.height[0] || h > L.height[1]) throw new Error('invalid_size');
  const area = (w * h) / 1e6;
  const perim = (2 * (w + h)) / 1000;
  const std = m.standard_sizes.find((s) => s.w === w && s.h === h);
  const base = std ? std.price_uah : ceil(m.base_uah + m.mat_uah_per_m2 * area);
  const rows = modelOptionRows(catalog, m);
  const groups = [...new Set(rows.map((o) => o.grp))];
  for (const g of Object.keys(options)) if (!groups.includes(g)) throw new Error('invalid_option');
  let total = base;
  const lines = [];
  for (const g of groups) {
    const list = rows.filter((o) => o.grp === g);
    const o = list.find((x) => x.name === (options[g] ?? list[0].name));
    if (!o) throw new Error('invalid_option');
    const uah = ceil(o.c0 + o.ca * area + o.cp * perim + o.cw * w);
    if (uah) lines.push({ group: g, name: o.name, uah });
    total += uah;
  }
  // retail: markup on the whole configuration (integer math, immune to float noise such as 5148.000000000001)
  const k = Math.round((catalog.markup ?? 1) * 100);
  const retail = (x) => Math.ceil((x * k) / 100 - 1e-9);
  const retailLines = lines.map((l) => ({ ...l, uah: retail(l.uah) }));
  const retailTotal = retail(total);
  // the base line absorbs rounding so the visible lines always add up to the total
  const retailBase = retailTotal - retailLines.reduce((a, l) => a + l.uah, 0);
  return { area, standard_size: !!std, base_uah: retailBase, options: retailLines, total_uah: retailTotal };
}

/** "from" price of a card: cheapest standard size. */
export function fromPrice(model, markup) {
  return Math.ceil((Math.min(...model.standard_sizes.map((s) => s.price_uah)) * Math.round((markup ?? 1) * 100)) / 100 - 1e-9);
}
