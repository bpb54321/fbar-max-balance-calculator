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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Memo</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Year of Max Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(maxBalancesByYear).map((maxBalance) => {
            const transactionWithBalance = transactionsWithBalances.find(
              (transaction) => transaction.id === maxBalance.transactionId
            ) ?? { date: "", payeeName: "", memo: "", amount: 0, balance: 0 };
            return (
              <tr key={maxBalance.id}>
                <td>{transactionWithBalance.date}</td>
                <td>{transactionWithBalance.payeeName}</td>
                <td>{transactionWithBalance.memo}</td>
                <td>{transactionWithBalance.amount / 1000}</td>
                <td>{transactionWithBalance.balance / 1000}</td>
                <td>{maxBalance.year}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
