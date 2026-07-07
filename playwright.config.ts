import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1920, height: 1080 },
  },
  webServer: {
    command: 'npx vite --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})
