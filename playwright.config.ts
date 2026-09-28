import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: 'http://localhost:4322/raonoman/',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  // Reduced motion by default so the boot overlay never blocks clicks; hero.spec.ts opts back in.
  use: { baseURL: 'http://localhost:4322/raonoman/', reducedMotion: 'reduce' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 } } },
  ],
});
