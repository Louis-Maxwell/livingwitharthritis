import { describe, expect, it } from "vitest";
import {
  MEDICAL_DISCLAIMER_SHORT,
  MEDICAL_DISCLAIMER_TOOL,
  educationalDisclaimerCopyMode,
  isYmylPath,
  nhsEscalationLine,
  shouldRenderDisclaimerStrip,
} from "@/lib/medicalDisclaimer";

describe("medicalDisclaimer helpers", () => {
  it("exposes short and tool copy that deny diagnosis", () => {
    expect(MEDICAL_DISCLAIMER_SHORT.toLowerCase()).toContain("not a diagnosis");
    expect(MEDICAL_DISCLAIMER_TOOL.toLowerCase()).toContain("does not diagnose");
    expect(MEDICAL_DISCLAIMER_SHORT).toMatch(/999/);
    expect(MEDICAL_DISCLAIMER_TOOL).toMatch(/NHS 111/);
  });

  it("flags YMYL clinical paths and skips marketing home", () => {
    expect(isYmylPath("/")).toBe(false);
    expect(isYmylPath("/donate")).toBe(false);
    expect(isYmylPath("/about")).toBe(false);
    expect(isYmylPath("/conditions/osteoarthritis")).toBe(true);
    expect(isYmylPath("/guides/steroids-for-arthritis")).toBe(true);
    expect(isYmylPath("/blog/some-post")).toBe(true);
    expect(isYmylPath("/symptom-checker")).toBe(true);
    expect(isYmylPath("/chat")).toBe(true);
    expect(isYmylPath("/exercises/knee")).toBe(true);
  });

  it("includes NHS escalation helpers", () => {
    expect(nhsEscalationLine()).toMatch(/999/);
    expect(nhsEscalationLine()).toMatch(/111/);
  });

  it("skips nested disclaimer strips once layout chrome has shown one", () => {
    expect(shouldRenderDisclaimerStrip(false)).toBe(true);
    expect(shouldRenderDisclaimerStrip(true)).toBe(false);
    expect(educationalDisclaimerCopyMode(false)).toBe("full");
    expect(educationalDisclaimerCopyMode(true)).toBe("review-only");
  });
});
