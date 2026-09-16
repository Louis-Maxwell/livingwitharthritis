import { test, expect } from "@playwright/test";
import frailtyBatch from "../src/content/blog/frailty-batch.json" with { type: "json" };

const FRAILTY_SLUG =
  (frailtyBatch as Array<{ slug?: string; is_published?: boolean }>).find(
    (a) => a?.slug && a.is_published !== false,
  )?.slug ?? "knee-osteoarthritis-frailty-staying-steady-home-uk";

const ROUTES = [
  "/blog",
  "/blog/vitamin-d-arthritis-uk",
  `/blog/${FRAILTY_SLUG}`,
];

test.describe("Blog smoke (must fail CI)", () => {
  for (const route of ROUTES) {
    test(`${route} shows an h1 and does not crash`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(String(err)));

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok() || response?.status() === 304).toBeTruthy();

      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
      const h1 = (await page.locator("h1").first().textContent()) ?? "";
      expect(h1.trim().length).toBeGreaterThan(3);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
