/**
 * Local data source for the /dushovi-kabiny/dushovi-piddony/ money page.
 *
 * ALL prices/sizes/colours/specs collected from the tray manufacturer's live
 * product configurator (checked 2026-08-28). `supplierCode` is kept for INTERNAL
 * matching of our product/price rows only — it must never be rendered in the
 * public page (no supplier name or codes in visible UI or schema).
 *
 * Colour does not change the price for any series; where the configurator showed
 * a 1 UAH difference between colours it is treated as rounding and a single
 * per-size price is used. UNKNOWN (out-of-stock / no confirmed price) → `price: null`
 * → not orderable, shown as "Уточнити наявність".
 *
 * The 30 / 32 mm value is the tray thickness ("Товщина піддону") — never a
 * "профіль" and never a "висота".
 */

export type PiddonAvailability = 'available' | 'unavailable';

export interface PiddonVariant {
  size: string;              // "900×900"
  color: string;             // "Білий" | "Графіт"
  price: number | null;      // UAH; null = UNKNOWN, not orderable
  availability: PiddonAvailability;
}

export interface PiddonImage {
  base: string;              // "/images/catalog/piddony/piddon-1-white" (append -480/-900/-760.webp)
  widths: number[];
  w: number;                 // intrinsic width of the largest rendition
  h: number;
  alt: string;
  kind: 'white' | 'graphite' | 'interior' | 'texture' | 'drain' | 'edge' | 'siphon';
  color?: string;            // set for white/graphite renders → main photo swaps with colour choice
}

export interface PiddonSeries {
  id: string;                // neutral slug for DOM ids / assets ("s1"…"s4")
  supplierCode: string;      // INTERNAL ONLY — never rendered
  publicName: string;
  formatBadge: string;       // short overlay label
  formatsLabel: string;      // "Доступні формати: квадратний, прямокутний"
  formatsShort: string;      // for the comparison table
  blurb: string;
  material: string;
  thickness: string;         // always labelled "Товщина піддону"
  weight: string;
  maxLoad: string;
  antiSlip: string | null;   // null → not shown
  comparisonAntiSlip?: string;
  kit: string;
  colors: string[];
  sizes: string[];           // every size — rendered in SSR HTML
  mediaTone: 'light' | 'dark';
  variants: PiddonVariant[];
  images: PiddonImage[];
}

const bothColors = (
  rows: Array<[string, number | null]>,
  colors: string[]
): PiddonVariant[] =>
  rows.flatMap(([size, price]) =>
    colors.map((color) => ({
      size,
      color,
      price,
      availability: price === null ? ('unavailable' as const) : ('available' as const)
    }))
  );

export const piddonySeries: PiddonSeries[] = [
  {
    id: 's1',
    supplierCode: 'ES-H',
    publicName: 'Душовий піддон зі штучного мармуру',
    formatBadge: 'квадратний, прямокутний',
    formatsLabel: 'Доступні формати: квадратний, прямокутний',
    formatsShort: 'Квадратний, прямокутний',
    blurb:
      'Базова серія зі штучного мармуру з виразною кам’яною текстурою. Квадрат 900×900 та прямокутні розміри до 900×1600 мм — під душові двері, нішу та Walk-In.',
    material: 'Штучний мармур',
    thickness: '30 мм',
    weight: '26 кг/м²',
    maxLoad: 'до 375 кг',
    antiSlip: '3 клас',
    kit: 'Сифон + декоративна накладка',
    colors: ['Білий', 'Графіт'],
    sizes: ['900×900', '800×1200', '900×1200', '900×1600'],
    mediaTone: 'light',
    variants: bothColors(
      [
        ['900×900', 13015],
        ['800×1200', 15241],
        ['900×1200', 16750],
        ['900×1600', null]
      ],
      ['Білий', 'Графіт']
    ),
    images: [
      { base: '/images/catalog/piddony/piddon-1-white', widths: [480, 900], w: 900, h: 900, kind: 'white', color: 'Білий', alt: 'Прямокутний душовий піддон зі штучного мармуру, білий' },
      { base: '/images/catalog/piddony/piddon-1-graphite', widths: [480, 900], w: 900, h: 900, kind: 'graphite', color: 'Графіт', alt: 'Прямокутний душовий піддон зі штучного мармуру, графіт' },
      { base: '/images/catalog/piddony/piddon-1-interior', widths: [480, 900], w: 900, h: 1003, kind: 'interior', alt: 'Білий душовий піддон зі штучного мармуру, встановлений у ванній кімнаті' },
      { base: '/images/catalog/piddony/piddon-1-texture', widths: [480, 900], w: 900, h: 600, kind: 'texture', alt: 'Матова кам’яна текстура поверхні душового піддона, крупним планом' },
      { base: '/images/catalog/piddony/piddon-1-drain', widths: [480, 900], w: 900, h: 1351, kind: 'drain', alt: 'Декоративна накладка зливу та кромка душового піддона зі штучного мармуру' },
      { base: '/images/catalog/piddony/piddon-1-siphon', widths: [480, 900], w: 900, h: 1351, kind: 'siphon', alt: 'Сифон для душового піддона, що входить у комплект' }
    ]
  },
  {
    id: 's2',
    supplierCode: 'ES-A',
    publicName: 'Прямокутний душовий піддон',
    formatBadge: 'квадратний, прямокутний',
    formatsLabel: 'Доступні формати: квадратний, прямокутний',
    formatsShort: 'Квадратний, прямокутний',
    blurb:
      'Найширший розмірний ряд: вузькі 800 мм, компактний квадрат 800×800 та видовжені до 800×1400 мм. Для тісних і нестандартних душових зон.',
    material: 'Штучний мармур',
    thickness: '30 мм',
    weight: '28 кг/м²',
    maxLoad: 'до 375 кг',
    antiSlip: '3 клас',
    kit: 'Сифон + декоративна накладка',
    colors: ['Білий', 'Графіт'],
    sizes: ['800×800', '800×1000', '800×1200', '800×1400', '900×900', '900×1200'],
    mediaTone: 'light',
    variants: bothColors(
      [
        ['800×800', 11017],
        ['800×1000', null],
        ['800×1200', 13794],
        ['800×1400', 15872],
        ['900×900', 11975],
        ['900×1200', 15352]
      ],
      ['Білий', 'Графіт']
    ),
    images: [
      { base: '/images/catalog/piddony/piddon-2-white', widths: [480, 900], w: 900, h: 900, kind: 'white', color: 'Білий', alt: 'Квадратний душовий піддон зі штучного мармуру, білий' },
      { base: '/images/catalog/piddony/piddon-2-graphite', widths: [480, 900], w: 900, h: 900, kind: 'graphite', color: 'Графіт', alt: 'Квадратний душовий піддон зі штучного мармуру, графіт' },
      { base: '/images/catalog/piddony/piddon-2-interior', widths: [480, 900], w: 900, h: 900, kind: 'interior', alt: 'Білий душовий піддон зі штучного мармуру у ванній зі скляною душовою зоною' },
      { base: '/images/catalog/piddony/piddon-2-texture', widths: [480, 900], w: 900, h: 900, kind: 'texture', alt: 'Кам’яна текстура та декоративна кришка зливу душового піддона, крупним планом' },
      { base: '/images/catalog/piddony/piddon-2-edge', widths: [480, 900], w: 900, h: 900, kind: 'edge', alt: 'Кромка та товщина душових піддонів зі штучного мармуру — білий і графіт поруч' },
      { base: '/images/catalog/piddony/piddon-2-siphon', widths: [480, 900], w: 900, h: 1351, kind: 'siphon', alt: 'Сифон для душового піддона, що входить у комплект' }
    ]
  },
  {
    id: 's3',
    supplierCode: 'WPD-P',
    publicName: "П'ятикутний душовий піддон",
    formatBadge: 'п’ятикутний',
    formatsLabel: 'Форма: п’ятикутний зі скошеною гранню',
    formatsShort: 'П’ятикутний',
    blurb:
      'Кутове рішення зі скошеною передньою гранню — економить простір у невеликій ванній та поєднується з п’ятикутною скляною кабіною. 900×900 та 1000×1000 мм.',
    material: 'Штучний камінь',
    thickness: '32 мм',
    weight: '26 кг',
    maxLoad: 'до 500 кг',
    antiSlip: null,
    comparisonAntiSlip: '3 клас',
    kit: 'Сифон + декоративна накладка',
    colors: ['Білий'],
    sizes: ['900×900', '1000×1000'],
    mediaTone: 'dark',
    variants: bothColors(
      [
        ['900×900', 9540],
        ['1000×1000', 10455]
      ],
      ['Білий']
    ),
    images: [
      { base: '/images/catalog/piddony/piddon-3-white', widths: [480, 760], w: 760, h: 760, kind: 'white', color: 'Білий', alt: 'П’ятикутний душовий піддон зі штучного каменю, білий, зі скошеною передньою гранню' }
    ]
  },
  {
    id: 's4',
    supplierCode: 'WPD-K',
    publicName: 'Квадратний душовий піддон',
    formatBadge: 'квадратний, прямокутний',
    formatsLabel: 'Доступні формати: квадратний, прямокутний',
    formatsShort: 'Квадратний, прямокутний',
    blurb:
      'Надміцний штучний мармур із запасом навантаження до 500 кг та товщиною 32 мм. Квадрат 900×900 та прямокутник 1200×900 мм.',
    material: 'Надміцний штучний мармур',
    thickness: '32 мм',
    weight: '26 кг',
    maxLoad: 'до 500 кг',
    antiSlip: null,
    comparisonAntiSlip: '3 клас',
    kit: 'Сифон + декоративна накладка',
    colors: ['Білий'],
    sizes: ['900×900', '1200×900'],
    mediaTone: 'dark',
    variants: bothColors(
      [
        ['900×900', 10585],
        ['1200×900', 12480]
      ],
      ['Білий']
    ),
    images: [
      { base: '/images/catalog/piddony/piddon-4-white', widths: [480, 760], w: 760, h: 760, kind: 'white', color: 'Білий', alt: 'Квадратний посилений душовий піддон зі штучного мармуру, білий' }
    ]
  }
];

export const formatUah = (n: number): string =>
  `${n.toLocaleString('uk-UA').replace(/ /g, ' ')} грн`;

/** Lowest confirmed price across a series' variants → "від X грн". */
export const seriesPriceFrom = (series: PiddonSeries): string => {
  const prices = series.variants
    .map((v) => v.price)
    .filter((p): p is number => typeof p === 'number');
  return prices.length ? `від ${formatUah(Math.min(...prices))}` : 'за запитом';
};

export const priceDisclaimer =
  'Ціни орієнтовні та залежать від обраного розміру й комплектації. Точну вартість підтверджуємо при замовленні.';
