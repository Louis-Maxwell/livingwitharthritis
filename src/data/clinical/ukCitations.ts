/**
 * Curated UK clinical citation sets for YMYL champions / medicines pages.
 * Only real NHS / NICE / Versus Arthritis / GOV.UK / peer-reviewed URLs —
 * never invent DOIs or sources.
 */
import type { Citation } from "@/components/blog/ArticleCitations";

export const NICE_OA_NG226: Citation = {
  label: "Osteoarthritis in over 16s: diagnosis and management (NG226)",
  url: "https://www.nice.org.uk/guidance/ng226",
  publisher: "NICE",
};

export const NICE_RA_NG100: Citation = {
  label: "Rheumatoid arthritis in adults: management (NG100)",
  url: "https://www.nice.org.uk/guidance/ng100",
  publisher: "NICE",
};

export const NHS_OSTEOARTHRITIS: Citation = {
  label: "Osteoarthritis",
  url: "https://www.nhs.uk/conditions/osteoarthritis/",
  publisher: "NHS",
};

export const NHS_RHEUMATOID: Citation = {
  label: "Rheumatoid arthritis",
  url: "https://www.nhs.uk/conditions/rheumatoid-arthritis/",
  publisher: "NHS",
};

export const NHS_NSAIDS: Citation = {
  label: "NSAIDs (non-steroidal anti-inflammatory drugs)",
  url: "https://www.nhs.uk/conditions/nsaids/",
  publisher: "NHS",
};

export const NHS_STEROID_INJECTIONS: Citation = {
  label: "Steroid injections",
  url: "https://www.nhs.uk/conditions/steroid-injections/",
  publisher: "NHS",
};

export const NHS_CORTICOSTEROIDS: Citation = {
  label: "Corticosteroids (steroids)",
  url: "https://www.nhs.uk/conditions/steroids/",
  publisher: "NHS",
};

export const NHS_SHOULDER_PAIN: Citation = {
  label: "Shoulder pain",
  url: "https://www.nhs.uk/conditions/shoulder-pain/",
  publisher: "NHS",
};

export const NHS_HIP_PAIN: Citation = {
  label: "Hip pain",
  url: "https://www.nhs.uk/conditions/hip-pain/",
  publisher: "NHS",
};

export const VERSUS_ARTHRITIS_OA: Citation = {
  label: "Osteoarthritis information",
  url: "https://versusarthritis.org/about-arthritis/conditions/osteoarthritis/",
  publisher: "Versus Arthritis",
};

export const VERSUS_ARTHRITIS_RA: Citation = {
  label: "Rheumatoid arthritis information",
  url: "https://versusarthritis.org/about-arthritis/conditions/rheumatoid-arthritis/",
  publisher: "Versus Arthritis",
};

export const VERSUS_ARTHRITIS_EXERCISE: Citation = {
  label: "Exercise and arthritis",
  url: "https://versusarthritis.org/about-arthritis/managing-symptoms/exercise/",
  publisher: "Versus Arthritis",
};

export const VERSUS_ARTHRITIS_PAIN: Citation = {
  label: "Pain and arthritis",
  url: "https://versusarthritis.org/about-arthritis/managing-symptoms/pain/",
  publisher: "Versus Arthritis",
};

export const CMO_PHYSICAL_ACTIVITY: Citation = {
  label: "Physical activity guidelines: UK Chief Medical Officers' report",
  url: "https://www.gov.uk/government/publications/physical-activity-guidelines-uk-chief-medical-officers-report",
  publisher: "GOV.UK / UK Chief Medical Officers",
};

/** Painkillers & NSAIDs pillar */
export const CITATIONS_PAINKILLERS_NSAIDS: Citation[] = [
  NICE_OA_NG226,
  NHS_NSAIDS,
  VERSUS_ARTHRITIS_PAIN,
  NHS_OSTEOARTHRITIS,
];

/** Steroids for arthritis pillar */
export const CITATIONS_STEROIDS: Citation[] = [
  NICE_OA_NG226,
  NHS_STEROID_INJECTIONS,
  NHS_CORTICOSTEROIDS,
  NICE_RA_NG100,
];

/** Rheumatoid arthritis condition hub */
export const CITATIONS_RA: Citation[] = [
  NICE_RA_NG100,
  NHS_RHEUMATOID,
  VERSUS_ARTHRITIS_RA,
];

/** Hip arthritis condition hub */
export const CITATIONS_HIP: Citation[] = [
  NICE_OA_NG226,
  NHS_HIP_PAIN,
  NHS_OSTEOARTHRITIS,
  VERSUS_ARTHRITIS_OA,
];

/** Shoulder pain relief guide */
export const CITATIONS_SHOULDER: Citation[] = [
  NHS_SHOULDER_PAIN,
  NICE_OA_NG226,
  VERSUS_ARTHRITIS_EXERCISE,
];

/** Can exercise make OA worse? */
export const CITATIONS_EXERCISE_OA_SAFETY: Citation[] = [
  NICE_OA_NG226,
  VERSUS_ARTHRITIS_EXERCISE,
  CMO_PHYSICAL_ACTIVITY,
  NHS_OSTEOARTHRITIS,
];

/** Hip exercises for osteoarthritis */
export const CITATIONS_HIP_EXERCISES: Citation[] = [
  NICE_OA_NG226,
  VERSUS_ARTHRITIS_EXERCISE,
  CMO_PHYSICAL_ACTIVITY,
  NHS_HIP_PAIN,
];

export const NHS_AZATHIOPRINE: Citation = {
  label: "Azathioprine",
  url: "https://www.nhs.uk/medicines/azathioprine/",
  publisher: "NHS",
};

export const NHS_GOUT: Citation = {
  label: "Gout",
  url: "https://www.nhs.uk/conditions/gout/",
  publisher: "NHS",
};

export const NICE_GOUT_NG219: Citation = {
  label: "Gout: diagnosis and management (NG219)",
  url: "https://www.nice.org.uk/guidance/ng219",
  publisher: "NICE",
};

export const NHS_ALLOPURINOL: Citation = {
  label: "Allopurinol",
  url: "https://www.nhs.uk/medicines/allopurinol/",
  publisher: "NHS",
};

/** Azathioprine medication guide */
export const CITATIONS_AZATHIOPRINE: Citation[] = [
  NHS_AZATHIOPRINE,
  NICE_RA_NG100,
  VERSUS_ARTHRITIS_RA,
];

/** Febuxostat for gout */
export const CITATIONS_FEBUXOSTAT: Citation[] = [
  NICE_GOUT_NG219,
  NHS_GOUT,
  NHS_ALLOPURINOL,
];

export const NHS_EAT_WELL: Citation = {
  label: "Eat well",
  url: "https://www.nhs.uk/live-well/eat-well/",
  publisher: "NHS",
};

export const VERSUS_ARTHRITIS_DIET: Citation = {
  label: "Diet and arthritis",
  url: "https://versusarthritis.org/about-arthritis/managing-symptoms/diet/",
  publisher: "Versus Arthritis",
};

export const GOV_UK_PIP: Citation = {
  label: "Personal Independence Payment (PIP)",
  url: "https://www.gov.uk/pip",
  publisher: "GOV.UK",
};

export const GOV_UK_ACCESS_TO_WORK: Citation = {
  label: "Access to Work",
  url: "https://www.gov.uk/access-to-work",
  publisher: "GOV.UK",
};

export const GOV_UK_EQUALITY_ACT: Citation = {
  label: "Equality Act 2010: guidance",
  url: "https://www.gov.uk/guidance/equality-act-2010-guidance",
  publisher: "GOV.UK",
};

export const CSP_HOME: Citation = {
  label: "Chartered Society of Physiotherapy",
  url: "https://www.csp.org.uk/",
  publisher: "CSP",
};

export const NHS_REFERRALS: Citation = {
  label: "Referrals for specialist care",
  url: "https://www.nhs.uk/nhs-services/hospitals/referrals-for-specialist-care/",
  publisher: "NHS",
};

export const NHS_KNEE_REPLACEMENT: Citation = {
  label: "Knee replacement",
  url: "https://www.nhs.uk/conditions/knee-replacement/",
  publisher: "NHS",
};

export const NHS_FIND_SERVICES: Citation = {
  label: "Find NHS services near you",
  url: "https://www.nhs.uk/nhs-services/",
  publisher: "NHS",
};

/** Arthritis pain relief / pain science guide */
export const CITATIONS_PAIN_RELIEF: Citation[] = [
  VERSUS_ARTHRITIS_PAIN,
  NICE_OA_NG226,
  NHS_NSAIDS,
  NHS_OSTEOARTHRITIS,
];

/** Diet hub + diet pillar */
export const CITATIONS_DIET: Citation[] = [
  VERSUS_ARTHRITIS_DIET,
  NHS_EAT_WELL,
  NICE_OA_NG226,
  NHS_OSTEOARTHRITIS,
];

/** Disability support + PIP benefits */
export const CITATIONS_DISABILITY_PIP: Citation[] = [
  GOV_UK_PIP,
  GOV_UK_ACCESS_TO_WORK,
  GOV_UK_EQUALITY_ACT,
  VERSUS_ARTHRITIS_OA,
];

/** Waiting-list help */
export const CITATIONS_WAITING_LIST: Citation[] = [
  NHS_REFERRALS,
  NHS_FIND_SERVICES,
  NICE_OA_NG226,
  VERSUS_ARTHRITIS_OA,
];

/** Exercise hub + exercise pillar */
export const CITATIONS_EXERCISE_HUB: Citation[] = [
  NICE_OA_NG226,
  VERSUS_ARTHRITIS_EXERCISE,
  CMO_PHYSICAL_ACTIVITY,
  CSP_HOME,
];

/** Health services / NHS pathway guide */
export const CITATIONS_HEALTH_SERVICES: Citation[] = [
  NHS_FIND_SERVICES,
  NHS_REFERRALS,
  CSP_HOME,
  VERSUS_ARTHRITIS_OA,
];

/** Knee replacement surgery guide */
export const CITATIONS_KNEE_REPLACEMENT: Citation[] = [
  NHS_KNEE_REPLACEMENT,
  NICE_OA_NG226,
  NHS_OSTEOARTHRITIS,
  VERSUS_ARTHRITIS_OA,
];
