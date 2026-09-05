import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartHereBand from "../StartHereBand";
import UKCoverageBand from "../UKCoverageBand";

vi.mock("@/lib/ga-events", () => ({ trackStartHereCard: vi.fn() }));

describe("StartHereBand", () => {
  it("includes a PIP and benefits card", () => {
    render(
      <MemoryRouter>
        <StartHereBand />
      </MemoryRouter>,
    );
    const pip = screen.getByRole("link", { name: /pip or benefits/i });
    expect(pip).toHaveAttribute("href", "/guides/benefits-pip");
  });
});

describe("UKCoverageBand", () => {
  it("names all four UK nations", () => {
    render(<UKCoverageBand />);
    expect(screen.getByText("England")).toBeInTheDocument();
    expect(screen.getByText("Scotland")).toBeInTheDocument();
    expect(screen.getByText("Wales")).toBeInTheDocument();
    expect(screen.getByText("Northern Ireland")).toBeInTheDocument();
  });
});
