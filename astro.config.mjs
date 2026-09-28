import { defineConfig } from 'astro/config';
import heroMidWidth from './astro-integrations/hero-mid-width.mjs';
import templateCriticalCss from './astro-integrations/template-critical-css.mjs';

export default defineConfig({
  site: 'https://space-glass.com.ua',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  // templateCriticalCss inlines generated first-screen CSS on every page template
  // (replaces the former hand-written homepage/about/poslugy/contacts/projects/rishennya/
  // catalog/knowledge critical-CSS files, which had drifted from the real CSS).
  integrations: [heroMidWidth(), templateCriticalCss()]
});
