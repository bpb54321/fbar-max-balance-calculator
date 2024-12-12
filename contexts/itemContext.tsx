import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface PlaidItem {
  metadata: PlaidLinkOnSuccessMetadata;
  accessToken: string;
  itemId: string;
}

type PlaidItemContextState = PlaidItem[];

export enum PlaidItemActionType {
  ItemsAdded,
}

interface ItemsAddedAction {
  type: PlaidItemActionType;
  items: PlaidItem[];
}

type ItemContextAction = ItemsAddedAction;

const ItemContext = createContext<PlaidItemContextState>([]);
const ItemDispatcherContext = createContext<Dispatch<ItemContextAction>>(
  () => {}
);

const reducer = (state: PlaidItemContextState, action: ItemContextAction) => {
  switch (action.type) {
    case PlaidItemActionType.ItemsAdded:
      return [...state, ...action.items];
  }
};

export const ItemContextProvider = ({ children }: { children: ReactNode }) => {
  const [plaidItems, dispatch] = useReducer(reducer, []);

  const dispatchLocallyStoredPlaidItems = useCallback(
    (items: PlaidItem[]) => {
      dispatch({
        type: PlaidItemActionType.ItemsAdded,
        items,
      });
    },
    [dispatch]
  );

  useLocalStorage("plaidItems", plaidItems, dispatchLocallyStoredPlaidItems);

  return (
    <ItemContext.Provider value={plaidItems}>
      <ItemDispatcherContext.Provider value={dispatch}>
        {children}
      </ItemDispatcherContext.Provider>
    </ItemContext.Provider>
  );
};

export const usePlaidItems = () => {
  const plaidItems = useContext(ItemContext);
  return plaidItems;
};

export const usePlaidItemDispatcher = () => {
  const dispatch = useContext(ItemDispatcherContext);
  return dispatch;
};
