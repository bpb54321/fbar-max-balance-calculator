"use client";

import MainNavigation from "@/components/MainNavigation";
import { BUDGET_ID } from "@/constants/constants";
import {
  AccountActionTypes,
  useAccounts,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import Heading1 from "@/design-system/headings/Heading1";
import Heading2 from "@/design-system/headings/heading2/Heading2";
import getAccounts from "@/server-functions/getAccounts";
import { Account } from "@/types/Account";
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

  const handleClick = async () => {
    const fetchedAccounts = await getAccounts(BUDGET_ID);
    accountsDispatch({
      type: AccountActionTypes.AccountsLoadedFromStorage,
      loadedAccountState: {
        accounts: fetchedAccounts.map(
          (fetchedAccount) =>
            new Account(fetchedAccount.name, fetchedAccount.id)
        ),
      },
    });
  };

  return (
    <div>
      <MainNavigation />
      <Heading1>Settings Page</Heading1>
      <button onClick={handleClick}>Reload accounts</button>
      <div className="flex">
        <Heading2>Accounts to Include in Analysis</Heading2>
      </div>
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
