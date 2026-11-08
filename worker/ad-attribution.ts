/**
 * Advertising attribution of a cart order (Google Ads click ids), passed on to the Space Glass Control CRM for the «paid order»
 * offline conversion. The browser sends it ONLY after an explicit advertising consent (public/js/forms.js, sg-ad-consent); the
 * Worker checks it again and drops everything else. It is never part of the order's identity and never blocks an order.
 */
export type AdAttribution = {
  gclid: string | null; gbraid: string | null; wbraid: string | null; captured_at: string | null; landing: string | null;
  consent: { ad_user_data: 'granted'; ad_personalization: 'granted' | 'denied' };
};
const CLICK_ID = /^[A-Za-z0-9_-]{10,512}$/;

export function cleanAdAttribution(raw: unknown): AdAttribution | null {
  const a = raw as Record<string, unknown> | null;
  if (!a || typeof a !== 'object') return null;
  const c = (a.consent ?? {}) as Record<string, unknown>;
  if (c.ad_user_data !== 'granted') return null; // no advertising consent: nothing leaves the site
  const id = (v: unknown) => (typeof v === 'string' && CLICK_ID.test(v) ? v : null);
  const gclid = id(a.gclid), gbraid = id(a.gbraid), wbraid = id(a.wbraid);
  if (!gclid && !gbraid && !wbraid) return null;
  const at = typeof a.captured_at === 'string' && Number.isFinite(Date.parse(a.captured_at)) ? new Date(Date.parse(a.captured_at)).toISOString() : null;
  const landing = typeof a.landing === 'string' && /^\/[A-Za-z0-9/_\-.~%]{0,198}$/.test(a.landing) ? a.landing : null;
  return { gclid, gbraid, wbraid, captured_at: at, landing, consent: { ad_user_data: 'granted', ad_personalization: c.ad_personalization === 'granted' ? 'granted' : 'denied' } };
}
