"use client";
import { useState, useEffect } from "react";
import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export enum AuthenticationState {
  CheckingToken = "CHECKING_TOKEN",
  TokenAbsent = "TOKEN_ABSENT",
  TokenInvalidOrExpired = "TOKEN_INVALID_OR_EXPIRED",
  TokenValid = "TOKEN_VALID",
}

export default function useAuth() {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>(
      TokenManager.hasToken()
        ? AuthenticationState.CheckingToken
        : AuthenticationState.TokenAbsent,
    );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const ynabService = new YnabService(TokenManager.getToken());
        await ynabService.getUser(); // This call is made solely to check the validity of the token.
        setAuthenticationState(AuthenticationState.TokenValid);
      } catch {
        setAuthenticationState(AuthenticationState.TokenInvalidOrExpired);
      }
    };
    if (authenticationState === AuthenticationState.CheckingToken) {
      checkAuth();
    }
  }, [authenticationState]);

  return { authenticationState };
}
