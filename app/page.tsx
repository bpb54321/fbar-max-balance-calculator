import {
  Configuration,
  CountryCode,
  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
// import {
//   usePlaidLink,
//   PlaidLinkOptions,
//   PlaidLinkOnSuccess,
// } from "react-plaid-link";

export default async function Home() {
  const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  });

  const plaidClient = new PlaidApi(configuration);

  // Account filtering isn't required here, but sometimes
  // it's helpful to see an example.

  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: "user-id",
    },
    client_name: "FBAR Bax Balance Calculator",
    products: [Products.Transactions],
    transactions: {
      days_requested: 90,
    },
    country_codes: [CountryCode.Ca],
    language: "en",
    webhook: "https://sample-web-hook.com",
    redirect_uri: "https://domainname.com/oauth-page.html",
  };

  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    console.log(linkToken);
  } catch (error) {
    console.error(error);
  }
  return <h1>Hello World!</h1>;
}
