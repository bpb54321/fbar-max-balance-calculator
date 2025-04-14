import { Meta, StoryObj } from "@storybook/react";
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
const columnHeaders = [
  { rowKey: "invoice" as RowKey, displayValue: "Invoice" },
  { rowKey: "status" as RowKey, displayValue: "Status" },
  { rowKey: "method" as RowKey, displayValue: "Method" },
  { rowKey: "amount" as RowKey, displayValue: "Amount" },
];
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
const caption = "A list of your recent invoices.";

export const Primary: StoryObj<typeof Table> = {
  render: () => (
    <div className="w-[590px]">
      <Table>
        <Caption>{caption}</Caption>
        <TableHeader>
          <TableRow>
            {rowKeys.map((rowKey, index) => {
              const columnHeader = columnHeaders.find(
                (columnHeader) => columnHeader.rowKey === rowKey
              );
              return (
                <TableHeaderCell
                  key={`column-header-${rowKey}`}
                  textAlignment={
                    index === rowKeys.length - 1
                      ? TextAlignment.Right
                      : TextAlignment.Left
                  }
                  fixedWidth={index === 0 ? 100 : null}
                >
                  {columnHeader?.displayValue}
                </TableHeaderCell>
              );
            })}
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
            <TableFooterCell
              key="total"
              colSpan={3}
              textAlignment={TextAlignment.Left}
            >
              Total
            </TableFooterCell>
            <TableFooterCell
              key="totalAmount"
              colSpan={1}
              textAlignment={TextAlignment.Right}
            >
              $2,500.00
            </TableFooterCell>
          </TableFooterRow>
        </TableFooter>
      </Table>
    </div>
  ),
};
