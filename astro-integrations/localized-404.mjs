import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Astro writes only the root 404 page as /404.html; src/pages/ru/404.astro comes out as
// /ru/404/index.html. Cloudflare (assets.not_found_handling = "404-page") answers an unknown
// URL with the nearest file named 404.html, so the RU page has to be /ru/404.html to be used
// for unknown /ru/... URLs. Moves {locale}/404/index.html → {locale}/404.html after the build.
// Must stay the last integration: templateCriticalCss edits the page at its built path.

export default function localized404() {
  return {
    name: 'localized-404',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
          if (!entry.isDirectory()) continue;
          const built = path.join(outDir, entry.name, '404', 'index.html');
          if (!fs.existsSync(built)) continue;
          fs.renameSync(built, path.join(outDir, entry.name, '404.html'));
          fs.rmdirSync(path.dirname(built));
          logger.info(`/${entry.name}/404/index.html → /${entry.name}/404.html`);
        }
      }
    }
  };
}
