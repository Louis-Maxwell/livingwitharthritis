import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import OptimizedImage from "@/components/ui/OptimizedImage";

describe("OptimizedImage", () => {
  it("renders an image element", () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test image"
      />
    );
    const img = screen.getByAltText("Test image");
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("sets the correct alt text", () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Arthritis exercise guide"
      />
    );
    expect(screen.getByAltText("Arthritis exercise guide")).toBeInTheDocument();
  });

  it("applies width and height when provided", () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={300}
        height={200}
      />
    );
    const img = screen.getByAltText("Test");
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "200");
  });

  it("applies custom className", () => {
    const { container } = render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Test"
        className="rounded-lg"
      />
    );
    const img = screen.getByAltText("Test");
    expect(img.className).toContain("rounded-lg");
  });
});
