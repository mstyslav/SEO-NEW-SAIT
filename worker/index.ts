/**
 * Cloudflare Worker in front of the static Astro build (./dist).
 *
 * Only `/api/*` reaches this code (wrangler.jsonc → assets.run_worker_first); every other
 * request is served straight from the static assets.
 *
 * POST /api/kommo-lead (and /api/lead) — the endpoint used by every `[data-lead-form]`
 * (public/js/forms.js). The lead is delivered to every configured channel:
 *   1. Telegram group   — secrets TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   2. E-mail           — (next step)
 *   3. Kommo CRM        — (next step)
 * The request succeeds if at least one channel accepted the lead.
 *
 * Anti-spam (silently dropped with a fake "ok"): hidden honeypot field, JS-only marker +
 * header, < 3 s on the page, no real interaction, links / junk names, foreign Origin;
 * phone must be a valid Ukrainian (or explicit +international) number; 3 leads/min per IP.
 *
 * Secrets are set with `npx wrangler secret put NAME` — never commit them.
 */

export interface Env {
  ASSETS: Fetcher;
  /** Workers Rate Limiting binding (wrangler.jsonc → ratelimits). */
  LEAD_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

type Lead = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  comment?: string;
  product?: string;
  configuration?: string;
  estimatedPrice?: string;
  page?: string;
  locale?: string;
  options?: string;
  createdAt?: string;
};

const MAX = 4000;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const str = (value: unknown, max = 500) => (typeof value === 'string' ? value.trim().slice(0, max) : undefined) || undefined;

/** Ukrainian numbers (0XXXXXXXXX / 380XXXXXXXXX) or an explicit international +number. */
function normalisePhone(raw: string): string | null {
  if (/[a-zа-яіїєґ]/i.test(raw)) return null;
  const digits = raw.replace(/\D/g, '');
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  if (/^80\d{9}$/.test(digits)) return `+3${digits}`;
  if (raw.trim().startsWith('+') && /^\d{10,15}$/.test(digits) && !/^(\d)\1+$/.test(digits)) return `+${digits}`;
  return null;
}

const URL_RE = /(https?:\/\/|www\.|\.(ru|com|net|org|xyz|top|io|biz|info|site|online|click|link)\b|\[url|<a\s)/i;

/** Reasons a submission is treated as spam (silently dropped), empty = looks human. */
function spamReasons(input: Record<string, unknown>, lead: Lead): string[] {
  const reasons: string[] = [];
  if (typeof input.website === 'string' && input.website) reasons.push('honeypot');
  if (typeof input._js !== 'string' || !input._js.startsWith('sg-')) reasons.push('no_js');
  const elapsed = Number(input._elapsed);
  if (!Number.isFinite(elapsed) || elapsed < 3000) reasons.push('too_fast');
  if (input._h !== '1') reasons.push('no_interaction');
  if (URL_RE.test(lead.name) || URL_RE.test(lead.comment ?? '')) reasons.push('link');
  if (!/[a-zа-яіїєґ]/i.test(lead.name) || /\d{3,}/.test(lead.name) || lead.name.length < 2) reasons.push('bad_name');
  if (/[\u4e00-\u9fff]/.test(lead.name + (lead.comment ?? ''))) reasons.push('cjk');
  return reasons;
}

function parseLead(input: Record<string, unknown>): Lead | null {
  const name = str(input.name, 120);
  const phone = str(input.phone, 40);
  if (!name || !phone) return null;
  const page = str(input.page, 300) ?? (typeof input.source === 'string' && input.source.startsWith('/') ? str(input.source, 300) : undefined);
  // Any extra select the form had (e.g. «Система», «Ваш бізнес») arrives under its own name.
  const known = new Set(['name', 'phone', 'email', 'city', 'comment', 'message', 'product', 'configuration', 'estimatedPrice', 'page', 'source', 'locale', 'createdAt', 'consent', 'website', '_elapsed', '_h', '_js']);
  const options = Object.entries(input)
    .filter(([key, value]) => !known.has(key) && typeof value === 'string' && value.trim())
    .map(([key, value]) => `${key}: ${String(value).trim().slice(0, 200)}`)
    .join('\n');
  return {
    name,
    phone,
    email: str(input.email, 120),
    city: str(input.city, 80),
    comment: str(input.comment, 2000) ?? str(input.message, 2000),
    product: str(input.product, 200),
    configuration: str(input.configuration, 2000),
    estimatedPrice: str(input.estimatedPrice, 60),
    page,
    locale: str(input.locale, 5),
    options: options || undefined,
    createdAt: str(input.createdAt, 40)
  };
}

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);

function telegramText(lead: Lead, origin: string): string {
  const time = new Date(lead.createdAt ?? Date.now()).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv', dateStyle: 'short', timeStyle: 'short' });
  const tel = lead.phone.replace(/[^\d+]/g, '');
  const lines = [
    `🟢 <b>Нова заявка з сайту</b>${lead.product ? `\n<b>${esc(lead.product)}</b>` : ''}`,
    '',
    `👤 ${esc(lead.name)}`,
    `📞 <a href="tel:${esc(tel)}">${esc(lead.phone)}</a>`,
    lead.email && `✉️ ${esc(lead.email)}`,
    lead.city && `📍 ${esc(lead.city)}`,
    lead.options && `🔹 ${esc(lead.options)}`,
    lead.comment && `💬 ${esc(lead.comment)}`,
    lead.configuration && `\n⚙️ <b>Конфігурація:</b>\n${esc(lead.configuration.replace(/; /g, '\n'))}`,
    lead.estimatedPrice && `💰 ${esc(lead.estimatedPrice)}`,
    '',
    lead.page && `🔗 ${esc(origin + lead.page)}`,
    `🕒 ${time}${lead.locale === 'ru' ? ' · RU' : ''}`
  ];
  return lines.filter((l) => l !== undefined && l !== false).join('\n').slice(0, MAX);
}

async function sendTelegram(lead: Lead, env: Env, origin: string): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: telegramText(lead, origin), parse_mode: 'HTML', disable_web_page_preview: true })
  });
  if (!response.ok) console.error('telegram', response.status, await response.text());
  return response.ok;
}

async function handleLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  const lead = parseLead(body);
  if (!lead) return json({ ok: false, error: 'name_and_phone_required' }, 400);

  // Spam: answer "ok" so bots don't retry, but deliver nothing.
  const reasons = spamReasons(body, lead);
  if (request.headers.get('x-sg-form') !== '1') reasons.push('no_header');
  const origin0 = request.headers.get('origin');
  if (origin0 && new URL(origin0).host !== new URL(request.url).host) reasons.push('foreign_origin');
  if (reasons.length) {
    console.log('lead dropped as spam', reasons.join(','), lead.phone);
    return json({ ok: true });
  }
  const phone = normalisePhone(lead.phone);
  if (!phone) return json({ ok: false, error: 'invalid_phone' }, 400);
  lead.phone = phone;

  // Rate limit per visitor IP (3 leads / minute).
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (env.LEAD_LIMITER && !(await env.LEAD_LIMITER.limit({ key: ip })).success) {
    console.log('lead rate-limited', ip);
    return json({ ok: false, error: 'too_many_requests' }, 429);
  }

  const origin = new URL(request.url).origin;
  const results = await Promise.allSettled([sendTelegram(lead, env, origin)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value);
  if (!delivered) {
    console.error('lead not delivered', JSON.stringify(results));
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (/^\/api\/(kommo-lead|lead)\/?$/.test(pathname)) return handleLead(request, env);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
