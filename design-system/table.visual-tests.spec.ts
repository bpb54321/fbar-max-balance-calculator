import { test, expect } from "@playwright/test";

test.describe("Table", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/table--primary");

    const storybookIframe = await page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();

    const table = await storybookIframe.getByTestId("table");

    await expect(table).toHaveScreenshot();
  });
});

// test.describe("Shadcn table", () => {
//   test("can get screenshot", async ({ page }) => {
//     await page.goto("https://ui.shadcn.com/docs/components/table");

//     const table = await page.locator("css=table");

//     await expect(table).toHaveScreenshot();
//   });
// });
