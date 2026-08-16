import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Defers manually verified page-specific critical CSS. Each target has its
// own source and marker; every other generated page is left unchanged.
//
// The stylesheet URLs are never guessed or hardcoded: this hook reads them
// from each already-built target page, so it stays correct across content-hash
// changes without knowing anything about Astro's chunking internals.

const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = [
  {
    output: 'index.html',
    criticalSource: path.join('src', 'styles', 'homepage-critical.css'),
    marker: 'data-homepage-critical',
    label: 'Homepage'
  },
  {
    output: path.join('about', 'index.html'),
    criticalSource: path.join('src', 'styles', 'about-critical.css'),
    marker: 'data-about-critical',
    label: 'About'
  }
];

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

        for (const target of TARGET_PAGES) {
          const pagePath = path.join(outDir, target.output);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `${target.label} CSS defer transform aborted: ${pagePath} was not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(target.marker)) continue;

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];
          if (matches.length !== 2) {
            throw new Error(
              `${target.label} CSS defer transform aborted: expected 2 generated stylesheet links ` +
              `in ${pagePath}, found ${matches.length}. Refusing to guess — investigate the ` +
              `page's CSS import structure before re-running the build.`
            );
          }

          if (!fs.existsSync(target.criticalSource)) {
            throw new Error(
              `${target.label} CSS defer transform aborted: critical CSS source ${target.criticalSource} not found.`
            );
          }
          const criticalCss = fs.readFileSync(target.criticalSource, 'utf8').trim();
          if (!criticalCss) {
            throw new Error(
              `${target.label} CSS defer transform aborted: critical CSS source ${target.criticalSource} is empty.`
            );
          }
          const styleTag = `<style ${target.marker}>${criticalCss}</style>`;

          const firstLinkIndex = html.indexOf(matches[0][0]);
          html = html.slice(0, firstLinkIndex) + styleTag + html.slice(firstLinkIndex);

          html = html.replace(STYLESHEET_LINK_RE, (full, href) => deferStylesheet(href));

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
