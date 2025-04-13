import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <table className="text-sm w-full caption-bottom" data-testid="table">
      {children}
    </table>
  );
}
