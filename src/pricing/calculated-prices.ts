/**
 * Indexed "орієнтовна вартість від" prices for catalog pages (glass partitions, frameless glazing)
 * per-metre guide prices for glass railings, typical-size guide prices for glass canopies and
 * market-orientation ranges for typical PVC and aluminium windows.
 *
 * Every number is derived from the calculators' own sources — tariffs.json and the
 * /peregorodky-configurator/, /loft-configurator/ and /bezramne-configurator/ configs — through
 * the same formula (engine.ts: area × productUsdM2 × option multiplier + area × installationUsdM2,
 * plus a fixed door surcharge). Change a tariff or a multiplier for the calculator and these follow.
 *
 * The rate is the site's working USD rate (src/pricing/currency.ts) — the same one the
 * calculators use. Prices include installation and are rounded down to 100 UAH, so the page
 * never shows a higher minimum than the calculator.
 */
import partitionConfig from './configs/glass-partition.json';
import loftConfig from './configs/loft.json';
import framelessConfig from './configs/frameless-glazing.json';
import { calculatePrice, type CategoryKey } from './engine';
import { USD_UAH } from './currency';
import { DEFAULT_CHOICE, SYSTEMS as RAILING_SYSTEMS, railingPrice } from '../data/railing-pricing';
import { CANOPY_CONFIG_SYSTEMS, DEFAULT_CANOPY_CHOICE, canopyPrice } from '../data/canopy-pricing';
import { WINDOW_MARKET, type WindowClass } from './window-pricing';
import type { DoorType } from './door-pricing';

type ConfigOption = { value: string; multiplier?: number; extraUsd?: number };
type Config = { fields: { id: string; default?: number; options?: ConfigOption[] }[] };

/** UAH per USD used for indexed prices: the calculators' working rate. */
export const STABLE_RATE_UAH = USD_UAH;

const option = (config: Config, fieldId: string, value: string): ConfigOption => {
  const found = config.fields.find((field) => field.id === fieldId)?.options?.find((item) => item.value === value);
  if (!found) throw new Error(`calculated-prices: no option "${value}" in field "${fieldId}"`);
  return found;
};
const fieldDefault = (config: Config, fieldId: string) => Number(config.fields.find((field) => field.id === fieldId)?.default ?? 0);
const floor100 = (uah: number) => Math.floor(uah / 100) * 100;

/** Total for one construction, UAH (same formula as the calculator, installation included). */
const total = (category: CategoryKey, widthMm: number, heightMm: number, multiplier: number, extraUsd: number) =>
  calculatePrice({ category, widthMm, heightMm, installation: true, modifiers: [multiplier], usdRateUah: STABLE_RATE_UAH }).totalUah +
  extraUsd * STABLE_RATE_UAH;

const gp = partitionConfig as Config;
const loft = loftConfig as Config;
const frameless = framelessConfig as Config;

export type SystemKey =
  | 'frameless' | 'profile' | 'premium' | 'loft' | 'loftSlim' | 'loftPremium'
  | 'glazingFolding' | 'glazingSliding';

const SYSTEMS: Record<SystemKey, { category: CategoryKey; config: Config; field: string; value: string }> = {
  // /peregorodky-configurator/ (glass-partition.json)
  frameless: { category: 'glass_partitions', config: gp, field: 'system', value: 'Безрамна' },
  profile: { category: 'glass_partitions', config: gp, field: 'system', value: 'Профільна' },
  premium: { category: 'glass_partitions', config: gp, field: 'system', value: 'Premium' },
  // /loft-configurator/ (loft.json)
  loft: { category: 'loft', config: loft, field: 'profile', value: 'standard' },
  loftSlim: { category: 'loft', config: loft, field: 'profile', value: 'slim' },
  loftPremium: { category: 'loft', config: loft, field: 'profile', value: 'premium' },
  // /bezramne-configurator/ (frameless-glazing.json): single-glass folding / sliding only
  glazingFolding: { category: 'frameless_glazing', config: frameless, field: 'opening', value: 'folding' },
  glazingSliding: { category: 'frameless_glazing', config: frameless, field: 'opening', value: 'sliding' }
};

/** «від» price per m² with installation, UAH. */
export const systemPricePerM2 = (key: SystemKey) => {
  const s = SYSTEMS[key];
  return floor100(total(s.category, 1000, 1000, option(s.config, s.field, s.value).multiplier ?? 1, 0));
};

export type DoorKind = 'swing' | 'sliding';
export type DoorSet = 'partition' | 'loft';
const doorOption = (set: DoorSet, kind: DoorKind) =>
  set === 'loft' ? option(loft, 'doors', kind === 'swing' ? 'hinged' : 'sliding') : option(gp, 'door', kind === 'swing' ? 'Розпашні' : 'Розсувні');
/** Door surcharge, UAH («від»). */
export const doorPrice = (kind: DoorKind, set: DoorSet = 'partition') => floor100((doorOption(set, kind).extraUsd ?? 0) * STABLE_RATE_UAH);

/** Typical construction = the calculator's default width × height, installation included. */
export const examplePrice = (key: SystemKey, door: DoorKind | null = null, doorSet: DoorSet = 'partition') => {
  const s = SYSTEMS[key];
  const widthMm = fieldDefault(s.config, 'width');
  const heightMm = fieldDefault(s.config, 'height');
  const extraUsd = door ? doorOption(doorSet, door).extraUsd ?? 0 : 0;
  const uah = total(s.category, widthMm, heightMm, option(s.config, s.field, s.value).multiplier ?? 1, extraUsd);
  return { widthMm, heightMm, areaM2: (widthMm / 1000) * (heightMm / 1000), uah: floor100(uah) };
};

/** Which systems / example a page's price block shows (wording lives in CalculatedPriceBlock.astro). */
export type PriceVariant =
  | 'partition-hub' | 'partition-loft' | 'partition-frameless' | 'partition-office' | 'partition-interior' | 'partition-doors'
  | 'glazing-hub' | 'glazing-folding' | 'glazing-sliding' | 'glazing-terrace' | 'glazing-gazebo' | 'glazing-balcony'
  | RailingVariant | CanopyVariant | WindowVariant | DoorVariant | ShowerVariant;

/**
 * Card systems whose price the calculator really models, per catalog (card/model ids differ
 * between catalogs, e.g. both have "sliding-slim"). Everything else shows no card price.
 * Partitions: sliding, telescopic, transforming, pendulum-door and "room in a room" systems are
 * not modelled. Frameless glazing: guillotine, insulated-unit (TWIN, SLIDING MAX, BALCONTWIN),
 * top-hung threshold-free (ATRIUM, CENTRUM, MOMENTUM) and BALCONMAX systems are not modelled.
 */
const CARD_SYSTEM_PRICE: Record<'partition' | 'glazing', Record<string, SystemKey>> = {
  partition: { pur: 'frameless', slim: 'profile', 'slim-dveri': 'profile', 'slim-black': 'loft', 'slim-black-dveri': 'loft' },
  glazing: {
    'tiara-max': 'glazingFolding', 'tiara-max-slim': 'glazingFolding', 'tiara-max-flat': 'glazingFolding', 'tiara-max-zero': 'glazingFolding', optima: 'glazingFolding',
    'sliding-slim': 'glazingSliding', 'sliding-smart': 'glazingSliding', 'sliding-track': 'glazingSliding', 'sliding-next': 'glazingSliding',
    'sliding-next-flat': 'glazingSliding', 'sliding-next-all-glass': 'glazingSliding'
  }
};

/** Card «від» price per m² for a system on a page with the given price block, or undefined. */
export const cardPricePerM2 = (variant: PriceVariant, systemId: string) => {
  if (isRailingVariant(variant) || isCanopyVariant(variant) || isWindowVariant(variant) || isDoorVariant(variant) || isShowerVariant(variant)) return undefined;
  const key = CARD_SYSTEM_PRICE[variant.startsWith('glazing') ? 'glazing' : 'partition'][systemId];
  return key ? systemPricePerM2(key) : undefined;
};

/* ---------------------------------------------------------------- glass railings ---------- */
/*
 * The railing price per running metre depends strongly on the total length (minimum installation
 * charge, fixed shape parts, volume discount), so pages never show a bare "від … грн/м.п.":
 * they show a guide for one stated reference size — 4.0 m × 1.0 m, the calculator's starting
 * configuration (straight, clear triplex, steel colour, no handrail, installation) — through the
 * calculator's own formula, railingPrice() in src/data/railing-pricing.ts.
 */
export type RailingVariant =
  | 'railing-hub' | 'railing-stairs' | 'railing-balcony' | 'railing-terrace' | 'railing-pool' | 'railing-frameless' | 'railing-posts';
export const isRailingVariant = (variant: PriceVariant): variant is RailingVariant => variant.startsWith('railing-');

/** Reference railing for the guide prices: total length, m, and height, cm. */
export const RAILING_REFERENCE = { lengthM: 4, heightCm: 100 };

/** Guide price for one system at the reference size, UAH, installation included (rounded down to 100). */
export const railingGuide = (systemId: string) => {
  const system = RAILING_SYSTEMS.find((item) => item.id === systemId);
  if (!system) throw new Error(`calculated-prices: unknown railing system "${systemId}"`);
  const price = railingPrice({ ...DEFAULT_CHOICE, system, lengthM: RAILING_REFERENCE.lengthM, heightCm: RAILING_REFERENCE.heightCm });
  return {
    name: system.name,
    lengthM: price.lengthM,
    heightM: price.heightM,
    totalUah: floor100(price.totalUah),
    perMetreUah: floor100(price.totalUah / price.lengthM)
  };
};

/**
 * Railing pages with a price block → the systems the page offers (all modelled by the calculator)
 * and the system of the worked example. The private-house page is organised by zones, not systems,
 * and has no price block.
 */
export const RAILING_PAGES: Record<RailingVariant, { slug: string | null; systems: string[]; example: string }> = {
  'railing-hub': { slug: null, systems: ['formal', 'solo', 'gardo', 'lineo'], example: 'formal' },
  'railing-stairs': { slug: 'sklyani-peryla-dlia-skhodiv', systems: ['clip', 'ante', 'solo', 'delgado', 'variante', 'gardo'], example: 'clip' },
  'railing-balcony': { slug: 'sklyani-ohorozhi-balkoniv', systems: ['lineo', 'canto', 'delgado', 'ante', 'baldosa', 'gardo'], example: 'delgado' },
  'railing-terrace': { slug: 'sklyani-ohorozhi-teras', systems: ['delgado', 'formal', 'ante', 'baldosa', 'densaro', 'gardo'], example: 'formal' },
  'railing-pool': { slug: 'sklyani-ohorozhi-baseiniv', systems: ['delgado', 'formal', 'clip', 'solo', 'gardo'], example: 'formal' },
  'railing-frameless': { slug: 'bezramni-sklyani-ohorozhi', systems: ['delgado', 'formal', 'clip', 'ante', 'variante', 'baldosa'], example: 'formal' },
  'railing-posts': { slug: 'sklyani-ohorozhi-na-stiykakh', systems: ['solo', 'gardo', 'densaro', 'lineo', 'canto'], example: 'gardo' }
};

/** Price block variant of a railing catalog page, by slug (undefined = no price block). */
export const railingPriceBlock = (slug: string) =>
  (Object.entries(RAILING_PAGES) as [RailingVariant, { slug: string | null }][]).find(([, page]) => page.slug === slug)?.[0];

/** Card guide for a system on a railing page, or undefined when the page does not list it. */
export const railingCardGuide = (variant: PriceVariant, systemId: string) =>
  isRailingVariant(variant) && RAILING_PAGES[variant].systems.includes(systemId) ? railingGuide(systemId) : undefined;

/* ---------------------------------------------------------------- glass canopies ---------- */
/*
 * Canopies are priced as a finished typical construction, not per m²: each system's guide is the
 * calculator's starting configuration (clear glass, masonry wall fixing, no options, installation)
 * at a stated size — 1500 × 900 mm, or the system's minimum where it is larger (ELLA: 1600 mm wide)
 * — through the calculator's own formula, canopyPrice() in src/data/canopy-pricing.ts.
 * TRAVE is left out: its fitted model is ~14 % below the partner's control price.
 */
export type CanopyVariant =
  | 'canopy-hub' | 'canopy-console' | 'canopy-rods' | 'canopy-brackets' | 'canopy-frame' | 'canopy-side' | 'canopy-business';
export const isCanopyVariant = (variant: PriceVariant): variant is CanopyVariant => variant.startsWith('canopy-');

/** Typical canopy for the guide prices, mm (raised to a system's minimum size where needed). */
export const CANOPY_REFERENCE = { widthMm: 1500, depthMm: 900 };
/** Systems the calculator models closely enough to publish a guide price for. */
const CANOPY_PUBLISHED = ['punto', 'spada', 'dura-plus', 'duravento', 'arcata', 'ella', 'tubo'];

/** Whether a canopy system gets a published guide price. */
export const isCanopyPublished = (systemId: string) => CANOPY_PUBLISHED.includes(systemId);

/** Guide price for one system at its typical size, UAH, installation included (rounded down to 100). */
export const canopyGuide = (systemId: string) => {
  const system = CANOPY_CONFIG_SYSTEMS.find((item) => item.id === systemId);
  if (!system || !CANOPY_PUBLISHED.includes(systemId)) throw new Error(`calculated-prices: no canopy guide for "${systemId}"`);
  const price = canopyPrice({
    ...DEFAULT_CANOPY_CHOICE,
    system,
    widthMm: Math.max(system.minW, CANOPY_REFERENCE.widthMm),
    depthMm: Math.max(system.minD, CANOPY_REFERENCE.depthMm)
  });
  return {
    name: system.name,
    widthMm: price.widthMm,
    depthMm: price.depthMm,
    areaM2: price.areaM2,
    productUah: floor100(price.totalUah - price.installUah),
    installUah: price.installUah,
    totalUah: floor100(price.totalUah)
  };
};

/** Canopy pages with a price block → systems shown (calculator-modelled only) and the worked example. */
export const CANOPY_PAGES: Record<CanopyVariant, { slug: string | null; systems: string[]; example: string }> = {
  'canopy-hub': { slug: null, systems: ['punto', 'spada', 'dura-plus', 'ella', 'tubo'], example: 'punto' },
  'canopy-console': { slug: 'konsolni-kozyrky', systems: ['dura-plus', 'duravento'], example: 'dura-plus' },
  'canopy-rods': { slug: 'kozyrky-na-tyahakh', systems: ['punto', 'arcata', 'tubo'], example: 'punto' },
  'canopy-brackets': { slug: 'kozyrky-na-kronshteinakh', systems: ['spada'], example: 'spada' },
  'canopy-frame': { slug: 'kozyrky-v-rami', systems: ['ella'], example: 'ella' },
  'canopy-side': { slug: 'kozyrky-z-bokovym-zakhystom', systems: ['duravento'], example: 'duravento' },
  'canopy-business': { slug: 'kozyrky-dlya-biznesu', systems: ['spada', 'dura-plus', 'ella', 'tubo', 'arcata'], example: 'spada' }
};

/** Price block variant of a canopy catalog page, by slug (undefined = no price block). */
export const canopyPriceBlock = (slug: string) =>
  (Object.entries(CANOPY_PAGES) as [CanopyVariant, { slug: string | null }][]).find(([, page]) => page.slug === slug)?.[0];

/** Card guide for a system on a canopy page, or undefined (not on the page or not published, e.g. TRAVE). */
export const canopyCardGuide = (variant: PriceVariant, systemId: string) =>
  isCanopyVariant(variant) && CANOPY_PAGES[variant].systems.includes(systemId) ? canopyGuide(systemId) : undefined;

/* ---------------------------------------------------------------- windows ---------------- */
/*
 * Windows have no calculator yet: their blocks show market-orientation ranges from
 * src/pricing/window-pricing.ts (typical constructions, product without installation).
 */
export type WindowVariant = 'window-pvc' | 'window-alu';
export const isWindowVariant = (variant: PriceVariant): variant is WindowVariant => variant.startsWith('window-');
export const windowClassOf = (variant: WindowVariant): WindowClass => (variant === 'window-pvc' ? 'pvc' : 'alu');
export const windowMarket = (variant: WindowVariant) => WINDOW_MARKET[windowClassOf(variant)];

/* ---------------------------------------------------------------- glass doors ------------- */
/*
 * Glass doors have no calculator: their blocks show market-orientation ranges for typical
 * configurations from src/pricing/door-pricing.ts (product without installation and delivery).
 */
export type DoorVariant = 'door-hub' | 'door-swing' | 'door-pendulum' | 'door-sliding';
export const isDoorVariant = (variant: PriceVariant): variant is DoorVariant => variant.startsWith('door-');

/** Which typical configurations each door page shows, and its catalog slug (null = hub page). */
export const DOOR_PAGES: Record<DoorVariant, { slug: string | null; types: DoorType[] }> = {
  'door-hub': { slug: null, types: ['swing', 'pendulum', 'sliding'] },
  'door-swing': { slug: 'rozpashni-sklyani-dveri', types: ['swing', 'pendulum'] },
  'door-pendulum': { slug: 'mayatnykovi-sklyani-dveri', types: ['pendulum'] },
  'door-sliding': { slug: 'rozsuvni-sklyani-dveri', types: ['sliding'] }
};

/** Price block variant of a door catalog page, by slug (undefined = no price block). */
export const doorPriceBlock = (slug: string) =>
  (Object.entries(DOOR_PAGES) as [DoorVariant, { slug: string | null }][]).find(([, page]) => page.slug === slug)?.[0];

/* ---------------------------------------------------------------- showers ----------------- */
/*
 * Showers have no calculator: the hub block lists typical constructions with the catalog
 * "від" prices of their base models (src/pricing/shower-pricing.ts reads src/data/shower-catalog.ts).
 */
export type ShowerVariant = 'shower-hub';
export const isShowerVariant = (variant: PriceVariant): variant is ShowerVariant => variant.startsWith('shower-');
