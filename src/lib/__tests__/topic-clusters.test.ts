import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import clusters from "@/data/topicClusterLinks.json";

describe("topic cluster hub links", () => {
  it("every linked slug exists as a guide", () => {
    for (const c of clusters) for (const s of c.slugs)
      expect(fs.existsSync(path.resolve(__dirname, "../../content/blog/posts", `${s}.json`))).toBe(true);
  });
  it("ships the tracker PDF", () => {
    expect(fs.existsSync(path.resolve(__dirname, "../../../public/downloads/arthritis-symptom-flare-tracker.pdf"))).toBe(true);
  });
});
