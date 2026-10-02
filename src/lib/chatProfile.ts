/**
 * Optional chatbot profile (condition, age band, joints). Health details,
 * so they live in sessionStorage for this tab only and are never written
 * to localStorage. A copy left by older builds is deleted on read.
 * All fields are optional.
 */

const STORAGE_KEY = "arthritis_chat_profile_v1";

export interface ChatProfile {
  arthritisType?: string;
  ageRange?: string;
  affectedJoints?: string[];
  severity?: string;
}

export const ARTHRITIS_TYPES = [
  "Not sure",
  "Osteoarthritis",
  "Rheumatoid arthritis",
  "Psoriatic arthritis",
  "Gout",
  "Ankylosing spondylitis",
  "Fibromyalgia",
  "Other",
] as const;

export const AGE_RANGES = [
  "Under 30",
  "30–44",
  "45–59",
  "60–74",
  "75+",
] as const;

export const JOINTS = [
  "Hands",
  "Wrists",
  "Elbows",
  "Shoulders",
  "Neck",
  "Back",
  "Hips",
  "Knees",
  "Ankles",
  "Feet",
] as const;

export const SEVERITY_LEVELS = [
  "Mild",
  "Moderate",
  "Severe",
] as const;

function dropLegacyLocalCopy(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode */
  }
}

export function loadChatProfile(): ChatProfile {
  if (typeof window === "undefined") return {};
  dropLegacyLocalCopy();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return {
      arthritisType: typeof parsed.arthritisType === "string" ? parsed.arthritisType : undefined,
      ageRange: typeof parsed.ageRange === "string" ? parsed.ageRange : undefined,
      affectedJoints: Array.isArray(parsed.affectedJoints)
        ? parsed.affectedJoints.filter((j: unknown): j is string => typeof j === "string").slice(0, 10)
        : undefined,
      severity: typeof parsed.severity === "string" ? parsed.severity : undefined,
    };
  } catch {
    return {};
  }
}

export function saveChatProfile(profile: ChatProfile): void {
  if (typeof window === "undefined") return;
  try {
    dropLegacyLocalCopy();
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* quota or private mode — ignore */
  }
}

export function clearChatProfile(): void {
  if (typeof window === "undefined") return;
  try {
    dropLegacyLocalCopy();
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function hasAnyProfileFields(profile: ChatProfile): boolean {
  return Boolean(
    profile.arthritisType ||
      profile.ageRange ||
      profile.severity ||
      (profile.affectedJoints && profile.affectedJoints.length),
  );
}

/** Short non-PHI summary for the chat API (not stored server-side). */
export function formatProfileSummary(profile: ChatProfile): string | undefined {
  if (!hasAnyProfileFields(profile)) return undefined;
  const parts: string[] = [];
  if (profile.arthritisType) parts.push(`Condition: ${profile.arthritisType}`);
  if (profile.affectedJoints?.length) parts.push(`Joints: ${profile.affectedJoints.join(", ")}`);
  if (profile.severity) parts.push(`Severity: ${profile.severity}`);
  if (profile.ageRange) parts.push(`Age range: ${profile.ageRange}`);
  return parts.join("; ");
}

