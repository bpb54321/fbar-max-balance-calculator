import {
  useAccount,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import { useBudgetState } from "@/contexts/budgetContext";
import { Account } from "@/types/Account";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TransactionTable from "./TransactionTable";

vi.mock(import("@/contexts/accountsContext"));
vi.mock(import("@/contexts/budgetContext"));

describe("TransactionTable", () => {
  it("appends the budget currency to the Amount and Balance column headers", () => {
    vi.mocked(useAccount).mockReturnValue(new Account("Wise EUR", "abc", true));
    vi.mocked(useAccountsDispatch).mockReturnValue(vi.fn());
    vi.mocked(useBudgetState).mockReturnValue({
      defaultBudgetId: "budget-1",
      defaultBudgetCurrencyIsoCode: "EUR",
    });

    render(<TransactionTable accountId="abc" />);

    const headers = screen.getAllByRole("columnheader");
    const headerText = headers.map((h) => h.textContent);
    expect(headerText).toContain("Amount (EUR)");
    expect(headerText).toContain("Balance (EUR)");
  });

  it("omits the suffix when the budget currency is unknown", () => {
    vi.mocked(useAccount).mockReturnValue(new Account("Anon", "abc", true));
    vi.mocked(useAccountsDispatch).mockReturnValue(vi.fn());
    vi.mocked(useBudgetState).mockReturnValue({
      defaultBudgetId: "",
      defaultBudgetCurrencyIsoCode: "",
    });

    render(<TransactionTable accountId="abc" />);

    const headers = screen.getAllByRole("columnheader");
    const headerText = headers.map((h) => h.textContent);
    expect(headerText).toContain("Amount");
    expect(headerText).toContain("Balance");
    headerText.forEach((text) => expect(text).not.toContain("("));
  });
});
