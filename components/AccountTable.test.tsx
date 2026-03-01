import { describe, it, vi, expect } from "vitest";
import { prettyDOM, render, screen } from "@testing-library/react";
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
    console.log(prettyDOM(document));

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(4); // Account name header, then 3 mock max balance years

    expect(columnHeaders[0]).toHaveTextContent("Account Name");
  });
});
