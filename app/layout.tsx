import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FBAR Max Balance Calculator",
  description:
    "An app that allows you to calculate your max account balances for the Report of Foreign Bank and Financial Accounts (FBAR).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
