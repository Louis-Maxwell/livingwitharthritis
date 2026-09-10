import { describe, expect, it } from "vitest";
import { getFallbackAnswer, getFallbackMatch, SUGGESTED_CHIPS } from "../arthritisChatFallback";
import { TOPICS } from "../chatbot/knowledgeBase";
import { matchKnowledge } from "../chatbot/optimizedChatService";

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

  it("always returns a useful generic with site links and chips", () => {
    const generic = getFallbackAnswer("xyzzy unrelated quantum banana");
    expect(generic.length).toBeGreaterThan(80);
    expect(generic).toMatch(/\/exercises|\/diet|\/about/);
    expect(generic).toMatch(/I can help with/i);
    expect(generic).toMatch(/Suggested questions/i);
    expect(SUGGESTED_CHIPS.length).toBeGreaterThan(3);
  });

  it("exposes match metadata", () => {
    const m = getFallbackMatch("Can I claim PIP?");
    expect(m.topicId).toBe("pip-benefits");
    expect(m.score).toBeGreaterThan(0);
  });

  it("covers PsA, gout, AS, JIA, fibromyalgia with condition links", () => {
    expect(getFallbackMatch("What is psoriatic arthritis?").topicId).toBe("psa");
    expect(getFallbackAnswer("gout flare big toe")).toMatch(/\/conditions\/gout/);
    expect(getFallbackAnswer("ankylosing spondylitis exercise")).toMatch(
      /ankylosing|axial|\/conditions\/ankylosing/i,
    );
    expect(getFallbackAnswer("juvenile idiopathic arthritis in children")).toMatch(
      /\/conditions\/juvenile/i,
    );
    expect(getFallbackAnswer("fibromyalgia widespread pain")).toMatch(/\/conditions\/fibromyalgia/);
  });

  it("covers sleep, mental health, biologics, steroids educationally", () => {
    expect(getFallbackAnswer("I can't sleep with night pain")).toMatch(/sleep/i);
    expect(getFallbackAnswer("arthritis anxiety and low mood")).toMatch(/\/arthritis-mental-health/);
    const bio = getFallbackAnswer("What are biologics for rheumatoid arthritis?");
    expect(bio).toMatch(/biologic/i);
    expect(bio).not.toMatch(/\b\d+\s*mg\b/i);
    expect(getFallbackAnswer("prednisolone steroid tablets for arthritis")).toMatch(
      /\/guides\/steroids-for-arthritis/,
    );
  });

  it("covers back pain, donate/contact, and website navigation", () => {
    expect(getFallbackAnswer("lower back pain arthritis")).toMatch(/back/i);
    const contact = getFallbackAnswer("How do I donate or contact the helpline?");
    expect(contact).toMatch(/info@livingwitharthritis\.org\.uk/);
    expect(contact).toMatch(/07760 512 084/);
    expect(getFallbackAnswer("Where is the exercise hub and blog?")).toMatch(/\/exercises|\/blog/);
  });

  it("tolerates common typos and still matches", () => {
    const m = matchKnowledge("exersize for arthritus knee pain");
    expect(m.topicId).toMatch(/knee|exercise|oa/i);
    expect(m.score).toBeGreaterThan(0);
    expect(m.response).toMatch(/\/exercises/);
  });

  it("injects urgent red-flag guidance for emergency keywords", () => {
    const ans = getFallbackAnswer("I have chest pain and knee arthritis advice");
    expect(ans).toMatch(/999/);
    expect(ans).toMatch(/urgent|emergency|chest pain/i);
  });

  it("knowledge base has broad topic coverage", () => {
    const ids = new Set(TOPICS.map((t) => t.id));
    for (const id of [
      "psa",
      "gout",
      "as-axial",
      "jia",
      "fibromyalgia",
      "sleep",
      "mental-health",
      "nsaids",
      "steroids",
      "dmards",
      "biologics",
      "back-pain",
      "website-nav",
      "weather-cold",
      "morning-stiffness",
    ]) {
      expect(ids.has(id)).toBe(true);
    }
    expect(TOPICS.length).toBeGreaterThanOrEqual(35);
  });
});
