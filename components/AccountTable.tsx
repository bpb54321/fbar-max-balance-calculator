import YnabService from "@/ynab-service/ynabService";
import Link from "next/link";

const BUDGET_ID = "8d5edad0-f487-4052-b9fe-bc0371ef0875";

export default async function AccountTable() {
  const ynabService = new YnabService();
  const accounts = await ynabService.getAccounts(BUDGET_ID);

  return (
    <table>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Max Balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>
              <Link href={`/account/${account.id}`}>{account.name}</Link>
            </td>
            <td>-</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
