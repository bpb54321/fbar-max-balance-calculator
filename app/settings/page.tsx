"use client";

import MainNavigation from "@/components/MainNavigation";
import {
  AccountActionTypes,
  useAccounts,
  useAccountsDispatch,
} from "@/contexts/accountsContext";
import Button from "@/design-system/button/Button";
import Heading1 from "@/design-system/headings/heading1/Heading1";
import Heading2 from "@/design-system/headings/heading2/Heading2";
import { Account } from "@/types/Account";
import getAccounts from "@/utility-functions/getAccounts";
import getDefaultBudgetId from "@/utility-functions/getDefaultBudgetId";
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
    const defaultBudgetId = await getDefaultBudgetId();
    const fetchedAccounts = await getAccounts(defaultBudgetId);
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
      <div className="flex">
        <Heading2>Accounts to Include in Analysis</Heading2>
      </div>
      <div className="mb-4">
        <Button onClick={handleClick}>Reload accounts</Button>
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
