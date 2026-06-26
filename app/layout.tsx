import MainNavigation from "@/components/MainNavigation";
import Providers from "@/components/Providers";
import "@/css/output.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
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
      <body className="p-4">
        <Theme>
          <MainNavigation />
          <Providers>{children}</Providers>
        </Theme>
      </body>
    </html>
  );
}
