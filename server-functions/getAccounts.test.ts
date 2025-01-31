import getMockFetchImplementation from "@/test-utilities/getMockFetchImplementation";
import { YnabAccountsResponse } from "@/types/ynabApi/ynabApiResponseTypes";
import { mockAccounts } from "@/ynab-service/ynabService.test-data";
import { describe, expect, test, vi } from "vitest";
import getAccounts from "./getAccounts";

const mockFetch = vi.fn(getMockFetchImplementation<object>({}));
vi.stubGlobal("fetch", mockFetch);

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

    // act
    const mockYnabBudgetId = "12345";
    const accounts = await getAccounts(mockYnabBudgetId);

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
