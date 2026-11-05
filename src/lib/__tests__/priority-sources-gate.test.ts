import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { PRIORITY_SOURCES, RED_FLAGS, VERIFIED_SOURCE_URLS } from "@/data/prioritySources";
import { EXACT_SEO_REDIRECTS } from "@/lib/seoRedirects";

const PRIORITY_BLOGS = [
  "pip-for-arthritis-uk", "anti-inflammatory-diet-rheumatoid-arthritis", "best-supplement-for-knee-joint",
  "anti-inflammatory-diet", "best-supplements-joint-pain", "knee-exercises-for-arthritis", "vitamin-d-arthritis-uk",
  "osteoarthritis-symptoms-uk", "building-strength-resilience-exercise-frailty-prevention",
];
const HUBS = ["arthritis", "osteoarthritis", "rheumatoid-arthritis", "psoriatic-arthritis", "gout",
  "ankylosing-spondylitis", "knee-arthritis", "hip-arthritis", "hand-arthritis"];

describe("priority pages: NHS + NICE sources and urgent-help red flags", () => {
  const paths = [...PRIORITY_BLOGS.map((s) => `/blog/${s}`), ...HUBS.map((h) => `/conditions/${h}`)];

  it.each(paths)("%s has a verified NHS and NICE source", (p) => {
    const e = PRIORITY_SOURCES[p];
    expect(e, p).toBeDefined();
    expect(e.sources.some((s) => s.url.startsWith("https://www.nhs.uk/"))).toBe(true);
    expect(e.sources.some((s) => s.url.startsWith("https://www.nice.org.uk/"))).toBe(true);
    for (const s of e.sources) expect(VERIFIED_SOURCE_URLS.has(s.url)).toBe(true);
  });

  it.each(paths.filter((p) => p !== "/blog/pip-for-arthritis-uk"))("%s shows red flags", (p) => {
    expect(PRIORITY_SOURCES[p].redFlags?.length).toBeGreaterThan(0);
  });

  it("red flags signpost to care and never diagnose", () => {
    const text = JSON.stringify(RED_FLAGS).toLowerCase();
    expect(text).not.toMatch(/you have (septic|cauda|gout|rheumatoid)/);
    expect(RED_FLAGS.back.emergency.join(" ")).toMatch(/both legs/);
  });

  it("every component is wired into its page", () => {
    for (const f of ["src/pages/BlogPost.tsx", "src/components/conditions/ConditionPageTemplate.tsx", "src/pages/ArthritisFlareUps.tsx"])
      expect(readFileSync(f, "utf8")).toContain("<UrgentHelpAndSources");
    for (const f of ["Arthritis", "Osteoarthritis", "RheumatoidArthritis", "PsoriaticArthritis", "KneeArthritis", "HipArthritis", "HandArthritis"])
      expect(readFileSync(`src/pages/conditions/${f}.tsx`, "utf8")).toContain("<UrgentHelpAndSources");
  });
});

describe("flare-up consolidation", () => {
  it("duplicate flare guides 301 to the pillar", () => {
    expect(EXACT_SEO_REDIRECTS["/blog/arthritis-flare-management"]).toBe("/arthritis-flare-ups");
    expect(EXACT_SEO_REDIRECTS["/faq/arthritis-flare-management"]).toBe("/arthritis-flare-ups");
    const r = readFileSync("public/_redirects", "utf8");
    expect(r).toMatch(/^\/blog\/arthritis-flare-management \/arthritis-flare-ups 301$/m);
    expect(r).toMatch(/^\/faq\/arthritis-flare-management \/arthritis-flare-ups 301$/m);
  });
  it("no published post links to the retired flare URL", () => {
    for (const f of readdirSync("src/content/blog/posts")) {
      const p = JSON.parse(readFileSync(`src/content/blog/posts/${f}`, "utf8"));
      if (p.is_published === false) continue;
      expect(p.content ?? "", f).not.toContain("/blog/arthritis-flare-management");
    }
  });
});

describe("supplement claims audit", () => {
  const files = [
    "src/content/blog/posts/best-supplements-arthritis-uk.json", "src/content/blog/posts/best-supplements-joint-pain.json",
    "src/pages/supplements/SupplementsHub.tsx", "src/pages/supplements/Msm.tsx", "src/pages/supplements/Turmeric.tsx",
    "src/pages/supplements/CollagenAlternatives.tsx", "src/content/blog/posts/ginger-vs-turmeric-for-arthritis.json",
  ];
  it.each(files)("%s avoids unsupported claims", (f) => {
    const t = readFileSync(f, "utf8");
    expect(t).not.toMatch(/comparable to NSAIDs|Recommended dose:|The effective dose is|Evidence: Strong\.|the right dose \(around|used safely short term/);
  });
});
