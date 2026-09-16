/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  TOPIC_CLUSTERS,
  getClusterForPath,
  getClusterForSlug,
  getPillarForSlug,
} from "@/data/topicClusters";
import { CONTENT_CLUSTERS } from "@/lib/relatedClusters";
import blogSlugs from "@/data/blog-slugs.generated.json";
import { faqArticles } from "@/data/faqArticles";


describe("topicClusters", () => {
  it("defines exactly eight clusters from the 90-day plan", () => {
    expect(TOPIC_CLUSTERS).toHaveLength(8);
    expect(TOPIC_CLUSTERS.map((c) => c.id).sort()).toEqual(
      [
        "diet",
        "exercises",
        "flare-ups",
        "osteoarthritis",
        "pain",
        "pip",
        "symptoms",
        "treatments",
      ].sort(),
    );
  });

  it("maps known pillar paths", () => {
    expect(getClusterForPath("/exercises")?.id).toBe("exercises");
    expect(getClusterForPath("/conditions/osteoarthritis")?.id).toBe("osteoarthritis");
    expect(getClusterForPath("/arthritis-flare-ups")?.id).toBe("flare-ups");
    expect(getClusterForPath("/guides/benefits-pip")?.id).toBe("pip");
  });

  it("maps blog slugs to pillars", () => {
    const pip = getPillarForSlug("pip-arthritis-claim-checklist");
    expect(pip?.path).toBe("/guides/benefits-pip");
    const diet = getClusterForSlug("mediterranean-diet-arthritis-uk");
    expect(diet?.id).toBe("diet");
  });

  it("maps GSC champion and Champions 26–30 paths to the right clusters", () => {
    expect(getClusterForPath("/blog/swimming-exercises-hip-osteoarthritis")?.id).toBe(
      "osteoarthritis",
    );
    expect(getClusterForPath("/blog/best-supplement-for-knee-joint")?.id).toBe("diet");
    expect(getClusterForPath("/faq/arthritis-disability-benefits-uk")?.id).toBe("pip");
    expect(getClusterForPath("/blog/pip-for-arthritis-uk")?.id).toBe("pip");
    expect(getClusterForPath("/benefits-pip")?.id).toBe("pip");
    expect(getClusterForPath("/supplements")?.id).toBe("diet");
    expect(getClusterForPath("/supplements/glucosamine")?.id).toBe("diet");
    expect(getClusterForPath("/symptom-checker")?.id).toBe("symptoms");
    expect(getClusterForPath("/faq")?.id).toBe("symptoms");
    expect(getClusterForPath("/faq/what-is-osteoarthritis")?.id).toBe("osteoarthritis");
    expect(getClusterForPath("/blog/omega-3-foods-for-joints")?.id).toBe("diet");
    expect(getClusterForPath("/blog/anti-inflammatory-diet-rheumatoid-arthritis")?.id).toBe(
      "diet",
    );
  });

  it("surfaces GSC champion URLs in the first sibling slots", () => {
    const oa = TOPIC_CLUSTERS.find((c) => c.id === "osteoarthritis");
    expect(oa?.supportingPaths.slice(0, 4)).toEqual(
      expect.arrayContaining([
        "/guides/hip-exercises-for-osteoarthritis",
        "/blog/swimming-exercises-hip-osteoarthritis",
        "/faq/what-is-osteoarthritis",
      ]),
    );
    const pip = TOPIC_CLUSTERS.find((c) => c.id === "pip");
    expect(pip?.supportingPaths.slice(0, 4)).toEqual(
      expect.arrayContaining([
        "/faq/arthritis-disability-benefits-uk",
        "/blog/pip-for-arthritis-uk",
        "/benefits-pip",
      ]),
    );
  });

  it("TopicClusterNav and CONTENT_CLUSTERS hrefs resolve against real routes", () => {
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const staticPaths = new Set<string>();
    const patterns: string[] = [];
    for (const match of app.matchAll(/path="([^"]+)"/g)) {
      const path = match[1];
      if (path.includes("*")) continue;
      if (path.includes(":")) patterns.push(path);
      else staticPaths.add(path);
    }
    const blogs = new Set(blogSlugs as string[]);
    const faqs = new Set(faqArticles.map((a) => a.slug));

    const matchesPattern = (pattern: string, path: string) => {
      const re = new RegExp(
        "^" +
          pattern
            .split("/")
            .map((seg) => (seg.startsWith(":") ? "[^/]+" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
            .join("/") +
          "$",
      );
      return re.test(path);
    };

    const exists = (path: string) => {
      if (staticPaths.has(path)) return true;
      const blog = /^\/blog\/([^/]+)$/.exec(path);
      if (blog) return blogs.has(blog[1]);
      const faq = /^\/faq\/([^/]+)$/.exec(path);
      if (faq) return faqs.has(faq[1]);
      return patterns.some((pattern) => matchesPattern(pattern, path));
    };

    const missing: string[] = [];
    for (const cluster of TOPIC_CLUSTERS) {
      for (const path of [cluster.pillarPath, cluster.toolPath, ...cluster.supportingPaths]) {
        if (!exists(path)) missing.push(`${cluster.id}: ${path}`);
      }
    }
    for (const cluster of CONTENT_CLUSTERS.filter(Boolean)) {
      if (!exists(cluster.bestGuide.to)) {
        missing.push(`related ${cluster.id}: ${cluster.bestGuide.to}`);
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });
});
