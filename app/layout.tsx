import Providers from "@/components/Providers";
import "@/css/output.css";
import type { Metadata } from "next";

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
    <html lang="en" className={`font-sans antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
