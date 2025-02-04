"use client";
import { AccountsProvider } from "@/contexts/accountsContext";

import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <AccountsProvider>{children}</AccountsProvider>;
}
