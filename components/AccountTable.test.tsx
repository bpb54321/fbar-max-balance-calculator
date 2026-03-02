import { describe, it, vi, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AccountTable from "./AccountTable";
import { useSelectedAccounts } from "@/contexts/accountsContext";
import { mockSelectedAccounts } from "./AccountTable.test-data";

vi.mock(import("@/contexts/accountsContext"));

describe("AccountTable", () => {
  it("dynamically adjusts to the years for which there are max balances", async () => {
    // arrange
    vi.mocked(useSelectedAccounts).mockReturnValue(mockSelectedAccounts);

    // act
    render(<AccountTable />);

    // assert
    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(4); // Account name header, then 3 mock max balance years

    expect(columnHeaders[0]).toHaveTextContent("Account Name");
    expect(columnHeaders[1]).toHaveTextContent("Max Balance 2024");
    expect(columnHeaders[2]).toHaveTextContent("Max Balance 2025");
    expect(columnHeaders[3]).toHaveTextContent("Max Balance 2026");

    const rows = screen.getAllByRole("row");
    const firstAccountRow = rows[1];
    const firstAccountCells = within(firstAccountRow).getAllByRole("cell");
    expect(firstAccountCells[0]).toHaveTextContent(
      "Wealthsimple_Checking_Account",
    );
    expect(firstAccountCells[1]).toHaveTextContent("0");
    expect(firstAccountCells[2]).toHaveTextContent("3500");
    expect(firstAccountCells[3]).toHaveTextContent("3000");
  });
});
