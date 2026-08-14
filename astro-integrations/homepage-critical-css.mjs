import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Defers homepage (/) render-blocking CSS by inlining a small, manually
// verified critical subset and loading the full generated stylesheets via
// preload+onload instead of a blocking <link rel="stylesheet">. Runs once,
// after Astro has finished writing dist/, and touches dist/index.html only —
// every other generated page is left byte-for-byte as Astro produced it.
//
// The stylesheet URLs are never guessed or hardcoded: this hook reads them
// straight out of the already-built dist/index.html, so it stays correct
// across content-hash changes without knowing anything about Astro's
// chunking internals.

const CRITICAL_CSS_SOURCE = path.join('src', 'styles', 'homepage-critical.css');
const MARKER = 'data-homepage-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;

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
        const indexPath = path.join(outDir, 'index.html');

        if (!fs.existsSync(indexPath)) {
          throw new Error(
            `Homepage CSS defer transform aborted: ${indexPath} was not found after build.`
          );
        }

        let html = fs.readFileSync(indexPath, 'utf8');

        if (html.includes(MARKER)) {
          // Already transformed (e.g. a second integration hook run in this
          // process) — do nothing rather than double-wrap the links.
          return;
        }

        const matches = [...html.matchAll(STYLESHEET_LINK_RE)];
        if (matches.length !== 2) {
          throw new Error(
            `Homepage CSS defer transform aborted: expected 2 generated stylesheet links ` +
            `in ${indexPath}, found ${matches.length}. Refusing to guess — investigate the ` +
            `homepage's CSS import structure before re-running the build.`
          );
        }

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

        // Insert the critical CSS immediately before the first stylesheet
        // link, then replace every stylesheet link (in place, same order,
        // same URLs) with its deferred preload+noscript form.
        const firstLinkIndex = html.indexOf(matches[0][0]);
        html = html.slice(0, firstLinkIndex) + styleTag + html.slice(firstLinkIndex);

        html = html.replace(STYLESHEET_LINK_RE, (full, href) => deferStylesheet(href));

        fs.writeFileSync(indexPath, html);
      }
    }
  };
}
