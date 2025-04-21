"use client";
import { AccountsProvider } from "@/contexts/accountsContext";
import { BudgetProvider } from "@/contexts/budgetContext";

import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AccountsProvider>
      <BudgetProvider>{children}</BudgetProvider>
    </AccountsProvider>
  );
}
