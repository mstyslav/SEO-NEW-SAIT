// DRAFT Google Merchant Center product feed (local file only, NOT published, no Merchant Center connection).
//   npm run feed:draft            -> worker/private/merchant-feed.draft.tsv (gitignored) + a report of what is still missing
// Architecture (see docs/MERCHANT-CENTER-READINESS.md): one product page per model; one feed item per STANDARD SIZE of the model
// (default options), grouped by item_group_id = model. The landing link is  .../{model}/?size=WxH , which preselects exactly that size,
// so the price in the feed is the price the visitor sees for the same configuration. Custom sizes and function combinations are not in the feed.
// Prices are RETAIL, taken from the same server-side function as the website (never purchase prices) and cross-checked against the decoded
// Worker secret. Fields the owner has not confirmed are left EMPTY and reported; nothing is invented to get through moderation.
import fs from 'node:fs';
import { mirrorPrice } from '../src/lib/led-mirror-price.mjs';
import { decodePrices } from '../src/lib/led-prices-codec.mjs';
import { modelFaq } from '../src/lib/shop-faq.mjs';
import { attr, optionLabel } from '../src/lib/led-mirror-i18n.mjs';

const ORIGIN = 'https://space-glass.com.ua';
const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const photos = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/photos.json', import.meta.url), 'utf8'));
const privFile = new URL('../worker/private/led-mirrors.json', import.meta.url);
const secretFile = new URL('../worker/private/led-mirrors.secret.txt', import.meta.url);
if (!fs.existsSync(privFile) || !fs.existsSync(secretFile)) { console.error('needs the local private files (run scripts/build-led-mirrors-catalog.mjs first)'); process.exit(1); }
const full = JSON.parse(fs.readFileSync(privFile, 'utf8'));
const decoded = await decodePrices(fs.readFileSync(secretFile, 'utf8').trim(), pub);

const cols = ['id', 'item_group_id', 'title', 'description', 'link', 'image_link', 'additional_image_link', 'price', 'availability', 'condition', 'brand', 'gtin', 'mpn', 'identifier_exists', 'google_product_category', 'product_type', 'size', 'custom_label_0'];
const rows = []; let mismatch = 0;
for (const m of pub.models) {
  const n = photos[m.slug] ?? 0;
  const desc = `Дзеркало ${m.name_short}: ${attr('uk', m.shape).toLowerCase()}, ${m.frame === 'Металева' ? 'у металевій рамі' : 'без рами'}, ${m.main_light === 'Без основної підсвітки' ? 'без основної підсвітки' : 'підсвітка — ' + attr('uk', m.main_light).toLowerCase()}. Розмір ${'{size}'} мм; додаткові функції обираються на сторінці товару.`;
  for (const s of m.standard_sizes) {
    const server = mirrorPrice(full, m.id, s.w, s.h).total_uah, viaSecret = mirrorPrice(decoded, m.id, s.w, s.h).total_uah;
    if (server !== viaSecret) mismatch++;
    rows.push({
      id: `sg-led-${m.slug}-${s.w}x${s.h}`, item_group_id: `sg-led-${m.slug}`, title: `Дзеркало ${m.name_short} ${s.w}×${s.h} мм`.slice(0, 150),
      description: desc.replace('{size}', `${s.w}×${s.h}`), link: `${ORIGIN}/shop/mirrors/led/${m.slug}/?size=${s.w}x${s.h}`,
      image_link: n ? `${ORIGIN}/images/led-mirrors/${m.slug}-1-900.webp` : '', additional_image_link: Array.from({ length: Math.max(0, n - 1) }, (_, i) => `${ORIGIN}/images/led-mirrors/${m.slug}-${i + 2}-900.webp`).join(','),
      price: `${server}.00 UAH`,
      availability: '', condition: '', brand: '', gtin: '', mpn: '', identifier_exists: '', // owner decisions pending: see the report below
      google_product_category: 'Home & Garden > Decor > Mirrors', product_type: `Дзеркала > LED-дзеркала > ${m.frame === 'Металева' ? 'У металевій рамі' : 'Безрамні'}`,
      size: `${s.w}x${s.h} mm`, custom_label_0: 'made_to_order'
    });
  }
}
const q = (v) => String(v).replace(/[\t\r\n]+/g, ' ');
fs.writeFileSync(new URL('../worker/private/merchant-feed.draft.tsv', import.meta.url), [cols.join('\t'), ...rows.map((r) => cols.map((c) => q(r[c] ?? '')).join('\t'))].join('\n') + '\n');

const empty = (c) => rows.filter((r) => !r[c]).length;
console.log(`DRAFT feed: ${rows.length} items from ${pub.models.length} models (${(rows.length / pub.models.length).toFixed(1)} per model) -> worker/private/merchant-feed.draft.tsv (local, gitignored)`);
console.log(`price check vs decoded Worker secret: ${mismatch === 0 ? 'identical for every item' : mismatch + ' MISMATCHES'}`);
console.log('items without image_link:', empty('image_link'), '| with additional images:', rows.length - rows.filter((r) => !r.additional_image_link).length);
console.log('MISSING (owner decisions, left empty on purpose): availability', empty('availability'), '| condition', empty('condition'), '| brand', empty('brand'), '| gtin', empty('gtin'), '| mpn', empty('mpn'), '| identifier_exists', empty('identifier_exists'));
console.log('price range:', Math.min(...rows.map((r) => parseInt(r.price))), '-', Math.max(...rows.map((r) => parseInt(r.price))), 'UAH (retail)');
if (mismatch) process.exit(1);
