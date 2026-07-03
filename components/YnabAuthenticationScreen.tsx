"use client";
import { useEffect, useState } from "react";
import Link from "@/design-system/link/Link";
import AuthenticationStatusMessage from "@/components/AuthenticationStatusMessage";
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

  useEffect(() => {
    const checkUrlAndStoredTokens = async () => {
      const tokenFromUrlHash = TokenManager.getTokenFromUrlHash();
      if (tokenFromUrlHash) {
        const isValid = await checkTokenValidity(tokenFromUrlHash);
        TokenManager.clearTokenFromUrlHash();
        if (isValid) {
          TokenManager.setToken(tokenFromUrlHash);
          setAuthState(AuthenticationState.TokenValid);
          return;
        }
      }
      const storedToken = TokenManager.getToken();
      if (storedToken === "") {
        setAuthState(AuthenticationState.TokenAbsent);
        return;
      }
      const isStoredTokenValid = await checkTokenValidity(storedToken);
      setAuthState(
        isStoredTokenValid
          ? AuthenticationState.TokenValid
          : AuthenticationState.TokenInvalidOrExpired,
      );
    };
    checkUrlAndStoredTokens();
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
        <AuthenticationStatusMessage>
          You are authorized with YNAB.
        </AuthenticationStatusMessage>
        <Link href="/home">Next</Link>
      </div>
    );
  }

  return (
    <div>
      <AuthenticationStatusMessage>
        Please authorize this app to access your YNAB account.
      </AuthenticationStatusMessage>
      <Link href={ynabAuthorizationUrl}>Authorize YNAB</Link>
    </div>
  );
}
