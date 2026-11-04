/**
 * Merchant TSV generated from the SAME secret-backed priceOf() used by the product page and checkout.
 * This endpoint is intentionally gated until Merchant policies and account shipping settings are approved.
 * No purchase prices or secret catalog contents are emitted.
 */
import pub from '../src/data/led-mirrors/public.json';
import photos from '../src/data/led-mirrors/photos.json';
import { priceOf } from './led-mirrors';

const ORIGIN = 'https://space-glass.com.ua';
const COLUMNS = ['id','item_group_id','title','description','link','image_link','price','availability','condition','brand','identifier_exists','min_handling_time','max_handling_time','shipping'];
const cell = (value: unknown): string => String(value ?? '').replace(/[\t\r\n]+/g,' ').trim();

export async function merchantFeed(env: { LED_MIRRORS_PRICES?: string; MERCHANT_FEED_ENABLED?: string }, request: Request): Promise<Response> {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  if (env.MERCHANT_FEED_ENABLED !== '1') return new Response('Feed not activated', { status: 503, headers: { 'cache-control': 'no-store' } });
  const rows: string[] = [];
  for (const model of pub.models) {
    const n = (photos as Record<string, number>)[model.slug] ?? 0;
    if (!n) return new Response('Feed image missing', { status: 503 });
    for (const size of model.standard_sizes) {
      const result = await priceOf(env, { modelId: model.id, w: size.w, h: size.h, options: {} });
      if (!result.ok || !Number.isInteger(result.price.total_uah) || result.price.total_uah <= 0) {
        return new Response('Feed price unavailable', { status: 503, headers: { 'cache-control': 'no-store' } });
      }
      const metal = model.frame === 'Металева';
      const id = `sg-led-${model.slug}-${size.w}x${size.h}`;
      const title = `Дзеркало ${model.name_short} ${size.w}×${size.h} мм`;
      const description = `Дзеркало ${model.name_short}, ${size.w}×${size.h} мм. Виготовлення під замовлення: до ${metal ? 35 : 15} робочих днів після підтвердження та передоплати. Безкоштовна доставка Новою поштою по Україні.`;
      const link = `${ORIGIN}/shop/mirrors/led/${model.slug}/?size=${size.w}x${size.h}`;
      const row: Record<string,string|number> = {
        id, item_group_id: `sg-led-${model.slug}`, title, description, link,
        image_link: `${ORIGIN}/images/led-mirrors/${model.slug}-1-900.webp`,
        price: `${result.price.total_uah}.00 UAH`,
        // In-stock here means available to ORDER, not physically warehoused. Activation requires policy review.
        availability: 'in_stock', condition: 'new', brand: 'Space Glass', identifier_exists: 'no',
        min_handling_time: 0, max_handling_time: metal ? 35 : 15,
        shipping: 'UA:::0.00 UAH'
      };
      rows.push(COLUMNS.map(k => cell(row[k])).join('\t'));
    }
  }
  if (rows.length !== 185) return new Response('Feed item count mismatch', { status: 503, headers: { 'cache-control': 'no-store' } });
  return new Response([COLUMNS.join('\t'), ...rows].join('\n') + '\n', {
    headers: { 'content-type': 'text/tab-separated-values; charset=utf-8', 'cache-control': 'public, max-age=300', 'x-content-type-options': 'nosniff' }
  });
}
