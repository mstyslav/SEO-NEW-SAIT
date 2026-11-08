/**
 * POST /api/cart-order — one order from the unified cart (UA / RU only).
 *
 *  - LED mirror lines are re-priced here from the private catalog; a price the browser reports that differs from the
 *    server's answers 409 price_changed (nothing is sent) with the current prices.
 *  - Only kinds that have a SERVER-SIDE price are ever sent as verified (today: 'led-mirror'). Every other line (configurators,
 *    and any future shop category until it gets its own server price) is accepted but passed on WITHOUT a price (on_request:
 *    "price to be confirmed"); the browser's estimate is only written into the line text, labelled as unconfirmed. A new
 *    category therefore keeps working at once and becomes "verified" only when a server price check is added for its kind.
 *  - Product links are validated here (own origin + safe internal path, model page for LED lines); anything else is dropped.
 *  - The order is created DIRECTLY in the Space Glass Control CRM (signed server-to-server request, see crmPayload /
 *    worker/index.ts). The CRM stores it with a UNIQUE order id (the real idempotency) and sends the Telegram
 *    notification itself. Kommo is not used and there is NO Telegram fallback: if the CRM is down the visitor gets an
 *    error and the cart stays (a lead sent around the CRM would be a parallel, unmanaged order).
 *  - The Cache API below only short-circuits repeated clicks; it is not the duplicate protection.
 */
import type { LedConfig, PriceResult } from './led-mirrors';
import { normalizeItemUrl } from '../src/lib/cart-safe.mjs';
import { chosenOptions } from '../src/lib/cart-describe.mjs';
import { cleanAdAttribution } from './ad-attribution';

type Json = (body: unknown, status?: number) => Response;
export type CartDeps = {
  json: Json;
  normalisePhone: (raw: string) => string | null;
  /** Sends the order to the CRM; null = CRM not configured / unreachable. */
  crm: (payload: Record<string, unknown>) => Promise<{ status: number; body: Record<string, unknown> } | null>;
  /** Server-side retail price of one LED mirror configuration (secret-backed, see worker/led-mirrors.ts). */
  ledPrice: (cfg: LedConfig) => Promise<PriceResult>;
  modelName: (id: number) => string | undefined;
  catalogDate: () => string;
  rateLimited: (request: Request) => Promise<boolean>;
  /** Local rehearsal only (.dev.vars): validate and log, send nothing. Never set in production. */
  dryRun: boolean;
};

const MAX_ITEMS = 30;
const MAX_QTY = 50;
const SOURCE = 'Space Glass Website Cart'; // must equal the CRM's accepted source (cloudflare/src/site-orders.ts)
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const cacheKey = (id: string) => new Request(`https://cart-orders.internal/${encodeURIComponent(id)}`);

type Line = { kind: 'led-mirror' | 'other'; name: string; qty: number; unit: number | null; total: number | null; url?: string; verified: boolean; model_id?: number; w?: number; h?: number; options?: Record<string, string> };

export async function handleCartOrder(request: Request, env: unknown, d: CartDeps): Promise<Response> {
  const { json } = d;
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid_json' }, 400); }
  if (!body || typeof body !== 'object') return json({ ok: false, error: 'invalid_json' }, 400);

  const origin0 = request.headers.get('origin');
  if (request.headers.get('x-sg-form') !== '1' || (origin0 && new URL(origin0).host !== new URL(request.url).host)) return json({ ok: false, error: 'forbidden' }, 403);
  if (typeof body.website === 'string' && body.website) return json({ ok: true }); // honeypot: pretend success, deliver nothing

  const orderId = text(body.orderId, 64);
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(orderId)) return json({ ok: false, error: 'invalid_order_id' }, 400);
  const locale = body.locale === 'ru' ? 'ru' : 'uk';

  // Already accepted? Answer the stored result, send nothing.
  const cache = typeof caches !== 'undefined' ? (caches as unknown as { default: Cache }).default : undefined;
  const hit = cache ? await cache.match(cacheKey(orderId)).catch(() => undefined) : undefined;
  if (hit) return json({ ...(await hit.json() as object), duplicate: true });

  const name = text(body.name, 120);
  const phone = d.normalisePhone(text(body.phone, 40));
  if (name.length < 2) return json({ ok: false, error: 'invalid_name' }, 400);
  if (!phone) return json({ ok: false, error: 'invalid_phone' }, 400);
  const comment = text(body.comment, 1500);
  if (/(https?:\/\/|www\.)/i.test(name + comment)) return json({ ok: false, error: 'invalid_comment' }, 400);

  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length < 1 || rawItems.length > MAX_ITEMS) return json({ ok: false, error: 'invalid_items' }, 400);

  const origins = [new URL(request.url).origin, 'https://space-glass.com.ua'];
  const lines: Line[] = [];
  const changed: { index: number; unit_uah: number }[] = [];
  for (const [index, raw] of rawItems.entries()) {
    const it = (raw ?? {}) as Record<string, unknown>;
    const qty = Number(it.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return json({ ok: false, error: 'invalid_quantity', index }, 400);
    if (it.kind === 'led-mirror') {
      const r = await d.ledPrice({ modelId: Number(it.modelId), w: Number(it.w), h: Number(it.h), options: (it.options ?? {}) as Record<string, string> });
      if (!r.ok) return r.error === 'prices_unavailable' ? json({ ok: false, error: 'prices_unavailable' }, 503) : json({ ok: false, error: r.error, index }, 400);
      const unit = r.price.total_uah;
      if (Number(it.price) !== unit) changed.push({ index, unit_uah: unit });
      lines.push({
        kind: 'led-mirror', name: `Дзеркало ${d.modelName(Number(it.modelId))}`,
        qty, unit, total: unit * qty, url: normalizeItemUrl(it.url, origins, 'led-mirror') ?? undefined, verified: true, model_id: Number(it.modelId), w: Number(it.w), h: Number(it.h), options: chosenOptions(it.options as Record<string, string>)
      });
    } else {
      const est = Number(it.price);
      const estimate = Number.isFinite(est) && est > 0 && est < 1e8 ? Math.round(est) : null;
      const cfg = [estimate ? `Орієнтовна ціна з сайту: ${String(estimate).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн/шт, не підтверджена` : '', text(it.configuration, 400)].filter(Boolean).join('; ').slice(0, 190);
      lines.push({ kind: 'other', name: text(it.name, 160) || 'Конструкція', options: cfg ? { configuration: cfg } : {}, qty, unit: null, total: null, url: normalizeItemUrl(it.url, origins, 'other') ?? undefined, verified: false });
    }
  }
  if (changed.length) return json({ ok: false, error: 'price_changed', changed }, 409);

  if (await d.rateLimited(request)) return json({ ok: false, error: 'too_many_requests' }, 429);

  const ad = cleanAdAttribution(body.attribution);
  const known = lines.filter((l) => l.total !== null);
  const subtotal = known.reduce((a, l) => a + (l.total as number), 0);
  const unpriced = lines.length - known.length;
  const payload = {
    version: 1, order_id: orderId, source: SOURCE, locale: locale === 'ru' ? 'ru' : 'uk', ordered_at: new Date().toISOString(), price_list_date: d.catalogDate(),
    customer: { name, phone, comment },
    items: lines.map((l) => ({
      kind: l.kind, product_id: l.model_id ?? null, name: l.name, url: l.url || null, width_mm: l.w ?? null, height_mm: l.h ?? null, options: l.options ?? {},
      quantity: l.qty, unit_price_uah: l.unit, price_status: l.unit === null ? 'on_request' : l.verified ? 'verified' : 'estimate'
    })),
    totals: { currency: 'UAH', subtotal_uah: subtotal, unpriced_items: unpriced, complete: unpriced === 0 },
    // Google Ads click ids for the CRM's «paid order» conversion: present only with the visitor's advertising consent (re-checked here)
    ...(ad ? { attribution: ad } : {})
  };
  const result = { ok: true, order_id: orderId, items: lines.length, subtotal_uah: subtotal, unpriced };
  if (d.dryRun) {
    console.log('cart order DRY RUN', JSON.stringify({ ...result, items_sent: payload.items.length }));
    return json({ ...result, order_ref: `DRY-${orderId.slice(-6).toUpperCase()}`, dry_run: true });
  }
  const crm = await d.crm(payload);
  if (!crm) { console.error('cart order: CRM not reachable / not configured', orderId); return json({ ok: false, error: 'crm_unavailable' }, 503); }
  if (crm.status === 409) return json({ ok: false, error: 'order_conflict' }, 409);
  if (crm.status === 429) return json({ ok: false, error: 'too_many_requests' }, 429);
  if (crm.status !== 200 && crm.status !== 201) {
    console.error('cart order: CRM answered', crm.status, String(crm.body?.error ?? ''), orderId);
    return json({ ok: false, error: crm.status >= 500 || crm.status === 401 || crm.status === 503 ? 'crm_unavailable' : 'invalid_order' }, crm.status >= 500 || crm.status === 401 ? 503 : 400);
  }
  const done = { ...result, order_ref: String(crm.body.order_ref ?? '') };
  if (cache) await cache.put(cacheKey(orderId), new Response(JSON.stringify(done), { headers: { 'content-type': 'application/json', 'cache-control': 'max-age=86400' } })).catch(() => undefined);
  return json(done);
}
