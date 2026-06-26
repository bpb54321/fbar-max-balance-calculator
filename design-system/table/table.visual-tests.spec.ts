import { test, expect } from "@playwright/test";

test.describe("Table", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/table--primary");

    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();

    const table = storybookIframe.getByTestId("table");

    await expect(table).toHaveScreenshot();
  });
});
