import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rao21.github.io',
  base: '/raonoman',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
