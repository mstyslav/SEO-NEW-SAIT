import { defineConfig } from 'astro/config';
import homepageCriticalCss from './astro-integrations/homepage-critical-css.mjs';

export default defineConfig({
  site: 'https://space-glass.com.ua',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [homepageCriticalCss()]
});
