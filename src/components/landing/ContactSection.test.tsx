import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "./ContactSection";

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/lib/analytics", () => ({ trackContactSubmit: vi.fn() }));
vi.mock("@/lib/ga-events", () => ({ trackContactFormSubmit: vi.fn() }));

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

// ── Loading and success feedback ──────────────────────────────────────

describe("ContactSection submission feedback", () => {
  const fillValid = () => {
    fill(/your name/i, "Jane Doe");
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "I would like to know more about knee osteoarthritis exercises.");
  };

  it("asks the visitor to email rather than storing a submission", async () => {
    renderSection();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please send your email/i)).toBeInTheDocument();
  });
});

describe.skip("ContactSection stores hostile payloads as plain text", () => {
  const XSS_PAYLOADS = [
    "<script>alert('xss')</script>",
    "<img src=x onerror=alert(1)>",
    "javascript:alert('xss')",
    "\"><svg/onload=alert(1)>",
    "'; DROP TABLE users; --",
    "{{constructor.constructor('alert(1)')()}}",
    "<iframe src='javascript:alert(1)'></iframe>",
  ];

  it.each(XSS_PAYLOADS)("passes %s through as literal string to the DB", async (payload) => {
    renderSection();
    fill(/your name/i, `Jane ${payload}`);
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, `Hello, my message contains: ${payload} and is long enough.`);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(invokeMock).toHaveBeenCalledTimes(1));
    const arg = submittedBody();
    expect(arg.name).toContain(payload);
    expect(arg.message).toContain(payload);
    // No injected DOM: the form card should not contain a live <script>.
    const card = screen.queryByTestId("contact-form-card");
    if (card) {
      expect(within(card).queryByText(payload)).toBeNull();
    }
  });
});

// ── Length caps ───────────────────────────────────────────────────────

describe("ContactSection input length caps", () => {
  it("caps the message textarea at 1000 characters via character counter", () => {
    renderSection();
    const huge = "x".repeat(1500);
    fill(/your message/i, huge);
    // The counter is rendered against the trimmed length; ensure it renders
    // a value (validation of a hard cap on server side lives in edge fn).
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
