// One-off / manual photo import for the LED mirror catalog (owner-approved, stored locally):
//   node scripts/import-led-mirror-photos.mjs <supplier-catalog.json>
// For each model: main image + extra gallery shots from the model page (only files named after the
// model's own main image — related-product thumbnails are skipped). Output: WebP 480/900 wide in
// public/images/led-mirrors/{slug}-{n}-{480|900}.webp and src/data/led-mirrors/photos.json {slug: count}.
import fs from 'node:fs';
import sharp from 'sharp';
import { slugOf } from '../src/lib/led-mirror-view.mjs';

const full = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const outDir = new URL('../public/images/led-mirrors/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });
const get = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`); return Buffer.from(await r.arrayBuffer()); };
const stem = (u) => u.split('/').pop().replace(/\.[a-z]+$/i, '');
const photos = {};
const report = [];

for (const m of full.models) {
  const slug = slugOf(m);
  const origin = new URL(m.supplier_url).origin;
  const main = m.image_url_supplier;
  const urls = [main.replace('/725X725/', '/930X930/'), main];
  try {
    const html = (await get(m.supplier_url)).toString('utf8');
    const root = stem(main).replace(/[-_]?\d+$/, '').toLowerCase();
    for (const [, p] of html.matchAll(/\/uploads\/products\/(?:930X930|725X725)\/[^"'\s)]+\.(?:jpg|png)/gi).map((x) => [0, x[0]])) {
      if (stem(p).toLowerCase().startsWith(root) && !urls.some((u) => stem(u) === stem(p))) urls.push(origin + p);
    }
  } catch (e) { report.push(`${slug}: page ${e.message}`); }
  const seen = new Set(); let n = 0;
  for (const u of urls) {
    if (n >= 5) break;
    try {
      const buf = await get(u);
      // 930 / 725 / jpg / png variants of one picture: compare 16x16 grayscale thumbnails
      const thumb = [...(await sharp(buf).resize(16, 16, { fit: 'fill' }).greyscale().raw().toBuffer())];
      if ([...seen].some((t) => t.reduce((a, v, i) => a + Math.abs(v - thumb[i]), 0) / 256 < 6)) continue;
      seen.add(thumb);
      const img = sharp(buf);
      const meta = await img.metadata();
      n++;
      for (const w of [480, 900]) await sharp(buf).resize({ width: Math.min(w, meta.width), height: Math.min(w, meta.width), fit: 'contain', background: '#fff' }).webp({ quality: 78 }).toFile(new URL(`${slug}-${n}-${w}.webp`, outDir).pathname);
    } catch { /* variant not available */ }
  }
  photos[slug] = n;
  if (!n) report.push(`${slug}: NO PHOTO`);
  await new Promise((r) => setTimeout(r, 300));
}
fs.writeFileSync(new URL('../src/data/led-mirrors/photos.json', import.meta.url), JSON.stringify(photos, null, 1) + '\n');
console.log('models with photos:', Object.values(photos).filter(Boolean).length, '/', full.models.length, ' total images:', Object.values(photos).reduce((a, b) => a + b, 0));
if (report.length) console.log(report.join('\n'));
