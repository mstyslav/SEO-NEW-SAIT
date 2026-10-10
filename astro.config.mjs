import { defineConfig } from 'astro/config';
import heroMidWidth from './astro-integrations/hero-mid-width.mjs';
import heroAvif from './astro-integrations/hero-avif.mjs';
import templateCriticalCss from './astro-integrations/template-critical-css.mjs';
import localized404 from './astro-integrations/localized-404.mjs';

export default defineConfig({
  site: 'https://space-glass.com.ua',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  // templateCriticalCss inlines generated first-screen CSS on every page template
  // (replaces the former hand-written homepage/about/poslugy/contacts/projects/rishennya/
  // catalog/knowledge critical-CSS files, which had drifted from the real CSS).
  // localized404 moves /ru/404/index.html to /ru/404.html and must stay last.
  integrations: [heroMidWidth(), heroAvif(), templateCriticalCss(), localized404()]
});
