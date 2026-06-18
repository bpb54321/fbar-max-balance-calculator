import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import { describe, expect, it } from "vitest";
import getCarryForwardBalance from "./getCarryForwardBalance";

const transactions: TransactionWithBalance[] = [
  {
    id: "1",
    date: "2023-03-15",
    amount: 2000000,
    memo: "",
    payeeName: "Deposit",
    balance: 2000000,
  },
  {
    id: "2",
    date: "2024-04-20",
    amount: 500000,
    memo: "",
    payeeName: "Deposit",
    balance: 2500000,
  },
  {
    id: "3",
    date: "2025-06-10",
    amount: -300000,
    memo: "",
    payeeName: "Withdrawal",
    balance: 2200000,
  },
];

describe("getCarryForwardBalance", () => {
  it("returns the prior year-end balance for a dormant year after the account's first transaction", () => {
    expect(getCarryForwardBalance(transactions, "2026")).toBe(2200000);
  });

  it("uses the most recent in-or-before-year balance when intermediate years are dormant", () => {
    const sparse: TransactionWithBalance[] = [
      {
        id: "1",
        date: "2020-01-01",
        amount: 1000000,
        memo: "",
        payeeName: "",
        balance: 1000000,
      },
      {
        id: "2",
        date: "2024-01-01",
        amount: 500000,
        memo: "",
        payeeName: "",
        balance: 1500000,
      },
    ];
    expect(getCarryForwardBalance(sparse, "2022")).toBe(1000000);
  });

  it("returns the year's own latest balance when the year has transactions", () => {
    expect(getCarryForwardBalance(transactions, "2024")).toBe(2500000);
  });

  it("returns undefined when the year predates the account's first transaction", () => {
    expect(getCarryForwardBalance(transactions, "2022")).toBeUndefined();
  });

  it("returns undefined when there are no transactions", () => {
    expect(getCarryForwardBalance([], "2024")).toBeUndefined();
  });
});
