export function AccountTable() {
  const accounts = [
    "Wealthsimple_Checking_Brian_CA_6360",
    "Desjardins_FHSA_Brian_CA",
  ];
  return (
    <div>
      <h2>Accounts</h2>
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
    </div>
  );
}
