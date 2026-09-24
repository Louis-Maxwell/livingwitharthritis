import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

    expect(screen.getByRole("link", { name: /donate \/ research fund/i })).toHaveAttribute(
      "href",
      "/donate",
    );

    const kneeLinks = screen.getAllByRole("link", {
      name: /free knee exercises for osteoarthritis/i,
    });
    expect(kneeLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of kneeLinks) {
      expect(link).toHaveAttribute("href", "/guides/knee-exercises-for-osteoarthritis");
    }

    expect(
      screen.getByRole("link", { name: /^free arthritis resources uk$/i }),
    ).toHaveAttribute("href", "/guides/free-arthritis-resources-uk");
  });
});
