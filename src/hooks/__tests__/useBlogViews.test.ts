import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBlogViews, useBlogViewCounts } from "@/hooks/useBlogViews";

describe("useBlogViews (honest counts)", () => {
  it("returns null when no live counter is wired (never invents views)", () => {
    const { result } = renderHook(() => useBlogViews("some-slug"));
    expect(result.current).toBeNull();
  });

  it("returns an empty map for batch counts without inventing numbers", () => {
    const { result } = renderHook(() =>
      useBlogViewCounts(["a", "b", "c"]),
    );
    expect(result.current).toEqual({});
  });
});
