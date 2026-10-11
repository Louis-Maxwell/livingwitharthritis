import { test, expect } from "@playwright/test";

// Representative templates, not a claim that every content page is certified.
// The same guards run at every requested enterprise-audit viewport.
const widths = [320, 375, 768, 1024, 1440] as const;
const routes = ["/", "/guides", "/blog/archive", "/blog/pip-for-arthritis-uk", "/conditions/osteoarthritis", "/search", "/contact"] as const;

for (const width of widths) {
  test.describe(`core route layout at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of routes) {
      test(`${route} renders without horizontal overflow or uncaught JavaScript errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.ok(), `HTTP response for ${route}`).toBe(true);
        await expect(page.locator("#root main").first()).toBeVisible();
        await expect(page.locator("#root h1").first()).toBeVisible();
        await expect.poll(() => page.evaluate(() => {
          return document.documentElement.scrollWidth - document.documentElement.clientWidth;
        })).toBeLessThanOrEqual(1);
        expect(errors, `Uncaught errors on ${route}`).toEqual([]);
      });
    }
  });
}
