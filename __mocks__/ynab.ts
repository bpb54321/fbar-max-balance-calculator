import { vi } from "vitest";
import { YnabAccount, YnabAccountType } from "@/types/ynabApi/YnabAccount";

// TODO: Use types from ynab package instead of our own
export const mockAccounts: YnabAccount[] = [
  {
    id: "1234-5678-9011",
    name: "My Checking Account",
    type: YnabAccountType.Checking,
  },
  {
    id: "97be-aabb-5566",
    name: "My Savings Account",
    type: YnabAccountType.Savings,
  },
];

export const mockGetAccounts = vi.fn();

export const api = vi.fn(function (
  this: { accounts: { getAccounts: typeof mockGetAccounts } },
  accessToken: string
) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
});
