export class TokenManager {
  private static readonly TOKEN_KEY = "ynabAccessToken";

  static hasToken(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
