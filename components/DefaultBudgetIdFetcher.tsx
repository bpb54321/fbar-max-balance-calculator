"use client";

import { BudgetActionTypes, useBudgetDispatch } from "@/contexts/budgetContext";
import getDefaultBudgetId from "@/utility-functions/getDefaultBudgetId";
import { useEffect } from "react";

export default function DefaultBudgetIdFetcher() {
  // TODO: Move ynab token into Context so we can react to changes with it
  const budgetDispatch = useBudgetDispatch();
  useEffect(() => {
    const updateBudgetId = async () => {
      const defaultBudgetId = await getDefaultBudgetId();
      budgetDispatch({
        type: BudgetActionTypes.DefaultBudgetIdSet,
        defaultBudgetId,
      });
    };
    updateBudgetId();
  }, []);
  return null;
}
