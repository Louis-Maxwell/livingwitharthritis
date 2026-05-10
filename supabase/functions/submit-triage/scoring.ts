// Pure scoring + recommendation logic for the arthritis self-assessment.
// Kept side-effect-free so it can be unit tested without Deno imports.

export interface TriageInput {
  arthritisType: string;
  painLevel: number; // 0-10
  affectedAreas: string[];
  limitations: string[];
  goals: string[];
  mobilityLevel: "high" | "moderate" | "low";
}

export interface Recommendation {
  physioSessions: string;
  focusAreas: string[];
  exercises: { label: string; href: string }[];
  resources: { label: string; href: string }[];
  summary: string;
}

export interface TriageResult {
  triageScore: number; // 0-100, higher = greater need
  recommendations: Recommendation;
}

const MOBILITY_WEIGHT: Record<TriageInput["mobilityLevel"], number> = {
  high: 0,
  moderate: 5,
  low: 10,
};

export function scoreTriage(input: TriageInput): TriageResult {
  // Pain 40%, affected areas 20%, limitations 30%, mobility 10%
  const painPart = (Math.max(0, Math.min(10, input.painLevel)) / 10) * 40;
  const areasPart = Math.min(input.affectedAreas.length, 5) / 5 * 20;
  const limitationsPart = Math.min(input.limitations.length, 6) / 6 * 30;
  const mobilityPart = MOBILITY_WEIGHT[input.mobilityLevel] ?? 5;

  const triageScore = Math.round(painPart + areasPart + limitationsPart + mobilityPart);

  const recommendations = buildRecommendations(input, triageScore);
  return { triageScore, recommendations };
}

function buildRecommendations(input: TriageInput, score: number): Recommendation {
  const physioSessions =
    score >= 70 ? "Weekly for 6–8 weeks, then review"
      : score >= 40 ? "Fortnightly for 8 weeks"
        : "Monthly check-in plus a self-managed programme";

  const focusAreas: string[] = [];
  if (input.painLevel >= 7) focusAreas.push("Pain management techniques");
  if (input.limitations.includes("walking")) focusAreas.push("Lower-limb strength and gait");
  if (input.limitations.includes("sleep")) focusAreas.push("Sleep hygiene and night-time pain");
  if (input.limitations.includes("work")) focusAreas.push("Workplace ergonomics and pacing");
  if (input.affectedAreas.includes("knees") || input.affectedAreas.includes("hips")) {
    focusAreas.push("Weight-bearing joint protection");
  }
  if (input.affectedAreas.includes("hands")) focusAreas.push("Hand mobility and grip strength");
  if (focusAreas.length === 0) focusAreas.push("General mobility and conditioning");

  const exercises: Recommendation["exercises"] = [];
  if (input.affectedAreas.includes("knees")) exercises.push({ label: "Knee strengthening exercises", href: "/exercises/knee" });
  if (input.affectedAreas.includes("hips")) exercises.push({ label: "Hip mobility routine", href: "/exercises/hip" });
  if (input.affectedAreas.includes("hands")) exercises.push({ label: "Hand and wrist exercises", href: "/exercises/hand" });
  if (input.affectedAreas.includes("spine") || input.affectedAreas.includes("back")) {
    exercises.push({ label: "Back and core programme", href: "/exercises/spine" });
  }
  if (input.mobilityLevel === "low") exercises.push({ label: "Tai Chi for balance", href: "/exercises/tai-chi-for-balance" });
  if (exercises.length === 0) exercises.push({ label: "Full Exercise Hub", href: "/exercises" });

  const resources: Recommendation["resources"] = [
    { label: "Anti-inflammatory diet guide", href: "/diet" },
    { label: "Self-help toolkit", href: "/self-help" },
  ];
  const slug = arthritisSlug(input.arthritisType);
  if (slug) resources.unshift({ label: `About ${input.arthritisType}`, href: `/conditions/${slug}` });
  if (input.painLevel >= 7) resources.push({ label: "Managing flare-ups", href: "/arthritis-flare-ups" });
  if (input.goals.includes("benefits")) resources.push({ label: "Benefits & PIP guide", href: "/guides/benefits-pip" });

  const summary = score >= 70
    ? "Your assessment suggests a high level of need. We strongly recommend a structured physiotherapy plan alongside the resources below."
    : score >= 40
      ? "Your assessment suggests a moderate level of need. A regular routine combining the exercises and resources below should make a real difference."
      : "Your symptoms appear well-controlled. Keep up the routine and use the resources below to maintain progress.";

  return { physioSessions, focusAreas, exercises, resources, summary };
}

function arthritisSlug(type: string): string | null {
  const map: Record<string, string> = {
    osteoarthritis: "osteoarthritis",
    "rheumatoid arthritis": "rheumatoid-arthritis",
    "psoriatic arthritis": "psoriatic-arthritis",
    gout: "gout",
    "ankylosing spondylitis": "ankylosing-spondylitis",
    "juvenile arthritis": "juvenile-arthritis",
    fibromyalgia: "fibromyalgia",
    lupus: "lupus",
  };
  return map[type.trim().toLowerCase()] ?? null;
}
