"use client";

import {
  AccountActionTypes,
  useAccounts,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import { ChangeEvent } from "react";

export default function SettingsPage() {
  const { accounts } = useAccounts();
  const accountsDispatch = useAccountsDispatch();

  const handleCheckboxChange = (
    accountId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    accountsDispatch({
      type: AccountActionTypes.AccountSelectionStatusChanged,
      accountId,
      selected: event.currentTarget.checked,
    });
  };

  return (
    <div>
      <h1>Settings Page</h1>
      <h2>Accounts to Include in Analysis</h2>
      <form>
        {accounts.map((account) => (
          <div key={account.id}>
            <label htmlFor={account.id}>{account.name}</label>
            <input
              type="checkbox"
              checked={account.selected}
              onChange={(event) => handleCheckboxChange(account.id, event)}
              id={account.id}
            />
          </div>
        ))}
      </form>
    </div>
  );
}
