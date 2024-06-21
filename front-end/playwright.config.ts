import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  outputDir: './test-results',
  reporter: [['json', { outputFile: './test-results/report.json' }]],
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
  timeout: 120000,
};

export default config;
