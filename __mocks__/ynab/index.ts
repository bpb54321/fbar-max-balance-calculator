import { vi } from "vitest";
import { AccountType } from "ynab";
import {
  mockGetAccounts,
  mockGetPlans,
  mockGetTransactionsByAccount,
  mockGetUser,
} from "./mockFunctions";

interface YnabApi {
  accounts: { getAccounts: typeof mockGetAccounts };
  plans: { getPlans: typeof mockGetPlans };
  transactions: {
    getTransactionsByAccount: typeof mockGetTransactionsByAccount;
  };
  user: { getUser: typeof mockGetUser };
}

export const api = vi.fn(function (this: YnabApi) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
  this.plans = {
    getPlans: mockGetPlans,
  };
  this.transactions = {
    getTransactionsByAccount: mockGetTransactionsByAccount,
  };
  this.user = {
    getUser: mockGetUser,
  };
});

// Re-export AccountType so its values can be used in mock data
// Must be re-exported because this file mocks out the entire 'ynab' module
// Other pure types exported by 'ynab' module are not mocked by vitest
// AccountType is an exception because its values are used, thus it is not
// purely a type, but its values are needed (AccountType.Checking, for example)
export { AccountType };
