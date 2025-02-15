import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "@/components/Providers";
import "@/css/output.css";

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
    <html lang="en" className={`font-sans ${GeistSans.variable} antialiased`}>
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
