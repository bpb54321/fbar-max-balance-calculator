interface AccountPageProps {
  params: Promise<{ accountId: string }>;
}
export default async function AccountPage({ params }: AccountPageProps) {
  const { accountId } = await params;
  return <h1>Account Page for Account {accountId}</h1>;
}
