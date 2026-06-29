import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useAuth, { AuthenticationState } from "./useAuth";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";

vi.mock(import("ynab"));

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("returns TokenAbsent when no token exists", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.authenticationState).toBe(
      AuthenticationState.TokenAbsent,
    );
  });

  it("returns TokenValid when a token exists and the YNAB API call succeeds", async () => {
    localStorage.setItem("ynabAccessToken", "test-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    const { result } = renderHook(() => useAuth());

    await waitFor(() =>
      expect(result.current.authenticationState).toBe(
        AuthenticationState.TokenValid,
      ),
    );
    expect(mockGetUser).toHaveBeenCalled();
  });
});
