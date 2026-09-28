import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Serves the LCP/hero image as AVIF (~40–50% fewer bytes than the WebP at equal visual quality)
// to browsers that support it, WebP to the rest. For the page's <img fetchpriority="high">:
//  • inside <picture>: an AVIF <source> is inserted before every existing <source> and before
//    the <img> (same media/sizes), so the first matching source is always the AVIF twin;
//  • a bare <img> is wrapped in <picture style="display:contents"> (no box — layout unchanged);
//  • the head preloads for that image switch to the AVIF set with type="image/avif", so
//    browsers without AVIF skip the preload instead of fetching a file they cannot use.
// A srcset is only switched when EVERY candidate has its .avif twin in dist/ (created by
// scripts/make-hero-avif.mjs), so a missing file can never break an image.

const toAvif = (url) => url.replace(/\.(webp|jpe?g|png)$/i, '.avif');
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

export default function heroAvif() {
  return {
    name: 'hero-avif',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const exists = new Map();
        const has = (url) => {
          if (!exists.has(url)) exists.set(url, url.startsWith('/') && fs.existsSync(path.join(outDir, decodeURIComponent(url))));
          return exists.get(url);
        };
        // "a.webp 480w, b.webp 800w" → AVIF set, or null unless every candidate has a twin
        const avifSet = (set) => {
          if (!set) return null;
          const parts = set.split(',').map((c) => c.trim().split(/\s+/));
          if (!parts.every(([u]) => /\.(webp|jpe?g|png)$/i.test(u) && has(toAvif(u)))) return null;
          return parts.map(([u, d]) => [toAvif(u), d].filter(Boolean).join(' ')).join(', ');
        };
        const source = (srcset, media, sizes) =>
          `<source type="image/avif"${media ? ` media="${media}"` : ''} srcset="${srcset}"${sizes ? ` sizes="${sizes}"` : ''}>`;

        const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);

        let pages = 0;
        for (const file of walk(outDir)) {
          let html = fs.readFileSync(file, 'utf8');
          const img = html.match(/<img\b[^>]*fetchpriority="high"[^>]*>/);
          if (!img || html.includes('type="image/avif"')) continue;
          const imgTag = img[0];
          const imgAvif = avifSet(attr(imgTag, 'srcset') ?? attr(imgTag, 'src'));
          const before = html.slice(0, img.index);
          const picStart = before.lastIndexOf('<picture');
          const inPicture = picStart > before.lastIndexOf('</picture>');
          const switched = new Set(); // webp srcsets actually offered as AVIF — used for the preloads
          let block;

          if (inPicture) {
            block = html.slice(picStart, img.index + imgTag.length);
            block = block.replace(/<source\b[^>]*>/g, (tag) => {
              if (attr(tag, 'type')) return tag;
              const set = attr(tag, 'srcset');
              const av = avifSet(set);
              if (!av) return tag;
              switched.add(set);
              return source(av, attr(tag, 'media'), attr(tag, 'sizes')) + tag;
            });
            if (imgAvif) {
              switched.add(attr(imgTag, 'srcset') ?? attr(imgTag, 'src'));
              block = block.replace(imgTag, source(imgAvif, null, attr(imgTag, 'sizes')) + imgTag);
            }
            if (!switched.size) continue;
            html = html.slice(0, picStart) + block + html.slice(img.index + imgTag.length);
          } else {
            if (!imgAvif) continue;
            switched.add(attr(imgTag, 'srcset') ?? attr(imgTag, 'src'));
            html = html.replace(imgTag, `<picture style="display:contents">${source(imgAvif, null, attr(imgTag, 'sizes'))}${imgTag}</picture>`);
          }

          // Preloads of the same image(s) → AVIF with type, so only AVIF-capable browsers use them.
          html = html.replace(/<link rel="preload" as="image"[^>]*>/g, (tag) => {
            const set = attr(tag, 'imagesrcset');
            const href = attr(tag, 'href');
            const key = [...switched].find((s) => s === set || s === href || (href && s.split(',').some((c) => c.trim().split(/\s+/)[0] === href)));
            if (!key) return tag;
            const av = set ? avifSet(set) : null;
            const avHref = href && has(toAvif(href)) ? toAvif(href) : null;
            if ((set && !av) || (href && !avHref)) return tag;
            let out = tag;
            if (av) out = out.replace(`imagesrcset="${set}"`, `imagesrcset="${av}"`);
            if (avHref) out = out.replace(`href="${href}"`, `href="${avHref}"`);
            return out.replace('<link rel="preload" as="image"', '<link rel="preload" as="image" type="image/avif"');
          });

          fs.writeFileSync(file, html);
          pages++;
        }
        console.log(`[hero-avif] AVIF hero on ${pages} pages`);
      }
    }
  };
}
