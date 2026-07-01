"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/MainNavigation";
import { TokenManager } from "@/services/tokenManager";
import checkTokenValidity from "@/utility-functions/checkTokenValidity";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      {children}
    </>
  );
}
