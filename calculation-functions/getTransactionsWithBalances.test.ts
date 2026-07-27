import { describe, expect, it } from "vitest";
import { TransactionDetail, TransactionClearedStatus } from "ynab";
import getTransactionsWithBalances from "./getTransactionsWithBalances";

function makeTransaction(
  partial: Partial<TransactionDetail> & { id: string; date: string; amount: number },
): TransactionDetail {
  return {
    id: partial.id,
    date: partial.date,
    amount: partial.amount,
    memo: partial.memo ?? "",
    cleared: partial.cleared ?? TransactionClearedStatus.Cleared,
    approved: partial.approved ?? true,
    deleted: partial.deleted ?? false,
    account_id: partial.account_id ?? "acct",
    account_name: partial.account_name ?? "Account",
    payee_name: partial.payee_name ?? null,
    subtransactions: partial.subtransactions ?? [],
  } as TransactionDetail;
}

describe("getTransactionsWithBalances", () => {
  it("sorts ascending by date so the running balance is chronological even if the API returns newest first", () => {
    const transactions = [
      makeTransaction({ id: "b", date: "2024-06-01", amount: -200000 }),
      makeTransaction({ id: "a", date: "2024-01-01", amount: 1000000 }),
    ];

    const result = getTransactionsWithBalances(transactions);

    expect(result.map((t) => t.id)).toEqual(["a", "b"]);
    expect(result.map((t) => t.balance)).toEqual([1000000, 800000]);
  });

  it("captures the intra-day peak when an inflow and outflow share a date (Wise scenario)", () => {
    // YNAB does not expose intra-day timestamps. If a 5,000 EUR inflow and a
    // 5,000 EUR outflow share a date, the API may return them in either order.
    // Sorting inflows-first on a tie ensures the running balance reflects the
    // day's peak (5,000) rather than a transient negative low.
    const transactions = [
      makeTransaction({ id: "outflow", date: "2024-03-15", amount: -5000000 }),
      makeTransaction({ id: "inflow", date: "2024-03-15", amount: 5000000 }),
    ];

    const result = getTransactionsWithBalances(transactions);

    expect(result.map((t) => t.id)).toEqual(["inflow", "outflow"]);
    expect(result.map((t) => t.balance)).toEqual([5000000, 0]);
    // The peak balance is captured in a transaction's post-balance.
    expect(Math.max(...result.map((t) => t.balance))).toBe(5000000);
  });

  it("does not mutate the input array", () => {
    const transactions = [
      makeTransaction({ id: "b", date: "2024-06-01", amount: -200000 }),
      makeTransaction({ id: "a", date: "2024-01-01", amount: 1000000 }),
    ];
    const originalOrder = transactions.map((t) => t.id);

    getTransactionsWithBalances(transactions);

    expect(transactions.map((t) => t.id)).toEqual(originalOrder);
  });
});
