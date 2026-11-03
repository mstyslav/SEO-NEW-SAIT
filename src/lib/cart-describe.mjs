// How a LED mirror cart line is described (cart, print/PDF; the Worker uses chosenOptions for the CRM payload).
// Only characteristics and the options the buyer really chose are listed: every «Без …» value (no heating, no lens, no clock …)
// is the "not selected" state of an add-on and is left out.
import { optionLabel, groupLabel } from './led-mirror-i18n.mjs';

export const isNoneOption = (v) => typeof v === 'string' && /^Без\s/.test(v);

/** options without the "not selected" values */
export const chosenOptions = (options) => Object.fromEntries(Object.entries(options ?? {}).filter(([, v]) => !isNoneOption(v)));

/** ["700×700 мм", "Колір рами: Чорний", ...] — labels in the page language; `labels` = { groupKey: label } from the public data */
export function ledConfigLines(item, labels, locale = 'uk') {
  const parts = Object.entries(chosenOptions(item.options)).map(([g, v]) => `${groupLabel(locale, g, labels[g])}: ${optionLabel(locale, v)}`);
  return [`${item.w}×${item.h} мм`, ...parts];
}
