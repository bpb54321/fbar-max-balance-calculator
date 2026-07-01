import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import NavLayout from "./layout";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";

vi.mock(import("ynab"));

const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe("NavLayout", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the main navigation", () => {
    render(
      <NavLayout>
        <div>child content</div>
      </NavLayout>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("redirects to / when no YNAB token is present", () => {
    render(
      <NavLayout>
        <div>child content</div>
      </NavLayout>,
    );

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("does not redirect when a valid token is present in local storage", async () => {
    localStorage.setItem("ynabAccessToken", "fake-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    render(
      <NavLayout>
        <div>child content</div>
      </NavLayout>,
    );

    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects to / when the stored token is invalid or expired", async () => {
    localStorage.setItem("ynabAccessToken", "expired-token");
    mockGetUser.mockRejectedValueOnce(new Error("401 Unauthorized"));

    render(
      <NavLayout>
        <div>child content</div>
      </NavLayout>,
    );

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith("/"));
  });
});
