/**
 * Market orientation for frameless glass doors (price blocks on the glass-door hub and the
 * swing / pendulum / sliding door pages).
 *
 * These are NOT tariffs and NOT a calculator formula: there is no door calculator. The ranges are
 * public market orientation for typical constructions (product only — no installation, no
 * delivery). The exact price follows measuring. Change the numbers here only — UA and RU pages
 * read the same data.
 */

export type DoorType = 'swing' | 'pendulum' | 'sliding';
export type Range = readonly [number, number];

/** Typical configuration of each door type, guide price in UAH without installation and delivery. */
export const DOOR_MARKET: Record<DoorType, { glassMm: number; rangeUah: Range }> = {
  /** Single-leaf swing door: ESG 10 mm clear, glass hinges, handle, no closer. */
  swing: { glassMm: 10, rangeUah: [15000, 20000] },
  /** Door with a floor spring closer (pendulum): ESG 10 mm, fittings, floor closer, handle. */
  pendulum: { glassMm: 10, rangeUah: [20000, 30000] },
  /** Sliding glass door: ESG 10 mm, sliding system, handle. */
  sliding: { glassMm: 10, rangeUah: [18000, 28000] }
};
