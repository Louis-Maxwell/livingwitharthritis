/**
 * Content cluster definitions for the automatic "Related articles" surface.
 *
 * Each cluster has:
 *  - id / label: rendered as the eyebrow chip on related cards
 *  - triggers:   lowercase substrings matched against an article's
 *                title, excerpt, category and keywords
 *  - bestGuide:  curated pillar page to link to as the "best supporting guide"
 */

export interface ContentCluster {
  id: string;
  label: string;
  triggers: string[];
  bestGuide: { title: string; to: string; description: string };
}

export const CONTENT_CLUSTERS: ContentCluster[] = [
  {
    id: "knee-oa",
    label: "Knee OA",
    triggers: [
      "knee", "knee oa", "knee osteoarthritis", "patella", "meniscus",
      "quad strength", "wall sit", "step up",
    ],
    bestGuide: {
      title: "Knee Arthritis – Complete Guide",
      to: "/conditions/knee-arthritis",
      description: "Symptoms, exercises and self-care for knee osteoarthritis.",
    },
  },
  {
    id: "hip-oa",
    label: "Hip OA",
    triggers: ["hip", "hip osteoarthritis", "hip replacement", "groin pain"],
    bestGuide: {
      title: "Hip Arthritis – Complete Guide",
      to: "/conditions/hip-arthritis",
      description: "How hip OA develops and the exercises that protect the joint.",
    },
  },
  {
    id: "rheumatoid",
    label: "Rheumatoid arthritis",
    triggers: [
      "rheumatoid", "ra ", " ra,", "ra flare", "dmard", "biologic",
      "autoimmune arthritis", "inflammatory arthritis",
    ],
    bestGuide: {
      title: "Rheumatoid Arthritis – Complete Guide",
      to: "/conditions/rheumatoid-arthritis",
      description: "Diagnosis, medication and lifestyle for RA in the UK.",
    },
  },
  {
    id: "flare-ups",
    label: "Flare-ups",
    triggers: [
      "flare", "flare-up", "flare up", "acute pain", "swelling", "inflammation spike",
    ],
    bestGuide: {
      title: "Arthritis Flare-Ups – Calm a Flare in 48 Hours",
      to: "/arthritis-flare-ups",
      description: "Step-by-step plan to settle pain, swelling and stiffness fast.",
    },
  },
  {
    id: "diet",
    label: "Diet & nutrition",
    triggers: [
      "diet", "nutrition", "mediterranean", "anti-inflammatory food", "anti inflammatory",
      "omega 3", "omega-3", "turmeric", "curcumin", "foods to avoid",
      "weight management", "weight loss",
    ],
    bestGuide: {
      title: "Diet Hub for Arthritis",
      to: "/diet",
      description: "Mediterranean eating, foods to avoid and anti-inflammatory recipes.",
    },
  },
  {
    id: "exercise",
    label: "Exercise & movement",
    triggers: [
      "exercise", "exercises", "stretch", "stretching", "strength", "strengthening",
      "tai chi", "yoga", "pilates", "walking", "swim", "hydrotherapy", "physiotherapy",
    ],
    bestGuide: {
      title: "Exercise Hub for Arthritis",
      to: "/exercises",
      description: "Joint-specific exercise plans designed by physiotherapists.",
    },
  },
  {
    id: "frailty",
    label: "Frailty & falls",
    triggers: [
      "frailty", "frail", "sarcopenia", "falls", "fall prevention",
      "balance", "older adult", "elderly",
    ],
    bestGuide: {
      title: "Frailty Management Hub",
      to: "/guides/frailty-management-hub",
      description: "Reverse muscle loss, prevent falls and stay independent.",
    },
  },
  {
    id: "supplements",
    label: "Supplements",
    triggers: [
      "supplement", "glucosamine", "chondroitin", "msm", "collagen",
      "vitamin d", "fish oil",
    ],
    bestGuide: {
      title: "Supplements for Joint Health",
      to: "/supplements",
      description: "What actually works for arthritis — and what to skip.",
    },
  },

  {
    id: "pip-benefits",
    label: "PIP & benefits",
    triggers: [
      "pip", "personal independence payment", "attendance allowance",
      "blue badge", "motability", "disability benefit", "universal credit",
      "adult disability payment", "dfa", "disabled facilities",
    ],
    bestGuide: {
      title: "UK Arthritis Benefits & PIP Guide",
      to: "/guides/benefits-pip",
      description: "PIP, Attendance Allowance, Blue Badge and appeals for arthritis in the UK.",
    },
  },
  {
    id: "waiting-list",
    label: "Waiting lists",
    triggers: [
      "waiting list", "waiting well", "rheumatology wait", "physio wait",
      "joint replacement wait", "nhs wait", "referral",
    ],
    bestGuide: {
      title: "Arthritis Waiting List Help",
      to: "/arthritis-waiting-list-help",
      description: "What to do while waiting for rheumatology, physio or surgery in the UK.",
    },
  },
  {
    id: "work-rights",
    label: "Work & rights",
    triggers: [
      "access to work", "equality act", "reasonable adjustment", "workplace",
      "occupational health", "fit note", "wfh", "working with arthritis",
    ],
    bestGuide: {
      title: "Working with Arthritis — UK Rights",
      to: "/blog/working-with-arthritis-uk-rights",
      description: "Equality Act, reasonable adjustments and Access to Work.",
    },
  },
  {
    id: "methotrexate",
    label: "Methotrexate",
    triggers: [
      "methotrexate", "mtx", "folic acid", "dmard", "weekly injection",
    ],
    bestGuide: {
      title: "Managing Methotrexate Side Effects",
      to: "/blog/managing-methotrexate-side-effects-practical-tips",
      description: "Practical UK tips, folic acid timing and when to call your team.",
    },
  },

];

const CLUSTERS_BY_ID = new Map(
  CONTENT_CLUSTERS.filter((c): c is ContentCluster => Boolean(c)).map((c) => [c.id, c]),
);

interface ArticleLike {
  title?: string | null;
  excerpt?: string | null;
  category?: string | null;
  keywords?: string | null;
}

function haystackOf(a: ArticleLike): string {
  return [a.title, a.excerpt, a.category, a.keywords]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/** Detect cluster ids that apply to the given article-ish text bundle. */
export function getClustersForArticle(article: ArticleLike): string[] {
  const hay = haystackOf(article);
  if (!hay) return [];
  const hits: string[] = [];
  for (const c of CONTENT_CLUSTERS) {
    if (!c?.triggers) continue;
    if (c.triggers.some((t) => hay.includes(t))) hits.push(c.id);
  }
  return hits;
}

/** Score a candidate against the source's cluster set. */
export function scoreCandidate(
  candidate: ArticleLike,
  sourceClusters: string[],
  sourceCategory?: string | null,
): number {
  if (sourceClusters.length === 0 && !sourceCategory) return 0;
  const candidateClusters = getClustersForArticle(candidate);
  let score = 0;
  for (const id of candidateClusters) {
    if (sourceClusters.includes(id)) score += 3;
  }
  if (
    sourceCategory &&
    candidate.category &&
    candidate.category.toLowerCase() === sourceCategory.toLowerCase()
  ) {
    score += 1;
  }
  return score;
}

/** Pick the most relevant cluster for a single article (for the eyebrow label). */
export function primaryClusterFor(article: ArticleLike): ContentCluster | null {
  const ids = getClustersForArticle(article);
  if (ids.length === 0) return null;
  return CLUSTERS_BY_ID.get(ids[0]) ?? null;
}

export function getClusterById(id: string): ContentCluster | null {
  return CLUSTERS_BY_ID.get(id) ?? null;
}
