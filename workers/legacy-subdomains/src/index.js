// legacy-subdomains — page-level 301s from the old Tilda/WordPress subdomains to space-glass.com.ua.
//
// Hosts: dyshovi. (RU shower catalog, Tilda), ua. (UA shower catalog, Tilda), vikna. (aluminium landing,
// WordPress). Source of truth: seo-audit legacy-subdomains-mapping-2026-09-30.csv → src/mapping.json.
//  - mapped URL        → 301 to the final https main-domain URL (query dropped, one hop)
//  - removed legacy URL → 410 (no equivalent: thank-you, calculator, WP junk, /kiev)
//  - any other path    → 404 (never the homepage)
// robots.txt allows crawling (so Google sees the 301s) and no longer lists a sitemap; old sitemaps are 410.
import mapping from './mapping.json';

const HOSTS = new Set(['dyshovi.space-glass.com.ua', 'ua.space-glass.com.ua', 'vikna.space-glass.com.ua']);
const REDIRECTS = new Map(Object.entries(mapping.redirects));
const GONE = new Set(mapping.gone);
const SITEMAP = /^\/(?:sitemap(?:_index)?\.xml|wp-sitemap\.xml|[a-z0-9_-]+-sitemap\d*\.xml)$/;

// Same normalization as the mapping builder: percent-decoded, NFC, lower case, no trailing slash (except "/").
export function normalizePath(pathname) {
  let path = pathname;
  try { path = decodeURIComponent(pathname); } catch { /* malformed escape: keep raw, it will simply not match */ }
  path = path.normalize('NFC').toLowerCase();
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

const text = (status, body, extra = {}) =>
  new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=3600', ...extra } });

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    if (!HOSTS.has(host)) return fetch(request); // never touch any other host
    const path = normalizePath(url.pathname);

    if (path === '/robots.txt') return text(200, 'User-agent: *\nAllow: /\n', { 'x-robots-tag': 'noindex' });
    if (SITEMAP.test(path)) return text(410, 'Gone');

    const target = REDIRECTS.get(host + path);
    if (target) return new Response(null, { status: 301, headers: { location: target, 'cache-control': 'public, max-age=86400' } });
    if (GONE.has(host + path)) return text(410, 'Gone');
    return text(404, 'Not found');
  }
};
