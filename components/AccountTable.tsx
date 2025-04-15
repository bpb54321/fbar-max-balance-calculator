"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import Caption from "@/design-system/table/Caption";
import Table from "@/design-system/table/Table";
import TableHeader from "@/design-system/table/TableHeader";
import TableRow from "@/design-system/table/TableRow";
import TableHeaderCell from "@/design-system/table/TableHeaderCell";
import formatAmount from "@/formatters/formatAmount";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { FontWeight, TextAlignment } from "@/design-system/table/enums";
import TableBody from "@/design-system/table/TableBody";
import TableBodyCell from "@/design-system/table/TableBodyCell";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();

  return (
    <div className="w-[590px]">
      <Table>
        <Caption>Accounts</Caption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell key="column-header-account-name">
              Account Name
            </TableHeaderCell>
            <TableHeaderCell key="column-header-max-balance-2022">
              Max Balance 2022
            </TableHeaderCell>
            <TableHeaderCell key="column-header-max-balance-2023">
              Max Balance 2023
            </TableHeaderCell>
            <TableHeaderCell key="column-header-max-balance-2024">
              Max Balance 2024
            </TableHeaderCell>
            <TableHeaderCell key="column-header-max-balance-2025">
              Max Balance 2025
            </TableHeaderCell>
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
