import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Unsubscribe from "../Unsubscribe";

const renderAt = (path: string) =>
  render(<HelmetProvider><MemoryRouter initialEntries={[path]}><Unsubscribe /></MemoryRouter></HelmetProvider>);

describe("Unsubscribe page truthfulness", () => {
  it("discloses before any click that a manual Send is needed and nothing is removed yet", () => {
    renderAt("/unsubscribe?token=abc123");
    expect(screen.getByText(/opens a pre-written draft email/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing is sent until you press Send/i)).toBeInTheDocument();
    expect(screen.getByText(/submits your request to the charity/i)).toBeInTheDocument();
    expect(screen.getByText(/does not remove your address by itself/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open email draft" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Confirm Unsubscribe" })).not.toBeInTheDocument();
  });

  it("never claims removal is complete after clicking: it shows the draft-and-send reality", () => {
    renderAt("/unsubscribe?token=abc123");
    fireEvent.click(screen.getByRole("button", { name: "Open email draft" }));
    expect(screen.getByRole("heading", { name: "Check your email app" })).toBeInTheDocument();
    expect(screen.getByText(/Press Send there to submit your removal request/i)).toBeInTheDocument();
    expect(screen.getByText(/removal happens only after the charity processes your email/i)).toBeInTheDocument();
    expect(screen.queryByText(/not removed until you press Send/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "open it again" })).toHaveAttribute("href", expect.stringContaining("mailto:info@livingwitharthritis.org.uk"));
    expect(screen.queryByText(/successfully unsubscribed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/won't receive any more emails/i)).not.toBeInTheDocument();
  });

  it("without a token it offers the direct email route without claiming the link was checked", () => {
    renderAt("/unsubscribe");
    expect(screen.getByRole("heading", { name: "No email token in this link" })).toBeInTheDocument();
    expect(screen.getByText(/does not include an email token/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email info@livingwitharthritis.org.uk/i })).toHaveAttribute("href", expect.stringContaining("mailto:info@livingwitharthritis.org.uk"));
    expect(screen.queryByText(/invalid or has expired/i)).not.toBeInTheDocument();
  });

  it("aside makes no account, digest, dashboard or WhatsApp claims and links the real printable tracker", () => {
    renderAt("/unsubscribe?token=abc123");
    const aside = screen.getByRole("complementary");
    expect(aside).not.toHaveTextContent(/your account/i);
    expect(aside).not.toHaveTextContent(/saved exercise plans/i);
    expect(aside).not.toHaveTextContent(/chat history/i);
    expect(aside).not.toHaveTextContent(/sign back in/i);
    expect(aside).not.toHaveTextContent(/monthly digest/i);
    expect(aside).not.toHaveTextContent(/pacing/i);
    expect(aside).not.toHaveTextContent(/dashboard/i);
    expect(aside).not.toHaveTextContent(/WhatsApp/i);
    expect(aside).not.toHaveTextContent(/business days/i);
    expect(aside).not.toHaveTextContent(/physio/i);
    expect(aside).toHaveTextContent("1218461");
    const trackerLinks = screen.getAllByRole("link", { name: /symptom and flare tracker/i });
    expect(trackerLinks.length).toBeGreaterThan(0);
    trackerLinks.forEach((l) => expect(l).toHaveAttribute("href", "/resources/symptom-flare-tracker"));
  });
});
