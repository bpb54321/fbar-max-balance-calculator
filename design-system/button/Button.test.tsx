import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders a <button> and calls onClick when no href is provided", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Reload transactions</Button>);

    const button = screen.getByRole("button", { name: "Reload transactions" });
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders an anchor with the given href when href is provided", () => {
    render(
      <Button href="https://app.ynab.com/oauth/authorize">
        Authorize With YNAB
      </Button>,
    );

    const link = screen.getByRole("link", { name: "Authorize With YNAB" });
    expect(link).toHaveAttribute("href", "https://app.ynab.com/oauth/authorize");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("applies the same styling whether rendered as a button or anchor", () => {
    const { rerender } = render(<Button onClick={() => {}}>Click</Button>);
    const buttonClasses = screen.getByRole("button").className;

    rerender(<Button href="/somewhere">Click</Button>);
    const anchorClasses = screen.getByRole("link").className;

    expect(anchorClasses).toBe(buttonClasses);
  });
});
