import {
  mockGetAccounts,
  mockGetPlans,
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
      mockGetPlans.mockResolvedValueOnce({
        data: {
          plans: [{ id: mockYnabBudgetId, first_month: mockFirstMonth }],
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
      expect(mockGetPlans).toHaveBeenCalled();
      expect(mockGetTransactionsByAccount).toHaveBeenCalledWith(
        mockYnabBudgetId,
        mockAccountId,
        mockFirstMonth,
      );
    });

    test("falls back to 2000-01-01 when budget has no first_month", async () => {
      // arrange
      mockGetPlans.mockResolvedValueOnce({
        data: {
          plans: [{ id: mockYnabBudgetId, first_month: undefined }],
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
  describe("getDefaultBudget", () => {
    test("returns the default plan's id and currency iso code", async () => {
      // arrange
      const testYnabToken = "test-ynab-token";
      const ynabService = new YnabService(testYnabToken);
      const mockDefaultBudgetId = "mock default budget id";
      mockGetPlans.mockResolvedValueOnce({
        data: {
          default_plan: {
            id: mockDefaultBudgetId,
            currency_format: { iso_code: "GBP" },
          },
        },
      });

      // act
      const actualDefaultBudget = await ynabService.getDefaultBudget();

      // assert
      expect(actualDefaultBudget).toEqual({
        id: mockDefaultBudgetId,
        currencyIsoCode: "GBP",
      });
      expect(mockGetPlans).toHaveBeenCalled();
    });

    test("falls back to the first plan when no default_plan exists", async () => {
      // arrange
      const testYnabToken = "test-ynab-token";
      const ynabService = new YnabService(testYnabToken);
      const mockFirstBudgetId = "first-budget-id";
      mockGetPlans.mockResolvedValueOnce({
        data: {
          default_plan: undefined,
          plans: [
            { id: mockFirstBudgetId, currency_format: { iso_code: "EUR" } },
            { id: "second-budget-id" },
          ],
        },
      });

      // act
      const actualDefaultBudget = await ynabService.getDefaultBudget();

      // assert
      expect(actualDefaultBudget).toEqual({
        id: mockFirstBudgetId,
        currencyIsoCode: "EUR",
      });
    });

    test("falls back to empty strings when no default plan is set", async () => {
      const ynabService = new YnabService("test-ynab-token");
      mockGetPlans.mockResolvedValueOnce({ data: { plans: [] } });

      const actualDefaultBudget = await ynabService.getDefaultBudget();

      expect(actualDefaultBudget).toEqual({ id: "", currencyIsoCode: "" });
    });
  });
});
