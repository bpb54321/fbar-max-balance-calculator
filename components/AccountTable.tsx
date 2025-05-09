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

  return (
    <div className="w-[590px]">
      <Table>
        <Caption>Accounts</Caption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Account Name</TableHeaderCell>
            <TableHeaderCell>Max Balance 2022</TableHeaderCell>
            <TableHeaderCell>Max Balance 2023</TableHeaderCell>
            <TableHeaderCell>Max Balance 2024</TableHeaderCell>
            <TableHeaderCell>Max Balance 2025</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableBodyCell fontWeight={FontWeight.Medium}>
                <Link href={`/account/${account.id}`}>{account.name}</Link>
              </TableBodyCell>
              <TableBodyCell>
                {formatAmount(account.maxBalancesByYear?.["2022"]?.balance)}
              </TableBodyCell>
              <TableBodyCell>
                {formatAmount(account.maxBalancesByYear?.["2023"]?.balance)}
              </TableBodyCell>
              <TableBodyCell>
                {formatAmount(account.maxBalancesByYear?.["2024"]?.balance)}
              </TableBodyCell>
              <TableBodyCell>
                {formatAmount(account.maxBalancesByYear?.["2025"]?.balance)}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
