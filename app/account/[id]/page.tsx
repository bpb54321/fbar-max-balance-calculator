import TransactionTable from "@/components/TransactionTable";
import { Suspense } from "react";

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
      <Suspense fallback="Loading transactions">
        <TransactionTable accountId={accountId} />
      </Suspense>
    </div>
  );
}
