import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CookieBanner from "../CookieBanner";

const renderBanner = (onAnalyticsChange = vi.fn()) =>
  render(
    <MemoryRouter>
      <CookieBanner onAnalyticsChange={onAnalyticsChange} />
    </MemoryRouter>
  );

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("shows banner when no consent stored", () => {
    renderBanner();
    expect(screen.getByText(/we value your privacy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept all/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /essential only/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /customise/i })).toBeInTheDocument();
  });

  it("hides banner when consent already stored", () => {
    localStorage.setItem("lwa_cv3", JSON.stringify({ a: false, p: false, m: false }));
    renderBanner();
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
  });

  it("Accept All saves all consent and hides banner", () => {
    const onChange = vi.fn();
    const accepted = vi.fn();
    window.addEventListener("cookie-consent-accepted", accepted, { once: true });
    renderBanner(onChange);
    fireEvent.click(screen.getByRole("button", { name: /accept all/i }));
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem("lwa_cv3")!);
    expect(stored).toEqual({ a: true, p: true, m: true });
    expect(localStorage.getItem("cookie-consent")).toBe("accepted");
    expect(onChange).toHaveBeenCalledWith(true);
    expect(accepted).toHaveBeenCalledOnce();
  });

  it("Essential Only saves no consent and hides banner", () => {
    const onChange = vi.fn();
    renderBanner(onChange);
    fireEvent.click(screen.getByRole("button", { name: /essential only/i }));
    expect(screen.queryByText(/we value your privacy/i)).not.toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem("lwa_cv3")!);
    expect(stored).toEqual({ a: false, p: false, m: false });
    expect(localStorage.getItem("cookie-consent")).toBe("declined");
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("Customise opens granular options", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: /customise/i }));
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save my preferences/i })).toBeInTheDocument();
  });

  it("saves custom preferences correctly", () => {
    const onChange = vi.fn();
    renderBanner(onChange);
    fireEvent.click(screen.getByRole("button", { name: /customise/i }));

    // Check only Analytics
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]); // Analytics

    fireEvent.click(screen.getByRole("button", { name: /save my preferences/i }));
    const stored = JSON.parse(localStorage.getItem("lwa_cv3")!);
    expect(stored).toEqual({ a: true, p: false, m: false });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("Cancel button in customise view goes back to main view", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: /customise/i }));
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByText("Analytics")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept all/i })).toBeInTheDocument();
  });

  it("all checkboxes default to unchecked in customise view", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: /customise/i }));
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((cb) => {
      expect(cb).not.toBeChecked();
    });
  });

  it("has Privacy Policy link", () => {
    renderBanner();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
  });
});
