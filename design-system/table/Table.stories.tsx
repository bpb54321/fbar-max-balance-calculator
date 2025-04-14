import { Meta, StoryObj } from "@storybook/react";
import TablePackage from "./TablePackage";
import { v4 as uuidv4 } from "uuid";
import Table from "./Table";
import Caption from "./Caption";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableRow from "./TableRow";
import TableHeaderCell from "./TableHeaderCell";
import TableBodyCell from "./TableBodyCell";
import TableFooterCell from "./TableFooterCell";
import TableFooterRow from "./TableFooterRow";
import { TextAlignment, FontWeight } from "./enums";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
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

export const Primary: StoryObj<typeof Table> = {
  render: () => (
    <div className="w-[590px]">
      <Table>
        <Caption>{caption}</Caption>
        <TableHeader>
          <TableRow>
            {columnHeaders.map((header, index) => (
              <TableHeaderCell
                key={header}
                textAlignment={
                  index === columnHeaders.length - 1
                    ? TextAlignment.Right
                    : TextAlignment.Left
                }
                fixedWidth={index === 0 ? 100 : null}
              >
                {header}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.id}>
              {rowKeys.map((rowKey, index) => (
                <TableBodyCell
                  key={`${row.id}-${rowKey}`}
                  textAlignment={
                    index === rowKeys.length - 1
                      ? TextAlignment.Right
                      : TextAlignment.Left
                  }
                  fontWeight={
                    index === 0 ? FontWeight.Medium : FontWeight.Normal
                  }
                >
                  {row[rowKey]}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableFooterRow>
            {footerData.map(({ id, value, colSpan }) => (
              <TableFooterCell
                key={id}
                colSpan={colSpan}
                textAlignment={
                  colSpan === 3 ? TextAlignment.Left : TextAlignment.Right
                }
              >
                {value}
              </TableFooterCell>
            ))}
          </TableFooterRow>
        </TableFooter>
      </Table>
    </div>
  )
};
