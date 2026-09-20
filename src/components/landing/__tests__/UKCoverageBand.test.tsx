import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UKCoverageBand from "@/components/landing/UKCoverageBand";

describe("UKCoverageBand", () => {
  it("lists the four UK nations and does not name a town", () => {
    const { container } = render(
      <MemoryRouter>
        <UKCoverageBand />
      </MemoryRouter>,
    );

    for (const nation of ["England", "Scotland", "Wales", "Northern Ireland"]) {
      expect(screen.getByText(nation)).toBeInTheDocument();
    }
    expect(container.textContent).not.toMatch(/Oswestry/i);
    expect(screen.getByRole("link", { name: "PIP and benefits" })).toHaveAttribute(
      "href",
      "/benefits-pip",
    );
  });
});
