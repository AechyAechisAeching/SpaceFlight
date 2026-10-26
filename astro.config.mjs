// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    domains: [

      'thespacedevs-prod.nyc3.digitaloceanspaces.com',
      'thespacedevs-dev.nyc3.digitaloceanspaces.com',
      'spaceflightnewsapi.net',
    ],
  },
});
