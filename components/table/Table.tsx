import { Table as RTable } from "@radix-ui/themes";
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return <RTable.Root>{children}</RTable.Root>;
}
