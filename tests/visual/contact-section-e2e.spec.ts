/**
 * End-to-end Playwright test for the Contact section form.
 *
 * The static site opens a mailto: draft instead of storing a submission.
 * Asserts that filling valid data shows the honest "email draft ready" screen.
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";

test("Contact form shows email-send confirmation", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });
  const section = page.locator("#contact");
  await section.scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /a real person will reply/i })).toBeVisible();

  await page.getByLabel(/your name/i).fill("Playwright Tester");
  await page.getByLabel(/email address/i).fill("tester@example.com");
  await page.getByLabel(/subject/i).selectOption("General enquiry");
  await page.getByLabel(/your message/i).fill(
    "Hello, this is an end-to-end test message that is definitely longer than twenty characters.",
  );

  await page.getByRole("button", { name: /open mail app/i }).click();

  await expect(page.getByRole("alert").getByText(/email draft ready/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /send another message/i })).toBeVisible();

  await context.close();
});
