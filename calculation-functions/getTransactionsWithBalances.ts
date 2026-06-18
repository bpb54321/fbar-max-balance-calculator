import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import { TransactionDetail } from "ynab";

export default function getTransactionsWithBalances(
  transactions: TransactionDetail[],
): TransactionWithBalance[] {
  // YNAB's API only exposes a date (no timestamp) and does not document
  // an order for same-date transactions. Sort ascending by date, and on a
  // tie put inflows before outflows. This captures the day's peak balance
  // in the post-transaction running balance, which the FBAR rules treat as
  // a "reasonable approximation of the greatest value" for the calendar year.
  const sorted = [...transactions].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date < b.date ? -1 : 1;
    }
    return b.amount - a.amount;
  });

  let runningBalance = 0;
  return sorted.map(({ id, date, amount, memo, payee_name: payeeName }) => {
    runningBalance += amount;
    return {
      id,
      date,
      amount,
      memo,
      payeeName,
      balance: runningBalance,
    };
  });
}
