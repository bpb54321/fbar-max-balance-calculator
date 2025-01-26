import { YnabAccount } from "@/types/YnabAccount";

interface YnabAccountsResponse {
  data: {
    accounts: YnabAccount[];
  };
}

export default class YnabService {
  private apiBaseUrl = "https://api.ynab.com/v1";

  async getAccounts(): Promise<YnabAccount[]> {
    const accessToken = process.env.YNAB_BEARER_TOKEN;

    if (!accessToken) {
      throw new Error("YNAB_BEARER_TOKEN not defined in env variables");
    }

    const myBudgetId = process.env.YNAB_MY_BUDGET_ID;
    if (!myBudgetId) {
      throw new Error("YNAB_MY_BUDGET_ID not defined in env variables");
    }

    const response = await fetch(
      `${this.apiBaseUrl}/budgets/${myBudgetId}/accounts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching accounts: ${response.statusText}`);
    }

    const data: YnabAccountsResponse = await response.json();
    return data.data.accounts;
  }
}
