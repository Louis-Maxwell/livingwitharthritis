import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import AeoEnhancement from "./AeoEnhancement";

const faqs = [
  { q: "Can osteoarthritis be reversed?", a: "Symptoms can be slowed with exercise and weight management." },
  { q: "When should I see a GP?", a: "If joint pain limits daily activity for more than 6 weeks." },
];

const readFaqJsonLd = async (route: string) => {
  const script = await waitFor(() => {
    const node = document.querySelector(`script[data-aeo-faq="${route}"]`);
    if (!node?.textContent) throw new Error("FAQ JSON-LD not injected");
    return node;
  });
  return JSON.parse(script.textContent ?? "{}") as Record<string, unknown>;
};

describe("AeoEnhancement FAQ JSON-LD", () => {
  it("sets page @id, url, and en-GB language without Answer speakable", async () => {
    render(<AeoEnhancement route="/conditions/osteoarthritis" faqs={faqs} />);

    const schema = await readFaqJsonLd("/conditions/osteoarthritis");
    const pageUrl = "https://livingwitharthritis.org.uk/conditions/osteoarthritis";

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema["@id"]).toBe(`${pageUrl}#faq`);
    expect(schema.url).toBe(pageUrl);
    expect(schema.inLanguage).toBe("en-GB");

    const questions = schema.mainEntity as Array<{ acceptedAnswer: Record<string, unknown> }>;
    expect(questions).toHaveLength(2);
    for (const question of questions) {
      expect(question.acceptedAnswer["@type"]).toBe("Answer");
      expect(question.acceptedAnswer.speakable).toBeUndefined();
      expect(JSON.stringify(question.acceptedAnswer)).not.toContain("SpeakableSpecification");
    }
  });

  it("normalises routes without a leading slash onto the current page URL", async () => {
    render(<AeoEnhancement route="guides/newly-diagnosed" faqs={faqs} />);

    const schema = await readFaqJsonLd("guides/newly-diagnosed");
    const pageUrl = "https://livingwitharthritis.org.uk/guides/newly-diagnosed";

    expect(schema["@id"]).toBe(`${pageUrl}#faq`);
    expect(schema.url).toBe(pageUrl);
    expect(schema.inLanguage).toBe("en-GB");
  });
});
