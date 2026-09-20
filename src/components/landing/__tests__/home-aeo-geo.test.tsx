import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import StartHereBand from "../StartHereBand";
import FAQSection from "../FAQSection";
import OAHero from "../OAHero";

vi.mock("@/lib/ga-events", () => ({
  trackStartHereCard: vi.fn(),
  trackDonationClick: vi.fn(),
}));

vi.mock("@/hooks/useReveal", () => ({
  useReveal: () => undefined,
}));

vi.mock("@/lib/articleImages", () => ({
  onCoverImgError: vi.fn(),
}));

describe("homepage customer-first AEO/GEO", () => {
  it("lists the four UK nations under the hero without a town address", () => {
    render(
      <MemoryRouter>
        <OAHero />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/England, Scotland, Wales and Northern Ireland/i),
    ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/Oswestry/i);
    expect(document.querySelector(".speakable-intro")).toBeTruthy();
  });

  it("includes PIP in Start here", () => {
    render(
      <MemoryRouter>
        <StartHereBand />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /money & benefits \(pip\)/i })).toHaveAttribute(
      "href",
      "/benefits-pip",
    );
  });

  it("deep-links FAQ answers to diet, chat, OA, PIP, waiting-list and work-rights", () => {
    const src = readFileSync(resolve(process.cwd(), "src/components/landing/FAQSection.tsx"), "utf8");
    expect(src).toContain('href: "/diet"');
    expect(src).toContain('href: "/chat"');
    expect(src).toContain('href: "/conditions/osteoarthritis"');
    expect(src).toContain('href: "/benefits-pip"');
    expect(src).toContain('href: "/arthritis-waiting-list-help"');
    expect(src).toContain('href: "/blog/working-with-arthritis-uk-rights"');

    render(
      <HelmetProvider>
        <MemoryRouter>
          <FAQSection />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(screen.getByRole("link", { name: "Diet and arthritis" })).toHaveAttribute("href", "/diet");
    expect(screen.getByRole("link", { name: "Help chat" })).toHaveAttribute("href", "/chat");
    expect(screen.getByRole("link", { name: "Waiting-list help" })).toHaveAttribute(
      "href",
      "/arthritis-waiting-list-help",
    );
    expect(screen.getByRole("link", { name: "Work rights" })).toHaveAttribute(
      "href",
      "/blog/working-with-arthritis-uk-rights",
    );
  });
});
