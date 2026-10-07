/**
 * Indexed "орієнтовна вартість від" prices for the glass partitions cluster (pilot).
 *
 * Every number is derived from the calculators' own sources — tariffs.json and the
 * /peregorodky-configurator/ and /loft-configurator/ configs — through the same formula
 * (engine.ts: area × productUsdM2 × system multiplier + area × installationUsdM2, plus the
 * door surcharge). Change a tariff or a multiplier for the calculator and these follow.
 *
 * The rate is deliberately stable: the calculators' fallback rate + markup, no NBU request at
 * build time, so the indexed price does not move with every deploy. The live price at the
 * current NBU rate stays in the calculator. Prices include installation and are rounded down
 * to 100 UAH, so the page never shows a higher minimum than the calculator.
 */
import tariffs from './tariffs.json';
import partitionConfig from './configs/glass-partition.json';
import loftConfig from './configs/loft.json';
import { calculatePrice, type CategoryKey } from './engine';

type ConfigOption = { value: string; multiplier?: number; extraUsd?: number };
type Config = { fields: { id: string; default?: number; options?: ConfigOption[] }[] };

/** UAH per USD used for indexed prices: calculator fallback rate + markup. */
export const STABLE_RATE_UAH = tariffs.currency.fallbackRateUah + tariffs.currency.markupUah;

const option = (config: Config, fieldId: string, value: string): ConfigOption => {
  const found = config.fields.find((field) => field.id === fieldId)?.options?.find((item) => item.value === value);
  if (!found) throw new Error(`partition-prices: no option "${value}" in field "${fieldId}"`);
  return found;
};
const fieldDefault = (config: Config, fieldId: string) => Number(config.fields.find((field) => field.id === fieldId)?.default ?? 0);
const floor100 = (uah: number) => Math.floor(uah / 100) * 100;

/** Total for one construction, UAH (same formula as the calculator, installation included). */
const total = (category: CategoryKey, widthMm: number, heightMm: number, multiplier: number, extraUsd: number) =>
  calculatePrice({ category, widthMm, heightMm, installation: true, modifiers: [multiplier], usdRateUah: STABLE_RATE_UAH }).totalUah +
  extraUsd * STABLE_RATE_UAH;

const perM2 = (category: CategoryKey, multiplier: number) => floor100(total(category, 1000, 1000, multiplier, 0));

const gp = partitionConfig as Config;
const loft = loftConfig as Config;

export type PartitionSystemKey = 'frameless' | 'profile' | 'premium' | 'loft' | 'loftSlim' | 'loftPremium';

const SYSTEMS: Record<PartitionSystemKey, { category: CategoryKey; config: Config; field: string; value: string }> = {
  frameless: { category: 'glass_partitions', config: gp, field: 'system', value: 'Безрамна' },
  profile: { category: 'glass_partitions', config: gp, field: 'system', value: 'Профільна' },
  premium: { category: 'glass_partitions', config: gp, field: 'system', value: 'Premium' },
  loft: { category: 'loft', config: loft, field: 'profile', value: 'standard' },
  loftSlim: { category: 'loft', config: loft, field: 'profile', value: 'slim' },
  loftPremium: { category: 'loft', config: loft, field: 'profile', value: 'premium' }
};

/** «від» price per m² with installation, UAH. */
export const systemPricePerM2 = (key: PartitionSystemKey) => {
  const s = SYSTEMS[key];
  return perM2(s.category, option(s.config, s.field, s.value).multiplier ?? 1);
};

export type DoorKind = 'swing' | 'sliding';
/** Door surcharge, UAH («від»): partition doors or Loft doors. */
export const doorPrice = (kind: DoorKind, isLoft = false) =>
  floor100((isLoft ? option(loft, 'doors', kind === 'swing' ? 'hinged' : 'sliding') : option(gp, 'door', kind === 'swing' ? 'Розпашні' : 'Розсувні')).extraUsd! * STABLE_RATE_UAH);

/** Typical construction = the calculator's default width × height, installation included. */
export const examplePrice = (key: PartitionSystemKey, door: DoorKind | null) => {
  const s = SYSTEMS[key];
  const isLoft = s.category === 'loft';
  const widthMm = fieldDefault(s.config, 'width');
  const heightMm = fieldDefault(s.config, 'height');
  const extraUsd = door ? (isLoft ? option(loft, 'doors', door === 'swing' ? 'hinged' : 'sliding') : option(gp, 'door', door === 'swing' ? 'Розпашні' : 'Розсувні')).extraUsd ?? 0 : 0;
  const uah = total(s.category, widthMm, heightMm, option(s.config, s.field, s.value).multiplier ?? 1, extraUsd);
  return { widthMm, heightMm, areaM2: (widthMm / 1000) * (heightMm / 1000), uah: floor100(uah) };
};

/**
 * Card systems (PARTITION_SYSTEMS keys) whose price the calculator really models.
 * Sliding, telescopic, transforming, pendulum-door and "room in a room" systems are not
 * modelled, so their cards show no price.
 */
export const CARD_SYSTEM_PRICE: Record<string, PartitionSystemKey> = {
  pur: 'frameless',
  slim: 'profile',
  'slim-dveri': 'profile',
  'slim-black': 'loft',
  'slim-black-dveri': 'loft'
};

/** Which systems / example a page's price block shows (copy lives in PartitionPriceBlock.astro). */
export type PartitionPriceVariant = 'hub' | 'loft' | 'frameless' | 'office' | 'interior' | 'doors';
