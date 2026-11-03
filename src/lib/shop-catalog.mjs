// Unified shop catalog: product registry, category definitions and filter schema (UA/RU).
// Everything is built from REAL data only (src/data/led-mirrors/public.json). Nothing here is invented: a filter exists
// only when the data has it, and a filter with fewer than two different values is never shown.
//
// Adding products of a new category later: (1) add its products in buildProducts() with the same shape,
// (2) fill the category's filter list below (the future schemes for showers and partitions are already declared).
// A category tab becomes active by itself the moment it has at least one product.
import { attr, groupLabel, formatUah, caption } from './led-mirror-i18n.mjs';
import { LED_PRODUCT_TYPE, ledModelPath } from './shop.mjs';

/** kind: enum = one value per product, several selectable (OR); multi = product has several values, all selected must be present (AND);
 *  range = the product can be made with the typed value (its min..max contains it); price = retail price between min and max. */
const t = (uk, ru) => ({ uk, ru });
const FILTERS = {
  mirrors: [
    { key: 'type', kind: 'enum', label: t('Тип дзеркала', 'Тип зеркала') },
    { key: 'shape', kind: 'enum', label: t('Форма', 'Форма') },
    { key: 'light', kind: 'enum', label: t('Підсвічування', 'Подсветка') },
    { key: 'mount', kind: 'enum', label: t('Розміщення', 'Размещение') },
    { key: 'extras', kind: 'multi', label: t('Додаткові функції', 'Дополнительные функции') },
    { key: 'width', kind: 'range', label: t('Ширина, мм', 'Ширина, мм') },
    { key: 'height', kind: 'range', label: t('Висота, мм', 'Высота, мм') },
    { key: 'price', kind: 'price', label: t('Ціна, грн', 'Цена, грн') }
  ],
  // Future schemes (no products yet, so these categories stay inactive and none of this is shown):
  showers: [
    { key: 'type', kind: 'enum', label: t('Тип конструкції', 'Тип конструкции') },
    { key: 'width', kind: 'range', label: t('Ширина, мм', 'Ширина, мм') },
    { key: 'height', kind: 'range', label: t('Висота, мм', 'Высота, мм') },
    { key: 'opening', kind: 'enum', label: t('Тип відкривання', 'Тип открывания') },
    { key: 'glass', kind: 'enum', label: t('Товщина скла', 'Толщина стекла') },
    { key: 'hardware', kind: 'enum', label: t('Колір фурнітури', 'Цвет фурнитуры') },
    { key: 'price', kind: 'price', label: t('Ціна, грн', 'Цена, грн') }
  ],
  partitions: [
    { key: 'type', kind: 'enum', label: t('Тип перегородки', 'Тип перегородки') },
    { key: 'width', kind: 'range', label: t('Ширина, мм', 'Ширина, мм') },
    { key: 'height', kind: 'range', label: t('Висота, мм', 'Высота, мм') },
    { key: 'door', kind: 'enum', label: t('Тип дверей', 'Тип дверей') },
    { key: 'glass', kind: 'enum', label: t('Товщина скла', 'Толщина стекла') },
    { key: 'profile', kind: 'enum', label: t('Колір профілю', 'Цвет профиля') },
    { key: 'price', kind: 'price', label: t('Ціна, грн', 'Цена, грн') }
  ]
};
export const CATEGORY_ORDER = ['mirrors', 'showers', 'partitions'];
export const CATEGORY_LABEL = { mirrors: t('Дзеркала', 'Зеркала'), showers: t('Душові конструкції', 'Душевые конструкции'), partitions: t('Скляні перегородки', 'Стеклянные перегородки') };

// functions the customer can pick on a mirror (option groups present in the data; thickness / colour / main light are not "functions")
const EXTRA_GROUPS = ['backlight', 'heating', 'lens', 'shelf', 'switch', 'clock', 'audio'];

/** Normalised products of every category. */
export function buildProducts(pub) {
  return pub.models.map((m, i) => ({
    id: `mirrors-led-${m.slug}`, order: i, category: 'mirrors', productType: LED_PRODUCT_TYPE, slug: m.slug, name: m.name_short,
    price: Number.isFinite(m.from_uah) && m.from_uah > 0 ? m.from_uah : null,
    raw: m,
    attrs: {
      type: m.frame === 'Металева' ? 'framed' : 'frameless', shape: m.shape, light: m.main_light, mount: m.mounting,
      extras: m.option_groups.map((g) => g.key).filter((k) => EXTRA_GROUPS.includes(k)),
      width: [...m.size_limits_mm.width], height: [...m.size_limits_mm.height]
    }
  }));
}

const TYPE_LABEL = { framed: t('У металевій рамі', 'В металлической раме'), frameless: t('Безрамне', 'Безрамное') };
/** Localised label of a filter value. */
export function valueLabel(locale, filterKey, value, groups) {
  if (filterKey === 'type') return TYPE_LABEL[value]?.[locale] ?? value;
  if (filterKey === 'extras') return groupLabel(locale, value, groups.find((g) => g.key === value)?.label ?? value);
  return attr(locale, value);
}

/** Schema sent to the browser: categories (active = has products) with only the filters that make sense for their products. */
export function buildSchema(locale, pub, products = buildProducts(pub)) {
  const categories = CATEGORY_ORDER.map((key) => {
    const own = products.filter((p) => p.category === key);
    const filters = [];
    for (const def of FILTERS[key]) {
      if (!own.length) break;
      if (def.kind === 'enum' || def.kind === 'multi') {
        const counts = new Map();
        for (const p of own) for (const v of def.kind === 'multi' ? p.attrs[def.key] ?? [] : [p.attrs[def.key]]) if (v != null) counts.set(v, (counts.get(v) ?? 0) + 1);
        // a filter that every product shares, or that has one value only, discriminates nothing: not shown
        const useful = [...counts].filter(([, n]) => n < own.length || def.kind === 'enum');
        if (counts.size < 2 && def.kind === 'enum') continue;
        if (def.kind === 'multi' && !useful.some(([, n]) => n < own.length)) continue;
        filters.push({ key: def.key, kind: def.kind, label: def.label[locale], options: [...counts.keys()].map((v) => ({ value: v, label: valueLabel(locale, def.key, v, pub.groups) })).sort((a, b) => a.label.localeCompare(b.label, locale)) });
      } else if (def.kind === 'range') {
        const lo = Math.min(...own.map((p) => p.attrs[def.key][0])), hi = Math.max(...own.map((p) => p.attrs[def.key][1]));
        if (lo < hi) filters.push({ key: def.key, kind: 'range', label: def.label[locale], min: lo, max: hi });
      } else if (def.kind === 'price') {
        const prices = own.map((p) => p.price).filter((x) => x != null);
        if (prices.length && Math.min(...prices) < Math.max(...prices)) filters.push({ key: 'price', kind: 'price', label: def.label[locale], min: Math.min(...prices), max: Math.max(...prices) });
      }
    }
    return { key, label: CATEGORY_LABEL[key][locale], count: own.length, active: own.length > 0, filters };
  });
  return { categories };
}

/** Compact product records for the browser (no purchase data; retail "from" price only). */
export function clientProducts(products) {
  return products.map((p) => ({ id: p.id, o: p.order, c: p.category, n: p.name, p: p.price, a: p.attrs }));
}

/** Card texts. `specs` = the same real attributes as the caption, one short line each (type, shape, lighting): the same structure on every card. */
export function cardData(locale, p) {
  const a = p.attrs;
  return {
    href: ledModelPath(locale, p.slug), caption: caption(locale, p.raw), price: p.price == null ? null : formatUah(p.price),
    specs: [TYPE_LABEL[a.type][locale], attr(locale, a.shape), attr(locale, a.light)]
  };
}
