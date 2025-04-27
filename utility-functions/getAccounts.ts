import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default async function getAccounts(budgetId: string) {
  const token = TokenManager.getToken();
  const ynabService = new YnabService(token);

  const accounts = await ynabService.getAccounts(budgetId);

  return accounts;
}
