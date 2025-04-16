import { test, expect } from "@playwright/test";

test.describe("Heading1", () => {
  test("has correct visual appearance", async ({ page }) => {
    await page.goto("/?path=/story/heading1--primary");

    const storybookIframe = page
      .locator('iframe[title="storybook-preview-iframe"]')
      .contentFrame();

    const h1 = storybookIframe.getByRole("heading", {
      level: 1,
      name: "Taxing Laughter: The Joke Tax Chronicles",
    });

    await expect(h1).toHaveScreenshot();
  });

  // test("has correct visual appearance", async ({ page }) => {
  //   await page.goto("https://ui.shadcn.com/docs/components/typography");

  //   const h1 = page.getByText("Taxing Laughter: The Joke Tax Chronicles");

  //   await expect(h1).toHaveScreenshot();
  // });
});
