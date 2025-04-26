import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/ynab-service/ynabService";
import * as ynab from "ynab";

export default async function getAccounts() {
  const token = TokenManager.getToken();
  const ynabApi = new ynab.api(token);

  const ynabService = new YnabService(token);

  const budgets = await ynabApi.budgets.getBudgets();
  const defaultBudgetId = budgets.data.default_budget?.id;

  if (!defaultBudgetId) {
    throw new Error("Default budget id not defined for user");
  }

  const accounts = await ynabService.getAccounts(defaultBudgetId);

  return accounts;
}
