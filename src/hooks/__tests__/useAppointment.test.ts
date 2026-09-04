import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAppointment } from "../useAppointment";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

const hrefs: string[] = [];
Object.defineProperty(window, "location", {
  configurable: true,
  value: {
    set href(v: string) {
      hrefs.push(v);
    },
    get href() {
      return hrefs.at(-1) ?? "";
    },
  },
});

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
    hrefs.length = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
  });

  it("returns bookAppointment and isLoading", () => {
    const { result } = renderHook(() => useAppointment());
    expect(result.current.bookAppointment).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("succeeds only on 2xx server accept and toasts success", async () => {
    const { result } = renderHook(() => useAppointment());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });
    expect(response!.success).toBe(true);
    expect(toast.success).toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(false);
    expect(fetch).toHaveBeenCalledWith(
      "/api/appointment",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("does not toast success on failure; may offer mailto last resort", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            ok: false,
            error: "Email delivery is not configured",
            mailtoSuggested: true,
          }),
          { status: 503, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    const { result } = renderHook(() => useAppointment());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });
    expect(response!.success).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
    expect(hrefs.some((h) => h.startsWith("mailto:info@livingwitharthritis.org.uk"))).toBe(true);
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
  });

  it("rate limits after 10 rapid attempts", async () => {
    const { result } = renderHook(() => useAppointment());
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        await result.current.bookAppointment(validData);
      });
    }
    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });
    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Rate limited");
  });
});
