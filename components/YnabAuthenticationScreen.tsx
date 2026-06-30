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

export default function YnabAuthenticationScreen({
  ynabAuthorizationUrl,
}: YnabAuthenticationScreenProps) {
  const [authState, setAuthState] = useState<AuthenticationState>(
    AuthenticationState.CheckingToken,
  );
  const [ynabAuthToken, setYnabAuthToken] = useState<string | null>(
    TokenManager.getToken(),
  );

  useEffect(() => {
    if (ynabAuthToken === null) {
      setAuthState(AuthenticationState.TokenAbsent);
      return;
    }

    checkTokenValidity(ynabAuthToken).then(() => {
      setAuthState(AuthenticationState.TokenValid);
    });
  }, [ynabAuthToken]);

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
        <button>Next</button>
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
