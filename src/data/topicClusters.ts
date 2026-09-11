/**
 * Eight SEO topic clusters from docs/SEO-90-DAY-VISIBILITY-PLAN.md.
 * Pillars and supporting routes are limited to paths that exist in App.tsx.
 * Do not invent doorway pages or unverified claims here.
 */

export type TopicClusterId =
  | "pain"
  | "osteoarthritis"
  | "exercises"
  | "diet"
  | "symptoms"
  | "treatments"
  | "flare-ups"
  | "pip";

export interface TopicCluster {
  id: TopicClusterId;
  label: string;
  /** Primary pillar URL (canonical for this cluster). */
  pillarPath: string;
  pillarTitle: string;
  /** Supporting hubs / guides that already exist in the router. */
  supportingPaths: string[];
  /** One practical tool / next-step CTA. */
  toolPath: string;
  toolLabel: string;
  /** Lowercase substrings used to map blog posts → this cluster. */
  triggers: string[];
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "pain",
    label: "Arthritis pain",
    pillarPath: "/guides/arthritis-pain-relief",
    pillarTitle: "Arthritis pain relief guide",
    supportingPaths: [
      "/guides/shoulder-pain-relief",
      "/guides/painkillers-and-nsaids",
      "/arthritis-flare-ups",
      "/self-help",
    ],
    toolPath: "/self-help",
    toolLabel: "Self-help tool",
    triggers: [
      "pain relief",
      "joint pain",
      "chronic pain",
      "nsaid",
      "painkiller",
      "ibuprofen",
      "paracetamol",
      "shoulder pain",
      "heat and cold",
      "topical",
    ],
  },
  {
    id: "osteoarthritis",
    label: "Osteoarthritis",
    pillarPath: "/conditions/osteoarthritis",
    pillarTitle: "Osteoarthritis guide",
    supportingPaths: [
      "/conditions/knee-arthritis",
      "/conditions/hip-arthritis",
      "/conditions/hand-arthritis",
      "/conditions/shoulder-arthritis",
      "/guides/hip-exercises-for-osteoarthritis",
      "/guides/can-exercise-make-osteoarthritis-worse",
      "/blog/knee-arthritis-exercises-uk",
    ],
    toolPath: "/exercises",
    toolLabel: "Exercise hub",
    triggers: [
      "osteoarthritis",
      "oa ",
      "knee oa",
      "hip oa",
      "hand oa",
      "degenerative joint",
      "wear and tear",
    ],
  },
  {
    id: "exercises",
    label: "Arthritis exercises",
    pillarPath: "/exercises",
    pillarTitle: "Exercise hub",
    supportingPaths: [
      "/guides/exercise",
      "/exercises/tai-chi-for-arthritis",
      "/exercises/tai-chi-for-balance",
      "/exercises/seated-tai-chi-for-arthritis",
      "/exercises/tai-chi-for-beginners",
      "/exercises/ankle-arthritis-exercises",
      "/exercises/neck-arthritis-exercises",
      "/guides/hip-exercises-for-osteoarthritis",
      "/pedometer",
    ],
    toolPath: "/self-help",
    toolLabel: "Interactive joint diagram",
    triggers: [
      "exercise",
      "exercises",
      "stretch",
      "strengthening",
      "tai chi",
      "yoga",
      "pilates",
      "walking",
      "swim",
      "hydrotherapy",
      "physiotherapy",
      "physio",
      "chair exercise",
    ],
  },
  {
    id: "diet",
    label: "Arthritis diet",
    pillarPath: "/diet",
    pillarTitle: "Diet hub",
    supportingPaths: [
      "/guides/diet",
      "/diet/mediterranean-diet-for-arthritis",
      "/diet/foods-to-avoid-with-arthritis",
      "/supplements",
      "/supplements/turmeric",
      "/supplements/glucosamine",
          ],
    toolPath: "/chat",
    toolLabel: "Ask about diet",
    triggers: [
      "diet",
      "nutrition",
      "mediterranean",
      "anti-inflammatory food",
      "anti inflammatory",
      "omega-3",
      "omega 3",
      "turmeric",
      "foods to avoid",
      "meal plan",
      "weight management",
    ],
  },
  {
    id: "symptoms",
    label: "Arthritis symptoms",
    pillarPath: "/guides/newly-diagnosed",
    pillarTitle: "Newly diagnosed guide",
    supportingPaths: [
      "/living-with-arthritis",
      "/symptom-checker",
      "/conditions/arthritis",
      "/faq",
      "/library",
    ],
    toolPath: "/symptom-checker",
    toolLabel: "Symptom checker",
    triggers: [
      "symptom",
      "symptoms",
      "early signs",
      "stiffness",
      "swollen",
      "swelling",
      "newly diagnosed",
      "diagnosis",
      "what does arthritis feel",
    ],
  },
  {
    id: "treatments",
    label: "Arthritis treatments",
    pillarPath: "/guides/painkillers-and-nsaids",
    pillarTitle: "Painkillers & NSAIDs guide",
    supportingPaths: [
      "/guides/steroids-for-arthritis",
      "/guides/knee-replacement-surgery",
      "/guides/azathioprine-for-arthritis",
      "/guides/febuxostat-for-gout",
      "/guides/health-services",
      "/arthritis-waiting-list-help",
      "/supplements",
    ],
    toolPath: "/guides/health-services",
    toolLabel: "NHS & health services guide",
    triggers: [
      "treatment",
      "treatments",
      "medication",
      "dmard",
      "biologic",
      "steroid",
      "injection",
      "surgery",
      "replacement",
      "methotrexate",
      "azathioprine",
      "febuxostat",
      "physiotherapy referral",
    ],
  },
  {
    id: "flare-ups",
    label: "Flare-ups",
    pillarPath: "/arthritis-flare-ups",
    pillarTitle: "Flare-up guide",
    supportingPaths: [
      "/guides/arthritis-pain-relief",
      "/arthritis-mental-health",
      "/exercises",
      "/diet",
      "/chat",
      "/resources/flare-action-plan",
    ],
    toolPath: "/chat",
    toolLabel: "Help chat during a flare",
    triggers: [
      "flare",
      "flare-up",
      "flare up",
      "acute pain",
      "inflammation spike",
      "boom and bust",
    ],
  },
  {
    id: "pip",
    label: "Benefits & PIP",
    pillarPath: "/guides/benefits-pip",
    pillarTitle: "Benefits & PIP guide",
    supportingPaths: [
      "/benefits-pip",
      "/resources/pip-evidence-diary",
      "/guides/disability-support",
      "/guides/work-with-arthritis",
      "/guides/insurance-coverage",
      "/faq/arthritis-disability-benefits-uk",
    ],
    toolPath: "/benefits-pip",
    toolLabel: "Benefits & PIP hub",
    triggers: [
      "pip",
      "personal independence",
      "disability benefit",
      "benefits",
      "blue badge",
      "attendance allowance",
      "access to work",
      "dla",
      "motability",
      "welfare",
    ],
  },
];

const BY_ID = new Map(TOPIC_CLUSTERS.map((c) => [c.id, c]));

/**
 * Exact path → cluster (pillar or supporting only).
 * Tool paths are omitted here because tools are often shared across clusters
 * (e.g. /exercises is both the exercises pillar and OA’s tool CTA).
 * Longer paths win so /guides/benefits-pip beats a shorter prefix.
 */
const PATH_INDEX: { path: string; cluster: TopicCluster }[] = (() => {
  const rows: { path: string; cluster: TopicCluster }[] = [];
  for (const c of TOPIC_CLUSTERS) {
    rows.push({ path: c.pillarPath, cluster: c });
    for (const p of c.supportingPaths) {
      // Do not let another cluster’s supporting page override a true pillar path.
      if (TOPIC_CLUSTERS.some((other) => other.id !== c.id && other.pillarPath === p)) continue;
      rows.push({ path: p, cluster: c });
    }
  }
  rows.sort((a, b) => b.path.length - a.path.length);
  return rows;
})();

export function getClusterById(id: TopicClusterId | string): TopicCluster | null {
  return BY_ID.get(id as TopicClusterId) ?? null;
}

/** Resolve a site path (e.g. /blog/foo or /exercises) to its primary cluster. */
export function getClusterForPath(pathname: string): TopicCluster | null {
  if (!pathname) return null;
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    return getClusterForSlug(slug);
  }

  for (const row of PATH_INDEX) {
    if (path === row.path || path.startsWith(`${row.path}/`)) return row.cluster;
  }
  return null;
}

/**
 * Map a blog slug (and optional title/excerpt/keywords) to the best cluster.
 * Prefer keyword/trigger hits; fall back to hyphen token matches in the slug.
 */
export function getClusterForSlug(
  slug: string,
  haystackExtra?: string | null,
): TopicCluster | null {
  const hay = [slug.replace(/-/g, " "), haystackExtra ?? ""]
    .join(" ")
    .toLowerCase();
  if (!hay.trim()) return null;

  let best: TopicCluster | null = null;
  let bestScore = 0;
  for (const c of TOPIC_CLUSTERS) {
    let score = 0;
    for (const t of c.triggers) {
      if (hay.includes(t)) score += t.length >= 8 ? 3 : 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return bestScore > 0 ? best : null;
}

/** Pillar path for a blog slug, if we can map it. */
export function getPillarForSlug(
  slug: string,
  haystackExtra?: string | null,
): { path: string; title: string; clusterId: TopicClusterId } | null {
  const cluster = getClusterForSlug(slug, haystackExtra);
  if (!cluster) return null;
  return {
    path: cluster.pillarPath,
    title: cluster.pillarTitle,
    clusterId: cluster.id,
  };
}

export function getToolForSlug(
  slug: string,
  haystackExtra?: string | null,
): { path: string; label: string; clusterId: TopicClusterId } | null {
  const cluster = getClusterForSlug(slug, haystackExtra);
  if (!cluster) return null;
  return {
    path: cluster.toolPath,
    label: cluster.toolLabel,
    clusterId: cluster.id,
  };
}
