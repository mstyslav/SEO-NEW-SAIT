import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-catalog-common-critical';
const PAGE_MARKER = 'data-catalog-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = ['catalog/index.html', 'ru/catalog/index.html'];
const commonCriticalCssPath = fileURLToPath(
  new URL('../src/styles/catalog-common-critical.css', import.meta.url)
);

export default function catalogCriticalCss() {
  return {
    name: 'catalog-critical-css',

    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `Catalog CSS transform aborted: ${pagePath} not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) {
            continue;
          }

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          const catalogLink = matches.find(
            (match) => /\/_astro\/catalog\.[^"]+\.css$/.test(match[1])
          );
          const baseLayoutLink = matches.find(
            (match) => /\/_astro\/BaseLayout\.[^"]+\.css$/.test(match[1])
          );

          if (!catalogLink || !baseLayoutLink) {
            throw new Error(
              'Catalog CSS transform aborted: expected generated Catalog and BaseLayout stylesheet links.'
            );
          }

          const catalogHref = catalogLink[1];

          const generatedCssPath = path.join(
            outDir,
            catalogHref.replace(/^\/+/, '')
          );

          if (!fs.existsSync(generatedCssPath)) {
            throw new Error(
              `Catalog CSS transform aborted: ${generatedCssPath} not found.`
            );
          }

          const generatedCatalogCss = fs
            .readFileSync(generatedCssPath, 'utf8')
            .trim();
          const commonCriticalCss = fs
            .readFileSync(commonCriticalCssPath, 'utf8')
            .trim();

          if (
            !generatedCatalogCss.includes('.catalog-hub') ||
            !generatedCatalogCss.includes('.catalog-hub__hero') ||
            !generatedCatalogCss.includes('.catalog-hub__hero-media')
          ) {
            throw new Error(
              'Catalog CSS transform aborted: generated catalog stylesheet failed safety checks.'
            );
          }
          if (
            !commonCriticalCss.includes('.sg-page-shell') ||
            !commonCriticalCss.includes('.sg-mobile-toggle') ||
            !commonCriticalCss.includes('body .sg-page-shell main h1')
          ) {
            throw new Error(
              'Catalog CSS transform aborted: common critical stylesheet failed safety checks.'
            );
          }

          /*
           * Replace ONLY the generated catalog stylesheet.
           * BaseLayout and all other stylesheets remain untouched.
           */
          const inlineTag = `<style ${MARKER}>${commonCriticalCss}</style>` +
            `<style ${PAGE_MARKER}>${generatedCatalogCss}</style>`;
          const baseLayoutHref = baseLayoutLink[1];
          const deferredBaseLayout =
            `<link rel="preload" as="style" href="${baseLayoutHref}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${baseLayoutHref}"></noscript>`;

          html = html.replace(catalogLink[0], inlineTag);
          html = html.replace(baseLayoutLink[0], deferredBaseLayout);

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
