import { describe, it, vi, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock(import("next/navigation"), () => ({
  useRouter: vi.fn(),
}));

import YnabAuthPage from "./YnabAuthPage";
import { useRouter } from "next/navigation";

describe("YnabAuthPage", () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("saves the YNAB access token from the URL hash to localStorage", () => {
    window.location.hash = "#access_token=my-ynab-token&token_type=Bearer";

    render(<YnabAuthPage />);

    expect(localStorage.getItem("ynabAccessToken")).toBe("my-ynab-token");
  });

  it("redirects to the home page after processing the auth callback", () => {
    window.location.hash = "#access_token=my-ynab-token";

    render(<YnabAuthPage />);

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("redirects to the home page even when there is no access token in the URL hash", () => {
    render(<YnabAuthPage />);

    expect(mockReplace).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("ynabAccessToken")).toBeNull();
  });
});
