import { describe, expect, it } from "vitest";
import {
  TOPIC_CLUSTERS,
  getClusterForPath,
  getClusterForSlug,
  getPillarForSlug,
} from "@/data/topicClusters";

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
});
