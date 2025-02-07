import { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
};

export default meta;

type RowKey = "date" | "payee" | "memo" | "amount" | "balance";
const rowKeys: RowKey[] = ["date", "payee", "memo", "amount", "balance"];
const columnHeaders = ["Date", "Payee", "Memo", "Amount", "Balance"];
const rowData = [
  {
    id: "1",
    date: "2025-02-01",
    payee: "Landlord",
    memo: "Rent check",
    amount: "2150.00",
    balance: "2850.00",
  },
  {
    id: "2",
    date: "2025-01-31",
    payee: "Employer",
    memo: "Paycheck",
    amount: "5000.00",
    balance: "5000.00",
  },
];

export const Primary: StoryObj<typeof Table<RowKey>> = {
  args: {
    columnHeaders,
    rowKeys,
    rowData,
  },
};
