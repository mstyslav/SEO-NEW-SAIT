/**
 * RU labels for the glass railing configurator (/ru/ogorozhi-configurator/) — mirrors the texts in
 * src/data/railing-pricing.ts (prices, ids and images stay in that file; only visible labels here).
 */
import { EUR, SYSTEMS, type RailingSystem } from '../railing-pricing';

const NOTES_RU: Record<string, string> = {
  delgado: 'Профиль сверху, вровень с краем плиты',
  formal: 'Профиль сверху с отступом от края',
  clip: 'Компактный профиль с накладкой',
  ante: 'Узкий профиль на торец плиты',
  variante: 'Торцевой профиль с накладкой 23 см',
  baldosa: 'Торцевой профиль с облицовкой до 60 см',
  solo: 'Точечные держатели на торце',
  gardo: 'Круглые стойки с поручнем',
  densaro: 'Квадратные стойки, сплошной зажим',
  lineo: 'Французский балкон на раму окна',
  canto: 'Французский балкон на держателях в откосах'
};

// Glass thickness labels are product names ("Триплекс 17,52 мм (8+8)") — identical in RU.
export const SYSTEMS_RU: RailingSystem[] = SYSTEMS.map((system) => {
  const note = NOTES_RU[system.id];
  if (!note) throw new Error(`No RU note for railing system ${system.id}`);
  return { ...system, note };
});

const relabel = <T extends Record<string, { label: string }>>(group: T, labels: Record<keyof T, string>): T =>
  Object.fromEntries(Object.entries(group).map(([key, value]) => [key, { ...value, label: labels[key as keyof T] }])) as T;

export const EUR_RU = {
  ...EUR,
  glass: relabel(EUR.glass, { clear: 'Прозрачное', extra: 'Экстрапрозрачное', grey: 'Серое', dark: 'Тёмно-серое' }),
  satin: relabel(EUR.satin, { none: 'Без матировки', partial: 'Частичная матировка', full: 'Полная матировка' }),
  colour: relabel(EUR.colour, { steel: 'Под нержавейку', black: 'Чёрный RAL 9005', anthracite: 'Антрацит RAL 7016', white: 'Белый RAL 9016', ral: 'Другой RAL' }),
  handrail: relabel(EUR.handrail, { none: 'Без поручня', round: 'Круглый, нержавейка', square: 'Прямоугольный, нержавейка', u: 'U-профиль на кромку стекла' })
};
