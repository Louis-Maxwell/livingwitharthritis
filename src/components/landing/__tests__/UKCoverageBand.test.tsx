import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UKCoverageBand from "../UKCoverageBand";

describe("UKCoverageBand", () => {
  it("names the four UK nations and PIP without a town address", () => {
    const { container } = render(
      <MemoryRouter>
        <UKCoverageBand />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /united kingdom/i })).toBeInTheDocument();
    expect(screen.getByText("England")).toBeInTheDocument();
    expect(screen.getByText("Scotland")).toBeInTheDocument();
    expect(screen.getByText("Wales")).toBeInTheDocument();
    expect(screen.getByText("Northern Ireland")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pip and benefits/i })).toHaveAttribute(
      "href",
      "/guides/benefits-pip",
    );
    expect(container.textContent).not.toMatch(/Oswestry/i);
  });
});
