import { test, expect } from "@playwright/test";

test.describe("Link", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/link--default");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const link = storybookIframe.getByText("Home");

    // Test default state
    await expect(link).toHaveScreenshot("link-default-state.png");

    // Test hover state
    await link.hover();
    await expect(link).toHaveScreenshot("link-hover-state.png");
  });
});
