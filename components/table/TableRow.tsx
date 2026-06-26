import { Table as RTable } from "@radix-ui/themes";

interface TableRowProps {
  children: React.ReactNode;
}

export default function TableRow({ children }: TableRowProps) {
  return <RTable.Row>{children}</RTable.Row>;
}
