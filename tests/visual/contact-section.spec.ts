/**
 * Visual regression check for the landing page Contact Section.
 *
 * Captures screenshots of the #contact anchor at mobile, tablet, and desktop
 * viewports so future edits can be diffed against a known-good baseline.
 *
 * Prereqs (run once, locally):
 *   bun add -D @playwright/test
 *   bunx playwright install chromium
 *
 * Run against the local dev server (must be already running on :8080):
 *   bunx playwright test tests/visual/contact-section.spec.ts
 *
 * The first run writes baselines to tests/visual/__screenshots__/.
 * Subsequent runs fail if the rendered section drifts beyond the threshold.
 */

import { test, expect, devices } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";

const VIEWPORTS = [
  { name: "mobile", viewport: { width: 375, height: 812 } },
  { name: "tablet", viewport: { width: 834, height: 1194 } },
  { name: "desktop", viewport: { width: 1440, height: 900 } },
] as const;

for (const { name, viewport } of VIEWPORTS) {
  test(`Contact section renders cleanly on ${name}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/#contact`, { waitUntil: "networkidle" });

    // Wait for the section and its heading to be visible.
    const heading = page.getByRole("heading", { name: /we.?re here to help/i });
    await expect(heading).toBeVisible();

    const section = page.locator("#contact");
    await section.scrollIntoViewIfNeeded();
    // Give reveal animations time to settle.
    await page.waitForTimeout(400);

    // Overflow assertion: the section must not scroll horizontally on any
    // viewport (a common symptom of clipped/overlapping cards).
    const overflow = await section.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    expect(
      overflow.scrollWidth,
      `Section overflowed horizontally on ${name} (scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth})`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);

    // Each of the 4 channel cards must render with a positive box size.
    const cards = section.locator("ul > li");
    await expect(cards).toHaveCount(4);
    for (let i = 0; i < 4; i++) {
      const box = await cards.nth(i).boundingBox();
      expect(box, `Card ${i} has no bounding box on ${name}`).not.toBeNull();
      expect(box!.width).toBeGreaterThan(80);
      expect(box!.height).toBeGreaterThan(120);
    }

    // Snapshot the section itself (not the whole page) so unrelated
    // sections don't cause false diffs.
    await expect(section).toHaveScreenshot(`contact-${name}.png`, {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });

    await context.close();
  });
}
