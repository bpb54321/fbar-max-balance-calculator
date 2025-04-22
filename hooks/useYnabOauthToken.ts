"use client";
import { TokenManager } from "@/services/tokenManager";
import { useEffect } from "react";

const YNAB_TOKEN_URL_PARAM = "access_token";

export default function useYnabOauthToken() {
  useEffect(() => {
    // Get the hash portion of the URL (excluding the # symbol)
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const token = searchParams.get(YNAB_TOKEN_URL_PARAM);
    if (token === null) {
      return;
    }
    TokenManager.setToken(token);
  }, []);
}
