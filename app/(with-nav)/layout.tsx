"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/MainNavigation";
import { TokenManager } from "@/services/tokenManager";
import checkTokenValidity from "@/utility-functions/checkTokenValidity";
import DefaultBudgetFetcher from "@/components/DefaultBudgetFetcher";

type NavLayoutProps = {
  children: React.ReactNode;
};

export default function NavLayout({ children }: Readonly<NavLayoutProps>) {
  const router = useRouter();

  useEffect(() => {
    const token = TokenManager.getToken();
    if (token === "") {
      router.replace("/");
      return;
    }
    checkTokenValidity(token).then((isValid) => {
      if (!isValid) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <>
      <MainNavigation />
      <DefaultBudgetFetcher />
      {children}
    </>
  );
}
