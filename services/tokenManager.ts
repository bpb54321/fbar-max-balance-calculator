export class TokenManager {
  private static readonly TOKEN_KEY = "ynabAccessToken";

  static getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token === null) {
      throw new Error(
        "YNAB access token not found. Please authenticate using OAuth."
      );
    }

    return token;
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
