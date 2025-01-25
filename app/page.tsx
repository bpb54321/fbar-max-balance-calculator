"use client";
import { AccountTable } from "@/components/AccountTable";
import { AccountsProvider } from "@/contexts/accountsContext";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

export default function Home() {
  return (
    <Provider theme={defaultTheme}>
      <AccountsProvider>
        <AccountTable />
      </AccountsProvider>
    </Provider>
  );
}
