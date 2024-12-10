"use client";

import BankConnectionsDisplay from "@/components/BankConnectionsDisplay";
import { ItemContextProvider } from "@/contexts/itemContext";

interface DashboardProps {
  linkToken: string;
}

export default function Dashboard({ linkToken }: DashboardProps) {
  return (
    <ItemContextProvider>
      <BankConnectionsDisplay linkToken={linkToken} />
    </ItemContextProvider>
  );
}
