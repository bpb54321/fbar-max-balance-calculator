import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NavLayout from "./layout";

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
});
