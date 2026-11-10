export interface NextStepLink {
  href: string;
  label: string;
  description: string;
}
export function recommendedNextSteps(path: string, context?: string): NextStepLink[];
export const RECOMMENDED_NEXT_STEP_HREFS: string[];
export function recommendedNextStepsHtml(path: string, context?: string): string;
export const RECOMMENDED_NEXT_STEP_PATHS: string[];
