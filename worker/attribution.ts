/**
 * Lead attribution (Task 60): validation of the context public/js/forms.js sends with a lead,
 * conservative traffic classification and the compact «Атрибуція» block of the Telegram / e-mail text.
 *
 * Everything here is client-supplied and therefore NOT verified: values are sanitised, length-limited
 * and the traffic label is derived again on the server from the raw ingredients (UTM, referrer host,
 * click-id flags) — the page never decides the label. The GA4 report stays the source of truth for
 * traffic sources; this block only helps to match a lead to its visit (lead_id = GA4 generate_lead).
 */

export type Attribution = {
  leadId?: string;
  landing?: string;
  utm: { source?: string; medium?: string; campaign?: string; content?: string; term?: string };
  refHost?: string;
  gclid: boolean;
  adClick: boolean;
  device: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  sourceLabel: string;
  channel: string;
  /** True when the browser sent any attribution field (none without analytics consent or from an old cached forms.js). */
  provided: boolean;
};

/** Keys the page sends; they must never end up in the free-form «options» line of a lead. */
export const ATTRIBUTION_KEYS = [
  'lead_id', 'attr_landing', 'attr_utm_source', 'attr_utm_medium', 'attr_utm_campaign', 'attr_utm_content', 'attr_utm_term',
  'attr_ref', 'attr_gclid', 'attr_adclick', 'attr_device'
] as const;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HOST_RE = /^[a-z0-9]([a-z0-9.-]{0,98}[a-z0-9])?$/;
const DEVICES = new Set(['desktop', 'mobile', 'tablet']);

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

/** Marketing parameter: letters, digits and a few separators only, at most 64 characters. */
export function cleanParam(value: unknown): string | undefined {
  const cleaned = text(value)
    .replace(/[^\p{L}\p{N} _.+:()|,/-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 64);
  return cleaned || undefined;
}

/** Path only (no query, no hash, no protocol-relative or absolute URL). */
export function cleanPath(value: unknown): string | undefined {
  const raw = text(value).split(/[?#]/)[0];
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.length > 200) return undefined;
  return /^[A-Za-z0-9/_\-.~%]+$/.test(raw) ? raw : undefined;
}

export function cleanHost(value: unknown): string | undefined {
  const host = text(value).toLowerCase();
  return host.length <= 100 && HOST_RE.test(host) ? host : undefined;
}

const SOCIAL_HOSTS = /(^|\.)(facebook|instagram|linkedin|tiktok|pinterest|youtube|twitter|reddit|vk|ok)\.(com|ru|co)$|(^|\.)(t\.co|x\.com|t\.me|telegram\.me|lnkd\.in|fb\.com|youtu\.be)$/;
const SOCIAL_SOURCES = /^(facebook|fb|instagram|ig|linkedin|tiktok|pinterest|youtube|twitter|x|telegram|reddit|social)$/i;
const SEARCH_ENGINES: [RegExp, string][] = [
  [/^(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?$/, 'google'],
  [/^(www\.)?bing\.com$/, 'bing'],
  [/^(www\.)?duckduckgo\.com$/, 'duckduckgo'],
  [/^([a-z]+\.)?search\.yahoo\.com$|^(www\.)?yahoo\.com$/, 'yahoo'],
  [/^(www\.)?ecosia\.org$/, 'ecosia']
];
const PAID_MEDIUM = /^(cpc|ppc|paid|paidsearch|paid[-_ ]?social|display|cpm|retargeting)$/i;

/**
 * Conservative label from the raw ingredients. Google is «organic» only when the referrer is a Google
 * search domain itself (search.google.com, mail.google.com, … are plain referrals) and no ad click id
 * or paid UTM is present.
 */
export function classifyTraffic(input: { utm: Attribution['utm']; refHost?: string; gclid: boolean; adClick: boolean }): { label: string; channel: string } {
  const { utm, refHost, gclid, adClick } = input;
  const medium = utm.medium ?? '';
  if (PAID_MEDIUM.test(medium) || (gclid && !utm.medium)) {
    const source = utm.source ?? (gclid ? 'google' : 'невідомо');
    const shown = /^(cpc|ppc|paidsearch)$/i.test(medium) || !medium ? 'cpc' : medium.toLowerCase();
    return { label: `${source.toLowerCase()} / ${shown}`, channel: /social/i.test(shown) || SOCIAL_SOURCES.test(source) ? 'Paid Social' : 'Paid' };
  }
  if (utm.source || utm.medium) {
    const label = `${(utm.source ?? 'невідомо').toLowerCase()} / ${(medium || 'невідомо').toLowerCase()}`;
    if (/social/i.test(medium) || SOCIAL_SOURCES.test(utm.source ?? '')) return { label, channel: 'Social' };
    if (/^e-?mail$/i.test(medium)) return { label, channel: 'Email' };
    if (/^organic$/i.test(medium)) return { label, channel: 'Organic (UTM)' };
    return { label, channel: 'Campaign (UTM)' };
  }
  if (adClick) return { label: 'ad click / невідомо', channel: 'Paid' };
  if (refHost) {
    const engine = SEARCH_ENGINES.find(([re]) => re.test(refHost));
    if (engine) return { label: `${engine[1]} / organic`, channel: 'Organic Search' };
    if (SOCIAL_HOSTS.test(refHost)) return { label: `${refHost} / social`, channel: 'Social' };
    return { label: `${refHost} / referral`, channel: 'Referral' };
  }
  return { label: 'direct / none', channel: 'Direct' };
}

export function parseAttribution(input: Record<string, unknown>): Attribution {
  const utm = {
    source: cleanParam(input.attr_utm_source),
    medium: cleanParam(input.attr_utm_medium),
    campaign: cleanParam(input.attr_utm_campaign),
    content: cleanParam(input.attr_utm_content),
    term: cleanParam(input.attr_utm_term)
  };
  const leadId = text(input.lead_id).toLowerCase();
  const device = text(input.attr_device).toLowerCase();
  const gclid = input.attr_gclid === '1';
  const adClick = input.attr_adclick === '1';
  const refHost = cleanHost(input.attr_ref);
  // lead_id alone (a visitor without analytics consent) is operational data, not attribution: the source stays unknown.
  const provided = ATTRIBUTION_KEYS.some((key) => key !== 'lead_id' && text(input[key]) !== '');
  const traffic = provided ? classifyTraffic({ utm, refHost, gclid, adClick }) : { label: 'невідомо', channel: 'невідомо' };
  return {
    leadId: UUID_RE.test(leadId) ? leadId : undefined,
    landing: cleanPath(input.attr_landing),
    utm,
    refHost,
    gclid,
    adClick,
    device: DEVICES.has(device) ? (device as Attribution['device']) : 'unknown',
    sourceLabel: traffic.label,
    channel: traffic.channel,
    provided
  };
}

const UNKNOWN = 'невідомо';

/** Compact block for the Telegram message (HTML parse mode): every value goes through `esc`. */
export function attributionLines(attribution: Attribution, submitPage: string | undefined, esc: (value: string) => string): string[] {
  const utm = Object.entries({ source: attribution.utm.source, medium: attribution.utm.medium, campaign: attribution.utm.campaign, content: attribution.utm.content, term: attribution.utm.term })
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join(' · ');
  return [
    '',
    '📈 <b>Атрибуція</b> <i>(дані браузера, не верифіковано)</i>',
    `Джерело: ${esc(attribution.provided ? attribution.sourceLabel : UNKNOWN)}`,
    `Канал: ${esc(attribution.provided ? attribution.channel : UNKNOWN)}`,
    `Посадкова сторінка: ${esc(attribution.landing ?? UNKNOWN)}`,
    `Сторінка заявки: ${esc(submitPage ?? UNKNOWN)}`,
    `UTM: ${esc(utm || UNKNOWN)}`,
    `Реферер: ${esc(attribution.refHost ?? UNKNOWN)}`,
    `Пристрій: ${esc(attribution.device === 'unknown' ? UNKNOWN : attribution.device)}`,
    `Lead ID: ${attribution.leadId ? `<code>${esc(attribution.leadId)}</code>` : UNKNOWN}`
  ];
}

/** Plain-text lines for the optional e-mail copy. */
export function attributionPlainLines(attribution: Attribution): string[] {
  return [
    `Джерело: ${attribution.provided ? attribution.sourceLabel : UNKNOWN} (дані браузера, не верифіковано)`,
    `Посадкова сторінка: ${attribution.landing ?? UNKNOWN}`,
    `Lead ID: ${attribution.leadId ?? UNKNOWN}`
  ];
}
