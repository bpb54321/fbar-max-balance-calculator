"use client";
import React from "react";

import { ItemContextProvider } from "@/contexts/itemContext";
import AccountList from "@/components/AccountList";
import PlaidLinkButton from "@/components/PlaidLinkButton";

export default function ClientSideHome({ linkToken }: { linkToken: string }) {
  return (
    <ItemContextProvider>
      <PlaidLinkButton linkToken={linkToken} />
      <AccountList />
    </ItemContextProvider>
  );
}
