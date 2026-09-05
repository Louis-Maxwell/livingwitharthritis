import { describe, expect, it } from "vitest";
import {
  SYSTEM_PROMPT,
  buildSystemPrompt,
  appendDisclaimerIfNeeded,
} from "../chat";

describe("chat system prompt", () => {
  it("identifies the charity, independence, and founder clinician without inventing a team", () => {
    expect(SYSTEM_PROMPT).toMatch(/1218461/);
    expect(SYSTEM_PROMPT).toMatch(/Oswestry/);
    expect(SYSTEM_PROMPT).toMatch(/independent/i);
    expect(SYSTEM_PROMPT).toMatch(/PH128483/);
    expect(SYSTEM_PROMPT).toMatch(/Louis Maxwell/);
    expect(SYSTEM_PROMPT).toMatch(/NICE/);
    expect(SYSTEM_PROMPT).toMatch(/NEVER prescribe|must NEVER prescribe/i);
    expect(SYSTEM_PROMPT).toMatch(/\/diet/);
    expect(SYSTEM_PROMPT).toMatch(/\/exercises/);
    expect(SYSTEM_PROMPT).toMatch(/\/guides/);
    expect(SYSTEM_PROMPT).not.toMatch(/team of consultants/i);
  });

  it("appends optional profileSummary without mutating the base prompt constant", () => {
    const withProfile = buildSystemPrompt("Condition: RA; Joints: Hands");
    expect(withProfile).toContain(SYSTEM_PROMPT);
    expect(withProfile).toContain("Condition: RA; Joints: Hands");
    expect(withProfile).toMatch(/do not store/i);
    expect(buildSystemPrompt("")).toBe(SYSTEM_PROMPT);
    expect(buildSystemPrompt(undefined)).toBe(SYSTEM_PROMPT);
  });

  it("appends medication disclaimer when needed", () => {
    const out = appendDisclaimerIfNeeded("Methotrexate is a DMARD.", "What is methotrexate?");
    expect(out).toMatch(/not a prescription|Educational information only/i);
  });
});
