/**
 * Typical shower constructions for the price block on /dushovi-kabiny/ (UA + RU).
 *
 * NOT a second price list and NOT a calculator: every number is read from the model cards in
 * src/data/shower-catalog.ts (partner catalog "від" prices for the base size, without
 * installation). Change a model price there — the hub follows on the next build.
 * The old "shower" category in tariffs.json is not used.
 */
import { showerCategories } from '../data/shower-catalog';

/**
 * General starting orientation of the whole shower direction (business decision). It is NOT
 * the minimum of every model: some base models (e.g. a straight Walk-In panel) cost less.
 */
export const SHOWER_HUB_FROM_UAH = 12000;

export type ShowerTypicalKey = 'walkin' | 'niche' | 'sliding' | 'corner';

/** Which catalog model represents each typical construction (category slug + model id). */
const TYPICAL: { key: ShowerTypicalKey; category: string; model: string; baseSize?: string }[] = [
  // Base size of FALLS as stated in its catalog FAQ ("пряма перегородка FALLS 800×2000 мм").
  { key: 'walkin', category: 'peregorodka-dlya-dusha', model: 'dush-falls', baseSize: '800×2000' },
  { key: 'niche', category: 'dushovi-dveri', model: 'dush-princess' },
  { key: 'sliding', category: 'rozsuvni', model: 'dush-stenli' },
  { key: 'corner', category: 'kutovi', model: 'dush-rain' }
];

const digits = (text: string | undefined, what: string) => {
  const match = text?.replace(/[\s ]/g, '').match(/\d+/);
  if (!match) throw new Error(`shower-pricing: no number in ${what}: "${text}"`);
  return Number(match[0]);
};

/** Typical constructions with the catalog price ("від", UAH, base size, without installation). */
export const SHOWER_TYPICAL = TYPICAL.map(({ key, category, model, baseSize }) => {
  const item = showerCategories.find((c) => c.slug === category)?.models.find((m) => m.id === model);
  if (!item) throw new Error(`shower-pricing: model ${model} not found in ${category}`);
  const glass = item.specs?.find(([label]) => label === 'Скло')?.[1];
  return {
    key,
    model: item.name.replace(/^Space Glass\s+/, ''),
    baseSize,
    glassMm: digits(glass, `${model} glass`),
    fromUah: digits(item.priceFrom, `${model} priceFrom`)
  };
});
