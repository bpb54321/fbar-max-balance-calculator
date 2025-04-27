import {
  mockGetAccounts,
  mockGetBudgets,
  mockGetTransactionsByAccount,
} from "@/__mocks__/ynab/mockFunctions";
import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";
import { describe, expect, test, vi } from "vitest";
import YnabService from "./ynabService";
import { mockAccounts, mockTransactions } from "./ynabService.test-data";

vi.mock(import("ynab"));

// TODO: Remove fetch mock once getAccountTransactions is refactored.
const mockFetch = vi.fn(getMockFetchImplementation<object>({}));
vi.stubGlobal("fetch", mockFetch);

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
    test("gets all transactions since a given date", async () => {
      // arrange
      const mockTransactionData = {
        data: {
          transactions: mockTransactions,
        },
      };
      mockGetTransactionsByAccount.mockResolvedValue(mockTransactionData);
      const ynabService = new YnabService("test-token");

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
      expect(mockGetTransactionsByAccount).toHaveBeenCalledWith(
        mockYnabBudgetId,
        mockAccountId,
        sinceDate
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
  });
});
