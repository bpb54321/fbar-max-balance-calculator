"use client";

import {
  PlaidItemActionType,
  usePlaidItemDispatcher,
} from "@/contexts/itemContext";
import exchangePublicToken from "@/server-functions/exchangePublicToken";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

export default function PlaidLinkButton({ linkToken }: { linkToken: string }) {
  const dispatch = usePlaidItemDispatcher();

  const plaidLinkConfig: PlaidLinkOptions = {
    onSuccess: async (public_token, metadata) => {
      const { accessToken, itemId } = await exchangePublicToken(public_token);
      const newPlaidItem = {
        metadata,
        accessToken,
        itemId,
      };
      dispatch({
        type: PlaidItemActionType.ItemsAdded,
        items: [newPlaidItem],
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
