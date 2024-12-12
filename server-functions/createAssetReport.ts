"use server";

import { AssetReportCreateRequest, PlaidApi } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";

export default async function createAssetReport(accessTokens: [string]) {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const daysRequested = 90;
  const request: AssetReportCreateRequest = {
    access_tokens: accessTokens,
    days_requested: daysRequested,
  };
  const response = await plaidClient.assetReportCreate(request);

  return response.data;
}
