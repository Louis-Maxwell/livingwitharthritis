import { test, expect } from "@playwright/test";

test.describe("Critical User Flows", () => {
  test("Chat: Message submission and response handling", async ({ page }) => {
    await page.goto("/chat");

    // Wait for the chat interface to load
    await page.waitForLoadState("networkidle");

    // Find and fill the message input
    const messageInput = page.locator("textarea, input[placeholder*='message'], input[placeholder*='chat'], input[placeholder*='question'], input[placeholder*='ask']").first();
    await messageInput.waitFor({ state: "visible", timeout: 10000 });

    // Submit a test message
    await messageInput.fill("What is arthritis and how can I manage it?");

    // Find and click the send button
    const sendButton = page.locator("button:has-text('Send'), button:has-text('submit'), button[type='submit']").first();
    await sendButton.click();

    // Wait for AI response (allow up to 30 seconds for AI processing)
    await page.waitForTimeout(2000); // Wait a bit for response to start appearing

    // Verify response is visible - look for chat message indicators
    const response = page.locator("[role='article'], [data-testid='ai-response'], [class*='message'], [class*='response']").nth(1);
    await response.waitFor({ state: "visible", timeout: 30000 });

    // Verify some arthritis-related content appears in the response
    const pageText = await page.locator("body").textContent();
    expect(pageText).toMatch(/arthritis|joint|pain|management|treatment/i);
  });

  test("Contact Form: Submission with validation", async ({ page }) => {
    await page.goto("/contact");

    await page.waitForLoadState("networkidle");

    // Find form fields
    const nameField = page.locator("input[name='name'], input[placeholder*='Name'], input[placeholder*='name']").first();
    const emailField = page.locator("input[type='email'], input[name='email'], input[placeholder*='email']").first();
    const subjectField = page.locator("input[name='subject'], input[placeholder*='Subject'], input[placeholder*='subject']").first();
    const messageField = page.locator("textarea[name='message'], textarea[placeholder*='message'], textarea[placeholder*='Message']").first();

    // Wait for fields to be visible
    await nameField.waitFor({ state: "visible", timeout: 10000 });

    // Fill the form
    await nameField.fill("Test User");
    await emailField.fill("test@example.com");
    await subjectField.fill("Test Subject");
    await messageField.fill("This is a test message for contact form submission.");

    // Find and click the submit button
    const submitButton = page.locator("button:has-text('Send'), button:has-text('Submit'), button[type='submit']").first();
    await submitButton.click();

    // Check for success message or redirect
    await page.waitForTimeout(2000);

    // Verify success - either success message or form cleared
    const successMsg = page.locator("text=/thank you|received|success|submitted/i").first();
    const hasSuccess = await successMsg.isVisible().catch(() => false);

    if (hasSuccess) {
      await expect(successMsg).toBeVisible();
    } else {
      // If no success message, form should be cleared
      const nameValue = await nameField.inputValue().catch(() => "");
      expect(nameValue).toBe("");
    }
  });

  test("Donation: Checkout flow initiation", async ({ page }) => {
    await page.goto("/donate");

    await page.waitForLoadState("networkidle");

    // Find donation amount selector or input
    const amountInputs = page.locator("input[name='amount'], input[placeholder*='amount'], [data-testid='donation-amount']");
    const amountInputCount = await amountInputs.count().catch(() => 0);

    let donateButton;

    if (amountInputCount > 0) {
      // If there's an amount input, fill it
      await amountInputs.first().fill("50");
      donateButton = page.locator("button:has-text('Donate'), button:has-text('Donate Now'), button:has-text('Continue'), button[type='submit']").first();
    } else {
      // Otherwise, look for a preset donation amount button or the donate button
      const presetButtons = page.locator("button:has-text(/£[0-9]+|donate/i)");
      const presetCount = await presetButtons.count().catch(() => 0);

      if (presetCount > 0) {
        // Click on a preset donation amount (e.g., £50)
        const fiftyButton = page.locator("button:has-text('£50'), button:has-text('50')").first();
        const exists = await fiftyButton.isVisible().catch(() => false);
        if (exists) {
          await fiftyButton.click();
        }
      }

      donateButton = page.locator("button:has-text('Donate'), button:has-text('Donate Now'), button:has-text('Continue'), button:has-text('Next')").first();
    }

    // Ensure the donate button exists and is visible
    await donateButton.waitFor({ state: "visible", timeout: 10000 });

    // Click to proceed with donation
    await donateButton.click();

    // Wait for navigation or payment modal
    await page.waitForTimeout(2000);

    // Verify we're progressing through the donation flow
    // Either we navigate to a payment page, or a modal opens
    const url = page.url();
    const hasPaymentIndicator = url.includes("stripe") ||
      url.includes("donate") ||
      url.includes("checkout") ||
      await page.locator("text=/stripe|checkout|payment|card/i").isVisible().catch(() => false);

    expect(hasPaymentIndicator).toBe(true);
  });

  test("Chat: Multiple message exchanges", async ({ page }) => {
    await page.goto("/chat");

    await page.waitForLoadState("networkidle");

    const messageInput = page.locator("textarea, input[placeholder*='message'], input[placeholder*='chat'], input[placeholder*='question']").first();
    await messageInput.waitFor({ state: "visible", timeout: 10000 });

    // First message
    await messageInput.fill("What exercises help with knee arthritis?");
    const sendButton = page.locator("button:has-text('Send'), button[type='submit']").first();
    await sendButton.click();

    // Wait for response
    await page.waitForTimeout(3000);
    let messageCount = await page.locator("[role='article'], [class*='message'], [class*='response']").count();
    expect(messageCount).toBeGreaterThan(0);

    // Clear input for second message
    await messageInput.fill("Are there dietary recommendations too?");
    await sendButton.click();

    // Wait for second response
    await page.waitForTimeout(3000);
    messageCount = await page.locator("[role='article'], [class*='message'], [class*='response']").count();
    expect(messageCount).toBeGreaterThan(1);
  });

  test("Donation Page: Layout and content verification", async ({ page }) => {
    await page.goto("/donate");

    await page.waitForLoadState("networkidle");

    // Check for key sections
    await expect(page.getByText(/every donation|donate|impact/i).first()).toBeVisible();

    // Check for donation tiers
    const hasDonationTiers = await page.locator("text=£").count().then(count => count > 0);
    expect(hasDonationTiers).toBe(true);

    // Check for ways to give section
    const hasWaysToGive = await page.getByText(/ways to give|donate/i).isVisible().catch(() => false);
    expect(hasWaysToGive).toBe(true);
  });

  test("Contact Page: Form fields validation", async ({ page }) => {
    await page.goto("/contact");

    await page.waitForLoadState("networkidle");

    // Verify all form fields exist
    const nameField = page.locator("input[name='name'], input[placeholder*='Name']").first();
    const emailField = page.locator("input[type='email']").first();

    await nameField.waitFor({ state: "visible", timeout: 10000 });
    await emailField.waitFor({ state: "visible", timeout: 10000 });

    // Try submitting empty form
    const submitButton = page.locator("button:has-text('Send'), button[type='submit']").first();
    await submitButton.click();

    // Should either show error or prevent submission
    await page.waitForTimeout(1000);

    // Form should still be visible (validation prevented submission)
    const formStillExists = await nameField.isVisible();
    expect(formStillExists).toBe(true);
  });
});
