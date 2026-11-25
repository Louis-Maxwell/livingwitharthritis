/**
 * Educational symptom-pattern data for the UK symptom checker.
 * Intentionally non-diagnostic: scores only rank related guides to explore.
 */

export type BodyAreaId =
  | "knees"
  | "hips"
  | "hands"
  | "wrists"
  | "feet"
  | "ankles"
  | "spine"
  | "shoulders"
  | "elbows"
  | "multiple";

export type DurationId = "days" | "weeks" | "months" | "years";
export type SeverityId = "mild" | "moderate" | "severe";
export type TimingId = "morning" | "after-activity" | "evening" | "constant" | "flares";
export type SwellingId = "hot-acute" | "hot-swollen" | "mild" | "bony" | "none";
export type SkinId = "psoriasis" | "nodules" | "none" | "unsure";

export type ConditionKey = "oa" | "ra" | "psa" | "gout" | "as" | "fm";

export interface RedFlagOption {
  id: string;
  label: string;
  /** Emergency = A&E / 999 as stated; urgent = NHS 111 / urgent GP. */
  level: "emergency" | "urgent";
  help: string;
}

export interface QuizAnswers {
  redFlags: string[];
  areas: BodyAreaId[];
  duration: DurationId | null;
  severity: SeverityId | null;
  timing: TimingId | null;
  swelling: SwellingId | null;
  skin: SkinId | null;
}

export interface GuideMatch {
  key: ConditionKey;
  name: string;
  path: string;
  summary: string;
  whyRelevant: string;
  /** Relative educational relevance 0–100 — not a diagnosis confidence. */
  relevance: number;
  exercisePath: string;
  jointHint?: string;
}

export interface ResourceLink {
  label: string;
  href: string;
  description: string;
}

export const STORAGE_KEY = "lwa-symptom-checker-v2";

export const BODY_AREAS: { id: BodyAreaId; label: string; hint: string }[] = [
  { id: "knees", label: "Knees", hint: "Walking, stairs, squatting" },
  { id: "hips", label: "Hips", hint: "Getting up, walking, sleeping on side" },
  { id: "hands", label: "Hands / fingers", hint: "Grip, rings, fine tasks" },
  { id: "wrists", label: "Wrists", hint: "Lifting, typing, twisting" },
  { id: "feet", label: "Feet / toes", hint: "First steps, shoes, big toe" },
  { id: "ankles", label: "Ankles", hint: "Walking on uneven ground" },
  { id: "spine", label: "Back / neck / spine", hint: "Stiffness after sitting" },
  { id: "shoulders", label: "Shoulders", hint: "Reaching overhead" },
  { id: "elbows", label: "Elbows", hint: "Lifting and carrying" },
  { id: "multiple", label: "Many joints / widespread", hint: "Several areas at once" },
];

export const DURATION_OPTIONS: { id: DurationId; label: string }[] = [
  { id: "days", label: "A few days" },
  { id: "weeks", label: "A few weeks (under 6 weeks)" },
  { id: "months", label: "Several months" },
  { id: "years", label: "A year or more" },
];

export const SEVERITY_OPTIONS: { id: SeverityId; label: string; description: string }[] = [
  { id: "mild", label: "Mild", description: "Noticeable but I can mostly carry on" },
  { id: "moderate", label: "Moderate", description: "Limits some daily activities" },
  { id: "severe", label: "Severe", description: "Strongly limits work, sleep or self-care" },
];

export const TIMING_OPTIONS: { id: TimingId; label: string }[] = [
  { id: "morning", label: "Worst in the morning (stiff on waking)" },
  { id: "after-activity", label: "Worse after activity or by evening" },
  { id: "evening", label: "Builds through the day" },
  { id: "constant", label: "Fairly constant" },
  { id: "flares", label: "Comes in sudden flares" },
];

export const SWELLING_OPTIONS: { id: SwellingId; label: string }[] = [
  { id: "hot-acute", label: "New hot swollen joint, or sudden severe joint pain" },
  { id: "hot-swollen", label: "Warm, soft swelling is common" },
  { id: "mild", label: "Mild or occasional swelling" },
  { id: "bony", label: "Hard/bony enlargement more than soft swelling" },
  { id: "none", label: "No noticeable swelling" },
];

export const SKIN_OPTIONS: { id: SkinId; label: string }[] = [
  { id: "psoriasis", label: "Psoriasis or scaly patches" },
  { id: "nodules", label: "Lumps or nodules under the skin" },
  { id: "none", label: "No skin changes" },
  { id: "unsure", label: "Not sure" },
];

/** UK-facing red-flag screen — educational triage pointers only. */
export const RED_FLAGS: RedFlagOption[] = [
  {
    id: "septic",
    label: "Sudden severe joint pain, or a hot swollen joint, with or without fever",
    level: "urgent",
    help: "Ask for an urgent GP appointment or contact NHS 111 now. Joint infection needs prompt assessment and fever may be absent. Call 999 if you have life-threatening symptoms.",
  },
  {
    id: "neuro-spine",
    label: "Back pain with new bladder/bowel or sexual-function changes, saddle numbness, or symptoms in both legs",
    level: "emergency",
    help: "Go to A&E immediately or call 999. This includes difficulty peeing, loss of bladder/bowel control, genital or anal numbness, changed sexual sensation/function, or pain, weakness, tingling or numbness in both legs. Do not drive yourself.",
  },
  {
    id: "chest",
    label: "Chest pain, severe breathlessness, or sudden collapse alongside joint symptoms",
    level: "emergency",
    help: "Call 999. Do not wait for online advice.",
  },
  {
    id: "weakness",
    label: "Sudden weakness, inability to move a limb, or facial drooping",
    level: "emergency",
    help: "Call 999 — treat as a medical emergency.",
  },
  {
    id: "trauma",
    label: "Very bad joint pain after a fall/injury, inability to walk or bear weight, a joint out of place, or numbness/tingling after injury",
    level: "emergency",
    help: "Go to A&E or call 999. Very bad joint pain after injury, a joint out of place or inability to walk or bear weight needs emergency assessment. Do not drive yourself.",
  },
  {
    id: "systemic",
    label: "Fever, night sweats or unexplained weight loss with joint pain",
    level: "urgent",
    help: "Contact NHS 111 or your GP the same day for advice.",
  },
  {
    id: "rapid-multi",
    label: "Several joints became swollen within days and I feel systemically unwell",
    level: "urgent",
    help: "Same-day GP or NHS 111 advice is appropriate.",
  },
];

export const SYMPTOM_FAQS: { q: string; a: string }[] = [
  {
    q: "Is this symptom checker a diagnosis?",
    a: "No. It is an educational UK tool that suggests arthritis-related guides whose typical patterns overlap with your answers. Only a GP or rheumatologist can diagnose arthritis using examination, blood tests and imaging when needed.",
  },
  {
    q: "When should I call 999 or NHS 111?",
    a: "Call 999 for life-threatening symptoms such as chest pain, severe breathlessness, collapse or stroke symptoms. Go to A&E or call 999 for new bladder or bowel changes with back pain, saddle numbness, or severe joint injury with inability to bear weight. A hot swollen joint or sudden severe joint pain needs an urgent GP appointment or NHS 111, even without fever.",
  },
  {
    q: "Should I still see a GP?",
    a: "See a GP if pain affects everyday activities or sleep, swelling persists or returns, pain has not improved after 2 weeks of home care, or morning stiffness lasts more than 30 minutes. Persistent soft swelling in small joints or more than one joint needs prompt assessment for possible inflammatory arthritis; do not wait for a blood test result before seeking help. Children with joint problems should see a GP.",
  },
  {
    q: "What will I get from the results?",
    a: "Links to condition hubs, exercise ideas, diet information and UK benefits (PIP) guidance that may be useful to read — plus tips for preparing a GP appointment. Nothing is stored on our servers.",
  },
  {
    q: "Is my information kept private?",
    a: "Answers stay in your browser sessionStorage so you can resume on this device. We do not send symptom answers to our servers. Clear your browser data if you share the device.",
  },
];

const CONDITION_META: Record<
  ConditionKey,
  { name: string; path: string; summary: string; exercisePath: string }
> = {
  oa: {
    name: "Osteoarthritis",
    path: "/conditions/osteoarthritis",
    summary:
      "Often linked with gradual joint wear, activity-related pain and shorter morning stiffness — commonly knees, hips, hands or spine.",
    exercisePath: "/exercises",
  },
  ra: {
    name: "Rheumatoid arthritis",
    path: "/conditions/rheumatoid-arthritis",
    summary:
      "An inflammatory pattern that can involve symmetrical small joints, longer morning stiffness and soft swelling — needs clinical assessment.",
    exercisePath: "/exercises",
  },
  psa: {
    name: "Psoriatic arthritis",
    path: "/conditions/psoriatic-arthritis",
    summary:
      "Joint inflammation that can accompany psoriasis, with variable joint patterns and sometimes swollen fingers or toes.",
    exercisePath: "/exercises",
  },
  gout: {
    name: "Gout",
    path: "/conditions/gout",
    summary:
      "Often presents as sudden, intense flares — classically the big toe or ankle — with heat and swelling.",
    exercisePath: "/exercises/ankle-arthritis-exercises",
  },
  as: {
    name: "Axial spondyloarthritis / ankylosing spondylitis",
    path: "/conditions/ankylosing-spondylitis",
    summary:
      "Inflammatory back pain patterns can include prolonged morning stiffness that eases with movement.",
    exercisePath: "/exercises",
  },
  fm: {
    name: "Fibromyalgia (widespread pain)",
    path: "/conditions/fibromyalgia",
    summary:
      "Widespread pain with fatigue and sleep disturbance can overlap with arthritis symptoms and deserves its own evidence-based reading.",
    exercisePath: "/exercises",
  },
};

const JOINT_PATHS: Partial<Record<BodyAreaId, string>> = {
  knees: "/conditions/knee-arthritis",
  hips: "/conditions/hip-arthritis",
  hands: "/conditions/hand-arthritis",
  shoulders: "/conditions/shoulder-arthritis",
  elbows: "/conditions/elbow-arthritis",
  feet: "/conditions/gout",
  ankles: "/exercises/ankle-arthritis-exercises",
  spine: "/conditions/ankylosing-spondylitis",
};

export const NEXT_STEP_RESOURCES: ResourceLink[] = [
  {
    label: "Osteoarthritis guide",
    href: "/conditions/osteoarthritis",
    description: "UK symptoms, NICE-aligned treatment and exercises — educational, not a diagnosis.",
  },
  {
    label: "Exercise hub",
    href: "/exercises",
    description: "Joint-friendly movement ideas for UK readers.",
  },
  {
    label: "PIP & disability benefits FAQ",
    href: "/faq/arthritis-disability-benefits-uk",
    description: "When arthritis may qualify for PIP and related UK benefits.",
  },
  {
    label: "Benefits & PIP hub",
    href: "/guides/benefits-pip",
    description: "UK Personal Independence Payment guidance.",
  },
  {
    label: "Hip osteoarthritis exercises",
    href: "/guides/hip-exercises-for-osteoarthritis",
    description: "A NICE-aligned home routine for hip OA.",
  },
  {
    label: "Newly diagnosed guide",
    href: "/guides/newly-diagnosed",
    description: "How to prepare for a GP or rheumatology visit.",
  },
];

export const SOFT_CTAS: ResourceLink[] = [
  {
    label: "Ask our chatbot",
    href: "/chat",
    description: "General arthritis information — not a clinician.",
  },
  {
    label: "Related guides",
    href: "/guides",
    description: "Practical UK living-with-arthritis articles.",
  },
  {
    label: "Support our work",
    href: "https://www.gofundme.com/f/help-fund-critical-arthritis-research",
    description: "Optional donation — never required to use tools.",
  },
];

export function emptyAnswers(): QuizAnswers {
  return {
    redFlags: [],
    areas: [],
    duration: null,
    severity: null,
    timing: null,
    swelling: null,
    skin: null,
  };
}

export function getTriggeredRedFlags(ids: string[]): RedFlagOption[] {
  return RED_FLAGS.filter((f) => ids.includes(f.id));
}

export function highestRedFlagLevel(
  flags: RedFlagOption[],
): "emergency" | "urgent" | null {
  if (flags.some((f) => f.level === "emergency")) return "emergency";
  if (flags.some((f) => f.level === "urgent")) return "urgent";
  return null;
}

/** Recheck later answers so a missed initial screen cannot bypass urgent advice. */
export function getAnswerRedFlags(answers: QuizAnswers): RedFlagOption[] {
  const ids = new Set(answers.redFlags);
  if (answers.swelling === "hot-acute") ids.add("septic");
  return getTriggeredRedFlags([...ids]);
}

export function needsPromptJointAssessment(answers: QuizAnswers): boolean {
  return (answers.swelling === "mild" || answers.swelling === "hot-swollen") &&
    (answers.duration === "weeks" || answers.duration === "months" || answers.duration === "years") &&
    (answers.areas.some(area => ["hands", "wrists", "feet", "multiple"].includes(area)) || answers.areas.length > 1);
}

/** Pure educational ranking — never claims a diagnosis. */
export function rankEducationalGuides(answers: QuizAnswers): GuideMatch[] {
  const scores: Record<ConditionKey, number> = {
    oa: 1,
    ra: 1,
    psa: 1,
    gout: 1,
    as: 1,
    fm: 1,
  };
  const reasons: Record<ConditionKey, string[]> = {
    oa: [],
    ra: [],
    psa: [],
    gout: [],
    as: [],
    fm: [],
  };

  const bump = (key: ConditionKey, n: number, reason: string) => {
    scores[key] += n;
    if (reason) reasons[key].push(reason);
  };

  const areas = answers.areas;
  if (areas.includes("knees") || areas.includes("hips")) {
    bump("oa", 3, "Weight-bearing joints often feature in osteoarthritis guides");
  }
  if (areas.includes("hands") || areas.includes("wrists")) {
    bump("ra", 3, "Small hand/wrist joints are commonly discussed in RA guides");
    bump("oa", 2, "Hand osteoarthritis is also common");
    bump("psa", 1, "Hands can be involved in psoriatic arthritis");
  }
  if (areas.includes("feet") || areas.includes("ankles")) {
    bump("gout", 3, "Feet and ankles — especially the big toe — appear in gout guides");
    bump("ra", 1, "Feet can be involved in inflammatory arthritis");
  }
  if (areas.includes("spine")) {
    bump("as", 4, "Spine/neck symptoms align with axial spondyloarthritis reading");
    bump("oa", 1, "Spinal osteoarthritis is also common");
  }
  if (areas.includes("multiple")) {
    bump("ra", 2, "Several joints at once can suggest an inflammatory pattern to discuss with a GP");
    bump("psa", 2, "Variable multi-joint patterns appear in PsA guides");
    bump("fm", 3, "Widespread symptoms are covered in fibromyalgia guides");
  }
  if (areas.includes("shoulders") || areas.includes("elbows")) {
    bump("oa", 1, "Larger joints can be affected by osteoarthritis");
    bump("ra", 1, "Shoulders/elbows can feature in inflammatory arthritis");
  }

  if (answers.timing === "morning") {
    bump("ra", 3, "Prolonged morning stiffness is often discussed in inflammatory arthritis");
    bump("psa", 2, "Morning stiffness can feature in PsA");
    bump("as", 2, "Inflammatory back pain guides emphasise morning stiffness");
    bump("oa", 1, "OA stiffness is usually shorter");
  }
  if (answers.timing === "after-activity" || answers.timing === "evening") {
    bump("oa", 3, "Activity-related pain is a classic osteoarthritis pattern in education materials");
  }
  if (answers.timing === "flares") {
    bump("gout", 3, "Sudden flares are typical in gout education");
    bump("psa", 1, "PsA can flare");
    bump("ra", 1, "RA can flare");
  }
  if (answers.timing === "constant") {
    bump("fm", 2, "Persistent widespread discomfort is covered in fibromyalgia resources");
    bump("ra", 1, "Persistent inflammatory symptoms warrant clinical review");
  }

  if (answers.swelling === "hot-swollen") {
    bump("ra", 3, "Warm soft swelling is emphasised in inflammatory arthritis guides");
    bump("gout", 3, "Hot swollen joints feature strongly in gout guides");
    bump("psa", 2, "PsA guides describe inflammatory swelling");
  }
  if (answers.swelling === "bony") {
    bump("oa", 3, "Bony enlargement is often described in osteoarthritis guides");
  }
  if (answers.swelling === "mild") {
    bump("oa", 1, "Mild swelling can occur in several arthritis types");
    bump("ra", 1, "Mild swelling still deserves clinical discussion if persistent");
  }
  if (answers.swelling === "none") {
    bump("oa", 1, "Not all osteoarthritis involves obvious swelling");
    bump("fm", 2, "Fibromyalgia guides describe pain without joint swelling");
  }

  if (answers.skin === "psoriasis") {
    bump("psa", 5, "Psoriasis plus joint symptoms is a reason to read PsA guides and see a GP");
  }
  if (answers.skin === "nodules") {
    bump("ra", 2, "Nodules are sometimes discussed in RA education");
    bump("gout", 1, "Tophi-like lumps can appear in longstanding gout");
  }

  if (answers.duration === "years") {
    bump("oa", 2, "Longer histories often appear in osteoarthritis stories");
  }
  if (answers.duration === "weeks" || answers.duration === "days") {
    bump("gout", 1, "Short intense episodes appear in gout education");
    bump("ra", 1, "New inflammatory symptoms should be assessed promptly");
  }
  if (answers.severity === "severe") {
    bump("gout", 1, "Severe pain flares are common in gout descriptions");
    bump("ra", 1, "Severe inflammatory symptoms need timely clinical care");
  }

  const max = Math.max(...Object.values(scores), 1);

  return (Object.keys(CONDITION_META) as ConditionKey[])
    .map((key) => {
      const meta = CONDITION_META[key];
      const relevance = Math.round((scores[key] / max) * 100);
      const why =
        reasons[key][0] ??
        "This guide may still help you prepare questions for your clinician.";
      const primaryArea = areas.find((a) => a !== "multiple");
      const jointHint = primaryArea ? JOINT_PATHS[primaryArea] : undefined;
      return {
        key,
        name: meta.name,
        path: meta.path,
        summary: meta.summary,
        whyRelevant: why,
        relevance,
        exercisePath: meta.exercisePath,
        jointHint,
      };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 4);
}

export type QuizStepId =
  | "intro"
  | "redflags"
  | "areas"
  | "duration"
  | "severity"
  | "timing"
  | "swelling"
  | "skin"
  | "urgent"
  | "results";

export const FLOW_STEPS: QuizStepId[] = [
  "intro",
  "redflags",
  "areas",
  "duration",
  "severity",
  "timing",
  "swelling",
  "skin",
  "results",
];

/** Progress among the educational flow (excludes urgent interrupt). */
export function progressPercent(step: QuizStepId): number {
  if (step === "urgent") return 100;
  if (step === "results") return 100;
  const idx = FLOW_STEPS.indexOf(step);
  if (idx < 0) return 0;
  return Math.round((idx / (FLOW_STEPS.length - 1)) * 100);
}

export function stepLabel(step: QuizStepId): string {
  const labels: Record<QuizStepId, string> = {
    intro: "Before you start",
    redflags: "Urgent symptom screen",
    areas: "Body areas",
    duration: "How long",
    severity: "How severe",
    timing: "When it is worst",
    swelling: "Swelling",
    skin: "Skin changes",
    urgent: "Seek urgent help",
    results: "Guides to explore",
  };
  return labels[step];
}
