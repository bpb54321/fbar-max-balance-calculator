import { test, expect } from "@playwright/test";

const personalAccessToken = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;

test.describe("Edge cases", () => {
  test("loads the default budget id for internal pages when valid token already present", async ({
    page,
  }) => {
    await page.addInitScript((token) => {
      localStorage.setItem("ynabAccessToken", token);
    }, personalAccessToken);

    await page.goto("/settings");

    await expect(
      page.getByRole("heading", { name: "Settings Page" }),
    ).toBeVisible();
    await expect(
      page.getByText("Using budget id: 1b4174d5-29c9-43e7-ae05-c3f609f07f12"),
    ).toBeVisible();

    await page.getByRole("button", { name: "Reload accounts" }).click();

    await expect(
      page.getByRole("checkbox", { name: "Wealthsimple_Checking" }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: "TD_Savings" }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: "BNC_Mastercard_CC" }),
    ).toBeVisible();
  });
});
