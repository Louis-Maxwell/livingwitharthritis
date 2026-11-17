import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resolvedClusters } from "@/lib/topicClusterLinks";
describe("clean public topic-list placement", () => {
  it.each(["src/pages/Index.tsx", "src/pages/GuidesHub.tsx"])("does not render the dense topic list on %s", (path) => {
    expect(readFileSync(path, "utf8")).not.toContain("TopicClusterLinks");
  });
  it("preserves internal topic data and existing blog discovery", () => {
    expect(resolvedClusters.length).toBeGreaterThan(0);
    expect(resolvedClusters.every((cluster) => cluster.slugs.length > 0)).toBe(true);
    expect(readFileSync("src/pages/BlogIndex.tsx", "utf8")).toContain("TOPIC_CLUSTERS");
    expect(readFileSync("src/pages/BlogPost.tsx", "utf8")).toContain("getClusterForPath");
  });
});
