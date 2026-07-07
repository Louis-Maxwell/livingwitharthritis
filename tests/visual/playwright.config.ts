import { defineConfig } from "@playwright/test";

/**
 * Playwright config for the visual/E2E specs under tests/visual/.
 *
 * The primary `playwright.config.ts` at the repo root uses
 * `testDir: "./e2e"` for the auth/appointments/donations flow specs,
 * so a separate config is needed to run the tests/visual/ specs which
 * cover the marketing landing page (Contact section, header dropdowns,
 * etc.). CI (`.github/workflows/tests.yml`) points at these tests via
 * `bunx playwright test --config=tests/visual/playwright.config.ts`.
 */
export default defineConfig({
  testDir: ".",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  timeout: 60_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { viewport: { width: 1280, height: 900 } },
    },
  ],
});
