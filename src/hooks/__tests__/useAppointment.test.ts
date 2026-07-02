import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAppointment } from "../useAppointment";

const mockInvoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: { invoke: (...args: unknown[]) => mockInvoke(...args) },
  },
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

const validData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "07777123456",
  appointmentType: "physiotherapy",
  preferredDate: "2026-05-01",
  preferredTime: "10:00",
  notes: "First visit",
};

describe("useAppointment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns bookAppointment and isLoading", () => {
    const { result } = renderHook(() => useAppointment());
    expect(result.current.bookAppointment).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("books appointment successfully", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: { message: "Booked!", appointmentId: "abc-123" },
      error: null,
    });
    const { result } = renderHook(() => useAppointment());

    let response: { success: boolean; appointmentId?: string };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });

    expect(response!.success).toBe(true);
    expect(response!.appointmentId).toBe("abc-123");
    expect(mockInvoke).toHaveBeenCalledWith("book-appointment", expect.objectContaining({ body: expect.any(Object) }));
  });

  it("handles edge function error", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: "Server error" },
    });
    const { result } = renderHook(() => useAppointment());

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Server error");
  });

  it("rejects invalid email", async () => {
    const { result } = renderHook(() => useAppointment());

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.bookAppointment({
        ...validData,
        email: "not-an-email",
      });
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Invalid email");
    expect(mockInvoke).not.toHaveBeenCalled();
  });

  it("rate limits after 10 rapid attempts", async () => {
    mockInvoke.mockResolvedValue({
      data: { message: "OK", appointmentId: "x" },
      error: null,
    });
    const { result } = renderHook(() => useAppointment());

    for (let i = 0; i < 10; i++) {
      await act(async () => { await result.current.bookAppointment(validData); });
    }

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Rate limited");
  });

  it("sanitizes input data", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: { message: "OK", appointmentId: "x" },
      error: null,
    });
    const { result } = renderHook(() => useAppointment());

    await act(async () => {
      await result.current.bookAppointment({
        ...validData,
        name: "<script>alert('xss')</script>John",
      });
    });

    const calledBody = mockInvoke.mock.calls[0][1].body;
    expect(calledBody.name).not.toContain("<script>");
  });
});
