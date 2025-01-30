import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";
import { YnabAccountTransactionsResponse } from "@/types/ynabApi/ynabApiResponseTypes";
import { describe, expect, test, vi } from "vitest";
import { mockTransactions } from "@/ynab-service/ynabService.test-data";
import getTransactionsForAccount from "./getTransactionsForAccount";

const mockFetch = vi.fn(getMockFetchImplementation<object>({}));
vi.stubGlobal("fetch", mockFetch);

describe("getTransactionsForAccount", () => {
  test("gets all transactions since a given date", async () => {
    // arrange
    const mockTransactionData = {
      data: {
        transactions: mockTransactions,
      },
    };
    mockFetch.mockImplementation(
      getMockFetchImplementation<YnabAccountTransactionsResponse>(
        mockTransactionData
      )
    );

    // act
    const mockYnabBudgetId = "mock-budget-id";
    const mockAccountId = "mock-account-id";
    const sinceDate = "2024-01-01";
    const accountTransactions = await getTransactionsForAccount(
      mockYnabBudgetId,
      mockAccountId,
      sinceDate
    );

    // assert
    expect(accountTransactions).toEqual(mockTransactions);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.ynab.com/v1/budgets/${mockYnabBudgetId}/accounts/${mockAccountId}/transactions?since_date=${sinceDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer test-token`,
          "Content-Type": "application/json",
        },
      }
    );
  });
});
