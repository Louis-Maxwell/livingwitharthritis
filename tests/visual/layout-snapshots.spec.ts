import { test, expect, type Page } from "@playwright/test";

/**
 * Layout regression alerts.
 *
 * Guards the sections most exposed to CSS utility edits. Two kinds of
 * assertion:
 *   1. Structural — no horizontal overflow at mobile or desktop width.
 *      This catches "the layout broke" without needing baseline images.
 *   2. Visual — element screenshots with a small pixel tolerance, so a
 *      genuine layout shift fails but antialiasing noise does not.
 *
 * Run with:
 *   bunx playwright test --config=tests/visual/playwright.config.ts
 * Refresh baselines with `--update-snapshots` after an intentional change.
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

const SECTIONS = [
  { name: "header", selector: "header" },
  { name: "hero", selector: "main section:first-of-type" },
  { name: "footer", selector: "footer" },
] as const;

async function settle(page: Page) {
  // Reveal-on-scroll sections animate in; scroll the page once so every
  // band is painted before screenshots are taken.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

for (const viewport of VIEWPORTS) {
  test.describe(`landing layout — ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("has no horizontal overflow", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await settle(page);

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
        };
      });
      // 1px of tolerance for sub-pixel rounding.
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });

    test("has no element wider than the viewport", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await settle(page);

      const offenders = await page.evaluate((limit) => {
        const bad: string[] = [];
        document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > limit + 2 && rect.height > 0) {
            const style = window.getComputedStyle(el);
            if (style.position === "fixed" || style.overflowX !== "visible") return;
            bad.push(
              `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? `.${el.className.split(" ")[0]}` : ""} (${Math.round(rect.width)}px)`,
            );
          }
        });
        return bad.slice(0, 10);
      }, viewport.width);

      expect(offenders, `Elements overflow the ${viewport.name} viewport`).toEqual([]);
    });

    for (const section of SECTIONS) {
      test(`${section.name} matches its visual baseline`, async ({ page }) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await settle(page);

        const locator = page.locator(section.selector).first();
        await expect(locator).toBeVisible();
        await expect(locator).toHaveScreenshot(
          `${section.name}-${viewport.name}.png`,
          { maxDiffPixelRatio: 0.02, animations: "disabled", timeout: 20_000 },
        );
      });
    }
  });
}
