"use client";
import { useState, useEffect } from "react";
import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export enum AuthenticationState {
  Checking = "CHECKING",
  TokenAbsent = "TOKEN_ABSENT",
  TokenInvalidOrExpired = "TOKEN_INVALID_OR_EXPIRED",
  Authenticated = "AUTHENTICATED",
}

export default function useAuth() {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>(
      TokenManager.hasToken()
        ? AuthenticationState.Checking
        : AuthenticationState.TokenAbsent,
    );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const ynabService = new YnabService(TokenManager.getToken());
        await ynabService.getUser(); // This call is made solely to check the validity of the token.
        setAuthenticationState(AuthenticationState.Authenticated);
      } catch {
        setAuthenticationState(AuthenticationState.TokenInvalidOrExpired);
      }
    };
    if (authenticationState === AuthenticationState.Checking) {
      checkAuth();
    }
  }, [authenticationState]);

  return { authenticationState };
}
