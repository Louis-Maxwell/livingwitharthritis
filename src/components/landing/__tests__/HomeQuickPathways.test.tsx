import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CHARITY } from "@/config/charity";
import HomeQuickPathways from "../HomeQuickPathways";

vi.mock("@/lib/ga-events", () => ({
  trackStartHereCard: vi.fn(),
  trackDonationClick: vi.fn(),
}));

const renderPathways = () =>
  render(
    <MemoryRouter>
      <HomeQuickPathways />
    </MemoryRouter>,
  );

describe("HomeQuickPathways", () => {
  it("shows the three help jobs and a soft donate link", () => {
    renderPathways();

    expect(screen.getByRole("heading", { name: /what do you need today/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /i'm in pain \/ need relief now/i }),
    ).toHaveAttribute("href", "/guides/arthritis-pain-relief");

    expect(
      screen.getByRole("link", { name: /newly diagnosed \/ understand my condition/i }),
    ).toHaveAttribute("href", "/guides/newly-diagnosed");

    expect(screen.getByRole("link", { name: /money & benefits \(pip\)/i })).toHaveAttribute(
      "href",
      "/benefits-pip",
    );

    const donate = screen.getByRole("link", { name: /donate on gofundme \(opens in a new tab\)/i });
    expect(donate).toHaveAttribute("href", CHARITY.gofundmeUrl);
    expect(donate).toHaveAttribute("target", "_blank");
    expect(donate).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByRole("link", { name: /exercise hub/i })).toHaveAttribute(
      "href",
      "/exercises",
    );
  });
});
