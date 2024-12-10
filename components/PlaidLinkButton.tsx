"use client";

import {
  PlaidItemActionType,
  usePlaidItemDispatcher,
} from "@/contexts/itemContext";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

export default function PlaidLinkButton({ linkToken }: { linkToken: string }) {
  const dispatch = usePlaidItemDispatcher();

  const plaidLinkConfig: PlaidLinkOptions = {
    onSuccess: (public_token, metadata) => {
      const newPlaidItem = {
        publicToken: public_token,
        metadata,
      };
      dispatch({
        type: PlaidItemActionType.ItemAdded,
        item: newPlaidItem,
      });
    },
    onExit: (err, metadata) => {
      console.log("onExit");
      console.log({ err, metadata });
    },
    onEvent: (eventName, metadata) => {
      console.log("onEvent");
      console.log({ eventName, metadata });
    },
    token: linkToken,
  };

  const {
    open: plaidLinkOpen,
    ready: plaidLinkReady,
    error: plaidLinkError,
  } = usePlaidLink(plaidLinkConfig);

  return (
    <>
      {plaidLinkReady ? (
        <div>
          <button onClick={() => plaidLinkOpen()}>Connect with Plaid</button>
        </div>
      ) : (
        <p>Waiting for Plaid Link to be ready</p>
      )}
      {plaidLinkError ? <p>Error: {plaidLinkError?.message}</p> : null}
    </>
  );
}
