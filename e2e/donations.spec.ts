import { test, expect } from "@playwright/test";

/** /donate on the built site: content, navigation and the donation dialog. */
test.describe("Donation page", () => {
  test.beforeEach(async ({ page }) => {
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

  test("links to the Zakat appeal", async ({ page }) => {
    await page.getByRole("link", { name: "Give to the appeal" }).click();
    await expect(page).toHaveURL(/\/zakat-appeal$/);
  });

  test("Start Fundraising goes to Ways to Help", async ({ page }) => {
    await page.getByRole("button", { name: "Start Fundraising" }).click();
    await expect(page).toHaveURL(/\/ways-to-help$/);
  });

  test("corporate giving card goes to Corporate Giving", async ({ page }) => {
    await page.getByRole("button", { name: "Learn about corporate giving" }).click();
    await expect(page).toHaveURL(/\/corporate-giving$/);
  });

  test("the donate button opens exactly one donation dialog", async ({ page }) => {
    await page.getByRole("button", { name: /^Donate £50$/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCount(1);
    await expect(dialog.getByRole("heading", { name: /Complete Your Donation|Set Up Monthly Donation/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
