/**
 * Per-user chatbot profile stored in localStorage.
 * Prepended to the system prompt via the /chat edge function to enable
 * personalised responses. All fields are optional.
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

export function loadChatProfile(): ChatProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* quota or private mode — ignore */
  }
}

export function clearChatProfile(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
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
