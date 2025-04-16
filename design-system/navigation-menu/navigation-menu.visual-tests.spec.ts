import { test, expect } from "@playwright/test";

test.describe("NavigationMenu", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/navigationmenu--primary");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const navigationMenu = storybookIframe.getByRole("navigation");
    await expect(navigationMenu).toHaveScreenshot();
  });
});
