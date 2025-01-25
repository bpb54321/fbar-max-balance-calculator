"use client";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { AccountsProvider } from "@/contexts/accountsContext";

import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider theme={defaultTheme}>
      <AccountsProvider>{children}</AccountsProvider>
    </Provider>
  );
}
