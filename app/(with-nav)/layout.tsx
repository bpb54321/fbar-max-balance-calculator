import MainNavigation from "@/components/MainNavigation";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
}
