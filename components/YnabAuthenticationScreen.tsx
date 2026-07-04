"use client";
import { useEffect, useState } from "react";
import Link from "@/design-system/link/Link";
import HighlightedText from "@/design-system/highlighted-text/HighlightedText";
import { TokenManager } from "@/services/tokenManager";
import checkTokenValidity from "@/utility-functions/checkTokenValidity";

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
  const [authState, setAuthState] = useState<AuthenticationState>(
    AuthenticationState.CheckingToken,
  );
  const [urlTokenProcessed, setUrlTokenProcessed] = useState(false);

  useEffect(() => {
    TokenManager.captureTokenFromUrlHash();
    // Syncing from the external URL/localStorage system, not cascading local state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrlTokenProcessed(true);
  }, []);

  useEffect(() => {
    if (!urlTokenProcessed) {
      return;
    }
    const storedToken = TokenManager.getToken();
    if (storedToken === "") {
      // Syncing from the external localStorage system, not cascading local state
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthState(AuthenticationState.TokenAbsent);
      return;
    }
    checkTokenValidity(storedToken).then((isValid) => {
      setAuthState(
        isValid
          ? AuthenticationState.TokenValid
          : AuthenticationState.TokenInvalidOrExpired,
      );
    });
  }, [urlTokenProcessed]);

  if (authState === AuthenticationState.CheckingToken) {
    return (
      <div role="status" aria-label="Checking YNAB authorization">
        Checking YNAB authorization
      </div>
    );
  }

  if (authState === AuthenticationState.TokenValid) {
    return (
      <div>
        <HighlightedText>You are authorized with YNAB.</HighlightedText>
        <Link href="/home">Next</Link>
      </div>
    );
  }

  return (
    <div>
      <HighlightedText>
        Please authorize this app to access your YNAB account.
      </HighlightedText>
      <Link href={ynabAuthorizationUrl}>Authorize YNAB</Link>
    </div>
  );
}
