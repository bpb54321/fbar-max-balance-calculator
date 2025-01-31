import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import { YnabTransaction } from "@/types/ynabApi/YnabTransaction";

export default function getTransactionsWithBalances(
  transactions: YnabTransaction[]
): TransactionWithBalance[] {
  let runningBalance = 0;
  const transactionsWithBalances = transactions.map(
    ({ id, date, amount, memo, payee_name: payeeName }) => {
      const currentBalance = runningBalance + amount;
      const transactionWithBalance = {
        id,
        date,
        amount,
        memo,
        payeeName,
        balance: currentBalance,
      };
      runningBalance = currentBalance;
      return transactionWithBalance;
    }
  );
  return transactionsWithBalances;
}
