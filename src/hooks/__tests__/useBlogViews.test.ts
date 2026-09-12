import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBlogViews, useBlogViewCounts } from "@/hooks/useBlogViews";

describe("useBlogViews (honest counts)", () => {
  it("always returns null (never invents views)", () => {
    const { result } = renderHook(() => useBlogViews("some-slug"));
    expect(result.current).toBeNull();
  });

  it("always returns an empty map for batch counts", () => {
    const { result } = renderHook(() => useBlogViewCounts(["a", "b", "c"]));
    expect(result.current).toEqual({});
  });
});
