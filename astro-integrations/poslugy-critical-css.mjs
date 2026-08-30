import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CRITICAL_CSS_SOURCE = path.join('src', 'styles', 'poslugy-critical.css');
const MARKER = 'data-poslugy-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;

const TARGET_PAGES = ['poslugy/index.html', 'ru/poslugy/index.html'];

export default function poslugyCriticalCss() {
  return {
    name: 'poslugy-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        if (!fs.existsSync(CRITICAL_CSS_SOURCE)) {
          throw new Error(`Poslugy critical CSS not found: ${CRITICAL_CSS_SOURCE}`);
        }

        const criticalCss = fs.readFileSync(CRITICAL_CSS_SOURCE, 'utf8').trim();

        if (!criticalCss) {
          throw new Error('Poslugy critical CSS is empty.');
        }

        const styleTag = `<style ${MARKER}>${criticalCss}</style>`;

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(`Poslugy page not found after build: ${pagePath}`);
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) continue;

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          if (matches.length !== 2) {
            throw new Error(
              `Poslugy CSS transform expected 2 stylesheet links, found ${matches.length}.`
            );
          }

          const firstLinkIndex = html.indexOf(matches[0][0]);

          html =
            html.slice(0, firstLinkIndex) +
            styleTag +
            html.slice(firstLinkIndex);

          html = html.replace(STYLESHEET_LINK_RE, (full, href) => {
            // Defer via preload+onload at every width. The earlier
            // media="(min-width:761px)" / preload media="(max-width:760px)"
            // split left the page with only the inline critical subset when
            // the viewport crossed below 761px AFTER load (resize, device
            // rotation, browser zoom, tablet split-view): the
            // media="(max-width:760px)" preload is not fetched while its media
            // is unmatched, so its onload never fires and rel never flips to
            // "stylesheet" — the full stylesheet then never applies, blowing
            // up icon SVGs and the header. This width-independent form matches
            // the catalog/knowledge/contacts/homepage/projects integrations
            // and always resolves to an applied stylesheet.
            return (
              `<link rel="preload" as="style" href="${href}" ` +
              `onload="this.onload=null;this.rel='stylesheet'">` +
              `<noscript><link rel="stylesheet" href="${href}"></noscript>`
            );
          });

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
