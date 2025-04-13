import React from 'react';

interface TableHeaderProps {
  children: React.ReactNode;
}

export default function TableHeader({ children }: TableHeaderProps) {
  return <thead>{children}</thead>;
} 