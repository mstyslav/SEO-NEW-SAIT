import type { APIRoute } from 'astro';
import { seoPages } from '../data/seo-pages';

const staticRoutes = [
  '/', '/about/', '/catalog/', '/projects/', '/contacts/', '/quote/',
  '/dushovi-kabiny/', '/sklyani-perehorodky/', '/sklyani-ohorozhi/',
  '/bezramne-sklinnia/', '/dzerkala/', '/arkhitekturni-systemy/'
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://space-glass.com.ua');
  const routes = [...staticRoutes, ...seoPages.map((page) => `/${page.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${new URL(route, base).toString()}</loc><changefreq>${route.includes('/baza-znan/') ? 'monthly' : 'weekly'}</changefreq><priority>${route === '/' ? '1.0' : route.includes('/rishennia/') || route.includes('/mista/') ? '0.9' : '0.7'}</priority></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
