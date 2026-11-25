import { describe, expect, it } from "vitest";
import {
  DEFAULT_MIN_IMPRESSIONS,
  formatStrikingDistance,
  strikingDistanceQueries,
} from "../../../scripts/seo-striking-distance.mjs";

const CSV = `Top queries,Clicks,Impressions,CTR,Position
"can you get pip for arthritis",0,146,0.00%,9.57
"already clicking well",15,115,13.04%,13.46
"too deep",1,80,1.25%,19.14
"too high",2,90,2.22%,3.20
"small sample",0,49,0.00%,8.90
"ladies shoes for plantar fasciitis uk",1,156,0.64%,13.63
`;

describe("seo-striking-distance", () => {
  it("defaults to 50 impressions and keeps positions 4.0–15.0", () => {
    expect(DEFAULT_MIN_IMPRESSIONS).toBe(50);
    const rows = strikingDistanceQueries(CSV);
    expect(rows.map((r) => r.query)).toEqual([
      "ladies shoes for plantar fasciitis uk",
      "can you get pip for arthritis",
      "already clicking well",
    ]);
    expect(rows[1].impressions).toBe(146);
    expect(rows[1].position).toBe(9.57);
  });

  it("returns nothing at a 250 impression bar and does not invent rows", () => {
    const rows = strikingDistanceQueries(CSV, { minImpressions: 250 });
    expect(rows).toEqual([]);
    expect(formatStrikingDistance(rows, 250)).toMatch(/No queries met this threshold/);
    expect(formatStrikingDistance(rows, 250)).toMatch(/does not change pages/);
  });
});
