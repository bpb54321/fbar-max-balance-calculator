import { vi } from "vitest";
import { AccountType } from "ynab";
import {
  mockGetAccounts,
  mockGetBudgets,
  mockGetTransactionsByAccount,
} from "./mockFunctions";

interface YnabApi {
  accounts: { getAccounts: typeof mockGetAccounts };
  budgets: { getBudgets: typeof mockGetBudgets };
  transactions: {
    getTransactionsByAccount: typeof mockGetTransactionsByAccount;
  };
}

export const api = vi.fn(function (this: YnabApi, accessToken: string) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
  this.budgets = {
    getBudgets: mockGetBudgets,
  };
  this.transactions = {
    getTransactionsByAccount: mockGetTransactionsByAccount,
  };
});

// Re-export AccountType so its values can be used in mock data
// Must be re-exported because this file mocks out the entire 'ynab' module
// Other pure types exported by 'ynab' module are not mocked by vitest
// AccountType is an exception because its values are used, thus it is not
// purely a type, but its values are needed (AccountType.Checking, for example)
export { AccountType };
