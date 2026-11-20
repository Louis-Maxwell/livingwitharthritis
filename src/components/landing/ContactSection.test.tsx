import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "./ContactSection";
import { trackEvent, trackContactSubmit } from "@/lib/analytics";
import { trackContactFormSubmit } from "@/lib/ga-events";
import { submitContactInquiry } from "@/lib/backendSubmit";

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), message: vi.fn() },
}));

vi.mock("@/lib/analytics", () => ({ trackContactSubmit: vi.fn(), trackEvent: vi.fn() }));
vi.mock("@/lib/ga-events", () => ({ trackContactFormSubmit: vi.fn() }));
vi.mock("@/lib/backendSubmit", () => ({
  CONTACT_MESSAGE_MAX_LENGTH: 5000,
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
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));

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
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));

    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("rejects messages shorter than 20 characters", async () => {
    renderSection();
    fill(/your name/i, "Jane");
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "too short");
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));

    expect(await screen.findByText(/at least 20 characters/i)).toBeInTheDocument();
  });

  it("clears an error once the user edits that field", async () => {
    renderSection();
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));
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
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));
    expect(await screen.findByText(/email draft ready/i)).toBeInTheDocument();
    expect(submitContactInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "General enquiry",
        email: "jane@example.com",
      }),
    );
    expect(screen.queryByText(/message received/i)).not.toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith("contact_email_draft_open", {
      method: "mailto", source: "contact_section",
    });
    expect(trackContactSubmit).not.toHaveBeenCalled();
    expect(trackContactFormSubmit).not.toHaveBeenCalled();
  });

  it.each(["throttled", "none"] as const)("does not record a draft or lead when the result is %s", async (via) => {
    vi.mocked(submitContactInquiry).mockResolvedValueOnce(
      via === "throttled"
        ? { ok: false, via, message: "Please wait before trying again.", retryAfterMs: 1000 }
        : { ok: false, via, message: "The email draft could not open." },
    );
    renderSection();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /open mail app/i }));
    await waitFor(() => expect(submitContactInquiry).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByRole("button", { name: /open mail app/i })).not.toBeDisabled());
    expect(trackEvent).not.toHaveBeenCalled();
    expect(trackContactSubmit).not.toHaveBeenCalled();
    expect(trackContactFormSubmit).not.toHaveBeenCalled();
    expect(screen.queryByText(/email draft ready/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveValue("jane@example.com");
  });
});

// ── Length caps ───────────────────────────────────────────────────────

describe("ContactSection input length caps", () => {
  it("matches the real helper limit and keeps the counter associated with the message", () => {
    renderSection();
    const input = screen.getByLabelText(/your message/i);
    expect(input).toHaveAttribute('maxLength', '5000');
    fill(/your message/i, "x".repeat(1500));
    expect(screen.getByText('1500 / 5000 characters')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', 'c-message-count');
  });
  it("rejects an oversized value rather than silently discarding part of it", async () => {
    renderSection();
    fill(/your name/i, 'Jane'); fill(/email address/i, 'jane@example.com');
    fill(/subject/i, 'General enquiry'); fill(/your message/i, 'x'.repeat(5001));
    fireEvent.click(screen.getByRole('button', {name: /open mail app/i}));
    expect(await screen.findByText('Message must be 5000 characters or fewer.')).toBeInTheDocument();
    expect(submitContactInquiry).not.toHaveBeenCalled();
  });
});

describe("ContactSection channel cards", () => {
  it("describes contact controls without unverified reply or opening-hour promises", () => {
    renderSection();
    expect(screen.queryByText(/working days|real person will reply|fast, friendly|9am|small UK team/i)).not.toBeInTheDocument();
    expect(screen.getByText(/nothing is sent automatically/i)).toBeInTheDocument();
    expect(screen.getByText('Opens your phone app')).toBeInTheDocument();
  });
  it("records email-link intent without reporting a submitted form", () => {
    renderSection();
    const links = screen.getAllByRole("link", { name: /info@livingwitharthritis\.org\.uk/i });
    for (const link of links) fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith("mailto_click", { source: "contact_channel_card" });
    expect(trackEvent).toHaveBeenCalledWith("mailto_click", { source: "contact_form_footnote" });
    expect(trackContactSubmit).not.toHaveBeenCalled();
    expect(trackContactFormSubmit).not.toHaveBeenCalled();
    expect(vi.mocked(trackEvent).mock.calls.every(([name]) => name === "mailto_click")).toBe(true);
  });
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

describe('ContactSection recovery and focus', () => {
  it('focuses the subject then message when those are the first invalid fields', async () => {
    renderSection(); fill(/your name/i, 'Jane'); fill(/email address/i, 'jane@example.com');
    fireEvent.click(screen.getByRole('button', {name: /open mail app/i}));
    await waitFor(() => expect(screen.getByLabelText(/subject/i)).toHaveFocus());
    fill(/subject/i, 'General enquiry');
    fireEvent.click(screen.getByRole('button', {name: /open mail app/i}));
    await waitFor(() => expect(screen.getByLabelText(/your message/i)).toHaveFocus());
  });
  it('restores the existing draft when an email app did not open', async () => {
    renderSection(); fill(/your name/i, 'Jane'); fill(/email address/i, 'jane@example.com');
    fill(/subject/i, 'General enquiry'); fill(/your message/i, 'Please keep this complete message for me to copy.');
    fireEvent.click(screen.getByRole('button', {name: /open mail app/i}));
    fireEvent.click(await screen.findByRole('button', {name: 'Back to your message'}));
    expect(screen.getByLabelText(/your message/i)).toHaveValue('Please keep this complete message for me to copy.');
    expect(screen.getByLabelText(/your message/i)).toHaveFocus();
    expect(screen.getByLabelText(/email address/i)).toHaveValue('jane@example.com');
    expect(submitContactInquiry).toHaveBeenCalledTimes(1);
  });
});
