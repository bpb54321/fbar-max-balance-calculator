import { test, expect } from "@playwright/test";

test.describe("Table", () => {
  // test("has correct visual appearance", async ({ page }) => {
  //   await page.goto("/?path=/story/table--primary");

  //   const storybookIframe = await page
  //     .locator('iframe[title="storybook-preview-iframe"]')
  //     .contentFrame();

  //   const table = await storybookIframe.getByTestId("table");

  //   await expect(table).toHaveScreenshot();
  // });

  // Use example table loaded in Next.js so that font loading technique is identical
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const table = await page.getByTestId("table");

    await expect(table).toHaveScreenshot();
  });
});

// test.describe("Shadcn table", () => {
//   test("can get screenshot", async ({ page }) => {
//     await page.goto("https://ui.shadcn.com/docs/components/table");

//     await page.getByRole("combobox").click();

//     await page.getByText("Default").click();

//     await page.getByText("Loading...").waitFor({ state: "hidden" });

//     const table = await page.locator("css=table");

//     await expect(table).toHaveScreenshot();
//   });
// });
