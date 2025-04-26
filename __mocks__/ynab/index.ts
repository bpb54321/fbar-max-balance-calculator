import { vi } from "vitest";
import { mockGetAccounts, mockGetBudgets } from "./mockFunctions";

interface YnabApi {
  accounts: { getAccounts: typeof mockGetAccounts };
  budgets: { getBudgets: typeof mockGetBudgets };
}

export const api = vi.fn(function (this: YnabApi, accessToken: string) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
  this.budgets = {
    getBudgets: mockGetBudgets,
  };
});
