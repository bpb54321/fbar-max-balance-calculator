"use client";
import React from "react";

import { usePlaidLink, PlaidLinkOptions } from "react-plaid-link";
import AccountList from "./AccountList";
import { usePlaidItemDispatcher, usePlaidItems } from "@/contexts/itemContext";
import { PlaidItemActionType } from "@/contexts/itemContext";

interface PlaidLinkProps {
  linkToken: string;
}

// const BANK_CONNECTIONS_LOCAL_STORAGE_KEY = "bankConnections";

export default function BankConnectionsDisplay({ linkToken }: PlaidLinkProps) {
  // const [bankConnections, setBankConnections] = useState<BankConnection[]>([]);
  // useEffect(() => {
  //   const savedBankConnections = window.localStorage.getItem(
  //     BANK_CONNECTIONS_LOCAL_STORAGE_KEY
  //   );
  //   if (savedBankConnections) {
  //     const parsedBankConnections = JSON.parse(
  //       savedBankConnections
  //     ) as BankConnection[];
  //     setBankConnections(parsedBankConnections);
  //   }
  // }, []);
  // useEffect(() => {
  //   window.localStorage.setItem(
  //     BANK_CONNECTIONS_LOCAL_STORAGE_KEY,
  //     JSON.stringify(bankConnections)
  //   );
  // }, [bankConnections]);

  const plaidItems = usePlaidItems();
  const dispatch = usePlaidItemDispatcher();

  const config: PlaidLinkOptions = {
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
  } = usePlaidLink(config);

  const handleLinkButtonClick = () => {
    plaidLinkOpen();
  };

  return (
    <>
      {plaidLinkReady ? (
        <div>
          <button onClick={handleLinkButtonClick}>Connect with Plaid</button>
        </div>
      ) : (
        <p>Waiting for Plaid Link to be ready</p>
      )}
      {plaidLinkError ? <p>Error: {plaidLinkError?.message}</p> : null}
      <AccountList bankConnections={plaidItems} />
    </>
  );
}
