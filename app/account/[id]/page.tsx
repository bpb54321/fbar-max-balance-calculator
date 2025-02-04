import MainNavigation from "@/components/MainNavigation";
import TransactionTable from "@/components/TransactionTable";
import AccountDetailPageHeading from "./AccountDetailPageHeading";

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: accountId } = await params;

  return (
    <div>
      <MainNavigation />
      <AccountDetailPageHeading accountId={accountId} />
      <h2>Transactions</h2>
      <TransactionTable accountId={accountId} />
    </div>
  );
}
