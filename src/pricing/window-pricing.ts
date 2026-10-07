/**
 * Market orientation for PVC and warm aluminium windows (price blocks on the two window pages).
 *
 * These are NOT tariffs and NOT a calculator formula: there is no window calculator. The ranges are
 * public market orientation for basic configurations and for typical constructions that are well
 * confirmed by current Ukrainian market offers (product only, no installation). Large panoramic,
 * non-standard and heavy constructions are quoted individually; the exact price follows measuring.
 * Change the numbers here only — UA and RU pages read the same data.
 */

export type WindowClass = 'pvc' | 'alu';
export type Sash = 'fixed' | 'tiltTurn' | 'turn';
export type Range = readonly [number, number];

export interface TypicalWindow {
  widthMm: number;
  heightMm: number;
  /** Sashes left to right. */
  sashes: Sash[];
  /** Guide price of the product, UAH, without installation. */
  rangeUah: Range;
}

export const WINDOW_MARKET: Record<WindowClass, { perM2Uah: Range; typical: TypicalWindow[] }> = {
  pvc: {
    perM2Uah: [5000, 6000],
    typical: [
      { widthMm: 1300, heightMm: 1400, sashes: ['fixed', 'tiltTurn'], rangeUah: [8000, 10000] },
      { widthMm: 2000, heightMm: 1400, sashes: ['tiltTurn', 'fixed', 'tiltTurn'], rangeUah: [13000, 16000] }
    ]
  },
  alu: {
    perM2Uah: [14000, 18000],
    typical: [{ widthMm: 1400, heightMm: 1500, sashes: ['fixed', 'tiltTurn'], rangeUah: [30000, 38000] }]
  }
};

/** Installation guide (shown separately, never added to the product price). */
export const WINDOW_INSTALL_FROM_UAH_PER_M2 = 1500;
