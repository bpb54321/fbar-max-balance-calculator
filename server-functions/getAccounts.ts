import { TokenManager } from "@/services/tokenManager";
import * as ynab from "ynab";

export default async function getAccounts() {
  const ynabApi = new ynab.api(TokenManager.getToken());

  const budgets = await ynabApi.budgets.getBudgets(true);
  const defaultBudgetId = budgets.data.default_budget?.id;

  if (!defaultBudgetId) {
    throw new Error("Default budget id not defined for user");
  }

  const accounts = await ynabApi.accounts.getAccounts(defaultBudgetId);

  return accounts.data.accounts;
}
