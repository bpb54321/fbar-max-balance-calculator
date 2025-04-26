import { api as mockYnabApi } from "@/__mocks__/ynab";
import {
  mockGetAccounts,
  mockGetBudgets,
} from "@/__mocks__/ynab/mockFunctions";
import { TokenManager } from "@/services/__mocks__/tokenManager";
import { mockAccounts } from "@/ynab-service/ynabService.test-data";
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

    const mockDefaultBudgetId = "12345";
    const mockBudgetData = {
      data: {
        default_budget: {
          id: mockDefaultBudgetId,
        },
      },
    };
    mockGetBudgets.mockResolvedValue(mockBudgetData);

    // act
    const accounts = await getAccounts();

    // assert
    expect(TokenManager.getToken).toHaveBeenCalled();
    expect(mockYnabApi).toHaveBeenCalledWith(mockYnabToken);
    expect(mockGetBudgets).toHaveBeenCalled();
    expect(mockGetAccounts).toHaveBeenCalledWith(mockDefaultBudgetId);
    expect(accounts).toEqual(mockAccounts);
  });
});
