"use client";
import React, { useState } from "react";

import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";

interface PlaidLinkProps {
  linkToken: string;
}

interface BankConnection {
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
      <h2>Connected Accounts</h2>
      {bankConnections.map((bankConnection) => (
        <div key={bankConnection.metadata.institution?.institution_id}>
          <h3>{bankConnection.metadata.institution?.name}</h3>
          <h3>Accounts</h3>
          {bankConnection.metadata.accounts.map((account) => {
            return (
              <li key={account.id}>
                {account.name} - {account.mask} - {account.type}
              </li>
            );
          })}
        </div>
      ))}
    </>
  );
}
