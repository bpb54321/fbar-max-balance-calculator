"use server";

import { ItemPublicTokenExchangeRequest, PlaidApi } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";

export default async function exchangePublicToken(publicToken: string) {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const request: ItemPublicTokenExchangeRequest = {
    public_token: publicToken,
  };

  const response = await plaidClient.itemPublicTokenExchange(request);

  const accessToken = response.data.access_token;
  const itemId = response.data.item_id;

  return { accessToken, itemId };
}
