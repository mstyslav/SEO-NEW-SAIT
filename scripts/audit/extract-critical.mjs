// Generates src/styles/critical/selectors.json — per page template, the CSS selectors needed
// to render the first 1.5 screens. Used at build time by astro-integrations/template-critical-css.mjs,
// which filters the CURRENT generated CSS by these selectors, so declarations never go stale.
// Re-run after changing markup/classes near the top of pages (header, breadcrumbs, hero, …);
// the build warns when listed selectors disappear from the CSS.
//
//   CRITICAL_CSS=off npm run build && node scripts/audit/serve-dist.mjs &
//   node scripts/audit/extract-critical.mjs            (needs puppeteer-core, see crawl.mjs)
//   npm run build                                       (normal build applies the new list)
//
// Pages are grouped by template = stylesheet set in document order ("BaseLayout+knowledge").
// Pages with hand-made critical CSS (data-*-critical markers) are skipped.
// A rule is critical when its selector (minus :hover/:focus/… and pseudo-elements) matches an
// element within the first 1.5 viewports, or an element that is not rendered at all (so things
// hidden by CSS — menus, drawers, modals — stay hidden before the full CSS arrives) or one of
// its ancestors (so positioned descendants keep their containing block).
import fs from 'node:fs';
import path from 'node:path';

let puppeteer;
try { puppeteer = (await import('puppeteer-core')).default; }
catch { console.error('puppeteer-core is not installed: npm i --no-save puppeteer-core'); process.exit(2); }

const base = process.env.BASE || 'http://localhost:4499';
const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920];
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = path.join('src', 'styles', 'critical', 'selectors.json');

const LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const sheetName = (href) => href.match(/\/_astro\/([A-Za-z0-9_-]+?)\.[A-Za-z0-9_-]+\.css$/)?.[1];
const xml = fs.readFileSync(path.join('dist', 'sitemap.xml'), 'utf8');
const templates = {};
for (const p of [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1])) {
  const html = fs.readFileSync(path.join('dist', p, 'index.html'), 'utf8');
  if (/data-[a-z-]*critical/.test(html)) continue;
  const names = [...html.matchAll(LINK_RE)].map((m) => sheetName(m[1]));
  if (!names.length || names.includes(undefined)) continue;
  (templates[names.join('+')] ??= []).push(p);
}
const total = Object.values(templates).flat().length;
if (!total) { console.error('No pages found — build with CRITICAL_CSS=off first.'); process.exit(1); }
console.error(`${total} pages in ${Object.keys(templates).length} templates × ${widths.length} widths`);

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ['--no-sandbox'] });
const found = {};
const queue = Object.entries(templates).flatMap(([tpl, pages]) => pages.flatMap((p) => widths.map((w) => [tpl, p, w])));
let done = 0;

await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const [tpl, p, width] = queue.shift();
    const page = await browser.newPage();
    await page.setViewport({ width, height: width < 768 ? 812 : 900, isMobile: width < 768, hasTouch: width < 768 });
    await page.goto(base + p, { waitUntil: 'load' });
    const result = await page.evaluate(() => {
      // 1.5 screens: covers taller real screens (e.g. 1350×940, 412×915) and what sits just below the fold.
      const vh = innerHeight * 1.5;
      const critical = new Set();
      for (const el of document.querySelectorAll('*')) {
        const rects = el.getClientRects();
        if (!rects.length) {
          // Not rendered: keep its rules so it stays hidden, and its ancestors' rules so that
          // positioned children (badges, overlays) keep their containing block at any width.
          for (let a = el; a && !critical.has(a); a = a.parentElement) critical.add(a);
          continue;
        }
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) critical.add(el);
      }
      const strip = (s) => s
        .replace(/::?(before|after|first-line|first-letter|marker|placeholder|selection|backdrop|-webkit-[a-z-]+|-moz-[a-z-]+)/g, '')
        .replace(/:(hover|focus|focus-visible|focus-within|active|visited|link)\b/g, '')
        .trim() || '*';
      const hit = {};
      const walk = (rules, name) => {
        for (const rule of rules) {
          if (rule.cssRules && !(rule instanceof CSSStyleRule)) { walk(rule.cssRules, name); continue; }
          if (!(rule instanceof CSSStyleRule)) continue;
          for (const part of rule.selectorText.split(/,(?![^(]*\))/)) {
            let match = false;
            try { match = [...document.querySelectorAll(strip(part))].some((el) => critical.has(el)); }
            catch { match = true; } // selector the engine cannot query: keep it (conservative)
            if (match) (hit[name] ??= []).push(part.trim());
          }
        }
      };
      for (const sheet of document.styleSheets) {
        const name = sheet.href?.match(/\/_astro\/([A-Za-z0-9_-]+?)\.[A-Za-z0-9_-]+\.css$/)?.[1];
        if (name) walk(sheet.cssRules, name);
      }
      return hit;
    });
    for (const [name, list] of Object.entries(result)) for (const s of list) ((found[tpl] ??= {})[name] ??= new Set()).add(s);
    await page.close();
    if (++done % 200 === 0) console.error(`… ${done}`);
  }
}));
await browser.close();

fs.mkdirSync(path.dirname(out), { recursive: true });
const json = {
  generated: new Date().toISOString().slice(0, 10),
  widths,
  templates: Object.fromEntries(Object.keys(found).sort().map((tpl) => [tpl, {
    pages: templates[tpl].length,
    selectors: Object.fromEntries(Object.entries(found[tpl]).sort().map(([k, v]) => [k, [...v].sort()]))
  }]))
};
fs.writeFileSync(out, JSON.stringify(json, null, 1) + '\n');
console.log(`Wrote ${out}:`);
for (const [tpl, t] of Object.entries(json.templates)) console.log(`  ${tpl} (${t.pages} pages): ${Object.entries(t.selectors).map(([k, v]) => `${k} ${v.length}`).join(', ')}`);
