import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders the underlying checkbox input with the design system styling classes", () => {
    render(<Checkbox id="account-1" checked={false} onChange={() => {}} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass(
      "appearance-none",
      "h-4",
      "w-4",
      "rounded-sm",
      "border",
      "border-border",
      "checked:bg-primary",
      "checked:border-primary",
    );
  });
});
