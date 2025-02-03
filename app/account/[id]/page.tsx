import TransactionTable from "@/components/TransactionTable";

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: accountId } = await params;

  return (
    <div>
      <h1>Account Detail Page</h1>
      <h2>Transactions</h2>
      <TransactionTable accountId={accountId} />
    </div>
  );
}
