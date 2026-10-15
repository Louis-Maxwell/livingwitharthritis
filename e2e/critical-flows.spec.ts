import { test, expect } from "@playwright/test";

/**
 * Critical visitor journeys on the built site. The site is a static SPA with
 * no backend: chat answers come from the local engine, and the contact form
 * opens an email draft (it never claims a message was delivered).
 */
test.describe("Critical user flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
    });
  });

  test("chat answers a question", async ({ page }) => {
    await page.goto("/chat");
    const input = page.locator("#chatbot-input");
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill("What is arthritis and how can I manage it?");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("What is arthritis and how can I manage it?")).toBeVisible();
    // The local engine replies with arthritis guidance.
    await expect
      .poll(async () => (await page.locator("body").innerText()).match(/joint|pain|exercise|GP|treatment/gi)?.length ?? 0, {
        timeout: 20000,
      })
      .toBeGreaterThan(3);
  });

  test("contact form validates empty submissions", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("#c-name")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: /Open Mail App/ }).click();
    await expect(page.locator("#c-name-err")).toBeVisible();
    await expect(page.locator("#c-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#c-name")).toBeFocused();
  });

  test("contact form opens an email draft and says so honestly", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("#c-name")).toBeVisible({ timeout: 15000 });
    await page.locator("#c-name").fill("Test User");
    await page.locator("#c-email").fill("test@example.com");
    await page.locator("#c-subject").selectOption({ index: 1 });
    await page.locator("#c-message").fill("This is a test message for the contact form.");
    await page.getByRole("button", { name: /Open Mail App/ }).click();
    await expect(page.getByText(/Email draft ready/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/message received|thank you for your message/i)).toHaveCount(0);
  });
});
