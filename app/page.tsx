import Accounts from "@/components/Accounts";
import DefaultBudgetIdFetcher from "@/components/DefaultBudgetIdFetcher";
import MainNavigation from "@/components/MainNavigation";
import YnabAuthorization from "@/components/YnabAuthorization";

export default function Home() {
  const ynabAuthorizationUrl = `https://app.ynab.com/oauth/authorize?client_id=${process.env["YNAB_OATH_CLIENT_ID"]}&redirect_uri=${process.env["YNAB_OATH_REDIRECT_URI"]}&response_type=token`;
  return (
    <div>
      <>
        {/* Components that run side effects. */}
        <YnabAuthorization />
        <DefaultBudgetIdFetcher />
      </>
      <MainNavigation />
      <a href={ynabAuthorizationUrl}>Authorize With YNAB</a>
      <Accounts />
    </div>
  );
}
