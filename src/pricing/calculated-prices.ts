/**
 * Indexed "орієнтовна вартість від" prices for catalog pages (glass partitions, frameless glazing).
 *
 * Every number is derived from the calculators' own sources — tariffs.json and the
 * /peregorodky-configurator/, /loft-configurator/ and /bezramne-configurator/ configs — through
 * the same formula (engine.ts: area × productUsdM2 × option multiplier + area × installationUsdM2,
 * plus a fixed door surcharge). Change a tariff or a multiplier for the calculator and these follow.
 *
 * The rate is deliberately stable: the calculators' fallback rate + markup, no NBU request at
 * build time, so the indexed price does not move with every deploy. The live price at the
 * current NBU rate stays in the calculator. Prices include installation and are rounded down
 * to 100 UAH, so the page never shows a higher minimum than the calculator.
 */
import tariffs from './tariffs.json';
import partitionConfig from './configs/glass-partition.json';
import loftConfig from './configs/loft.json';
import framelessConfig from './configs/frameless-glazing.json';
import { calculatePrice, type CategoryKey } from './engine';

type ConfigOption = { value: string; multiplier?: number; extraUsd?: number };
type Config = { fields: { id: string; default?: number; options?: ConfigOption[] }[] };

/** UAH per USD used for indexed prices: calculator fallback rate + markup. */
export const STABLE_RATE_UAH = tariffs.currency.fallbackRateUah + tariffs.currency.markupUah;

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
  | 'glazing-hub' | 'glazing-folding' | 'glazing-sliding' | 'glazing-terrace' | 'glazing-gazebo' | 'glazing-balcony';

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
  const key = CARD_SYSTEM_PRICE[variant.startsWith('glazing') ? 'glazing' : 'partition'][systemId];
  return key ? systemPricePerM2(key) : undefined;
};
