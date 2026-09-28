import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Critical CSS for every page template that has no hand-made critical CSS (category pages,
// knowledge articles, project pages, configurators, city hubs, legal pages, …).
//
// A template is identified by its stylesheet set in document order, e.g.
// "BaseLayout+knowledge". For each template src/styles/critical/selectors.json lists the
// selectors needed for the first 1.5 screens (generated in a real browser by
// scripts/audit/extract-critical.mjs over all pages of the template at 8 widths).
// At build time the CURRENT generated stylesheets are filtered by that list, so declarations
// never go stale; the result is inlined and the full stylesheets load asynchronously with low
// priority, in their original document order (cascade unchanged once they arrive;
// <noscript> keeps the blocking links for no-JS visitors).
//
// Pages of a template that is not in the list, and pages with hand-made critical CSS
// (data-*-critical markers from the other integrations), are left untouched. So is everything
// when postcss cannot be loaded or the list is missing. CRITICAL_CSS=off disables the step
// (plain build for the extractor).

const MARKER = 'data-template-critical';
const LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const selectorsPath = fileURLToPath(new URL('../src/styles/critical/selectors.json', import.meta.url));

export const sheetName = (href) => href.match(/\/_astro\/([A-Za-z0-9_-]+?)\.[A-Za-z0-9_-]+\.css$/)?.[1];
export const templateOf = (html) => [...html.matchAll(LINK_RE)].map((m) => sheetName(m[1])).join('+');

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

export default function templateCriticalCss() {
  return {
    name: 'template-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (process.env.CRITICAL_CSS === 'off') return;
        let postcss;
        try { postcss = (await import('postcss')).default; }
        catch { console.warn('[template-critical-css] postcss not available — pages left unchanged'); return; }
        if (!fs.existsSync(selectorsPath)) { console.warn('[template-critical-css] selectors.json missing — pages left unchanged'); return; }

        const { templates } = JSON.parse(fs.readFileSync(selectorsPath, 'utf8'));
        const wanted = Object.fromEntries(Object.entries(templates).map(([tpl, { selectors }]) => [tpl,
          Object.fromEntries(Object.entries(selectors).map(([sheet, list]) => [sheet, new Set(list.map(normalizeSelector))]))]));
        const outDir = fileURLToPath(dir);
        const cache = new Map();
        const usedBySheet = new Map(); // `${tpl}|${sheet}` → selectors found in any file of that name

        const criticalFor = (tpl, href) => {
          const key = `${tpl}|${href}`;
          if (cache.has(key)) return cache.get(key);
          const name = sheetName(href);
          const keep = wanted[tpl][name] ?? new Set();
          const root = postcss.parse(fs.readFileSync(path.join(outDir, href.replace(/^\/+/, '')), 'utf8'));
          const used = new Set();
          root.walkRules((rule) => {
            if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
            const hits = rule.selectors.filter((s) => keep.has(normalizeSelector(s)));
            if (!hits.length) return rule.remove();
            hits.forEach((s) => used.add(normalizeSelector(s)));
          });
          let removed = true; // drop at-rules left empty (nested @media/@supports)
          while (removed) { removed = false; root.walkAtRules((at) => { if (at.nodes && at.nodes.length === 0) { at.remove(); removed = true; } }); }
          const seen = usedBySheet.get(`${tpl}|${name}`) ?? new Set();
          used.forEach((s) => seen.add(s));
          usedBySheet.set(`${tpl}|${name}`, seen);
          const css = root.toString().replace(/\n+/g, '');
          cache.set(key, css);
          return css;
        };

        const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);

        const counts = {};
        for (const file of walk(outDir)) {
          let html = fs.readFileSync(file, 'utf8');
          if (/data-[a-z-]*critical/.test(html)) continue;
          const tpl = templateOf(html);
          if (!wanted[tpl]) continue;
          const links = [...html.matchAll(LINK_RE)];
          const critical = links.map((m) => criticalFor(tpl, m[1])).join('');
          html = html.replace(links[0][0], `<style ${MARKER}>${critical}</style>${links[0][0]}`);
          for (const m of links) html = html.replace(m[0], deferLink(m[1]));
          fs.writeFileSync(file, html);
          counts[tpl] = (counts[tpl] ?? 0) + 1;
        }
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        console.log(`[template-critical-css] ${total} pages: ${Object.entries(counts).map(([t, n]) => `${t} ×${n}`).join(', ')}`);
        // A sheet name can map to several files (e.g. UA and RU scoped styles of one page) —
        // a selector is only "missing" when no file of that name contains it.
        const missingAll = [];
        for (const [key, seen] of usedBySheet) {
          const [tpl, name] = key.split('|');
          for (const s of wanted[tpl][name] ?? []) if (!seen.has(s)) missingAll.push(`${tpl} / ${name}: ${s}`);
        }
        if (missingAll.length) console.warn(`[template-critical-css] ${missingAll.length} listed selectors not found in the current CSS (renamed/removed?) — re-run scripts/audit/extract-critical.mjs:\n  ${missingAll.slice(0, 20).join('\n  ')}`);
      }
    }
  };
}
