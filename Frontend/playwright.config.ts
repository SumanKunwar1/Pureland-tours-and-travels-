import { defineConfig, devices } from "@playwright/test";

// Dedicated port so the e2e run never reuses an unrelated app on the default dev port (8080)
const PORT = 8181;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "html",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Start the Vite dev server unless tests are pointed at an already deployed site
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Call vite directly: `npm run dev -- --port` loses its flags under PowerShell
        command: `npx vite --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
