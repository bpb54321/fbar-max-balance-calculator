"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import Link from "next/link";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();

  return (
    <table>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Max Balance</th>
        </tr>
      </thead>
      <tbody>
        {selectedAccounts.map((selectedAccount) => (
          <tr key={selectedAccount.id}>
            <td>
              <Link href={`/account/${selectedAccount.id}`}>
                {selectedAccount.name}
              </Link>
            </td>
            <td>-</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
