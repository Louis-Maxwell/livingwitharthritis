// Single source for /conditions/:slug/:subpage titles and meta descriptions.
// Used by ConditionSubpagePage.tsx (client head) and
// scripts/generate-condition-head-data.ts (crawler head) so the two match.
// Titles are written to fit 60 characters for every condition name, so they
// are never clipped with "…"; SeoHead adds "| Living With Arthritis" only
// when it still fits.
import type { SubpageSlug } from "./conditionSubpages";

export const CONDITION_TITLE_MAX = 60;
export const CONDITION_DESCRIPTION_MAX = 155;

function firstThatFits(options: string[], max: number): string {
  return options.find((o) => o.length <= max) ?? options[options.length - 1];
}

export function conditionSubpageTitle(name: string, subpage: SubpageSlug): string {
  const options: Record<SubpageSlug, string[]> = {
    symptoms: [
      `${name} Symptoms: Early Signs and When to See a GP`,
      `${name} Symptoms and When to See a GP`,
    ],
    treatment: [
      `${name} Treatment: NHS Options, Medicines and Self-Care`,
      `${name} Treatment: NHS Options and Self-Care`,
    ],
    exercises: [
      `Best Exercises for ${name}: Safe Routines (UK)`,
      `Exercises for ${name}: Safe Routines to Try`,
    ],
    diet: [
      `Diet for ${name}: Foods to Eat and Limit (UK Guide)`,
      `Diet for ${name}: Foods to Eat and Limit`,
    ],
  };
  return firstThatFits(options[subpage], CONDITION_TITLE_MAX);
}

export function conditionSubpageDescription(name: string, subpage: SubpageSlug): string {
  const lc = name.toLowerCase();
  const descriptions: Record<SubpageSlug, string> = {
    symptoms: `Early signs of ${lc}, common symptoms and when to see your GP. Plain-English UK guidance based on NHS and NICE advice. Not a diagnosis.`,
    treatment: `How ${lc} is treated in the UK: NHS care, common medicines, pain relief and self-care. Educational only; your clinician decides treatment.`,
    exercises: `Safe exercises for ${lc}: movements to try, what to ease off and how to build a weekly routine. Check with your GP or physio if unsure.`,
    diet: `What to favour and limit with ${lc}: anti-inflammatory eating ideas and evidence notes. General UK guidance, not a personal meal plan.`,
  };
  return descriptions[subpage];
}
