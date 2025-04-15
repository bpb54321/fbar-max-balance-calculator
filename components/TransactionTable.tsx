"use client";
import getMaxBalances from "@/calculation-functions/getMaxBalances";
import getTransactionsWithBalances from "@/calculation-functions/getTransactionsWithBalances";
import { BUDGET_ID } from "@/constants/constants";
import {
  AccountActionTypes,
  useAccount,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import getTransactionsForAccount from "@/server-functions/getTransactionsForAccount";
import Table from "@/design-system/table/Table";

import TableHeader from "@/design-system/table/TableHeader";
import TableRow from "@/design-system/table/TableRow";
import TableHeaderCell from "@/design-system/table/TableHeaderCell";
import TableBody from "@/design-system/table/TableBody";
import TableBodyCell from "@/design-system/table/TableBodyCell";
import Caption from "@/design-system/table/Caption";
import { FontWeight, TextAlignment } from "@/design-system/table/enums";

export default function TransactionTable({ accountId }: { accountId: string }) {
  const account = useAccount(accountId);
  const { transactionsWithBalances, maxBalancesByYear } = account;
  const accountsDispatch = useAccountsDispatch();

  const handleClick = async () => {
    const transactions = await getTransactionsForAccount(
      BUDGET_ID,
      accountId,
      "2022-01-01"
    );

    const transactionsWithBalances = getTransactionsWithBalances(transactions);

    accountsDispatch({
      type: AccountActionTypes.TransactionsLoaded,
      transactionsWithBalances,
      accountId,
    });

    const maxBalancesByYear = getMaxBalances(
      transactionsWithBalances,
      accountId
    );

    accountsDispatch({
      type: AccountActionTypes.MaxBalancesCalculated,
      maxBalancesByYear,
      accountId,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Reload transactions</button>

      <Table>
        <Caption>Max Balances by Year</Caption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell key="column-header-date">Date</TableHeaderCell>
            <TableHeaderCell key="column-header-payee">Payee</TableHeaderCell>
            <TableHeaderCell key="column-header-memo">Memo</TableHeaderCell>
            <TableHeaderCell key="column-header-amount">Amount</TableHeaderCell>
            <TableHeaderCell key="column-header-balance">
              Balance
            </TableHeaderCell>
            <TableHeaderCell key="column-header-year">
              Year of Max Balance
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(maxBalancesByYear).map((maxBalance) => {
            const transactionWithBalance = transactionsWithBalances.find(
              (transaction) => transaction.id === maxBalance.transactionId
            ) ?? { date: "", payeeName: "", memo: "", amount: 0, balance: 0 };
            return (
              <TableRow key={maxBalance.id}>
                <TableBodyCell>{transactionWithBalance.date}</TableBodyCell>
                <TableBodyCell>
                  {transactionWithBalance.payeeName}
                </TableBodyCell>
                <TableBodyCell>{transactionWithBalance.memo}</TableBodyCell>
                <TableBodyCell textAlignment={TextAlignment.Right}>
                  {transactionWithBalance.amount / 1000}
                </TableBodyCell>
                <TableBodyCell textAlignment={TextAlignment.Right}>
                  {transactionWithBalance.balance / 1000}
                </TableBodyCell>
                <TableBodyCell>{maxBalance.year}</TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Memo</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionsWithBalances.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.payeeName}</td>
              <td>{transaction.memo}</td>
              <td>{transaction.amount / 1000}</td>
              <td>{transaction.balance / 1000}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
