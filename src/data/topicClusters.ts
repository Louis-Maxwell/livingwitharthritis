import conditionTopicClusters from "./conditionTopicClusters.json";

/**
 * Core SEO topic clusters from docs/SEO-90-DAY-VISIBILITY-PLAN.md.
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
  | "pip"
  | "rheumatoid-arthritis"
  | "psoriatic-arthritis"
  | "ankylosing-spondylitis"
  | "fibromyalgia";

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
  ...(conditionTopicClusters as TopicCluster[]),
  {
    id: "pain",
    label: "Arthritis pain",
    pillarPath: "/guides/arthritis-pain-relief",
    pillarTitle: "Arthritis pain relief guide",
    supportingPaths: [
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/arthritis-fatigue-management-uk",
      "/blog/arthritis-flare-up-what-to-do",
      "/blog/how-to-sleep-with-arthritis-uk",
      "/blog/cold-weather-arthritis-uk-winter",
      "/blog/winter-arthritis-frailty-cold-houses-uk",
      "/blog/best-sleep-positions-joint-pain",
      "/blog/sleep-quality-arthritis-pain",
      "/blog/arthritis-and-sleep-problems",
      "/blog/sleep-and-pain-management-arthritis",
      "/blog/sleeping-tablets-falls-arthritis-frailty-uk",
      "/blog/sleep-apnoea-arthritis-frailty-uk",
      "/blog/best-walking-shoes-arthritis-uk",
      "/library/fibromyalgia",
      "/library/arthritis-symptoms",
      "/arthritis-flare-ups",
      "/guides/shoulder-pain-relief",
      "/guides/painkillers-and-nsaids",
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
      "night pain",
      "overnight pain",
      "sleeping tablets",
      "sleep apnoea",
      "sleep apnea",
      "night falls",
      "insomnia arthritis",
    ],
  },
  {
    id: "osteoarthritis",
    label: "Osteoarthritis",
    pillarPath: "/conditions/osteoarthritis",
    pillarTitle: "Osteoarthritis guide",
    supportingPaths: [
      "/blog/swimming-exercises-hip-osteoarthritis",
      "/guides/hip-exercises-for-osteoarthritis",
      "/faq/what-is-osteoarthritis",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/best-walking-shoes-arthritis-uk",
      "/conditions/hip-arthritis",
      "/library/osteoarthritis",
      "/library/arthritis",
      "/conditions/knee-arthritis",
      "/conditions/hand-arthritis",
      "/conditions/shoulder-arthritis",
      "/guides/can-exercise-make-osteoarthritis-worse",
      "/guides/knee-exercises-for-osteoarthritis",
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
      "/blog/swimming-exercises-hip-osteoarthritis",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/best-walking-shoes-arthritis-uk",
      "/blog/staying-active-arthritis-winter-uk",
      "/blog/ice-snow-arthritis-frailty-uk",
      "/blog/confidence-after-fall-arthritis-frailty-uk",
      "/blog/night-lights-arthritis-falls-frailty-uk",
      "/blog/sit-to-stand-practice-frail-arthritis-uk",
      "/blog/chair-yoga-elderly-arthritis-stiffness",
      "/blog/knee-osteoarthritis-frailty-staying-steady-home-uk",
      "/blog/seated-strength-frail-osteoarthritis-uk",
      "/blog/chair-based-exercise-ra-frailty-uk",
      "/blog/continence-night-trips-arthritis-frailty-uk",
      "/guides/exercise",
      "/guides/hip-exercises-for-osteoarthritis",
      "/guides/knee-exercises-for-osteoarthritis",
      "/library/shoulder-exercises",
      "/faq/best-exercises-arthritis",
      "/blog/arthritis-and-cycling-uk",
      "/exercises/tai-chi-for-arthritis",
      "/exercises/tai-chi-for-balance",
      "/exercises/seated-tai-chi-for-arthritis",
      "/exercises/tai-chi-for-beginners",
      "/exercises/ankle-arthritis-exercises",
      "/exercises/neck-arthritis-exercises",
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
      "icy pavements",
      "snow and ice",
      "fear of falling",
      "confidence after a fall",
      "falls service",
      "chair yoga",
      "sit to stand",
      "getting up from a chair",
      "knee giving way",
      "wobbly knees",
      "seated strength",
      "night lights",
      "motion sensor light",
      "getting up at night",
      "exercise during an ra flare",
      "waking at night to pee",
    ],
  },
  {
    id: "diet",
    label: "Arthritis diet",
    pillarPath: "/diet",
    pillarTitle: "Diet hub",
    supportingPaths: [
      "/guides/diet",
      "/blog/turmeric-for-arthritis",
      "/library/turmeric",
      "/supplements/turmeric",
      "/blog/best-supplement-for-knee-joint",
      "/blog/vitamin-d-winter-arthritis-frailty-uk",
      "/blog/vitamin-d-and-falls-arthritis-uk",
      "/blog/omega-3-foods-for-joints",
      "/blog/glucosamine-vs-collagen",
      "/blog/anti-inflammatory-diet-rheumatoid-arthritis",
      "/conditions/psoriatic-arthritis/diet",
      "/supplements",
      "/supplements/glucosamine",
      "/diet/mediterranean-diet-for-arthritis",
      "/diet/foods-to-avoid-with-arthritis",
      "/library/glucosamine",
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
      "vitamin d and falls",
    ],
  },
  {
    id: "symptoms",
    label: "Arthritis symptoms",
    pillarPath: "/guides/newly-diagnosed",
    pillarTitle: "Newly diagnosed guide",
    supportingPaths: [
      "/symptom-checker",
      "/conditions/osteoarthritis",
      "/guides/arthritis-pain-relief",
      "/exercises",
      "/blog/walking-with-arthritis-start-build-up-keep-going",
      "/blog/joint-protection-easier-everyday-tasks",
      "/blog/late-onset-ra-frailty-first-months-uk",
      "/conditions/ankylosing-spondylitis",
      "/faq",
      "/living-with-arthritis",
      "/conditions/arthritis",
      "/library",
      "/faq/when-to-see-a-rheumatologist",
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
      "diagnosed later in life",
      "late-onset rheumatoid",
    ],
  },
  {
    id: "treatments",
    label: "Arthritis treatments",
    pillarPath: "/guides/painkillers-and-nsaids",
    pillarTitle: "Painkillers & NSAIDs guide",
    supportingPaths: [
      "/conditions/gout/treatment",
      "/conditions/gout",
      "/guides/febuxostat-for-gout",
      "/blog/gout-winter-dehydration-frailty-uk",
      "/guides/steroids-for-arthritis",
      "/guides/knee-replacement-surgery",
      "/guides/azathioprine-for-arthritis",
      "/blog/flu-jab-arthritis-frailty-uk",
      "/blog/covid-winter-arthritis-frailty-uk",
      "/blog/chest-infection-arthritis-frailty-uk",
      "/blog/ra-steroids-frailty-infection-watch-uk",
      "/blog/steroid-emergency-card-frail-arthritis-uk",
      "/blog/bone-protection-steroids-arthritis-frailty-uk",
      "/blog/pharmacist-medication-review-frail-arthritis-uk",
      "/blog/painkillers-older-adults-arthritis-caution-uk",
      "/blog/topical-nsaids-frail-hand-knee-oa-uk",
      "/blog/methotrexate-older-frail-adults-uk",
      "/blog/ra-monitoring-older-frail-adults-uk",
      "/blog/blood-test-transport-arthritis-frailty-uk",
      "/blog/rheumatology-clinic-frail-older-adult-uk",
      "/blog/shingles-vaccine-arthritis-frailty-uk",
      "/blog/uti-confusion-arthritis-frailty-uk",
      "/blog/vaccines-on-dmards-and-biologics-uk-guide",
      "/guides/health-services",
      "/arthritis-waiting-list-help",
      "/supplements",
      "/conditions/rheumatoid-arthritis",
      "/conditions/ankylosing-spondylitis",
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
      "gout treatment",
      "gout",
      "uric acid",
      "dehydration",
      "allopurinol",
      "physiotherapy referral",
      "chest infection",
      "pneumonia",
      "prednisolone",
      "steroid card",
      "shingles vaccine",
      "urine infection",
      "bone protection",
      "dexa",
      "osteoporosis steroids",
      "steroid bones",
      "medication review",
      "structured medication review",
      "new medicine service",
      "painkillers older people",
      "painkillers in later life",
      "methotrexate blood tests",
      "methotrexate infection",
      "ra monitoring",
      "das28",
    ],
  },
  {
    id: "flare-ups",
    label: "Flare-ups",
    pillarPath: "/arthritis-flare-ups",
    pillarTitle: "Flare-up guide",
    supportingPaths: [
      "/guides/arthritis-pain-relief",
      "/blog/arthritis-flare-up-what-to-do",
      "/blog/energy-management-and-pacing-arthritis",
      "/blog/deconditioning-after-arthritis-flare-uk",
      "/blog/arthritis-fatigue-management-uk",
      "/blog/ra-fatigue-frailty-energy-envelope-uk",
      "/arthritis-mental-health",
      "/blog/arthritis-and-mental-health-uk",
      "/blog/depression-arthritis-when-to-seek-help",
      "/blog/how-to-sleep-with-arthritis-uk",
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
      "deconditioning",
      "rebuilding strength",
      "after a flare",
    ],
  },
  {
    id: "pip",
    label: "Benefits & PIP",
    pillarPath: "/guides/benefits-pip",
    pillarTitle: "Benefits & PIP guide",
    supportingPaths: [
      "/faq/arthritis-disability-benefits-uk",
      "/blog/pip-for-arthritis-uk",
      "/benefits-pip",
      "/blog/sick-pay-fit-notes-time-off-work-arthritis",
      "/blog/carers-allowance-help-if-you-care-for-someone",
      "/blog/carers-assessment-arthritis-frailty-uk",
      "/blog/attendance-allowance-arthritis-frailty-uk",
      "/blog/arthritis-and-work-uk",
      "/blog/access-to-work-scheme-arthritis-guide",
      "/library/access-to-work",
      "/resources/pip-evidence-diary",
      "/guides/disability-support",
      "/arthritis-waiting-list-help",
      "/guides/work-with-arthritis",
      "/guides/insurance-coverage",
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
      "carer's assessment",
      "carers assessment",
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

  // Library topic pages: do not inherit the /library hub → symptoms prefix match.
  // Prefer exact PATH_INDEX hits, then slug/trigger scoring.
  const libraryTopic = path.match(/^\/library\/([^/]+)$/);
  if (libraryTopic) {
    for (const row of PATH_INDEX) {
      if (path === row.path) return row.cluster;
    }
    const bySlug = getClusterForSlug(libraryTopic[1]);
    if (bySlug) return bySlug;
    return getClusterById("symptoms");
  }

  // Exact / supportingPaths matches first (incl. GSC champion blog URLs listed below).
  for (const row of PATH_INDEX) {
    if (path === row.path) return row.cluster;
  }

  // Resolve known child routes only after every exact match.
  for (const row of PATH_INDEX) {
    if (path.startsWith(`${row.path}/`)) return row.cluster;
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    return getClusterForSlug(slug);
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
