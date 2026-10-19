import type { APIRoute } from 'astro';
import { sitemapLanguageOf, sitemapLanguages, sitemapPaths, urlsetXml, XML_HEADERS } from '../seo/sitemap-urls';

// One language of /sitemap.xml (uk = unprefixed URLs). Listed in /sitemap-index.xml so Search Console
// can report indexing per language; together the five files hold exactly the URLs of /sitemap.xml.
export const getStaticPaths = () => sitemapLanguages.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = async ({ site, params }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  const urls = (await sitemapPaths()).filter((path) => sitemapLanguageOf(path) === params.lang);
  return new Response(urlsetXml(origin, urls),{headers:XML_HEADERS});
};
