"use client";

import { useAccount } from "@/contexts/accountsContext";
import { useBudgetState } from "@/contexts/budgetContext";
import Heading1 from "@/design-system/headings/heading1/Heading1";

export default function AccountDetailPageHeading({
  accountId,
}: {
  accountId: string;
}) {
  const account = useAccount(accountId);
  const { defaultBudgetCurrencyIsoCode } = useBudgetState();
  const currencySuffix = defaultBudgetCurrencyIsoCode
    ? ` (${defaultBudgetCurrencyIsoCode})`
    : "";
  return (
    <div>
      <Heading1>
        {account.name}
        {currencySuffix} - Details
      </Heading1>
    </div>
  );
}
