import { describe, expect, it } from "vitest";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { materializeEditorialCovers } from "../../../scripts/materialize-editorial-covers";

const load = (slug: string) => JSON.parse(readFileSync(`src/content/blog/posts/${slug}.json`, "utf8"));
const slugs = ["pip-fibromyalgia-denied-reapply", "pip-osteoarthritis-both-knees"];

describe("benefits editorial quality batch two", () => {
  for (const slug of slugs) {
    it(`${slug} preserves access and does not inherit sign-off`, () => {
      const post = load(slug);
      expect(post.slug).toBe(slug);
      expect(post.is_published).toBe(true);
      expect(post.reviewed_by).toBeNull();
      expect(post.reviewer_credentials).toBeNull();
      expect(post.last_reviewed).toBeUndefined();
      expect(post.editorial_review_note).toContain("has not had a fresh independent benefits or legal review");
      expect(post.content).toContain("17 November 2026");
      expect(post.citations.some((c: { url: string }) => c.url.includes("assessment-criteria"))).toBe(true);
      expect(post.content).toContain("better and worse days");
      expect(post.content).toContain("by phone, letter or the official form");
      expect(post.content).not.toMatch(/60.?70%|Do not call|very worst days|provides free representation/);
      expect(post.direct_answer).not.toMatch(/60.?70%|guarantees points/);
    });
  }
  it("materializes exact checked cover bytes and rejects corruption", () => {
    const root = mkdtempSync(join(tmpdir(), "lwa-editorial-covers-"));
    try {
      mkdirSync(join(root, "scripts/data"), { recursive: true });
      const source = readFileSync("scripts/data/editorial-covers.json", "utf8");
      writeFileSync(join(root, "scripts/data/editorial-covers.json"), source);
      materializeEditorialCovers(root);
      const data = JSON.parse(source);
      const firstName = Object.keys(data)[0];
      writeFileSync(join(root, "public/openverse", firstName), "stale");
      materializeEditorialCovers(root);
      for (const [name, asset] of Object.entries(data) as [string, {base64: string}][]) {
        expect(readFileSync(join(root, "public/openverse", name)).equals(Buffer.from(asset.base64, "base64"))).toBe(true);
      }
      data[Object.keys(data)[0]].sha256 = "bad";
      writeFileSync(join(root, "scripts/data/editorial-covers.json"), JSON.stringify(data));
      expect(() => materializeEditorialCovers(root)).toThrow("checksum mismatch");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it("refusal guidance preserves deadlines without guarantees", () => {
    const post = load(slugs[0]);
    expect(post.content).toContain("one month from the date on that letter");
    expect(post.content).toContain("request must arrive by the deadline");
    expect(post.content).toContain("No diagnosis or wording guarantees an award");
    expect(post.content).toContain("A new claim is a different process");
    expect(post.content).toContain("does not necessarily include representation");
  });
  it("knee guidance distinguishes physical mobility from journey planning", () => {
    const post = load(slugs[1]);
    expect(post.content).toContain("Physical difficulty climbing transport steps");
    expect(post.content).toContain("not, by itself, evidence of difficulty planning or following a route");
    expect(post.content).toContain("Avoid unsafe walking tests");
    expect(post.content).not.toMatch(/Cannot walk 20 metres|stand at the hob for more than 10 minutes/);
    expect(post.content).toContain("contact the PIP enquiry line if you need more time");
  });
});
