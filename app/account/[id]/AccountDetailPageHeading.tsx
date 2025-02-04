"use client";

import { useAccount } from "@/contexts/accountsContext";

export default function AccountDetailPageHeading({
  accountId,
}: {
  accountId: string;
}) {
  const account = useAccount(accountId);
  return (
    <div>
      <h1>Account Detail Page</h1>
      <p>{account.name}</p>
    </div>
  );
}
