import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDonation } from "../useDonation";

const mockInvoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    functions: { invoke: (...args: unknown[]) => mockInvoke(...args) },
  },
}));

const mockToast = { error: vi.fn() };
vi.mock("sonner", () => ({
  toast: { error: (...args: unknown[]) => mockToast.error(...args) },
}));

const donationData = {
  amount: 25,
  currency: "GBP",
  fundType: "general",
  donorName: "Jane Doe",
  donorEmail: "jane@example.com",
};

describe("useDonation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns processDonation and isLoading", () => {
    const { result } = renderHook(() => useDonation());
    expect(result.current.processDonation).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("redirects on successful checkout URL", async () => {
    const originalHref = window.location.href;
    delete (window as any).location;
    (window as any).location = { href: originalHref };

    mockInvoke.mockResolvedValueOnce({
      data: { url: "https://checkout.stripe.com/session123" },
      error: null,
    });

    const { result } = renderHook(() => useDonation());

    let response: { success: boolean };
    await act(async () => {
      response = await result.current.processDonation(donationData);
    });

    expect(response!.success).toBe(true);
    expect(window.location.href).toBe("https://checkout.stripe.com/session123");

    // restore
    (window as any).location = { href: originalHref };
  });

  it("handles edge function error", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: "Stripe error" },
    });

    const { result } = renderHook(() => useDonation());

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.processDonation(donationData);
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Stripe error");
    expect(mockToast.error).toHaveBeenCalledWith("Stripe error");
  });

  it("handles result-level error", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: { error: "Invalid amount" },
      error: null,
    });

    const { result } = renderHook(() => useDonation());

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.processDonation(donationData);
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("Invalid amount");
  });

  it("handles missing checkout URL", async () => {
    mockInvoke.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    const { result } = renderHook(() => useDonation());

    let response: { success: boolean; error?: string };
    await act(async () => {
      response = await result.current.processDonation(donationData);
    });

    expect(response!.success).toBe(false);
    expect(response!.error).toBe("No checkout URL returned");
  });

  it("sets isLoading during processing", async () => {
    let resolvePromise: (v: any) => void;
    mockInvoke.mockReturnValueOnce(
      new Promise((resolve) => { resolvePromise = resolve; })
    );

    const { result } = renderHook(() => useDonation());

    let promise: Promise<any>;
    act(() => {
      promise = result.current.processDonation(donationData);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!({ data: { url: "https://example.com" }, error: null });
      await promise!;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
