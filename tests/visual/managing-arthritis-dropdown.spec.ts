/**
 * Playwright test — Managing Arthritis header dropdown scroll behaviour.
 *
 * Verifies that at a short desktop viewport (where the dropdown's
 * `max-h-[calc(100vh-8rem)]` can't fit all 13 sub-items) the container
 * overflows, exposes a scrollbar, and every item is reachable by
 * scrolling. Guards against regressions like removing `overflow-y-auto`
 * or fixing the height to something smaller than the item list.
 *
 * Run:
 *   bunx playwright test tests/visual/managing-arthritis-dropdown.spec.ts
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";

test("Managing Arthritis dropdown scrolls to reveal every item", async ({ browser }) => {
  test.setTimeout(90_000);
  // 1280px wide keeps the desktop nav; 600px tall forces overflow
  // (max-h = min(70vh, 32rem) ≈ 420px at 600px tall, and 13 rows > that).
  const context = await browser.newContext({ viewport: { width: 1280, height: 600 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("navigation", { name: /main navigation/i })).toBeVisible();

  // 2. Open the dropdown (top-level is a Link with preventDefault when it has subs).
  const trigger = page.getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: /^Managing Arthritis$/i });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const menu = page.getByRole("menu", { name: /Managing Arthritis submenu/i });
  await expect(menu).toBeVisible();

  // 3. Scroll container is the first child div of the role="menu" wrapper.
  const scrollContainer = menu.locator("> div").first();
  await expect(scrollContainer).toBeVisible();

  // 4. Scrollbar is warranted (content taller than the container).
  const overflow = await scrollContainer.evaluate((el) => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  }));
  expect(
    overflow.scrollHeight,
    `Dropdown must overflow at 1280×600 so a scrollbar is needed (scrollHeight=${overflow.scrollHeight}, clientHeight=${overflow.clientHeight}).`,
  ).toBeGreaterThan(overflow.clientHeight);

  // 5. All 13 sub-items are rendered.
  const items = menu.getByRole("menuitem");
  await expect(items).toHaveCount(13);

  // 6. Last item is initially clipped, then reachable by scrolling.
  const lastItem = items.last();
  await expect(lastItem).toHaveText(/Treatment Access & Costs/);

  const isFullyVisible = async (): Promise<boolean> => {
    const itemBox = await lastItem.boundingBox();
    const containerBox = await scrollContainer.boundingBox();
    if (!itemBox || !containerBox) return false;
    return (
      itemBox.y >= containerBox.y &&
      itemBox.y + itemBox.height <= containerBox.y + containerBox.height
    );
  };

  expect(
    await isFullyVisible(),
    "Last item should be clipped before scrolling — if this fails the viewport is tall enough that overflow isn't triggered.",
  ).toBe(false);

  await scrollContainer.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  expect(
    await isFullyVisible(),
    "Last item must be fully visible after scrolling the menu container.",
  ).toBe(true);

  // Container actually scrolled (not just the page).
  const scrollTopAfter = await scrollContainer.evaluate((el) => el.scrollTop);
  expect(scrollTopAfter).toBeGreaterThan(0);

  // 7. Scroll back to the top; first item is fully visible again.
  await scrollContainer.evaluate((el) => {
    el.scrollTop = 0;
  });

  const firstItem = items.first();
  await expect(firstItem).toHaveText(/Newly Diagnosed/);
  const firstBox = await firstItem.boundingBox();
  const containerBox = await scrollContainer.boundingBox();
  expect(firstBox && containerBox).toBeTruthy();
  expect(firstBox!.y).toBeGreaterThanOrEqual(containerBox!.y - 1);
  expect(firstBox!.y + firstBox!.height).toBeLessThanOrEqual(containerBox!.y + containerBox!.height + 1);

  await context.close();
});
