import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default async function getAccounts() {
  const token = TokenManager.getToken();
  const ynabService = new YnabService(token);

  const defaultBudgetId = await ynabService.getDefaultBudgetId();

  if (!defaultBudgetId) {
    throw new Error("Default budget id not defined for user");
  }

  const accounts = await ynabService.getAccounts(defaultBudgetId);

  return accounts;
}
