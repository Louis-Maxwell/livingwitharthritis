import { describe, expect, it } from "vitest";
import { getFallbackAnswer, getFallbackMatch } from "../arthritisChatFallback";

describe("arthritisChatFallback (unified engine)", () => {
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

  it("answers knee pain, flare, and who-we-are with links", () => {
    const knee = getFallbackAnswer("knee pain exercise");
    expect(knee).toMatch(/knee/i);
    expect(knee).toMatch(/\/exercises/);

    const flare = getFallbackAnswer("How do I manage a flare-up?");
    expect(flare).toMatch(/flare/i);
    expect(flare).toMatch(/\/arthritis-flare-ups/);

    const who = getFallbackAnswer("Who are you?");
    expect(who).toMatch(/1218461/);
    expect(who).toMatch(/PH128483|Motion is Lotion|independent/i);
    expect(who).toMatch(/\/about/);
  });

  it("always returns a useful generic with site links", () => {
    const generic = getFallbackAnswer("xyzzy unrelated quantum banana");
    expect(generic.length).toBeGreaterThan(80);
    expect(generic).toMatch(/\/exercises|\/diet|\/about/);
  });

  it("exposes match metadata", () => {
    const m = getFallbackMatch("Can I claim PIP?");
    expect(m.topicId).toBe("pip-benefits");
    expect(m.score).toBeGreaterThan(0);
  });
});
