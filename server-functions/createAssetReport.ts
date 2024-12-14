"use server";

import { AssetReportCreateRequest, PlaidApi } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";

export default async function createAssetReport(accessTokens: [string]) {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const daysRequested = 90;
  const request: AssetReportCreateRequest = {
    access_tokens: accessTokens,
    days_requested: daysRequested,
    options: {
      webhook:
        process.env.NODE_ENV === "development"
          ? process.env["SMEE_WEBHOOK_PROXY_URL"]
          : process.env["ASSET_REPORT_WEBHOOK_URL"],
    },
  };
  const response = await plaidClient.assetReportCreate(request);

  return response.data;
}
