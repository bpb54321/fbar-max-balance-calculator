import { ReactNode } from "react";

interface Table2Props {
  children: ReactNode;
}

export default function Table2({ children }: Table2Props) {
  return (
    <table className="text-sm w-full caption-bottom" data-testid="table">
      {children}
    </table>
  );
}
