// A/B test variants for the exit-intent modal.
// Sticky assignment via localStorage so the same visitor always sees the same variant.
// Conversion rate per variant can be derived in analytics by comparing
// `exit_intent_open` vs `exit_intent_submit_success` filtered by `variant`.

import { BookOpen, Apple, Dumbbell, Mail, CalendarCheck, Sparkles, type LucideIcon } from "lucide-react";

export type ExitIntentVariantId = "A" | "B";

export interface ExitIntentVariant {
  id: ExitIntentVariantId;
  eyebrow: string;
  headline: string;
  subheadline: string;
  bullets: { icon: LucideIcon; text: string }[];
  ctaLabel: string;
  successTitle: string;
  successBody: string;
  source: string; // stored on newsletter_subscriptions.source for downstream attribution
}

export const EXIT_INTENT_VARIANTS: Record<ExitIntentVariantId, ExitIntentVariant> = {
  A: {
    id: "A",
    eyebrow: "Wait — before you go",
    headline: "Get your free Arthritis Starter Guide",
    subheadline:
      "A 14-page UK guide with NHS-aligned advice, anti-inflammatory meal ideas, and gentle exercise plans.",
    bullets: [
      { icon: BookOpen, text: "Plain-English NHS pathway explained" },
      { icon: Apple, text: "Mediterranean meal ideas for joint pain" },
      { icon: Dumbbell, text: "5-minute daily mobility routines" },
    ],
    ctaLabel: "Send my free guide",
    successTitle: "You're on the list",
    successBody: "Your free Arthritis Starter Guide is on its way. Check your inbox in the next few minutes.",
    source: "exit_intent_a_guide",
  },
  B: {
    id: "B",
    eyebrow: "One last thing",
    headline: "7 days to less joint pain — free by email",
    subheadline:
      "A short daily email with one practical, NHS-aligned action you can do in under 10 minutes. No fluff, unsubscribe anytime.",
    bullets: [
      { icon: Mail, text: "One short email per day for 7 days" },
      { icon: CalendarCheck, text: "Each lesson takes under 10 minutes" },
      { icon: Sparkles, text: "Built around what UK physios actually recommend" },
    ],
    ctaLabel: "Start my 7-day plan",
    successTitle: "You're enrolled",
    successBody: "Day 1 of your 7-day plan is on its way. Watch your inbox over the next few minutes.",
    source: "exit_intent_b_course",
  },
};

const STORAGE_KEY = "lwa-exit-intent-variant-v1";

export const getOrAssignVariant = (): ExitIntentVariantId => {
  if (typeof window === "undefined") return "A";
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing === "A" || existing === "B") return existing;
    const assigned: ExitIntentVariantId = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(STORAGE_KEY, assigned);
    return assigned;
  } catch {
    return Math.random() < 0.5 ? "A" : "B";
  }
};
