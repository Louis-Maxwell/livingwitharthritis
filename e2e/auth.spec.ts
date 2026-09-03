import { test, expect } from "../playwright-fixture";

test.describe("Authentication Flow", () => {
  test("auth page shows the paused admin panel", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.getByRole("heading", { name: /admin is paused/i })).toBeVisible();
    await expect(page.getByText(/until we add the backend back/i)).toBeVisible();
  });

  test("paused auth page has a back to homepage link", async ({ page }) => {
    await page.goto("/auth");
    const backLink = page.getByRole("link", { name: /back to the homepage/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL("/");
  });
});
