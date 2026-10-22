/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(rel: string) {
  return readFileSync(resolve(root, rel), "utf8");
}

describe("M1 checker→email + FAQ hub CRO (21 Sep 2026)", () => {
  it("symptom quiz results offer next guides, not an email signup", () => {
    const quiz = read("src/components/tools/SymptomQuiz.tsx");
    // Oct 2026 policy: no newsletter/signup prompts; offer next guides instead.
    expect(quiz).not.toContain("EmailSignupForm");
    expect(quiz).toContain('aria-label="Useful next guides"');
    expect(quiz).toMatch(/Educational only|not a diagnosis/i);
  });

  it("symptom checker page bumps clinical review to 2026-09-21", () => {
    const page = read("src/pages/SymptomChecker.tsx");
    expect(page).toContain('lastReviewed="2026-09-21"');
    expect(page).toMatch(/not a diagnosis/i);
  });

  it("FAQ hub surfaces customer-job paths, no email signup, and fresh review date", () => {
    const faq = read("src/pages/FAQ.tsx");
    expect(faq).toContain('lastReviewed="2026-09-21"');
    expect(faq).not.toContain("EmailSignupForm");
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
