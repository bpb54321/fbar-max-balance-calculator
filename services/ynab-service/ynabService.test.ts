import {
  mockGetAccounts,
  mockGetBudgets,
  mockGetTransactionsByAccount,
} from "@/__mocks__/ynab/mockFunctions";
import { describe, expect, test, vi } from "vitest";
import YnabService from "./ynabService";
import { mockAccounts, mockTransactions } from "./ynabService.test-data";

vi.mock(import("ynab"));

describe("YnabService", () => {
  describe("getAccounts", () => {
    test("gets all accounts for the user and budget", async () => {
      // arrange
      const testYnabToken = "test-ynab-token";
      const ynabService = new YnabService(testYnabToken);
      mockGetAccounts.mockResolvedValueOnce({
        data: {
          accounts: mockAccounts,
        },
      });

      // act
      const mockYnabBudgetId = "12345";
      const accounts = await ynabService.getAccounts(mockYnabBudgetId);

      // assert
      expect(accounts).toEqual(mockAccounts);
      expect(mockGetAccounts).toHaveBeenCalledWith(mockYnabBudgetId);
    });
  });
  describe("getAccountTransactions", () => {
    const mockYnabBudgetId = "mock-budget-id";
    const mockAccountId = "mock-account-id";
    const mockTransactionData = {
      data: { transactions: mockTransactions },
    };

    test("uses the budget's first_month as the transaction start date", async () => {
      // arrange
      const mockFirstMonth = "2022-01-01";
      mockGetBudgets.mockResolvedValueOnce({
        data: {
          budgets: [{ id: mockYnabBudgetId, first_month: mockFirstMonth }],
        },
      });
      mockGetTransactionsByAccount.mockResolvedValueOnce(mockTransactionData);
      const ynabService = new YnabService("test-token");

      // act
      const accountTransactions = await ynabService.getAccountTransactions(
        mockYnabBudgetId,
        mockAccountId,
      );

      // assert
      expect(accountTransactions).toEqual(mockTransactions);
      expect(mockGetBudgets).toHaveBeenCalled();
      expect(mockGetTransactionsByAccount).toHaveBeenCalledWith(
        mockYnabBudgetId,
        mockAccountId,
        mockFirstMonth,
      );
    });

    test("falls back to 2000-01-01 when budget has no first_month", async () => {
      // arrange
      mockGetBudgets.mockResolvedValueOnce({
        data: {
          budgets: [{ id: mockYnabBudgetId, first_month: undefined }],
        },
      });
      mockGetTransactionsByAccount.mockResolvedValueOnce(mockTransactionData);
      const ynabService = new YnabService("test-token");

      // act
      await ynabService.getAccountTransactions(mockYnabBudgetId, mockAccountId);

      // assert
      expect(mockGetTransactionsByAccount).toHaveBeenCalledWith(
        mockYnabBudgetId,
        mockAccountId,
        "2000-01-01",
      );
    });
  });
  describe("getDefaultBudgetId", () => {
    test("gets the user's default budget id", async () => {
      // arrange
      const testYnabToken = "test-ynab-token";
      const ynabService = new YnabService(testYnabToken);
      const mockDefaultBudgetId = "mock default budget id";
      mockGetBudgets.mockResolvedValueOnce({
        data: {
          default_budget: { id: mockDefaultBudgetId },
        },
      });

      // act
      const actualDefaultBudgetId = await ynabService.getDefaultBudgetId();

      // assert
      expect(actualDefaultBudgetId).toEqual(mockDefaultBudgetId);
      expect(mockGetBudgets).toHaveBeenCalled();
    });

    test("returns the first budget id when no default_budget exists", async () => {
      // arrange
      const testYnabToken = "test-ynab-token";
      const ynabService = new YnabService(testYnabToken);
      const mockFirstBudgetId = "first-budget-id";
      mockGetBudgets.mockResolvedValueOnce({
        data: {
          default_budget: undefined,
          budgets: [
            { id: mockFirstBudgetId },
            { id: "second-budget-id" },
          ],
        },
      });

      // act
      const actualDefaultBudgetId = await ynabService.getDefaultBudgetId();

      // assert
      expect(actualDefaultBudgetId).toEqual(mockFirstBudgetId);
    });
  });
});
