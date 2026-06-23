import { test, expect } from "@playwright/test";

const personalAccessToken = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;

test.describe("Critical user flows", () => {
  test("user can calculate the max value of a single account", async ({
    page,
  }) => {
    await page.addInitScript((token) => {
      localStorage.setItem("ynabAccessToken", token ?? "");
    }, personalAccessToken);

    await page.goto("/");

    await expect(
      page.getByText("Using budget id: 1b4174d5-29c9-43e7-ae05-c3f609f07f12"),
    ).toBeVisible();

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

    const maxBalancesTable = page.getByRole("table", {
      name: "Max Balance Transactions",
    });

    // Assert the Max Balance Transactions table has 2 rows
    await expect(
      maxBalancesTable.locator("tbody").getByRole("row"),
    ).toHaveCount(2);

    // Assert first row content
    const firstRow = maxBalancesTable.locator("tbody").getByRole("row").nth(0);
    await expect(firstRow.getByRole("cell").nth(0)).toContainText("2025-09-12");
    await expect(firstRow.getByRole("cell").nth(1)).toContainText("Paycheck");
    await expect(firstRow.getByRole("cell").nth(3)).toContainText("2500");
    await expect(firstRow.getByRole("cell").nth(4)).toContainText("2784.51");
    await expect(firstRow.getByRole("cell").nth(5)).toContainText("2025");

    // Assert second row content
    const secondRow = maxBalancesTable.locator("tbody").getByRole("row").nth(1);
    await expect(secondRow.getByRole("cell").nth(0)).toContainText(
      "2026-03-01",
    );
    await expect(secondRow.getByRole("cell").nth(1)).toContainText("Refund");
    await expect(secondRow.getByRole("cell").nth(3)).toContainText("50");
    await expect(secondRow.getByRole("cell").nth(4)).toContainText("1411.36");
    await expect(secondRow.getByRole("cell").nth(5)).toContainText("2026");
  });
});
