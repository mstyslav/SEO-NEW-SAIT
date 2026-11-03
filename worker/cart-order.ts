/**
 * POST /api/cart-order — one order from the unified cart (UA / RU only).
 *
 *  - LED mirror lines are re-priced here from the private catalog; a price the browser reports that differs from the
 *    server's answers 409 price_changed (nothing is sent) with the current prices.
 *  - Other cart lines (configurators) carry the browser's own estimate; they are passed on marked as such, and a line
 *    without a price is passed on as "price to be confirmed".
 *  - Idempotent: the browser sends a client-generated orderId that stays the same on retries; once an order was
 *    accepted the same orderId answers the stored result again and nothing is sent twice (Cache API, 24 h, best effort).
 *  - Delivery goes through the site's existing lead channel (Telegram lead group, which the Space Glass Control CRM
 *    reads — see worker/index.ts). Kommo is NOT used. There is no dedicated Control CRM intake endpoint yet.
 */
import { priceOf, modelName, catalogDate } from './led-mirrors';

type Json = (body: unknown, status?: number) => Response;
export type CartDeps = {
  json: Json;
  normalisePhone: (raw: string) => string | null;
  /** Delivers one lead through the configured channels; true when at least one accepted it. */
  deliver: (input: Record<string, unknown>) => Promise<boolean>;
  rateLimited: (request: Request) => Promise<boolean>;
  /** Local rehearsal only (.dev.vars): validate and log, send nothing. Never set in production. */
  dryRun: boolean;
};

const MAX_ITEMS = 30;
const MAX_QTY = 50;
const SOURCE = 'Space Glass Website Cart';
const fmt = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн`;
const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const cacheKey = (id: string) => new Request(`https://cart-orders.internal/${encodeURIComponent(id)}`);

type Line = { kind: 'led-mirror' | 'other'; name: string; config: string; qty: number; unit: number | null; total: number | null; url?: string; verified: boolean; model_id?: number; w?: number; h?: number; options?: Record<string, string> };

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

  const lines: Line[] = [];
  const changed: { index: number; unit_uah: number }[] = [];
  for (const [index, raw] of rawItems.entries()) {
    const it = (raw ?? {}) as Record<string, unknown>;
    const qty = Number(it.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return json({ ok: false, error: 'invalid_quantity', index }, 400);
    if (it.kind === 'led-mirror') {
      const r = priceOf({ modelId: Number(it.modelId), w: Number(it.w), h: Number(it.h), options: (it.options ?? {}) as Record<string, string> });
      if (!r.ok) return json({ ok: false, error: r.error, index }, 400);
      const unit = r.price.total_uah;
      if (Number(it.price) !== unit) changed.push({ index, unit_uah: unit });
      const opts = r.price.options.map((o) => o.name).join(', ');
      lines.push({
        kind: 'led-mirror', name: `Дзеркало ${modelName(Number(it.modelId))}`, config: `${it.w}×${it.h} мм${r.price.standard_size ? '' : ' (нестандартний розмір)'}${opts ? `; ${opts}` : ''}`,
        qty, unit, total: unit * qty, url: text(it.url, 200), verified: true, model_id: Number(it.modelId), w: Number(it.w), h: Number(it.h), options: it.options as Record<string, string>
      });
    } else {
      const p = Number(it.price);
      const unit = Number.isFinite(p) && p > 0 && p < 1e8 ? Math.round(p) : null;
      lines.push({ kind: 'other', name: text(it.name, 160) || 'Конструкція', config: text(it.configuration, 600), qty, unit, total: unit === null ? null : unit * qty, url: text(it.url, 200), verified: false });
    }
  }
  if (changed.length) return json({ ok: false, error: 'price_changed', changed }, 409);

  if (await d.rateLimited(request)) return json({ ok: false, error: 'too_many_requests' }, 429);

  const known = lines.filter((l) => l.total !== null);
  const subtotal = known.reduce((a, l) => a + (l.total as number), 0);
  const unpriced = lines.length - known.length;
  const textLines = lines.map((l, i) =>
    `${i + 1}. ${l.name} — ${l.config || '—'}\n   ${l.qty} шт. × ${l.unit === null ? 'ціна уточнюється' : fmt(l.unit)} = ${l.total === null ? 'ціна уточнюється' : fmt(l.total)}${l.verified ? '' : l.unit === null ? '' : ' (орієнтовно, за конфігуратором)'}${l.url ? `\n   ${l.url}` : ''}`);
  const totalLine = unpriced === 0 ? `Підсумок: ${fmt(subtotal)}` : known.length ? `Проміжна сума позицій з відомою ціною: ${fmt(subtotal)} (${unpriced} поз. — ціна уточнюється; не остаточна сума)` : 'Ціна уточнюється для всіх позицій';

  const lead = {
    name, phone, comment: comment || undefined, product: 'Кошик Space Glass', page: '/cart/', locale: locale === 'ru' ? 'ru' : 'uk', createdAt: new Date().toISOString(),
    configuration: textLines.join('\n'), estimatedPrice: totalLine,
    'Джерело': SOURCE, 'Мова заявки': locale === 'ru' ? 'RU' : 'UA', 'ID заявки': orderId, 'Прайс LED-дзеркал': `станом на ${catalogDate()}`,
    _js: body._js, ...(typeof body.lead_id === 'string' ? { lead_id: body.lead_id } : {})
  } as Record<string, unknown>;

  const result = { ok: true, order_id: orderId, items: lines.length, subtotal_uah: subtotal, unpriced };
  if (d.dryRun) {
    console.log('cart order DRY RUN', JSON.stringify({ ...result, lead }));
    return json({ ...result, dry_run: true });
  }
  if (!(await d.deliver(lead))) {
    console.error('cart order not delivered', orderId);
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }
  if (cache) await cache.put(cacheKey(orderId), new Response(JSON.stringify(result), { headers: { 'content-type': 'application/json', 'cache-control': 'max-age=86400' } })).catch(() => undefined);
  return json(result);
}
