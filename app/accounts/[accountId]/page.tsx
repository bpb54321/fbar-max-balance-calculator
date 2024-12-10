import { AssetReportCreateRequest, PlaidApi } from "plaid";
import { plaidClientConfiguration } from "@/app/config/plaidClientConfiguration";

interface AccountPageProps {
  params: Promise<{ accountId: string }>;
  accessToken: string;
}
export default async function AccountPage({
  params,
  accessToken,
}: AccountPageProps) {
  const { accountId } = await params;
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const daysRequested = 90;
  const request: AssetReportCreateRequest = {
    access_tokens: [accessToken],
    days_requested: daysRequested,
  };

  const response = await plaidClient.assetReportCreate(request);
  const assetReportId = response.data.asset_report_id;
  const assetReportToken = response.data.asset_report_token;

  return (
    <section>
      <h1>Account Page for Account {accountId}</h1>
      <p>{assetReportId}</p>
      <p>{assetReportToken}</p>
    </section>
  );
}
