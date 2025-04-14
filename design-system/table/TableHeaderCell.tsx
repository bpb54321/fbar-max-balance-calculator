import React from 'react';
import clsx from 'clsx';

interface TableHeaderCellProps {
  children: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}

export default function TableHeaderCell({ 
  children, 
  isLast = false, 
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
        isLast ? "text-right" : "text-left",
        isFirst && "w-[100px]"
      )}
    >
      {children}
    </th>
  );
} 