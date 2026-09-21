/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(rel: string) {
  return readFileSync(resolve(root, rel), "utf8");
}

describe("M1 checker→email + FAQ hub CRO (21 Sep 2026)", () => {
  it("symptom quiz results include PECR email CTA with symptom-checker sequence", () => {
    const quiz = read("src/components/tools/SymptomQuiz.tsx");
    expect(quiz).toContain('from "@/components/EmailSignupForm"');
    expect(quiz).toContain('sequence="symptom-checker"');
    expect(quiz).toContain("checker-email-heading");
    expect(quiz).toMatch(/Educational only|not a diagnosis/i);
    expect(quiz).toContain("1218461");
  });

  it("symptom checker page bumps clinical review to 2026-09-21", () => {
    const page = read("src/pages/SymptomChecker.tsx");
    expect(page).toContain('lastReviewed="2026-09-21"');
    expect(page).toMatch(/not a diagnosis/i);
  });

  it("FAQ hub surfaces customer-job paths, email CTA, and fresh review date", () => {
    const faq = read("src/pages/FAQ.tsx");
    expect(faq).toContain('lastReviewed="2026-09-21"');
    expect(faq).toContain('sequence="faq-hub"');
    for (const href of [
      "/guides/arthritis-pain-relief",
      "/guides/newly-diagnosed",
      "/symptom-checker",
      "/faq/arthritis-disability-benefits-uk",
    ]) {
      expect(faq.includes(`href: "${href}"`), `missing ${href}`).toBe(true);
    }
    expect(faq).toMatch(/people with arthritis and carers/i);
  });
});
