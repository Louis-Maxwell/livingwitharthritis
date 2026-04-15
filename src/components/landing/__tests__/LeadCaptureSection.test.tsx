import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeadCaptureSection from "../LeadCaptureSection";

const mockInsert = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      insert: (...args: any[]) => mockInsert(...args),
    }),
  },
}));

vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

describe("LeadCaptureSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockResolvedValue({ error: null });
  });

  it("renders the lead capture form", () => {
    render(<LeadCaptureSection />);
    expect(screen.getByText(/get your free arthritis management pack/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get free pack/i })).toBeInTheDocument();
  });

  it("shows pack contents", () => {
    render(<LeadCaptureSection />);
    expect(screen.getByText(/daily arthritis management checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/7-day anti-inflammatory meal plan/i)).toBeInTheDocument();
    expect(screen.getByText(/morning joint mobility routine/i)).toBeInTheDocument();
    expect(screen.getByText(/flare-up action plan template/i)).toBeInTheDocument();
  });

  it("shows error for empty email", async () => {
    render(<LeadCaptureSection />);
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("shows error for invalid email format", async () => {
    render(<LeadCaptureSection />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "notanemail" } });
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("submits valid email and shows success", async () => {
    render(<LeadCaptureSection />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "jane@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith({ email: "jane@example.com", source: "lead_capture_checklist" });
    });
    expect(await screen.findByText(/you're all set/i)).toBeInTheDocument();
  });

  it("trims and lowercases email before submission", async () => {
    render(<LeadCaptureSection />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "  Jane@Example.COM  " } });
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalledWith({ email: "jane@example.com", source: "lead_capture_checklist" });
    });
  });

  it("handles duplicate email gracefully", async () => {
    mockInsert.mockResolvedValue({ error: { code: "23505", message: "duplicate" } });
    render(<LeadCaptureSection />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "jane@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    expect(await screen.findByText(/you're all set/i)).toBeInTheDocument();
  });

  it("shows error message on API failure", async () => {
    mockInsert.mockResolvedValue({ error: { code: "500", message: "server error" } });
    render(<LeadCaptureSection />);
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "jane@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("clears error when user types", async () => {
    render(<LeadCaptureSection />);
    fireEvent.click(screen.getByRole("button", { name: /get free pack/i }));
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), { target: { value: "j" } });
    expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
  });

  it("submits on Enter key press", async () => {
    render(<LeadCaptureSection />);
    const input = screen.getByPlaceholderText(/your email address/i);
    fireEvent.change(input, { target: { value: "jane@example.com" } });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => {
      expect(mockInsert).toHaveBeenCalled();
    });
  });
});
