import { describe, expect, it } from "vitest";
import {
  emptyAnswers,
  getTriggeredRedFlags,
  highestRedFlagLevel,
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

  it("treats septic-style red flags as emergency", () => {
    const flags = getTriggeredRedFlags(["septic", "systemic"]);
    expect(highestRedFlagLevel(flags)).toBe("emergency");
  });

  it("treats fever/weight-loss alone as urgent not emergency", () => {
    const flags = getTriggeredRedFlags(["systemic"]);
    expect(highestRedFlagLevel(flags)).toBe("urgent");
  });

  it("reports progress at boundaries", () => {
    expect(progressPercent("intro")).toBe(0);
    expect(progressPercent("results")).toBe(100);
    expect(progressPercent("urgent")).toBe(100);
  });
});
