import { Meta, StoryObj } from "@storybook/react";
import TablePackage from "./table/TablePackage";
import { v4 as uuidv4 } from "uuid";

const meta: Meta<typeof TablePackage> = {
  title: "Table",
  component: TablePackage,
};

export default meta;

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
const caption = "A list of your recent invoices.";

export const Primary: StoryObj<typeof TablePackage<RowKey>> = {
  args: {
    columnHeaders,
    rowKeys,
    rowData,
    footerData,
    caption,
  },
  decorators: (Story) => {
    return (
      <div className="w-[590px]">
        <Story />
      </div>
    );
  },
};
