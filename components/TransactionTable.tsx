"use client";
import getMaxBalances from "@/calculation-functions/getMaxBalances";
import getTransactionsWithBalances from "@/calculation-functions/getTransactionsWithBalances";
import {
  AccountActionTypes,
  useAccount,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import Button from "@/design-system/button/Button";
import Caption from "@/design-system/table/Caption";
import { TextAlignment } from "@/design-system/table/enums";
import Table from "@/design-system/table/Table";
import TableBody from "@/design-system/table/TableBody";
import TableBodyCell from "@/design-system/table/TableBodyCell";
import TableHeader from "@/design-system/table/TableHeader";
import TableHeaderCell from "@/design-system/table/TableHeaderCell";
import TableRow from "@/design-system/table/TableRow";
import formatAmount from "@/formatters/formatAmount";
import getTransactionsForAccount from "@/utility-functions/getTransactionsForAccount";

export default function TransactionTable({ accountId }: { accountId: string }) {
  const account = useAccount(accountId);
  const { transactionsWithBalances, maxBalancesByYear } = account;
  const accountsDispatch = useAccountsDispatch();

  const handleClick = async () => {
    const transactions = await getTransactionsForAccount(
      "12345",
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
      <div className="mb-4">
        <Button onClick={handleClick}>Reload transactions</Button>
      </div>
      <Table>
        <Caption>Max Balance Transactions</Caption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Payee</TableHeaderCell>
            <TableHeaderCell>Memo</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableHeaderCell>Year of Max Balance</TableHeaderCell>
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
                  {formatAmount(transactionWithBalance.amount)}
                </TableBodyCell>
                <TableBodyCell textAlignment={TextAlignment.Right}>
                  {formatAmount(transactionWithBalance.balance)}
                </TableBodyCell>
                <TableBodyCell>{maxBalance.year}</TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Table>
        <Caption>All Transactions</Caption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Payee</TableHeaderCell>
            <TableHeaderCell>Memo</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionsWithBalances.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableBodyCell>{transaction.date}</TableBodyCell>
              <TableBodyCell>{transaction.payeeName}</TableBodyCell>
              <TableBodyCell>{transaction.memo}</TableBodyCell>
              <TableBodyCell textAlignment={TextAlignment.Right}>
                {formatAmount(transaction.amount)}
              </TableBodyCell>
              <TableBodyCell textAlignment={TextAlignment.Right}>
                {formatAmount(transaction.balance)}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
