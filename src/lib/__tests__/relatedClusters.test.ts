/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CONTENT_CLUSTERS,
  getClustersForArticle,
  getClusterById,
  primaryClusterFor,
} from "@/lib/relatedClusters";

describe("CONTENT_CLUSTERS", () => {
  it("has no holes and every entry is a complete cluster", () => {
    const src = readFileSync(
      resolve(process.cwd(), "src/lib/relatedClusters.ts"),
      "utf8",
    );
    expect(src).not.toMatch(/\},\s*,/);
    expect(CONTENT_CLUSTERS.length).toBeGreaterThan(0);
    expect(CONTENT_CLUSTERS.every(Boolean)).toBe(true);

    for (const cluster of CONTENT_CLUSTERS) {
      expect(cluster.id).toMatch(/^[a-z0-9-]+$/);
      expect(cluster.label.length).toBeGreaterThan(2);
      expect(cluster.triggers.length).toBeGreaterThan(0);
      expect(cluster.bestGuide.title.length).toBeGreaterThan(2);
      expect(cluster.bestGuide.to.startsWith("/")).toBe(true);
      expect(cluster.bestGuide.description.length).toBeGreaterThan(8);
    }
  });

  it("indexes clusters by id after filtering holes", () => {
    expect(getClusterById(CONTENT_CLUSTERS[0].id)?.id).toBe(CONTENT_CLUSTERS[0].id);
    expect(getClusterById("not-a-cluster")).toBeNull();
  });

  it("matches PIP and knee OA articles", () => {
    expect(
      getClustersForArticle({ title: "PIP for arthritis in the UK" }),
    ).toContain("pip-benefits");
    expect(
      primaryClusterFor({ title: "Knee osteoarthritis exercises" })?.id,
    ).toBe("knee-oa");
  });
});
