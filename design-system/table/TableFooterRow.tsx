import React from 'react';

interface TableFooterRowProps {
  children: React.ReactNode;
}

export default function TableFooterRow({ 
  children
}: TableFooterRowProps) {
  return (
    <tr>
      {children}
    </tr>
  );
} 