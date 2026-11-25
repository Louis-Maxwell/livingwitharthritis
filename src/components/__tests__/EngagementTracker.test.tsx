import { StrictMode } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EngagementTracker from "../EngagementTracker";

let visible = "visible";
let focused = true;
const allow = () => localStorage.setItem("lwa_cv3", JSON.stringify({ a: true }));
const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const calls = (name: string) => vi.mocked(window.gtag!).mock.calls.filter(call => call[1] === name);
const mount = () => render(<StrictMode><BrowserRouter><EngagementTracker /></BrowserRouter></StrictMode>);

beforeEach(() => {
  vi.useFakeTimers(); localStorage.clear(); visible = "visible"; focused = true;
  window.history.replaceState({}, "", "/blog/example"); window.gtag = vi.fn();
  vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visible as DocumentVisibilityState);
  vi.spyOn(document, "hasFocus").mockImplementation(() => focused);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); localStorage.clear(); document.body.innerHTML = ""; delete window.gtag; });

describe("consent-safe reading ownership", () => {
  it("sends no activity or reading events without consent", () => {
    const view = mount(); advance(120_000); view.unmount();
    expect(window.gtag).not.toHaveBeenCalled();
  });
  it("never counts the partially pre-consent tick when permission appears between ticks", () => {
    mount(); advance(10_500); allow(); advance(9500);
    expect(calls("engaged_session")).toHaveLength(0);
    advance(1000);
    expect(calls("engaged_session")).toHaveLength(1);
    expect(calls("engaged_session")[0][2]).toMatchObject({ active_time_ms: 10_000 });
  });
  it("does not count hidden-tab time or send its backlog on return", () => {
    allow(); visible = "hidden"; const view = mount(); advance(40_000);
    visible = "visible"; act(() => document.dispatchEvent(new Event("visibilitychange"))); advance(30_000); view.unmount();
    const readings = calls("article_active_reading");
    expect(readings.reduce((sum, call) => sum + Number((call[2] as Record<string, unknown>).active_reading_seconds), 0)).toBe(30);
  });
  it("does not count unfocused time", () => {
    allow(); focused = false; const view = mount(); advance(40_000);
    focused = true; act(() => window.dispatchEvent(new Event("focus"))); advance(30_000); view.unmount();
    expect(calls("article_active_reading").reduce((sum, call) => sum + Number((call[2] as Record<string, unknown>).active_reading_seconds), 0)).toBe(30);
  });
  it("pauses after the idle limit and resumes on an actual activity event", () => {
    allow(); const view = mount(); advance(180_000);
    expect(calls("engagement_60s")).toHaveLength(1);
    expect(calls("engagement_180s")).toHaveLength(0);
    act(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }))); advance(30_000); view.unmount();
    expect(calls("article_active_reading").reduce((sum, call) => sum + Number((call[2] as Record<string, unknown>).active_reading_seconds), 0)).toBe(90);
  });
  it("keeps one landing event across StrictMode/rerenders but counts a new route visit", () => {
    allow(); window.history.replaceState({}, "", "/"); const view = mount();
    view.rerender(<StrictMode><BrowserRouter><EngagementTracker /></BrowserRouter></StrictMode>);
    expect(calls("landing_page_view")).toHaveLength(1);
    act(() => { window.history.pushState({}, "", "/about"); window.dispatchEvent(new PopStateEvent("popstate")); });
    expect(calls("landing_page_view")).toHaveLength(2);
  });
  it("emits each article exposure milestone once, not once per scroll or rerender", () => {
    allow(); vi.stubGlobal("innerHeight", 1000);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    const main = document.createElement("main"); const article = document.createElement("article"); main.appendChild(article); document.body.appendChild(main);
    vi.spyOn(article, "getBoundingClientRect").mockReturnValue({ top: -1000, height: 2000 } as DOMRect);
    mount();
    act(() => { window.dispatchEvent(new Event("scroll")); window.dispatchEvent(new Event("scroll")); }); advance(20);
    act(() => window.dispatchEvent(new Event("scroll"))); advance(20);
    expect(calls("article_read_progress").map(call => (call[2] as Record<string, unknown>).scroll_threshold)).toEqual([25, 50, 75, 100]);
    expect(calls("reading_complete")).toHaveLength(1);
    expect(calls("reading_complete")[0][2]).toMatchObject({ measurement: "scroll_exposure" });
  });
});
