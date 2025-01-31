import getTransactionsWithBalances from "@/calculation-functions/getTransactionsWithBalances";
import { BUDGET_ID } from "@/constants/constants";
import YnabService from "@/ynab-service/ynabService";

export default async function TransactionTable({
  accountId,
}: {
  accountId: string;
}) {
  const ynabService = new YnabService();
  const transactions = await ynabService.getAccountTransactions(
    BUDGET_ID,
    accountId,
    "2024-01-01"
  );

  const transactionsWithBalances = getTransactionsWithBalances(transactions);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Payee</th>
          <th>Memo</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactionsWithBalances.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.payeeName}</td>
            <td>{transaction.memo}</td>
            <td>{transaction.amount / 1000}</td>
            <td>{transaction.balance / 1000}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
