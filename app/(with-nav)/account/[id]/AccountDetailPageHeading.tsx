"use client";

import { useAccount } from "@/contexts/accountsContext";
import Heading1 from "@/design-system/headings/heading1/Heading1";

export default function AccountDetailPageHeading({
  accountId,
}: {
  accountId: string;
}) {
  const account = useAccount(accountId);
  return (
    <div>
      <Heading1>{account.name} - Details</Heading1>
    </div>
  );
}
