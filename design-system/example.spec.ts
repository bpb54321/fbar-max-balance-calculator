import { test, expect } from "@playwright/test";

test.describe("Table", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/table--primary");

    await expect(page).toHaveScreenshot();
  });
});
