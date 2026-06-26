import { Table as RTable } from "@radix-ui/themes";

interface TableBodyProps {
  children: React.ReactNode;
}

export default function TableBody({ children }: TableBodyProps) {
  return <RTable.Body>{children}</RTable.Body>;
}
