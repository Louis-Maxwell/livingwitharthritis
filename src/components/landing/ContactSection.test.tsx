import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "./ContactSection";

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), message: vi.fn() },
}));

vi.mock("@/lib/analytics", () => ({ trackContactSubmit: vi.fn() }));
vi.mock("@/lib/ga-events", () => ({ trackContactFormSubmit: vi.fn() }));
vi.mock("@/lib/backendSubmit", () => ({
  submitContactInquiry: vi.fn(async () => ({
    ok: false,
    via: "mailto",
    mailtoOpened: true,
    message: "Your email app should open with a draft. Please press Send there.",
  })),
}));

const renderSection = () =>
  render(
    <MemoryRouter>
      <ContactSection />
    </MemoryRouter>,
  );

const fill = (labelRe: RegExp, value: string) => {
  fireEvent.change(screen.getByLabelText(labelRe), { target: { value } });
};

beforeEach(() => {
  vi.clearAllMocks();
});

// ── Validation: required fields, email format, message length ─────────

describe("ContactSection validation", () => {
  it("shows inline errors when submitting an empty form", async () => {
    renderSection();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a subject/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
  });

  it("rejects malformed email addresses", async () => {
    renderSection();
    fill(/your name/i, "Jane");
    fill(/email address/i, "not-an-email");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "This message is definitely long enough to pass.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("rejects messages shorter than 20 characters", async () => {
    renderSection();
    fill(/your name/i, "Jane");
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "too short");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/at least 20 characters/i)).toBeInTheDocument();
  });

  it("clears an error once the user edits that field", async () => {
    renderSection();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();

    fill(/your name/i, "Jane");
    await waitFor(() =>
      expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument(),
    );
  });
});

// ── Loading and mailto feedback ──────────────────────────────────────

describe("ContactSection submission feedback", () => {
  const fillValid = () => {
    fill(/your name/i, "Jane Doe");
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "I would like to know more about knee osteoarthritis exercises.");
  };

  it("shows honest mailto guidance and never claims auto-delivery success", async () => {
    const { submitContactInquiry } = await import("@/lib/backendSubmit");
    renderSection();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/email draft ready/i)).toBeInTheDocument();
    expect(submitContactInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "General enquiry",
        email: "jane@example.com",
      }),
    );
    expect(screen.queryByText(/message received/i)).not.toBeInTheDocument();
  });
});

// ── Length caps ───────────────────────────────────────────────────────

describe("ContactSection input length caps", () => {
  it("caps the message textarea at 1000 characters via character counter", () => {
    renderSection();
    const huge = "x".repeat(1500);
    fill(/your message/i, huge);
    // The counter is rendered against the trimmed length; ensure it renders a value.
    expect(screen.getByText(/\/ 1000 characters/i)).toBeInTheDocument();
  });
});

describe("ContactSection channel cards", () => {
  it("keeps long values inside every card, including the email", () => {
    renderSection();
    const emailCard = screen.getAllByRole("link", { name: /info@livingwitharthritis\.org\.uk/i })
      .find((el) => el.className.includes("overflow-hidden"));
    expect(emailCard).toBeTruthy();
    expect(emailCard!.className).toMatch(/min-w-0/);
    expect(emailCard!.querySelector("span.break-all")).toBeTruthy();

    for (const name of [/07760 512 084/i, /chat with us/i, /send a message/i]) {
      const card = screen.getByRole("link", { name });
      expect(card.className).toMatch(/min-w-0/);
      expect(card.className).toMatch(/overflow-hidden/);
    }
  });
});
