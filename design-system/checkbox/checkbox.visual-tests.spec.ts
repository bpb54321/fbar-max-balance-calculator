import { test, expect } from "@playwright/test";

test.describe("Checkbox", () => {
  test("unchecked has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/checkbox--unchecked");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const checkbox = storybookIframe.getByRole("checkbox");
    await expect(checkbox).toHaveScreenshot();
  });

  test("checked has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/checkbox--checked");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const checkbox = storybookIframe.getByRole("checkbox");
    await expect(checkbox).toHaveScreenshot();
  });
});
