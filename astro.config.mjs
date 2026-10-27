// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'thespacedevs-prod.nyc3.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'thespacedevs-dev.nyc3.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'spaceflightnewsapi.net' },
      { protocol: 'https', hostname: '**.nasa.gov' },
    ],
  },
});
