import React from 'react';
import clsx from 'clsx';
import { TextAlignment } from './enums';

interface TableFooterCellProps {
  children: React.ReactNode;
  textAlignment?: TextAlignment;
  colSpan?: number;
}

export default function TableFooterCell({ 
  children, 
  textAlignment = TextAlignment.Left,
  colSpan = 1
}: TableFooterCellProps) {
  return (
    <td
      className={clsx(
        "p-4",
        "font-medium",
        "align-middle",
        textAlignment === TextAlignment.Right ? "text-right" : "text-left"
      )}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
} 