import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavLayout from "./layout";

describe("NavLayout", () => {
  it("renders the main navigation", () => {
    render(
      <NavLayout>
        <div>child content</div>
      </NavLayout>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
