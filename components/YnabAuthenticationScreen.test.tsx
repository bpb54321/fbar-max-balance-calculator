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

const renderScreenAndWaitForAuthCheck = async () => {
  render(
    <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
  );

  expect(
    screen.getByRole("status", { name: /checking YNAB authorization/i }),
  ).toBeInTheDocument();

  await waitForElementToBeRemoved(() =>
    screen.queryByRole("status", { name: /checking YNAB authorization/i }),
  );
};

describe("YnabAuthenticationScreen", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("displays 'authorized with YNAB' message and 'Next' link when token in local storage is valid", async () => {
    localStorage.setItem("ynabAccessToken", "fake-token");
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    await renderScreenAndWaitForAuthCheck();

    expect(screen.getByText(/authorized with YNAB/i)).toBeInTheDocument();
    expect(screen.getByText(/authorized with YNAB/i)).toHaveClass(
      "text-lg",
      "font-semibold",
      "text-amber-700",
    );
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("displays 'Please authorize' message and auth link when token in local storage is invalid or expired", async () => {
    localStorage.setItem("ynabAccessToken", "expired-token");
    mockGetUser.mockRejectedValueOnce(new Error("401 Unauthorized"));

    await renderScreenAndWaitForAuthCheck();

    expect(
      screen.getByText(
        /please authorize this app to access your YNAB account/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /authorize YNAB/i }),
    ).toBeInTheDocument();
  });

  it("displays an auth link when token not present in local storage ", async () => {
    render(
      <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
    );

    expect(
      screen.getByRole("link", { name: /authorize YNAB/i }),
    ).toHaveAttribute("href", "https://example.com/auth");
  });

  it("displays authorized message and next link when a valid access token is present in the URL hash", async () => {
    window.location.hash = "#access_token=url-token";
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    await renderScreenAndWaitForAuthCheck();

    expect(api).toHaveBeenCalledWith("url-token");
    expect(screen.getByText(/authorized with YNAB/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("shows the authorization link when the URL hash token is invalid", async () => {
    window.location.hash = "#access_token=invalid-url-token";
    mockGetUser.mockRejectedValue(new Error("401 Unauthorized"));

    await renderScreenAndWaitForAuthCheck();

    expect(
      screen.getByText(
        /please authorize this app to access your YNAB account/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /authorize YNAB/i }),
    ).toBeInTheDocument();
  });

  it(
    "overwrites the stored token with the URL hash token and checks the URL hash token for validity " +
      "when tokens are present in both locations",
    async () => {
      window.location.hash = "#access_token=url-token";
      localStorage.setItem("ynabAccessToken", "local-storage-token");
      mockGetUser.mockRejectedValue(new Error("401 Unauthorized"));

      await renderScreenAndWaitForAuthCheck();

      expect(localStorage.getItem("ynabAccessToken")).toBe("url-token");
      expect(api).toHaveBeenCalledWith("url-token");
      expect(
        screen.getByRole("link", { name: /authorize YNAB/i }),
      ).toBeInTheDocument();
    },
  );

  it("clears the access token from the URL hash once it has been captured", async () => {
    window.location.hash = "#access_token=url-token";
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: "user-123" } } });

    await renderScreenAndWaitForAuthCheck();

    expect(window.location.hash).toBe("");
  });
});
