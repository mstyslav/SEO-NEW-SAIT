/**
 * Cloudflare Worker in front of the static Astro build (./dist).
 *
 * Only `/api/*` reaches this code (wrangler.jsonc → assets.run_worker_first); every other
 * request is served straight from the static assets.
 *
 * POST /api/kommo-lead (and /api/lead) — the endpoint used by every `[data-lead-form]`
 * (public/js/forms.js). The lead is delivered to every configured channel:
 *   1. Telegram group   — secrets TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   2. E-mail           — optional Resend API (requires verified sender and secrets)
 *   3. Kommo CRM        — (next step)
 * The request succeeds if at least one channel accepted the lead.
 *
 * Response contract (public/js/forms.js): a lead that really reached a channel answers
 * { ok: true, lead_sent: true } — only then the page reports generate_lead / job_application
 * to GA4. Spam gets a plain { ok: true } (no reason given). Forms with a file (/contacts/)
 * post multipart/form-data; the file is forwarded to Telegram as a document right after the
 * lead message ({ file_sent } tells the page whether that worked).
 *
 * Anti-spam (silently dropped with a fake "ok"): hidden honeypot field, JS-only marker +
 * header, links / junk submissions, foreign Origin;
 * phone must be a valid number for its country (libphonenumber); 5 leads/min per IP.
 *
 * Secrets are set with `npx wrangler secret put NAME` — never commit them.
 */

import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { ATTRIBUTION_KEYS, attributionLines, attributionPlainLines, parseAttribution, type Attribution } from './attribution';

export interface Env {
  ASSETS: Fetcher;
  /** Workers Rate Limiting binding (wrangler.jsonc → ratelimits). */
  LEAD_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  /** Optional Resend API key and verified sender; configure as Cloudflare secrets. */
  RESEND_API_KEY?: string;
  LEAD_EMAIL_FROM?: string;
  LEAD_EMAIL_TO?: string;
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
  /** Market of the page (UA, AT, … — src/data/markets.ts), sent by public/js/forms.js. */
  market?: string;
  options?: string;
  createdAt?: string;
  /** 'job' = vacancy application from /about/ (not a sales lead). */
  kind?: string;
  job?: string;
  /** Task 60: lead_id + browser-reported source context (validated, never trusted as fact), see worker/attribution.ts. */
  attribution: Attribution;
};

/** Attachment limits — mirror ATTACH_* in public/js/forms.js and the accept attribute on /contacts/. */
const ATTACH_MAX_BYTES = 10 * 1024 * 1024;
const ATTACH_EXT = /\.(jpe?g|png|webp|pdf|dwg)$/i;

const MAX = 4000;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const str = (value: unknown, max = 500) => (typeof value === 'string' ? value.trim().slice(0, max) : undefined) || undefined;

/**
 * Any country's number, validated per country with libphonenumber, returned in E.164
 * (+380671234567). The forms send E.164; older Ukrainian formats still work:
 * 0671234567, 380671234567, 80671234567, +380 67 123 45 67, and 00<code>… for abroad.
 */
function normalisePhone(raw: string): string | null {
  const value = String(raw ?? '').trim();
  if (!value || value.length > 40 || /[a-zа-яіїєґ]/i.test(value)) return null;
  const digits = value.replace(/\D/g, '');
  let candidate: string;
  if (value.startsWith('+')) candidate = `+${digits}`;
  else if (digits.startsWith('00')) candidate = `+${digits.slice(2)}`;
  else if (/^0\d{9}$/.test(digits)) candidate = `+38${digits}`;
  else if (/^380\d{9}$/.test(digits)) candidate = `+${digits}`;
  else if (/^80\d{9}$/.test(digits)) candidate = `+3${digits}`;
  else return null;
  const phone = parsePhoneNumberFromString(candidate);
  return phone && phone.isValid() ? phone.number : null;
}

const URL_RE = /(https?:\/\/|www\.|\.(ru|com|net|org|xyz|top|io|biz|info|site|online|click|link)\b|\[url|<a\s)/i;

/** Reasons a submission is treated as spam (silently dropped), empty = looks human. */
function spamReasons(input: Record<string, unknown>, lead: Lead): string[] {
  const reasons: string[] = [];
  if (typeof input.website === 'string' && input.website) reasons.push('honeypot');
  if (typeof input._js !== 'string' || !input._js.startsWith('sg-')) reasons.push('no_js');
  const elapsed = Number(input._elapsed);
  // Do not reject legitimate fast submissions; retain JS marker and honeypot checks.
  if (URL_RE.test(lead.name) || URL_RE.test(lead.comment ?? '')) reasons.push('link');
  if (lead.name.length < 2) reasons.push('bad_name');
  if (/[\u4e00-\u9fff]/.test(lead.name + (lead.comment ?? ''))) reasons.push('cjk');
  return reasons;
}

function parseLead(input: Record<string, unknown>): Lead | null {
  const name = str(input.name, 120);
  const phone = str(input.phone, 40);
  if (!name || !phone) return null;
  const page = str(input.page, 300) ?? (typeof input.source === 'string' && input.source.startsWith('/') ? str(input.source, 300) : undefined);
  // Any extra select the form had (e.g. «Система», «Ваш бізнес») arrives under its own name.
  const known = new Set(['name', 'phone', 'email', 'city', 'comment', 'message', 'product', 'configuration', 'estimatedPrice', 'page', 'source', 'locale', 'market', 'createdAt', 'consent', 'website', '_elapsed', '_h', '_js', 'kind', 'job', 'attachment', ...ATTRIBUTION_KEYS]);
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
    market: typeof input.market === 'string' && /^[A-Z]{2}$/.test(input.market) ? input.market : undefined,
    options: options || undefined,
    createdAt: str(input.createdAt, 40),
    kind: input.kind === 'job' ? 'job' : undefined,
    job: str(input.job, 120),
    attribution: parseAttribution(input)
  };
}

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);

function telegramText(lead: Lead, origin: string): string {
  const time = new Date(lead.createdAt ?? Date.now()).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv', dateStyle: 'short', timeStyle: 'short' });
  const tel = lead.phone.replace(/[^\d+]/g, '');
  const lines = [
    lead.kind === 'job' ? '🧑‍🔧 <b>Заявка на вакансію</b>' : `🟢 <b>Нова заявка з сайту</b>${lead.product ? `\n<b>${esc(lead.product)}</b>` : ''}`,
    '',
    `👤 ${esc(lead.name)}`,
    `📞 <a href="tel:${esc(tel)}">${esc(lead.phone)}</a>`,
    lead.email && `✉️ ${esc(lead.email)}`,
    lead.city && `📍 ${esc(lead.city)}`,
    lead.job && `💼 ${esc(lead.job)}`,
    lead.options && `🔹 ${esc(lead.options)}`,
    lead.comment && `💬 ${esc(lead.comment)}`,
    lead.configuration && `\n⚙️ <b>Конфігурація:</b>\n${esc(lead.configuration.replace(/; /g, '\n'))}`,
    lead.estimatedPrice && `💰 ${esc(lead.estimatedPrice)}`,
    '',
    lead.page && `🔗 ${esc(origin + lead.page)}`,
    `🕒 ${time}${lead.locale && ['ru', 'en', 'de', 'es'].includes(lead.locale) ? ` · ${lead.locale.toUpperCase()}` : ''}${lead.market && lead.market !== 'UA' ? ` · ринок ${lead.market}` : ''}`
  ];
  const body = lines.filter((l) => l !== undefined && l !== false).join('\n');
  // The attribution block always fits: a very long comment/configuration is cut instead of the block.
  const block = attributionLines(lead.attribution, lead.page, esc).join('\n');
  return `${body.slice(0, Math.max(0, MAX - block.length - 1))}\n${block}`;
}

/**
 * Telegram can migrate a basic group to a supergroup, invalidating the old chat ID.
 * Telegram supplies parameters.migrate_to_chat_id in the failed API response.
 * Retry once with that ID for both messages and attachments, without logging tokens.
 * This is an in-request fallback; update TELEGRAM_CHAT_ID in Cloudflare for permanence.
 */
let migratedChatId: string | undefined;

async function telegramPost(
  method: 'sendMessage' | 'sendDocument',
  env: Env,
  buildBody: (chatId: string) => BodyInit,
  headers?: HeadersInit
): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const endpoint = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`;
  const initialId = migratedChatId ?? env.TELEGRAM_CHAT_ID;
  for (let attempt = 0; attempt < 2; attempt++) {
    const chatId = attempt === 0 ? initialId : migratedChatId!;
    let response: Response;
    try {
      response = await fetch(endpoint, { method: 'POST', headers, body: buildBody(chatId) });
    } catch (error) {
      console.error('telegram transport error', method, String(error));
      return false;
    }
    if (response.ok) return true;
    let payload: { description?: string; parameters?: { migrate_to_chat_id?: number | string } } = {};
    try { payload = await response.json(); } catch { /* invalid Telegram response */ }
    const newId = payload.parameters?.migrate_to_chat_id;
    if (attempt === 0 && response.status === 400 && newId && /^-?[0-9]+$/.test(String(newId)) && String(newId) !== chatId) {
      migratedChatId = String(newId);
      console.warn('telegram group migrated; retrying with new chat ID', migratedChatId);
      continue;
    }
    console.error('telegram delivery failed', method, response.status, payload.description ?? 'unknown');
    return false;
  }
  return false;
}

async function sendTelegram(lead: Lead, env: Env, origin: string): Promise<boolean> {
  return telegramPost('sendMessage', env, (chatId) => JSON.stringify({
    chat_id: chatId,
    text: telegramText(lead, origin),
    parse_mode: 'HTML',
    disable_web_page_preview: true
  }), { 'content-type': 'application/json' });
}

/** Sends the attachment as a document after the lead message. */
async function sendTelegramFile(file: File, lead: Lead, env: Env): Promise<boolean> {
  return telegramPost('sendDocument', env, (chatId) => {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('caption', `📎 Файл до заявки: ${lead.name}, ${lead.phone}`.slice(0, 1000));
    form.append('document', file, file.name.replace(/[\\r\\n"]/g, '_').slice(0, 120) || 'file');
    return form;
  });
}

/** Optional independent email delivery. Requires verified sender domain and Resend API key. */
async function sendLeadEmail(lead: Lead, env: Env, origin: string): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.LEAD_EMAIL_FROM || !env.LEAD_EMAIL_TO) return false;
  const subject = lead.kind === 'job' ? 'Space Glass — заявка на вакансію' : 'Space Glass — нова заявка з сайту';
  const body = [
    subject, `Ім'я: ${lead.name}`, `Телефон: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`, lead.city && `Місто: ${lead.city}`,
    lead.product && `Продукт: ${lead.product}`, lead.job && `Вакансія: ${lead.job}`,
    lead.comment && `Коментар: ${lead.comment}`,
    lead.options && `Опції: ${lead.options}`,
    lead.configuration && `Конфігурація: ${lead.configuration}`,
    lead.estimatedPrice && `Орієнтовна ціна: ${lead.estimatedPrice}`,
    lead.page && `Сторінка: ${origin + lead.page}`,
    ...attributionPlainLines(lead.attribution)
  ].filter(Boolean).join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'authorization': `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.LEAD_EMAIL_FROM, to: [env.LEAD_EMAIL_TO], subject, text: body })
    });
    if (!response.ok) console.error('lead email delivery failed', response.status);
    return response.ok;
  } catch (error) {
    console.error('lead email transport error', String(error));
    return false;
  }
}

async function handleLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  let body: Record<string, unknown>;
  let file: File | undefined;
  if ((request.headers.get('content-type') ?? '').toLowerCase().startsWith('multipart/form-data')) {
    // Form with an attachment (/contacts/). Reject oversized bodies before reading them.
    if (Number(request.headers.get('content-length') ?? 0) > ATTACH_MAX_BYTES + 256 * 1024) return json({ ok: false, error: 'file_too_large' }, 413);
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: 'invalid_form' }, 400);
    }
    body = {};
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') body[key] = value;
      else if (key === 'attachment' && value.size > 0) file = value;
    }
  } else {
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400);
    }
  }
  const lead = parseLead(body);
  if (!lead) return json({ ok: false, error: 'name_and_phone_required' }, 400);
  if (file) {
    if (file.size > ATTACH_MAX_BYTES) return json({ ok: false, error: 'file_too_large' }, 413);
    if (!ATTACH_EXT.test(file.name)) return json({ ok: false, error: 'file_type' }, 400);
  }

  // Spam: answer "ok" so bots don't retry, but deliver nothing.
  const reasons = spamReasons(body, lead);
  if (request.headers.get('x-sg-form') !== '1') reasons.push('no_header');
  const origin0 = request.headers.get('origin');
  if (origin0 && new URL(origin0).host !== new URL(request.url).host) reasons.push('foreign_origin');
  if (reasons.length) {
    console.log('lead dropped as spam', reasons.join(','));
    return json({ ok: true });
  }
  const phone = normalisePhone(lead.phone);
  if (!phone) return json({ ok: false, error: 'invalid_phone' }, 400);
  lead.phone = phone;

  // Rate limit per visitor IP (5 leads / minute).
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (env.LEAD_LIMITER && !(await env.LEAD_LIMITER.limit({ key: ip })).success) {
    console.log('lead rate-limited');
    return json({ ok: false, error: 'too_many_requests' }, 429);
  }

  const origin = new URL(request.url).origin;
  const results = await Promise.allSettled([sendTelegram(lead, env, origin), sendLeadEmail(lead, env, origin)]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value);
  if (!delivered) {
    console.error('lead not delivered', JSON.stringify(results));
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }
  if (!file) return json({ ok: true, lead_sent: true });
  const fileSent = await sendTelegramFile(file, lead, env).catch((error) => {
    console.error('telegram file', String(error));
    return false;
  });
  return json({ ok: true, lead_sent: true, file_sent: fileSent });
}

// Pages removed on purpose (owner decision, TASK 74): answer 410 Gone instead of the generic 404.
// The same paths are listed in wrangler.jsonc → assets.run_worker_first, so the static 404 handler never sees them.
const GONE_PATHS = new Set(['/arkhitekturni-systemy', '/ru/arkhitekturni-systemy']);
function goneResponse(): Response {
  return new Response(
    '<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>410 — сторінку видалено</title></head><body><h1>410 Gone</h1><p>Ця сторінка видалена назавжди. <a href="/">Space Glass</a></p></body></html>',
    { status: 410, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=3600', 'x-robots-tag': 'noindex' } }
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (GONE_PATHS.has(pathname.replace(/\/+$/, ''))) return goneResponse();
    if (/^\/api\/(kommo-lead|lead)\/?$/.test(pathname)) return handleLead(request, env);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
