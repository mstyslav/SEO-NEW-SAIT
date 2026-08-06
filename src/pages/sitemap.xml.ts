import type { APIRoute } from 'astro';
const pages = import.meta.glob('./**/*.astro');
const excludedLocales = /^\.\/(en|de)(?:\/|$)/;
export const GET: APIRoute = ({ site }) => {
  const origin=(site ?? new URL('https://space-glass.com.ua')).origin;
  const urls=Object.keys(pages).filter(path=>!excludedLocales.test(path)&&!path.includes('/404.astro')&&!path.includes('/ui-kit/')&&!path.includes('/project-print/')&&!path.includes('/proposal.astro')&&!path.includes('/thank-you.astro')).map(path=>path.replace(/^\.\//,'/').replace(/index\.astro$/, '').replace(/\.astro$/, '/')).sort();
  const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path=>`\n  <url><loc>${origin}${path}</loc><changefreq>${path==='/'?'weekly':'monthly'}</changefreq><priority>${path==='/'?'1.0':'0.7'}</priority></url>`).join('')}\n</urlset>`;
  return new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=3600'}});
};
