import { describe, expect, test, vi } from "vitest";
import YnabService, { YnabAccountsResponse } from "./ynabService";
import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";
import { mockAccounts } from "./ynabService.test-data";

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
});
