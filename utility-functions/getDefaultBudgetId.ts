import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default async function getDefaultBudgetId() {
  const token = TokenManager.getToken();
  const ynabService = new YnabService(token);
  const defaultBudgetId = await ynabService.getDefaultBudgetId();
  return defaultBudgetId;
}
