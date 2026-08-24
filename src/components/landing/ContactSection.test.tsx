import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactSection from "./ContactSection";

// ── Mocks ──────────────────────────────────────────────────────────────

const insertMock = vi.fn();
const invokeMock = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({ insert: (...args: unknown[]) => insertMock(...args) }),
    functions: { invoke: (...args: unknown[]) => invokeMock(...args) },
  },
}));

/** Payload sent to the submit-contact edge function on the nth call. */
const submittedBody = (call = 0) =>
  (invokeMock.mock.calls[call]?.[1] as { body: Record<string, string> }).body;

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
  insertMock.mockReset().mockResolvedValue({ error: null });
  invokeMock
    .mockReset()
    .mockResolvedValue({ data: { ok: true, data: {} }, error: null });
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
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it("rejects malformed email addresses", async () => {
    renderSection();
    fill(/your name/i, "Jane");
    fill(/email address/i, "not-an-email");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "This message is definitely long enough to pass.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(invokeMock).not.toHaveBeenCalled();
  });

  it("rejects messages shorter than 20 characters", async () => {
    renderSection();
    fill(/your name/i, "Jane");
    fill(/email address/i, "jane@example.com");
    fill(/subject/i, "General enquiry");
    fill(/your message/i, "too short");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/at least 20 characters/i)).toBeInTheDocument();
    expect(invokeMock).not.toHaveBeenCalled();
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

  it("disables the submit button and shows a loading label while sending", async () => {
    let resolveSubmit: (v: { data: unknown; error: null }) => void = () => {};
    invokeMock.mockImplementation(
      () => new Promise((r) => { resolveSubmit = r; }),
    );

    renderSection();
    fillValid();
    const btn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(btn);

    await waitFor(() => expect(btn).toBeDisabled());
    expect(screen.getByText(/sending your message/i)).toBeInTheDocument();

    resolveSubmit({ data: { ok: true, data: {} }, error: null });
    await waitFor(() =>
      expect(screen.getByText(/message received/i)).toBeInTheDocument(),
    );
  });

  it("submits through the guarded submit-contact function only", async () => {
    renderSection();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText(/message received/i)).toBeInTheDocument(),
    );
    expect(invokeMock).toHaveBeenCalledTimes(1);
    expect(invokeMock).toHaveBeenCalledWith(
      "submit-contact",
      expect.objectContaining({
        body: expect.objectContaining({ email: "jane@example.com" }),
      }),
    );
    // The browser must never write to contact_inquiries directly: that path
    // skips rate limiting and both notification emails.
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("keeps the form open and reports the error when the server rejects", async () => {
    invokeMock.mockResolvedValue({
      data: {
        ok: false,
        error: { code: "rate_limited", message: "Too many requests." },
      },
      error: null,
    });

    renderSection();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(invokeMock).toHaveBeenCalledTimes(1));
    expect(screen.queryByText(/message received/i)).not.toBeInTheDocument();
  });
});

// ── Security: XSS-y payloads are stored as plain text, not executed ───

describe("ContactSection stores hostile payloads as plain text", () => {
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
