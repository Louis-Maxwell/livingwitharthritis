import { test, expect } from "../playwright-fixture";

const ROUTE = "/self-help";

test.describe("Appointment Booking Flow", () => {
  test("should open the appointment modal from Self Help page", async ({ page }) => {
    await page.goto(ROUTE);

    // Find and click the "Book an Appointment" or similar trigger button
    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    // Modal should appear
    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Step 1 of 2")).toBeVisible();
  });

  test("should validate required fields in step 1", async ({ page }) => {
    await page.goto(ROUTE);

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    // Click Next without filling fields
    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    // Should show validation errors
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.goto(ROUTE);

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder(/email/i).fill("not-an-email");

    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    await expect(page.getByText("Invalid email")).toBeVisible();
  });

  test("should proceed to step 2 with valid details", async ({ page }) => {
    await page.goto(ROUTE);

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder(/email/i).fill("test@example.com");

    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    await expect(page.getByText("Step 2 of 2")).toBeVisible({ timeout: 5000 });
  });

  test("should close modal when pressing Escape", async ({ page }) => {
    await page.goto(ROUTE);

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    await page.keyboard.press("Escape");

    await expect(page.getByText("Book an Appointment")).not.toBeVisible({ timeout: 3000 });
  });

  test("should show Free Consultation badge", async ({ page }) => {
    await page.goto(ROUTE);

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Free Consultation")).toBeVisible({ timeout: 5000 });
  });
});
