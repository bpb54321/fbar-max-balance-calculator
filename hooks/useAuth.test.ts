import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useAuth from "./useAuth";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";

vi.mock(import("ynab"));

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("returns isAuthenticated false when no token exists", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("returns isAuthenticated true when a token exists and the YNAB API call succeeds", async () => {
    localStorage.setItem("ynabAccessToken", "test-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(mockGetUser).toHaveBeenCalled();
  });
});
