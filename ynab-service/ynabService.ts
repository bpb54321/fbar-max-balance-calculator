import { YnabAccount } from "@/types/YnabAccount";

export interface YnabAccountsResponse {
  data: {
    accounts: YnabAccount[];
  };
}

export default class YnabService {
  private apiBaseUrl = "https://api.ynab.com/v1";
  private ynabBearerToken: string;

  constructor() {
    if (process.env.NODE_ENV === "test") {
      this.ynabBearerToken = "test-token";
    } else {
      const ynabBearerToken = process.env.YNAB_BEARER_TOKEN;

      if (!ynabBearerToken) {
        throw new Error("YNAB_BEARER_TOKEN not defined in env variables");
      }
      this.ynabBearerToken = ynabBearerToken;
    }
  }

  async getAccounts(ynabBudgetId: string): Promise<YnabAccount[]> {
    const response = await fetch(
      `${this.apiBaseUrl}/budgets/${ynabBudgetId}/accounts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.ynabBearerToken}`,
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
