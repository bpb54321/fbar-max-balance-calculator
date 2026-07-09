import { vi } from "vitest";

export const mockGetAccounts = vi.fn();
export const mockGetPlans = vi.fn().mockResolvedValue({
  data: {
    default_plan: { id: "default-plan-id" },
    plans: [],
  },
});
export const mockGetTransactionsByAccount = vi.fn();
export const mockGetUser = vi.fn();
