import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import SiteMotion from "@/components/motion/SiteMotion";
import { applyActionDepth, applySiteMotion } from "@/lib/siteMotion";

const css = readFileSync("src/index.css", "utf8");

function place(el: Element, top: number, height = 120) {
  (el as HTMLElement).getBoundingClientRect = () =>
    ({
      top,
      bottom: top + height,
      height,
      left: 0,
      right: 300,
      width: 300,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect;
}

function page() {
  document.body.innerHTML = `
    <header><div class="rounded-2xl border" id="hdr"></div></header>
    <main>
      <section class="rounded-2xl border" id="hero"><h1>Title</h1></section>
      <ul class="grid gap-4"><li id="card1"><a href="/a">A</a></li><li id="card2">Plain</li></ul>
      <div class="rounded-xl border" id="formcard"><form><input /></form></div>
      <div class="prose"><div class="rounded-xl border" id="inprose"></div></div>
      <div class="rounded-2xl border" id="outer"><div class="rounded-xl border" id="inner"></div></div>
    </main>
    <footer><div class="rounded-xl border" id="ftr"></div></footer>`;
  const ids = [
    "hdr",
    "hero",
    "card1",
    "card2",
    "formcard",
    "inprose",
    "outer",
    "inner",
    "ftr",
  ];
  ids.forEach((id) =>
    place(document.getElementById(id)!, id === "hero" ? 0 : 1200),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("site-wide reveal and lift (SiteMotion)", () => {
  it("arms only below-the-fold cards, never the hero, forms, prose, header or footer", () => {
    page();
    const observed: Element[] = [];
    applySiteMotion(document, 800, (el) => observed.push(el));
    const armed = (id: string) =>
      document.getElementById(id)!.getAttribute("data-site-reveal");
    expect(armed("card1")).toBe("armed");
    expect(armed("card2")).toBe("armed");
    expect(armed("inner")).toBe("armed");
    for (const id of ["hero", "formcard", "inprose", "hdr", "ftr", "outer"])
      expect(armed(id), id).toBeNull();
    expect(observed.map((e) => e.id).sort()).toEqual([
      "card1",
      "card2",
      "inner",
    ]);
  });

  it("gives interactive cards the hover lift, not static ones", () => {
    page();
    applySiteMotion(document, 800, () => {});
    expect(
      document.getElementById("card1")!.hasAttribute("data-site-lift"),
    ).toBe(true);
    expect(
      document.getElementById("card2")!.hasAttribute("data-site-lift"),
    ).toBe(false);
  });

  it("adds depth to cards without nesting it or moving forms, prose, alerts or headings", () => {
    page();
    document.querySelector("main")!.insertAdjacentHTML("beforeend", `
      <div role="alert" class="rounded-xl border" id="urgent">Urgent advice</div>
      <div class="reveal rounded-xl border" id="existing"><a href="/help">Help</a></div>
      <button class="btn-map" id="action">Find help</button>
      <form><button id="submit">Send</button></form>
      <div class="prose"><button id="prose-action">Example</button></div>
      <button id="faq" class="btn-map" aria-expanded="false">FAQ</button>
      <div class="reveal"><a class="rounded-xl border" id="nested-reveal" href="/a">Nested</a></div>
      <button id="disabled" disabled>Unavailable</button>`);
    for (const id of ["urgent", "existing", "nested-reveal"]) place(document.getElementById(id)!, 1200);
    applySiteMotion(document, 800, () => {});
    applyActionDepth(document);
    expect(document.getElementById("card1")).toHaveAttribute("data-site-depth", "card");
    expect(document.getElementById("existing")).toHaveAttribute("data-site-depth", "card");
    expect(document.getElementById("existing")).not.toHaveAttribute("data-site-reveal");
    expect(document.getElementById("nested-reveal")).not.toHaveAttribute("data-site-reveal");
    expect(document.getElementById("nested-reveal")).toHaveAttribute("data-site-depth", "card");
    expect(document.getElementById("action")).toHaveAttribute("data-site-depth", "action");
    for (const id of ["hero", "formcard", "inprose", "hdr", "ftr", "outer", "inner", "urgent", "submit", "prose-action", "disabled", "faq"])
      expect(document.getElementById(id), id).not.toHaveAttribute("data-site-depth");
  });

  it("keeps pills, static advice, tall panels and navigation free of 3D", () => {
    document.body.innerHTML = `<main>
      <a class="rounded-xl border" id="pill" href="/a">Small</a>
      <a class="rounded-xl border" id="tall" href="/a">Tall</a>
      <div class="rounded-xl border" id="static">Advice</div>
      <nav><button id="navigation">Menu</button></nav>
      <aside class="key-takeaways rounded-xl border" id="key"><a href="/a">Key</a></aside>
      <aside class="editorial-review-note rounded-xl border" id="review"><a href="/a">Review</a></aside>
      </main>`;
    for (const id of ["pill", "tall", "static", "key", "review"])
      place(document.getElementById(id)!, 1200, id === "pill" ? 40 : id === "tall" ? 900 : 120);
    applySiteMotion(document, 800, () => {});
    applyActionDepth(document);
    expect(document.querySelector("[data-site-depth]")).toBeNull();
  });

  it("does nothing with prefers-reduced-motion or during prerender", () => {
    page();
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("reduce"),
      media: q,
      addEventListener() {},
      removeEventListener() {},
    }));
    render(<SiteMotion />);
    expect(document.querySelector("[data-site-reveal]")).toBeNull();
    vi.unstubAllGlobals();
    (window as unknown as Record<string, unknown>).__PRERENDER_INJECTED__ = {};
    render(<SiteMotion />);
    expect(document.querySelector("[data-site-reveal]")).toBeNull();
    delete (window as unknown as Record<string, unknown>)
      .__PRERENDER_INJECTED__;
  });

  it("reveals once on scroll, including cards a fast scroll jumped past", async () => {
    page();
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: false,
      media: q,
      addEventListener() {},
      removeEventListener() {},
    }));
    render(<SiteMotion />);
    await new Promise((r) => setTimeout(r, 50));
    const card = document.getElementById("card1")!;
    expect(card.getAttribute("data-site-reveal")).toBe("armed");
    place(card, -900); // now above the viewport without ever "intersecting"
    window.dispatchEvent(new Event("scroll"));
    await new Promise((r) => setTimeout(r, 50));
    expect(card.getAttribute("data-site-reveal")).toBe("shown");
  });

  it("is mounted for every route", () => {
    expect(readFileSync("src/App.tsx", "utf8")).toMatch(
      /<SiteMotion key=\{location\.pathname\} \/>/,
    );
  });
});

describe("site-wide motion CSS", () => {
  const start = css.indexOf("/* Site-wide motion (SiteMotion).");
  const region = css.slice(
    start,
    css.indexOf("/* Text split reveal */", start),
  );

  it("reveals with translate only (no fade), so contrast holds at every frame", () => {
    expect(region).toMatch(
      /\[data-site-reveal="armed"\] \{\s*translate: 0 14px;\s*\}/,
    );
    expect(region).not.toMatch(/opacity\s*:/);
  });

  it("lifts cards only for hover-capable fine pointers", () => {
    expect(region).toMatch(
      /@media \(hover: hover\) and \(pointer: fine\) \{\s*\[data-site-lift\]/,
    );
  });

  it("presses every button subtly", () => {
    expect(region).toMatch(
      /:where\(button, \[role="button"\][^{]*:active \{\s*scale: 0\.98;/,
    );
  });

  it("has no looping keyframes and uses tokens, not hex", () => {
    expect(region).not.toMatch(/infinite/);
    expect(region).not.toMatch(/#[0-9a-f]{3,6}\b/i);
  });

  it("reduced motion switches the new effects off", () => {
    const block = css.slice(
      css.lastIndexOf("@media (prefers-reduced-motion: reduce)"),
    );
    for (const sel of [
      "[data-site-reveal]",
      "[data-site-lift]:hover",
      "details[open] > :not(summary)",
    ])
      expect(block).toContain(sel);
  });

  it("FAQ accordions open with a gentle ease", () => {
    expect(readFileSync("tailwind.config.ts", "utf8")).toContain(
      '"accordion-down 0.28s cubic-bezier(0.16, 1, 0.3, 1)"',
    );
  });
});

describe("no looping decoration", () => {
  it("ships no animate-ping anywhere in the app", () => {
    const hits = execSync(
      "git grep -l animate-ping -- src ':!*.test.*' || true",
      { encoding: "utf8" },
    ).trim();
    expect(hits).toBe("");
  });

  it("the header gains a subtle shadow once scrolled", () => {
    expect(readFileSync("src/components/Header.tsx", "utf8")).toMatch(
      /border-b border-border\/30 shadow-sm/,
    );
  });
});

describe("progressive 3D depth safety", () => {
  const region = css.slice(css.indexOf("/* Site-wide 3D depth."), css.indexOf("/* Text split reveal */"));
  it("uses real CSS perspective, short one-time entry and fine-pointer tilt without invisible content", () => {
    expect(region).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(region).toContain("perspective(1000px) rotateX(5deg) translateZ(-8px)");
    expect(region).toContain("@media (hover: hover) and (pointer: fine)");
    expect(region).toContain(":not(:focus-within):hover");
    expect(region).not.toMatch(/opacity\s*:|infinite|will-change/);
  });
  it("disables depth for reduced-motion and print and retains stable keyboard focus", () => {
    expect(region).toContain("@media (prefers-reduced-motion: reduce), print");
    expect(region).toContain("transform: none !important");
    expect(region).toContain("transition: none !important");
    expect(region).toContain("[data-site-depth]:focus-visible");
    expect(region).toContain('[data-site-depth="card"][data-site-lift][data-site-reveal]');
    expect(region).toContain("translate: none !important");
    expect(region).toContain('.reveal.hover-lift[data-site-depth="card"][data-reveal]');
    expect(region).toContain("color 150ms ease, border-color 150ms ease");
    expect(region).toContain("scale 150ms ease");
  });
});
