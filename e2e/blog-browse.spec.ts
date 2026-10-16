import { test, expect, type Page } from "@playwright/test";

const ARTICLE = "/blog/vitamin-d-arthritis-uk";

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error" && !/favicon|Failed to load resource|googletagmanager|analytics/i.test(m.text())) {
      errors.push(m.text());
    }
  });
  return errors;
}

test.describe("Blog browsing smoke", () => {
  test("index search finds guides and shows a zero-result state", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/blog");
    await expect(page.locator("h1")).toHaveCount(1);
    const search = page.locator("#blog-search");
    await search.fill("vitamin d");
    await expect(page.locator('a[href="/blog/vitamin-d-arthritis-uk"]').first()).toBeVisible();
    await search.fill("zzqqxxnotaword");
    await expect(page.getByText(/No guides found for/i)).toBeVisible();
    await page.getByRole("button", { name: /show all articles/i }).click();
    await expect(search).toHaveValue("");
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("category buttons filter and category pages load", async ({ page }) => {
    await page.goto("/blog");
    const exercise = page.getByRole("group", { name: /filter by category/i }).getByRole("button", { name: /^Exercise/ });
    await exercise.click();
    await expect(exercise).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#all-heading")).toHaveText(/Exercise guides/);
    await page.goto("/blog/category/nutrition");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("sort select offers newest and oldest", async ({ page }) => {
    await page.goto("/blog");
    await page.selectOption("#blog-sort", "oldest");
    await expect(page.locator("#blog-sort")).toHaveValue("oldest");
  });

  test("article renders with one h1, loaded cover and canonical", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(ARTICLE);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute(
      "href",
      "https://livingwitharthritis.org.uk/blog/vitamin-d-arthritis-uk",
    );
    const img = page.locator("main img").first();
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    // Every image has an alt attribute (empty is fine for decorative ones).
    expect(await page.locator("main img:not([alt])").count()).toBe(0);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("PDF download button produces a file", async ({ page }) => {
    await page.goto(ARTICLE);
    const button = page.getByRole("button", { name: /download|pdf/i }).first();
    await expect(button).toBeVisible();
    const [download] = await Promise.all([page.waitForEvent("download", { timeout: 20000 }), button.click()]);
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });

  test("internal article links point at real routes", async ({ page }) => {
    await page.goto(ARTICLE);
    const hrefs = await page.locator('main a[href^="/blog/"]').evaluateAll((as) =>
      [...new Set(as.map((a) => a.getAttribute("href")!))].slice(0, 8),
    );
    for (const href of hrefs) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBeLessThan(400);
    }
  });

  test("mobile layout has no sideways scroll", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    for (const route of ["/blog", ARTICLE]) {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, route).toBeLessThanOrEqual(1);
    }
  });
});
