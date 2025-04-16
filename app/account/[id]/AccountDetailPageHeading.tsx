"use client";

import { useAccount } from "@/contexts/accountsContext";
import Heading1 from "@/design-system/headings/Heading1";

export default function AccountDetailPageHeading({
  accountId,
}: {
  accountId: string;
}) {
  const account = useAccount(accountId);
  return (
    <div>
      <Heading1>Account Detail Page</Heading1>
      <p>{account.name}</p>
    </div>
  );
}
