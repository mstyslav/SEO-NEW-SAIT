// MANUAL price update: turns the supplier price list into the files the site uses.
//   node scripts/build-led-mirrors-catalog.mjs <supplier-catalog.json> --markup <factor>
// 1. src/data/led-mirrors/public.json (public): model list, sizes, option NAMES, retail "from" prices. No purchase prices,
//    no coefficients, no markup, no supplier name / URLs.
// 2. worker/private/led-mirrors.json (gitignored, LOCAL ONLY): the full purchase-price catalog, used by tests and to build the secret.
// 3. worker/private/led-mirrors.secret.txt (gitignored, LOCAL ONLY): the same numbers in the compact transport format
//    (gzip+base64, src/lib/led-prices-codec.mjs). `npm run led:publish` sends it to the Worker secret LED_MIRRORS_PRICES.
// Then: npm run led:publish && npm run test:led-mirrors && npm run build.  No automatic sync with the supplier site, by design.
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';
import { mirrorPrice, modelOptionGroups, fromPrice } from '../src/lib/led-mirror-price.mjs';
import { slugOf } from '../src/lib/led-mirror-view.mjs';

const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith('--'));
const mi = args.indexOf('--markup');
const MARKUP = mi >= 0 ? Number(args[mi + 1]) : NaN; // the factor is a business secret: never hard-coded in this public repository
if (!src || !(MARKUP >= 1 && MARKUP < 3)) { console.error('usage: node scripts/build-led-mirrors-catalog.mjs <supplier-catalog.json> --markup <factor>'); process.exit(1); }

const full = JSON.parse(fs.readFileSync(src, 'utf8'));
const priv = {
  collected: (full.source.match(/\d{4}-\d{2}-\d{2}/) ?? [''])[0],
  currency: full.currency,
  markup: MARKUP,
  groups: full.groups,
  common_options: full.common_options,
  models: full.models.map(({ name_supplier, supplier_url, image_url_supplier, from_price_uah, ...m }) => m)
};
if (/studio\s*glass/i.test(JSON.stringify(priv))) { console.error('supplier name still present in output'); process.exit(1); }
if (priv.models.some((m) => !m.standard_sizes.length)) { console.error('model without a standard size (no "from" price)'); process.exit(1); }

const pub = {
  collected: priv.collected,
  currency: priv.currency,
  groups: priv.groups.map(({ key, label }) => ({ key, label })),
  models: priv.models.map((m) => {
    const groups = modelOptionGroups(priv, m);
    const std = m.standard_sizes[0];
    return {
      id: m.id, slug: slugOf(m), name_short: m.name_short, shape: m.shape, main_light: m.main_light, mounting: m.mounting, frame: m.frame, series: m.series,
      size_limits_mm: m.size_limits_mm,
      standard_sizes: m.standard_sizes.map(({ w, h }) => ({ w, h })),
      option_groups: groups.map((g) => ({ key: g.key, options: g.options.map((o) => o.name) })),
      from_uah: fromPrice(m, priv.markup),
      default_uah: mirrorPrice(priv, m.id, std.w, std.h).total_uah
    };
  })
};
const ptext = JSON.stringify(pub);
if (/studio\s*glass|"markup"|"c0"|"mat_uah|"base_uah/i.test(ptext)) { console.error('private data leaked into the public catalog'); process.exit(1); }
// compact numeric table for the Worker secret (names / groups / limits stay public)
const compact = {
  v: 1, k: priv.markup,
  m: priv.models.map((m) => [m.id, m.base_uah, m.mat_uah_per_m2, m.standard_sizes.map((x) => [x.w, x.h, x.price_uah]),
    modelOptionGroups(priv, m).map((g) => g.options.map((o) => [o.c0, o.ca, o.cp, o.cw]))])
};
fs.mkdirSync(new URL('../worker/private/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../worker/private/led-mirrors.secret.txt', import.meta.url), gzipSync(JSON.stringify(compact), { level: 9 }).toString('base64'));
fs.writeFileSync(new URL('../worker/private/led-mirrors.json', import.meta.url), JSON.stringify(priv) + '\n');
fs.writeFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), ptext + '\n');
console.log(`models: ${pub.models.length}, collected: ${pub.collected}, markup: x${MARKUP}`);
