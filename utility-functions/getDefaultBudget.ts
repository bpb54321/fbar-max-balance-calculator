import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default async function getDefaultBudget() {
  const token = TokenManager.getToken();
  const ynabService = new YnabService(token);
  return ynabService.getDefaultBudget();
}
