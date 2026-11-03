/**
 * Server-side retail price of an LED mirror configuration.
 *
 * Purchase prices are NOT in Git and NOT in the bundle: they arrive at runtime in the Worker secret LED_MIRRORS_PRICES
 * (compact numeric table, see src/lib/led-prices-codec.mjs). Names, groups and size limits come from the public catalog file.
 * Every price returned from here is RETAIL (purchase total x markup, rounded up — src/lib/led-mirror-price.mjs).
 * If the secret is missing or damaged the answer is the controlled error "prices_unavailable": no placeholder prices, ever.
 * The browser asks POST /api/led-mirror-price; /api/cart-order calls this again, so a price shown in the browser is never trusted.
 */
// @ts-ignore — plain ES modules shared with the build scripts and tests
import { mirrorPrice } from '../src/lib/led-mirror-price.mjs';
// @ts-ignore
import { decodePrices } from '../src/lib/led-prices-codec.mjs';
// @ts-ignore — public data only: model list, option names, size limits (no prices)
import pub from '../src/data/led-mirrors/public.json';

export type LedConfig = { modelId: number; w: number; h: number; options: Record<string, string> };
export type LedPrice = { total_uah: number; mirror_uah: number; options: { group: string; name: string; uah: number }[]; standard_size: boolean };
export type PriceResult = { ok: true; price: LedPrice } | { ok: false; error: string };

// decoded once per isolate and per secret value
let cached: { secret: string; catalog: Promise<any> } | null = null;

async function catalogFor(secret: string | undefined): Promise<any | null> {
  if (!secret) return null;
  if (!cached || cached.secret !== secret) {
    const catalog = decodePrices(secret, pub).catch(() => null);
    cached = { secret, catalog };
  }
  const catalog = await cached.catalog;
  if (!catalog) { console.error('LED_MIRRORS_PRICES is damaged or does not match the public catalog'); cached = null; }
  return catalog;
}

/** Retail price, or an error code: prices_unavailable | model_not_found | invalid_size | invalid_option. */
export async function priceOf(env: { LED_MIRRORS_PRICES?: string }, cfg: LedConfig): Promise<PriceResult> {
  const { modelId, w, h, options } = cfg;
  if (!Number.isInteger(modelId) || !Number.isInteger(w) || !Number.isInteger(h)) return { ok: false, error: 'invalid_size' };
  if (options === null || typeof options !== 'object' || Array.isArray(options)) return { ok: false, error: 'invalid_option' };
  for (const v of Object.values(options)) if (typeof v !== 'string') return { ok: false, error: 'invalid_option' };
  const catalog = await catalogFor(env.LED_MIRRORS_PRICES);
  if (!catalog) return { ok: false, error: 'prices_unavailable' };
  try {
    const r = mirrorPrice(catalog, modelId, w, h, options);
    return { ok: true, price: { total_uah: r.total_uah, mirror_uah: r.base_uah, options: r.options, standard_size: r.standard_size } };
  } catch (e) {
    const code = (e as Error).message;
    return { ok: false, error: ['model_not_found', 'invalid_size', 'invalid_option'].includes(code) ? code : 'invalid_size' };
  }
}

export const modelName = (id: number): string | undefined => (pub.models as { id: number; name_short: string }[]).find((m) => m.id === id)?.name_short;
export const catalogDate = (): string => pub.collected as string;
