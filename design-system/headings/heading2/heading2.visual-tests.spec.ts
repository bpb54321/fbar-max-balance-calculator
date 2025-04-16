import { test, expect } from "@playwright/test";

test.describe("Heading2", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/heading2--primary");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const h2 = storybookIframe.getByRole("heading", {
      level: 2,
      name: "The People of the Kingdom",
    });
    await expect(h2).toHaveScreenshot();
  });
  // test("has correct visual appearance", async ({ page }) => {
  //   await page.goto("https://ui.shadcn.com/docs/components/typography");
  //   const h2 = page.getByRole("heading", {
  //     name: "The People of the Kingdom",
  //   });
  //   await expect(h2).toHaveScreenshot();
  // });
});
