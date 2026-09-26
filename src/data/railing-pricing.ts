/**
 * Glass railings configurator price model (/ogorozhi-configurator/).
 *
 * Prices are the partner's current retail prices in EUR, rebuilt from the partner
 * configurator's component list (profile per metre, glass per m², shape, corners,
 * colour, handrail, volume discount) and calibrated so each system's reference
 * price for 1.0 m × 0.9 m (I-shape, clear glass, no extras) matches the partner's
 * published price (2026-09). Final price in UAH = EUR × EUR_RATE × COEFFICIENT.
 *
 * ▶ Change EUR_RATE and COEFFICIENT below to set your own prices.
 */

/** UAH per 1 EUR. */
export const EUR_RATE = 48;
/** Your multiplier on top of the partner price (delivery, customs, margin). 1 = partner retail price. */
export const COEFFICIENT = 1;
/** Space Glass installation, UAH per running metre, and the minimum per order. */
export const INSTALL_UAH_PER_M = 1500;
export const INSTALL_UAH_MIN = 7500;

export type ShapeId = 'I' | 'L' | 'U';
export type SystemType = 'profile' | 'points' | 'posts' | 'french';

export interface RailingSystem {
  id: string;
  name: string;
  type: SystemType;
  note: string;
  image: string;
  /** Partner price (EUR) for 1.0 × 0.9 m, I-shape, clear glass, no extras. */
  referenceEur: number;
  maxHeight: number;
  maxPanel: number;
  glass: { id: string; label: string; heavy: boolean }[];
  handrailIncluded?: boolean;
  shapes: ShapeId[];
}

const PROFILE_GLASS = [{ id: 'g17', label: 'Триплекс 17,52 мм (8+8)', heavy: false }, { id: 'g21', label: 'Триплекс 21,52 мм (10+10)', heavy: true }];
const ALL: ShapeId[] = ['I', 'L', 'U'];

export const SYSTEMS: RailingSystem[] = [
  { id: 'delgado', name: 'DELGADO', type: 'profile', note: 'Профіль зверху, урівень із краєм плити', image: 'gp-delgado-terasa', referenceEur: 522.51, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'formal', name: 'FORMAL', type: 'profile', note: 'Профіль зверху з відступом від краю', image: 'gp-formal-terasa', referenceEur: 477.94, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'clip', name: 'CLIP', type: 'profile', note: 'Компактний профіль із накладкою', image: 'gp-clip-skhody', referenceEur: 488.93, maxHeight: 1000, maxPanel: 2000, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'ante', name: 'ANTE', type: 'profile', note: 'Вузький профіль на торець плити', image: 'gp-ante-skhody', referenceEur: 499.0, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'variante', name: 'VARIANTE', type: 'profile', note: 'Торцевий профіль із накладкою 23 см', image: 'gp-variante-galereia', referenceEur: 596.36, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'baldosa', name: 'BALDOSA', type: 'profile', note: 'Торцевий профіль з облицюванням до 60 см', image: 'gp-baldosa-budynok', referenceEur: 630.84, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'solo', name: 'SOLO', type: 'points', note: 'Точкові тримачі на торці', image: 'gp-solo-skhody', referenceEur: 532.79, maxHeight: 1300, maxPanel: 2500, glass: PROFILE_GLASS, shapes: ALL },
  { id: 'gardo', name: 'GARDO', type: 'posts', note: 'Круглі стійки з поручнем', image: 'gp-gardo-kriplennia', referenceEur: 549.85, maxHeight: 1000, maxPanel: 1500, glass: [{ id: 'g17', label: 'Триплекс 8,76 мм (4+4)', heavy: false }, { id: 'g21', label: 'Триплекс 12,76 мм (6+6)', heavy: true }], handrailIncluded: true, shapes: ALL },
  { id: 'densaro', name: 'DENSARO', type: 'posts', note: 'Квадратні стійки, суцільне затискання', image: 'gp-densaro-balkon', referenceEur: 806.45, maxHeight: 1100, maxPanel: 1500, glass: [{ id: 'g17', label: 'Триплекс 12,76 мм (6+6)', heavy: false }], handrailIncluded: true, shapes: ALL },
  { id: 'lineo', name: 'LINEO', type: 'french', note: 'Французький балкон на раму вікна', image: 'gp-lineo-balkon', referenceEur: 287.66, maxHeight: 1100, maxPanel: 2500, glass: [{ id: 'g17', label: 'Триплекс', heavy: false }], shapes: ['I'] },
  { id: 'canto', name: 'CANTO', type: 'french', note: 'Французький балкон на тримачах в укосах', image: 'gp-canto-fasad', referenceEur: 317.58, maxHeight: 1100, maxPanel: 2500, glass: [{ id: 'g17', label: 'Триплекс', heavy: false }], shapes: ['I'] }
];

/** Components in EUR at the partner's current retail level. */
export const EUR = {
  shape: { I: 106.9, L: 149.6, U: 192.4 } as Record<ShapeId, number>,
  corner: 25.7,
  materialPerM: 16.6,
  /** Glass per m²: [standard thickness, heavy thickness]. */
  glass: {
    clear: { label: 'Прозоре', tint: '#dcebef', perM2: [230.8, 271.1] },
    extra: { label: 'Екстрапрозоре', tint: '#eef6f7', perM2: [298.0, 358.2] },
    grey: { label: 'Сіре', tint: '#b9c0c3', perM2: [289.4, 391.2] },
    dark: { label: 'Темно-сіре', tint: '#7d8488', perM2: [478.9, 714.3] }
  },
  satin: {
    none: { label: 'Без матування', perM2: 0 },
    partial: { label: 'Часткове матування', perM2: 129.8 },
    full: { label: 'Повне матування', perM2: 21.4 }
  },
  coatingPerM2: 36.9,
  colour: {
    steel: { label: 'Під нержавійку', swatch: '#c4c8cc', perM: 0, once: 0 },
    black: { label: 'Чорний RAL 9005', swatch: '#1d1f21', perM: 61.6, once: 162.5 },
    anthracite: { label: 'Антрацит RAL 7016', swatch: '#383e42', perM: 61.6, once: 162.5 },
    white: { label: 'Білий RAL 9016', swatch: '#f4f4f0', perM: 61.6, once: 162.5 },
    ral: { label: 'Інший RAL', swatch: 'conic-gradient(#d33,#fc3,#3a3,#39f,#93f,#d33)', perM: 61.6, once: 162.5 }
  },
  handrail: {
    none: { label: 'Без поручня', perM: 0 },
    round: { label: 'Круглий, нержавійка', perM: 43.6 },
    square: { label: 'Прямокутний, нержавійка', perM: 54.2 },
    u: { label: 'U-профіль на кромку скла', perM: 23.5 }
  },
  /** Volume discount by total length, metres. */
  volume: [[6, 1], [12, 0.95], [20, 0.925], [25, 0.91], [50, 0.9], [100, 0.89], [Infinity, 0.875]] as [number, number][]
};

/** Partner reference conditions used for calibration. */
export const REFERENCE = { length: 1, height: 0.9 };
