import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContact } from "../useContact";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn(), message: vi.fn() },
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

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "General enquiry",
  message: "I would like advice about knee osteoarthritis exercises please.",
};

describe("useContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hrefs.length = 0;
  });

  it("opens mailto and never toasts success", async () => {
    const { result } = renderHook(() => useContact());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.submitContact(valid);
    });
    expect(response!.success).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.message).toHaveBeenCalled();
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("rejects invalid email without mailto", async () => {
    const { result } = renderHook(() => useContact());
    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.submitContact({ ...valid, email: "nope" });
    });
    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Invalid email");
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(false);
  });
});
