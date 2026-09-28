// UA ↔ RU parity inventory, computed from the production build (run `npm run build` first).
//
//   node scripts/audit/parity-audit.mjs [--prev previous-inventory.csv] [--json out.json] [--csv out.csv]
//
// For every indexable UA URL in dist/sitemap.xml: RU counterpart, statuses (200 / noindex / refresh
// redirect), hreflang both ways, canonical, language switcher, sitemap membership — and for existing
// pairs a content comparison of the <main> text: Ukrainian-only words left in RU, RU/UA word ratio,
// H2 sections missing in RU, FAQ items, breadcrumbs.
//
// Decisions: MATCHED, CONTENT_MISMATCH, MISSING_RU, MISSING_UA, BROKEN_PAIR,
// INTENTIONAL_SINGLE_LANGUAGE. Priority / section / note of URLs that are still MISSING_RU are carried
// over from --prev (a judgment made in an earlier audit); new MISSING_RU rows get priority "TBD".
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : null; };
const site = 'https://space-glass.com.ua';
const dist = 'dist';

// UA pages that deliberately have no RU version (decided in the 2026-09-28 audit).
const INTENTIONAL = {
  '/catalog/piddon/': 'Дубль-интент /dushovi-kabiny/dushovi-piddony/ (тот же H1 «Душові піддони»); RU-интент уже закрыт /ru/dushovi-kabiny/dushovi-piddony/. RU-копия = искусственный дубль.',
  '/catalog/dushova-perehorodka-walk-in-black/': 'Одиночная товарная карточка, интент покрыт /dushovi-kabiny/peregorodka-dlya-dusha/ (RU есть там). RU-копия не нужна.'
};
// Thresholds for CONTENT_MISMATCH (see the report for the rationale).
const UKR_WORDS_MAX = 0;        // any Ukrainian-only word left in RU <main> text (review quotes excluded)
// Same-structure RU articles are naturally 77–85 % of the UA word count (Russian is terser);
// RU articles missing whole sections are 62–72 %. 0.75 separates the two groups.
const WORD_RATIO_MIN = 0.75;
const H2_MISSING_MAX = 1;       // RU has more than 1 H2 section fewer than UA

const file = (p) => path.join(dist, decodeURIComponent(p), 'index.html');
const read = (p) => (fs.existsSync(file(p)) ? fs.readFileSync(file(p), 'utf8') : null);
const sitemap = [...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, ''));
const inSitemap = new Set(sitemap);

function status(p) {
  const h = read(p);
  if (!h) return { code: 404, label: 'нет (404)' };
  if (/http-equiv="refresh"/i.test(h.slice(0, 800))) return { code: 301, label: 'redirect-заглушка' };
  if (/<meta name="robots" content="[^"]*noindex/i.test(h)) return { code: 200, label: '200 noindex' };
  return { code: 200, label: '200 index' };
}
const alternates = (h) => Object.fromEntries([...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2].replace(site, '')]));
const canonicalOf = (h) => h.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(site, '');
const switcherOf = (h) => h.match(/<a class="language-switcher__button[^"]*" href="([^"]+)"/)?.[1];

// Removes whole elements (with their nested markup) whose class matches `re`.
function dropElements(html, re) {
  let out = html;
  for (;;) {
    const open = [...out.matchAll(/<([a-z0-9]+)\b[^>]*class="([^"]*)"[^>]*>/gi)].find((m) => re.test(m[2]));
    if (!open) return out;
    const tag = open[1].toLowerCase();
    const tagRe = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'gi');
    tagRe.lastIndex = open.index + open[0].length;
    let depth = 1, end = out.length, t;
    while (depth && (t = tagRe.exec(out))) { depth += t[0][1] === '/' ? -1 : 1; if (!depth) end = t.index + t[0].length; }
    out = out.slice(0, open.index) + ' ' + out.slice(end);
  }
}
function mainText(h) {
  let m = h.slice(h.indexOf('<main'), h.lastIndexOf('</main>'));
  m = m.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ');
  // Customer review quotes are kept in their original language on purpose.
  m = m.replace(/<blockquote[\s\S]*?<\/blockquote>/g, ' ');
  return dropElements(m, /google-review|review-card/);
}
function contentMetrics(h) {
  const m = mainText(h);
  const text = m.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
  const words = text.match(/[\p{L}’'-]+/gu) ?? [];
  const cyr = words.filter((w) => /[Ѐ-ӿ]/.test(w));
  const ukr = [...new Set(cyr.filter((w) => /[іїєґІЇЄҐ]/.test(w)))];
  return {
    words: cyr.length,
    ukrWords: ukr,
    h2: (m.match(/<h2[\s>]/g) ?? []).length,
    faq: (m.match(/<details/g) ?? []).length,
    crumbs: /sg-breadcrumbs|BreadcrumbList/.test(h),
    h1: (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').trim()
  };
}

// previous decisions for carried-over MISSING_RU rows
const prev = new Map();
if (opt('prev')) {
  const lines = fs.readFileSync(opt('prev'), 'utf8').trim().split('\n');
  const parse = (l) => { const out = []; let cur = '', q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; };
  const head = parse(lines[0]);
  for (const l of lines.slice(1)) { const r = Object.fromEntries(parse(l).map((v, i) => [head[i], v])); prev.set(r['UA URL'], r); }
}

const uaUrls = sitemap.filter((p) => !p.startsWith('/ru/'));
const ruUrls = sitemap.filter((p) => p.startsWith('/ru/'));
const rows = [];
const pairedRu = new Set();

for (const ua of uaUrls) {
  const hu = read(ua);
  const altU = alternates(hu);
  const ruCandidate = ua === '/' ? '/ru/' : `/ru${ua}`;
  const ruAlt = altU.ru;
  // A same-path RU file that is only a redirect stub is not a counterpart (e.g. /ru/catalog/piddon/).
  const ru = ruAlt ?? (read(ruCandidate) && status(ruCandidate).code === 200 ? ruCandidate : null);
  const stU = status(ua);
  const row = { ua, ru: ru ?? '—', type: prev.get(ua)?.['тип'] ?? '', statusUa: stU.label, canonical: '', sitemap: 'UA', hreflangUaRu: 'нет', hreflangRuUa: '—', switcher: switcherOf(hu) ?? '', decision: '', priority: '', note: '', metrics: null };
  const canU = canonicalOf(hu);

  if (!ru) {
    row.statusRu = `нет (switcher → ${row.switcher || '—'})`;
    row.canonical = canU === ua ? 'self' : `→ ${canU}`;
    if (INTENTIONAL[ua]) { row.decision = 'INTENTIONAL_SINGLE_LANGUAGE'; row.note = INTENTIONAL[ua]; }
    else {
      row.decision = 'MISSING_RU';
      const p = prev.get(ua);
      row.priority = p?.['приоритет'] || 'TBD';
      row.note = p?.['примечание'] ?? 'новая UA-страница без RU — приоритет не назначен';
    }
    rows.push(row);
    continue;
  }

  pairedRu.add(ru);
  const hr = read(ru);
  const stR = status(ru);
  row.statusRu = stR.label;
  const altR = hr ? alternates(hr) : {};
  const canR = hr ? canonicalOf(hr) : null;
  row.hreflangUaRu = altU.ru === ru ? 'OK' : (altU.ru ? `→ ${altU.ru}` : 'нет');
  row.hreflangRuUa = altR.uk === ua ? 'OK' : (altR.uk ? `→ ${altR.uk}` : 'нет');
  row.canonical = `${canU === ua ? 'self' : '→' + canU}/${canR === ru ? 'self' : '→' + canR}`;
  row.sitemap = inSitemap.has(ru) ? 'UA+RU' : 'UA';
  const switchOk = switcherOf(hu) === ru && hr && switcherOf(hr) === ua;

  if (stR.label !== '200 index' || row.hreflangUaRu !== 'OK' || row.hreflangRuUa !== 'OK' || row.canonical !== 'self/self' || row.sitemap !== 'UA+RU' || !switchOk) {
    row.decision = 'BROKEN_PAIR';
    row.note = [stR.label !== '200 index' && `RU: ${stR.label}`, row.hreflangUaRu !== 'OK' && `hreflang UA→RU ${row.hreflangUaRu}`, row.hreflangRuUa !== 'OK' && `hreflang RU→UA ${row.hreflangRuUa}`, row.canonical !== 'self/self' && `canonical ${row.canonical}`, row.sitemap !== 'UA+RU' && 'RU нет в sitemap', !switchOk && 'переключатель языка не ведёт на пару'].filter(Boolean).join('; ');
    rows.push(row);
    continue;
  }

  const mu = contentMetrics(hu), mr = contentMetrics(hr);
  const ratio = mu.words ? mr.words / mu.words : 1;
  const issues = [];
  if (mr.ukrWords.length > UKR_WORDS_MAX) issues.push(`${mr.ukrWords.length} укр. слов в RU-тексте (напр. ${mr.ukrWords.slice(0, 4).join(', ')})`);
  if (ratio < WORD_RATIO_MIN) issues.push(`RU-текст ${Math.round(ratio * 100)}% объёма UA (${mr.words} vs ${mu.words} слов)`);
  if (mu.h2 - mr.h2 > H2_MISSING_MAX) issues.push(`в RU на ${mu.h2 - mr.h2} разделов H2 меньше (${mr.h2} vs ${mu.h2})`);
  if (mu.faq !== mr.faq) issues.push(`FAQ: ${mr.faq} в RU vs ${mu.faq} в UA`);
  if (mu.crumbs && !mr.crumbs) issues.push('нет breadcrumbs в RU');
  row.metrics = { uaWords: mu.words, ruWords: mr.words, ratio: +ratio.toFixed(2), ukrWords: mr.ukrWords.length, uaH2: mu.h2, ruH2: mr.h2, uaFaq: mu.faq, ruFaq: mr.faq };
  row.decision = issues.length ? 'CONTENT_MISMATCH' : 'MATCHED';
  row.note = issues.join('; ');
  rows.push(row);
}

// RU pages without a UA pair
for (const ru of ruUrls) if (!pairedRu.has(ru)) rows.push({ ua: '—', ru, statusUa: '—', statusRu: status(ru).label, decision: 'MISSING_UA', priority: '', note: 'RU-страница без UA-пары', hreflangUaRu: '—', hreflangRuUa: '—', canonical: '', sitemap: 'RU' });

const count = (d) => rows.filter((r) => r.decision === d).length;
const summary = {
  generatedPages: (function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? 1 : 0), 0); })(dist),
  sitemap: sitemap.length, ua: uaUrls.length, ru: ruUrls.length,
  MATCHED: count('MATCHED'), CONTENT_MISMATCH: count('CONTENT_MISMATCH'), MISSING_RU: count('MISSING_RU'), MISSING_UA: count('MISSING_UA'),
  BROKEN_PAIR: count('BROKEN_PAIR'), INTENTIONAL_SINGLE_LANGUAGE: count('INTENTIONAL_SINGLE_LANGUAGE'),
  P1: rows.filter((r) => r.priority === 'P1').length, P2: rows.filter((r) => r.priority === 'P2').length, P3: rows.filter((r) => r.priority === 'P3').length, TBD: rows.filter((r) => r.priority === 'TBD').length,
  thresholds: { UKR_WORDS_MAX, WORD_RATIO_MIN, H2_MISSING_MAX }
};
console.log(JSON.stringify(summary, null, 1));

if (opt('json')) fs.writeFileSync(opt('json'), JSON.stringify({ summary, rows }, null, 1));
if (opt('csv')) {
  const esc = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const head = ['UA URL', 'RU URL', 'тип', 'статус UA', 'статус RU', 'hreflang UA→RU', 'hreflang RU→UA', 'canonical', 'sitemap', 'решение', 'приоритет', 'примечание'];
  const lines = rows.map((r) => [r.ua, r.ru, r.type, r.statusUa, r.statusRu, r.hreflangUaRu, r.hreflangRuUa, r.canonical, r.sitemap, r.decision, r.priority, r.note].map(esc).join(','));
  fs.writeFileSync(opt('csv'), [head.join(','), ...lines].join('\n') + '\n');
}
