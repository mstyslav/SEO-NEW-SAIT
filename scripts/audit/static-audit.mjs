// Dependency-free static audit of every URL in dist/sitemap.xml (run after `npm run build`).
// Finds systemic SEO / HTML / image / link problems across all pages at once, grouped by issue,
// so a problem coming from one shared component shows up as "N pages" instead of N reports.
//
//   node scripts/audit/static-audit.mjs            # summary
//   node scripts/audit/static-audit.mjs --verbose  # + every affected URL
//
// Exit code 1 when any P0 issue (broken internal link/resource, canonical/hreflang error,
// missing title/description/h1, duplicate id) is found.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const site = 'https://space-glass.com.ua';
const verbose = process.argv.includes('--verbose');

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const redirects = new Map();
for (const line of fs.readFileSync(path.join(dist, '_redirects'), 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [from, to] = t.split(/\s+/);
  redirects.set(from, to);
}

const htmlFile = (p) => path.join(dist, p.endsWith('/') ? `${p}index.html` : p);
const existsCache = new Map();
function resolveStatus(p) {
  if (existsCache.has(p)) return existsCache.get(p);
  let status;
  if (redirects.has(p)) status = 'redirect';
  else {
    const f = path.join(dist, decodeURIComponent(p));
    if (fs.existsSync(f) && fs.statSync(f).isFile()) status = 'ok';
    else if (fs.existsSync(path.join(f, 'index.html'))) status = p.endsWith('/') ? 'ok' : 'slash-redirect';
    else status = '404';
  }
  // A generated page that is only a meta-refresh stub (Astro.redirect) is a redirect too.
  if (status === 'ok' && p.endsWith('/')) {
    const head = fs.readFileSync(htmlFile(decodeURIComponent(p)), 'utf8').slice(0, 600);
    if (/http-equiv="refresh"/i.test(head)) status = 'redirect';
  }
  existsCache.set(p, status);
  return status;
}

const issues = new Map(); // key → { level, pages:Set, samples:[] }
function add(level, key, page, sample = '') {
  if (!issues.has(key)) issues.set(key, { level, pages: new Set(), samples: [] });
  const it = issues.get(key);
  it.pages.add(page);
  if (sample && it.samples.length < 6 && !it.samples.includes(sample)) it.samples.push(sample);
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))?.slice(2).find((v) => v !== undefined);
const hasAttr = (tag, name) => new RegExp(`\\s${name}(\\s|=|>|/)`, 'i').test(tag);
const text = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').trim();
const imageBytes = new Map();

for (const url of urls) {
  const p = url.replace(site, '');
  const file = htmlFile(p);
  if (!fs.existsSync(file)) { add('P0', 'sitemap URL has no built page', p); continue; }
  const raw = fs.readFileSync(file, 'utf8');
  const html = raw.replace(/<!--[\s\S]*?-->/g, '');
  const head = html.slice(0, html.indexOf('</head>'));
  const body = html.slice(html.indexOf('</head>'));
  const isRu = p === '/ru/' || p.startsWith('/ru/');

  // ---- head / SEO
  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
  if (lang !== (isRu ? 'ru' : 'uk')) add('P0', `html lang mismatch (got ${lang})`, p);
  const title = head.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) add('P0', 'missing <title>', p);
  else if (title.length > 70) add('P3', 'title longer than 70 chars', p, `${title.length}`);
  const desc = attr(head.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content');
  if (!desc) add('P0', 'missing meta description', p);
  else if (desc.length < 70 || desc.length > 170) add('P3', 'meta description length outside 70–170', p, `${desc.length}`);
  const robots = attr(head.match(/<meta name="robots"[^>]*>/)?.[0] ?? '', 'content');
  if (robots && /noindex/i.test(robots)) add('P0', 'noindex page listed in sitemap', p);
  const canonical = attr(head.match(/<link rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  if (!canonical) add('P0', 'missing canonical', p);
  else if (canonical !== url) add('P0', 'canonical is not self', p, canonical);
  const alternates = [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({ lang: m[1], href: m[2] }));
  const alt = Object.fromEntries(alternates.map((a) => [a.lang, a.href]));
  if (!alternates.length) add('P2', 'no hreflang alternates', p);
  else {
    if (alt[isRu ? 'ru' : 'uk'] !== url) add('P0', 'hreflang self-reference missing/wrong', p, JSON.stringify(alt));
    if (alt.uk && alt['x-default'] !== alt.uk) add('P1', 'x-default ≠ uk alternate', p);
    for (const a of alternates) {
      const ap = a.href.replace(site, '');
      const st = resolveStatus(ap);
      if (st !== 'ok') add('P0', `hreflang target is ${st}`, p, `${a.lang} → ${ap}`);
      if ((a.lang === 'ru') !== (ap === '/ru/' || ap.startsWith('/ru/')) && a.lang !== 'x-default') add('P0', 'hreflang language/URL mismatch', p, `${a.lang} → ${ap}`);
    }
  }
  if (!/<meta name="viewport"[^>]*width=device-width/.test(head)) add('P1', 'missing responsive viewport', p);
  if (/<link rel="stylesheet"/.test(head) && !/data-[a-z-]*critical/.test(html)) add('P1', 'no inline critical CSS (render-blocking stylesheets) — re-run scripts/audit/extract-critical.mjs', p);

  // ---- headings
  const h1s = [...body.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)];
  if (h1s.length === 0) add('P0', 'no <h1>', p);
  if (h1s.length > 1) add('P2', 'more than one <h1>', p, `${h1s.length}`);
  let prev = 0;
  for (const m of body.matchAll(/<h([1-6])[\s>]/g)) {
    const lvl = Number(m[1]);
    if (prev && lvl > prev + 1) { add('P3', `heading level skipped (h${prev} → h${lvl})`, p); }
    prev = lvl;
  }

  if (/class="skip-link" href="#main"/.test(body) && !/\sid="main"/.test(body)) add('P1', 'skip link target #main missing', p);

  // ---- ids
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dup.length) add('P0', 'duplicate id', p, dup.slice(0, 4).join(', '));

  // ---- links
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const tag = `<a${m[1]}>`;
    const href = attr(tag, 'href');
    const inner = m[2];
    if (href === undefined) { if (!hasAttr(tag, 'role')) add('P2', '<a> without href', p, tag.slice(0, 80)); continue; }
    if (href === '#' || href === '') add('P1', 'empty or "#" href', p, tag.slice(0, 90));
    if (!text(inner) && !attr(tag, 'aria-label') && !/<img[^>]+alt="[^"]+"/.test(inner) && !/<svg[^>]*aria-label/.test(inner) && !/aria-labelledby/.test(tag)) add('P1', 'link without accessible name', p, tag.slice(0, 100));
    if (/<(a|button)\b/.test(inner)) add('P1', 'interactive element nested in <a>', p);
    if (href.startsWith('http://') && !href.startsWith('http://localhost')) add('P2', 'insecure http:// link', p, href);
    let internal = null;
    if (href.startsWith(site)) internal = href.slice(site.length) || '/';
    else if (href.startsWith('/') && !href.startsWith('//')) internal = href;
    if (internal) {
      const clean = internal.split('#')[0].split('?')[0];
      if (!clean) continue;
      const st = resolveStatus(clean);
      if (st === '404') add('P0', 'internal link → 404', p, clean);
      else if (st === 'redirect') add('P1', 'internal link → redirect', p, clean);
      else if (st === 'slash-redirect') add('P2', 'internal link without trailing slash', p, clean);
      if (!isRu && (clean === '/ru/' || clean.startsWith('/ru/')) && !/hreflang|lang-switch|data-lang/.test(tag)) add('P3', 'UA page links into /ru/ (outside language switcher)', p, clean);
    }
  }
  for (const m of body.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const tag = `<button${m[1]}>`;
    if (!text(m[2]) && !attr(tag, 'aria-label') && !attr(tag, 'aria-labelledby') && !attr(tag, 'title') && !/<img[^>]+alt="[^"]+"/.test(m[2])) add('P1', 'button without accessible name', p, tag.slice(0, 100));
    if (/<a\b/.test(m[2])) add('P1', 'link nested in <button>', p);
  }

  // ---- images
  let imgIndex = 0;
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    imgIndex++;
    const src = attr(tag, 'src') ?? '';
    if (!hasAttr(tag, 'alt')) add('P1', 'img without alt attribute', p, src);
    if (!hasAttr(tag, 'width') || !hasAttr(tag, 'height')) add('P1', 'img without width/height (CLS risk)', p, src);
    if (src.startsWith('http://')) add('P0', 'mixed content image', p, src);
    const local = src.startsWith('/') && !src.startsWith('//') ? src.split('?')[0] : null;
    if (local) {
      const st = resolveStatus(local);
      if (st !== 'ok') add('P0', `image src → ${st}`, p, local);
      else {
        if (!imageBytes.has(local)) imageBytes.set(local, fs.statSync(path.join(dist, decodeURIComponent(local))).size);
        const size = imageBytes.get(local);
        if (!attr(tag, 'srcset') && size > 250_000) add('P1', 'image >250 KB without srcset', p, `${local} ${(size / 1024) | 0}KB`);
        if (/\.(png|jpe?g)$/i.test(local) && size > 100_000) add('P2', 'heavy PNG/JPEG (>100 KB) — use WebP/AVIF', p, `${local} ${(size / 1024) | 0}KB`);
      }
    }
    for (const cand of (attr(tag, 'srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0]).filter((s) => s.startsWith('/'))) {
      if (resolveStatus(cand.split('?')[0]) !== 'ok') add('P0', 'srcset candidate missing', p, cand);
    }
  }

  // ---- forms / iframes / misc
  for (const m of body.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
    const tag = m[0];
    const type = attr(tag, 'type');
    if (['hidden', 'submit', 'button', 'reset'].includes(type)) continue;
    const id = attr(tag, 'id');
    const labelled = attr(tag, 'aria-label') || attr(tag, 'aria-labelledby') || attr(tag, 'title') ||
      (id && new RegExp(`<label[^>]*for="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(body));
    if (!labelled) {
      // wrapped in <label>…</label>?
      const before = body.slice(0, m.index);
      const open = before.lastIndexOf('<label');
      const close = before.lastIndexOf('</label>');
      if (!(open > close)) add('P1', `form ${m[1]} without label`, p, tag.slice(0, 100));
    }
  }
  for (const m of body.matchAll(/<iframe\b[^>]*>/g)) if (!attr(m[0], 'title')) add('P1', 'iframe without title', p);
  for (const m of html.matchAll(/<(script|link|img|iframe|source)\b[^>]*\s(src|href)="http:\/\/(?!localhost)[^"]+"/g)) add('P0', 'mixed content resource', p, m[0].slice(0, 100));
  for (const m of html.matchAll(/<(script|link)\b[^>]*\s(src|href)="(\/[^"]+\.(?:js|css|webp|png|jpe?g|svg|woff2?))"/g)) {
    if (resolveStatus(m[3].split('?')[0]) !== 'ok') add('P0', `${m[1]} resource → 404`, p, m[3]);
  }
}

const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
const sorted = [...issues.entries()].sort((a, b) => order[a[1].level] - order[b[1].level] || b[1].pages.size - a[1].pages.size);
console.log(`Static audit: ${urls.length} sitemap URLs\n`);
for (const [key, it] of sorted) {
  console.log(`${it.level}  ${String(it.pages.size).padStart(4)} pages  ${key}${it.samples.length ? `   e.g. ${it.samples.slice(0, 3).join(' | ')}` : ''}`);
  if (verbose) for (const pg of [...it.pages].slice(0, 40)) console.log(`            ${pg}`);
}
if (!sorted.length) console.log('No issues found.');
process.exit(sorted.some(([, it]) => it.level === 'P0') ? 1 : 0);
