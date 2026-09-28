import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Critical CSS for the category template (~120 pages: catalog categories, subcategories,
// business pages — every page whose stylesheets are BaseLayout + category-pages +
// profile-systems [+ rishennya-lower] and that has no hand-made critical CSS).
//
// The first-screen selectors are listed in src/styles/critical/category-selectors.json
// (generated in a real browser by scripts/audit/extract-critical.mjs). At build time the
// CURRENT generated stylesheets are filtered by that list, so declarations never go stale;
// the result is inlined and the full stylesheets load asynchronously, in their original
// document order (cascade unchanged once they arrive; <noscript> keeps the blocking links).
//
// If postcss cannot be loaded or the selector list is missing, pages are left untouched.

const MARKER = 'data-category-critical';
const LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const REQUIRED = ['BaseLayout', 'category-pages', 'profile-systems'];
const ALLOWED = [...REQUIRED, 'rishennya-lower'];
const selectorsPath = fileURLToPath(new URL('../src/styles/critical/category-selectors.json', import.meta.url));
const sheetName = (href) => href.match(/\/_astro\/([A-Za-z0-9_-]+?)\.[A-Za-z0-9_-]+\.css$/)?.[1];

// CSSOM (browser) and minified source spell some selectors differently — compare a canonical form.
export const normalizeSelector = (s) => s
  .replace(/\s*([>+~,])\s*/g, '$1')
  .replace(/\s+/g, ' ')
  .replace(/::?(before|after|first-line|first-letter|marker|placeholder|selection|backdrop)\b/g, '::$1')
  .replace(/\[([^\]=~|^$*]+)([~|^$*]?=)["']([^"']*)["']\]/g, '[$1$2$3]')
  .trim();

// Low priority: the first 1.5 screens are already styled by the inline CSS, so the full sheets
// must not take bandwidth from the hero (LCP) image.
const deferLink = (href) =>
  `<link rel="preload" as="style" href="${href}" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet'">` +
  `<noscript><link rel="stylesheet" href="${href}"></noscript>`;

export default function categoryCriticalCss() {
  return {
    name: 'category-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (process.env.CATEGORY_CRITICAL === 'off') return; // plain build for scripts/audit/extract-critical.mjs
        let postcss;
        try { postcss = (await import('postcss')).default; }
        catch { console.warn('[category-critical-css] postcss not available — pages left unchanged'); return; }
        if (!fs.existsSync(selectorsPath)) { console.warn('[category-critical-css] selector list missing — pages left unchanged'); return; }

        const { selectors } = JSON.parse(fs.readFileSync(selectorsPath, 'utf8'));
        const wanted = Object.fromEntries(Object.entries(selectors).map(([k, list]) => [k, new Set(list.map(normalizeSelector))]));
        const outDir = fileURLToPath(dir);
        const cache = new Map();

        const criticalFor = (href) => {
          if (cache.has(href)) return cache.get(href);
          const name = sheetName(href);
          const root = postcss.parse(fs.readFileSync(path.join(outDir, href.replace(/^\/+/, '')), 'utf8'));
          const keep = wanted[name] ?? new Set();
          const used = new Set();
          root.walkRules((rule) => {
            if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
            const hits = rule.selectors.filter((s) => keep.has(normalizeSelector(s)));
            if (!hits.length) return rule.remove();
            hits.forEach((s) => used.add(normalizeSelector(s)));
          });
          // drop at-rules left empty (nested @media/@supports)
          let removed = true;
          while (removed) { removed = false; root.walkAtRules((at) => { if (at.nodes && at.nodes.length === 0) { at.remove(); removed = true; } }); }
          const missing = [...keep].filter((s) => !used.has(s));
          const css = root.toString().replace(/\n+/g, '');
          cache.set(href, { css, missing });
          return cache.get(href);
        };

        const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);

        let pages = 0;
        const missingAll = new Set();
        for (const file of walk(outDir)) {
          let html = fs.readFileSync(file, 'utf8');
          if (/data-[a-z-]*critical/.test(html)) continue;
          const links = [...html.matchAll(LINK_RE)];
          const names = links.map((m) => sheetName(m[1]));
          if (!REQUIRED.every((n) => names.includes(n)) || !names.every((n) => ALLOWED.includes(n))) continue;

          const critical = links.map((m) => {
            const r = criticalFor(m[1]);
            r.missing.forEach((s) => missingAll.add(`${sheetName(m[1])}: ${s}`));
            return r.css;
          }).join('');
          html = html.replace(links[0][0], `<style ${MARKER}>${critical}</style>${links[0][0]}`);
          for (const m of links) html = html.replace(m[0], deferLink(m[1]));
          fs.writeFileSync(file, html);
          pages++;
        }
        console.log(`[category-critical-css] ${pages} pages, inline ${[...cache.values()].reduce((a, r) => a + r.css.length, 0)} bytes of critical CSS in total per full set`);
        if (missingAll.size) console.warn(`[category-critical-css] ${missingAll.size} listed selectors not found in the current CSS (renamed/removed?) — re-run scripts/audit/extract-critical.mjs:\n  ${[...missingAll].slice(0, 20).join('\n  ')}`);
      }
    }
  };
}
