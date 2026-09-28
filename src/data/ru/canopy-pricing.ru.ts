/**
 * RU labels for the glass canopy configurator (/ru/kozyrky-configurator/) — mirrors the texts in
 * src/data/canopy-pricing.ts (prices, ids, sizes and images stay in that file; only visible labels here).
 */
import { CANOPY_CONFIG_SYSTEMS, FIXING_LABELS, GLASS_LABELS, type CanopySystem, type FixingId, type GlassId } from '../canopy-pricing';

const SYSTEM_TEXTS_RU: Record<string, { title: string; note: string; extra?: string }> = {
  'dura-plus': { title: 'Консольный козырёк без тяг', note: 'Стекло в зажимном профиле на стене' },
  punto: { title: 'Стеклянный козырёк на тягах', note: 'Тяги и точечные держатели из нержавейки' },
  spada: { title: 'Козырёк на кронштейнах-мечах', note: 'Мечи из нержавейки, глубина до 2 м', extra: 'Гравировка логотипа на мечах' },
  trave: { title: 'Козырёк на трубчатых кронштейнах', note: 'Кронштейны под стеклом — для низких входов', extra: 'Кронштейны, соединённые в раму' },
  duravento: { title: 'Козырёк с боковой стенкой', note: 'Консольный козырёк + стеклянная стенка 1,8 м' },
  ella: { title: 'Козырёк в стальной раме', note: 'Рама со встроенным водоотводом', extra: 'LED-подсветка: 3 спота + блок питания' },
  tubo: { title: 'Большой козырёк в подвесной раме', note: 'Рама из труб нержавейки на тягах' },
  arcata: { title: 'Арочный стеклянный козырёк', note: 'Гнутое стекло на тягах', extra: 'Квадратные точечные держатели' }
};

export const CANOPY_CONFIG_SYSTEMS_RU: CanopySystem[] = CANOPY_CONFIG_SYSTEMS.map((system) => {
  const ru = SYSTEM_TEXTS_RU[system.id];
  if (!ru || Boolean(ru.extra) !== Boolean(system.extra)) throw new Error(`No RU texts for canopy system ${system.id}`);
  return { ...system, title: ru.title, note: ru.note, ...(system.extra && ru.extra ? { extra: [ru.extra, system.extra[1]] as [string, number] } : {}) };
});

const GLASS_RU: Record<GlassId, string> = {
  clear: 'Прозрачное',
  extra: 'Сверхпрозрачное',
  satin: 'Матовое',
  satinExtra: 'Матовое сверхпрозрачное',
  grey: 'Серое',
  solar: 'Солнцезащитное зеркальное'
};

export const GLASS_LABELS_RU = Object.fromEntries(
  Object.entries(GLASS_LABELS).map(([id, value]) => [id, { ...value, label: GLASS_RU[id as GlassId] }])
) as typeof GLASS_LABELS;

export const FIXING_LABELS_RU: Record<FixingId, string> = {
  none: 'Без крепёжных материалов',
  masonry: 'Бетон, кирпич, газоблок',
  wood: 'Деревянная стена',
  insulation: 'Утеплённый фасад'
};

// Keep the key sets in sync with the UA labels.
for (const key of Object.keys(FIXING_LABELS)) if (!(key in FIXING_LABELS_RU)) throw new Error(`No RU fixing label ${key}`);
