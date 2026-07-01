"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/MainNavigation";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
}
