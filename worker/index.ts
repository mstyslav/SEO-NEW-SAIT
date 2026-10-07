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
 * Response contract (public/js/forms.js): a lead that really reached a channel answers
 * { ok: true, lead_sent: true } — only then the page reports generate_lead / job_application
 * to GA4. Spam gets a plain { ok: true } (no reason given). Forms with a file (/contacts/)
 * post multipart/form-data; the file is forwarded to Telegram as a document right after the
 * lead message ({ file_sent } tells the page whether that worked).
 *
 * Anti-spam (silently dropped with a fake "ok"): hidden honeypot field, JS-only marker +
 * header, < 3 s on the page, links / junk submissions, foreign Origin;
 * phone must be a valid number for its country (libphonenumber); 3 leads/min per IP.
 *
 * Secrets are set with `npx wrangler secret put NAME` — never commit them.
 */

import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

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
  /** 'job' = vacancy application from /about/ (not a sales lead). */
  kind?: string;
  job?: string;
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
  if (!Number.isFinite(elapsed) || elapsed < 3000) reasons.push('too_fast');
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
  const known = new Set(['name', 'phone', 'email', 'city', 'comment', 'message', 'product', 'configuration', 'estimatedPrice', 'page', 'source', 'locale', 'createdAt', 'consent', 'website', '_elapsed', '_h', '_js', 'kind', 'job', 'attachment']);
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
    createdAt: str(input.createdAt, 40),
    kind: input.kind === 'job' ? 'job' : undefined,
    job: str(input.job, 120)
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

/** Sends the attachment as a document reply under the lead message. */
async function sendTelegramFile(file: File, lead: Lead, env: Env): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false;
  const form = new FormData();
  form.append('chat_id', env.TELEGRAM_CHAT_ID);
  form.append('caption', `📎 Файл до заявки: ${lead.name}, ${lead.phone}`.slice(0, 1000));
  form.append('document', file, file.name.replace(/[\r\n"]/g, '_').slice(0, 120) || 'file');
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`, { method: 'POST', body: form });
  if (!response.ok) console.error('telegram file', response.status, await response.text());
  return response.ok;
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
  if (!file) return json({ ok: true, lead_sent: true });
  const fileSent = await sendTelegramFile(file, lead, env).catch((error) => {
    console.error('telegram file', String(error));
    return false;
  });
  return json({ ok: true, lead_sent: true, file_sent: fileSent });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (/^\/api\/(kommo-lead|lead)\/?$/.test(pathname)) return handleLead(request, env);
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
