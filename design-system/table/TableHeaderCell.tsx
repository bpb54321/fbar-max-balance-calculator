import React from 'react';
import clsx from 'clsx';

export enum TextAlignment {
  Left = 'left',
  Right = 'right'
}

interface TableHeaderCellProps {
  children: React.ReactNode;
  textAlignment?: TextAlignment;
  isFirst?: boolean;
}

export default function TableHeaderCell({ 
  children, 
  textAlignment = TextAlignment.Left, 
  isFirst = false 
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
        isFirst && "w-[100px]"
      )}
    >
      {children}
    </th>
  );
} 