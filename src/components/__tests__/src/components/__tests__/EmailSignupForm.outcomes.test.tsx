import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EmailSignupForm from "../EmailSignupForm";
import { subscribeNewsletter } from "@/lib/backendSubmit";
import { trackEvent } from "@/lib/analytics";

vi.mock("@/lib/backendSubmit", () => ({ subscribeNewsletter: vi.fn() }));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));
vi.mock("sonner", () => ({ toast: { message: vi.fn(), error: vi.fn() } }));
vi.mock("@/lib/errorReporting", () => ({ reportFormFailure: vi.fn() }));
const submit = () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), { target: { value: "reader@example.test" } });
  fireEvent.click(screen.getByRole("button", { name: "Request emails" }));
};
const events = () => vi.mocked(trackEvent).mock.calls.map(([name]) => name);

beforeEach(() => { vi.clearAllMocks(); });
describe("newsletter outcome evidence", () => {
  it("records service acceptance, never confirmed subscription or legacy lead success", async () => {
    vi.mocked(subscribeNewsletter).mockResolvedValue({ ok: true, via: "formsubmit", message: "Accepted" });
    render(<EmailSignupForm />); submit();
    await screen.findByRole("status");
    expect(events()).toEqual(["newsletter_attempt", "newsletter_request_accepted"]);
    expect(JSON.stringify(vi.mocked(trackEvent).mock.calls)).not.toContain("reader@example.test");
    expect(screen.getByRole("status")).toHaveTextContent("membership is not yet confirmed");
  });
  it("records a draft separately and tells the visitor to send it", async () => {
    vi.mocked(subscribeNewsletter).mockResolvedValue({ ok: false, via: "mailto", mailtoOpened: true, message: "Draft opened" });
    render(<EmailSignupForm />); submit();
    await screen.findByRole("status");
    expect(events()).toEqual(["newsletter_attempt", "newsletter_mailto_open"]);
    expect(screen.getByRole("status")).toHaveTextContent("please send the email");
  });
  it("does not record acceptance for throttling", async () => {
    vi.mocked(subscribeNewsletter).mockResolvedValue({ ok: false, via: "throttled", retryAfterMs: 30000, message: "Wait" });
    render(<EmailSignupForm />); submit();
    await waitFor(() => expect(screen.getByRole("button")).toBeEnabled());
    expect(events()).toEqual(["newsletter_attempt"]);
  });
  it("gives repeated forms separate input and error identifiers", () => {
    render(<><EmailSignupForm /><EmailSignupForm /></>);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0].id).not.toBe(inputs[1].id);
    expect(inputs.every(input => !!input.id)).toBe(true);
  });
});
