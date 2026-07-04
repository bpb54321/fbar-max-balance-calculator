import { test, expect } from "@playwright/test";

test.describe("HighlightedText", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/highlightedtext--primary");
    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();
    const highlightedText = storybookIframe.getByText("Highlighted text");
    await expect(highlightedText).toHaveScreenshot();
  });
});
