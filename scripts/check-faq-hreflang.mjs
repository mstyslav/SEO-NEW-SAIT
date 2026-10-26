// Regression: FAQPage JSON-LD mirrors the visible FAQ 1:1, and hreflang/canonical form a
// consistent, reciprocal graph over every sitemap URL. Run after `npm run build`.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const ORIGIN = 'https://space-glass.com.ua';
const LANGS = new Set(['uk', 'ru', 'de', 'en', 'es', 'x-default']);
const errors = [];
const stats = { pages: 0, faqPages: 0, faqVisibleOnly: 0, groups: 0 };

const sitemapUrls = [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const fileOf = (url) => join(dist, new URL(url).pathname, 'index.html');
const decode = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/\s+/g, ' ').trim();
const jsonLd = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => { const d = JSON.parse(m[1]); return d['@graph'] ?? [d]; });

const pages = new Map();
for (const url of sitemapUrls) {
  const f = fileOf(url);
  if (!existsSync(f)) { errors.push(`${url}: sitemap URL has no built page`); continue; }
  const html = readFileSync(f, 'utf8');
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
  const alternates = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/g)].map((m) => [m[1], m[2]]);
  pages.set(url, { html, canonical, alternates });
  stats.pages++;
}

for (const [url, { html, canonical, alternates }] of pages) {
  // ---- FAQ ----
  const faq = jsonLd(html).filter((n) => n['@type'] === 'FAQPage');
  const visible = [...html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/details>/g)].map((m) => [decode(m[1]), decode(m[2])]);
  visible.push(...[...html.matchAll(/<details class="faq-item[^"]*"[^>]*>\s*<summary>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div class="faq-item__answer">([\s\S]*?)<\/div>\s*<\/details>/g)].map((m) => [decode(m[1]), decode(m[2])]));
  if (faq.length > 1) errors.push(`${url}: ${faq.length} FAQPage nodes`);
  if (faq.length) {
    stats.faqPages++;
    const ld = (faq[0].mainEntity ?? []).map((q) => [decode(q.name ?? ''), decode(q.acceptedAnswer?.text ?? '')]);
    if (!visible.length) errors.push(`${url}: FAQPage without visible FAQ`);
    else {
      // JSON-LD may carry fewer questions than the page shows (a visible superset is fine), never more.
      if (ld.length > visible.length) errors.push(`${url}: FAQ count JSON-LD ${ld.length} vs visible ${visible.length}`);
      ld.forEach(([q, a], i) => {
        if (!visible[i] || visible[i][0] !== q || visible[i][1] !== a) errors.push(`${url}: FAQ #${i + 1} differs from visible ("${q.slice(0, 50)}")`);
      });
      if (new Set(ld.map(([q]) => q)).size !== ld.length) errors.push(`${url}: duplicate FAQ questions`);
    }
  } else if (visible.length) stats.faqVisibleOnly++;

  // ---- Article image (optional until illustrations are added; when present it must be valid and shared UA/RU) ----
  const article = jsonLd(html).find((n) => n['@type'] === 'Article');
  if (article?.image) {
    stats.articleImages = (stats.articleImages ?? 0) + 1;
    const src = article.image[0];
    const file = join(dist, new URL(src).pathname);
    if (!existsSync(file)) errors.push(`${url}: Article.image missing file ${src}`);
    else {
      const buf = readFileSync(file);
      if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') errors.push(`${url}: ${src} is not WebP`);
      if (statSync(file).size > 200 * 1024) errors.push(`${url}: ${src} over 200 KB`);
    }
    if (!html.includes(`og:image" content="${src}"`)) errors.push(`${url}: og:image differs from Article.image`);
    const twin = pages.get(url.includes('/ru/knowledge/') ? url.replace('/ru/knowledge/', '/knowledge/') : url.replace('/knowledge/', '/ru/knowledge/'));
    if (twin && !twin.html.includes(src)) errors.push(`${url}: UA/RU do not share ${src}`);
  }

  // ---- canonical / hreflang ----
  if (canonical !== url) errors.push(`${url}: canonical ${canonical}`);
  if (!alternates.length) continue;
  const map = new Map(alternates);
  if (map.size !== alternates.length) errors.push(`${url}: duplicate hreflang codes`);
  for (const [lang, href] of alternates) {
    if (!LANGS.has(lang)) errors.push(`${url}: bad hreflang code ${lang}`);
    if (!href.startsWith(ORIGIN)) errors.push(`${url}: hreflang ${lang} off-site ${href}`);
    const target = pages.get(href);
    if (!target) { errors.push(`${url}: hreflang ${lang} -> ${href} not in sitemap`); continue; }
    if (target.canonical !== href) errors.push(`${url}: hreflang ${lang} target canonical differs ${href}`);
    const back = new Map(target.alternates);
    if (lang !== 'x-default' && back.get(htmlLang(target.html)) !== href) errors.push(`${url}: target ${href} does not reciprocate its own language`);
    if (lang !== 'x-default' && ![...back.values()].includes(url)) errors.push(`${url}: ${href} has no return link`);
    if (lang !== 'x-default' && htmlLang(target.html) !== (lang === 'uk' ? 'uk' : lang)) errors.push(`${url}: hreflang ${lang} but <html lang=${htmlLang(target.html)} at ${href}`);
  }
  const own = htmlLang(html);
  if (map.get(own) !== url) errors.push(`${url}: no self-reference for ${own}`);
}
function htmlLang(html) { return html.match(/<html[^>]*lang="([^"]*)"/)?.[1]; }

console.log(JSON.stringify(stats));
if (errors.length) { console.error(`${errors.length} problem(s):\n` + errors.slice(0, 60).join('\n')); process.exit(1); }
console.log('FAQ + hreflang checks passed');
