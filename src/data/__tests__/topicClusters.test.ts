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
});
