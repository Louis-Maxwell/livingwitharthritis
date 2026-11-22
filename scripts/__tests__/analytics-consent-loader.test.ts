import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve("public/security/analytics-consent.js"), "utf8");

// Execute the actual shipped loader with inert script nodes. No network, DOM
// navigation or analytics requests are possible in this harness.
function boot(initial: Record<string, string> = {}, storageThrows = false, href = "https://livingwitharthritis.org.uk/contact?email=private%40example.com#message") {
  const stored = { ...initial };
  const scripts: Array<Record<string, unknown>> = [];
  const listeners: Record<string, () => void> = {};
  const events: string[] = [];
  const win: Record<string, unknown> = {
    location: { href },
    addEventListener: (name: string, fn: () => void) => { listeners[name] = fn; },
    dispatchEvent: (event: { type: string }) => { events.push(event.type); },
  };
  const context = {
    window: win,
    localStorage: { getItem: (key: string) => {
      if (storageThrows) throw new Error("Storage unavailable");
      return stored[key] ?? null;
    } },
    document: {
      referrer: "https://example.org/private-path?email=private@example.com",
      head: { appendChild: (node: Record<string, unknown>) => scripts.push(node) },
      createElement: () => ({ setAttribute() {} }),
    },
    URL, Date, Event,
  };
  runInNewContext(source, context);
  return { stored, scripts, events, win, acceptEvent: () => listeners["cookie-consent-accepted"](), load: () => (win.__loadAnalytics as () => void)() };
}

describe("shipped consent loader", () => {
  it("exposes one immutable configured target without loading analytics before consent", () => {
    const app = boot();
    expect(app.win.__LWA_GA4_ID__).toBe("G-ZLLSD3PXZ9");
    expect(Reflect.set(app.win, "__LWA_GA4_ID__", "G-UNVERIFIED")).toBe(false);
    expect(app.win.__LWA_GA4_ID__).toBe("G-ZLLSD3PXZ9");
    expect(app.scripts).toEqual([]);
    expect(app.win.gtag).toBeUndefined();
  });
  it.each([
    {},
    { "cookie-consent": "declined" },
    { lwa_cv3: JSON.stringify({ a: false }) },
    { lwa_cv3: JSON.stringify({ a: false }), "cookie-consent": "accepted" },
    { lwa_cv3: "invalid-json", "cookie-consent": "accepted" },
    { lwa_cv3: "null", "cookie-consent": "accepted" },
    { lwa_cv3: JSON.stringify({ a: "true" }), "cookie-consent": "accepted" },
  ])("never loads optional scripts without valid consent: %j", (stored) => {
    const app = boot(stored);
    app.acceptEvent();
    app.load();
    expect(app.scripts).toHaveLength(0);
    expect(app.events).toHaveLength(0);
    expect(app.win.gtag).toBeUndefined();
  });

  it("fails closed when storage is unavailable", () => {
    const app = boot({}, true);
    app.acceptEvent();
    expect(app.scripts).toHaveLength(0);
  });

  it.each([
    { "cookie-consent": "accepted" },
    { lwa_cv3: JSON.stringify({ a: true }), "cookie-consent": "declined" },
  ])("loads once for a valid saved choice: %j", (stored) => {
    const app = boot(stored);
    app.acceptEvent();
    app.load();
    expect(app.scripts).toHaveLength(2);
    expect(app.events).toEqual(["analytics-ready"]);
    const queue = app.win.dataLayer as IArguments[];
    const config = Array.from(queue[1]);
    expect(config[0]).toBe("config");
    expect(config[2]).toEqual({ send_page_view: false, page_location: "https://livingwitharthritis.org.uk/contact", page_referrer: "https://example.org/" });
  });

  it.each([
    ["/contact/+447700900123", "/"],
    ["/contact/%2B44%207700%20900123", "/"],
    ["/contact/test@example.invalid", "/"],
    ["/contact/test%40example.invalid", "/"],
    ["/contact/%E0%A4%A", "/"],
    ["/@LivingWithArthritis", "/@LivingWithArthritis"],
    ["/blog/pip-for-arthritis-uk", "/blog/pip-for-arthritis-uk"],
  ])("keeps bootstrap contact identifiers out of page_location: %s", (path, safePath) => {
    const app = boot({ lwa_cv3: JSON.stringify({ a: true }) }, false, `https://livingwitharthritis.org.uk${path}?q=private#private`);
    const config = Array.from((app.win.dataLayer as IArguments[])[1]);
    expect(config[2]).toEqual({ send_page_view: false, page_location: `https://livingwitharthritis.org.uk${safePath}`, page_referrer: "https://example.org/" });
  });

  it("can load after an initially denied choice becomes accepted", () => {
    const app = boot({ lwa_cv3: JSON.stringify({ a: false }) });
    app.acceptEvent();
    expect(app.scripts).toHaveLength(0);
    app.stored.lwa_cv3 = JSON.stringify({ a: true });
    app.acceptEvent();
    app.acceptEvent();
    expect(app.scripts).toHaveLength(2);
    expect(app.events).toEqual(["analytics-ready"]);
  });
});
