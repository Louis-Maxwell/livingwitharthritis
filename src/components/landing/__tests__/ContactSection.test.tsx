import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactSection from "../ContactSection";

// Mock supabase
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
    functions: {
      invoke: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the contact form with all fields", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("shows validation error when name is empty", async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<ContactSection />);
    const nameInput = screen.getByLabelText(/your name/i);
    fireEvent.change(nameInput, { target: { value: "Jane" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it("shows validation error when subject is empty", async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "jane@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please choose a subject/i)).toBeInTheDocument();
  });

  it("shows validation error when message is too short", async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "General enquiry" } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: "Too short" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/message must be at least 20 characters/i)).toBeInTheDocument();
  });

  it("clears field error when user types", async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Jane" } });
    expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
  });

  it("shows all validation errors simultaneously", async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/please choose a subject/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
    });
  });

  it("accepts valid email formats", async () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "General enquiry" } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: "This is a message that is long enough to pass validation." } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    // Should not show any validation errors
    await waitFor(() => {
      expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
    });
  });

  it("renders contact details sidebar", () => {
    render(<ContactSection />);
    expect(screen.getByText("Email us")).toBeInTheDocument();
    expect(screen.getByText("Call us")).toBeInTheDocument();
    expect(screen.getByText("Our address")).toBeInTheDocument();
  });

  it("displays character count for message", () => {
    render(<ContactSection />);
    expect(screen.getByText("0 / 1000 characters")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: "Hello world" } });
    expect(screen.getByText("11 / 1000 characters")).toBeInTheDocument();
  });
});
