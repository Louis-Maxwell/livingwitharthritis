// Editorial story themes for the "Faces of Arthritis" landing section.
// Composite, anonymised UK story themes — not real named individuals.
// Imagery sourced from Unsplash (royalty-free, documentary style).

import {
  portraitHeroWomenOutdoors,
  portraitOlderWomanSmiling,
  portraitOlderManThoughtful,
  portraitMultigenFamily,
} from "@/data/images";

export type FaceStoryFundType = "research" | "support" | "helpline" | "general";

export interface FaceStory {
  /** Short URL-safe id used for anchors */
  id: string;
  /** Story headline shown over the portrait */
  title: string;
  /** Eyebrow tag — content category */
  eyebrow: string;
  /** Editorial pull-quote, max ~140 chars */
  quote: string;
  /** Composite identity label (anonymised) */
  attribution: string;
  /** Region in the UK */
  region: string;
  /** Age band */
  ageBand: string;
  /** Primary condition focus */
  condition: string;
  /** Image URL (Unsplash CDN) */
  image: string;
  /** Image alt text — descriptive, no marketing language */
  alt: string;
  /** CTA copy and destination */
  cta: { label: string; href: string };
  /** Optional fund tag — drives donation routing if surfaced */
  fundType?: FaceStoryFundType;
}

/**
 * Story themes are illustrative, anonymised composites drawn from
 * patient feedback and helpline themes. They are NOT real individuals
 * and use no identifying details — in line with the project content policy.
 */
export const FACE_STORIES: FaceStory[] = [
  {
    id: "margaret-leeds",
    title: "“Walking the dog used to hurt. Now it's the best part of my day.”",
    eyebrow: "Lived experience · Osteoarthritis",
    quote:
      "Three months of guided knee exercises, and I'm back on the canal path every morning. Small, steady progress — that was the secret.",
    attribution: "Composite story — woman, 68",
    region: "Leeds, Yorkshire",
    ageBand: "65–74",
    condition: "Knee osteoarthritis",
    image: portraitOlderWomanSmiling,
    alt: "Older woman in soft natural light, gentle smile, candid documentary portrait",
    cta: { label: "Read lived experiences", href: "/lived-experiences" },
    fundType: "support",
  },
  {
    id: "david-glasgow",
    title: "“The waiting list felt endless. The helpline didn't.”",
    eyebrow: "Helpline · NHS waiting list",
    quote:
      "While I waited 14 months for a hip clinic, the team helped me stay mobile, manage flare-ups and prepare for surgery — for free.",
    attribution: "Composite story — man, 71",
    region: "Glasgow, Scotland",
    ageBand: "65–74",
    condition: "Hip osteoarthritis",
    image: portraitOlderManThoughtful,
    alt: "Older man at home, thoughtful expression, soft window light, candid portrait",
    cta: { label: "How the helpline supports you", href: "/services" },
    fundType: "helpline",
  },
  {
    id: "amara-london",
    title: "“My grandkids ask why nan can't kneel. Now I have answers — and exercises.”",
    eyebrow: "Community · Multi-generational",
    quote:
      "Joining the UK community gave me a language for the pain, and a routine my whole family understands and supports.",
    attribution: "Composite story — woman, 62",
    region: "South London",
    ageBand: "55–64",
    condition: "Polyarticular osteoarthritis",
    image: portraitMultigenFamily,
    alt: "Multi-generational hands together, warm tones, family connection",
    cta: { label: "Join the community", href: "/community-hub" },
    fundType: "support",
  },
  {
    id: "rhian-cardiff",
    title: "“Two friends, one diagnosis, a thousand small wins.”",
    eyebrow: "Peer support · Movement",
    quote:
      "We swapped scrolling for walking. Twenty minutes outdoors, four times a week — both our pain scores dropped within eight weeks.",
    attribution: "Composite story — women, 50s",
    region: "Cardiff, Wales",
    ageBand: "50–59",
    condition: "Early osteoarthritis",
    image: portraitHeroWomenOutdoors,
    alt: "Two women walking outdoors in warm afternoon light, candid documentary style",
    cta: { label: "Find an exercise plan", href: "/exercise-hub" },
    fundType: "support",
  },
];

/** Aggregate trust strip surfaced under the headline */
export const FACES_TRUST_FACTS: { label: string; value: string }[] = [
  { value: "10M", label: "people in the UK live with arthritis" },
  { value: "100%", label: "of resources free to access" },
  { value: "0", label: "waiting list for our online tools" },
  { value: "UK", label: "physio & nutrition reviewed" },
];
