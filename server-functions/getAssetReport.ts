"use server";

import { AssetReportGetRequest, PlaidApi } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";

export default async function getAssetReport(assetReportToken: string) {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const request: AssetReportGetRequest = {
    asset_report_token: assetReportToken,
  };
  const response = await plaidClient.assetReportGet(request);
  return response.data.report;
}
