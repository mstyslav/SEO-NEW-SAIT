import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Adds an 800w candidate to every srcset / imagesrcset that jumps from 480w straight to 900w,
// but only where the matching `-800.webp` file really exists in dist/ (the hero images).
// Phones at 360–412 CSS px with DPR ~1.75–2 need 630–824 px; without this candidate they
// download the 900w file (≈25 KB more per hero on average), which delays mobile LCP.
// Runs after the build, never guesses: a candidate is only added when the file is on disk.

const CANDIDATE_RE = /((?:\/[^\s,"]+?))-900\.webp 900w/g;

export default function heroMidWidth() {
  return {
    name: 'hero-mid-width',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const exists = new Map();
        const has800 = (base) => {
          if (!exists.has(base)) exists.set(base, fs.existsSync(path.join(outDir, decodeURIComponent(`${base}-800.webp`))));
          return exists.get(base);
        };
        const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);

        let pages = 0;
        for (const file of walk(outDir)) {
          const html = fs.readFileSync(file, 'utf8');
          if (!html.includes('-900.webp 900w')) continue;
          const next = html.replace(/(\s(?:srcset|imagesrcset)=")([^"]*)"/g, (full, attr, value) => {
            if (value.includes(' 800w')) return full;
            const updated = value.replace(CANDIDATE_RE, (m, base) => has800(base) ? `${base}-800.webp 800w, ${m}` : m);
            return `${attr}${updated}"`;
          });
          if (next !== html) { fs.writeFileSync(file, next); pages++; }
        }
        console.log(`[hero-mid-width] 800w candidate added on ${pages} pages`);
      }
    }
  };
}
