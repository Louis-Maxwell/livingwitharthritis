import { createRequire } from "node:module";
import { test, expect, type Page } from "@playwright/test";

/**
 * WCAG 2.1 AA smoke on the BUILT site (runs in the required
 * "Blog smoke (Playwright, must pass)" job). jsdom cannot compute colour
 * contrast, so contrast and other rendered-layout rules are checked here in a
 * real browser with axe-core. Any serious or critical violation fails CI.
 */
const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve("axe-core/axe.min.js");

const ROUTES = [
  "/",
  "/blog/sex-and-intimacy-with-arthritis",
  "/contact",
  "/donate",
  "/zakat-appeal",
  "/faq",
];

type AxeViolation = { id: string; impact: string | null; nodes: { target: string[]; failureSummary?: string }[] };

async function seriousViolations(page: Page): Promise<AxeViolation[]> {
  await page.addScriptTag({ path: AXE_PATH });
  const violations = await page.evaluate(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axe = (window as any).axe;
    const result = await axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
    });
    return result.violations as AxeViolation[];
  });
  return violations.filter((v) => v.impact === "serious" || v.impact === "critical");
}

function describeViolations(violations: AxeViolation[]): string {
  return violations
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)
    .join("\n");
}

test.describe("Accessibility smoke (WCAG 2.1 AA, must fail CI)", () => {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1366, height: 900 },
  ]) {
    for (const route of ROUTES) {
      test(`${viewport.name} ${route} has no serious axe violations`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        // Consent already given, so the audit covers the page itself.
        await page.addInitScript(() => {
          localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
          localStorage.setItem("cookie-consent", "declined");
        });
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
        // Let deferred sections mount and entrance animations finish.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 50));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(1200);
        const violations = await seriousViolations(page);
        expect(violations, describeViolations(violations)).toEqual([]);
      });
    }
  }

  test("cookie banner passes axe on first visit", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("region", { name: "Cookie consent" })).toBeVisible({ timeout: 15000 });
    const violations = await seriousViolations(page);
    expect(violations, describeViolations(violations)).toEqual([]);
  });
});

test.describe("One popup at a time", () => {
  test("opening the accessibility panel closes the help chat, Escape closes the panel", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.addInitScript(() => {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });

    const help = page.getByRole("button", { name: "Open help" });
    await help.click();
    await expect(page.getByRole("region", { name: "Help chat" })).toBeVisible();

    await page.getByRole("button", { name: "Accessibility settings" }).click();
    await expect(page.getByRole("group", { name: "Accessibility settings" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Help chat" })).toHaveCount(0);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("group", { name: "Accessibility settings" })).toHaveCount(0);
  });

  test("the cookie banner steps aside while a popup is open", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const banner = page.getByRole("region", { name: "Cookie consent" });
    await expect(banner).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Open help" }).click();
    await expect(banner).toHaveCount(0);
    await page.getByRole("button", { name: "Close help" }).click();
    await expect(banner).toBeVisible();
  });
});
