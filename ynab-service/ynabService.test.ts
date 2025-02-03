import { describe, expect, test, vi } from "vitest";
import YnabService from "./ynabService";
import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";
import { mockAccounts, mockTransactions } from "./ynabService.test-data";
import {
  YnabAccountsResponse,
  YnabAccountTransactionsResponse,
} from "@/types/ynabApi/ynabApiResponseTypes";

const mockFetch = vi.fn(getMockFetchImplementation<object>({}));
vi.stubGlobal("fetch", mockFetch);

describe("YnabService", () => {
  describe("getAccounts", () => {
    test("gets all accounts for the user and budget", async () => {
      // arrange
      const mockAccountData = {
        data: {
          accounts: mockAccounts,
        },
      };
      mockFetch.mockImplementation(
        getMockFetchImplementation<YnabAccountsResponse>(mockAccountData)
      );

      const ynabService = new YnabService();

      // act
      const mockYnabBudgetId = "12345";
      const accounts = await ynabService.getAccounts(mockYnabBudgetId);

      // assert
      expect(accounts).toEqual(mockAccounts);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.ynab.com/v1/budgets/${mockYnabBudgetId}/accounts`,
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
  describe("getAccountTransactions", () => {
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

      const ynabService = new YnabService();

      // act
      const mockYnabBudgetId = "mock-budget-id";
      const mockAccountId = "mock-account-id";
      const sinceDate = "2024-01-01";
      const accountTransactions = await ynabService.getAccountTransactions(
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
});
