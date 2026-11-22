import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InteractiveStartPath from "../InteractiveStartPath";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

const renderPath = () =>
  render(
    <MemoryRouter>
      <InteractiveStartPath />
    </MemoryRouter>,
  );

describe("InteractiveStartPath", () => {
  it("renders the start-here heading and joint chips", () => {
    renderPath();
    expect(document.getElementById("start-here")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /find your starting point/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Knee" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gentle exercises" })).toBeInTheDocument();
    expect(screen.getByText(/this is general information/i)).toBeInTheDocument();
  });

  it("shows specific links after a joint and a need are chosen", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "Knee" }));
    fireEvent.click(screen.getByRole("button", { name: "Gentle exercises" }));

    expect(screen.getByRole("link", { name: /free knee exercises for osteoarthritis/i })).toHaveAttribute(
      "href",
      "/guides/knee-exercises-for-osteoarthritis",
    );
    expect(screen.queryByRole("link", { name: /home plan on this page/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /exercise hub/i })).toHaveAttribute("href", "/exercises");
    expect(screen.getByText(/not a prescribed physio programme/i)).toBeInTheDocument();
    expect(screen.getAllByText(/this is general information/i).length).toBeGreaterThan(0);
  });

  it("shows diet, benefits and donate answers without forcing a joint choice", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "Benefits & PIP" }));
    expect(screen.getByRole("link", { name: /benefits & pip guide/i })).toHaveAttribute(
      "href",
      "/guides/benefits-pip",
    );
    expect(screen.getByText(/awards look at how your condition affects daily life/i)).toBeInTheDocument();
  });

  it("routes broad back, neck and all-over condition choices to the honest browse-all page", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    fireEvent.click(screen.getByRole("button", { name: "Understand my condition" }));
    expect(screen.getByRole("link", { name: /browse condition guides/i })).toHaveAttribute(
      "href",
      "/conditions",
    );
    expect(screen.queryByText(/the most common form of arthritis/i)).not.toBeInTheDocument();
  });

  it("makes no clinical-review or NICE-endorsement claims in its route descriptions", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "Hip" }));
    fireEvent.click(screen.getByRole("button", { name: "Gentle exercises" }));
    expect(screen.queryByText(/clinically reviewed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/nice-aligned/i)).not.toBeInTheDocument();
  });

  it("routes donate choices to GoFundMe without a diagnosis", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "All over" }));
    fireEvent.click(screen.getByRole("button", { name: "Donate" }));

    const donate = screen.getByRole("link", { name: /^donate/i });
    expect(donate).toHaveAttribute("href", "https://www.gofundme.com/f/help-fund-critical-arthritis-research");
    expect(donate).toHaveAttribute("target", "_blank");
    expect(donate.getAttribute("rel")).toMatch(/noopener/);
    expect(screen.queryByText(/you have/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/1218461/).length).toBeGreaterThan(0);
  });
});
