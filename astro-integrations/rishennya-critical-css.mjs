import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CRITICAL_CSS_SOURCE = path.join('src', 'styles', 'rishennya-critical.css');
const MARKER = 'data-rishennya-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;

const TARGET_PAGES = ['rishennya/index.html'];

export default function rishennyaCriticalCss() {
  return {
    name: 'rishennya-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        if (!fs.existsSync(CRITICAL_CSS_SOURCE)) {
          throw new Error(`Rishennya critical CSS not found: ${CRITICAL_CSS_SOURCE}`);
        }

        const criticalCss = fs.readFileSync(CRITICAL_CSS_SOURCE, 'utf8').trim();

        if (!criticalCss) {
          throw new Error('Rishennya critical CSS is empty.');
        }

        const styleTag = `<style ${MARKER}>${criticalCss}</style>`;

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(`Rishennya page not found after build: ${pagePath}`);
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) continue;

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          if (matches.length !== 2) {
            throw new Error(
              `Rishennya CSS transform expected 2 stylesheet links, found ${matches.length}.`
            );
          }

          const firstLinkIndex = html.indexOf(matches[0][0]);

          html =
            html.slice(0, firstLinkIndex) +
            styleTag +
            html.slice(firstLinkIndex);

          const stylesheetHrefs = matches.map((match) => match[1]);

          for (const href of stylesheetHrefs) {
            const originalLink = `<link rel="stylesheet" href="${href}">`;
            const replacement =
              `<link rel="stylesheet" href="${href}" media="(min-width: 761px)">` +
              `<link rel="preload" as="style" href="${href}" media="(max-width: 760px)" ` +
              `onload="this.onload=null;this.rel='stylesheet'">` +
              `<noscript><link rel="stylesheet" href="${href}"></noscript>`;

            html = html.replace(originalLink, replacement);
          }

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
