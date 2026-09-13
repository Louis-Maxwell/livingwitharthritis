#!/usr/bin/env node
/** Representative rendered-page accessibility gate using axe-core + Playwright. */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core");
const axeSource = readFileSync(axePath, "utf8");
const base = (process.env.A11Y_BASE_URL || "http://localhost:4173").replace(/\/$/, "");
const routes = [
  "/",
  "/conditions/osteoarthritis",
  "/conditions/rheumatoid-arthritis",
  "/guides/arthritis-pain-relief",
  "/blog",
  "/faq",
  "/community",
  "/donate",
];

const browser = await chromium.launch({ headless: true });
const failures = [];
try {
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    try {
      const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
      if (!response || !response.ok()) {
        failures.push(`${route}: HTTP ${response?.status() ?? "no response"}`);
        continue;
      }
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate(async () => {
        // @ts-ignore axe is injected into the page for this audit.
        return window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag22aa"] },
        });
      });
      for (const v of result.violations) {
        failures.push(`${route}: ${v.id} (${v.impact}) — ${v.help} [${v.nodes.length} node(s)]`);
      }

      const skip = await page.locator('a[href="#main-content"], a[href="#main"]').count();
      if (skip === 0) failures.push(`${route}: no skip-to-content link detected`);
      await page.keyboard.press("Tab");
      const focusedInside = await page.evaluate(() => document.activeElement !== document.body);
      if (!focusedInside) failures.push(`${route}: first Tab did not move focus`);
    } catch (error) {
      failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`✗ a11y audit failed: ${failures.length} issue(s)`);
  failures.slice(0, 120).forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
console.log(`✓ a11y audit — ${routes.length} representative templates passed WCAG 2.2 AA axe checks`);
