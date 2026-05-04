import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AggregatedSocialProof from "./AggregatedSocialProof";

// AnimatedCounter relies on IntersectionObserver — stub it so the initial
// render value (the target) is what we assert against.
class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "";
  thresholds = [];
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", IOStub as unknown as typeof IntersectionObserver);
});

const setViewport = (width: number) => {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event("resize"));
};

describe("AggregatedSocialProof", () => {
  it("renders the section landmark with an accessible name", () => {
    render(<AggregatedSocialProof />);
    const section = screen.getByRole("region", { name: /this week in numbers/i });
    expect(section).toBeInTheDocument();
  });

  it("exposes a complete sentence to screen readers for each stat", () => {
    render(<AggregatedSocialProof />);
    expect(
      screen.getByLabelText("312 people started a programme this week")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("1,840 exercise sessions completed in the last 7 days")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("96 questions answered by our clinical team this week")
    ).toBeInTheDocument();
  });

  it("renders a machine-readable <time> dateline", () => {
    render(<AggregatedSocialProof />);
    const time = document.querySelector("time");
    expect(time).not.toBeNull();
    expect(time?.getAttribute("datetime")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("renders all three counters at mobile width (320px)", () => {
    setViewport(320);
    render(<AggregatedSocialProof />);
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    // Counter starts at target value (no intersection triggered)
    expect(within(items[0]).getByText("312")).toBeInTheDocument();
    expect(within(items[1]).getByText("1,840")).toBeInTheDocument();
    expect(within(items[2]).getByText("96")).toBeInTheDocument();
  });

  it("renders all three counters at desktop width (1280px)", () => {
    setViewport(1280);
    render(<AggregatedSocialProof />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByText("312")).toBeInTheDocument();
    expect(within(items[1]).getByText("1,840")).toBeInTheDocument();
    expect(within(items[2]).getByText("96")).toBeInTheDocument();
  });

  it("hides decorative icons and visual paragraph from assistive tech", () => {
    render(<AggregatedSocialProof />);
    const section = screen.getByTestId("aggregated-social-proof");
    // Lucide icons render as <svg> with aria-hidden
    const svgs = section.querySelectorAll("svg[aria-hidden='true']");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
    // The visual <p> paired with each <li> is aria-hidden so the li's
    // aria-label is the single source of truth.
    const hiddenParas = section.querySelectorAll("p[aria-hidden='true']");
    expect(hiddenParas.length).toBe(3);
  });
});
