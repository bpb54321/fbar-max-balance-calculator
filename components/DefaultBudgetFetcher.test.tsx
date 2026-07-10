import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DefaultBudgetFetcher from "./DefaultBudgetFetcher";
import { BudgetProvider } from "@/contexts/budgetContext";
import { mockGetPlans } from "@/__mocks__/ynab/mockFunctions";
import { TokenManager } from "@/services/tokenManager";

vi.mock(import("ynab"));

describe("DefaultBudgetFetcher", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it(
    "displays an error message when the YNAB token is empty and the component " +
      "cannot fetch the defaultBudgetId",
    async () => {
      render(
        <BudgetProvider>
          <DefaultBudgetFetcher />
        </BudgetProvider>,
      );

      expect(
        await screen.findByText(
          /There was an error retrieving the default plan id\./,
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText(/Using budget id:/)).not.toBeInTheDocument();
    },
  );

  it("displays the budget id when fetched", async () => {
    // arrange
    TokenManager.setToken("test-token");
    mockGetPlans.mockResolvedValueOnce({
      data: { default_plan: { id: "abc-123" } },
    });

    // act
    render(
      <BudgetProvider>
        <DefaultBudgetFetcher />
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
