// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alertjet.fr',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 1
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
