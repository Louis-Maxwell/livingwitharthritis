import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import GalaxySpiralBackdrop from "./GalaxySpiralBackdrop";

class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", IOStub as unknown as typeof IntersectionObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce") ? false : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
  // Force idle boot immediately in tests
  vi.stubGlobal("requestIdleCallback", (cb: () => void) => {
    cb();
    return 1;
  });
  vi.stubGlobal("cancelIdleCallback", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("GalaxySpiralBackdrop", () => {
  it("renders a decorative canvas marked aria-hidden", async () => {
    const { container, getByTestId } = render(
      <div style={{ width: 800, height: 400 }}>
        <GalaxySpiralBackdrop />
      </div>,
    );

    const root = getByTestId("galaxy-spiral-backdrop");
    expect(root).toHaveAttribute("aria-hidden", "true");

    await waitFor(() => {
      const canvas = container.querySelector("canvas");
      expect(canvas).not.toBeNull();
      expect(canvas).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("keeps the canvas non-interactive so CTAs stay reachable", async () => {
    const { container } = render(<GalaxySpiralBackdrop />);
    await waitFor(() => {
      expect(container.querySelector("canvas")).not.toBeNull();
    });
    const canvas = container.querySelector("canvas");
    expect(canvas?.className).toMatch(/pointer-events-none/);
  });
});
