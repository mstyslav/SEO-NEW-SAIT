// Pure helpers of the cart (shared by src/components/cart/ProjectCart.astro and scripts/test-cart-safety.mjs).
// localStorage is user-controlled data: links and images of a stored line are never trusted as they are.

/** Internal path only: "/..." without a scheme, "//host", backslashes, spaces or control characters. */
export function safeInternalPath(u) {
  if (typeof u !== 'string' || u.length > 300) return null;
  if (!/^\/(?!\/)[A-Za-z0-9\-._~%\/]*(\?[A-Za-z0-9\-._~%=&]*)?(#[A-Za-z0-9\-_]*)?$/.test(u)) return null;
  if (/(^|\/)\.\.(\/|$)/.test(u.split(/[?#]/)[0]) || /%2f|%5c|%2e%2e/i.test(u)) return null;
  return u;
}

/** Product image of a non-LED line: same-origin /images/ file only. */
export function safeImagePath(u) {
  return typeof u === 'string' && /^\/images\/[A-Za-z0-9\-._\/]+\.(webp|jpe?g|png|avif)$/.test(u) && !/\.\./.test(u) ? u : null;
}

/**
 * Link and photo of a LED mirror line, derived from the PUBLIC model data (never from what localStorage says):
 * { url, image } — `image` is null when the model has no photo (the cart then shows no picture instead of a foreign one).
 */
export function ledLinks(item, models, photos, locale = 'uk') {
  const m = models.get(Number(item.modelId));
  if (!m) return { url: null, image: null };
  const path = `/shop/mirrors/led/${m.slug}/`;
  return { url: (locale === 'ru' ? '/ru' : '') + path, image: (photos[m.slug] ?? 0) > 0 ? `/images/led-mirrors/${m.slug}-1-480.webp` : null };
}

/** Identity of a priced configuration (model + size + options), independent of line order, id and quantity. */
export const priceKey = (i) => `${i.modelId}|${i.w}|${i.h}|${JSON.stringify(Object.entries(i.options ?? {}).sort())}`;

/**
 * Applies server prices to the LATEST cart: only lines that are still there and still the same configuration get the new
 * price; quantities, removed lines, a cleared cart, the comment and everything else stay as the user left them.
 * `results` follows the order of `sentKeys`. Returns { project, changed }.
 */
export function applyPriceUpdates(latest, sentKeys, results) {
  let changed = false;
  const byKey = new Map();
  sentKeys.forEach((k, n) => { const r = results[n]; if (r && r.ok && Number(r.total_uah) > 0) byKey.set(k, r.total_uah); });
  for (const it of latest.items) {
    if (it.kind !== 'led-mirror') continue;
    const price = byKey.get(priceKey(it));
    if (price !== undefined && it.price !== price) { it.price = price; changed = true; }
  }
  return { project: latest, changed };
}
