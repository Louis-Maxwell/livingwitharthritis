import { test, expect } from "@playwright/test";

/** /donate on the built site: content, navigation and verified-provider handoffs. */
test.describe("Donation page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
    });
    await page.goto("/donate");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
  });

  test("shows the hero and an honest external payment handoff", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/give/i);
    const donate = page.locator("#give").getByRole("link", { name: /Donate on GoFundMe/ });
    await expect(donate).toBeVisible();
    await expect(donate).toHaveAttribute("href", /^https:\/\/www\.gofundme\.com\//);
    await expect(donate).toHaveAttribute("target", "_blank");
    await expect(page.getByText("Payment details and receipts are handled by GoFundMe.", { exact: false })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Donate £/ })).toHaveCount(0);
  });

  test("lists every way to give", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Ways to Give" })).toBeVisible();
    for (const name of ["One-Off Donation", "Zakat & Sadaqah", "Fundraise for Us", "Corporate Giving", "Volunteer"]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
  });

  test("explains tax-efficient giving", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Tax-Efficient Giving" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gift Aid (+25%)" })).toBeVisible();
  });

  test("appeal link hands off to the campaign without claiming an onsite payment", async ({ page }) => {
    const appeal = page.getByRole("link", { name: /Give to the appeal/ });
    await expect(appeal).toHaveAttribute("href", /^https:\/\/www\.gofundme\.com\//);
    await expect(appeal).toHaveAttribute("target", "_blank");
  });

  test("Start Fundraising goes to Ways to Help", async ({ page }) => {
    await page.getByRole("button", { name: "Start Fundraising" }).click();
    await expect(page).toHaveURL(/\/ways-to-help$/);
  });

  test("corporate giving card goes to Corporate Giving", async ({ page }) => {
    await page.getByRole("button", { name: "Learn about corporate giving" }).click();
    await expect(page).toHaveURL(/\/corporate-giving$/);
  });

  test("a return URL cannot fabricate a payment confirmation", async ({ page }) => {
    await page.goto("/donation-result/success?amount=500&session_id=fake");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/£500/)).toHaveCount(0);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
