"use client";
import { ItemContextProvider } from "@/contexts/itemContext";
import { Suspense } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ItemContextProvider>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </ItemContextProvider>
  );
}
