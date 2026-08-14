import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("test harness", () => {
  it("runs a plain unit assertion", () => {
    // Exercises a real project util so the unit path is proven, not just tautological.
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("renders a React component into jsdom", () => {
    render(<h1>Jan Modaal</h1>);

    // jest-dom matcher proves the setup file's custom matchers are wired up.
    expect(
      screen.getByRole("heading", { name: "Jan Modaal" }),
    ).toBeInTheDocument();
  });
});
