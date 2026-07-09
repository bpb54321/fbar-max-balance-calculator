import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

// Set default mock YNAB access token
globalThis.localStorage.setItem("ynabAccessToken", "mock-ynab-access-token");

// Clear all mock history
beforeEach(() => {
  vi.clearAllMocks();
});
