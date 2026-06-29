import { describe, it, expect, beforeEach } from "vitest";
import { TokenManager } from "./tokenManager";

describe("TokenManager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("hasToken", () => {
    it("returns false when no token is stored", () => {
      expect(TokenManager.hasToken()).toBe(false);
    });

    it("returns true when a token is stored", () => {
      localStorage.setItem("ynabAccessToken", "test-token");
      expect(TokenManager.hasToken()).toBe(true);
    });
  });
});
