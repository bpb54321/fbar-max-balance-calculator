import { Table as RTable } from "@radix-ui/themes";
import { TextAlignment } from "./enums";

interface TableHeaderCellProps {
  children: React.ReactNode;
  textAlignment?: TextAlignment;
  fixedWidth?: boolean;
}

export default function TableHeaderCell({
  children,
  textAlignment = TextAlignment.Left,
  fixedWidth = false,
}: TableHeaderCellProps) {
  return (
    <RTable.ColumnHeaderCell
      justify={textAlignment === TextAlignment.Right ? "end" : "start"}
      style={fixedWidth ? { width: "100px" } : undefined}
    >
      {children}
    </RTable.ColumnHeaderCell>
  );
}
