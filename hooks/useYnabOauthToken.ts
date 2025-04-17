import { useEffect } from "react";

export default function useYnabOauthToken() {
  useEffect(() => {
    // Get the hash portion of the URL (excluding the # symbol)
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    const token = searchParams.get("access_token");
    console.log(token);
  }, []);
}
