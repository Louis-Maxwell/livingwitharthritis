/**
 * Single source of truth for every /guides/* pillar page.
 * Used by the Related Guides + Next Read blocks at the bottom
 * of each guide to drive onward navigation and lift pages/session.
 */

export type GuideCluster =
  | "medication"
  | "msk"
  | "lifestyle"
  | "support"
  | "surgery"
  | "condition";

export interface GuideEntry {
  path: string;
  title: string;
  description: string;
  cluster: GuideCluster;
}

export const GUIDE_REGISTRY: GuideEntry[] = [
  // Medication
  {
    path: "/guides/steroids-for-arthritis",
    title: "Steroids for arthritis",
    description: "How corticosteroids work, dosing patterns and side-effect risks.",
    cluster: "medication",
  },
  {
    path: "/guides/azathioprine-for-arthritis",
    title: "Azathioprine for arthritis",
    description: "DMARD use in inflammatory arthritis — monitoring and safety.",
    cluster: "medication",
  },
  {
    path: "/guides/febuxostat-for-gout",
    title: "Febuxostat for gout",
    description: "Urate-lowering therapy compared with allopurinol.",
    cluster: "medication",
  },
  {
    path: "/guides/painkillers-and-nsaids",
    title: "Painkillers & NSAIDs",
    description: "Choosing between paracetamol, NSAIDs and topical options.",
    cluster: "medication",
  },
  {
    path: "/guides/arthritis-pain-relief",
    title: "Arthritis pain relief",
    description: "Layered pain-management strategies that actually work.",
    cluster: "medication",
  },

  // MSK / movement
  {
    path: "/guides/exercise",
    title: "Exercise with arthritis",
    description: "Strength, mobility and aerobic programming for stiff joints.",
    cluster: "msk",
  },
  {
    path: "/guides/can-exercise-make-osteoarthritis-worse",
    title: "Can exercise make OA worse?",
    description: "What the evidence says about load, pain flares and progression.",
    cluster: "msk",
  },
  {
    path: "/guides/musculoskeletal-health",
    title: "Musculoskeletal health",
    description: "Whole-body MSK fundamentals across the lifespan.",
    cluster: "msk",
  },
  {
    path: "/guides/sarcopenia-muscle-loss",
    title: "Sarcopenia & muscle loss",
    description: "Reversing age-related muscle decline with protein and resistance.",
    cluster: "msk",
  },
  {
    path: "/guides/bone-density-osteoporosis",
    title: "Bone density & osteoporosis",
    description: "Protecting bone strength alongside arthritic joint care.",
    cluster: "msk",
  },
  {
    path: "/guides/fall-prevention-older-adults",
    title: "Fall prevention",
    description: "Balance, footwear and home checks that prevent fractures.",
    cluster: "msk",
  },
  {
    path: "/guides/preventative-msk-health",
    title: "Preventative MSK health",
    description: "Habits that delay or avoid osteoarthritis progression.",
    cluster: "msk",
  },

  // Lifestyle
  {
    path: "/guides/diet",
    title: "Diet & nutrition",
    description: "Mediterranean-style eating and anti-inflammatory foods.",
    cluster: "lifestyle",
  },

  // Support / navigation
  {
    path: "/guides/newly-diagnosed",
    title: "Newly diagnosed",
    description: "The first 90 days — what to ask, expect and prioritise.",
    cluster: "support",
  },
  {
    path: "/guides/frailty-management-hub",
    title: "Frailty management",
    description: "A coordinated plan for older adults living with frailty.",
    cluster: "support",
  },
  {
    path: "/guides/disability-support",
    title: "Disability support",
    description: "Aids, adaptations and rights when arthritis is disabling.",
    cluster: "support",
  },
  {
    path: "/guides/benefits-pip",
    title: "Benefits & PIP",
    description: "Personal Independence Payment for people with arthritis.",
    cluster: "support",
  },
  {
    path: "/guides/uk-arthritis",
    title: "UK arthritis guide",
    description: "Pathways, services and the realities of UK care.",
    cluster: "support",
  },
  {
    path: "/guides/health-services",
    title: "Health services",
    description: "GP, rheumatology and physiotherapy — how to navigate them.",
    cluster: "support",
  },
  {
    path: "/guides/insurance-coverage",
    title: "Insurance coverage",
    description: "What private and travel insurance cover for arthritis.",
    cluster: "support",
  },
  {
    path: "/guides/work-with-arthritis",
    title: "Working with arthritis",
    description: "Adjustments, sick pay and protecting your career.",
    cluster: "support",
  },
  {
    path: "/guides/travel-with-arthritis",
    title: "Travel with arthritis",
    description: "Flights, medications and pacing on the move.",
    cluster: "support",
  },

  // Surgery
  {
    path: "/guides/knee-replacement-surgery",
    title: "Knee replacement surgery",
    description: "Eligibility, recovery timeline and outcomes.",
    cluster: "surgery",
  },
];

const CLUSTER_LABEL: Record<GuideCluster, string> = {
  medication: "Medication",
  msk: "Movement",
  lifestyle: "Lifestyle",
  support: "Support",
  surgery: "Surgery",
  condition: "Condition",
};

export function clusterLabel(cluster: GuideCluster): string {
  return CLUSTER_LABEL[cluster];
}

export function getRelatedGuides(currentPath: string, limit = 3): GuideEntry[] {
  const current = GUIDE_REGISTRY.find((g) => g.path === currentPath);
  const others = GUIDE_REGISTRY.filter((g) => g.path !== currentPath);

  if (!current) return others.slice(0, limit);

  const sameCluster = others.filter((g) => g.cluster === current.cluster);
  const otherCluster = others.filter((g) => g.cluster !== current.cluster);

  return [...sameCluster, ...otherCluster].slice(0, limit);
}
