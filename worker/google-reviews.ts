/**
 * GET /api/google-reviews — same-origin proxy to the `space-glass-google-reviews` Worker
 * (Google Business Profile API; OAuth secrets live only in that Worker).
 * The upstream Worker sends no CORS headers, so the browser cannot call it directly.
 * Successful answers are cached 1 hour at the edge (Cache API); errors are never cached.
 * Browsers must revalidate every time: the zone's Browser Cache TTL (1 month = 2678400 s)
 * rewrites max-age on anything that passes through Cloudflare's cache layer, so the stored
 * copy carries the edge TTL and every response to the visitor is rebuilt with `no-cache`.
 */
const UPSTREAM = 'https://space-glass-google-reviews.shakal-slavko.workers.dev/reviews';
const TTL = 3600;

function forBrowser(body: BodyInit | null, state: 'HIT' | 'MISS'): Response {
  return new Response(body, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-cache', 'x-reviews-cache': state } });
}

export async function googleReviews(request: Request, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('{"error":"Method not allowed"}', { status: 405, headers: { 'content-type': 'application/json', allow: 'GET, HEAD' } });
  }
  const cache = (caches as unknown as { default: Cache }).default;
  const key = new Request(new URL('/api/google-reviews', request.url).toString(), { method: 'GET' });
  const hit = await cache.match(key);
  if (hit) return forBrowser(hit.body, 'HIT');
  const fail = () => new Response('{"error":"Reviews unavailable"}', { status: 502, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  try {
    const upstream = await fetch(UPSTREAM, { headers: { accept: 'application/json' } });
    if (!upstream.ok) return fail();
    const data = (await upstream.json()) as { total?: number; reviews?: unknown[] };
    if (!Array.isArray(data.reviews)) return fail();
    const res = new Response(JSON.stringify({ source: 'Google Business Profile', total: data.total ?? data.reviews.length, reviews: data.reviews }), {
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': `public, max-age=${TTL}, s-maxage=${TTL}` },
    });
    ctx.waitUntil(cache.put(key, res.clone()));
    return forBrowser(res.body, 'MISS');
  } catch {
    return fail();
  }
}
