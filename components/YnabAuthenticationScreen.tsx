"use client";
import { useEffect, useState } from "react";
import Link from "@/design-system/link/Link";
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

function getYnabOauthToken() {
  const tokenFromUrlHash = TokenManager.getTokenFromUrlHash();
  if (tokenFromUrlHash) {
    return tokenFromUrlHash;
  } else {
    return TokenManager.getToken();
  }
}

export default function YnabAuthenticationScreen({
  ynabAuthorizationUrl,
}: YnabAuthenticationScreenProps) {
  const [authState, setAuthState] = useState<AuthenticationState>(
    AuthenticationState.CheckingToken,
  );

  useEffect(() => {
    const ynabAuthToken = getYnabOauthToken();

    if (ynabAuthToken === null) {
      setAuthState(AuthenticationState.TokenAbsent);
      return;
    }

    checkTokenValidity(ynabAuthToken).then((isValid) => {
      if (isValid) {
        setAuthState(AuthenticationState.TokenValid);
        TokenManager.setToken(ynabAuthToken);
      } else {
        setAuthState(AuthenticationState.TokenInvalidOrExpired);
      }
    });
  }, []);

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
        <p>You are authorized with YNAB.</p>
        <Link href="/home">Next</Link>
      </div>
    );
  }

  return (
    <div>
      <p>Please authenticate with YNAB to use this app.</p>
      <Link href={ynabAuthorizationUrl}>Authorize with YNAB</Link>
    </div>
  );
}
