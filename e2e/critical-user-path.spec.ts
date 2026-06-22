import { test, expect } from "@playwright/test";

const personalAccessToken = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((token) => {
    localStorage.setItem("ynabAccessToken", token ?? "");
  }, personalAccessToken);
});

test("shows Accounts heading and no YNAB error when personal access token is valid", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Accounts" })
  ).toBeVisible();

  await expect(
    page.getByText(
      "There was an error retrieving information from YNAB. Please click on the preceding link to reauthorize the connection to YNAB."
    )
  ).not.toBeVisible();
});
