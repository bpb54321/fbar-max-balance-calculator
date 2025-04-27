"use client";

import { BudgetActionTypes, useBudgetDispatch } from "@/contexts/budgetContext";
import getDefaultBudgetId from "@/utility-functions/getDefaultBudgetId";
import { useEffect, useState } from "react";

interface YnabError {
  error: {
    id: string;
    name: string;
    detail: string;
  };
}

export default function DefaultBudgetIdFetcher() {
  const [invalidTokenError, setInvalidTokenError] = useState<YnabError | null>(
    null
  );
  const budgetDispatch = useBudgetDispatch();
  useEffect(() => {
    const updateBudgetId = async () => {
      try {
        const defaultBudgetId = await getDefaultBudgetId();
        budgetDispatch({
          type: BudgetActionTypes.DefaultBudgetIdSet,
          defaultBudgetId,
        });
      } catch (e) {
        setInvalidTokenError(e as YnabError);
      }
    };
    updateBudgetId();
  }, []);

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
