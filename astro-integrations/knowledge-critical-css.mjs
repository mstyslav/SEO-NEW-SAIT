import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-knowledge-common-critical';
const PAGE_MARKER = 'data-knowledge-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = ['knowledge/index.html'];
const commonCriticalCssPath = fileURLToPath(
  new URL('../src/styles/knowledge-common-critical.css', import.meta.url)
);

export default function knowledgeCriticalCss() {
  return {
    name: 'knowledge-critical-css',

    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `Knowledge CSS transform aborted: ${pagePath} not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) {
            continue;
          }

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          const knowledgeLink = matches.find(
            (match) => /\/_astro\/knowledge\.[^"]+\.css$/.test(match[1])
          );
          const baseLayoutLink = matches.find(
            (match) => /\/_astro\/BaseLayout\.[^"]+\.css$/.test(match[1])
          );

          if (!knowledgeLink || !baseLayoutLink) {
            throw new Error(
              'Knowledge CSS transform aborted: expected generated Knowledge and BaseLayout stylesheet links.'
            );
          }

          const knowledgeHref = knowledgeLink[1];

          const generatedCssPath = path.join(
            outDir,
            knowledgeHref.replace(/^\/+/, '')
          );

          if (!fs.existsSync(generatedCssPath)) {
            throw new Error(
              `Knowledge CSS transform aborted: ${generatedCssPath} not found.`
            );
          }

          const generatedKnowledgeCss = fs
            .readFileSync(generatedCssPath, 'utf8')
            .trim();
          const commonCriticalCss = fs
            .readFileSync(commonCriticalCssPath, 'utf8')
            .trim();

          if (
            !generatedKnowledgeCss.includes('.knowledge-v14-hero') ||
            !generatedKnowledgeCss.includes('.knowledge-card') ||
            !generatedKnowledgeCss.includes('.knowledge-library')
          ) {
            throw new Error(
              'Knowledge CSS transform aborted: generated knowledge stylesheet failed safety checks.'
            );
          }
          if (
            !commonCriticalCss.includes('.sg-page-shell') ||
            !commonCriticalCss.includes('.sg-mobile-toggle') ||
            !commonCriticalCss.includes('body .sg-page-shell main h1')
          ) {
            throw new Error(
              'Knowledge CSS transform aborted: common critical stylesheet failed safety checks.'
            );
          }

          /*
           * Replace ONLY the generated knowledge stylesheet.
           * BaseLayout and all other stylesheets remain untouched.
           */
          const inlineTag = `<style ${MARKER}>${commonCriticalCss}</style>` +
            `<style ${PAGE_MARKER}>${generatedKnowledgeCss}</style>`;
          const baseLayoutHref = baseLayoutLink[1];
          const deferredBaseLayout =
            `<link rel="preload" as="style" href="${baseLayoutHref}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${baseLayoutHref}"></noscript>`;

          html = html.replace(knowledgeLink[0], inlineTag);
          html = html.replace(baseLayoutLink[0], deferredBaseLayout);

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
