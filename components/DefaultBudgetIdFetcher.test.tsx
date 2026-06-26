import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DefaultBudgetIdFetcher from "./DefaultBudgetIdFetcher";
import { BudgetProvider } from "@/contexts/budgetContext";
import { mockGetBudgets } from "@/__mocks__/ynab/mockFunctions";
import { TokenManager } from "@/services/tokenManager";

vi.mock(import("ynab"));

describe("DefaultBudgetIdFetcher", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it(
    "displays an error message when the YNAB token is empty and the component " +
      "cannot fetch the defaultBudgetId",
    async () => {
      render(
        <BudgetProvider>
          <DefaultBudgetIdFetcher />
        </BudgetProvider>,
      );

      expect(
        await screen.findByText(
          /There was an error retrieving information from YNAB/,
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText(/Using budget id:/)).not.toBeInTheDocument();
    },
  );

  it("displays the budget id when fetched", async () => {
    // arrange
    TokenManager.setToken("test-token");
    mockGetBudgets.mockResolvedValueOnce({
      data: { default_budget: { id: "abc-123" } },
    });

    // act
    render(
      <BudgetProvider>
        <DefaultBudgetIdFetcher />
      </BudgetProvider>,
    );

    // assert
    expect(screen.queryByText("Using budget id:")).not.toBeInTheDocument();
    expect(
      await screen.findByText("Using budget id: abc-123"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/There was an error retrieving information from YNAB/),
    ).not.toBeInTheDocument();
  });
});
