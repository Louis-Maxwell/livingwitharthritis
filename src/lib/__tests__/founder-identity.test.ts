/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const FILES = [
  "index.html",
  "public/llms.txt",
  "public/ai.txt",
  "public/humans.txt",
  "public/answer-engine.json",
  "public/.well-known/llms.txt",
  "public/.well-known/ai.txt",
  "src/lib/rootOrganizationSchema.ts",
  "src/lib/louisMaxwell.ts",
  "src/data/medical-authors.json",
  "src/pages/AboutUs.tsx",
  "src/pages/Donate.tsx",
  "src/pages/Press.tsx",
  "src/pages/ExpertArticles.tsx",
  "src/components/landing/FounderStoryBand.tsx",
  "src/lib/chatbot/knowledgeBase.ts",
  "scripts/data/rendered-bodies.json",
];

describe("founder identity", () => {
  it("never names Louis Maxwell as founder", () => {
    for (const f of FILES) {
      const s = readFileSync(resolve(f), "utf8");
      expect(s, f).not.toMatch(/founded by Louis|founder,? Louis|Louis founded|Founder · First Contact|Founder, Living With Arthritis \(charity|"founder":\s*"Louis/i);
      expect(s, f).not.toMatch(/Living With Arthritis UK/);
    }
  });

  it("names David Williams as founder in the machine-readable identity files", () => {
    for (const f of ["index.html", "public/llms.txt", "public/ai.txt", "public/humans.txt", "public/answer-engine.json"]) {
      expect(readFileSync(resolve(f), "utf8"), f).toContain("David Williams");
    }
  });
});
