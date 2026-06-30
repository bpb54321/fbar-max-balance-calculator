import YnabAuthenticationScreen from "@/components/YnabAuthenticationScreen";

export default function AuthorizationPage() {
  const ynabAuthorizationUrl = `https://app.ynab.com/oauth/authorize?client_id=${process.env["YNAB_OATH_CLIENT_ID"]}&redirect_uri=${process.env["YNAB_OATH_REDIRECT_URI"]}&response_type=token`;
  return (
    <YnabAuthenticationScreen ynabAuthorizationUrl={ynabAuthorizationUrl} />
  );
}
