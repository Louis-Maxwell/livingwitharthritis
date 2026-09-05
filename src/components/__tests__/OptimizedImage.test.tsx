import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import OptimizedImage from "@/components/ui/OptimizedImage";

describe("OptimizedImage", () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(callback: IntersectionObserverCallback) {
        // Immediately report in-view so lazy images mount in jsdom.
        queueMicrotask(() => {
          callback(
            [{ isIntersecting: true } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
        });
      }
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders an image element", async () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test image"
      />
    );
    const img = await screen.findByAltText("Test image");
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("sets the correct alt text", async () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Arthritis exercise guide"
      />
    );
    expect(await screen.findByAltText("Arthritis exercise guide")).toBeInTheDocument();
  });

  it("applies width and height when provided", async () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={300}
        height={200}
      />
    );
    const img = await screen.findByAltText("Test");
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "200");
  });

  it("applies custom className", async () => {
    const { container } = render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test"
        className="rounded-lg"
      />
    );
    await screen.findByAltText("Test");
    expect(container.firstChild).toHaveClass("rounded-lg");
  });

  it("keeps priority images visible without opacity-0 (LCP-safe)", () => {
    render(
      <OptimizedImage
        src="https://example.com/hero.jpg"
        alt="Hero"
        priority
      />
    );
    const img = screen.getByAltText("Hero");
    expect(img.className).toContain("opacity-100");
    expect(img.className).not.toContain("opacity-0");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img.getAttribute("fetchpriority")).toBe("high");
  });
});
