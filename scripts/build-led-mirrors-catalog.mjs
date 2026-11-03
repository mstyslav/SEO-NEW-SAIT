// MANUAL price update: turns the supplier price list into the two catalog files the site uses.
//   node scripts/build-led-mirrors-catalog.mjs <supplier-catalog.json> --markup <factor>
// 1. worker/private/led-mirrors.json  (gitignored, server only): purchase prices + markup. The Worker uses it
//    to calculate and verify every retail price; it is bundled into the Worker, never served as a static file.
// 2. src/data/led-mirrors/public.json (public): model list, sizes, option NAMES and the retail "from" price.
//    No purchase prices, no formula coefficients, no markup, no supplier name / URLs.
// Then run: npm run test:led-mirrors && npm run build.  There is no automatic sync with the supplier site, by design.
import fs from 'node:fs';
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
fs.mkdirSync(new URL('../worker/private/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../worker/private/led-mirrors.json', import.meta.url), JSON.stringify(priv) + '\n');
fs.writeFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), ptext + '\n');
console.log(`models: ${pub.models.length}, collected: ${pub.collected}, markup: x${MARKUP}`);
