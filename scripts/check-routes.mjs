import fs from 'node:fs';
import path from 'node:path';

const routes = [
  '/',
  '/proposal/',
  '/ogorozhi-configurator/',
  '/bezramne-configurator/',
  '/loft-configurator/',
  '/fasadne-configurator/',
  '/peregorodky-configurator/',
  '/dzerkala-configurator/',
  '/sklyani-perehorodky/loft/',
  '/sklyani-perehorodky/ofisni/',
  '/sklyani-perehorodky/mizhkimnatni/',
  '/sklyani-perehorodky/rozsuvni/',
  '/sklyani-perehorodky/teleskopichni/',
  '/sklyani-perehorodky/pivot/',
  '/dushovi-kabiny/walk-in/',
  '/dushovi-kabiny/kutovi/',
  '/dushovi-kabiny/u-nishu/',
  '/dushovi-kabiny/rozsuvni/',
  '/dushovi-kabiny/shtorky-dlia-vanny/',
  '/dushovi-kabiny/dushovi-dveri/'
];

const pages = path.resolve('src/pages');
const missing = [];

for (const route of routes) {
  if (route === '/') continue;
  const key = route.replace(/^\//, '').replace(/\/$/, '');
  const direct = path.join(pages, `${key}.astro`);
  const index = path.join(pages, key, 'index.astro');

  if (!fs.existsSync(direct) && !fs.existsSync(index)) {
    missing.push(route);
  }
}

if (missing.length) {
  console.error('Missing routes:', missing.join(', '));
  process.exit(1);
}

console.log(`OK: ${routes.length} critical routes are present.`);
