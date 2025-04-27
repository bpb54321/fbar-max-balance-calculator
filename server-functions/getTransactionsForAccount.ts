import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/ynab-service/ynabService";

export default async function getTransactionsForAccount(
  budgetId: string,
  accountId: string,
  dateSince: string
) {
  const ynabToken = TokenManager.getToken();
  const ynabService = new YnabService(ynabToken);

  const transactions = await ynabService.getAccountTransactions(
    budgetId,
    accountId,
    dateSince
  );

  return transactions;
}
