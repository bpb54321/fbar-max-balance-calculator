"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import formatAmount from "@/formatters/formatAmount";
import Link from "next/link";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();

  return (
    <table>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Max Balance 2022</th>
          <th>Max Balance 2023</th>
          <th>Max Balance 2024</th>
          <th>Max Balance 2025</th>
        </tr>
      </thead>
      <tbody>
        {selectedAccounts.map((account) => (
          <tr key={account.id}>
            <td>
              <Link href={`/account/${account.id}`}>{account.name}</Link>
            </td>
            <td>
              {formatAmount(account.maxBalancesByYear?.["2022"]?.balance)}
            </td>
            <td>
              {formatAmount(account.maxBalancesByYear?.["2023"]?.balance)}
            </td>
            <td>
              {formatAmount(account.maxBalancesByYear?.["2024"]?.balance)}
            </td>
            <td>
              {formatAmount(account.maxBalancesByYear?.["2025"]?.balance)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
