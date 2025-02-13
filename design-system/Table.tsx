import clsx from "clsx";

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
}

export default function Table<K extends string>({
  columnHeaders,
  rowKeys,
  rowData,
  footerData,
}: TableProps<K>) {
  return (
    <table className="text-sm w-full" data-testid="table">
      <thead>
        <tr className="border-b border-gray-400">
          {columnHeaders.map((header) => (
            <th
              key={header}
              className="h-12 px-4 text-left align-middle font-medium text-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr key={row.id} className="border-b border-gray-400">
            {rowKeys.map((rowKey) => (
              <td
                key={`${row.id}-${rowKey}`}
                className={clsx(
                  "p-4",
                  "font-medium",
                  "align-middle",
                  rowKey === "amount" ? "text-right" : "text-left"
                )}
              >
                {row[rowKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
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
    </table>
  );
}
