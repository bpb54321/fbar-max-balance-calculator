import * as ynab from "ynab";

export default class YnabService {
  private ynabBearerToken: string;
  private ynabApi: ynab.api;

  constructor(ynabBearerToken: string) {
    if (!ynabBearerToken) {
      throw new Error("YNAB bearer token is required");
    }
    this.ynabBearerToken = ynabBearerToken;
    this.ynabApi = new ynab.api(this.ynabBearerToken);
  }

  async getAccounts(budgetId: string) {
    const accountResponse = await this.ynabApi.accounts.getAccounts(budgetId);
    return accountResponse.data.accounts;
  }

  async getDefaultBudget() {
    const budgetResponse = await this.ynabApi.budgets.getBudgets();
    const defaultBudget = budgetResponse.data.default_budget;
    return {
      id: defaultBudget?.id ?? "",
      currencyIsoCode: defaultBudget?.currency_format?.iso_code ?? "",
    };
  }

  async getAccountTransactions(ynabBudgetId: string, accountId: string) {
    const transactionsResponse =
      await this.ynabApi.transactions.getTransactionsByAccount(
        ynabBudgetId,
        accountId,
      );

    return transactionsResponse.data.transactions;
  }
}
