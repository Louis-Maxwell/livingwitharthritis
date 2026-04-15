import { test, expect } from "../playwright-fixture";

test.describe("Donation Page Flow", () => {
  test("should display the donation page with hero section", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByText("Every Donation Matters")).toBeVisible();
    await expect(page.getByRole("heading", { name: /free for everyone/i })).toBeVisible();
  });

  test("should display all impact donation tiers", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByText("£10")).toBeVisible();
    await expect(page.getByText("£25")).toBeVisible();
    await expect(page.getByText("£50")).toBeVisible();
    await expect(page.getByText("£100")).toBeVisible();

    // Check impact descriptions
    await expect(page.getByText(/personalised exercise plan/i)).toBeVisible();
    await expect(page.getByText(/virtual physiotherapy sessions/i)).toBeVisible();
  });

  test("should display Ways to Give section with all options", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByText("Ways to Give")).toBeVisible();
    await expect(page.getByText("One-Off Donation")).toBeVisible();
    await expect(page.getByText("Zakat Appeal")).toBeVisible();
    await expect(page.getByText("Fundraise for Us")).toBeVisible();
    await expect(page.getByText("Corporate Giving")).toBeVisible();
    await expect(page.getByText("Gift Aid")).toBeVisible();
    await expect(page.getByText("Volunteer")).toBeVisible();
  });

  test("should display Tax-Efficient Giving section", async ({ page }) => {
    await page.goto("/donate");

    await expect(page.getByText("Tax-Efficient Giving")).toBeVisible();
    await expect(page.getByText(/£100 donation becomes £125 with Gift Aid/i)).toBeVisible();
  });

  test("should navigate to Zakat Appeal page when clicking Donate Now", async ({ page }) => {
    await page.goto("/donate");

    const donateBtn = page.getByRole("button", { name: /Donate Now/i }).first();
    await donateBtn.click();

    await expect(page).toHaveURL(/zakat-appeal/);
  });

  test("should navigate to Ways to Help from Fundraise card", async ({ page }) => {
    await page.goto("/donate");

    // Click the "Start Fundraising" button in the Fundraise for Us card
    const fundraiseBtn = page.getByRole("button", { name: /Start Fundraising/i });
    await fundraiseBtn.click();

    await expect(page).toHaveURL(/ways-to-help/);
  });

  test("should navigate to Corporate Giving page", async ({ page }) => {
    await page.goto("/donate");

    const learnMoreBtns = page.getByRole("button", { name: /Learn More/i });
    // Corporate Giving "Learn More" button
    await learnMoreBtns.nth(0).click();

    await expect(page).toHaveURL(/zakat-appeal|corporate-giving/);
  });
});
