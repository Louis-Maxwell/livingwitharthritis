import { describe, expect, it } from "vitest";
import { filterClusterHrefs, isResolvableClusterHref } from "@/lib/clusterHref";

describe("isResolvableClusterHref", () => {
  it("accepts published blog and FAQ slugs", () => {
    expect(isResolvableClusterHref("/blog/pip-for-arthritis-uk")).toBe(true);
    expect(isResolvableClusterHref("/faq/what-is-osteoarthritis")).toBe(true);
    expect(isResolvableClusterHref("/exercises")).toBe(true);
  });

  it("rejects missing blog/FAQ slugs and junk", () => {
    expect(isResolvableClusterHref("/blog/this-slug-is-not-published-xyz")).toBe(false);
    expect(isResolvableClusterHref("/faq/not-a-real-faq-xyz")).toBe(false);
    expect(isResolvableClusterHref("")).toBe(false);
    expect(isResolvableClusterHref("//evil.example")).toBe(false);
    expect(isResolvableClusterHref("https://example.com")).toBe(false);
  });

  it("filters holes from a list", () => {
    expect(
      filterClusterHrefs(["/exercises", "", null, "/blog/this-slug-is-not-published-xyz"]),
    ).toEqual(["/exercises"]);
  });
});
