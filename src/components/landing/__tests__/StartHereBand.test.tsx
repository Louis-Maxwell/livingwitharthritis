import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartHereBand from "@/components/landing/StartHereBand";

describe("StartHereBand", () => {
  it("includes a PIP and benefits card", () => {
    render(
      <MemoryRouter>
        <StartHereBand />
      </MemoryRouter>,
    );

    expect(screen.getByText("I need PIP or benefits help")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /PIP or benefits/i })).toHaveAttribute(
      "href",
      "/benefits-pip",
    );
  });
});
