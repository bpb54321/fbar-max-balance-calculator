import MainNavigation from "@/components/MainNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
}
