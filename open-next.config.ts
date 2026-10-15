import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Pages are prerendered at build time; this site does not use ISR or revalidation.
export default defineCloudflareConfig();
