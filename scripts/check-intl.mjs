// Full check of the EN / DE / ES pages against the BUILT site (run `npm run build` first).
// Every URL of src/i18n/intl-routes.ts is checked — not a sample:
//   status (built, not a redirect stub), <html lang>, title / description / H1 (present, length,
//   unique per locale), robots, self-canonical, reciprocal hreflang (every target built, indexable,
//   self-canonical and pointing back), x-default, Open Graph / Twitter, JSON-LD (valid JSON, page
//   language, URLs of the right locale), internal links (built, own language only — the language
//   menu is the only exception), images and srcset candidates, lead forms (phone field, consent,
//   privacy link in the same language, locale), sitemap membership, untranslated text (Cyrillic or
//   another locale's interface strings in visible text and attributes) and the localized 404 pages.
//
//   node scripts/check-intl.mjs            # summary, exit 1 on any error
//   node scripts/check-intl.mjs --verbose  # + every finding
import fs from 'node:fs';
import path from 'node:path';
import { INTL_ROUTES, intlLocales } from '../src/i18n/intl-routes.ts';

const dist = path.resolve('dist');
const site = 'https://space-glass.com.ua';
const verbose = process.argv.includes('--verbose');
if (!fs.existsSync(path.join(dist, 'sitemap.xml'))) { console.error('Run `npm run build` first.'); process.exit(1); }

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

const fileOf = (p) => path.join(dist, decodeURIComponent(p), p.endsWith('/') ? 'index.html' : '');
const htmlCache = new Map();
const read = (p) => {
  if (!htmlCache.has(p)) htmlCache.set(p, fs.existsSync(fileOf(p)) ? fs.readFileSync(fileOf(p), 'utf8') : null);
  return htmlCache.get(p);
};
const redirects = new Set(fs.readFileSync(path.join(dist, '_redirects'), 'utf8').split('\n').map((l) => l.trim().split(/\s+/)[0]).filter((l) => l && !l.startsWith('#')));
const status = (p) => {
  if (redirects.has(p)) return 'redirect';
  const html = read(p);
  if (html === null) {
    const asset = path.join(dist, decodeURIComponent(p));
    return fs.existsSync(asset) && fs.statSync(asset).isFile() ? 'ok' : '404';
  }
  return /http-equiv="refresh"/i.test(html.slice(0, 800)) ? 'redirect' : 'ok';
};
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1];
const head = (html) => html.slice(0, html.indexOf('</head>'));
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;|&#160;/g, ' ');
const alternatesOf = (html) => Object.fromEntries([...head(html).matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
const canonicalOf = (html) => head(html).match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const locOf = (p) => p.match(/^\/(ru|en|de|es)(?=\/|$)/)?.[1] ?? 'uk';

// Interface strings that must never appear on a page of another locale (checked in visible text).
const foreignUi = {
  en: ['Get a quote', 'View project', 'Send request', 'Privacy policy', 'Frequently asked questions', 'All projects', 'Request a quote'],
  de: ['Angebot anfragen', 'Projekt ansehen', 'Anfrage senden', 'Datenschutzerklärung', 'Häufige Fragen', 'Alle Projekte'],
  es: ['Pedir presupuesto', 'Ver proyecto', 'Enviar solicitud', 'Política de privacidad', 'Preguntas frecuentes', 'Todos los proyectos']
};
const CYRILLIC = /[А-Яа-яЁёЇїІіЄєҐґ]/;
// Cyrillic allowed only here: the founder's original-script name in JSON-LD (Person.alternateName).
const allowedCyrillic = ['Мстислав Грабко'];

const sitemap = new Set([...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, '')));
const titles = {}; const descriptions = {}; const h1s = {};
let pages = 0; let links = 0; let images = 0; let forms = 0; let jsonld = 0;

for (const route of INTL_ROUTES) {
  for (const locale of intlLocales) {
    const p = route[locale];
    if (!p) continue; // locale not (yet) written for this page
    pages++;
    const html = read(p);
    if (html === null) { err(p, 'not built (404)'); continue; }
    if (status(p) !== 'ok') { err(p, `status ${status(p)}`); continue; }
    if (!sitemap.has(p)) err(p, 'missing from sitemap.xml');
    const h = head(html);

    // language, title, description, robots
    const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
    if (lang !== locale) err(p, `<html lang="${lang}">`);
    const title = decode(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
    if (!title) err(p, 'missing title');
    else {
      if (title.length < 25 || title.length > 60) warn(p, `title length ${title.length}: ${title}`);
      (titles[locale] ??= {})[title] = [...((titles[locale] ?? {})[title] ?? []), p];
    }
    const desc = decode(attr(h.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '');
    if (!desc) err(p, 'missing meta description');
    else {
      if (desc.length < 70 || desc.length > 160) warn(p, `description length ${desc.length}`);
      if (desc.endsWith('…')) err(p, 'description was truncated by BaseLayout (shorten it)');
      (descriptions[locale] ??= {})[desc] = [...((descriptions[locale] ?? {})[desc] ?? []), p];
    }
    const robots = attr(h.match(/<meta name="robots"[^>]*>/)?.[0] ?? '', 'content');
    if (robots && /noindex/i.test(robots)) err(p, `robots ${robots}`);

    // canonical + hreflang (reciprocal)
    const url = site + p;
    if (canonicalOf(html) !== url) err(p, `canonical ${canonicalOf(html)}`);
    const alt = alternatesOf(html);
    // A German-only page (no UA/RU original) declares only itself: no uk/ru/en/es twins; its x-default must point at itself.
    const deOnly = Boolean(route.deOnlyFallback);
    const expected = Object.fromEntries(Object.entries(deOnly ? { de: route.de } : { uk: route.uk, en: route.en, de: route.de, es: route.es }).filter(([, v]) => v));
    if (deOnly && alt['x-default'] !== site + p) err(p, `German-only x-default = ${alt['x-default']} (must be the page itself)`);
    if (deOnly && Object.keys(alt).some((code) => code !== 'de' && code !== 'x-default')) err(p, `German-only page declares hreflang ${Object.keys(alt).join(',')}`);
    for (const [code, target] of Object.entries(expected)) if (alt[code] !== site + target) err(p, `hreflang ${code} = ${alt[code]} (expected ${site + target})`);
    for (const code of ['en', 'de', 'es']) if (alt[code] && !expected[code]) err(p, `hreflang ${code} → ${alt[code]} but this page has no ${code} version`);
    if (!deOnly && alt['x-default'] !== site + route.uk) err(p, `x-default = ${alt['x-default']}`);
    for (const [code, href] of Object.entries(alt)) {
      const tp = href.replace(site, '');
      if (status(tp) !== 'ok') { err(p, `hreflang ${code} → ${tp} is ${status(tp)}`); continue; }
      const thtml = read(tp);
      if (canonicalOf(thtml) !== href) err(p, `hreflang ${code} → ${tp} is not self-canonical`);
      if (/<meta name="robots" content="[^"]*noindex/.test(head(thtml))) err(p, `hreflang ${code} → ${tp} is noindex`);
      if (code !== 'x-default' && alternatesOf(thtml)[locale] !== url) err(p, `hreflang not reciprocal: ${tp} has no ${locale} → ${p}`);
      if (code !== 'x-default' && code !== locOf(tp)) err(p, `hreflang ${code} points to a ${locOf(tp)} URL`);
    }
    if (alt.ru && !sitemap.has(alt.ru.replace(site, ''))) err(p, `hreflang ru ${alt.ru} not in sitemap`);

    // Open Graph / Twitter
    const meta = (prop) => decode(attr(h.match(new RegExp(`<meta (?:property|name)="${prop}"[^>]*>`))?.[0] ?? '', 'content') ?? '');
    if (meta('og:url') !== url) err(p, `og:url ${meta('og:url')}`);
    if (meta('og:locale') !== { en: 'en_GB', de: 'de_AT', es: 'es_ES' }[locale]) err(p, `og:locale ${meta('og:locale')}`);
    for (const key of ['og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description']) if (!meta(key)) err(p, `missing ${key}`);

    // JSON-LD
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      jsonld++;
      let data;
      try { data = JSON.parse(m[1]); } catch (e) { err(p, `invalid JSON-LD: ${e.message}`); continue; }
      const nodes = data['@graph'] ?? [data];
      const page = nodes.find((n) => String(n['@id'] ?? '').endsWith('#webpage'));
      if (page && page.inLanguage !== locale) err(p, `WebPage.inLanguage ${page.inLanguage}`);
      if (page && page.url !== url) err(p, `WebPage.url ${page.url}`);
      const text = JSON.stringify(data);
      for (const u of text.matchAll(/https:\/\/space-glass\.com\.ua(\/[^"#?]*)/g)) {
        const up = u[1];
        if (/\.(webp|png|jpe?g|svg|avif)$/.test(up) || up === '/') continue;
        if (locOf(up) !== locale) err(p, `JSON-LD URL in another language: ${up}`);
        else if (status(up) !== 'ok') err(p, `JSON-LD URL ${up} is ${status(up)}`);
      }
      let cyr = text;
      for (const allowed of allowedCyrillic) cyr = cyr.split(allowed).join('');
      if (CYRILLIC.test(cyr)) err(p, `Cyrillic text in JSON-LD: …${cyr.slice(Math.max(0, cyr.search(CYRILLIC) - 40), cyr.search(CYRILLIC) + 40)}…`);
    }

    // body: links, images, forms, H1, localization
    const body = html.slice(html.indexOf('</head>'));
    const h1List = [...body.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => decode(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
    if (h1List.length !== 1) err(p, `${h1List.length} <h1>`);
    else (h1s[locale] ??= {})[h1List[0]] = [...((h1s[locale] ?? {})[h1List[0]] ?? []), p];

    const menu = body.match(/<ul class="language-switcher__menu"[\s\S]*?<\/ul>/)?.[0] ?? '';
    for (const m of body.matchAll(/<a\b[^>]*>/g)) {
      const tag = m[0];
      const href = attr(tag, 'href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
      links++;
      const clean = href.split('#')[0].split('?')[0];
      if (!clean) continue;
      const st = status(clean);
      if (st !== 'ok') err(p, `link → ${clean} (${st})`);
      const isPage = clean.endsWith('/') && !/^\/(_astro|images|vendor|js|api|fonts)\//.test(clean);
      if (isPage && locOf(clean) !== locale && !menu.includes(tag)) err(p, `link to another language: ${clean}`);
    }
    // language menu: all five languages, the current one marked
    const options = [...menu.matchAll(/data-target-locale="([a-z]+)"/g)].map((m) => m[1]);
    if (options.join(',') !== 'uk,ru,en,de,es') err(p, `language menu options: ${options.join(',')}`);
    for (const m of menu.matchAll(/<a\b[^>]*>/g)) {
      const target = attr(m[0], 'href');
      const code = attr(m[0], 'data-target-locale');
      if (status(target) !== 'ok') err(p, `language menu ${code} → ${target} (${status(target)})`);
      if (locOf(target) !== code) err(p, `language menu ${code} → ${target} has another language`);
      const sameRoute = code === 'uk' ? (deOnly ? route.deOnlyFallback : route.uk) : code === 'ru' ? null : (deOnly && code !== 'de' ? null : route[code]);
      if (sameRoute && target !== sameRoute) err(p, `language menu ${code} → ${target} (expected ${sameRoute})`);
      if (code !== 'uk' && code !== 'ru' && !sameRoute && !target.startsWith(`/${code}/`)) err(p, `language menu ${code} fallback ${target}`);
    }
    for (const m of body.matchAll(/<(img|source)\b[^>]*>/g)) {
      const tag = m[0];
      const src = attr(tag, 'src');
      if (m[1] === 'img') {
        images++;
        const alt = attr(tag, 'alt');
        if (alt === undefined) err(p, `img without alt: ${src}`);
        if (src?.startsWith('/') && status(src.split('?')[0]) !== 'ok') err(p, `img src missing: ${src}`);
      }
      for (const cand of (attr(tag, 'srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0]).filter((s) => s.startsWith('/'))) {
        if (status(cand.split('?')[0]) !== 'ok') err(p, `srcset candidate missing: ${cand}`);
      }
    }
    for (const m of body.matchAll(/<form\b[^>]*data-lead-form[^>]*>([\s\S]*?)<\/form>/g)) {
      forms++;
      const form = m[0];
      if (!/<input[^>]*type="tel"[^>]*name="phone"|<input[^>]*name="phone"[^>]*type="tel"/.test(form)) err(p, 'lead form without a tel phone field');
      if (!/<button[^>]*type="submit"[^>]*>\s*\S/.test(form)) err(p, 'lead form without a labelled submit button');
      if (/name="consent"/.test(form)) {
        const policy = form.match(/<a href="([^"]+)"/)?.[1];
        if (policy !== { en: '/en/privacy-policy/', de: '/de/datenschutz/', es: '/es/politica-de-privacidad/' }[locale]) err(p, `consent links to ${policy}`);
      }
      const localeField = attr(form.match(/<input[^>]*name="locale"[^>]*>/)?.[0] ?? '', 'value');
      if (localeField && localeField !== locale) err(p, `form locale field ${localeField}`);
      if (!localeField) warn(p, 'lead form without a locale field');
    }

    // localization: visible text + human-readable attributes, language menu excluded
    const visible = body
      .replace(menu, '')
      .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/g, ' ')
      .replace(/\s(?:src|srcset|href|data-src|data-images|data-srcset|imagesrcset)="[^"]*"/g, ' ');
    const attrText = [...visible.matchAll(/\s(?:alt|title|aria-label|placeholder|content|value|data-empty-label|data-expand-label|data-collapse-label|data-expand-prefix|data-collapse-prefix|data-category-name|data-of)="([^"]*)"/g)].map((m) => m[1]).join(' | ');
    const text = decode(visible.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
    const metaText = [title, desc, meta('og:title'), meta('og:description'), meta('twitter:title'), meta('twitter:description')].join(' | ');
    for (const [where, value] of [['text', text], ['attributes', decode(attrText)], ['meta', metaText]]) {
      const i = value.search(CYRILLIC);
      if (i >= 0) err(p, `Cyrillic in ${where}: …${value.slice(Math.max(0, i - 50), i + 50)}…`);
    }
    for (const [other, strings] of Object.entries(foreignUi)) {
      if (other === locale) continue;
      for (const s of strings) if (text.includes(s) || attrText.includes(s)) err(p, `${other.toUpperCase()} interface string on a ${locale.toUpperCase()} page: "${s}"`);
    }
  }
}

// uniqueness per locale
for (const [kind, map] of [['title', titles], ['description', descriptions], ['H1', h1s]]) {
  for (const [locale, values] of Object.entries(map)) for (const [value, list] of Object.entries(values)) if (list.length > 1) err(list.join(', '), `duplicate ${kind} (${locale}): ${value}`);
}

// sitemap: no other /en|de|es/ URLs than the route map
const routeUrls = new Set(INTL_ROUTES.flatMap((r) => intlLocales.map((l) => r[l]).filter(Boolean)));
for (const u of sitemap) if (/^\/(en|de|es)\//.test(u) && !routeUrls.has(u)) err(u, 'in sitemap but not in the route map');

// localized 404 pages
for (const locale of intlLocales) {
  const f = path.join(dist, locale, '404.html');
  if (!fs.existsSync(f)) { err(`/${locale}/404.html`, 'missing'); continue; }
  const html = fs.readFileSync(f, 'utf8');
  if (!/<meta name="robots" content="noindex, follow"/.test(html)) err(`/${locale}/404.html`, 'not noindex');
  if (html.match(/<html[^>]*\slang="([^"]+)"/)?.[1] !== locale) err(`/${locale}/404.html`, 'wrong lang');
  if (/<link rel="canonical"/.test(html)) err(`/${locale}/404.html`, 'has a canonical');
  const vis = decode(html.slice(html.indexOf('</head>')).replace(/<ul class="language-switcher__menu"[\s\S]*?<\/ul>/, '').replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' '));
  if (CYRILLIC.test(vis)) err(`/${locale}/404.html`, 'Cyrillic text');
}

console.log(`EN/DE/ES check: ${pages} pages (${INTL_ROUTES.length} routes), ${links} internal links, ${images} images, ${forms} lead forms, ${jsonld} JSON-LD blocks`);
console.log(`Errors: ${errors.length} · warnings: ${warnings.length}`);
for (const e of errors.slice(0, verbose ? Infinity : 40)) console.log(`  ERROR ${e}`);
if (verbose) for (const w of warnings) console.log(`  warn  ${w}`);
else if (warnings.length) console.log(`  (${warnings.length} warnings — run with --verbose)`);
process.exit(errors.length ? 1 : 0);
