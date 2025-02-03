"use server";

import YnabService from "@/ynab-service/ynabService";

export default async function getTransactionsForAccount(
  budgetId: string,
  accountId: string,
  dateSince: string
) {
  const ynabService = new YnabService();

  const transactions = await ynabService.getAccountTransactions(
    budgetId,
    accountId,
    dateSince
  );

  return transactions;
}
