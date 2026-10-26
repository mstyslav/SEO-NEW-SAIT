// Regression: business pages (/dlya-biznesu/{slug}/ and /ru/...) carry exactly one ItemList that
// mirrors the visible zone tiles (#zones) 1:1. Run after `npm run build`.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
let checked = 0;

const jsonLd = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
  const data = JSON.parse(m[1]);
  return data['@graph'] ?? [data];
});

for (const base of ['dlya-biznesu', 'ru/dlya-biznesu']) {
  const dir = join(dist, base);
  if (!existsSync(dir)) { errors.push(`missing ${base}`); continue; }
  for (const slug of readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    const url = `/${base}/${slug}/`;
    const html = readFileSync(join(dir, slug, 'index.html'), 'utf8');
    const lists = jsonLd(html).filter((n) => n['@type'] === 'ItemList');
    checked++;
    if (lists.length !== 1) { errors.push(`${url}: expected 1 ItemList, got ${lists.length}`); continue; }
    const list = lists[0];
    const els = list.itemListElement;
    if (list.numberOfItems !== els.length || els.length === 0) errors.push(`${url}: numberOfItems mismatch`);
    els.forEach((el, i) => {
      if (el.position !== i + 1) errors.push(`${url}: bad position ${el.position}`);
      if (!el.name || !/^https:\/\/space-glass\.com\.ua\//.test(el.url)) errors.push(`${url}: bad item ${JSON.stringify(el)}`);
    });
    const zones = html.match(/<section id="zones"[\s\S]*?<\/section>/)?.[0] ?? '';
    const tiles = [...zones.matchAll(/<a class="rh-tile" href="([^"]+)"[^>]*>[\s\S]*?<b[^>]*>([^<]+)<\/b>/g)];
    if (tiles.length !== els.length) errors.push(`${url}: ${tiles.length} visible tiles vs ${els.length} ListItems`);
    tiles.forEach((t, i) => {
      if (els[i] && (new URL(els[i].url).pathname !== t[1] || els[i].name !== t[2].replace(/&amp;/g, '&'))) errors.push(`${url}: item ${i + 1} differs from visible tile`);
    });
    if (jsonLd(html).filter((n) => n['@type'] === 'BreadcrumbList').length !== 1) errors.push(`${url}: BreadcrumbList count != 1`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`ItemList OK on ${checked} business pages.`);
