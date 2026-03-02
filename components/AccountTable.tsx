"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import Caption from "@/design-system/table/Caption";
import { FontWeight } from "@/design-system/table/enums";
import Table from "@/design-system/table/Table";
import TableBody from "@/design-system/table/TableBody";
import TableBodyCell from "@/design-system/table/TableBodyCell";
import TableHeader from "@/design-system/table/TableHeader";
import TableHeaderCell from "@/design-system/table/TableHeaderCell";
import TableRow from "@/design-system/table/TableRow";
import formatAmount from "@/formatters/formatAmount";
import Link from "next/link";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();

  if (selectedAccounts.length === 0) {
    return null;
  }

  // derive a sorted list of years from all accounts' maxBalancesByYear keys
  const allYearsFromAccounts = selectedAccounts.flatMap((a) =>
    a.maxBalancesByYear ? Object.keys(a.maxBalancesByYear) : [],
  );
  const uniqueYears = Array.from(new Set(allYearsFromAccounts));
  const sortedYears = uniqueYears.sort((a, b) => Number(a) - Number(b));

  return (
    <Table>
      <Caption>Accounts</Caption>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Account Name</TableHeaderCell>
          {sortedYears.map((year) => (
            <TableHeaderCell key={year}>Max Balance {year}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedAccounts.map((account) => (
          <TableRow key={account.id}>
            <TableBodyCell fontWeight={FontWeight.Medium}>
              <Link href={`/account/${account.id}`}>{account.name}</Link>
            </TableBodyCell>
            {sortedYears.map((year) => (
              <TableBodyCell key={year}>
                {formatAmount(account.maxBalancesByYear?.[year]?.balance)}
              </TableBodyCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
