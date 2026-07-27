import { TransactionWithBalance } from "@/types/TransactionWithBalance";

/**
 * Returns the account's balance as of the end of the given year, using the
 * latest transaction with a date in or before that year. Used to render an
 * FBAR max balance for a year in which the account had no transactions —
 * an open account dormant for a year still holds its prior year-end balance.
 *
 * Returns undefined when the year predates the account's first transaction,
 * since we can't claim a balance for a year before any data exists.
 *
 * Assumes `transactionsWithBalances` is sorted ascending by date.
 */
export default function getCarryForwardBalance(
  transactionsWithBalances: TransactionWithBalance[],
  year: string,
): number | undefined {
  if (transactionsWithBalances.length === 0) {
    return undefined;
  }

  const firstYear = transactionsWithBalances[0].date.split("-")[0];
  if (year < firstYear) {
    return undefined;
  }

  let lastBalance: number | undefined = undefined;
  for (const transaction of transactionsWithBalances) {
    const transactionYear = transaction.date.split("-")[0];
    if (transactionYear <= year) {
      lastBalance = transaction.balance;
    } else {
      break;
    }
  }
  return lastBalance;
}
