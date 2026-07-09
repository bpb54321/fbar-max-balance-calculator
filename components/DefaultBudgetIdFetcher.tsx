"use client";

import {
  BudgetActionTypes,
  useBudgetDispatch,
  useBudgetState,
} from "@/contexts/budgetContext";
import getDefaultBudgetId from "@/utility-functions/getDefaultBudgetId";
import { useEffect, useState } from "react";

export default function DefaultBudgetIdFetcher() {
  const [hasError, setError] = useState<Error | null>(null);
  const budgetDispatch = useBudgetDispatch();
  const budgetState = useBudgetState();

  useEffect(() => {
    const updateBudgetId = async () => {
      try {
        const defaultBudgetId = await getDefaultBudgetId();
        budgetDispatch({
          type: BudgetActionTypes.DefaultBudgetIdSet,
          defaultBudgetId,
        });
      } catch (e) {
        setError(e as Error);
      }
    };
    updateBudgetId();
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
