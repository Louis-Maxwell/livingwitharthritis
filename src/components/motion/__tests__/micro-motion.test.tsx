import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import ScrollProgress from "@/components/ScrollProgress";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const css = readFileSync("src/index.css", "utf8");

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let ioCallback: IOCallback | null = null;
const disconnect = vi.fn();

function mockIO() {
  class IO {
    constructor(cb: IOCallback) {
      ioCallback = cb;
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = disconnect;
    takeRecords = () => [];
  }
  vi.stubGlobal("IntersectionObserver", IO);
}

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: reduce && q.includes("prefers-reduced-motion"),
    media: q,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    onchange: null,
    dispatchEvent: vi.fn(),
  }));
}

function belowFold(top: number) {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top } as DOMRect);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  ioCallback = null;
  disconnect.mockClear();
  delete (window as unknown as Record<string, unknown>).__PRERENDER_INJECTED__;
});

describe("ScrollProgress (reading progress)", () => {
  it("is an accessible 3px progressbar that animates with scaleX, not width", () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole("progressbar", { name: "Reading progress" });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow");
    expect(bar).not.toHaveAttribute("aria-hidden");
    expect(bar.className).toMatch(/\bfixed\b/);
    expect(bar.className).toMatch(/h-\[3px\]/);
    expect(bar.className).toMatch(/pointer-events-none/);
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.transform).toMatch(/^scaleX\(/);
    expect(fill.style.width).toBe("");
    expect(fill.className).toMatch(/bg-primary/);
    expect(fill.className).not.toMatch(/transition/);
  });

  it("is mounted for blog posts and guides from the router", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    expect(app).toMatch(/showReadingProgress = \/\^\\\/\(blog\|guides\)/);
    expect(readFileSync("src/pages/BlogPost.tsx", "utf8")).not.toContain("ScrollProgress");
  });
});

describe("RevealOnScroll", () => {
  it("static/prerendered HTML has the content visible (no hidden state)", () => {
    const html = renderToStaticMarkup(<RevealOnScroll>Find help today</RevealOnScroll>);
    expect(html).toContain("Find help today");
    expect(html).not.toContain("data-reveal");
    expect(html).not.toContain("is-visible");
  });

  it("CSS only hides elements the component armed after hydration", () => {
    expect(css).toMatch(/\.reveal\[data-reveal="armed"\]:not\(\.is-visible\)\s*\{\s*translate: 0 14px;\s*\}/);
    expect(css).not.toMatch(/(^|\n)\s*\.reveal\s*\{[^}]*opacity:\s*0/);
  });

  it("never fades revealed text, so contrast holds at every frame", () => {
    const start = css.indexOf("/* Reveal on scroll (RevealOnScroll).");
    const region = css.slice(start, css.indexOf("/* Text split reveal */", start));
    expect(region).not.toMatch(/opacity:\s*0/);
  });

  it("arms a below-the-fold card, reveals once and disconnects", () => {
    mockReducedMotion(false);
    mockIO();
    belowFold(5000);
    render(<RevealOnScroll>Card</RevealOnScroll>);
    const el = screen.getByText("Card");
    expect(el).toHaveAttribute("data-reveal", "armed");
    expect(el).not.toHaveClass("is-visible");
    act(() => ioCallback!([{ isIntersecting: true }]));
    expect(el).toHaveClass("is-visible");
    expect(disconnect).toHaveBeenCalled();
  });

  it("never hides content that is already in the viewport", () => {
    mockReducedMotion(false);
    mockIO();
    belowFold(10);
    render(<RevealOnScroll>Hero card</RevealOnScroll>);
    expect(screen.getByText("Hero card")).not.toHaveAttribute("data-reveal");
  });

  it("does nothing with prefers-reduced-motion: reduce", () => {
    mockReducedMotion(true);
    mockIO();
    belowFold(5000);
    render(<RevealOnScroll>Calm card</RevealOnScroll>);
    expect(screen.getByText("Calm card")).not.toHaveAttribute("data-reveal");
    expect(ioCallback).toBeNull();
  });

  it("does nothing while the prerenderer takes its snapshot", () => {
    mockReducedMotion(false);
    mockIO();
    belowFold(5000);
    (window as unknown as Record<string, unknown>).__PRERENDER_INJECTED__ = { prerender: true };
    render(<RevealOnScroll>Crawler card</RevealOnScroll>);
    expect(screen.getByText("Crawler card")).not.toHaveAttribute("data-reveal");
  });

  it("is used on the homepage visitor-job cards only, with the hover lift", () => {
    const router = readFileSync("src/components/landing/HomeJobRouter.tsx", "utf8");
    expect(router).toMatch(/<RevealOnScroll\s+as="li"[\s\S]*?className=\{`hover-lift /);
  });
});

describe("motion CSS utilities", () => {
  it("card lift only applies to hover-capable fine pointers", () => {
    expect(css).toMatch(/@media \(hover: hover\) and \(pointer: fine\) \{\s*\.hover-lift:hover/);
  });

  it("main buttons get a subtle press", () => {
    expect(readFileSync("src/components/ui/button.tsx", "utf8")).toContain("btn-press");
    expect(css).toMatch(/\.btn-press:active:not\(:disabled\) \{\s*scale: 0\.98;/);
  });

  it("prefers-reduced-motion turns every effect off", () => {
    const block = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
    for (const sel of [".reveal", ".hover-lift:hover", ".btn-press:active", ".btn-map:active"]) expect(block).toContain(sel);
    expect(block).toMatch(/opacity: 1 !important/);
    expect(block).toMatch(/translate: none !important/);
    expect(block).toMatch(/scale: none !important/);
  });

  it("uses tokens, not hardcoded hex, for the new effects", () => {
    const region = css.slice(css.indexOf("/* Reveal on scroll (RevealOnScroll)"), css.indexOf("/* Text split reveal */"));
    expect(region).not.toMatch(/#[0-9a-f]{3,6}\b/i);
  });
});
