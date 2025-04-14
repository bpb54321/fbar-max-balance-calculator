import clsx from "clsx";
import Table from "./Table";
import Caption from "./Caption";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableHeaderCell from "./TableHeaderCell";
import TableBody from "./TableBody";
import TableBodyCell from "./TableBodyCell";
import TableFooter from "./TableFooter";
import { TextAlignment, FontWeight } from "./enums";

interface FooterDataCell {
  id: string;
  value: string;
  colSpan: number;
}
interface TableProps<K extends string> {
  columnHeaders: string[];
  rowKeys: K[];
  rowData: Array<
    {
      [key in K]: string;
    } & { id: string }
  >;
  footerData: FooterDataCell[];
  caption: string;
}

export default function TablePackage<K extends string>({
  columnHeaders,
  rowKeys,
  rowData,
  footerData,
  caption,
}: TableProps<K>) {
  return (
    <Table>
      <Caption>{caption}</Caption>
      <TableHeader>
        <TableRow>
          {columnHeaders.map((header, index) => {
            return (
              <TableHeaderCell
                key={header}
                textAlignment={index === columnHeaders.length - 1 ? TextAlignment.Right : TextAlignment.Left}
                fixedWidth={index === 0 ? 100 : null}
              >
                {header}
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
                textAlignment={index === rowKeys.length - 1 ? TextAlignment.Right : TextAlignment.Left}
                fontWeight={index === 0 ? FontWeight.Medium : FontWeight.Normal}
              >
                {row[rowKey]}
              </TableBodyCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <tr>
          {footerData.map(({ id, value, colSpan }) => (
            <td
              className={clsx(
                "p-4",
                "font-medium",
                "align-middle",
                colSpan === 3 ? "text-left" : "text-right"
              )}
              key={id}
              colSpan={colSpan}
            >
              {value}
            </td>
          ))}
        </tr>
      </TableFooter>
    </Table>
  );
}
