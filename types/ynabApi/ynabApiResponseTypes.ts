import { YnabAccount } from "./YnabAccount";
import { YnabTransaction } from "./YnabTransaction";

export interface YnabAccountsResponse {
  data: {
    accounts: YnabAccount[];
  };
}

export interface YnabAccountTransactionsResponse {
  data: {
    transactions: YnabTransaction[];
  };
}
