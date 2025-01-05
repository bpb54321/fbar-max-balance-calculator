import { Account } from "@/types/Account";
import { BaseAction } from "@/types/BaseAction";
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface State {
  accounts: Account[];
}

const AccountsContext = createContext<State | null>(null);

export enum AccountActionTypes {
  AccountAdded = "AccountAdded",
}

interface AccountAddedAction extends BaseAction {
  type: AccountActionTypes.AccountAdded;
  payload: Account;
}

export type AccountAction = AccountAddedAction;

const AccountsDispatchContext = createContext<Dispatch<AccountAction> | null>(
  null
);

function accountsReducer(state: State, action: AccountAction) {
  switch (action.type) {
    case AccountActionTypes.AccountAdded:
      const newState = {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
      console.log(newState);
      return newState;
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const initialState = {
  accounts: [],
};

interface AccountsProviderProps {
  children: ReactNode;
}

export function AccountsProvider({ children }: AccountsProviderProps) {
  const [accounts, dispatch] = useReducer(accountsReducer, initialState);

  return (
    <AccountsContext.Provider value={accounts}>
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
