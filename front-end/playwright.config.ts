import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  outputDir: '/app/test-results',
  reporter: [['html', { open: 'always' }]],
  workers: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    launchOptions: {
      slowMo: 1000,
    }
  },
  timeout: 4500,
};

export default config;
