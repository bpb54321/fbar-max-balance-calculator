import { CountryCode, PlaidApi, Products } from "plaid";
import { plaidClientConfiguration } from "@/config/plaidClientConfiguration";
import BankConnectionsDisplay from "@/components/BankConnectionsDisplay";

export default async function Home() {
  const plaidClient = new PlaidApi(plaidClientConfiguration);

  const linkTokenRequest = {
    user: {
      client_user_id: "user-id",
    },
    client_name: "FBAR Max Balance Calculator",
    products: [Products.Assets],
    country_codes: [CountryCode.Ca],
    language: "en",
  };

  const response = await plaidClient.linkTokenCreate(linkTokenRequest);
  const linkToken = response.data.link_token;
  return <BankConnectionsDisplay linkToken={linkToken} />;
}
