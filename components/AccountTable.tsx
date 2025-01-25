import YnabService from "@/ynab-service/ynabService";

export default async function AccountTable() {
  const ynabService = new YnabService();
  const accounts = await ynabService.getAccounts();
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
          <tr key={account}>
            <td>{account}</td>
            <td>
              <button>Calculate Max Balance</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
