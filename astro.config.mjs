import { defineConfig } from 'astro/config';
import homepageCriticalCss from './astro-integrations/homepage-critical-css.mjs';
import aboutCriticalCss from './astro-integrations/about-critical-css.mjs';
import poslugyCriticalCss from './astro-integrations/poslugy-critical-css.mjs';

export default defineConfig({
  site: 'https://space-glass.com.ua',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [homepageCriticalCss(), aboutCriticalCss(), poslugyCriticalCss()]
});
