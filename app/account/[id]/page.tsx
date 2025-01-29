export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Account Detail Page</h1>
      <h2>Account Id</h2>
      <p>{id}</p>
    </div>
  );
}
