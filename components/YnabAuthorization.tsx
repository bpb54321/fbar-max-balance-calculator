"use client";

import useYnabOauthToken from "@/hooks/useYnabOauthToken";

export default function YnabAuthorization() {
  useYnabOauthToken();
  return null;
}
