// Route check against the BUILT site (run `npm run build` first).
// Most pages come from dynamic routes ([slug].astro, [...seo].astro), so the source tree
// cannot tell which URLs exist — the build output can.
//   1. every critical route below is present in dist/ (UA and its /ru/ twin);
//   2. every URL in dist/sitemap.xml has a built page;
//   3. every UA sitemap URL has an RU twin in the sitemap, and the other way round.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'sitemap.xml'))) {
  console.error('check:routes needs the build output — run `npm run build` first (dist/sitemap.xml not found).');
  process.exit(1);
}

// Section hubs, key service pages and configurators. Each one is checked in UA and RU.
const critical = [
  '/',
  '/catalog/',
  '/poslugy/',
  '/rishennya/',
  '/dlya-biznesu/',
  '/pryvatnyj-sektor/',
  '/project/',
  '/knowledge/',
  '/contacts/',
  '/about/',
  '/delivery-payment/',
  '/city/kyiv/',
  '/city/odesa/',
  '/city/lviv/',
  '/dushovi-kabiny/',
  '/dushovi-kabiny/kytova-dushova-kabina/',
  '/dushovi-kabiny/u-nishu/',
  '/dushovi-kabiny/rozsuvni/',
  '/dushovi-kabiny/dveri-dlya-dushu/',
  '/dushovi-kabiny/dushovi-piddony/',
  '/sklyani-perehorodky/',
  '/sklyani-perehorodky/ofisni/',
  '/sklyani-perehorodky/mizhkimnatni/',
  '/sklyani-dveri/',
  '/sklyani-ohorozhi/',
  '/sklyani-kozyrky/',
  '/dzerkala/',
  '/bezramne-sklinnya/',
  '/alyuminiyevi-konstrukcziyi/',
  '/metaloplastykovi-konstrukcziyi/',
  '/poslugy/sklyani-fasady/',
  '/arkhitekturni-systemy/',
  '/ogorozhi-configurator/',
  '/kozyrky-configurator/'
];
// Present in one language only (utility pages and UA-only configurators).
const single = [
  '/bezramne-configurator/',
  '/loft-configurator/',
  '/fasadne-configurator/',
  '/peregorodky-configurator/',
  '/dzerkala-configurator/',
  '/proposal/',
  '/thank-you/'
];
const files = ['/404.html', '/robots.txt', '/_redirects', '/js/forms.js'];

const built = (route) => fs.existsSync(path.join(dist, route, route.endsWith('/') ? 'index.html' : ''));
const errors = [];

for (const route of critical) {
  if (!built(route)) errors.push(`missing critical route: ${route}`);
  const ru = `/ru${route}`;
  if (!built(ru)) errors.push(`missing critical route: ${ru}`);
}
for (const route of [...single, ...files]) if (!built(route)) errors.push(`missing: ${route}`);

const origin = 'https://space-glass.com.ua';
const sitemap = [...fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = new Set();
for (const loc of sitemap) {
  if (!loc.startsWith(`${origin}/`)) { errors.push(`sitemap URL on a foreign origin: ${loc}`); continue; }
  const route = loc.slice(origin.length);
  if (urls.has(route)) errors.push(`duplicate sitemap URL: ${route}`);
  urls.add(route);
  if (!built(route)) errors.push(`sitemap URL without a built page: ${route}`);
}
const isRu = (route) => route === '/ru/' || route.startsWith('/ru/');
for (const route of urls) {
  const twin = isRu(route) ? route.slice(3) : `/ru${route}`;
  if (!urls.has(twin)) errors.push(`sitemap URL without a ${isRu(route) ? 'UA' : 'RU'} twin: ${route}`);
}

if (errors.length) {
  console.error(`Route check failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`OK: ${critical.length * 2 + single.length + files.length} critical routes are built; ${urls.size} sitemap URLs have pages and UA/RU twins.`);
