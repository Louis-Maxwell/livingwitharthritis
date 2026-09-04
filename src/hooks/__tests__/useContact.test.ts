import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContact } from "../useContact";
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

  it("toasts success only after confirmed 2xx accept", async () => {
    const { result } = renderHook(() => useContact());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.submitContact(valid);
    });
    expect(response!.success).toBe(true);
    expect(toast.success).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    expect(hrefs.some((h) => h.startsWith("mailto:"))).toBe(false);
  });

  it("does not toast success on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: false, error: "Nope", mailtoSuggested: true }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const { result } = renderHook(() => useContact());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.submitContact(valid);
    });
    expect(response!.success).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });
});
