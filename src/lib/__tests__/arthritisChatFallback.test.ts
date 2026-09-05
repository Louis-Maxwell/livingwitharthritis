import { describe, expect, it } from "vitest";
import { getFallbackAnswer } from "../arthritisChatFallback";

describe("arthritisChatFallback", () => {
  it("covers PIP and methotrexate without inventing doses", () => {
    const pip = getFallbackAnswer("Can I claim PIP with rheumatoid arthritis?");
    expect(pip).toMatch(/Personal Independence Payment/i);
    expect(pip).toMatch(/\/guides\/benefits-pip/);

    const mtx = getFallbackAnswer("What is methotrexate used for?");
    expect(mtx).toMatch(/DMARD/i);
    expect(mtx).toMatch(/GP|pharmacist|rheumatology/i);
    expect(mtx).not.toMatch(/\b\d+\s*mg\b/i);
  });

  it("points exercise and diet answers at real site paths", () => {
    expect(getFallbackAnswer("Safe exercises for osteoarthritis")).toMatch(/\/exercises/);
    expect(getFallbackAnswer("anti-inflammatory diet foods")).toMatch(/\/diet|Mediterranean/i);
  });
});
