/**
 * NHS / NICE sources and "When to get urgent help" red flags for priority pages.
 *
 * Every URL below was checked to return HTTP 200 (31 Oct 2026). Only add URLs
 * from VERIFIED_SOURCE_URLS — the gate test enforces this. Red-flag wording
 * follows NHS pages (joint pain, back pain, gout, septic arthritis). It is
 * signposting only, never a diagnosis.
 */

export type SourceLink = { label: string; url: string; publisher: "NHS" | "NICE" };

export type RedFlagSet = "joint" | "gout" | "back";

export type PrioritySourceEntry = {
  sources: SourceLink[];
  /** Omit for non-clinical pages (e.g. benefits). */
  redFlags?: RedFlagSet[];
};

const S = {
  nhsArthritis: { label: "NHS: Arthritis", url: "https://www.nhs.uk/conditions/arthritis/", publisher: "NHS" },
  nhsOA: { label: "NHS: Osteoarthritis", url: "https://www.nhs.uk/conditions/osteoarthritis/", publisher: "NHS" },
  nhsOASymptoms: { label: "NHS: Osteoarthritis symptoms", url: "https://www.nhs.uk/conditions/osteoarthritis/symptoms/", publisher: "NHS" },
  nhsOATreatment: { label: "NHS: Osteoarthritis treatment", url: "https://www.nhs.uk/conditions/osteoarthritis/treatment/", publisher: "NHS" },
  nhsRA: { label: "NHS: Rheumatoid arthritis", url: "https://www.nhs.uk/conditions/rheumatoid-arthritis/", publisher: "NHS" },
  nhsRATreatment: { label: "NHS: Rheumatoid arthritis treatment", url: "https://www.nhs.uk/conditions/rheumatoid-arthritis/treatment/", publisher: "NHS" },
  nhsPsA: { label: "NHS: Psoriatic arthritis", url: "https://www.nhs.uk/conditions/psoriatic-arthritis/", publisher: "NHS" },
  nhsGout: { label: "NHS: Gout", url: "https://www.nhs.uk/conditions/gout/", publisher: "NHS" },
  nhsAS: { label: "NHS: Ankylosing spondylitis", url: "https://www.nhs.uk/conditions/ankylosing-spondylitis/", publisher: "NHS" },
  nhsSeptic: { label: "NHS: Septic arthritis", url: "https://www.nhs.uk/conditions/septic-arthritis/", publisher: "NHS" },
  nhsBackPain: { label: "NHS: Back pain", url: "https://www.nhs.uk/conditions/back-pain/", publisher: "NHS" },
  nhsFalls: { label: "NHS: Falls", url: "https://www.nhs.uk/conditions/falls/", publisher: "NHS" },
  nhsKneePain: { label: "NHS: Knee pain", url: "https://www.nhs.uk/symptoms/knee-pain/", publisher: "NHS" },
  nhsHipPain: { label: "NHS: Hip pain", url: "https://www.nhs.uk/symptoms/hip-pain/", publisher: "NHS" },
  nhsHandPain: { label: "NHS: Hand pain", url: "https://www.nhs.uk/symptoms/hand-pain/", publisher: "NHS" },
  nhsJointPain: { label: "NHS: Joint pain", url: "https://www.nhs.uk/symptoms/joint-pain/", publisher: "NHS" },
  nhsVitamins: { label: "NHS: Vitamins and minerals", url: "https://www.nhs.uk/conditions/vitamins-and-minerals/", publisher: "NHS" },
  nhsVitaminD: { label: "NHS: Vitamin D", url: "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/", publisher: "NHS" },
  nhsEatWell: { label: "NHS: Eat well", url: "https://www.nhs.uk/live-well/eat-well/", publisher: "NHS" },
  nhsExercise: { label: "NHS: Exercise", url: "https://www.nhs.uk/live-well/exercise/", publisher: "NHS" },
  nhsOlderAdults: { label: "NHS: Physical activity guidelines for older adults", url: "https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-older-adults/", publisher: "NHS" },
  nhsBenefits: { label: "NHS: Money, work and benefits", url: "https://www.nhs.uk/social-care-and-support/money-work-and-benefits/", publisher: "NHS" },
  niceOA: { label: "NICE NG226: Osteoarthritis in over 16s", url: "https://www.nice.org.uk/guidance/ng226", publisher: "NICE" },
  niceRA: { label: "NICE NG100: Rheumatoid arthritis in adults", url: "https://www.nice.org.uk/guidance/ng100", publisher: "NICE" },
  niceGout: { label: "NICE NG219: Gout", url: "https://www.nice.org.uk/guidance/ng219", publisher: "NICE" },
  niceSpA: { label: "NICE NG65: Spondyloarthritis in over 16s", url: "https://www.nice.org.uk/guidance/ng65", publisher: "NICE" },
  nicePsoriasis: { label: "NICE CG153: Psoriasis", url: "https://www.nice.org.uk/guidance/cg153", publisher: "NICE" },
  niceBack: { label: "NICE NG59: Low back pain and sciatica", url: "https://www.nice.org.uk/guidance/ng59", publisher: "NICE" },
  niceMultimorbidity: { label: "NICE NG56: Multimorbidity", url: "https://www.nice.org.uk/guidance/ng56", publisher: "NICE" },
  niceVitD: { label: "NICE PH56: Vitamin D supplement use", url: "https://www.nice.org.uk/guidance/ph56", publisher: "NICE" },
  niceFalls: { label: "NICE NG249: Falls", url: "https://www.nice.org.uk/guidance/ng249", publisher: "NICE" },
} satisfies Record<string, SourceLink>;

/** Allowlist of URLs verified to return 200. */
export const VERIFIED_SOURCE_URLS: ReadonlySet<string> = new Set(Object.values(S).map((s) => s.url));

export const PRIORITY_SOURCES: Record<string, PrioritySourceEntry> = {
  // 10 priority pages (GSC)
  "/blog/pip-for-arthritis-uk": { sources: [S.nhsBenefits, S.nhsArthritis, S.niceMultimorbidity] },
  "/blog/anti-inflammatory-diet-rheumatoid-arthritis": { sources: [S.nhsRA, S.nhsEatWell, S.niceRA], redFlags: ["joint"] },
  "/blog/best-supplement-for-knee-joint": { sources: [S.nhsVitamins, S.nhsKneePain, S.niceOA], redFlags: ["joint"] },
  "/blog/anti-inflammatory-diet": { sources: [S.nhsEatWell, S.nhsArthritis, S.niceOA, S.niceRA], redFlags: ["joint"] },
  "/blog/best-supplements-joint-pain": { sources: [S.nhsVitamins, S.nhsJointPain, S.niceOA], redFlags: ["joint"] },
  "/blog/knee-exercises-for-arthritis": { sources: [S.nhsKneePain, S.nhsOATreatment, S.nhsExercise, S.niceOA], redFlags: ["joint"] },
  "/blog/vitamin-d-arthritis-uk": { sources: [S.nhsVitaminD, S.niceVitD], redFlags: ["joint"] },
  "/blog/osteoarthritis-symptoms-uk": { sources: [S.nhsOASymptoms, S.nhsOA, S.niceOA], redFlags: ["joint"] },
  "/blog/building-strength-resilience-exercise-frailty-prevention": { sources: [S.nhsOlderAdults, S.nhsFalls, S.niceFalls], redFlags: ["joint"] },
  // Condition hubs
  "/conditions/arthritis": { sources: [S.nhsArthritis, S.nhsJointPain, S.nhsSeptic, S.niceOA, S.niceRA], redFlags: ["joint"] },
  "/conditions/osteoarthritis": { sources: [S.nhsOA, S.nhsOATreatment, S.niceOA], redFlags: ["joint"] },
  "/conditions/rheumatoid-arthritis": { sources: [S.nhsRA, S.nhsRATreatment, S.niceRA], redFlags: ["joint"] },
  "/conditions/psoriatic-arthritis": { sources: [S.nhsPsA, S.niceSpA, S.nicePsoriasis], redFlags: ["joint", "back"] },
  "/conditions/gout": { sources: [S.nhsGout, S.niceGout], redFlags: ["gout", "joint"] },
  "/conditions/ankylosing-spondylitis": { sources: [S.nhsAS, S.nhsBackPain, S.niceSpA, S.niceBack], redFlags: ["back"] },
  "/conditions/knee-arthritis": { sources: [S.nhsKneePain, S.nhsOA, S.niceOA], redFlags: ["joint"] },
  "/conditions/hip-arthritis": { sources: [S.nhsHipPain, S.nhsOA, S.niceOA], redFlags: ["joint"] },
  "/conditions/hand-arthritis": { sources: [S.nhsHandPain, S.nhsOA, S.niceOA], redFlags: ["joint"] },
  // Flare canonical
  "/arthritis-flare-ups": { sources: [S.nhsJointPain, S.nhsSeptic, S.nhsRATreatment, S.niceOA, S.niceRA], redFlags: ["joint"] },
};

export type RedFlagBlock = { title: string; urgent: string[]; emergency: string[] };

/** Wording follows the NHS symptom/condition pages linked in each set. */
export const RED_FLAGS: Record<RedFlagSet, RedFlagBlock> = {
  joint: {
    title: "Joint pain",
    urgent: [
      "your joint is swollen and the skin around it feels hot",
      "you have joint pain and feel generally unwell, have a high temperature or feel hot, cold or shivery",
      "you have severe pain in a joint, usually 1 joint, that started suddenly",
    ],
    emergency: [
      "very bad joint pain after a fall or injury",
      "you cannot walk or put weight on a joint",
      "a joint has moved out of place",
      "tingling or no feeling around a joint after an injury",
    ],
  },
  gout: {
    title: "Gout attacks",
    urgent: [
      "sudden pain and swelling in a joint and the pain is getting worse",
      "a very high temperature, or you feel sick or cannot eat, as this could mean an infection inside the joint",
    ],
    emergency: [],
  },
  back: {
    title: "Back pain",
    urgent: [
      "back pain and you feel hot, cold, shivery or generally unwell",
      "severe back pain that starts suddenly or is getting worse quickly",
    ],
    emergency: [
      "pain, tingling, weakness or numbness in both legs",
      "loss of feeling around your genitals or anus",
      "changes in your bladder or bowels, such as not being able to pee or losing control of when you pee or poo",
      "back pain with chest pain, or after a serious accident",
    ],
  },
};

export function getPrioritySources(path: string): PrioritySourceEntry | undefined {
  return PRIORITY_SOURCES[path.replace(/\/+$/, "") || "/"];
}
