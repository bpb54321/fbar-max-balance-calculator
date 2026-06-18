"use client";

import { BudgetActionTypes, useBudgetDispatch } from "@/contexts/budgetContext";
import getDefaultBudget from "@/utility-functions/getDefaultBudget";
import { useEffect, useState } from "react";

interface YnabError {
  error: {
    id: string;
    name: string;
    detail: string;
  };
}

export default function DefaultBudgetFetcher() {
  const [invalidTokenError, setInvalidTokenError] = useState<YnabError | null>(
    null
  );
  const budgetDispatch = useBudgetDispatch();
  useEffect(() => {
    const updateBudget = async () => {
      try {
        const { id, currencyIsoCode } = await getDefaultBudget();
        budgetDispatch({
          type: BudgetActionTypes.DefaultBudgetSet,
          defaultBudgetId: id,
          defaultBudgetCurrencyIsoCode: currencyIsoCode,
        });
      } catch (e) {
        setInvalidTokenError(e as YnabError);
      }
    };
    updateBudget();
  }, [budgetDispatch]);

  if (invalidTokenError) {
    return (
      <p className="mt-2 mb-2 text-red-600">
        There was an error retrieving information from YNAB. Please click on the
        preceding link to reauthorize the connection to YNAB.
      </p>
    );
  }
  return null;
}
