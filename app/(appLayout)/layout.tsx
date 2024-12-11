import { Suspense } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
}
