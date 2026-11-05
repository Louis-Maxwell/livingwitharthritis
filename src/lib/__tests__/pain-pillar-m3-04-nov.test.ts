import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const pain = readFileSync(resolve(__dirname, "../../pages/guides/ArthritisPainRelief.tsx"), "utf8");

describe("Month 3 pain pillar (4 Nov)", () => {
  it("is reviewed and dated", () => {
    expect(pain).toContain('credential="HCPC PH128483"');
    expect(pain).toContain('"dateModified": "2026-11-04"');
    expect(pain).toContain('<LastReviewed date="2026-11-04" />');
  });
  it("has the customer-first blocks", () => {
    for (const s of ["Pain right now", "Red flags: get help now", "Have a flare plan ready", "Pain relief options: what NHS and NICE advise", "Use heat and cold safely", "When to see your GP", "NHS 111", "999"]) expect(pain).toContain(s);
  });
  it("links to the cluster and hub", () => {
    for (const p of ["/conditions/arthritis", "/conditions/back-pain", "/conditions/early-arthritis-symptoms", "/arthritis-flare-ups", "/guides/painkillers-and-nsaids"]) expect(pain).toContain(`to="${p}"`);
  });
  it("drops unsafe or outdated lines", () => {
    for (const s of ["3× a day", "slow-release", "Alternate heat and cold", "single most", "Living With Arthritis UK"]) expect(pain).not.toContain(s);
  });
});
