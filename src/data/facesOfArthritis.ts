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
    title: "“Walking the dog used to hurt. Now it’s the best part of my day.”",
    eyebrow: "Lived experience · Knee osteoarthritis",
    quote:
      "After twelve weeks of guided knee strengthening — five minutes, twice a day — I’m back on the canal path before breakfast. The pain didn’t vanish; it just stopped running my mornings.",
    attribution: "Composite story — woman, 68, retired teacher",
    region: "Leeds, West Yorkshire",
    ageBand: "65–74",
    condition: "Bilateral knee osteoarthritis",
    image: portraitOlderWomanSmiling,
    alt: "Older woman in soft natural light, gentle smile, candid documentary portrait",
    cta: { label: "Read lived experiences", href: "/lived-experiences" },
    fundType: "support",
  },
  {
    id: "david-glasgow",
    title: "“The waiting list felt endless. The helpline didn’t.”",
    eyebrow: "Helpline · Rheumatology waiting list",
    quote:
      "Fourteen months on a hip clinic list is a long time to feel forgotten. The team kept me moving, helped me prepare for surgery, and answered the phone on a Sunday — none of it cost a penny.",
    attribution: "Composite story — man, 71, former bus driver",
    region: "Glasgow, Scotland",
    ageBand: "65–74",
    condition: "Severe hip osteoarthritis",
    image: portraitOlderManThoughtful,
    alt: "Older man at home, thoughtful expression, soft window light, candid portrait",
    cta: { label: "How the helpline supports you", href: "/services" },
    fundType: "helpline",
  },
  {
    id: "amara-london",
    title: "“My grandkids asked why nan can’t kneel. Now I have answers — and exercises.”",
    eyebrow: "Community · Multi-generational",
    quote:
      "Joining the community gave me a vocabulary for the pain and a routine my whole family understands. My six-year-old grandson now leads my morning stretches. He’s a fierce coach.",
    attribution: "Composite story — woman, 62, NHS receptionist",
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
      "We swapped scrolling for walking. Twenty minutes outdoors, four mornings a week, rain or Welsh drizzle. Eight weeks in, both our pain scores had dropped — and we’d gained a habit we actually enjoy.",
    attribution: "Composite story — women, 50s, neighbours",
    region: "Cardiff, Wales",
    ageBand: "50–59",
    condition: "Early-stage knee osteoarthritis",
    image: portraitHeroWomenOutdoors,
    alt: "Two women walking outdoors in warm afternoon light, candid documentary style",
    cta: { label: "Find an exercise plan", href: "/exercise-hub" },
    fundType: "support",
  },
];

/** Aggregate trust strip surfaced under the headline. UK-specific, sourced from
 * Versus Arthritis State of Musculoskeletal Health 2023 and ONS public datasets. */
export const FACES_TRUST_FACTS: { label: string; value: string }[] = [
  { value: "10M+", label: "people in the UK live with arthritis" },
  { value: "8.5M", label: "adults affected by osteoarthritis" },
  { value: "1 in 6", label: "GP appointments are arthritis-related" },
  { value: "100%", label: "of our online resources free to access" },
];
