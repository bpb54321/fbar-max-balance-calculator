"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Account } from "@/types/Account";
import { BaseAction } from "@/types/BaseAction";
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useCallback,
} from "react";

interface State {
  accounts: Account[];
}

const AccountsContext = createContext<State | null>(null);

export enum AccountActionTypes {
  AccountAdded = "AccountAdded",
  AccountsLoadedFromStorage = "AccountsLoadedFromStorage",
  AccountSelectionStatusChanged = "AccountSelectionStatusChanged",
}

interface AccountAddedAction extends BaseAction {
  type: AccountActionTypes.AccountAdded;
  account: Account;
}

interface AccountLoadedFromStorageAction extends BaseAction {
  type: AccountActionTypes.AccountsLoadedFromStorage;
  loadedAccountState: State;
}

interface AccountSelectedStatusChangedAction extends BaseAction {
  type: AccountActionTypes.AccountSelectionStatusChanged;
  accountId: string;
  selected: boolean;
}

export type AccountAction =
  | AccountAddedAction
  | AccountLoadedFromStorageAction
  | AccountSelectedStatusChangedAction;

const AccountsDispatchContext = createContext<Dispatch<AccountAction> | null>(
  null
);

function accountsReducer(state: State, action: AccountAction) {
  switch (action.type) {
    case AccountActionTypes.AccountAdded:
      return {
        ...state,
        accounts: [...state.accounts, action.account],
      };
    case AccountActionTypes.AccountsLoadedFromStorage:
      return action.loadedAccountState;
    case AccountActionTypes.AccountSelectionStatusChanged:
      const newAccounts = state.accounts.map((account) => {
        if (account.id === action.accountId) {
          return {
            ...account,
            selected: action.selected,
          };
        } else {
          return account;
        }
      });
      return {
        ...state,
        accounts: newAccounts,
      };
    default:
      throw Error("Unknown action");
  }
}

const initialState = {
  accounts: [],
};

interface AccountsProviderProps {
  children: ReactNode;
}

export function AccountsProvider({ children }: AccountsProviderProps) {
  const [accountState, dispatch] = useReducer(accountsReducer, initialState);

  const accountStateUpdaterFunction = useCallback(
    (loadedAccountState: State) => {
      dispatch({
        type: AccountActionTypes.AccountsLoadedFromStorage,
        loadedAccountState: loadedAccountState,
      });
    },
    [dispatch]
  );
  useLocalStorage("accounts", accountState, accountStateUpdaterFunction);

  return (
    <AccountsContext.Provider value={accountState}>
      <AccountsDispatchContext.Provider value={dispatch}>
        {children}
      </AccountsDispatchContext.Provider>
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const accountsState = useContext(AccountsContext);
  if (accountsState === null) {
    throw new Error("this hook must be used within a Provider");
  }
  return accountsState;
}

export function useAccountsDispatch() {
  const dispatch = useContext(AccountsDispatchContext);
  if (dispatch === null) {
    throw new Error("this hook must be used within a Provider");
  }
  return dispatch;
}
