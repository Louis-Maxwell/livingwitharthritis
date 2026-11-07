import { test, expect } from "@playwright/test";

test("ankle programme uses the working printable guide without exposing the corrupt PDF", async ({ page, request }) => {
  const oldPdf = await request.get("/resources/ankle-exercise-programme.pdf", { maxRedirects: 0 });
  expect(oldPdf.status()).toBe(301);
  expect(oldPdf.headers().location).toBe("/resources/ankle-exercise-programme.html");

  await page.goto("/resources/ankle-exercise-programme.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.locator("section.exercise")).toHaveCount(5);
  await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0);
  await page.evaluate(() => { window.print = () => { document.body.dataset.printed = "true"; }; });
  const print = page.getByRole("button", { name: "Print or save as PDF" });
  await print.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("body")).toHaveAttribute("data-printed", "true");

  await page.goto("/exercises/ankle-arthritis-exercises");
  await expect(page.locator("body")).not.toContainText("\\n");
  await expect(page.locator('a[href="/resources/ankle-exercise-programme.pdf"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Open the printable ankle exercise guide" }).click();
  await expect(page).toHaveURL(/\/resources\/ankle-exercise-programme\.html$/);
  await expect(page.locator("h1")).toHaveText("Ankle strengthening exercises PDF");
});
