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

// Count-only checks can mistake a leaked homepage trail for the route's trail.
// Check visible names, positions and canonical item URLs after hydration.
for (const route of ["/faq", "/pets", "/pets/arthritis-in-dogs", "/pets/arthritis-in-cats", "/pets/arthritis-in-horses", "/pets/arthritis-in-llamas-and-alpacas", "/pets/senior-pet-exercise-guide", "/pets/pet-weight-and-joint-health", "/pets/home-adaptations-for-arthritic-pets", "/pets/when-to-see-the-vet-pet-arthritis"]) {
  test(`breadcrumb matches visible route at ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("#breadcrumb-jsonld")).toHaveCount(1);
    const state = await page.evaluate(() => {
      const trails: Array<{ itemListElement: Array<{ position: number; name: string; item: string }> }> = [];
      const walk = (x: unknown) => {
        if (Array.isArray(x)) return x.forEach(walk);
        if (!x || typeof x !== "object") return;
        const node = x as Record<string, unknown>;
        if ([node["@type"]].flat().includes("BreadcrumbList")) trails.push(node as typeof trails[number]);
        Object.values(node).forEach(walk);
      };
      document.querySelectorAll('script[type="application/ld+json"]').forEach(s => walk(JSON.parse(s.textContent || "{}")));
      const visible = [...document.querySelectorAll('nav[aria-label="breadcrumb"] li')].map(e => e.textContent?.trim()).filter(Boolean);
      return { trails, visible, path: location.pathname.replace(/\/$/, "") };
    });
    expect(state.trails).toHaveLength(1);
    const items = state.trails[0].itemListElement;
    expect(items.map(i => i.name)).toEqual(state.visible);
    expect(items.map(i => i.position)).toEqual(items.map((_, i) => i + 1));
    expect(items.at(-1)?.item).toBe(`https://livingwitharthritis.org.uk${state.path}`);
    expect(items[0].item).toBe("https://livingwitharthritis.org.uk/");
    if (route.startsWith("/pets/")) expect(items[1]).toMatchObject({ name: "Pets", item: "https://livingwitharthritis.org.uk/pets" });
  });
}
