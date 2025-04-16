import React from "react";
import clsx from "clsx";
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
    <th
      className={clsx(
        "h-12",
        "px-4",
        "align-middle",
        "font-medium",
        "text-muted-foreground",
        textAlignment === TextAlignment.Right ? "text-right" : "text-left",
        fixedWidth && "w-[100px]"
      )}
    >
      {children}
    </th>
  );
}
