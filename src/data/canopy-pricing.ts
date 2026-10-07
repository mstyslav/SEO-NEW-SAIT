/**
 * Glass canopy configurator price model (/kozyrky-configurator/).
 *
 * Built from the partner's online configurator (2026-09): for every system the base
 * price (glass + holders, clear glass, no extras) was sampled at several sizes and fitted
 * as  base = a + b·W + c·A  (W = width, m; A = width × depth, m²) — exact for PUNTO,
 * SPADA and ARCATA, within ~2–5 % for DURA PLUS, DURAVENTO, ELLA and TUBO, ~15 % for TRAVE
 * (the partner switches glass thickness and adds brackets automatically).
 * The partner's prices already include its current discount; option prices below are the
 * partner's list prices and are multiplied by OPTION_FACTOR (the same discount).
 * Final price in UAH = EUR × EUR_RATE × COEFFICIENT (+ Space Glass installation).
 *
 * The EUR rate is the site's working rate — change it in src/pricing/currency.ts.
 * ▶ Change COEFFICIENT and the installation rates to set your own prices.
 */
import { EUR_UAH } from '../pricing/currency';

/** UAH per 1 EUR (working rate from src/pricing/currency.ts). */
export const EUR_RATE = EUR_UAH;
/** Your multiplier on top of the partner price (delivery, customs, margin). 1 = partner price. */
export const COEFFICIENT = 1;
/** Partner discount applied to option list prices (1 − 45 %). */
export const OPTION_FACTOR = 0.55;
/** Space Glass measuring, delivery and installation, UAH: fixed part + per m² of canopy. */
export const INSTALL_UAH_BASE = 6000;
export const INSTALL_UAH_PER_M2 = 1500;

export type GlassId = 'clear' | 'extra' | 'satin' | 'satinExtra' | 'grey' | 'solar';
export type FixingId = 'none' | 'masonry' | 'wood' | 'insulation';
export type Support = 'console' | 'rods' | 'swords' | 'brackets' | 'frame' | 'tube' | 'arch' | 'side';

export const GLASS_LABELS: Record<GlassId, { label: string; tint: string }> = {
  clear: { label: 'Прозоре', tint: '#dcebef' },
  extra: { label: 'Екстрапрозоре', tint: '#eef6f7' },
  satin: { label: 'Матове', tint: '#f3f5f5' },
  satinExtra: { label: 'Матове екстрапрозоре', tint: '#fafbfb' },
  grey: { label: 'Сіре', tint: '#b9c0c3' },
  solar: { label: 'Сонцезахисне дзеркальне', tint: '#c8d2d8' }
};

export const FIXING_LABELS: Record<FixingId, string> = {
  none: 'Без кріпильних матеріалів',
  masonry: 'Бетон, цегла, газоблок',
  wood: 'Дерев’яна стіна',
  insulation: 'Утеплений фасад'
};

export interface CanopySystem {
  id: string;
  name: string;
  title: string;
  note: string;
  support: Support;
  /** base EUR = a + b·W + c·A */
  a: number;
  b: number;
  c: number;
  minW: number;
  maxW: number;
  minD: number;
  maxD: number;
  /** Glass surcharge, partner list EUR per m² (clear = 0). */
  glass: Record<Exclude<GlassId, 'clear'>, number>;
  /** Easy-clean coating, list EUR per m². */
  coating: number;
  /** Wall fixing kit, list EUR — per running metre of width or per holder. */
  fixing: { unit: 'm' | 'holder'; masonry: number; wood: number; insulation: number };
  holders: number;
  /** Sealed wall joint, list EUR per running metre (if available). */
  wallJoint?: number;
  /** Gutter, list EUR per running metre (if available). */
  gutter?: { slim: number; large: number };
  /** System-specific extra: [label, list EUR]. */
  extra?: [string, number];
}

const G_STD = { solar: 202.19, extra: 161.42, satin: 170.76, satinExtra: 274.15, grey: 345.01 };
const G_PREM = { solar: 481.21, extra: 206.82, satin: 206.82, satinExtra: 372.28, grey: 355.74 };
const G_LARGE = { solar: 481.21, extra: 330.92, satin: 220.61, satinExtra: 496.38, grey: 330.92 };

export const CANOPY_CONFIG_SYSTEMS: CanopySystem[] = [
  { id: 'dura-plus', name: 'DURA PLUS', title: 'Консольний козирок без тяг', note: 'Скло в затискному профілі на стіні', support: 'console', a: 148.19, b: 333.31, c: 537.64, minW: 400, maxW: 6000, minD: 200, maxD: 1150, glass: G_STD, coating: 120.2, fixing: { unit: 'm', masonry: 105.22, wood: 110.17, insulation: 497.62 }, holders: 0, gutter: { slim: 35.69, large: 59.6 } },
  { id: 'punto', name: 'PUNTO', title: 'Скляний козирок на тягах', note: 'Тяги й точкові тримачі з нержавійки', support: 'rods', a: 589.92, b: 0, c: 301.43, minW: 900, maxW: 4000, minD: 700, maxD: 1790, glass: { solar: 198.99, extra: 192.6, satin: 171.69, satinExtra: 226.84, grey: 300.39 }, coating: 120.2, fixing: { unit: 'holder', masonry: 34.85, wood: 29.16, insulation: 141.65 }, holders: 2, wallJoint: 15.81, gutter: { slim: 35.69, large: 59.6 } },
  { id: 'spada', name: 'SPADA', title: 'Козирок на кронштейнах-мечах', note: 'Мечі з нержавійки, глибина до 2 м', support: 'swords', a: 851.49, b: 0, c: 379.18, minW: 800, maxW: 4000, minD: 700, maxD: 2000, glass: G_PREM, coating: 173.73, fixing: { unit: 'm', masonry: 110.31, wood: 110.31, insulation: 275.77 }, holders: 2, wallJoint: 55.15, gutter: { slim: 110.31, large: 165.46 }, extra: ['Гравіювання логотипу на мечах', 551.54] },
  { id: 'trave', name: 'TRAVE', title: 'Козирок на трубчастих кронштейнах', note: 'Кронштейни під склом — для низьких входів', support: 'brackets', a: 211.07, b: 248.57, c: 615.82, minW: 900, maxW: 4000, minD: 700, maxD: 1550, glass: G_PREM, coating: 173.73, fixing: { unit: 'm', masonry: 55.15, wood: 55.15, insulation: 275.77 }, holders: 2, wallJoint: 55.15, gutter: { slim: 110.31, large: 165.46 }, extra: ['Кронштейни, з’єднані в раму', 579.11] },
  { id: 'duravento', name: 'DURAVENTO', title: 'Козирок з бічною стінкою', note: 'Консольний козирок + скляна стінка 1,8 м', support: 'side', a: 1022.17, b: 193.97, c: 848.11, minW: 1400, maxW: 4000, minD: 300, maxD: 1000, glass: G_STD, coating: 120.2, fixing: { unit: 'm', masonry: 105.22, wood: 110.17, insulation: 502.67 }, holders: 0, gutter: { slim: 35.69, large: 59.6 } },
  { id: 'ella', name: 'ELLA', title: 'Козирок у сталевій рамі', note: 'Рама з вбудованим водовідводом', support: 'frame', a: 1619.95, b: 42.97, c: 1112.26, minW: 1600, maxW: 4000, minD: 500, maxD: 1500, glass: G_LARGE, coating: 173.73, fixing: { unit: 'm', masonry: 137.88, wood: 137.88, insulation: 275.77 }, holders: 0, extra: ['LED-підсвітка: 3 споти + блок живлення', 1268.52] },
  { id: 'tubo', name: 'TUBO', title: 'Великий козирок у підвісній рамі', note: 'Рама з труб нержавійки на тягах', support: 'tube', a: 2234.36, b: 109.29, c: 945.72, minW: 800, maxW: 4000, minD: 500, maxD: 2000, glass: G_LARGE, coating: 173.73, fixing: { unit: 'holder', masonry: 110.31, wood: 110.31, insulation: 275.77 }, holders: 2, wallJoint: 55.15, gutter: { slim: 110.31, large: 165.46 } },
  { id: 'arcata', name: 'ARCATA', title: 'Арочний скляний козирок', note: 'Гнуте скло на тягах', support: 'arch', a: 2206.82, b: 0, c: 887.28, minW: 800, maxW: 4000, minD: 700, maxD: 2000, glass: G_LARGE, coating: 173.73, fixing: { unit: 'holder', masonry: 55.15, wood: 55.15, insulation: 137.88 }, holders: 2, wallJoint: 55.15, extra: ['Квадратні точкові тримачі', 551.54] }
];
