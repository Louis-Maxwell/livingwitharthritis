import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EngagementTracker from "./EngagementTracker";

describe("contact link measurement", () => {
  beforeEach(() => { localStorage.clear(); window.gtag = vi.fn(); });
  afterEach(cleanup);
  const mount = () => render(<MemoryRouter><EngagementTracker /><a href="mailto:private@example.org?subject=diagnosis"><span>Email</span></a><a href="tel:0123456789">Phone</a><a href="mailto:?body=private" data-social-share>Share email</a></MemoryRouter>);
  it("tracks contact intents after the first click without sending contact details", () => {
    localStorage.setItem("cookie-consent", "accepted"); mount();
    fireEvent.click(screen.getByText("Email")); fireEvent.click(screen.getByText("Phone")); fireEvent.click(screen.getByText("Share email"));
    const events = vi.mocked(window.gtag!).mock.calls.filter(c => c[0] === "event" && ["email_click", "phone_click"].includes(String(c[1])));
    expect(events.map(c => c[1])).toEqual(["email_click", "phone_click"]);
    expect(JSON.stringify(events)).not.toMatch(/private|0123456789|diagnosis/);
  });
  it("sends neither email nor phone events without analytics consent", () => {
    mount(); fireEvent.click(screen.getByText("Email")); fireEvent.click(screen.getByText("Phone"));
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
