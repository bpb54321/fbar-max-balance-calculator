"use client";
import React from "react";

import AccountList from "@/components/AccountList";
import { usePlaidItems } from "@/contexts/itemContext";
import PlaidLinkButton from "@/components/PlaidLinkButton";

interface PlaidLinkProps {
  linkToken: string;
}

// const BANK_CONNECTIONS_LOCAL_STORAGE_KEY = "bankConnections";

export default function ClientSideHome({ linkToken }: PlaidLinkProps) {
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

  return (
    <>
      <PlaidLinkButton linkToken={linkToken} />
      <AccountList bankConnections={plaidItems} />
    </>
  );
}
