import { YnabAccountTransactionsResponse } from "@/types/ynabApi/ynabApiResponseTypes";
import { YnabTransaction } from "@/types/ynabApi/YnabTransaction";
import * as ynab from "ynab";

export default class YnabService {
  private apiBaseUrl = "https://api.ynab.com/v1";
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
    return budgetResponse.data.default_budget?.id;
  }

  async getAccountTransactions(
    ynabBudgetId: string,
    accountId: string,
    dateSince: string
  ): Promise<YnabTransaction[]> {
    const url = new URL(
      `${this.apiBaseUrl}/budgets/${ynabBudgetId}/accounts/${accountId}/transactions`
    );
    url.searchParams.append("since_date", dateSince);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.ynabBearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.statusText}`);
    }

    const data: YnabAccountTransactionsResponse = await response.json();
    return data.data.transactions;
  }
}
