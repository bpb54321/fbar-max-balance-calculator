export class TokenManager {
  private static readonly TOKEN_KEY = "ynabAccessToken";
  private static readonly YNAB_TOKEN_URL_PARAM = "access_token";

  private static getTokenFromUrlHash(): string | null {
    const hash = window.location.hash.substring(1);
    const searchParams = new URLSearchParams(hash);
    return searchParams.get(this.YNAB_TOKEN_URL_PARAM);
  }

  private static clearTokenFromUrlHash(): void {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }

  static captureTokenFromUrlHash(): void {
    const tokenFromUrlHash = this.getTokenFromUrlHash();
    if (tokenFromUrlHash) {
      this.setToken(tokenFromUrlHash);
      this.clearTokenFromUrlHash();
    }
  }

  static hasToken(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY) ?? "";
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
