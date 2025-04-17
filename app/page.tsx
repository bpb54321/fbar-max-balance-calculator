import Accounts from "@/components/Accounts";
import MainNavigation from "@/components/MainNavigation";

export default function Home() {
  const ynabAuthorizationUrl = `https://app.ynab.com/oauth/authorize?client_id=${process.env["YNAB_OATH_CLIENT_ID"]}&redirect_uri=${process.env["YNAB_OATH_REDIRECT_URI"]}&response_type=token`;
  return (
    <div>
      <MainNavigation />
      <a href={ynabAuthorizationUrl}>Authorize With YNAB</a>
      <Accounts />
    </div>
  );
}
