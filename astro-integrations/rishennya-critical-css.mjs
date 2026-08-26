import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-rishennya-common-critical';
const PAGE_MARKER = 'data-rishennya-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = ['rishennya/index.html', 'ru/rishennya/index.html'];
const commonCriticalCssPath = fileURLToPath(
  new URL('../src/styles/rishennya-critical.css', import.meta.url)
);

export default function rishennyaCriticalCss() {
  return {
    name: 'rishennya-critical-css',

    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `Rishennya CSS transform aborted: ${pagePath} not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) {
            continue;
          }

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          const rishennyaLink = matches.find(
            (match) => /\/_astro\/RishennyaPage\.[^"]+\.css$/.test(match[1])
          );
          const baseLayoutLink = matches.find(
            (match) => /\/_astro\/BaseLayout\.[^"]+\.css$/.test(match[1])
          );

          if (!rishennyaLink || !baseLayoutLink) {
            throw new Error(
              'Rishennya CSS transform aborted: expected generated Rishennya and BaseLayout stylesheet links.'
            );
          }

          const rishennyaHref = rishennyaLink[1];

          const generatedCssPath = path.join(
            outDir,
            rishennyaHref.replace(/^\/+/, '')
          );

          if (!fs.existsSync(generatedCssPath)) {
            throw new Error(
              `Rishennya CSS transform aborted: ${generatedCssPath} not found.`
            );
          }

          const generatedRishennyaCss = fs
            .readFileSync(generatedCssPath, 'utf8')
            .trim();
          const commonCriticalCss = fs
            .readFileSync(commonCriticalCssPath, 'utf8')
            .trim();

          if (
            !generatedRishennyaCss.includes('.rishennya-hub') ||
            !generatedRishennyaCss.includes('.rishennya-hub__hero') ||
            !generatedRishennyaCss.includes('.rishennya-hub__hero-media')
          ) {
            throw new Error(
              'Rishennya CSS transform aborted: generated rishennya stylesheet failed safety checks.'
            );
          }
          if (
            !commonCriticalCss.includes('.sg-page-shell') ||
            !commonCriticalCss.includes('.sg-mobile-toggle') ||
            !commonCriticalCss.includes('.rishennya-hub__hero h1')
          ) {
            throw new Error(
              'Rishennya CSS transform aborted: common critical stylesheet failed safety checks.'
            );
          }

          /*
           * Replace ONLY the generated rishennya stylesheet.
           * BaseLayout and all other stylesheets remain untouched.
           */
          const inlineTag = `<style ${MARKER}>${commonCriticalCss}</style>` +
            `<style ${PAGE_MARKER}>${generatedRishennyaCss}</style>`;
          const baseLayoutHref = baseLayoutLink[1];
          const deferredBaseLayout =
            `<link rel="preload" as="style" href="${baseLayoutHref}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${baseLayoutHref}"></noscript>`;

          html = html.replace(rishennyaLink[0], inlineTag);
          html = html.replace(baseLayoutLink[0], deferredBaseLayout);

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
