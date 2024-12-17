import { CountryCode, PlaidApi, Products } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";
import ClientSideHome from "@/components/ClientSideHome";

export default async function ServerSideHome() {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const linkTokenRequest = {
    user: {
      client_user_id: "user-id",
    },
    client_name: "FBAR Max Balance Calculator",
    products: [Products.Statements],
    country_codes: [CountryCode.Ca],
    language: "en",
  };

  try {
    const response = await plaidClient.linkTokenCreate(linkTokenRequest);
    const linkToken = response.data.link_token;

    return <ClientSideHome linkToken={linkToken} />;
  } catch (error) {
    console.error(error);
  }
}
