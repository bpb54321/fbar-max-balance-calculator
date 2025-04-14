import React from 'react';
import clsx from 'clsx';
import { TextAlignment, FontWeight } from './enums';

interface TableBodyCellProps {
  children: React.ReactNode;
  textAlignment?: TextAlignment;
  fontWeight?: FontWeight;
}

export default function TableBodyCell({ 
  children, 
  textAlignment = TextAlignment.Left,
  fontWeight = FontWeight.Normal
}: TableBodyCellProps) {
  return (
    <td
      className={clsx(
        "p-4",
        fontWeight === FontWeight.Medium ? "font-medium" : "font-normal",
        "align-middle",
        "text-foreground",
        textAlignment === TextAlignment.Right ? "text-right" : "text-left"
      )}
    >
      {children}
    </td>
  );
} 