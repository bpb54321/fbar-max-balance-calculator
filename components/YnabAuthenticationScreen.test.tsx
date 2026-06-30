import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import YnabAuthenticationScreen from "./YnabAuthenticationScreen";
import { api } from "@/__mocks__/ynab";
import { mockGetUser } from "@/__mocks__/ynab/mockFunctions";

vi.mock(import("ynab"));

describe("YnabAuthenticationScreen", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("displays authorized message and next link when token in local storage is valid", async () => {
    localStorage.setItem("ynabAccessToken", "fake-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    render(
      <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
    );

    expect(
      screen.getByRole("status", { name: /checking YNAB authorization/i }),
    ).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("status", { name: /checking YNAB authorization/i }),
    );

    expect(screen.getByText(/authorized with YNAB/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("displays an error message and auth link when token in local storage is invalid or expired", async () => {
    localStorage.setItem("ynabAccessToken", "expired-token");
    mockGetUser.mockRejectedValueOnce(new Error("401 Unauthorized"));

    render(
      <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
    );

    expect(
      screen.getByRole("status", { name: /checking YNAB authorization/i }),
    ).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("status", { name: /checking YNAB authorization/i }),
    );

    expect(
      screen.getByText(/please authenticate with YNAB/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /authorize with YNAB/i }),
    ).toBeInTheDocument();
  });

  it("displays an auth link when token not present in local storage ", async () => {
    const url = "https://example.com/auth";
    render(<YnabAuthenticationScreen ynabAuthorizationUrl={url} />);
    const link = await screen.findByRole("link", {
      name: /authorize with YNAB/i,
    });
    expect(link).toHaveAttribute("href", url);
    expect(
      screen.getByText(/please authenticate with YNAB/i),
    ).toBeInTheDocument();
  });

  it("displays authorized message and next link when a valid access token is present in the URL hash", async () => {
    window.location.hash = "#access_token=url-token";
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    render(
      <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
    );

    expect(
      screen.getByRole("status", { name: /checking YNAB authorization/i }),
    ).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("status", { name: /checking YNAB authorization/i }),
    );

    expect(api).toHaveBeenCalledWith("url-token");
    expect(screen.getByText(/authorized with YNAB/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });
});
