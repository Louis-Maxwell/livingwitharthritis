import { test, expect } from "../playwright-fixture";

test.describe("Authentication Flow", () => {
  test("should display the auth page with sign-in form", async ({ page }) => {
    await page.goto("/auth");
    
    // Should show welcome heading
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(page.getByText(/Sign in with Google or email/i)).toBeVisible();
  });

  test("should show email and password input fields", async ({ page }) => {
    await page.goto("/auth");

    // Supabase Auth UI renders email + password inputs
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await expect(passwordInput).toBeVisible();
  });

  test("should show validation error for invalid credentials", async ({ page }) => {
    await page.goto("/auth");

    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await emailInput.waitFor({ state: "visible", timeout: 10000 });
    await emailInput.fill("invalid@test.com");
    await passwordInput.fill("wrongpassword123");

    // Submit the form
    await page.locator('button[type="submit"], form button').first().click();

    // Should show an error message (Supabase Auth UI shows errors inline)
    await expect(page.getByText(/invalid|error|incorrect|not found/i)).toBeVisible({ timeout: 10000 });
  });

  test("should have a back to home link", async ({ page }) => {
    await page.goto("/auth");

    const backLink = page.getByText("← Back to home");
    await expect(backLink).toBeVisible();

    await backLink.click();
    await expect(page).toHaveURL("/");
  });

  test("should toggle between sign-in and sign-up views", async ({ page }) => {
    await page.goto("/auth");

    // Supabase Auth UI has a link to switch between sign in and sign up
    const signUpLink = page.getByText(/sign up|create account|don't have an account/i);
    await expect(signUpLink).toBeVisible({ timeout: 10000 });

    await signUpLink.click();

    // Should now show sign-up related UI
    const signInLink = page.getByText(/sign in|already have an account/i);
    await expect(signInLink).toBeVisible({ timeout: 5000 });
  });
});
