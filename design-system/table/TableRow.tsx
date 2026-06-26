import React from 'react';

interface TableRowProps {
  children: React.ReactNode;
}

export default function TableRow({ children }: TableRowProps) {
  return (
    <tr className="border-b border-border">
      {children}
    </tr>
  );
} 