import clsx from "clsx";
import Table from "./Table";
import Caption from "./Caption";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableHeaderCell, { TextAlignment } from "./TableHeaderCell";
import TableBody from "./TableBody";

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
            {rowKeys.map((rowKey) => (
              <td
                key={`${row.id}-${rowKey}`}
                className={clsx(
                  "p-4",
                  rowKey === "invoice" ? "font-medium" : "font-normal",
                  "align-middle",
                  "text-foreground",
                  rowKey === "amount" ? "text-right" : "text-left"
                )}
              >
                {row[rowKey]}
              </td>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <tfoot className="bg-muted/50">
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
      </tfoot>
    </Table>
  );
}
