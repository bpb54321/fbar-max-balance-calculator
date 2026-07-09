import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import NavLayout from "./layout";
import Providers from "@/components/Providers";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";

vi.mock(import("ynab"));

const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

function renderNavLayout() {
  return render(
    <Providers>
      <NavLayout>
        <div>child content</div>
      </NavLayout>
    </Providers>,
  );
}

describe("NavLayout", () => {
  it("renders the main navigation", async () => {
    renderNavLayout();

    await waitFor(() => {
      expect(screen.getByText(/^Using budget id:/)).toBeInTheDocument();
    });

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("redirects to / when no YNAB token is present", async () => {
    localStorage.clear();

    renderNavLayout();

    await waitFor(() => {
      expect(
        screen.getByText("There was an error retrieving the default plan id."),
      ).toBeInTheDocument();
    });

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("does not redirect when a valid token is present in local storage", async () => {
    localStorage.setItem("ynabAccessToken", "fake-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    renderNavLayout();

    await waitFor(() => {
      expect(screen.getByText(/^Using budget id:/)).toBeInTheDocument();
    });

    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects to / when the stored token is invalid or expired", async () => {
    localStorage.setItem("ynabAccessToken", "expired-token");
    mockGetUser.mockRejectedValueOnce(new Error("401 Unauthorized"));

    renderNavLayout();

    await waitFor(() => {
      expect(screen.getByText(/^Using budget id:/)).toBeInTheDocument();
    });

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith("/"));
  });
});
