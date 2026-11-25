import { test, expect } from "@playwright/test";

/**
 * Mobile layout guard at 360px (a common small Android width).
 *
 * <html> clips horizontal overflow, so document.scrollWidth alone would hide
 * real problems: content that is wider than the screen is simply cut off.
 * Instead, assert that no in-flow element pokes past the viewport edge
 * (ignoring anything inside a horizontal scroller or a fixed overlay).
 */
const ROUTES = [
  "/",
  "/blog",
  "/donate",
  "/about",
  "/guides/benefits-pip",
  "/guides/knee-exercises-for-osteoarthritis",
  "/conditions/osteoarthritis",
];

test.use({
  viewport: { width: 360, height: 800 },
  hasTouch: true,
  isMobile: true,
});

for (const route of ROUTES) {
  test(`${route} has no content wider than a 360px screen`, async ({
    page,
  }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    // Scroll through so lazy sections and the footer mount.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const offenders = await page.evaluate(() => {
      const W = window.innerWidth;
      const skip = (el: Element) => {
        for (
          let p: Element | null = el;
          p && p !== document.body;
          p = p.parentElement
        ) {
          const s = getComputedStyle(p);
          if (s.position === "fixed") return true;
          if (p !== el && /(auto|scroll|hidden|clip)/.test(s.overflowX))
            return true;
        }
        return false;
      };
      return Array.from(document.querySelectorAll("body *"))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          if (getComputedStyle(el).visibility === "hidden") return false;
          return (r.right > W + 1 || r.left < -1) && !skip(el);
        })
        .slice(0, 5)
        .map(
          (el) =>
            `${el.tagName.toLowerCase()}.${(el.getAttribute("class") || "").slice(0, 60)}`,
        );
    });
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
}

for (const width of [320, 360]) {
  test(`mobile menu at ${width}px fills the screen, sits above the bottom bar and returns focus`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/guides/benefits-pip", { waitUntil: "domcontentloaded" });
    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();
    const panel = page.locator("#mobile-primary-nav");
    await expect(panel).toBeVisible();
    await page.waitForTimeout(500); // let the slide-in finish
    const box = await panel.boundingBox();
    expect(box?.height ?? 0).toBeLessThanOrEqual(800);
    expect(Math.round((box?.x ?? 0) + (box?.width ?? 0))).toBe(width);
    // The panel, not the bottom nav, receives a tap near the bottom of the screen.
    const hit = await page.evaluate(() => {
      const el = document.elementFromPoint(200, 770);
      return !!el?.closest("#mobile-primary-nav");
    });
    expect(hit).toBe(true);
    // Every header control, including Close, stays on screen.
    for (const b of await panel.locator("button").all()) {
      const r = await b.boundingBox();
      if (r && r.y < 120) expect(r.x + r.width).toBeLessThanOrEqual(width);
    }
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
}

test("footer links are at least 44px tall on touch screens", async ({
  page,
}) => {
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  const link = page.locator("footer nav ul a").first();
  await link.scrollIntoViewIfNeeded();
  const box = await link.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
});
