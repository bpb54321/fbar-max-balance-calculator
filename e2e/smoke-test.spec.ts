import { test, expect } from "@playwright/test";

test("shows Accounts heading after authenticating via YNAB OAuth", async ({
  page,
}) => {
  const username = process.env.YNAB_E2E_USERNAME;
  const password = process.env.YNAB_E2E_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "Environment variables missing in test. YNAB_E2E_USERNAME " +
        "and YNAB_E2E_PASSWORD must be added to the environment or to .env.e2e.local.",
    );
  }

  await page.goto("/");

  await page.getByRole("link", { name: "Authorize With YNAB" }).click();

  await page.getByRole("textbox", { name: "Email:" }).fill(username);
  await page.getByRole("textbox", { name: "Password:" }).fill(password);
  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByRole("heading", { name: "Accounts" })).toBeVisible();
});
