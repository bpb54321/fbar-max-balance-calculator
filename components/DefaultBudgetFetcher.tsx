"use client";

import {
  BudgetActionTypes,
  useBudgetDispatch,
  useBudgetState,
} from "@/contexts/budgetContext";
import getDefaultBudget from "@/utility-functions/getDefaultBudget";
import { useEffect, useState } from "react";

export default function DefaultBudgetFetcher() {
  const [hasError, setError] = useState<Error | null>(null);
  const budgetDispatch = useBudgetDispatch();
  const budgetState = useBudgetState();

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
        setError(e as Error);
      }
    };
    updateBudget();
  }, [budgetDispatch]);

  if (hasError) {
    return (
      <p className="mt-2 mb-2 text-red-600">
        There was an error retrieving the default plan id.
      </p>
    );
  }
  if (budgetState.defaultBudgetId) {
    return (
      <p className="mt-2 mb-2">
        Using budget id: {budgetState.defaultBudgetId}
      </p>
    );
  }

  return null;
}
