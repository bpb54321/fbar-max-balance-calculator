import { test, expect } from "@playwright/test";

test.describe("Button", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/button--primary");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const button = storybookIframe.getByRole("button", {
      name: "Button",
    });
    await expect(button).toHaveScreenshot();
  });
});
