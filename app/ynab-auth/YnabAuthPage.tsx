"use client";

import { TokenManager } from "@/services/tokenManager";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const YNAB_TOKEN_URL_PARAM = "access_token";

export default function YnabAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const token = searchParams.get(YNAB_TOKEN_URL_PARAM);
    if (token !== null) {
      TokenManager.setToken(token);
    }
    router.replace("/");
  }, [router]);

  return <p>Connecting to YNAB...</p>;
}
