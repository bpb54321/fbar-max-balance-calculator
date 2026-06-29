import Link from "@/design-system/link/Link";

type YnabAuthenticationScreenProps = {
  ynabAuthorizationUrl: string;
};

export default function YnabAuthenticationScreen({
  ynabAuthorizationUrl,
}: YnabAuthenticationScreenProps) {
  return (
    <div>
      <p>Please authenticate with YNAB to use this app.</p>
      <Link href={ynabAuthorizationUrl}>Authorize with YNAB</Link>
    </div>
  );
}
