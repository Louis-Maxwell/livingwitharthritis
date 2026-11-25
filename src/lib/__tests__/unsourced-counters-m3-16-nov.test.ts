import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * M3 trust sweep (16 Nov 2026): unsourced reach / impact counters were removed
 * from /press, /community, /corporate-giving, /trust and /self-help (plus the
 * donation thank-you page). The NHS arthritis page no longer gives a "10
 * million" figure, and the charity has no published accounts or outcome data
 * behind "88p of every £1" or "93% improved mobility". Keep them out of the
 * page sources and of the crawler body snapshot.
 */
const read = (p: string) => readFileSync(resolve(__dirname, "../../..", p), "utf8");

const SOURCES: Record<string, string> = {
  "/press": "src/pages/Press.tsx",
  "/community": "src/pages/CommunityHub.tsx",
  "/corporate-giving": "src/pages/CorporateGiving.tsx",
  "/trust": "src/pages/TrustCredibility.tsx",
  "/self-help": "src/pages/SelfHelpTool.tsx",
  "/self-help (myths section)": "src/components/VirtualPhysioSection.tsx",
  "/donation-success": "src/pages/DonationSuccess.tsx",
};

const BANNED: RegExp[] = [
  /10M\+/,
  /10 ?million\+?/i,
  /\b88p\b/,
  /\b93%/,
  /1 in 6/,
  /25[–-]30%/,
  /"100%"/,
  /24\/7/,
  /Registered physiotherapy team/i,
  /Of every £1/i,
  /patients report improved mobility/i,
];

const SNAPSHOT_ROUTES = ["/press", "/community", "/corporate-giving", "/trust", "/self-help"];

describe("M3 trust sweep: no unsourced counters (16 Nov)", () => {
  for (const [route, file] of Object.entries(SOURCES)) {
    it(`${route} source has no unsourced reach/impact counters`, () => {
      const src = read(file);
      for (const re of BANNED) expect(src, `${file} matches ${re}`).not.toMatch(re);
      expect(src).not.toContain("Living With Arthritis UK");
      expect(src).not.toMatch(/pending clinical review/i);
      expect(src).not.toMatch(/Oswestry/i);
    });
  }

  it("crawler body snapshot for the swept routes is clean too", () => {
    const bodies = JSON.parse(read("scripts/data/rendered-bodies.json")) as Record<string, string>;
    for (const route of SNAPSHOT_ROUTES) {
      const body = bodies[route];
      if (!body) continue;
      for (const re of BANNED) expect(body, `${route} snapshot matches ${re}`).not.toMatch(re);
    }
  });

  it("press page keeps truthful identity facts", () => {
    const press = read("src/pages/Press.tsx");
    expect(press).toContain("1218461");
    expect(press).toContain("David Williams");
    expect(press).toContain("PH128483");
    expect(press).toContain("independent of Versus Arthritis");
  });
});
