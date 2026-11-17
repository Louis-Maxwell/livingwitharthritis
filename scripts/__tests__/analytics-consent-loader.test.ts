import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve("public/security/analytics-consent.js"), "utf8");

// Execute the actual shipped loader with inert script nodes. No network, DOM
// navigation or analytics requests are possible in this harness.
function boot(initial: Record<string, string> = {}, storageThrows = false) {
  const stored = { ...initial };
  const scripts: Array<Record<string, unknown>> = [];
  const listeners: Record<string, () => void> = {};
  const events: string[] = [];
  const win: Record<string, unknown> = {
    location: { href: "https://livingwitharthritis.org.uk/contact?email=private%40example.com#message" },
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
