interface TableProps {
  columnHeaders: string[];
}

export default function Table({ columnHeaders }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columnHeaders.map((header) => (
            <th
              key="header"
              className="px-4 text-left align-middle font-medium text-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-02-01</td>
          <td>Landlord</td>
          <td>Rent check</td>
          <td>2150</td>
          <td>1000</td>
        </tr>
      </tbody>
    </table>
  );
}
