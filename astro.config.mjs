// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'thespacedevs-prod.nyc3.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'thespacedevs-dev.nyc3.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'spaceflightnewsapi.net' },
      { protocol: 'https', hostname: 'spaceflightnow.com' },
      { protocol: 'https', hostname: '**.esa.int' },
      { protocol: 'https', hostname: '**.nasa.gov' },
      // Make sure its subdomain otherwise remove the matching subdomains
      // !TODO: Self explanation
      { protocol: 'http', hostname: '**.localhost' },
      { protocol: 'https', hostname: '**.wp.com' },
    ],
  },
});
