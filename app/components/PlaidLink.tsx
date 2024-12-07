"use client";
import React from "react";

import { usePlaidLink, PlaidLinkOptions } from "react-plaid-link";

interface PlaidLinkProps {
  linkToken: string;
}

export const PlaidLinkButton: React.FC<PlaidLinkProps> = ({ linkToken }) => {
  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance
  const config: PlaidLinkOptions = {
    onSuccess: (public_token, metadata) => {
      console.log("onSuccess");
      console.log({ public_token, metadata });
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

  const { open, exit, ready, error } = usePlaidLink(config);

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
    </>
  );
};
