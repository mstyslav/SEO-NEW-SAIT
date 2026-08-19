import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'data-contacts-critical';
const STYLESHEET_LINK_RE = /<link rel="stylesheet" href="([^"]+)">/g;
const TARGET_PAGES = ['contacts/index.html'];

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

          if (!contactsLink) {
            throw new Error(
              'Contacts CSS transform aborted: generated contacts stylesheet link not found.'
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

          if (
            !generatedContactsCss.includes('.contacts-page') ||
            !generatedContactsCss.includes('.contacts-hero') ||
            !generatedContactsCss.includes('.contacts-office-map')
          ) {
            throw new Error(
              'Contacts CSS transform aborted: generated contacts stylesheet failed safety checks.'
            );
          }

          /*
           * Replace ONLY the generated contacts stylesheet.
           * BaseLayout and all other stylesheets remain untouched.
           */
          const inlineTag =
            `<style ${MARKER}>${generatedContactsCss}</style>`;

          html = html.replace(contactsLink[0], inlineTag);

          fs.writeFileSync(pagePath, html);
        }
      }
    }
  };
}
