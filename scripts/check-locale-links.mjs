import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

if (!fs.existsSync(dist)) {
  console.error('ERROR: dist/ not found. Run npm run build first.');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const ruRoot = path.join(dist, 'ru');
if (!fs.existsSync(ruRoot)) {
  console.log('OK: no RU pages to audit.');
  process.exit(0);
}

const pages = walk(ruRoot).filter((p) => p.endsWith(`${path.sep}index.html`));

const routeFromFile = (file) => {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  return '/' + rel.slice(0, -'index.html'.length);
};

const normalizeRoute = (pathname) => {
  if (!pathname.endsWith('/') && !pathname.split('/').pop()?.includes('.')) {
    return pathname + '/';
  }
  return pathname;
};

const ruRoutes = new Set(pages.map(routeFromFile));
const errors = [];

for (const file of pages) {
  const current = routeFromFile(file);
  const html = fs.readFileSync(file, 'utf8');
  const body = html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? html;

  for (const match of body.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];

    if (!href) continue;

    // Explicit language switch RU -> UK is allowed.
    if (
      tag.includes('data-language-button') ||
      tag.includes('language-switcher__button') ||
      /data-target-locale=["']uk["']/i.test(tag)
    ) {
      continue;
    }

    if (!href.startsWith('/') || href.startsWith('/ru/')) continue;

    let pathname;
    try {
      pathname = new URL(href, 'https://example.local').pathname;
    } catch {
      continue;
    }

    if (
      pathname.startsWith('/_astro/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/fonts/') ||
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/api/')
    ) {
      continue;
    }

    pathname = normalizeRoute(pathname);
    const expected = '/ru' + pathname;

    // Leak only when the matching RU route actually exists.
    if (ruRoutes.has(expected)) {
      errors.push({ current, href, expected });
    }
  }
}

console.log(`RU pages checked: ${pages.length}`);
console.log(`RU language leaks: ${errors.length}`);

for (const error of errors) {
  console.error(`BAD: ${error.current}`);
  console.error(` href: ${error.href}`);
  console.error(` want: ${error.expected}`);
}

if (errors.length) process.exit(1);

console.log('OK: RU internal navigation preserves locale.');
