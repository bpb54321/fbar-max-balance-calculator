"use client";
import React from "react";

import AccountList from "@/components/AccountList";
import { usePlaidItems } from "@/contexts/itemContext";
import PlaidLinkButton from "@/components/PlaidLinkButton";

export default function ClientSideHome({ linkToken }: { linkToken: string }) {
  const plaidItems = usePlaidItems();

  return (
    <>
      <PlaidLinkButton linkToken={linkToken} />
      <AccountList bankConnections={plaidItems} />
    </>
  );
}
