import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const pages = path.resolve('src/pages');
const extensions = new Set(['.astro', '.js', '.ts', '.json']);
const broken = [];
const seoSlugs = new Set([
  'rishennia', 'mista', 'baza-znan',
  'glass-partitions', 'glass-showers', 'glass-railings', 'glass-doors', 'custom-mirrors', 'glass-facades',
  'mista/kyiv', 'mista/lviv', 'mista/odesa', 'baza-znan/yak-obraty-sklo', 'projects/loft-kyiv'
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeExists(href) {
  const clean = href.split('?')[0].split('#')[0];
  if (!clean || clean === '/' || !clean.startsWith('/')) return true;
  if (clean.startsWith('/images/') || clean.startsWith('/docs/') || clean.startsWith('/js/')) return true;
  if (clean.startsWith('/api/')) return true;

  const key = clean.replace(/^\//, '').replace(/\/$/, '');
  const localizedKey = key.replace(/^(ru|en|de)\//, '');
  if (seoSlugs.has(localizedKey)) return true;
  return fs.existsSync(path.join(pages, `${key}.astro`)) ||
    fs.existsSync(path.join(pages, key, 'index.astro'));
}

for (const file of walk(root)) {
  if (!extensions.has(path.extname(file))) continue;
  const text = fs.readFileSync(file, 'utf8');

  for (const match of text.matchAll(/href\s*=\s*["']([^"']+)["']/g)) {
    const href = match[1];
    if (!routeExists(href)) broken.push(`${path.relative(root, file)} → ${href}`);
  }
}

if (broken.length) {
  console.error('Broken internal links:');
  broken.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log('OK: internal static href links are valid.');
