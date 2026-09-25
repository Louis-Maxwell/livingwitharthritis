import { test, expect } from "@playwright/test";

/**
 * Route smoke test on the BUILT site (runs in the required
 * "Blog smoke (Playwright, must pass)" job against `serve -s dist`).
 *
 * Key routes must load, render a real <h1>, set a page title and throw no
 * uncaught page errors. Deliberately independent of blog data files so it
 * keeps working when the blog catalog is restructured.
 */
const ROUTES = ["/", "/blog", "/blog/archive", "/faq"];

test.describe("Route smoke (must fail CI)", () => {
  for (const route of ROUTES) {
    test(`${route} renders an h1 and does not crash`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(String(err)));

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok() || response?.status() === 304).toBeTruthy();

      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
      const h1 = (await page.locator("h1").first().textContent()) ?? "";
      expect(h1.trim().length).toBeGreaterThan(3);
      await expect(page).toHaveTitle(/\S{3,}/);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
