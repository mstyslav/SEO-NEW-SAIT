// Creates an AVIF twin (same path, .avif) for every image a page uses as its LCP/hero image
// (the <img fetchpriority="high"> and the <source> candidates of its <picture>), next to the
// WebP in public/. astro-integrations/hero-avif.mjs then offers AVIF first — only where every
// candidate of a srcset has its twin. AVIF q55 is visually equal to the WebP (checked 1:1)
// at ~40–50% of the bytes. Existing twins are kept; run after adding or replacing a hero:
//
//   npm run build && node scripts/make-hero-avif.mjs && npm run build
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);

const files = new Set();
for (const file of walk('dist')) {
  const html = fs.readFileSync(file, 'utf8');
  const img = html.match(/<img\b[^>]*fetchpriority="high"[^>]*>/);
  if (!img) continue;
  const before = html.slice(0, img.index);
  const inPicture = before.lastIndexOf('<picture') > before.lastIndexOf('</picture>');
  const block = inPicture ? html.slice(before.lastIndexOf('<picture'), img.index + img[0].length) : img[0];
  for (const m of block.matchAll(/\s(?:srcset|src)="([^"]+)"/g))
    for (const c of m[1].split(',')) {
      const url = c.trim().split(/\s+/)[0];
      if (/^\/images\/.+\.(webp|jpe?g|png)$/.test(url)) files.add(decodeURIComponent(url));
    }
}

let made = 0, bytesIn = 0, bytesOut = 0;
for (const url of files) {
  const src = path.join('public', url);
  const out = src.replace(/\.(webp|jpe?g|png)$/, '.avif');
  if (!fs.existsSync(src) || fs.existsSync(out)) continue;
  const buf = await sharp(src).avif({ quality: 55, effort: 6 }).toBuffer();
  fs.writeFileSync(out, buf);
  made++; bytesIn += fs.statSync(src).size; bytesOut += buf.length;
}
console.log(`${files.size} hero image files; ${made} AVIF twins created (${Math.round(bytesIn / 1024)} KB → ${Math.round(bytesOut / 1024)} KB)`);
