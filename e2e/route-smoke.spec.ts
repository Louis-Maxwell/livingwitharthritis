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

/**
 * Stale-deploy recovery: simulate a chunk that vanished after a publish (first
 * request 404s, as it would with an old index.html) and assert the page
 * recovers with one reload instead of going blank.
 */
test("recovers from a missing lazy route chunk after a deploy", async ({ page }) => {
  // Fail the first document's attempts (initial import + in-page retries) so
  // the one-time recovery reload is exercised, then serve normally.
  let failures = 0;
  let reloaded = false;
  page.on("request", (request) => {
    if (request.isNavigationRequest() && new URL(request.url()).searchParams.has("_r")) reloaded = true;
  });
  await page.route(/\/assets\/FAQ-[\w-]+\.js$/, async (route) => {
    if (!reloaded) {
      failures += 1;
      await route.fulfill({ status: 404, contentType: "text/html", body: "<!doctype html><title>404</title>" });
      return;
    }
    await route.continue();
  });

  await page.goto("/faq", { waitUntil: "domcontentloaded" });
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 20000 });
  expect(failures).toBeGreaterThan(0);
  expect(reloaded).toBe(true);
  // Cache-busting param from the recovery reload is stripped again.
  await expect.poll(() => new URL(page.url()).searchParams.has("_r")).toBe(false);
});
