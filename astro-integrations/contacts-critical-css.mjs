import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-contacts-critical';
const COMMON_MARKER = 'data-contacts-common-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = ['contacts/index.html', 'ru/contacts/index.html'];
const commonCriticalCssPath = fileURLToPath(
  new URL('../src/styles/contacts-common-critical.css', import.meta.url)
);

export default function contactsCriticalCss() {
  return {
    name: 'contacts-critical-css',

    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);

        for (const relativePath of TARGET_PAGES) {
          const pagePath = path.join(outDir, relativePath);

          if (!fs.existsSync(pagePath)) {
            throw new Error(
              `Contacts CSS transform aborted: ${pagePath} not found after build.`
            );
          }

          let html = fs.readFileSync(pagePath, 'utf8');

          if (html.includes(MARKER)) {
            continue;
          }

          const matches = [...html.matchAll(STYLESHEET_LINK_RE)];

          const contactsLink = matches.find(
            (match) => /\/_astro\/contacts\.[^"]+\.css$/.test(match[1])
          );
          const baseLayoutLink = matches.find(
            (match) => /\/_astro\/BaseLayout\.[^"]+\.css$/.test(match[1])
          );

          if (!contactsLink || !baseLayoutLink) {
            throw new Error(
              'Contacts CSS transform aborted: expected generated Contacts and BaseLayout stylesheet links.'
            );
          }

          const contactsHref = contactsLink[1];

          const generatedCssPath = path.join(
            outDir,
            contactsHref.replace(/^\/+/, '')
          );

          if (!fs.existsSync(generatedCssPath)) {
            throw new Error(
              `Contacts CSS transform aborted: ${generatedCssPath} not found.`
            );
          }

          const generatedContactsCss = fs
            .readFileSync(generatedCssPath, 'utf8')
            .trim();
          const commonCriticalCss = fs
            .readFileSync(commonCriticalCssPath, 'utf8')
            .trim();

          if (
            !generatedContactsCss.includes('.contacts-page') ||
            !generatedContactsCss.includes('.contacts-hero') ||
            !generatedContactsCss.includes('.contacts-office-map')
          ) {
            throw new Error(
              'Contacts CSS transform aborted: generated contacts stylesheet failed safety checks.'
            );
          }
          if (
            !commonCriticalCss.includes('.sg-page-shell') ||
            !commonCriticalCss.includes('.sg-mobile-toggle') ||
            !commonCriticalCss.includes('body .sg-page-shell main h1')
          ) {
            throw new Error(
              'Contacts CSS transform aborted: common critical stylesheet failed safety checks.'
            );
          }

          /*
           * Replace ONLY the generated contacts stylesheet.
           * BaseLayout and all other stylesheets remain untouched.
           */
          const inlineTag = `<style ${COMMON_MARKER}>${commonCriticalCss}</style>` +
            `<style ${MARKER}>${generatedContactsCss}</style>`;
          const baseLayoutHref = baseLayoutLink[1];
          const deferredBaseLayout =
            `<link rel="preload" as="style" href="${baseLayoutHref}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${baseLayoutHref}"></noscript>`;

          html = html.replace(contactsLink[0], inlineTag);
          html = html.replace(baseLayoutLink[0], deferredBaseLayout);

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
