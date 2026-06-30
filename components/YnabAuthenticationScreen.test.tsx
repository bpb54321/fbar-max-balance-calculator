import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import YnabAuthenticationScreen from "./YnabAuthenticationScreen";

describe("YnabAuthenticationScreen", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("displays a message asking the user to authenticate with YNAB", () => {
    render(
      <YnabAuthenticationScreen ynabAuthorizationUrl="https://example.com/auth" />,
    );
    expect(
      screen.getByText(/please authenticate with YNAB/i),
    ).toBeInTheDocument();
  });

  it("displays a link to the YNAB authorization URL", () => {
    const url = "https://example.com/auth";
    render(<YnabAuthenticationScreen ynabAuthorizationUrl={url} />);
    const link = screen.getByRole("link", { name: /authorize with YNAB/i });
    expect(link).toHaveAttribute("href", url);
  });
});
