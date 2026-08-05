import type { APIRoute } from 'astro';
import { supportedLocales, localizedPath } from '../i18n/helpers';

const pages = import.meta.glob('./**/*.astro');
const localizedIndexableRoutes = [
  '/catalog/',
  '/publichna-oferta/',
  '/cookies/',
  '/oplata-dostavka/',
  '/harantiia/',
  '/povernennia/',
  '/privacy/',
  '/sklyani-perehorodky/ofisni/'
];

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://space-glass.com.ua')).origin;
  const staticUrls = Object.keys(pages)
    .filter((path) => !path.includes('/404.astro') && !path.includes('/ui-kit/') && !path.includes('/project-print/') && !path.includes('/proposal.astro') && !path.includes('/thank-you.astro') && !path.includes('/api/'))
    .map((path) => path.replace(/^\.\//, '/').replace(/index\.astro$/, '').replace(/\.astro$/, '/'));
  const localizedUrls = localizedIndexableRoutes.flatMap((route) => supportedLocales.map((locale) => localizedPath(route, locale)));
  const urls = [...new Set([...staticUrls, ...localizedUrls])].sort();
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `\n  <url><loc>${origin}${path}</loc><changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${path === '/' ? '1.0' : '0.7'}</priority></url>`).join('')}\n</urlset>`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
};
