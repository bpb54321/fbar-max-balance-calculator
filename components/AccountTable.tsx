"use client";

import { useSelectedAccounts } from "@/contexts/accountsContext";
import Table from "@/design-system/Table";
import formatAmount from "@/formatters/formatAmount";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// Sample data
type RowKey = "invoice" | "status" | "method" | "amount";
const rowKeys: RowKey[] = ["invoice", "status", "method", "amount"];
const columnHeaders = ["Invoice", "Status", "Method", "Amount"];
const rowData = [
  {
    id: uuidv4(),
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  {
    id: uuidv4(),
    invoice: "INV002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
  },
  {
    id: uuidv4(),
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    id: uuidv4(),
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  {
    id: uuidv4(),
    invoice: "INV005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
  },
  {
    id: uuidv4(),
    invoice: "INV006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$200.00",
  },
  {
    id: uuidv4(),
    invoice: "INV007",
    status: "Unpaid",
    method: "Credit Card",
    amount: "$300.00",
  },
];
const footerData = [
  {
    id: "total",
    value: "Total",
    colSpan: 3,
  },
  {
    id: "totalAmount",
    value: "$2,500.00",
    colSpan: 1,
  },
];
const caption = "A list of your recent invoices";

export default function AccountTable() {
  const selectedAccounts = useSelectedAccounts();

  return (
    <div>
      <div className="w-[590px]">
        <Table
          columnHeaders={columnHeaders}
          rowKeys={rowKeys}
          rowData={rowData}
          footerData={footerData}
          caption={caption}
        />
      </div>
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
    </div>
  );
}
