import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
const pages = import.meta.glob('./**/*.astro');
// uk/* pages are non-canonical duplicates of the unprefixed root pages (their own
// canonical tag points at the unprefixed URL), so they must not be submitted separately.
const excludedLocales = /^\.\/(en|de|uk)(?:\/|$)/;
// These ru/* pages redirect straight back to the unprefixed (uk) URL and never render real
// Russian content, so they must not be submitted to search engines as indexable RU pages.
// ru/catalog, ru/projects and ru/poslugy are NOT in this list: all three render real,
// locale-branched content on the same shared template as their uk counterpart and must be
// indexed as real RU pages. ru/services no longer exists as a page at all (deleted, not a
// redirect), so it needs no exclusion entry here.
const excludedRuStubs = /^\.\/ru\/(about|cart|compare|quote)(?:\/|$)/;
// ru/catalog/piddon is a separate, still-a-redirect-stub page nested under the now-real
// ru/catalog/ hub, so it needs its own exact-path exclusion instead of matching on "catalog".
const excludedRuNestedStub = /^\.\/ru\/catalog\/piddon\/index\.astro$/;
export const GET: APIRoute = async ({ site }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  const projects = await getCollection('projects', ({ data }) => data.status === 'published' && data.locale === 'uk');
  // Only the /projects/{slug}/ static override (e.g. ./projects/loft-kyiv/index.astro) is
  // excluded here — it's already covered by projectUrls below. This must NOT match
  // ./ru/projects/index.astro, which is the real RU projects hub and belongs in fileUrls.
  const excludedProjectOverride = /^\.\/projects\//;
  const fileUrls=Object.keys(pages).filter(path=>!excludedLocales.test(path)&&!excludedRuStubs.test(path)&&!excludedRuNestedStub.test(path)&&!path.includes('[')&&!path.includes('/404.astro')&&!path.includes('/ui-kit/')&&!path.includes('/project-print/')&&!path.includes('/proposal.astro')&&!path.includes('/thank-you.astro')&&!excludedProjectOverride.test(path)).map(path=>path.replace(/^\.\//,'/').replace(/index\.astro$/, '').replace(/\.astro$/, '/'));
  const projectUrls = ['/projects/', ...projects.map(({ data }) => `/projects/${data.slug}/`)];
  const urls=[...new Set([...fileUrls,...projectUrls])].sort();
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path=>`\n  <url><loc>${origin}${path}</loc><changefreq>${path==='/'?'weekly':'monthly'}</changefreq><priority>${path==='/'?'1.0':'0.7'}</priority></url>`).join('')}\n</urlset>`;
  return new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600'}});
};
