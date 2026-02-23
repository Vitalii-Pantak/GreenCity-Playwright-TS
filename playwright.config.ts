import { defineConfig, devices } from '@playwright/test';
import env from "config/env";

/* Docs
/* See https://playwright.dev/docs/test-configuration
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer   */

export default defineConfig({
  // repeatEach: 10,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  use: {
    baseURL: env.BASE_CLIENT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: process.env.CI ? true : env.HEADLESS,
  },

  projects: [
    {
      name: 'Main Project',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1800, height: 900}
       },       
    },
  ],
});
