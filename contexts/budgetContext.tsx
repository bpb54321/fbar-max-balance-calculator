"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BaseAction } from "@/types/BaseAction";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface State {
  defaultBudgetId: string;
  defaultBudgetCurrencyIsoCode: string;
}

export enum BudgetActionTypes {
  DefaultBudgetSet = "DefaultBudgetSet",
  StateLoadedFromStorage = "StateLoadedFromStorage",
}

interface DefaultBudgetSetAction extends BaseAction {
  type: BudgetActionTypes.DefaultBudgetSet;
  defaultBudgetId: string;
  defaultBudgetCurrencyIsoCode: string;
}

interface StateLoadedFromStorageAction extends BaseAction {
  type: BudgetActionTypes.StateLoadedFromStorage;
  loadedState: State;
}

export type BudgetAction =
  | DefaultBudgetSetAction
  | StateLoadedFromStorageAction;

const StateContext = createContext<State | null>(null);

const DispatchContext = createContext<Dispatch<BudgetAction> | null>(null);

function budgetReducer(state: State, action: BudgetAction): State {
  switch (action.type) {
    case BudgetActionTypes.DefaultBudgetSet:
      return {
        defaultBudgetId: action.defaultBudgetId,
        defaultBudgetCurrencyIsoCode: action.defaultBudgetCurrencyIsoCode,
      };
    case BudgetActionTypes.StateLoadedFromStorage:
      return action.loadedState;
    default:
      throw Error("Unknown action");
  }
}

const initialState: State = {
  defaultBudgetId: "",
  defaultBudgetCurrencyIsoCode: "",
};

interface BudgetProviderProps {
  children: ReactNode;
}

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const loadStateFromStorage = useCallback(
    (storedState: State) => {
      dispatch({
        type: BudgetActionTypes.StateLoadedFromStorage,
        loadedState: storedState,
      });
    },
    [dispatch]
  );
  useLocalStorage("budgetState", state, loadStateFromStorage);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useBudgetState() {
  const budgetState = useContext(StateContext);
  if (budgetState === null) {
    throw new Error("this hook must be used within a Provider");
  }
  return budgetState;
}

export function useBudgetDispatch() {
  const dispatch = useContext(DispatchContext);
  if (dispatch === null) {
    throw new Error("this hook must be used within a Provider");
  }
  return dispatch;
}

// Selectors
