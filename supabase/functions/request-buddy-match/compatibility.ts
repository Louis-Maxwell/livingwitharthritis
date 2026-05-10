// Compatibility scoring for buddy matches. Pure, unit-testable.

export interface BuddyCandidate {
  id: string; // buddy_profile.id
  user_id: string;
  arthritis_type: string;
  location_region: string;
  mobility_level: "high" | "moderate" | "low";
  age_band: string;
  available: boolean;
  max_mentees: number;
}

export interface MenteeFacts {
  arthritis_type: string;
  location_region: string;
  mobility_level: "high" | "moderate" | "low";
  age_band: string;
}

const MOBILITY_ORDER = { high: 0, moderate: 1, low: 2 } as const;
const AGE_ORDER = ["18-29", "30-44", "45-59", "60-74", "75+"];

export interface CompatibilityBreakdown {
  arthritisTypeMatch: number;
  regionMatch: number;
  mobilitySimilarity: number;
  ageProximity: number;
}

export function scoreCandidate(mentor: BuddyCandidate, mentee: MenteeFacts): { score: number; breakdown: CompatibilityBreakdown } {
  const arthritisTypeMatch = mentor.arthritis_type.toLowerCase() === mentee.arthritis_type.toLowerCase() ? 40 : 0;
  const regionMatch = mentor.location_region.toLowerCase() === mentee.location_region.toLowerCase() ? 25 : 0;

  const mobDiff = Math.abs(MOBILITY_ORDER[mentor.mobility_level] - MOBILITY_ORDER[mentee.mobility_level]);
  const mobilitySimilarity = mobDiff === 0 ? 20 : mobDiff === 1 ? 10 : 0;

  const aIdx = AGE_ORDER.indexOf(mentor.age_band);
  const bIdx = AGE_ORDER.indexOf(mentee.age_band);
  const ageDiff = aIdx >= 0 && bIdx >= 0 ? Math.abs(aIdx - bIdx) : 4;
  const ageProximity = ageDiff === 0 ? 15 : ageDiff === 1 ? 10 : ageDiff === 2 ? 5 : 0;

  const score = arthritisTypeMatch + regionMatch + mobilitySimilarity + ageProximity;
  return {
    score,
    breakdown: { arthritisTypeMatch, regionMatch, mobilitySimilarity, ageProximity },
  };
}

export function pickBestMentor(
  mentors: BuddyCandidate[],
  mentee: MenteeFacts,
  excludedUserIds: Set<string>,
): { mentor: BuddyCandidate; score: number; breakdown: CompatibilityBreakdown } | null {
  let best: { mentor: BuddyCandidate; score: number; breakdown: CompatibilityBreakdown } | null = null;
  for (const m of mentors) {
    if (!m.available) continue;
    if (excludedUserIds.has(m.user_id)) continue;
    const { score, breakdown } = scoreCandidate(m, mentee);
    if (!best || score > best.score) best = { mentor: m, score, breakdown };
  }
  return best;
}
