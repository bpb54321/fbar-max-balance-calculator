import { BUDGET_ID } from "@/constants/constants";
import YnabService from "@/ynab-service/ynabService";

function roundToNearestHundredth(wholeNumberInThousandths: number) {
  const roundedNumberInHundredths = Math.round(wholeNumberInThousandths / 10);
  return roundedNumberInHundredths / 100;
}

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

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Payee</th>
          <th>Memo</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.payee_name}</td>
            <td>{transaction.memo}</td>
            <td>{roundToNearestHundredth(transaction.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
