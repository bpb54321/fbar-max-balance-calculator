import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useAuth from "./useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("returns isAuthenticated false when no token exists", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });
});
