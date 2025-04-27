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

  async getDefaultBudgetId() {
    const budgetResponse = await this.ynabApi.budgets.getBudgets();
    return budgetResponse.data.default_budget?.id ?? "";
  }

  async getAccountTransactions(
    ynabBudgetId: string,
    accountId: string,
    dateSince: string
  ) {
    const transactionsResponse =
      await this.ynabApi.transactions.getTransactionsByAccount(
        ynabBudgetId,
        accountId,
        dateSince
      );

    return transactionsResponse.data.transactions;
  }
}
