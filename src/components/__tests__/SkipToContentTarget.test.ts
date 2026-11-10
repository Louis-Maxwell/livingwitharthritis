import { describe, it, expect, beforeEach } from "vitest";
import { ensureMainContentTarget } from "@/lib/skipLinkTarget";

describe("ensureMainContentTarget", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("keeps an existing #main-content", () => {
    document.body.innerHTML = '<div id="main-content"></div><main></main>';
    expect(ensureMainContentTarget()).toBe(true);
    expect(document.querySelector("main")?.id).toBe("");
  });
  it("uses <main> when present", () => {
    document.body.innerHTML = "<main><h1>Hi</h1></main>";
    expect(ensureMainContentTarget()).toBe(true);
    expect(document.querySelector("main")?.id).toBe("main-content");
    expect(document.querySelector("main")?.getAttribute("tabindex")).toBe("-1");
  });
  it("falls back to the H1", () => {
    document.body.innerHTML = "<div><h1>Hi</h1></div>";
    expect(ensureMainContentTarget()).toBe(true);
    expect(document.querySelector("h1")?.id).toBe("main-content");
  });
  it("returns false with no target", () => {
    expect(ensureMainContentTarget()).toBe(false);
  });
});
