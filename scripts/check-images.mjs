// Fails when a built page references an /images/ file (src, srcset, href) that is missing from public/.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const pub = path.resolve('public');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []);

const missing = new Map();
for (const file of walk(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const attr of html.matchAll(/(?:src|srcset|href)="([^"]*)"/g)) {
    for (const url of attr[1].match(/\/images\/[^\s",]+\.(?:webp|jpe?g|png|avif|svg)/g) ?? []) {
      if (!fs.existsSync(path.join(pub, decodeURIComponent(url)))) {
        if (!missing.has(url)) missing.set(url, path.relative(dist, file));
      }
    }
  }
}
if (missing.size) {
  for (const [url, page] of missing) console.error(`MISSING ${url}  (e.g. ${page})`);
  console.error(`Missing images: ${missing.size}`);
  process.exit(1);
}
console.log('OK: all referenced images exist.');
