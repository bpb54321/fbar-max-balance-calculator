import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
// import {
//   usePlaidLink,
//   PlaidLinkOptions,
//   PlaidLinkOnSuccess,
// } from "react-plaid-link";

export default function Home() {
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
      phone_number: "+1 415 5550123",
    },
    client_name: "Personal Finance App",
    products: ["transactions"],
    transactions: {
      days_requested: 730,
    },
    country_codes: ["US"],
    language: "en",
    webhook: "https://sample-web-hook.com",
    redirect_uri: "https://domainname.com/oauth-page.html",
    account_filters: {
      depository: {
        account_subtypes: ["checking", "savings"],
      },
      credit: {
        account_subtypes: ["credit card"],
      },
    },
  };
  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
  } catch (error) {
    // handle error
  }
  return <h1>Hello World!</h1>;
}
