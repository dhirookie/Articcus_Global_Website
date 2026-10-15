import { defineConfig } from '@playwright/test';
import config from './playwright.config';

// Run the existing browser checks against workerd rather than the Node server.
export default defineConfig({
  ...config,
  webServer: {
    command: 'npm run preview:cloudflare -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 120000,
  },
});
