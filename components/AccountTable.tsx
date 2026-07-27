"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import { useBudgetState } from "@/contexts/budgetContext";
import Caption from "@/design-system/table/Caption";
import { FontWeight } from "@/design-system/table/enums";
import Table from "@/design-system/table/Table";
import TableBody from "@/design-system/table/TableBody";
import TableBodyCell from "@/design-system/table/TableBodyCell";
import TableHeader from "@/design-system/table/TableHeader";
import TableHeaderCell from "@/design-system/table/TableHeaderCell";
import TableRow from "@/design-system/table/TableRow";
import formatAmount from "@/formatters/formatAmount";
import getCarryForwardBalance from "@/utility-functions/getCarryForwardBalance";
import Link from "next/link";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();
  const { defaultBudgetCurrencyIsoCode } = useBudgetState();

  if (selectedAccounts.length === 0) {
    return null;
  }

  // derive a sorted list of years from all accounts' maxBalancesByYear keys
  const allYearsFromAccounts = selectedAccounts.flatMap((a) =>
    a.maxBalancesByYear ? Object.keys(a.maxBalancesByYear) : [],
  );
  const uniqueYears = Array.from(new Set(allYearsFromAccounts));
  const sortedYears = uniqueYears.sort((a, b) => Number(a) - Number(b));
  const currencySuffix = defaultBudgetCurrencyIsoCode
    ? ` (${defaultBudgetCurrencyIsoCode})`
    : "";

  return (
    <Table>
      <Caption>Accounts</Caption>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Account Name</TableHeaderCell>
          {sortedYears.map((year) => (
            <TableHeaderCell key={year}>
              Max Balance {year}
              {currencySuffix}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedAccounts.map((account) => (
          <TableRow key={account.id}>
            <TableBodyCell fontWeight={FontWeight.Medium}>
              <Link
                href={`/account/${account.id}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {account.name}
              </Link>
            </TableBodyCell>
            {sortedYears.map((year) => {
              const directMax = account.maxBalancesByYear?.[year]?.balance;
              const balance =
                directMax ??
                getCarryForwardBalance(
                  account.transactionsWithBalances,
                  year,
                );
              return (
                <TableBodyCell key={year}>
                  {formatAmount(balance)}
                </TableBodyCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
