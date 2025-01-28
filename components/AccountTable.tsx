import YnabService from "@/ynab-service/ynabService";

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
            <td>{account.name}</td>
            <td>
              <button>Calculate Max Balance</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
