import {
  AssetReportCreateRequest,
  Configuration,
  PlaidApi,
  PlaidEnvironments,
} from "plaid";

interface AccountPageProps {
  params: Promise<{ accountId: string }>;
  accessToken: string;
}
export default async function AccountPage({
  params,
  accessToken,
}: AccountPageProps) {
  const { accountId } = await params;

  // TODO: Move the plaidClient to Context and reuse the same plaidClient.
  const configuration = new Configuration({
    basePath: PlaidEnvironments.production,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  });

  const plaidClient = new PlaidApi(configuration);

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
