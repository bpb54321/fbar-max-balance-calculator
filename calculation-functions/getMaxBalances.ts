import { MaxBalancesByYear } from "@/types/MaxBalanceTransaction";
import { TransactionWithBalance } from "@/types/TransactionWithBalance";

export default function getMaxBalances(
  transactions: TransactionWithBalance[],
  accountId: string
): MaxBalancesByYear {
  const maxBalances: MaxBalancesByYear = {};

  transactions.forEach((transaction) => {
    const year = transaction.date.split("-")[0];
    if (
      maxBalances[year] === undefined ||
      transaction.balance > maxBalances[year].balance
    ) {
      maxBalances[year] = {
        id: `${accountId}-${year}`,
        transactionId: transaction.id,
        year,
        balance: transaction.balance,
      };
    }
  });

  return maxBalances;
}
