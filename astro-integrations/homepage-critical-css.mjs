import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Defers render-blocking CSS on selected pages by inlining a small, manually
// verified critical subset and loading the full generated stylesheets via
// preload+onload instead of a blocking <link rel="stylesheet">. Runs once,
// after Astro has finished writing dist/, and touches only the listed pages —
// every other generated page is left byte-for-byte as Astro produced it.
//
// The stylesheet URLs are never guessed or hardcoded: this hook reads them
// straight out of the already-built HTML, so it stays correct across
// content-hash changes without knowing anything about Astro's chunking
// internals.

const CRITICAL_CSS_SOURCE = path.join('src', 'styles', 'homepage-critical.css');
const MARKER = 'data-homepage-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;

// Pages this transform is allowed to touch, relative to dist/.
const TARGET_PAGES = ['index.html', 'about/index.html'];

function deferStylesheet(href) {
  return (
    `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"></noscript>`
  );
}

export default function homepageCriticalCss() {
  return {
    name: 'homepage-critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        if (!fs.existsSync(CRITICAL_CSS_SOURCE)) {
          throw new Error(
            `Homepage CSS defer transform aborted: critical CSS source ${CRITICAL_CSS_SOURCE} not found.`
          );
        }
        const criticalCss = fs.readFileSync(CRITICAL_CSS_SOURCE, 'utf8').trim();
        if (!criticalCss) {
          throw new Error(
            `Homepage CSS defer transform aborted: critical CSS source ${CRITICAL_CSS_SOURCE} is empty.`
          );
        }
        const styleTag = `<style ${MARKER}>${criticalCss}</style>`;

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `Homepage CSS defer transform aborted: ${pagePath} was not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) {
            continue;
          }

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];
          if (matches.length !== 2) {
            throw new Error(
              `Homepage CSS defer transform aborted: expected 2 generated stylesheet links ` +
              `in ${pagePath}, found ${matches.length}. Refusing to guess — investigate this ` +
              `page's CSS import structure before re-running the build.`
            );
          }

          const firstLinkIndex = html.indexOf(matches[0][0]);
          html = html.slice(0, firstLinkIndex) + styleTag + html.slice(firstLinkIndex);

          html = html.replace(STYLESHEET_LINK_RE, (full, href) => deferStylesheet(href));

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
