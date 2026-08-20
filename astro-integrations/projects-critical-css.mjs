import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-projects-common-critical';
const TARGET_PAGE = 'projects/index.html';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const criticalCssPath = fileURLToPath(
  new URL('../src/styles/projects-common-critical.css', import.meta.url)
);

export default function projectsCriticalCss() {
  return {
    name: 'projects-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const pagePath = path.join(outDir, TARGET_PAGE);

        if (!fs.existsSync(pagePath)) {
          throw new Error(`Projects CSS transform aborted: ${pagePath} not found after build.`);
        }

        let html = fs.readFileSync(pagePath, 'utf8');
        if (html.includes(MARKER)) return;

        const baseLayoutLink = [...html.matchAll(STYLESHEET_LINK_RE)].find(
          (match) => /\/_astro\/BaseLayout\.[^"]+\.css$/.test(match[1])
        );
        if (!baseLayoutLink) {
          throw new Error('Projects CSS transform aborted: generated BaseLayout stylesheet link not found.');
        }

        const criticalCss = fs.readFileSync(criticalCssPath, 'utf8').trim();
        if (
          !criticalCss.includes('.sg-page-shell') ||
          !criticalCss.includes('.sg-mobile-toggle') ||
          !criticalCss.includes('body .sg-page-shell main h1')
        ) {
          throw new Error('Projects CSS transform aborted: common critical stylesheet failed safety checks.');
        }

        const baseLayoutHref = baseLayoutLink[1];
        const replacement =
          `<style ${MARKER}>${criticalCss}</style>` +
          `<link rel="preload" as="style" href="${baseLayoutHref}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${baseLayoutHref}"></noscript>`;

        html = html.replace(baseLayoutLink[0], replacement);
        fs.writeFileSync(pagePath, html);
      }
    }
  };
}
