import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackSearch as trackAnalyticsSearch } from "@/lib/analytics";
import { trackSearch as trackLegacySearch } from "@/lib/ga-events";

beforeEach(() => localStorage.setItem("lwa_cv3", JSON.stringify({ a: true })));
afterEach(() => { localStorage.clear(); delete window.gtag; delete window.dataLayer; });

describe("search tracking privacy", () => {
  it("standardises both helpers to counts without typed health or contact text", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    const privateText = "example-condition example@example.com";
    trackAnalyticsSearch(privateText, 7);
    trackLegacySearch(privateText, 0);
    expect(gtag.mock.calls).toEqual([
      ["event", "site_search", { result_count: 7, zero_results: false, page_location: expect.any(String), page_title: expect.any(String) }],
      ["event", "site_search", { result_count: 0, zero_results: true, page_location: expect.any(String), page_title: expect.any(String) }],
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(privateText);
  });

  it("does not queue searches when gtag is unavailable", () => {
    window.dataLayer = [];
    trackAnalyticsSearch("private-example", 0);
    trackLegacySearch("private-example", 0);
    expect(window.dataLayer).toEqual([]);
  });
});
