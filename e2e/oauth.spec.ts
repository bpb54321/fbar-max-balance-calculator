import { test, expect } from "@playwright/test";

test.describe("OAuth", () => {
  test("sends user to correct YNAB authorization URL", async ({ page }) => {
    await page.goto("/");
    const authorizeYnabLink = page.getByRole("link", {
      name: "Authorize With YNAB",
    });
    // Assert has correct YNAB authorization URL
    await expect(authorizeYnabLink).toHaveAttribute(
      "href",
      /^https:\/\/app\.ynab\.com\/oauth\/authorize\?client_id=.*&redirect_uri=.*&response_type=token$/
    );
    await authorizeYnabLink.click();
    await expect(page).toHaveURL("https://app.ynab.com/users/sign_in");

    await page.getByLabel("Email:").fill(process.env["YNAB_USERNAME"] ?? "");
    await page.getByLabel("Password:").fill(process.env["YNAB_PASSWORD"] ?? "");
    await page.getByRole("button", { name: "Log In" }).click();

    await page.pause();

    await expect(page).toHaveURL(/#token=.*/);
  });
});
