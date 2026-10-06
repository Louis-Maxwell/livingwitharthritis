import type { SubpageSlug } from "./conditionSubpages";

export function subpageTitle(condName: string, subpage: SubpageSlug): string {
  const titleMap: Record<SubpageSlug, string> = {
    symptoms: `${condName} symptoms: early signs and when to see a GP (UK)`,
    treatment: `${condName} treatment UK: NHS options, medicines and self-care`,
    exercises: `${condName} exercises: movement and activity guidance`,
    diet: `${condName} and diet: evidence and practical guidance`,
  };
  return titleMap[subpage];
}

export function subpageDescription(condName: string, subpage: SubpageSlug): string {
  const lcName = condName.toLowerCase();
  const descMap: Record<SubpageSlug, string> = {
    symptoms: `Recognise early ${lcName} signs, common flare symptoms, and when to see your GP. Educational UK guidance aligned with NHS and NICE themes — not a diagnosis.`,
    treatment: `How ${lcName} is usually managed in the UK: NHS pathways, common medicine classes, pain relief and self-care. Educational only — your clinician decides treatment.`,
    exercises: `${lcName} exercise information and UK physiotherapy themes: what to try, what to ease off, and how to build a weekly routine. Check with your clinician if you are unsure.`,
    diet: `What to favour and limit with ${lcName}. Balanced eating ideas and evidence limits — not a personal meal prescription.`,
  };
  return descMap[subpage];
}

