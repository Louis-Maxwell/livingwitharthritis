import { test, expect } from "@playwright/test";

const CAMPAIGN_URL = "https://www.gofundme.com/f/help-fund-critical-arthritis-research";

/** /donate on the built site: content, navigation and external donation links. */
test.describe("Donation page", () => {
  test.beforeEach(async ({ page, context }) => {
    // Exercise new-tab navigation without contacting the payment provider.
    await context.route(CAMPAIGN_URL, (route) => route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>Donation destination</title>",
    }));
    await page.addInitScript(() => {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
    });
    await page.goto("/donate");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
  });

  test("shows the hero and the amount picker", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/give/i);
    await expect(page.getByRole("heading", { name: "Choose what you can give" })).toBeVisible();
    const picker = page.locator("section", {
      has: page.getByRole("heading", { name: "Choose what you can give" }),
    });
    for (const amount of ["£50", "£150", "£200", "£500"]) {
      await expect(picker.getByRole("button", { name: amount, exact: true })).toBeVisible();
    }
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

  test("the appeal opens the campaign in a safe new tab", async ({ page }) => {
    const link = page.getByRole("link", { name: /^Give to the appeal/ });
    await expect(link).toHaveAttribute("href", CAMPAIGN_URL);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
    await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(CAMPAIGN_URL);
    await expect(page).toHaveURL(/\/donate$/);
    await popup.close();
  });

  test("Start Fundraising goes to Ways to Help", async ({ page }) => {
    await page.getByRole("button", { name: "Start Fundraising" }).click();
    await expect(page).toHaveURL(/\/ways-to-help$/);
  });

  test("corporate giving card goes to Corporate Giving", async ({ page }) => {
    await page.getByRole("button", { name: "Learn about corporate giving" }).click();
    await expect(page).toHaveURL(/\/corporate-giving$/);
  });

  test("the donation link opens one campaign tab without a payment dialog", async ({ page, context }) => {
    const picker = page.locator("section", {
      has: page.getByRole("heading", { name: "Choose what you can give" }),
    });
    const link = picker.getByRole("link", { name: /^Donate on GoFundMe/ });
    await expect(link).toHaveAttribute("href", CAMPAIGN_URL);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
    await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
    const pagesBefore = context.pages().length;
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(CAMPAIGN_URL);
    expect(context.pages()).toHaveLength(pagesBefore + 1);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/donate$/);
    await expect(picker).toContainText("The amount is chosen on GoFundMe.");
    await popup.close();
  });
});
