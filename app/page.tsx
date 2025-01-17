"use client";
import { AccountCreationForm } from "@/components/AccountCreationForm";
import { AccountList } from "@/components/AccountList";
import { AccountsProvider } from "@/contexts/accountsContext";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

export default function Home() {
  return (
    <Provider theme={defaultTheme}>
      <AccountsProvider>
        <AccountCreationForm />
        <AccountList />
      </AccountsProvider>
    </Provider>
  );
}
