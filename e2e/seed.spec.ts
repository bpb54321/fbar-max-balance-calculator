import { test } from "@playwright/test";
import { execSync } from "child_process";

const personalAccessToken = process.env.YNAB_E2E_PERSONAL_ACCESS_TOKEN;

test.describe("Test group", () => {
  test("seed", async ({ page }) => {
    execSync("npm run seed-test-data", { stdio: "inherit" });

    await page.addInitScript((token) => {
      localStorage.setItem("ynabAccessToken", token ?? "");
    }, personalAccessToken);

    await page.goto("/");
  });
});
