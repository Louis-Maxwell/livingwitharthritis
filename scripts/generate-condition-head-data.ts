// Builds scripts/condition-head-data.json from the same reviewed copy
// ConditionSubpagePage.tsx renders. inject-canonicals.mjs bakes this into
// the first HTML response so /conditions/:slug/:subpage is not an empty
// SPA shell (the same Soft 404 pattern as blog posts).

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  conditionSubpages,
  subpageSlugs,
  type SubpageSlug,
  type ConditionSubpages,
} from "../src/data/conditionSubpages";
import { conditionBySlug } from "../src/data/exerciseConditionRecommendations";
import { buildSubpageFaqs } from "../src/data/conditionSubpageFaqs";

const OUT = resolve("scripts/condition-head-data.json");

function esc(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function pageTitle(name: string, subpage: SubpageSlug): string {
  const titles: Record<SubpageSlug, string> = {
    symptoms: `${name} Symptoms: Early Signs, Causes & UK Diagnosis Guide`,
    treatment: `${name} Treatment in the UK: UK healthcare Options, Medication & Self-Care`,
    exercises: `Best Exercises for ${name}: Safe UK Physio-Aligned Routines`,
    diet: `Best Diet for ${name}: Anti-Inflammatory Foods to Eat & Avoid (UK)`,
  };
  return titles[subpage];
}

function pageDescription(name: string, subpage: SubpageSlug): string {
  const lc = name.toLowerCase();
  const descriptions: Record<SubpageSlug, string> = {
    symptoms: `Recognise the early signs of ${lc}, common flare-up symptoms, and when to see your GP. Plain-English UK guidance aligned with UK healthcare and NICE.`,
    treatment: `Evidence-based ${lc} treatment in the UK — UK healthcare pathways, medication options, pain relief and self-management strategies that actually work.`,
    exercises: `Safe, effective ${lc} exercises aligned with UK physiotherapy guidance. Movements to try, exercises to avoid, and how to build a weekly routine.`,
    diet: `What to eat — and what to limit — with ${lc}. UK-aligned anti-inflammatory diet guidance, food triggers, and the supplements with the best evidence.`,
  };
  return descriptions[subpage].slice(0, 158);
}

function extraSectionsHtml(
  content: ConditionSubpages[SubpageSlug],
): string {
  const extras = "extraSections" in content ? content.extraSections : undefined;
  if (!extras?.length) return "";
  return extras
    .map((section) => {
      const paras = section.body
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${esc(p)}</p>`)
        .join("");
      const bullets = section.bullets?.length
        ? `<ul>${section.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";
      return `<h2>${esc(section.heading)}</h2>${paras}${bullets}`;
    })
    .join("");
}

function bodyHtml(
  name: string,
  subpage: SubpageSlug,
  content: ConditionSubpages[SubpageSlug],
): string {
  const extra = extraSectionsHtml(content);
  if (subpage === "symptoms" && "commonSymptoms" in content) {
    return [
      `<p>${esc(content.intro)}</p>`,
      `<h2>Common symptoms of ${esc(name.toLowerCase())}</h2>`,
      `<ul>${content.commonSymptoms.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`,
      `<h2>When to see your GP</h2>`,
      `<p>${esc(content.whenToSeeGP)}</p>`,
      extra,
    ].join("");
  }
  if (subpage === "treatment" && "approaches" in content) {
    return [
      `<p>${esc(content.intro)}</p>`,
      `<h2>Treatment approaches</h2>`,
      content.approaches
        .map((a) => `<h3>${esc(a.name)}</h3><p>${esc(a.description)}</p>`)
        .join(""),
      extra,
    ].join("");
  }
  if (subpage === "exercises" && "keyBenefits" in content) {
    return [
      `<p>${esc(content.intro)}</p>`,
      `<h2>Key benefits</h2>`,
      `<ul>${content.keyBenefits.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`,
      extra,
    ].join("");
  }
  if (subpage === "diet" && "foodsToFavor" in content) {
    return [
      `<p>${esc(content.intro)}</p>`,
      `<h2>Foods to favour</h2>`,
      `<ul>${content.foodsToFavor.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`,
      `<h2>Foods to limit</h2>`,
      `<ul>${content.foodsToLimit.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`,
      extra,
    ].join("");
  }
  return `<p>${esc("intro" in content ? content.intro : "")}</p>${extra}`;
}

const data: Record<
  string,
  {
    title: string;
    description: string;
    question: string;
    answer: string;
    breadcrumb: string;
    about: string;
    bodyHtml: string;
    faqs: { q: string; a: string }[];
  }
> = {};

for (const [slug, pages] of Object.entries(conditionSubpages)) {
  const cond = conditionBySlug.get(slug);
  if (!cond) continue;
  for (const subpage of subpageSlugs) {
    const sub = pages[subpage];
    const faqs = buildSubpageFaqs(cond.name, cond.shortName, subpage, slug);
    const route = `/conditions/${slug}/${subpage}`;
    data[route] = {
      title: `${pageTitle(cond.name, subpage)} | Living With Arthritis UK`.slice(
        0,
        115,
      ),
      description: pageDescription(cond.name, subpage),
      question: sub.headline,
      answer: sub.intro,
      breadcrumb: sub.headline,
      about: cond.name,
      bodyHtml: bodyHtml(cond.name, subpage, sub),
      faqs: faqs.map((f) => ({ q: f.question, a: f.answer })),
    };
  }
}

writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
console.log(
  `[condition-head-data] wrote ${Object.keys(data).length} condition subpages -> ${OUT}`,
);
