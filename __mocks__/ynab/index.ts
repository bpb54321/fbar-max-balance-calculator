import { vi } from "vitest";
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
