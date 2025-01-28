import { describe, expect, test, vi } from "vitest";
import YnabService, { YnabAccountsResponse } from "./ynabService";
import { YnabAccountType } from "@/types/YnabAccount";
import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";

const fetchMock = vi.fn(getMockFetchImplementation<object>({}));
vi.stubGlobal("fetch", fetchMock);

describe("YnabService", () => {
  describe("getAccounts", () => {
    test("gets all accounts for the user and budget", async () => {
      // arrange
      const mockAccounts = [
        {
          id: "1234-5678-9011",
          name: "My Checking Account",
          type: YnabAccountType.Checking,
        },
        {
          id: "97be-aabb-5566",
          name: "My Savings Account",
          type: YnabAccountType.Savings,
        },
      ];
      const mockAccountData = {
        data: {
          accounts: mockAccounts,
        },
      };
      fetchMock.mockImplementation(
        getMockFetchImplementation<YnabAccountsResponse>(mockAccountData)
      );

      const ynabService = new YnabService();

      // act
      const mockYnabBudgetId = "12345";
      const accounts = await ynabService.getAccounts(mockYnabBudgetId);

      // assert
      expect(accounts).toEqual(mockAccounts);
    });
  });
});
