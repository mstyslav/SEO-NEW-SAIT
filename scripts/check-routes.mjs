import fs from 'node:fs';
import path from 'node:path';

const routes = [
  '/',
  '/proposal/',
  '/catalog/',
  '/publichna-oferta/',
  '/cookies/',
  '/oplata-dostavka/',
  '/harantiia/',
  '/povernennia/',
  '/privacy/',

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

const generatedSeoRoutes = ['rishennia', 'mista', 'baza-znan', 'glass-partitions', 'glass-showers', 'glass-railings', 'glass-doors', 'custom-mirrors', 'glass-facades'];
const locales = ['', 'uk/', 'ru/', 'en/', 'de/'];
const catchAll = path.join(path.resolve('src/pages'), '[...seo].astro');
if (!fs.existsSync(catchAll)) {
  console.error('Missing SEO catch-all route source:', catchAll);
  process.exit(1);
}
for (const locale of locales) for (const slug of generatedSeoRoutes) routes.push(`/${locale}${slug}/`);
for (const locale of ['uk/', 'ru/', 'en/', 'de/']) {
  for (const route of ['/catalog/', '/publichna-oferta/', '/cookies/', '/oplata-dostavka/', '/harantiia/', '/povernennia/', '/privacy/', '/sklyani-perehorodky/ofisni/']) {
    routes.push(`/${locale}${route.replace(/^\//, '')}`);
  }
}

const pages = path.resolve('src/pages');
const missing = [];

for (const route of routes) {
  if (route === '/') continue;
  const key = route.replace(/^\//, '').replace(/\/$/, '');
  const direct = path.join(pages, `${key}.astro`);
  const index = path.join(pages, key, 'index.astro');

  const localizedMirror = /^(uk|ru|en|de)\//.test(key);
  const unlocalizedKey = key.replace(/^(uk|ru|en|de)\//, '');
  const mirrorDirect = path.join(pages, `${unlocalizedKey}.astro`);
  const mirrorIndex = path.join(pages, unlocalizedKey, 'index.astro');
  const isGeneratedSeoRoute = generatedSeoRoutes.some((slug) => key === slug || key.endsWith(`/${slug}`));
  if (!fs.existsSync(direct) && !fs.existsSync(index) && !isGeneratedSeoRoute && !(localizedMirror && (fs.existsSync(mirrorDirect) || fs.existsSync(mirrorIndex)))) {
    missing.push(route);
  }
}

if (missing.length) {
  console.error('Missing routes:', missing.join(', '));
  process.exit(1);
}

console.log(`OK: ${routes.length} critical routes are present.`);
