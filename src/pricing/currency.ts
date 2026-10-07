/**
 * Working exchange rates for every price on the site — the one place to change them.
 *
 * Supplier tariffs stay in their own currency (USD: src/pricing/tariffs.json for partitions,
 * loft and frameless glazing; EUR: src/data/railing-pricing.ts and src/data/canopy-pricing.ts).
 * Every calculator and every "орієнтовна вартість" price block converts them with these rates,
 * so changing a number here re-prices all of them on the next build. Customers only ever see UAH.
 *
 * Fixed working rates (no automatic NBU rate for commercial prices).
 */

/** UAH per 1 USD. */
export const USD_UAH = 44.3;
/** UAH per 1 EUR. */
export const EUR_UAH = 50;
