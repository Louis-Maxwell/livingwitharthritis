import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  isChunkLoadError,
  importWithRetry,
  canAutoReload,
  reloadOnce,
  stripReloadParam,
  RELOAD_WINDOW_MS,
} from "@/lib/chunkRecovery";

describe("chunkRecovery", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  it("recognises chunk load errors across browsers", () => {
    expect(isChunkLoadError(new TypeError("Failed to fetch dynamically imported module: https://x/assets/a.js"))).toBe(true);
    expect(isChunkLoadError(new TypeError("Importing a module script failed."))).toBe(true);
    expect(isChunkLoadError("error loading dynamically imported module")).toBe(true);
    expect(isChunkLoadError(new Error("Unable to preload CSS for /assets/x.css"))).toBe(true);
    expect(isChunkLoadError(new Error("Cannot read properties of undefined"))).toBe(false);
    expect(isChunkLoadError(undefined)).toBe(false);
  });

  it("retries a failing import and resolves when a later attempt succeeds", async () => {
    const factory = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new TypeError("Failed to fetch dynamically imported module"))
      .mockResolvedValueOnce("ok");
    await expect(importWithRetry(factory, 2, 1)).resolves.toBe("ok");
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("rethrows non-chunk errors after retries", async () => {
    const factory = vi.fn<() => Promise<string>>().mockRejectedValue(new Error("boom"));
    await expect(importWithRetry(factory, 1, 1)).rejects.toThrow("boom");
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("allows only one automatic reload per window", () => {
    const replace = vi.fn();
    const original = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...original, href: "http://localhost/blog/x", replace },
    });
    try {
      expect(canAutoReload()).toBe(true);
      expect(reloadOnce()).toBe(true);
      expect(replace).toHaveBeenCalledTimes(1);
      expect(String(replace.mock.calls[0][0])).toMatch(/\/blog\/x\?_r=/);
      expect(reloadOnce()).toBe(false);
      expect(replace).toHaveBeenCalledTimes(1);
      expect(canAutoReload(Date.now() + RELOAD_WINDOW_MS + 1)).toBe(true);
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: original });
    }
  });

  it("strips the cache-busting param", () => {
    window.history.replaceState(null, "", "/faq?q=knee&_r=abc#top");
    stripReloadParam();
    expect(window.location.pathname + window.location.search + window.location.hash).toBe("/faq?q=knee#top");
  });
});
