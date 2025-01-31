import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import { MaxBalanceTransaction } from "@/types/MaxBalanceTransaction";

export default function getMaxBalances(
  transactions: TransactionWithBalance[]
): MaxBalanceTransaction[] {
  const maxBalances: { [year: string]: MaxBalanceTransaction } = {};

  transactions.forEach((transaction) => {
    const year = transaction.date.split("-")[0];
    if (!maxBalances[year] || transaction.balance > maxBalances[year].balance) {
      maxBalances[year] = { ...transaction, yearOfMaxBalance: year };
    }
  });

  return Object.values(maxBalances);
}
