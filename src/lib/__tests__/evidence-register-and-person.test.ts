import { describe, expect, it } from "vitest";
import register from "@/data/evidence-register.generated.json";
import { LOUIS_MAXWELL_PERSON, LOUIS_MAXWELL_REF, LIVING_WITH_ARTHRITIS_ORG } from "@/lib/louisMaxwell";

describe("evidence register", () => {
  it("lists only NHS, NICE and research sources, each with citing pages", () => {
    const { sources } = register as { sources: { url: string; type: string; pages: string[]; topic: string }[] };
    expect(sources.length).toBeGreaterThan(100);
    for (const s of sources) {
      expect(["NHS", "NICE", "Research"]).toContain(s.type);
      expect(s.pages.length).toBeGreaterThan(0);
      expect(s.topic).toBeTruthy();
    }
  });
});

describe("Louis Maxwell Person schema", () => {
  it("carries the verified facts and a stable @id", () => {
    expect(LOUIS_MAXWELL_PERSON.name).toBe("Louis Maxwell");
    expect(JSON.stringify(LOUIS_MAXWELL_PERSON)).toContain("PH128483");
    expect(LOUIS_MAXWELL_PERSON.jobTitle).toContain("Band 8 Advanced Practice Physiotherapist");
    expect(LOUIS_MAXWELL_PERSON.jobTitle).toContain("AI Engineer");
    expect(LOUIS_MAXWELL_REF["@id"]).toBe(LOUIS_MAXWELL_PERSON["@id"]);
    expect(LIVING_WITH_ARTHRITIS_ORG.identifier.value).toBe("1218461");
    expect(LIVING_WITH_ARTHRITIS_ORG.founder["@id"]).toBe(LOUIS_MAXWELL_PERSON["@id"]);
  });
});
