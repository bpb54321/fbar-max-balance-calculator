import MainNavigation from "@/components/MainNavigation";
import TransactionTable from "@/components/TransactionTable";
import AccountDetailPageHeading from "./AccountDetailPageHeading";
import Heading2 from "@/design-system/headings/heading2/Heading2";

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
      <div className="flex">
        <Heading2>Transactions</Heading2>
      </div>
      <TransactionTable accountId={accountId} />
    </div>
  );
}
