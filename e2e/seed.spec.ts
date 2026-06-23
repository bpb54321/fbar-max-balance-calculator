import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

const personalAccessToken = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;

test.describe("Critical user flows", () => {
  test("user can calculate the max value of a single account", async ({
    page,
  }) => {
    // execSync("npm run seed-test-data", { stdio: "inherit" });

    await page.addInitScript((token) => {
      localStorage.setItem("ynabAccessToken", token ?? "");
    }, personalAccessToken);

    await page.goto("/");

    await page.getByRole("link", { name: "Settings" }).click();
    await page.getByRole("button", { name: "Reload accounts" }).click();

    // Expect seeded accounts to be loaded
    await expect(
      page.getByRole("checkbox", { name: "Wealthsimple_Checking" }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: "TD_Savings" }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: "BNC_Mastercard_CC" }),
    ).toBeVisible();

    // Enable the Wealthsimple_Checking account
    await page.getByRole("checkbox", { name: "Wealthsimple_Checking" }).check();

    // Return home and click into the Wealthsimple_Checking detail page
    await page.getByRole("link", { name: "Home" }).click();
    await page.getByRole("link", { name: "Wealthsimple_Checking" }).click();

    // Load the transactions and assert on the max balances
    await page.getByRole("button", { name: "Reload transactions" }).click();

    const allTransactionsTable = page.getByRole("table", {
      name: "All Transactions",
    });
    await expect(
      allTransactionsTable.locator("tbody").getByRole("row"),
    ).toHaveCount(10);
  });
});
