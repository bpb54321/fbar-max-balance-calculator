import clsx from "clsx";
import Table2 from "./Table2";

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
    <Table2>
      <caption className="mt-4 text-muted-foreground">{caption}</caption>
      <thead>
        <tr className="border-b border-border">
          {columnHeaders.map((header, index) => {
            return (
              <th
                key={header}
                className={clsx(
                  "h-12",
                  "px-4",
                  "align-middle",
                  "font-medium",
                  "text-muted-foreground",
                  index === columnHeaders.length - 1
                    ? "text-right"
                    : "text-left",
                  index === 0 && "w-[100px]"
                )}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr key={row.id} className="border-b border-border">
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
          </tr>
        ))}
      </tbody>
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
    </Table2>
  );
}
