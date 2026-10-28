import { test, expect } from "@playwright/test";

test("ankle programme is available as a valid PDF and standalone printable guide", async ({ page, request }) => {
  const pdf = await request.get("/resources/ankle-exercise-programme.pdf");
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  const bytes = await pdf.body();
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.subarray(-1024).toString()).toContain("%%EOF");

  await page.goto("/resources/ankle-exercise-programme.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.locator("section.exercise")).toHaveCount(5);
  await page.evaluate(() => { window.print = () => { document.body.dataset.printed = "true"; }; });
  const print = page.getByRole("button", { name: "Print or save as PDF" });
  await print.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("body")).toHaveAttribute("data-printed", "true");

  await page.goto("/exercises/ankle-arthritis-exercises");
  await page.getByRole("link", { name: "Open the printable five-exercise ankle guide" }).click();
  await expect(page).toHaveURL(/\/resources\/ankle-exercise-programme\.html$/);
  await expect(page.locator("h1")).toHaveText("Ankle strengthening exercises PDF");
});
