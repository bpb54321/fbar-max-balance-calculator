import { api as mockYnabApi } from "@/__mocks__/ynab";
import { mockGetAccounts } from "@/__mocks__/ynab/mockFunctions";
import { TokenManager } from "@/services/__mocks__/tokenManager";
import { mockAccounts } from "@/services/ynab-service/ynabService.test-data";
import { describe, expect, test, vi } from "vitest";
import getAccounts from "./getAccounts";

vi.mock(import("@/services/tokenManager"));
vi.mock(import("ynab"));

describe("getAccounts", () => {
  test("gets all accounts for the user and budget", async () => {
    // arrange
    const mockYnabToken = "mock ynab token";
    TokenManager.getToken.mockReturnValue(mockYnabToken);

    const mockAccountData = {
      data: {
        accounts: mockAccounts,
      },
    };
    mockGetAccounts.mockResolvedValue(mockAccountData);

    // act
    const mockDefaultBudgetId = "12345";
    const accounts = await getAccounts(mockDefaultBudgetId);

    // assert
    expect(TokenManager.getToken).toHaveBeenCalled();
    expect(mockYnabApi).toHaveBeenCalledWith(mockYnabToken);
    expect(mockGetAccounts).toHaveBeenCalledWith(mockDefaultBudgetId);
    expect(accounts).toEqual(mockAccounts);
  });
});
