import { test, expect } from "@playwright/test";

test.describe("OAuth", () => {
  test("sends user to correct YNAB authorization URL", async ({ page }) => {
    await page.goto("/");
    const authorizeYnabLink = page.getByRole("link", {
      name: "Authorize With YNAB",
    });

    await authorizeYnabLink.click();

    await expect(page).toHaveURL("https://app.ynab.com/users/sign_in");

    const cookieBanner = page.getByRole("region", {
      name: "Cookie banner",
    });
    await cookieBanner
      .getByRole("button", {
        name: "OK",
        exact: true,
      })
      .click();
    await expect(cookieBanner).toBeHidden();

    await page.getByLabel("Email:").fill(process.env["YNAB_USERNAME"] ?? "");
    await page.getByLabel("Password:").fill(process.env["YNAB_PASSWORD"] ?? "");
    await page.getByRole("button", { name: "Log In" }).click();

    await expect(
      page.getByRole("heading", {
        name: "Authorize FBAR Max Balance Calculator",
      })
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Authorize",
      })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Accounts",
      })
    ).toBeVisible();

    await page
      .getByRole("link", {
        name: "Settings",
      })
      .click();
    await page
      .getByRole("button", {
        name: "Reload accounts",
      })
      .click();

    await expect(page.getByLabel("Checking Account A")).toBeVisible();
  });
});
