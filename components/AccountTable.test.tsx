import { describe, it, vi, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AccountTable from "./AccountTable";
import { useSelectedAccounts } from "@/contexts/accountsContext";
import { useBudgetState } from "@/contexts/budgetContext";
import { mockSelectedAccounts } from "./AccountTable.test-data";

vi.mock(import("@/contexts/accountsContext"));
vi.mock(import("@/contexts/budgetContext"));

describe("AccountTable", () => {
  it("dynamically adjusts to the years for which there are max balances", async () => {
    // arrange
    vi.mocked(useSelectedAccounts).mockReturnValue(mockSelectedAccounts);
    vi.mocked(useBudgetState).mockReturnValue({
      defaultBudgetId: "budget-1",
      defaultBudgetCurrencyIsoCode: "GBP",
    });

    // act
    render(<AccountTable />);

    // assert
    const columnHeaders = screen.getAllByRole("columnheader");

    expect(columnHeaders[0]).toHaveTextContent("Account Name");
    expect(columnHeaders[1]).toHaveTextContent("Max Balance 2023 (GBP)");
    expect(columnHeaders[2]).toHaveTextContent("Max Balance 2024 (GBP)");
    expect(columnHeaders[3]).toHaveTextContent("Max Balance 2025 (GBP)");
    expect(columnHeaders[4]).toHaveTextContent("Max Balance 2026 (GBP)");

    const rows = screen.getAllByRole("row");
    // First account: Wealthsimple_Checking_Account
    const firstAccountRow = rows[1];
    const firstAccountCells = within(firstAccountRow).getAllByRole("cell");
    expect(firstAccountCells[0]).toHaveTextContent(
      "Wealthsimple_Checking_Account",
    );
    expect(firstAccountCells[1]).toHaveTextContent("-"); // 2023 predates first transaction (2024)
    expect(firstAccountCells[2]).toHaveTextContent("0"); // 2024 max balance
    expect(firstAccountCells[3]).toHaveTextContent("3500"); // 2025 max balance
    expect(firstAccountCells[4]).toHaveTextContent("3000"); // 2026 max balance

    // Second account: TD_Savings_Account
    const secondAccountRow = rows[2];
    const secondAccountCells = within(secondAccountRow).getAllByRole("cell");
    expect(secondAccountCells[0]).toHaveTextContent("TD_Savings_Account");
    expect(secondAccountCells[1]).toHaveTextContent("2000"); // 2023 max balance
    expect(secondAccountCells[2]).toHaveTextContent("2500"); // 2024 max balance
    expect(secondAccountCells[3]).toHaveTextContent("2200"); // 2025 max balance
    expect(secondAccountCells[4]).toHaveTextContent("2200"); // 2026 carries forward 2025 year-end balance

    // Account names render as visually-distinct hyperlinks so users see the affordance.
    const firstAccountLink = within(firstAccountRow).getByRole("link", {
      name: "Wealthsimple_Checking_Account",
    });
    expect(firstAccountLink).toHaveClass("text-blue-600");
    expect(firstAccountLink).toHaveClass("underline");
  });

  it("omits the currency suffix when the budget currency is unknown", async () => {
    vi.mocked(useSelectedAccounts).mockReturnValue(mockSelectedAccounts);
    vi.mocked(useBudgetState).mockReturnValue({
      defaultBudgetId: "",
      defaultBudgetCurrencyIsoCode: "",
    });

    render(<AccountTable />);

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders[1]).toHaveTextContent("Max Balance 2023");
    expect(columnHeaders[1].textContent).not.toContain("(");
  });
});
