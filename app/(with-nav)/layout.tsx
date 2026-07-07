"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/MainNavigation";
import { TokenManager } from "@/services/tokenManager";
import checkTokenValidity from "@/utility-functions/checkTokenValidity";
import getDefaultBudgetId from "@/utility-functions/getDefaultBudgetId";
import { BudgetActionTypes, useBudgetDispatch } from "@/contexts/budgetContext";

type NavLayoutProps = {
  children: React.ReactNode;
};

export default function NavLayout({ children }: Readonly<NavLayoutProps>) {
  const router = useRouter();
  const budgetDispatch = useBudgetDispatch();

  useEffect(() => {
    const token = TokenManager.getToken();
    if (token === "") {
      router.replace("/");
      return;
    }
    checkTokenValidity(token).then((isValid) => {
      if (!isValid) {
        router.replace("/");
        return;
      }
      getDefaultBudgetId().then((defaultBudgetId) => {
        budgetDispatch({
          type: BudgetActionTypes.DefaultBudgetIdSet,
          defaultBudgetId,
        });
      });
    });
  }, [router, budgetDispatch]);

  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
}
