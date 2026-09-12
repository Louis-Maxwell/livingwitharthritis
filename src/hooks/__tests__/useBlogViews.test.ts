import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@/integrations/supabase/client", () => ({
  isSupabaseConfigured: false,
  supabase: null,
}));

import { useBlogViews, useBlogViewCounts } from "@/hooks/useBlogViews";

describe("useBlogViews (honest counts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when Supabase is unset (never invents views)", async () => {
    const { result } = renderHook(() => useBlogViews("some-slug"));
    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("returns an empty map for batch counts without inventing numbers", async () => {
    const { result } = renderHook(() => useBlogViewCounts(["a", "b", "c"]));
    await waitFor(() => {
      expect(result.current).toEqual({});
    });
  });
});
