/**
 * Visual / layout check for the Contact section.
 *
 * Structural assertions (overflow, card geometry, heading) always run.
 * Screenshot diffs only run when a committed baseline exists for this
 * viewport — same pattern as layout-snapshots.spec.ts — so CI does not
 * fail on a first-ever missing PNG.
 *
 * Generate baselines on Linux (matching CI):
 *   PLAYWRIGHT_BASE_URL=http://localhost:4173 \
 *     bunx playwright test --config=tests/visual/playwright.config.ts \
 *     tests/visual/contact-section.spec.ts --update-snapshots
 */

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";

const SNAPSHOT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "contact-section.spec.ts-snapshots",
);
const updatingSnapshots = process.argv.some((arg) => arg.includes("update-snapshots"));

const VIEWPORTS = [
  { name: "mobile", viewport: { width: 375, height: 812 } },
  { name: "tablet", viewport: { width: 834, height: 1194 } },
  { name: "desktop", viewport: { width: 1440, height: 900 } },
] as const;

function hasCommittedBaseline(name: string): boolean {
  if (!existsSync(SNAPSHOT_DIR)) return false;
  const candidates = [
    `contact-${name}.png`,
    `contact-${name}-chromium-linux.png`,
    `contact-${name}-chromium-darwin.png`,
  ];
  return candidates.some((f) => existsSync(join(SNAPSHOT_DIR, f)));
}

for (const { name, viewport } of VIEWPORTS) {
  test(`Contact section renders cleanly on ${name}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });

    const heading = page.getByRole("heading", { name: /a real person will reply/i });
    await expect(heading).toBeVisible();

    const section = page.locator("#contact");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const overflow = await section.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(
      overflow.scrollWidth,
      `Section overflowed horizontally on ${name} (scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth})`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);

    const cards = section.locator("ul > li");
    await expect(cards).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box, `Card ${i} has no bounding box on ${name}`).not.toBeNull();
      expect(box!.width).toBeGreaterThan(80);
      expect(box!.height).toBeGreaterThan(120);
    }

    if (updatingSnapshots || hasCommittedBaseline(name)) {
      await expect(section).toHaveScreenshot(`contact-${name}.png`, {
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
      });
    } else {
      test.info().annotations.push({
        type: "note",
        description:
          "No committed contact-section baselines — structural checks only. Run with --update-snapshots on Linux to create them.",
      });
    }

    await context.close();
  });
}
