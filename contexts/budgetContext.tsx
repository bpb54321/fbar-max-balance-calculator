"use client";

import { BaseAction } from "@/types/BaseAction";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface State {
  defaultBudgetId: string;
}

export enum BudgetActionTypes {
  DefaultBudgetIdSet = "DefaultBudgetIdSet",
  StateLoadedFromStorage = "StateLoadedFromStorage",
}

interface DefaultBudgetIdSetAction extends BaseAction {
  type: BudgetActionTypes.DefaultBudgetIdSet;
  defaultBudgetId: string;
}

interface StateLoadedFromStorageAction extends BaseAction {
  type: BudgetActionTypes.StateLoadedFromStorage;
  loadedState: State;
}

export type BudgetAction =
  | DefaultBudgetIdSetAction
  | StateLoadedFromStorageAction;

const StateContext = createContext<State | null>(null);

const DispatchContext = createContext<Dispatch<BudgetAction> | null>(null);

function budgetReducer(state: State, action: BudgetAction): State {
  switch (action.type) {
    case BudgetActionTypes.DefaultBudgetIdSet:
      return {
        defaultBudgetId: action.defaultBudgetId,
      };
    case BudgetActionTypes.StateLoadedFromStorage:
      return action.loadedState;
    default:
      throw Error("Unknown action");
  }
}

const initialState: State = {
  defaultBudgetId: "",
};

interface BudgetProviderProps {
  children: ReactNode;
}

const BUDGET_CONTEXT_STORAGE_KEY = "budgetState";

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const [isDataLoadedFromLocalStorage, setIsDataLoadedFromLocalStorage] =
    useState(false);

  if (!isDataLoadedFromLocalStorage) {
    if (globalThis.localStorage) {
      const locallyStoredData = globalThis.localStorage.getItem(
        BUDGET_CONTEXT_STORAGE_KEY,
      );
      if (locallyStoredData) {
        const parsedData = JSON.parse(locallyStoredData);
        dispatch({
          type: BudgetActionTypes.StateLoadedFromStorage,
          loadedState: parsedData,
        });
      }
      setIsDataLoadedFromLocalStorage(true);
    }
  }

  useEffect(() => {
    globalThis.localStorage.setItem(
      BUDGET_CONTEXT_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

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
