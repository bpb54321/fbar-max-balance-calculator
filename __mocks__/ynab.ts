import { vi } from "vitest";

export const mockGetAccounts = vi.fn();

export const api = vi.fn(function (
  this: { accounts: { getAccounts: typeof mockGetAccounts } },
  accessToken: string
) {
  this.accounts = {
    getAccounts: mockGetAccounts,
  };
});
