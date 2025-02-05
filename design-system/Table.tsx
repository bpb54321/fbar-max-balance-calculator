interface TableProps<K extends string> {
  columnHeaders: string[];
  rowKeys: K[];
  rowData: Array<
    {
      [key in K]: string | number;
    } & { id: string }
  >;
}

export default function Table<K extends string>({
  columnHeaders,
  rowKeys,
  rowData,
}: TableProps<K>) {
  return (
    <table className="text-sm">
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
          <tr key={row.id} className="border-b border-gray-400 last:border-b-0">
            {rowKeys.map((rowKey) => (
              <td
                key={`${row.id}-${rowKey}`}
                className="p-4 align-middle font-medium"
              >
                {row[rowKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
