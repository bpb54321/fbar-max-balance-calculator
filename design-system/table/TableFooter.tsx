import React from 'react';

interface TableFooterProps {
  children: React.ReactNode;
}

export default function TableFooter({ 
  children
}: TableFooterProps) {
  return (
    <tfoot className="bg-muted/50">
      {children}
    </tfoot>
  );
} 