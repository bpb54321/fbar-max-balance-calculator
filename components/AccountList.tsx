import { useAccounts } from "@/contexts/accountsContext";

export function AccountList() {
  const accountState = useAccounts();
  return (
    <div>
      <h2>Accounts</h2>
      {accountState.accounts.map((account) => (
        <h3 key={account.name}>{account.name}</h3>
      ))}
    </div>
  );
}
