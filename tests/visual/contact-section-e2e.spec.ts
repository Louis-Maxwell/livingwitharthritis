/**
 * End-to-end Playwright test for the Contact section form.
 *
 * The static site opens a mailto: draft instead of storing a submission.
 * Asserts that filling valid data shows the honest "email draft ready" screen.
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";

test("Contact form prepares a recoverable email draft without claiming delivery", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });
  const section = page.locator("#contact");
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator('#contact-heading')).toHaveText('Contact Living With Arthritis');

  await page.getByLabel(/your name/i).fill("Playwright Tester");
  await page.getByLabel(/email address/i).fill("tester@example.com");
  await page.getByLabel(/subject/i).selectOption("General enquiry");
  await page.getByLabel(/your message/i).fill(
    "Hello, this is an end-to-end test message that is definitely longer than twenty characters.",
  );

  await page.getByRole("button", { name: /open mail app/i }).click();

  await expect(page.getByRole("alert").getByText(/email draft ready/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back to your message', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Clear and start a new message', exact: true })).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Nothing was submitted automatically.');
  await page.getByRole('button', { name: 'Back to your message', exact: true }).click();
  await expect(page.getByLabel(/your message/i)).toHaveValue('Hello, this is an end-to-end test message that is definitely longer than twenty characters.');
  await expect(page.getByLabel(/your message/i)).toBeFocused();
  await expect(page.getByLabel(/email address/i)).toHaveValue('tester@example.com');
  await expect(page.getByLabel(/your message/i)).toHaveAttribute('maxlength', '5000');

  await context.close();
});
