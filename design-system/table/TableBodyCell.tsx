import { Table as RTable } from "@radix-ui/themes";
import { TextAlignment, FontWeight } from "./enums";

interface TableBodyCellProps {
  children: React.ReactNode;
  textAlignment?: TextAlignment;
  fontWeight?: FontWeight;
}

export default function TableBodyCell({
  children,
  textAlignment = TextAlignment.Left,
  fontWeight = FontWeight.Normal,
}: TableBodyCellProps) {
  return (
    <RTable.Cell
      justify={textAlignment === TextAlignment.Right ? "end" : "start"}
      className={fontWeight === FontWeight.Medium ? "font-medium" : ""}
    >
      {children}
    </RTable.Cell>
  );
}
