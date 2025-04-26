import { YnabAccount } from "./YnabAccount";
import { YnabTransaction } from "./YnabTransaction";

// TODO: Delete these types which are now provided by the ynab sdk

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
