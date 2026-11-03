// Checks the BUILT shop (run `npm run build` first): routes, noindex, canonical, hreflang, Product / BreadcrumbList data,
// sitemap, 301 redirects (no chains), no purchase-price leak, EN/DE/ES untouched.   npm run check:shop
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const ORIGIN = 'https://space-glass.com.ua';
const pub = JSON.parse(fs.readFileSync('src/data/led-mirrors/public.json', 'utf8'));
let errors = 0;
const fail = (m) => { errors++; console.error('FAIL', m); };
const read = (p) => { const f = path.join(dist, p, 'index.html'); return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null; };
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { try { const j = JSON.parse(m[1]); return j['@graph'] ?? [j]; } catch { return []; } });
const meta = (html, re) => (html.match(re) ?? [])[1];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

const locales = [['uk', ''], ['ru', '/ru']];
let models = 0;
for (const [loc, pre] of locales) {
  const other = loc === 'uk' ? '/ru' : '';
  // ---- every shop page
  const pages = ['/shop/', '/shop/mirrors/', '/shop/mirrors/led/', '/shop/showers/', '/shop/partitions/', ...pub.models.map((m) => `/shop/mirrors/led/${m.slug}/`)];
  for (const p of pages) {
    const url = pre + p, html = read(url);
    if (!html) { fail(`missing page ${url}`); continue; }
    if (!/<meta name="robots" content="noindex[^"]*"/.test(html)) fail(`${url}: not noindex`);
    const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
    if (canonical !== ORIGIN + url) fail(`${url}: canonical ${canonical}`);
    const alts = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
    if (alts.uk !== ORIGIN + p || alts.ru !== ORIGIN + '/ru' + p) fail(`${url}: hreflang uk/ru pair wrong (${JSON.stringify(alts)})`);
    if (['en', 'de', 'es'].some((l) => alts[l])) fail(`${url}: has EN/DE/ES hreflang`);
    if (!/<h1[^>]*>/.test(html)) fail(`${url}: no h1`);
    const bc = ld(html).find((n) => n['@type'] === 'BreadcrumbList');
    if (!bc || bc.itemListElement.length < 2) fail(`${url}: no BreadcrumbList`);
    if (/mat_uah|base_uah|"markup"|"c0"|price_uah|studioglass|Studio Glass|LED_MIRRORS_PRICES/i.test(html)) fail(`${url}: private data in HTML`);
    if (loc === 'ru' && /<html lang="uk"/.test(html)) fail(`${url}: RU page with lang=uk`);
  }
  // ---- 48 product pages
  for (const m of pub.models) {
    const url = `${pre}/shop/mirrors/led/${m.slug}/`, html = read(url);
    if (!html) continue;
    models++;
    const h1 = meta(html, /<h1[^>]*>([^<]*)</);
    if (!h1?.includes(m.name_short)) fail(`${url}: h1 "${h1}"`);
    const prod = ld(html).filter((n) => n['@type'] === 'Product');
    if (prod.length !== 1) { fail(`${url}: ${prod.length} Product nodes`); continue; }
    const pr = prod[0];
    const visible = (meta(html, /data-lm-total>([^<]*)</) ?? '').replace(/\D/g, '');
    if (String(pr.offers?.price) !== visible || String(pr.offers?.price) !== String(m.default_uah)) fail(`${url}: Offer price ${pr.offers?.price} vs visible ${visible} vs data ${m.default_uah}`);
    if (pr.offers?.priceCurrency !== 'UAH') fail(`${url}: currency`);
    for (const bad of ['aggregateRating', 'review', 'reviews']) if (bad in pr) fail(`${url}: invented ${bad}`);
    if ('availability' in (pr.offers ?? {}) || 'priceValidUntil' in (pr.offers ?? {})) fail(`${url}: Offer claims availability / validity`);
    if (!pr.name?.includes(m.name_short) || !pr.description || pr.url !== ORIGIN + url) fail(`${url}: Product name/description/url`);
    for (const img of pr.image ?? []) if (!fs.existsSync(path.join(dist, img.replace(ORIGIN, '')))) fail(`${url}: image missing ${img}`);
    const bc = ld(html).find((n) => n['@type'] === 'BreadcrumbList');
    if (bc?.itemListElement.length !== 5) fail(`${url}: breadcrumb length ${bc?.itemListElement.length}`);
    if (!html.includes('data-lm-add') || !html.includes('data-lm-buy')) fail(`${url}: buy / add buttons missing`);
    if ((html.match(/class="profile-card"/g) ?? []).length < 4) fail(`${url}: fewer than 4 similar models`);
    const title = meta(html, /<title>([^<]*)</);
    if (!title?.includes(m.name_short)) fail(`${url}: title "${title}"`);
  }
}
// unique titles / descriptions
for (const [, pre] of locales) {
  const titles = new Map(), descs = new Map();
  for (const m of pub.models) { const h = read(`${pre}/shop/mirrors/led/${m.slug}/`); if (!h) continue; const t = meta(h, /<title>([^<]*)</), d = meta(h, /<meta name="description" content="([^"]*)"/); titles.set(t, (titles.get(t) ?? 0) + 1); descs.set(d, (descs.get(d) ?? 0) + 1); }
  for (const [k, v] of [...titles, ...descs]) if (v > 1) fail(`duplicate title/description: ${k}`);
}

// ---- the sitemap stays clean
for (const f of ['sitemap.xml', 'sitemap-uk.xml', 'sitemap-ru.xml']) {
  const x = fs.existsSync(path.join(dist, f)) ? fs.readFileSync(path.join(dist, f), 'utf8') : '';
  if (/\/shop\/|\/cart\/|dzerkala\/katalog/.test(x)) fail(`${f} lists shop / cart / old catalog URLs`);
}
// ---- inactive categories are information pages only
for (const c of ['showers', 'partitions']) for (const pre of ['', '/ru']) { const h = read(`${pre}/shop/${c}/`); if (h && (/"@type":"Product"|"@type":"Offer"|data-lm-add/.test(h))) fail(`${pre}/shop/${c}/: shows products although the category has none`); }

// ---- old URLs: 301 rules, single hop, targets exist; old pages are gone; no internal links to them
const rules = fs.readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).map((l) => l.trim().split(/\s+/)).filter((r) => r.length >= 3);
const resolve = (p) => { for (const [from, to, code] of rules) { if (from.endsWith('/*') ? p.startsWith(from.slice(0, -1)) : p === from) return [to.replace(':splat', from.endsWith('/*') ? p.slice(from.length - 1) : ''), code]; } return null; };
for (const pre of ['', '/ru']) {
  const olds = [`${pre}/dzerkala/katalog/`, `${pre}/dzerkala/katalog`, ...pub.models.map((m) => `${pre}/dzerkala/katalog/${m.slug}/`)];
  for (const o of olds) {
    const r = resolve(o);
    if (!r || r[1] !== '301') { fail(`no 301 for ${o}`); continue; }
    if (resolve(r[0])) fail(`redirect chain: ${o} -> ${r[0]} -> ...`);
    if (!read(r[0])) fail(`redirect target missing: ${o} -> ${r[0]}`);
    if (!o.endsWith('/') ) continue;
    if (o !== `${pre}/dzerkala/katalog/` && !r[0].endsWith(o.split('/').slice(-2).join('/'))) fail(`wrong target ${o} -> ${r[0]}`);
  }
  if (read(`${pre}/dzerkala/katalog`)) fail('old catalog page still built');
}
let oldLinks = 0;
for (const f of walk(dist).filter((x) => x.endsWith('.html'))) if (/href="[^"]*\/dzerkala\/katalog/.test(fs.readFileSync(f, 'utf8'))) { oldLinks++; fail(`internal link to the old catalog URL in ${path.relative(dist, f)}`); }

// ---- EN / DE / ES untouched by the shop
for (const f of walk(dist).filter((x) => /[\\/](en|de|es)[\\/].*\.html$/.test(x))) {
  const h = fs.readFileSync(f, 'utf8');
  if (/href="\/(ru\/)?shop\/|nav-icon--cart|data-cart-link/.test(h)) fail(`shop / cart leaked into ${path.relative(dist, f)}`);
}
// ---- nothing public carries purchase data
for (const f of walk(dist).filter((x) => /\.(html|js|json|css|txt|xml|map)$/.test(x))) {
  const t = fs.readFileSync(f, 'utf8');
  if (/mat_uah_per_m2|"c0"\s*:|studioglass|Studio Glass/i.test(t)) fail(`purchase data / supplier name in ${path.relative(dist, f)}`);
}
console.log(`models checked: ${models} (expected ${pub.models.length * 2}); old-URL redirects checked; internal links to old URLs: ${oldLinks}`);
if (models !== pub.models.length * 2) fail('not all product pages were checked');
if (errors) { console.error(`${errors} problem(s)`); process.exit(1); }
console.log('OK: shop checks passed');
