// Checks the BUILT shop (run `npm run build` first): routes, noindex, canonical, hreflang, Product / BreadcrumbList data,
// sitemap, 301 redirects (no chains), no purchase-price leak, EN/DE/ES untouched.   npm run check:shop
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const ORIGIN = 'https://space-glass.com.ua';
const pub = JSON.parse(fs.readFileSync('src/data/led-mirrors/public.json', 'utf8'));
const seoData = JSON.parse(fs.readFileSync('src/data/led-mirrors/seo.json', 'utf8'));
const descTexts = new Map();
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
    if ((html.match(/data-related[\s\S]*?<\/section>/)?.[0].match(/class="sf-card"/g) ?? []).length < 4) fail(`${url}: fewer than 4 similar models`);
    const title = meta(html, /<title>([^<]*)</);
    if (!title?.includes(m.name_short)) fail(`${url}: title "${title}"`);
  }
}
// ---- unified catalog pages (/shop/, /shop/mirrors/, /shop/mirrors/led/): all 48 products in the HTML, tabs, filters data, exact texts
const SUB = { uk: 'Готові скляні вироби та конструкції на замовлення з доставкою по Україні.', ru: 'Готовые стеклянные изделия и конструкции на заказ с доставкой по Украине.' };
const TAB_ALL = { uk: 'Усі товари', ru: 'Все товары' };
for (const [loc, pre] of locales) for (const p of ['/shop/', '/shop/mirrors/', '/shop/mirrors/led/']) {
  const html = read(pre + p); if (!html) continue;
  const cards = (html.match(/class="sf-card"/g) ?? []).length;
  const expectN = p === '/shop/mirrors/led/' ? pub.models.filter((m) => m.main_light !== 'Без основної підсвітки' || m.option_groups.some((g) => g.key === 'backlight')).length : pub.models.length; // the LED listing hides models without any light
  if (cards !== expectN) fail(`${pre + p}: ${cards} product cards, expected ${expectN}`);
  if (!html.includes(SUB[loc])) fail(`${pre + p}: subtitle text missing`);
  if (p === '/shop/' && !/<h1[^>]*>Магазин Space Glass</.test(html)) fail(`${pre + p}: h1`);
  if (!html.includes(`>${TAB_ALL[loc]}<`)) fail(`${pre + p}: "all products" tab missing`);
  const tabs = [...html.matchAll(/<button[^>]*class="sf-tab"[^>]*data-cat="(\w+)"[^>]*>/g)].map((m) => m[0]);
  for (const c of ['showers', 'partitions']) if (!tabs.some((t) => t.includes(`data-cat="${c}"`) && /\sdisabled[\s>=]/.test(t))) fail(`${pre + p}: ${c} tab must be disabled while it has no products`);
  if (tabs.some((t) => t.includes('data-cat="mirrors"') && /\sdisabled[\s>=]/.test(t))) fail(`${pre + p}: mirrors tab disabled`);
  const data = JSON.parse((html.match(/<script type="application\/json" id="sf-data">([\s\S]*?)<\/script>/) ?? [])[1] ?? 'null');
  if (!data || data.products.length !== expectN) fail(`${pre + p}: sf-data missing / incomplete`);
  else {
    const expected = p === '/shop/' ? 'all' : 'mirrors';
    if (data.initialCat !== expected) fail(`${pre + p}: initial category ${data.initialCat}`);
    const active = data.schema.categories.filter((c) => c.active).map((c) => c.key);
    if (active.join() !== 'mirrors') fail(`${pre + p}: active categories ${active}`);
    for (const c of data.schema.categories.filter((c) => !c.active)) if (c.filters.length) fail(`${pre + p}: inactive category ${c.key} has filters`);
    for (const f of data.schema.categories[0].filters) if (f.options && f.options.length < 2) fail(`${pre + p}: filter ${f.key} has <2 options`);
    const mp = new Map(pub.models.map((m) => [m.id, m.from_uah]));
    for (const pr of data.products) { const m = pub.models.find((x) => `mirrors-led-${x.slug}` === pr.id); if (!m || pr.p !== m.from_uah) fail(`${pre + p}: price of ${pr.id} differs from the retail data`); }
  }
  if (/\?[a-z]+=/.test(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '')) fail(`${pre + p}: canonical carries parameters`);
}
// ---- FAQ: exactly 10 questions on every catalog and product page, no FAQPage markup anywhere in the shop
for (const [loc, pre] of locales) {
  const faqPages = ['/shop/', '/shop/mirrors/', '/shop/mirrors/led/', ...pub.models.map((m) => `/shop/mirrors/led/${m.slug}/`)];
  for (const p of faqPages) {
    const html = read(pre + p); if (!html) continue;
    const items = (html.match(/<details class="faq-item"/g) ?? []).length;
    if (items !== 10) fail(`${pre + p}: ${items} FAQ items, expected 10`);
    if ((html.match(/data-shop-faq/g) ?? []).length !== 1) fail(`${pre + p}: FAQ block count`);
    if (/"@type":"FAQPage"/.test(html)) fail(`${pre + p}: FAQPage structured data must not be emitted`);
    for (const d of html.matchAll(/<details class="faq-item">\s*<summary>\s*<span>([^<]+)<\/span>\s*<i[^>]*><\/i>\s*<\/summary>\s*<div class="faq-item__answer"><p>([^<]+)<\/p>/g)) if (d[1].length < 8 || d[2].length < 20) fail(`${pre + p}: empty FAQ text`);
    if (loc === 'ru' && /Оберіть|Поширені|Доставка та/.test((html.match(/data-shop-faq[\s\S]*?<\/section>/) ?? [''])[0])) fail(`${pre + p}: UA text inside the RU FAQ`);
  }
  // product page structure
  for (const m of pub.models) {
    const url = `${pre}/shop/mirrors/led/${m.slug}/`, html = read(url); if (!html) continue;
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length; if (h1s !== 1) fail(`${url}: ${h1s} h1`);
    const order = [...html.matchAll(/<h2[^>]*id="(pp-config-title|pp-desc|pp-spec|pp-reviews|pp-deliv|model-faq-title|lm-related-title)"/g)].map((x) => x[1]).join();
    if (order !== 'pp-config-title,pp-desc,pp-spec,pp-reviews,pp-deliv,lm-related-title') fail(`${url}: section order ${order}`);
    // tabs: Опис | Характеристики | Відгуки; reviews = honest empty state, no rating data
    const tabIds = [...html.matchAll(/role="tab" id="(pp-tab-[a-z]+)"/g)].map((x) => x[1]).join();
    if (tabIds !== 'pp-tab-desc,pp-tab-spec,pp-tab-reviews') fail(`${url}: tabs ${tabIds}`);
    const reviewsPanel = (html.match(/id="pp-panel-reviews"[\s\S]*?<\/section>/) ?? [''])[0];
    if (!/pp-reviews-empty/.test(reviewsPanel) || /★|aggregateRating|ratingValue|itemprop="review/.test(html)) fail(`${url}: reviews panel must be an empty state without ratings`);
    // agreed sale terms are shown; unagreed ones (returns, delivery price, pickup city) are not stated
    const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    if (!(loc === 'ru' ? /12 месяцев/ : /12 місяців/).test(text) || !/3 до 35 рабочих дней|3 до 35 робочих днів/.test(text) || !/100% (предоплата|передоплата)/.test(text) || !/(Новой почтой|Новою поштою)/.test(text)) fail(`${url}: agreed sale terms missing`);
    if (/повернен|возврат|Київ.{0,20}самовивіз|самовывоз.{0,20}Киев/i.test(text.replace(/Опрацювання|повернення до/g, ''))) fail(`${url}: states a return rule / pickup city that is not agreed`);
    // natural search phrase from the research is in the description text; photo alt carries the model name
    const q = seoData[m.slug]?.queries?.[loc === 'ru' ? 'ru' : 'uk']?.primary;
    const descText = ((html.match(/id="pp-panel-desc"[\s\S]*?<\/section>/) ?? [''])[0]).replace(/<[^>]+>/g, ' ');
    if (!q || !descText.toLowerCase().includes(q.toLowerCase())) fail(`${url}: primary query «${q}» missing in the description`);
    const mainAlt = html.match(/class="pp-gallery__main"[^>]*alt="([^"]*)"/)?.[1] ?? '';
    if (!mainAlt.includes(m.name_short)) fail(`${url}: main photo alt «${mainAlt}»`);
    // a model without any LED light is never called an LED mirror in its own texts (H1, lead, description, schema, alt)
    if (!(m.main_light !== 'Без основної підсвітки' || m.option_groups.some((g) => g.key === 'backlight'))) {
      const own = [html.match(/<h1[^>]*>([^<]*)/)?.[1], descText, ld(html).find((n) => n['@type'] === 'Product')?.description, mainAlt, html.match(/<title>([^<]*)/)?.[1]].join(' ');
      if (/LED/.test(own)) fail(`${url}: model without LED light is called LED: ${own.match(/.{0,30}LED.{0,20}/)?.[0]}`);
    }
    descTexts.set(`${loc}:${m.slug}`, descText.replace(/\s+/g, ' ').trim());
    const cfgHtml = (html.match(/data-lm-calc[\s\S]*?<\/section>/) ?? [''])[0];
    if (/<select/.test(cfgHtml)) fail(`${url}: dropdown (select) in the selection block`);
    if (!/data-lm-buy[^>]*disabled/.test(html) || !/data-lm-add[^>]*disabled/.test(html)) fail(`${url}: buy buttons must start disabled until the server confirms the price`);
    if (!/name="size"/.test(cfgHtml) || (cfgHtml.match(/name="size" value="\d+x\d+"/g) ?? []).length !== m.standard_sizes.length) fail(`${url}: standard size buttons do not match the data`);
    const pr = ld(html).find((n) => n['@type'] === 'Product');
    if (pr?.sku !== `SG-LED-${m.slug.toUpperCase()}` || !html.includes(pr.sku)) fail(`${url}: sku missing or not visible`);
    for (const bad of ['brand', 'gtin', 'gtin13', 'mpn', 'aggregateRating', 'review']) if (pr && bad in pr) fail(`${url}: unconfirmed Product field ${bad}`);
    if (pr && ('availability' in pr.offers || 'itemCondition' in pr.offers)) fail(`${url}: Offer claims availability / condition`);
  }
}
// the description texts of the 48 models are all different (UA and RU)
for (const l of ['uk', 'ru']) { const vals = [...descTexts].filter(([k]) => k.startsWith(l + ':')).map(([, v]) => v); if (vals.length && new Set(vals).size !== vals.length) fail(`${l}: identical description texts among models`); }
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
  const olds = [`${pre}/dzerkala/katalog/`, `${pre}/dzerkala/katalog`, ...pub.models.flatMap((m) => [`${pre}/dzerkala/katalog/${m.slug}/`, `${pre}/dzerkala/katalog/${m.slug}`])];
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
