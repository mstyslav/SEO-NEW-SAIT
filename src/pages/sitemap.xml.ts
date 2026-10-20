import type { APIRoute } from 'astro';
import { sitemapPaths, urlsetXml, XML_HEADERS } from '../seo/sitemap-urls';

// All indexable URLs in one file — the sitemap named in robots.txt and submitted in Search Console.
// The same URLs are also split by language: /sitemap-index.xml → /sitemap-{uk,ru,en,de,es}.xml.
export const GET: APIRoute = async ({ site }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  return new Response(urlsetXml(origin, await sitemapPaths()),{headers:XML_HEADERS});
};
