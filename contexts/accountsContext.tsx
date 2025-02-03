"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BaseAction } from "@/types/BaseAction";
import { MaxBalancesByYear } from "@/types/MaxBalanceTransaction";
import { NewAccount } from "@/types/NewAccount";
import { TransactionWithBalance } from "@/types/TransactionWithBalance";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface State {
  accounts: NewAccount[];
}

const AccountsContext = createContext<State | null>(null);

export enum AccountActionTypes {
  AccountAdded = "AccountAdded",
  AccountsLoadedFromStorage = "AccountsLoadedFromStorage",
  AccountSelectionStatusChanged = "AccountSelectionStatusChanged",
  TransactionsLoaded = "TransactionsLoaded",
  MaxBalancesCalculated = "MaxBalancesCalculated",
}

interface AccountAddedAction extends BaseAction {
  type: AccountActionTypes.AccountAdded;
  account: NewAccount;
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

interface TransactionsLoadedAction extends BaseAction {
  type: AccountActionTypes.TransactionsLoaded;
  transactionsWithBalances: TransactionWithBalance[];
  accountId: string;
}

interface MaxBalancesCalculatedAction extends BaseAction {
  type: AccountActionTypes.MaxBalancesCalculated;
  maxBalancesByYear: MaxBalancesByYear;
  accountId: string;
}

export type AccountAction =
  | AccountAddedAction
  | AccountLoadedFromStorageAction
  | AccountSelectedStatusChangedAction
  | TransactionsLoadedAction
  | MaxBalancesCalculatedAction;

const AccountsDispatchContext = createContext<Dispatch<AccountAction> | null>(
  null
);

function accountsReducer(state: State, action: AccountAction) {
  switch (action.type) {
    case AccountActionTypes.AccountAdded:
      return {
        accounts: [...state.accounts, action.account],
      };
    case AccountActionTypes.AccountsLoadedFromStorage:
      return action.loadedAccountState;
    case AccountActionTypes.AccountSelectionStatusChanged: {
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
        accounts: newAccounts,
      };
    }
    case AccountActionTypes.TransactionsLoaded: {
      const newAccounts = state.accounts.map((account) => {
        if (account.id === action.accountId) {
          return {
            ...account,
            transactionsWithBalances: action.transactionsWithBalances,
          };
        } else {
          return account;
        }
      });
      return {
        accounts: newAccounts,
      };
    }
    case AccountActionTypes.MaxBalancesCalculated: {
      const newAccounts = state.accounts.map((account) => {
        if (account.id === action.accountId) {
          return {
            ...account,
            maxBalancesByYear: action.maxBalancesByYear,
          };
        } else {
          return account;
        }
      });
      return {
        accounts: newAccounts,
      };
    }
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

// Selectors
export function useSelectedAccounts() {
  const { accounts } = useAccounts();
  return accounts.filter((account) => account.selected);
}

export function useAccount(accountId: string) {
  const { accounts } = useAccounts();
  return (
    accounts.find((account) => account.id === accountId) ?? new NewAccount()
  );
}
