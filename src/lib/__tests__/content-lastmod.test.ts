import { describe, expect, it } from "vitest";
import { blogContentLastmod } from "../../../scripts/lib/content-lastmod.mjs";

describe("recorded blog sitemap modification dates", () => {
  it("propagates an explicit, evidenced page metadata change rather than an older article update", () => {
    expect(blogContentLastmod({ date: "2026-10-11", updated_at: "2026-11-16T21:34:34Z", last_reviewed: "2026-11-17" }, "2026-11-17")).toBe("2026-11-17");
  });
  it("does not move later substantive updates backwards to an older review", () => {
    expect(blogContentLastmod({ date: "2026-10-11", updated_at: "2026-11-16T21:34:34Z", last_reviewed: "2026-09-17" })).toBe("2026-11-16");
  });
  it("does not promote legacy review defaults to content changes", () => {
    expect(blogContentLastmod({ date: "2026-07-01", last_reviewed: "2026-10-23" })).toBe("2026-07-01");
  });
  it("retains published dates when no later change is recorded", () => {
    expect(blogContentLastmod({ date: "2026-07-01" })).toBe("2026-07-01");
  });
  it("does not invent a current date for missing or invalid records", () => {
    expect(blogContentLastmod({ updated_at: "today", last_reviewed: null })).toBeUndefined();
    expect(blogContentLastmod({})).toBeUndefined();
  });
});
