"use client";
import React, { useState } from "react";

import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";
import AccountList from "./AccountList";

interface PlaidLinkProps {
  linkToken: string;
}

export interface BankConnection {
  publicToken: string;
  metadata: PlaidLinkOnSuccessMetadata;
}

export default function PlaidLinkButton({ linkToken }: PlaidLinkProps) {
  const [bankConnections, setBankConnections] = useState<BankConnection[]>([]);
  const config: PlaidLinkOptions = {
    onSuccess: (public_token, metadata) => {
      console.log("onSuccess");
      console.log({ public_token, metadata });
      setBankConnections((bankConnections: BankConnection[]) => {
        const newBankConnection: BankConnection = {
          publicToken: public_token,
          metadata,
        };
        return [...bankConnections, newBankConnection];
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

  const { open, ready, error } = usePlaidLink(config);

  const handleLinkButtonClick = () => {
    open();
  };

  return (
    <>
      {ready ? (
        <div>
          <button onClick={handleLinkButtonClick}>Connect with Plaid</button>
        </div>
      ) : (
        <p>Waiting for Plaid Link to be ready</p>
      )}
      {error ? <p>Error: {error?.message}</p> : null}
      <AccountList bankConnections={bankConnections} />
    </>
  );
}
