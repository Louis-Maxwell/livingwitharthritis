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

    expect(screen.getByRole("link", { name: /gentle knee stretching/i })).toHaveAttribute(
      "href",
      "/exercises/stretching-for-knee-arthritis",
    );
    expect(screen.getByRole("link", { name: /home plan on this page/i })).toHaveAttribute(
      "href",
      "#joint-exercises",
    );
    expect(screen.getByText(/not a prescribed physio programme/i)).toBeInTheDocument();
    expect(screen.getAllByText(/this is general information/i).length).toBeGreaterThan(0);
  });

  it("routes donate choices to the donate page without a diagnosis", () => {
    renderPath();
    fireEvent.click(screen.getByRole("button", { name: "All over" }));
    fireEvent.click(screen.getByRole("button", { name: "Donate" }));

    expect(screen.getByRole("link", { name: /^donate/i })).toHaveAttribute("href", "/donate");
    expect(screen.queryByText(/you have/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/1218461/).length).toBeGreaterThan(0);
  });
});
