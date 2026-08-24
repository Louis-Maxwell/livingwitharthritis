/**
 * End-to-end Playwright test for the Contact section form.
 *
 * Mocks the Supabase client at the network boundary (page.route) so no
 * real database rows or emails are created. Asserts that:
 *   1. Filling in valid form data and submitting triggers a POST to the
 *      `functions/v1/submit-contact` edge function with the expected
 *      JSON payload, and never writes to contact_inquiries directly.
 *   2. The success screen ("Message received!") appears afterwards.
 *
 * Run against a local dev server:
 *   bun run dev
 *   bunx playwright test tests/visual/contact-section-e2e.spec.ts
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8080";
const SUPABASE_HOST_RE = /supabase\.co\/(rest|functions)\/v1\//;

test("Contact form submission calls submit-contact and shows success", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 1800 } });
  const page = await context.newPage();

  const invokeCalls: { url: string; body: unknown }[] = [];

  // Intercept all Supabase REST + Functions calls so nothing hits the real backend.
  await page.route(SUPABASE_HOST_RE, async (route) => {
    const request = route.request();
    const url = request.url();
    let body: unknown = null;
    try {
      body = JSON.parse(request.postData() ?? "null");
    } catch {
      body = request.postData();
    }
    invokeCalls.push({ url, body });

    if (url.includes("/functions/v1/submit-contact")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, data: { contactId: "test-id" } }),
      });
    }
    // Everything else Supabase — pass through as an empty 200 so the app
    // doesn't stall.
    return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
  });

  await page.goto(`${BASE_URL}/#contact`, { waitUntil: "networkidle" });
  const section = page.locator("#contact");
  await section.scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: /we.?re here to help/i })).toBeVisible();

  // Fill valid form data.
  await page.getByLabel(/your name/i).fill("Playwright Tester");
  await page.getByLabel(/email address/i).fill("tester@example.com");
  await page.getByLabel(/subject/i).selectOption("General enquiry");
  await page.getByLabel(/your message/i).fill(
    "Hello, this is an end-to-end test message that is definitely longer than twenty characters.",
  );

  // Wait for the edge function POST to fire.
  const invokeResponse = page.waitForResponse(
    (r) => r.url().includes("/functions/v1/submit-contact") && r.request().method() === "POST",
  );
  await page.getByRole("button", { name: /send message/i }).click();
  const resp = await invokeResponse;
  expect(resp.status()).toBe(200);

  // Assert payload shape.
  const functionCall = invokeCalls.find((c) => c.url.includes("/functions/v1/submit-contact"));
  expect(functionCall, "expected submit-contact to be called").toBeTruthy();
  expect(functionCall!.body).toMatchObject({
    name: "Playwright Tester",
    email: "tester@example.com",
    subject: "General enquiry",
    message: expect.stringContaining("end-to-end test message"),
  });

  // The browser must not insert rows itself — that path has no rate limit.
  const directInsert = invokeCalls.find((c) => c.url.includes("/rest/v1/contact_inquiries"));
  expect(directInsert, "contact_inquiries must not be written from the client").toBeFalsy();

  // Success screen renders.
  await expect(page.getByRole("alert").getByText(/message received/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /send another message/i })).toBeVisible();

  await context.close();
});
