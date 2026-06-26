import { Table as RTable } from "@radix-ui/themes";

interface TableHeaderProps {
  children: React.ReactNode;
}

export default function TableHeader({ children }: TableHeaderProps) {
  return <RTable.Header>{children}</RTable.Header>;
}
