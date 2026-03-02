import { api as mockYnabApi } from "@/__mocks__/ynab";
import { mockGetTransactionsByAccount } from "@/__mocks__/ynab/mockFunctions";
import { TokenManager } from "@/services/__mocks__/tokenManager";
import { mockTransactions } from "@/services/ynab-service/ynabService.test-data";
import { describe, expect, test, vi } from "vitest";
import getTransactionsForAccount from "./getTransactionsForAccount";

vi.mock(import("ynab"));
vi.mock(import("@/services/tokenManager"));

describe("getTransactionsForAccount", () => {
  test("gets all transactions for a given account", async () => {
    // arrange
    const mockYnabToken = "mock ynab token";
    TokenManager.getToken.mockReturnValue(mockYnabToken);

    const mockTransactionData = {
      data: {
        transactions: mockTransactions,
      },
    };
    mockGetTransactionsByAccount.mockResolvedValue(mockTransactionData);

    // act
    const mockYnabBudgetId = "mock-budget-id";
    const mockAccountId = "mock-account-id";
    const accountTransactions = await getTransactionsForAccount(
      mockYnabBudgetId,
      mockAccountId,
    );

    // assert
    expect(mockYnabApi).toHaveBeenCalledWith(mockYnabToken);
    expect(accountTransactions).toEqual(mockTransactions);
    expect(mockGetTransactionsByAccount).toHaveBeenCalledWith(
      mockYnabBudgetId,
      mockAccountId,
    );
  });
});
