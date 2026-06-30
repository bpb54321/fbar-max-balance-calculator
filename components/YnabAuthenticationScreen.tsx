import Link from "@/design-system/link/Link";

export enum AuthenticationState {
  CheckingToken = "CHECKING_TOKEN",
  TokenAbsent = "TOKEN_ABSENT",
  TokenInvalidOrExpired = "TOKEN_INVALID_OR_EXPIRED",
  TokenValid = "TOKEN_VALID",
}

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
