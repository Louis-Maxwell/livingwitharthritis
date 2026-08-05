import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, expect, type Page } from "@playwright/test";


/**
 * Layout regression alerts.
 *
 * Guards the sections most exposed to CSS utility edits. Two kinds of
 * assertion:
 *   1. Structural — no horizontal overflow at mobile or desktop width, and
 *      no element wider than the viewport. Always runs; catches "the layout
 *      broke" without needing baseline images.
 *   2. Visual — element screenshots with a small pixel tolerance, so a
 *      genuine layout shift fails but antialiasing noise does not. These
 *      only run when a committed baseline exists for the current platform
 *      (screenshots are renderer-specific, so baselines must be generated
 *      on the same OS that CI uses).
 *
 * Run with:
 *   bun run test:layout
 * Generate or refresh baselines with:
 *   bun run test:layout:update
 */

const SNAPSHOT_DIR = join(__dirname, "layout-snapshots.spec.ts-snapshots");
const updatingSnapshots = process.argv.some((arg) => arg.includes("update-snapshots"));

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
        const baseline = `${section.name}-${viewport.name}.png`;
        test.skip(
          !updatingSnapshots && !existsSync(SNAPSHOT_DIR),
          `No committed baselines yet — run \`bun run test:layout:update\` to create them.`,
        );

        await page.goto("/", { waitUntil: "domcontentloaded" });
        await settle(page);

        const locator = page.locator(section.selector).first();
        await expect(locator).toBeVisible();
        await expect(locator).toHaveScreenshot(baseline, {
          maxDiffPixelRatio: 0.02,
          animations: "disabled",
          timeout: 20_000,
        });
      });
    }

  });
}
