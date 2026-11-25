import { describe, expect, it } from "vitest";
import {
  emptyAnswers,
  getAnswerRedFlags,
  needsPromptJointAssessment,
  getTriggeredRedFlags,
  highestRedFlagLevel,
  NEXT_STEP_RESOURCES,
  progressPercent,
  rankEducationalGuides,
} from "@/data/symptomChecker";

describe("symptomChecker educational ranking", () => {
  it("never labels results as a diagnosis — returns guide paths only", () => {
    const answers = emptyAnswers();
    answers.areas = ["hands", "wrists"];
    answers.duration = "months";
    answers.severity = "moderate";
    answers.timing = "morning";
    answers.swelling = "hot-swollen";
    answers.skin = "none";
    const guides = rankEducationalGuides(answers);
    expect(guides.length).toBeGreaterThan(0);
    expect(guides[0].path).toMatch(/^\/conditions\//);
    expect(guides.every((g) => g.relevance >= 0 && g.relevance <= 100)).toBe(true);
    expect(guides[0].key).toBe("ra");
  });

  it("surfaces gout guides for toe/ankle flare patterns", () => {
    const answers = emptyAnswers();
    answers.areas = ["feet", "ankles"];
    answers.timing = "flares";
    answers.swelling = "hot-swollen";
    answers.duration = "days";
    answers.severity = "severe";
    answers.skin = "none";
    const guides = rankEducationalGuides(answers);
    expect(guides[0].key).toBe("gout");
    expect(guides[0].path).toBe("/conditions/gout");
  });

  it("boosts psoriatic arthritis when psoriasis is selected", () => {
    const answers = emptyAnswers();
    answers.areas = ["multiple"];
    answers.skin = "psoriasis";
    answers.timing = "morning";
    answers.swelling = "mild";
    answers.duration = "months";
    answers.severity = "moderate";
    const guides = rankEducationalGuides(answers);
    expect(guides.some((g) => g.key === "psa" && g.relevance >= 70)).toBe(true);
  });

  it("routes possible joint infection to urgent assessment even without fever", () => {
    const flags = getTriggeredRedFlags(["septic", "systemic"]);
    expect(highestRedFlagLevel(flags)).toBe("urgent");
  });

  it("treats fever/weight-loss alone as urgent not emergency", () => {
    const flags = getTriggeredRedFlags(["systemic"]);
    expect(highestRedFlagLevel(flags)).toBe("urgent");
  });

  it("does not under-triage major injury or neurological emergencies", () => {
    for (const id of ["trauma", "neuro-spine", "chest", "weakness"]) {
      expect(highestRedFlagLevel(getTriggeredRedFlags([id]))).toBe("emergency");
    }
  });
  it("rechecks warm swelling selected after the first screen", () => {
    const answers = emptyAnswers();
    answers.swelling = "hot-acute";
    expect(getAnswerRedFlags(answers).map(flag => flag.id)).toContain("septic");
  });
  it("flags persistent small-joint or multi-joint swelling for prompt assessment", () => {
    const answers = emptyAnswers();
    answers.areas = ["hands"];
    answers.swelling = "mild";
    answers.duration = "weeks";
    expect(needsPromptJointAssessment(answers)).toBe(true);
    answers.areas = ["knees", "shoulders"];
    expect(needsPromptJointAssessment(answers)).toBe(true);
    answers.swelling = "none";
    expect(needsPromptJointAssessment(answers)).toBe(false);
  });
  it("reports progress at boundaries", () => {
    expect(progressPercent("intro")).toBe(0);
    expect(progressPercent("results")).toBe(100);
    expect(progressPercent("urgent")).toBe(100);
  });

  it("points next steps at real PIP FAQ, OA and exercise hubs — not a diagnosis", () => {
    const hrefs = NEXT_STEP_RESOURCES.map((r) => r.href);
    expect(hrefs).toContain("/faq/arthritis-disability-benefits-uk");
    expect(hrefs).toContain("/conditions/osteoarthritis");
    expect(hrefs).toContain("/exercises");
    expect(hrefs).toContain("/guides/hip-exercises-for-osteoarthritis");
    expect(hrefs).toContain("/guides/benefits-pip");
    expect(NEXT_STEP_RESOURCES.every((r) => r.href.startsWith("/"))).toBe(true);
  });
});
