import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SiteDonateBanner, { DONATE_BANNER_DISMISS_KEY } from "../SiteDonateBanner";

describe("SiteDonateBanner", () => {
  beforeEach(() => window.localStorage.clear());

  it("links to the GoFundMe page in a new tab", () => {
    render(<SiteDonateBanner />);
    const link = screen.getByRole("link", { name: /donate on gofundme/i });
    expect(link.getAttribute("href")).toBe("https://www.gofundme.com/f/help-fund-critical-arthritis-research");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(document.body.textContent).not.toMatch(/Living With Arthritis UK/);
  });

  it("hides and remembers dismissal", () => {
    render(<SiteDonateBanner />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss donation banner/i }));
    expect(screen.queryByRole("link", { name: /donate on gofundme/i })).toBeNull();
    expect(window.localStorage.getItem(DONATE_BANNER_DISMISS_KEY)).toBe("1");
  });

  it("stays hidden once dismissed", () => {
    window.localStorage.setItem(DONATE_BANNER_DISMISS_KEY, "1");
    render(<SiteDonateBanner />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
