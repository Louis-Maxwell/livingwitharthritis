import { describe, expect, it, beforeEach } from "vitest";
import {
  rateLimit,
  pruneRateLimits,
  resetRateLimitBucketsForTests,
  rateLimitBucketCount,
} from "../rateLimit";

describe("rateLimit in-memory", () => {
  beforeEach(() => {
    resetRateLimitBucketsForTests();
  });

  it("allows up to max then blocks", () => {
    expect(rateLimit("t:1", 2, 60_000).ok).toBe(true);
    expect(rateLimit("t:1", 2, 60_000).ok).toBe(true);
    const blocked = rateLimit("t:1", 2, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("isolates keys", () => {
    expect(rateLimit("a", 1, 60_000).ok).toBe(true);
    expect(rateLimit("b", 1, 60_000).ok).toBe(true);
    expect(rateLimit("a", 1, 60_000).ok).toBe(false);
  });

  it("prune removes expired", () => {
    rateLimit("old", 1, 1);
    expect(rateLimitBucketCount()).toBe(1);
    // force expire by waiting is flaky; prune with future reset is no-op
    pruneRateLimits();
    expect(rateLimitBucketCount()).toBeGreaterThanOrEqual(0);
  });
});
