import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CHARITY } from "@/config/charity";
import FinalDonateBand from "../FinalDonateBand";
import HowYouCanHelp from "../HowYouCanHelp";
import ImpactProgressBand from "../ImpactProgressBand";
import OAHero from "../OAHero";
import StickyDonateBar from "../StickyDonateBar";

vi.mock("@/lib/ga-events", () => ({
  trackDonationClick: vi.fn(),
  trackStartHereCard: vi.fn(),
}));

const GOFUNDME_FILES = [
  "src/components/GoFundMeAnchor.tsx",
  "src/components/landing/OAHero.tsx",
  "src/components/landing/HomeQuickPathways.tsx",
  "src/components/landing/ImpactProgressBand.tsx",
  "src/components/landing/HowYouCanHelp.tsx",
  "src/components/landing/FinalDonateBand.tsx",
  "src/components/landing/StickyDonateBar.tsx",
  "src/components/landing/InteractiveStartPath.tsx",
];

const renderWithRouter = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("homepage GoFundMe pay CTAs", () => {
  it("keeps the campaign URL in charity config only", () => {
    for (const file of GOFUNDME_FILES) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source, file).not.toContain("gofundme.com");
    }
    expect(readFileSync(resolve("src/config/charity.ts"), "utf8")).toContain(
      "https://www.gofundme.com/f/help-fund-critical-arthritis-research",
    );
  });

  it("points the research-fund meter at GoFundMe and keeps Stripe give options", () => {
    renderWithRouter(
      <>
        <ImpactProgressBand />
        <FinalDonateBand />
      </>,
    );

    const payLinks = screen.getAllByRole("link", {
      name: /donate on gofundme \(opens in a new tab\)/i,
    });
    expect(payLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of payLinks) {
      expect(link).toHaveAttribute("href", CHARITY.gofundmeUrl);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getByRole("button", { name: /give monthly/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /give once/i })).toBeInTheDocument();
  });

  it("shows a GoFundMe pay link in the hero and the donate-today card", () => {
    renderWithRouter(
      <>
        <OAHero />
        <HowYouCanHelp />
      </>,
    );

    const payLinks = screen.getAllByRole("link", {
      name: /donate on gofundme \(opens in a new tab\)/i,
    });
    expect(payLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of payLinks) {
      expect(link).toHaveAttribute("href", CHARITY.gofundmeUrl);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    expect(screen.getByRole("link", { name: /i'm in pain — need relief/i })).toHaveAttribute(
      "href",
      "/guides/arthritis-pain-relief",
    );
  });

  it("opens the sticky research-fund Donate control on GoFundMe", () => {
    renderWithRouter(<StickyDonateBar />);

    const payLinks = screen.getAllByRole("link", { name: /donate on gofundme \(opens in a new tab\)/i });
    expect(payLinks).toHaveLength(2);
    for (const link of payLinks) {
      expect(link).toHaveAttribute("href", CHARITY.gofundmeUrl);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
