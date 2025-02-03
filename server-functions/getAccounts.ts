"use server";

import YnabService from "@/ynab-service/ynabService";

export default async function getAccounts(budgetId: string) {
  const ynabService = new YnabService();
  return await ynabService.getAccounts(budgetId);
}
