import { test, expect } from "../playwright-fixture";

test.describe("Appointment Booking Flow", () => {
  test("should open the appointment modal from Virtual Physiotherapy page", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    // Find and click the "Book an Appointment" or similar trigger button
    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    // Modal should appear
    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Step 1 of 2")).toBeVisible();
  });

  test("should validate required fields in step 1", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    // Wait for modal
    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    // Click Next without filling fields
    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    // Should show validation errors
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    // Fill name but invalid email
    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder(/email/i).fill("not-an-email");

    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    await expect(page.getByText("Invalid email")).toBeVisible();
  });

  test("should proceed to step 2 with valid details", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    // Fill step 1
    await page.getByPlaceholder("Full name").fill("Test User");
    await page.getByPlaceholder(/email/i).fill("test@example.com");

    const nextBtn = page.getByRole("button", { name: /next|continue/i });
    await nextBtn.click();

    // Should show step 2
    await expect(page.getByText("Step 2 of 2")).toBeVisible({ timeout: 5000 });
  });

  test("should close modal when clicking outside or pressing close", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Book an Appointment")).toBeVisible({ timeout: 5000 });

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Modal should be gone
    await expect(page.getByText("Book an Appointment")).not.toBeVisible({ timeout: 3000 });
  });

  test("should show Free Consultation badge", async ({ page }) => {
    await page.goto("/virtual-physiotherapy");

    const bookBtn = page.getByRole("button", { name: /book.*appointment|book.*consultation/i }).first();
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(page.getByText("Free Consultation")).toBeVisible({ timeout: 5000 });
  });
});
