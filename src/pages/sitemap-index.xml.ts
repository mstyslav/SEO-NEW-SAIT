import type { APIRoute } from 'astro';
import { sitemapLanguages, XML_HEADERS } from '../seo/sitemap-urls';

// Sitemap index of the per-language sitemaps. /sitemap.xml stays the full list (robots.txt);
// this index is meant to be submitted in Search Console in addition, for per-language reports.
export const GET: APIRoute = ({ site }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLanguages.map((lang)=>`\n  <sitemap><loc>${origin}/sitemap-${lang}.xml</loc></sitemap>`).join('')}\n</sitemapindex>`;
  return new Response(body,{headers:XML_HEADERS});
};
