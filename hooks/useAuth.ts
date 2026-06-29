"use client";
import { useState, useEffect } from "react";
import { TokenManager } from "@/services/tokenManager";
import YnabService from "@/services/ynab-service/ynabService";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!TokenManager.hasToken()) {
        return;
      }
      try {
        const ynabService = new YnabService(TokenManager.getToken());

        // We don't actually need the user data, this just serves as a ping
        // to the YNAB API to verify that auth token is still valid
        await ynabService.getUser();

        setIsAuthenticated(true);
      } catch {
        // token is expired or invalid
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated };
}
