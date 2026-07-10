import { describe, it, expect, vi } from "vitest";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";
import checkTokenValidity from "./checkTokenValidity";

vi.mock(import("ynab"));

describe("checkTokenValidity", () => {
  it("returns true when the YNAB API call to check token validity succeeds", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });
    expect(await checkTokenValidity("test-token")).toBe(true);
  });

  it("returns false when the YNAB API call fails", async () => {
    mockGetUser.mockRejectedValueOnce(new Error("401 Unauthorized"));
    expect(await checkTokenValidity("test-token")).toBe(false);
    expect(mockGetUser).toHaveBeenCalled();
  });
});
