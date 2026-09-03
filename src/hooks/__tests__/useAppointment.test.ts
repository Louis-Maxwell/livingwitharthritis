import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAppointment } from "../useAppointment";

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

const hrefs: string[] = [];
vi.stubGlobal("location", { ...window.location, href: "" });
Object.defineProperty(window, "location", {
  configurable: true,
  value: {
    set href(v: string) { hrefs.push(v); },
    get href() { return hrefs.at(-1) ?? ""; },
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
  });

  it("returns bookAppointment and isLoading", () => {
    const { result } = renderHook(() => useAppointment());
    expect(result.current.bookAppointment).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("opens a mailto for a valid booking instead of storing it", async () => {
    const { result } = renderHook(() => useAppointment());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });
    expect(response!.success).toBe(true);
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
      await act(async () => { await result.current.bookAppointment(validData); });
    }
    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.bookAppointment(validData);
    });
    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Rate limited");
  });
});
