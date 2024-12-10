import Link from "next/link";
import { BankConnection } from "./BankConnectionsDisplay";

interface AccountListProps {
  bankConnections: BankConnection[];
}

export default function AccountList({ bankConnections }: AccountListProps) {
  return (
    <>
      <h2>Connected Accounts</h2>
      {bankConnections.map((bankConnection) => (
        <div key={bankConnection.metadata.institution?.institution_id}>
          <h3>{bankConnection.metadata.institution?.name}</h3>
          <h3>Accounts</h3>
          {bankConnection.metadata.accounts.map((account) => {
            return (
              <li key={account.id}>
                <Link href={`/accounts/${account.id}`}>
                  {account.name} - {account.mask} - {account.type}
                </Link>
              </li>
            );
          })}
        </div>
      ))}
    </>
  );
}
