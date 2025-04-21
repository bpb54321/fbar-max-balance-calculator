import { YNAB_TOKEN_LOCAL_STORAGE_KEY } from "@/hooks/useYnabOauthToken";
import * as ynab from "ynab";

export default async function getAccounts() {
  const ynabToken = window.localStorage.getItem(YNAB_TOKEN_LOCAL_STORAGE_KEY);

  if (!ynabToken) {
    throw new Error(
      "YNAB access token not found. Please authenticate using OAuth."
    );
  }

  const ynabApi = new ynab.api(ynabToken);

  const budgets = await ynabApi.budgets.getBudgets(true);
  const defaultBudgetId = budgets.data.default_budget?.id;

  if (!defaultBudgetId) {
    throw new Error("Default budget id not defined for user");
  }

  const accounts = await ynabApi.accounts.getAccounts(defaultBudgetId);

  return accounts.data.accounts;
}
