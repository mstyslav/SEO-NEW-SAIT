import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
const pages = import.meta.glob('./**/*.astro');
// uk/* pages are non-canonical duplicates of the unprefixed root pages (their own
// canonical tag points at the unprefixed URL), so they must not be submitted separately.
const excludedLocales = /^\.\/(en|de|uk)(?:\/|$)/;
// These ru/* pages redirect straight back to the unprefixed (uk) URL and never render real
// Russian content, so they must not be submitted to search engines as indexable RU pages.
const excludedRuStubs = /^\.\/ru\/(about|cart|compare|quote|catalog)(?:\/|$)/;
export const GET: APIRoute = async ({ site }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  const projects = await getCollection('projects', ({ data }) => data.status === 'published' && data.locale === 'uk');
  const fileUrls=Object.keys(pages).filter(path=>!excludedLocales.test(path)&&!excludedRuStubs.test(path)&&!path.includes('[')&&!path.includes('/404.astro')&&!path.includes('/ui-kit/')&&!path.includes('/project-print/')&&!path.includes('/proposal.astro')&&!path.includes('/thank-you.astro')&&!path.includes('/projects/')).map(path=>path.replace(/^\.\//,'/').replace(/index\.astro$/, '').replace(/\.astro$/, '/'));
  const projectUrls = ['/projects/', ...projects.map(({ data }) => `/projects/${data.slug}/`)];
  const urls=[...new Set([...fileUrls,...projectUrls])].sort();
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path=>`\n  <url><loc>${origin}${path}</loc><changefreq>${path==='/'?'weekly':'monthly'}</changefreq><priority>${path==='/'?'1.0':'0.7'}</priority></url>`).join('')}\n</urlset>`;
  return new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600'}});
};
