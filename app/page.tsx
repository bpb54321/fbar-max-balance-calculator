import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
import BankConnectionsDisplay from "./components/BankConnectionsDisplay";

export default async function Home() {
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

  const request = {
    user: {
      client_user_id: "user-id",
    },
    client_name: "FBAR Max Balance Calculator",
    products: [Products.Transactions],
    transactions: {
      days_requested: 90,
    },
    country_codes: [CountryCode.Ca],
    language: "en",
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    console.log(linkToken);
    return <BankConnectionsDisplay linkToken={linkToken} />;
  } catch (error) {
    console.log("In catch");
    console.error(error);
    return <p>Server error: {JSON.stringify(error)}</p>;
  }
}
