import { StrictMode, type ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAnalyticsPageView } from "../useAnalyticsPageView";

const ready = () => act(() => { window.dispatchEvent(new Event("analytics-ready")); });
const go = (path: string) => window.history.replaceState({}, "", path);
const strict = ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>;

beforeEach(() => {
  go("/contact");
  window.gtag = vi.fn();
  document.title = "Contact";
});
afterEach(() => { delete window.gtag; vi.useRealTimers(); });

describe("SPA analytics page views", () => {
  it("sends one initial view even under StrictMode effect replay", () => {
    renderHook(() => useAnalyticsPageView("/contact"), { wrapper: strict });
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "page_view", expect.objectContaining({ page_path: "/contact", page_title: "Contact", send_to: "G-ZLLSD3PXZ9" }));
  });

  it("does not duplicate a view on repeated readiness events, even later", () => {
    vi.useFakeTimers();
    renderHook(() => useAnalyticsPageView("/contact"));
    ready();
    vi.advanceTimersByTime(5000);
    ready();
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it("waits without queuing before readiness and sends the current route once", () => {
    delete window.gtag;
    const { rerender } = renderHook(({ path }) => useAnalyticsPageView(path), { initialProps: { path: "/contact" } });
    ready();
    go("/faq");
    rerender({ path: "/faq" });
    window.gtag = vi.fn();
    ready();
    ready();
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "page_view", expect.objectContaining({ page_path: "/faq" }));
  });

  it("counts genuine route visits including back navigation", () => {
    const { rerender } = renderHook(({ path }) => useAnalyticsPageView(path), { initialProps: { path: "/contact" } });
    go("/faq"); rerender({ path: "/faq" });
    go("/contact"); rerender({ path: "/contact" });
    const calls = vi.mocked(window.gtag!).mock.calls;
    expect(calls.map((call) => (call[2] as { page_path: string }).page_path)).toEqual(["/contact", "/faq", "/contact"]);
  });

  it("keeps a return visit eligible when the intervening route awaited readiness", () => {
    const { rerender } = renderHook(({ path }) => useAnalyticsPageView(path), { initialProps: { path: "/contact" } });
    const first = window.gtag;
    delete window.gtag;
    go("/faq"); rerender({ path: "/faq" });
    go("/contact"); rerender({ path: "/contact" });
    window.gtag = first;
    ready();
    expect(window.gtag).toHaveBeenCalledTimes(2);
  });

  it("does not count query-only or fragment changes as another clean-route view", () => {
    const { rerender } = renderHook(({ path, query: _query }) => useAnalyticsPageView(path), { initialProps: { path: "/contact", query: "" } });
    go("/contact?email=private%40example.com#private-message");
    rerender({ path: "/contact", query: "?email=private%40example.com" });
    ready();
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(vi.mocked(window.gtag!).mock.calls)).not.toContain("private");
  });

  it("strips query and fragment from the initial page and referrer", () => {
    go("/contact?email=private%40example.com#private-message");
    const referrer = vi.spyOn(document, "referrer", "get").mockReturnValue("https://example.org/guide?query=private#private");
    renderHook(() => useAnalyticsPageView("/contact"));
    expect(window.gtag).toHaveBeenCalledWith("event", "page_view", expect.objectContaining({ page_location: `${window.location.origin}/contact`, page_referrer: "https://example.org/guide" }));
    expect(JSON.stringify(vi.mocked(window.gtag!).mock.calls)).not.toContain("private");
    referrer.mockRestore();
  });

  it("removes the readiness listener on unmount", () => {
    delete window.gtag;
    const { unmount } = renderHook(() => useAnalyticsPageView("/contact"));
    unmount();
    window.gtag = vi.fn();
    ready();
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
