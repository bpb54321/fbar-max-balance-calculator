import { test, expect } from "@playwright/test";

test.describe("Typography", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/typography--primary");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const typographyContainer = storybookIframe.getByTestId(
      "typography-container"
    );
    await expect(typographyContainer).toHaveScreenshot();
  });
});
