// Imports the product SEO metadata prepared by the research session (title / description / H1, UA + RU) into src/data/led-mirrors/seo.json.
//   node scripts/import-shop-seo.mjs ~/Documents/SpaceGlass-Shop-SEO-Research/PRODUCT_SEO_METADATA.csv
// Only the three text fields per language are kept (no keyword-frequency / autocomplete columns). Every row is validated against the REAL model data;
// any problem stops the import. Titles / descriptions of existing site pages are not touched.
import fs from 'node:fs';

const src = process.argv[2];
if (!src) { console.error('usage: node scripts/import-shop-seo.mjs <PRODUCT_SEO_METADATA.csv>'); process.exit(1); }
const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const parse = (text) => { const rows = []; let row = [], f = '', q = false; for (let i = 0; i < text.length; i++) { const c = text[i]; if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; } else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c; } if (f || row.length) { row.push(f); rows.push(row); } return rows; };
const [head, ...body] = parse(fs.readFileSync(src, 'utf8').replace(/^﻿/, ''));
const rows = body.filter((r) => r.length > 5).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
const out = {}, problems = [];
const bad = /грн|гаранті|гарантия|сертифік|сертифик|безкоштовн|бесплатн|власн\w+ виробництв|собственн\w+ производств|найкращ|лучш/i;
const ruOpt = { 'підігрів': 'подогрев', 'косметична лінза': 'косметическая линза', 'поличка': 'полочка', 'вимикач': 'выключатель', 'годинник': 'часы', 'мультимедіа': 'мультимедиа' };
for (const m of pub.models) {
  const r = rows.find((x) => x.slug === m.slug);
  if (!r) { problems.push(`${m.slug}: no row`); continue; }
  const rec = { title: { uk: r.seo_title_uk, ru: r.seo_title_ru }, description: { uk: r.seo_description_uk, ru: r.seo_description_ru }, h1: { uk: r.h1_uk, ru: r.h1_ru },
    // search phrases of the research (autocomplete, NOT demand statistics); used once, naturally, in the model text
    queries: { uk: { primary: r.primary_keyword_uk.trim(), secondary: r.secondary_keywords_uk.split('|').map((x) => x.trim()).filter(Boolean) }, ru: { primary: r.primary_keyword_ru.trim(), secondary: r.secondary_keywords_ru.split('|').map((x) => x.trim()).filter(Boolean) } } };
  for (const [k, v] of Object.entries(rec)) for (const l of ['uk', 'ru']) if (!v[l]) problems.push(`${m.slug}: empty ${k} ${l}`);
  const all = JSON.stringify(rec);
  if (bad.test(all)) problems.push(`${m.slug}: unconfirmed claim or price word`);
  if (!all.includes(m.name_short)) problems.push(`${m.slug}: model name missing`);
  const L = m.size_limits_mm;
  for (const l of ['uk', 'ru']) {
    const d = rec.description[l];
    const square = d.includes(`${L.width[0]}×${L.height[0]}`) && d.includes(`${L.width[1]}×${L.height[1]}`);
    const perDim = d.includes(`${L.width[0]}–${L.width[1]}`) && d.includes(`${L.height[0]}–${L.height[1]}`);
    if (!square && !perDim) problems.push(`${m.slug}: size range in ${l} description differs from the data`);
    const keys = m.option_groups.map((g) => g.key);
    const claim = (word, key) => d.toLowerCase().includes(word) && !keys.includes(key) && problems.push(`${m.slug}: ${l} description mentions "${word}" which the model does not offer`);
    if (l === 'uk') { claim('підігрів', 'heating'); claim('годинник', 'clock'); claim('поличка', 'shelf'); claim('мультимедіа', 'audio'); claim('вимикач', 'switch'); claim('лінза', 'lens'); }
    else { claim('подогрев', 'heating'); claim('часы', 'clock'); claim('полочка', 'shelf'); claim('мультимедиа', 'audio'); claim('выключатель', 'switch'); claim('линза', 'lens'); }
    if (/металев|металл/i.test(d) !== (m.frame === 'Металева') && /без рами|без рамы/i.test(d) === (m.frame === 'Металева')) problems.push(`${m.slug}: frame statement differs from the data`);
  }
  out[m.slug] = rec;
}
for (const k of ['title', 'description', 'h1']) for (const l of ['uk', 'ru']) { const seen = new Map(); for (const [slug, v] of Object.entries(out)) { const t = v[k][l]; if (seen.has(t)) problems.push(`duplicate ${k} ${l}: ${slug} = ${seen.get(t)}`); seen.set(t, slug); } }
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
fs.writeFileSync(new URL('../src/data/led-mirrors/seo.json', import.meta.url), JSON.stringify(out) + '\n');
const len = (k, l) => { const a = Object.values(out).map((v) => v[k][l].length); return `${Math.min(...a)}–${Math.max(...a)}`; };
console.log(`imported ${Object.keys(out).length} models; title UA ${len('title', 'uk')}, RU ${len('title', 'ru')}; description UA ${len('description', 'uk')}, RU ${len('description', 'ru')}; all unique, facts verified against the model data`);
