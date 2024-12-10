import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export interface PlaidItem {
  publicToken: string;
  metadata: PlaidLinkOnSuccessMetadata;
}

type PlaidItemContextState = PlaidItem[];

export enum PlaidItemActionType {
  ItemAdded,
}

interface ItemAddedAction {
  type: PlaidItemActionType;
  item: PlaidItem;
}

type ItemContextAction = ItemAddedAction;

const ItemContext = createContext<PlaidItemContextState>([]);
const ItemDispatcherContext = createContext<Dispatch<ItemAddedAction>>(
  () => {}
);

const reducer = (state: PlaidItemContextState, action: ItemContextAction) => {
  switch (action.type) {
    case PlaidItemActionType.ItemAdded:
      return [...state, action.item];
  }
};

export const ItemContextProvider = ({ children }: { children: ReactNode }) => {
  const [plaidItems, dispatch] = useReducer(reducer, []);
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
