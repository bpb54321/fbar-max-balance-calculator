"use client";
import { useState } from "react";
import getMaxBalances from "@/calculation-functions/getMaxBalances";
import getTransactionsWithBalances from "@/calculation-functions/getTransactionsWithBalances";
import { BUDGET_ID } from "@/constants/constants";
import getTransactionsForAccount from "@/server-functions/getTransactionsForAccount";
import { MaxBalanceTransaction } from "@/types/MaxBalanceTransaction";
import { TransactionWithBalance } from "@/types/TransactionWithBalance";

export default function TransactionTable({ accountId }: { accountId: string }) {
  const [transactionsWithBalances, setTransactionsWithBalances] = useState<
    TransactionWithBalance[]
  >([]);
  const [maxBalances, setMaxBalances] = useState<MaxBalanceTransaction[]>([]);

  const handleClick = async () => {
    const transactions = await getTransactionsForAccount(
      BUDGET_ID,
      accountId,
      "2022-01-01"
    );
    const transactionsWithBalances = getTransactionsWithBalances(transactions);
    setTransactionsWithBalances(transactionsWithBalances);

    const maxBalances: MaxBalanceTransaction[] = getMaxBalances(
      transactionsWithBalances
    );
    setMaxBalances(maxBalances);
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
          {maxBalances.map((maxBalanceTransaction) => (
            <tr key={maxBalanceTransaction.id}>
              <td>{maxBalanceTransaction.date}</td>
              <td>{maxBalanceTransaction.payeeName}</td>
              <td>{maxBalanceTransaction.memo}</td>
              <td>{maxBalanceTransaction.amount / 1000}</td>
              <td>{maxBalanceTransaction.balance / 1000}</td>
              <td>{maxBalanceTransaction.yearOfMaxBalance}</td>
            </tr>
          ))}
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
