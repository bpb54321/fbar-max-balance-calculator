import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/ynab-service/ynabService";
import * as ynab from "ynab";

export default async function getAccounts() {
  const ynabApi = new ynab.api(TokenManager.getToken());

  const ynabService = new YnabService(TokenManager.getToken());

  const budgets = await ynabApi.budgets.getBudgets(true);
  const defaultBudgetId = budgets.data.default_budget?.id;

  if (!defaultBudgetId) {
    throw new Error("Default budget id not defined for user");
  }

  const accounts = await ynabService.getAccounts(defaultBudgetId);

  return accounts;
}
