import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default async function getTransactionsForAccount(
  budgetId: string,
  accountId: string,
) {
  const ynabToken = TokenManager.getToken();
  const ynabService = new YnabService(ynabToken);

  const transactions = await ynabService.getAccountTransactions(
    budgetId,
    accountId,
  );

  return transactions;
}
