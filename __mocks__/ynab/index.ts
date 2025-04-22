import { vi } from "vitest";
import { mockGetAccounts } from "./mockFunctions";

export const api = vi.fn(function (
  this: { accounts: { getAccounts: typeof mockGetAccounts } },
  accessToken: string
) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
});
