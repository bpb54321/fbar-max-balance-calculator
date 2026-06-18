import Accounts from "@/components/Accounts";
import DefaultBudgetFetcher from "@/components/DefaultBudgetFetcher";
import Disclaimer from "@/components/Disclaimer";
import YnabAuthorization from "@/components/YnabAuthorization";
import Button from "@/design-system/button/Button";

export default function Home() {
  const ynabAuthorizationUrl = `https://app.ynab.com/oauth/authorize?client_id=${process.env["YNAB_OATH_CLIENT_ID"]}&redirect_uri=${process.env["YNAB_OATH_REDIRECT_URI"]}&response_type=token`;
  return (
    <div>
      <YnabAuthorization />
      <Button href={ynabAuthorizationUrl}>Authorize With YNAB</Button>
      <DefaultBudgetFetcher />
      <Accounts />
      <Disclaimer />
    </div>
  );
}
