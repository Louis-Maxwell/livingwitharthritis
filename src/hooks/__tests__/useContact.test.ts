import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn(), message: vi.fn() },
}));

vi.mock("@/lib/backendSubmit", () => ({
  submitContactInquiry: vi.fn(async () => ({
    ok: false,
    via: "mailto",
    mailtoOpened: true,
    message: "Your email app should open with a draft. Please press Send there.",
  })),
}));

import { useContact } from "../useContact";
import { submitContactInquiry } from "@/lib/backendSubmit";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "General enquiry",
  message: "I would like advice about knee osteoarthritis exercises please.",
};

describe("useContact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("falls back to mailto path and never toasts success when backend returns mailto", async () => {
    const { result } = renderHook(() => useContact());
    let response: { success: boolean };
    await act(async () => {
      response = await result.current.submitContact(valid);
    });
    expect(response!.success).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.message).toHaveBeenCalled();
    expect(submitContactInquiry).toHaveBeenCalled();
  });

  it("rejects invalid email without calling backend", async () => {
    const { result } = renderHook(() => useContact());
    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.submitContact({ ...valid, email: "nope" });
    });
    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Invalid email");
    expect(submitContactInquiry).not.toHaveBeenCalled();
  });
});
