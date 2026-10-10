import { afterEach, describe, expect, it, vi } from "vitest";
import { trackSearch as trackAnalyticsSearch } from "@/lib/analytics";
import { trackSearch as trackLegacySearch } from "@/lib/ga-events";

afterEach(() => { delete window.gtag; delete window.dataLayer; });

describe("search tracking privacy", () => {
  it("retains usage counts without sending typed health or contact text", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    const privateText = "example-condition example@example.com";
    trackAnalyticsSearch(privateText, 7);
    trackLegacySearch(privateText, 9);
    expect(gtag.mock.calls).toEqual([
      ["event", "search", { search_result_count: 7, event_category: "engagement" }],
      ["event", "search", { results_found: 9 }],
    ]);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(privateText);
  });

  it("also excludes typed text from the dataLayer fallback", () => {
    window.dataLayer = [];
    trackAnalyticsSearch("private-example", 0);
    trackLegacySearch("private-example", 0);
    expect(window.dataLayer).toHaveLength(2);
    expect(JSON.stringify(window.dataLayer)).not.toContain("private-example");
    expect(JSON.stringify(window.dataLayer)).not.toContain("search_term");
  });
});
