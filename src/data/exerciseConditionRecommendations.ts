// Joint × Condition recommendation matrix.
// Drives /exercises/:joint/for-:condition pages.
// Conditions match the slugs used in src/App.tsx /conditions/* routes.

export type JointSlug = "knee" | "hip" | "shoulder" | "hand" | "back" | "ankle";

export const jointSlugs: JointSlug[] = [
  "knee", "hip", "shoulder", "hand", "back", "ankle",
];

export const jointLabel: Record<JointSlug, string> = {
  knee: "Knee",
  hip: "Hip",
  shoulder: "Shoulder",
  hand: "Hand",
  back: "Back",
  ankle: "Ankle",
};

export interface ConditionEntry {
  slug: string;
  name: string;
  shortName: string;
  /** Subset of exercise keys from exerciseJointMatrix.ts (must match exactly). */
  safeExercises: Array<
    "swimming" | "yoga" | "cycling" | "walking" |
    "tai-chi" | "pilates" | "stretching" | "strength-training"
  >;
  whyMovementHelps: string;
  modifications: string;
  warning?: string;
  hasConditionPage: boolean; // /conditions/:slug exists
}

export const conditions: ConditionEntry[] = [
  {
    slug: "osteoarthritis",
    name: "Osteoarthritis",
    shortName: "OA",
    safeExercises: ["walking", "swimming", "cycling", "tai-chi", "strength-training"],
    whyMovementHelps:
      "Regular low-impact movement nourishes cartilage, strengthens the muscles that protect your joints, and reduces the morning stiffness that osteoarthritis is known for. UK physiotherapy guidance recommends 30 minutes of activity most days.",
    modifications:
      "Start with 5–10 minutes and build gradually. Warm up first — a warm shower or 5 minutes of gentle walking helps reduce stiffness before stronger movement.",
    hasConditionPage: true,
  },
  {
    slug: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    shortName: "RA",
    safeExercises: ["swimming", "tai-chi", "stretching", "yoga", "walking"],
    whyMovementHelps:
      "Gentle, regular movement helps RA by maintaining joint range of motion, reducing fatigue, and protecting against the deconditioning that often follows flares. Hydrotherapy and tai chi are especially well-evidenced.",
    modifications:
      "During an active flare, switch to range-of-motion and breathing work only. Resume strengthening once swelling settles. Pace activity across the day rather than long single sessions.",
    warning:
      "Never push through hot, red, or visibly swollen joints — that's a flare and needs rest, not exercise.",
    hasConditionPage: true,
  },
  {
    slug: "psoriatic-arthritis",
    name: "Psoriatic Arthritis",
    shortName: "PsA",
    safeExercises: ["swimming", "walking", "yoga", "stretching", "cycling"],
    whyMovementHelps:
      "Movement reduces inflammation, supports tendon and entheses health, and helps manage the fatigue that often accompanies PsA. Water-based exercise is particularly comfortable when skin is sensitive.",
    modifications:
      "Avoid prolonged grip work during finger flares. Use chlorine-friendly skin protection if you have active psoriasis plaques.",
    hasConditionPage: true,
  },
  {
    slug: "gout",
    name: "Gout",
    shortName: "Gout",
    safeExercises: ["swimming", "cycling", "stretching", "walking", "tai-chi"],
    whyMovementHelps:
      "Between attacks, regular non-weight-bearing exercise improves circulation, supports healthy weight, and reduces the frequency of gout flares.",
    modifications:
      "Do not exercise the affected joint during an acute attack — rest, elevate, and follow your urate-lowering treatment plan. Resume gentle movement only once redness and severe pain settle.",
    warning:
      "Acute gout flares require rest, not exercise. These pages are for inter-attack management only.",
    hasConditionPage: true,
  },
  {
    slug: "ankylosing-spondylitis",
    name: "Ankylosing Spondylitis",
    shortName: "AS",
    safeExercises: ["swimming", "yoga", "pilates", "stretching", "walking"],
    whyMovementHelps:
      "Daily mobility work is the single most important self-management step in AS — it preserves spinal range of motion, maintains posture, and reduces stiffness. NASS recommends a structured daily exercise routine.",
    modifications:
      "Prioritise spinal extension and rotation. Hydrotherapy is gold-standard. Avoid high-impact loading of the spine.",
    hasConditionPage: true,
  },
  {
    slug: "juvenile-arthritis",
    name: "Juvenile Arthritis",
    shortName: "JIA",
    safeExercises: ["swimming", "cycling", "yoga", "tai-chi", "stretching"],
    whyMovementHelps:
      "Children and young people with JIA benefit from low-impact, play-based movement that protects growing joints while building strength and confidence.",
    modifications:
      "Keep sessions short and varied. Always work with a paediatric physiotherapist or rheumatology team to tailor activity to the child's stage.",
    warning:
      "Exercise plans for under-18s must be supervised by a paediatric physiotherapist.",
    hasConditionPage: true,
  },
  {
    slug: "fibromyalgia",
    name: "Fibromyalgia",
    shortName: "FM",
    safeExercises: ["walking", "tai-chi", "stretching", "yoga", "swimming"],
    whyMovementHelps:
      "Graded, very-gentle exercise is one of the most strongly evidenced treatments for fibromyalgia, reducing widespread pain, improving sleep, and easing fatigue over 8–12 weeks of consistent practice.",
    modifications:
      "Start far lower than you think — 2–5 minutes — and add one minute per week. Avoid post-exertional crashes by sticking to the plan even on good days.",
    hasConditionPage: true,
  },
  {
    slug: "lupus",
    name: "Lupus",
    shortName: "SLE",
    safeExercises: ["walking", "swimming", "tai-chi", "stretching", "yoga"],
    whyMovementHelps:
      "Regular gentle exercise reduces lupus fatigue, supports cardiovascular health (an important consideration in SLE), and protects joint and muscle function.",
    modifications:
      "Train in cooler parts of the day if heat triggers your symptoms. Indoor and water-based activity is ideal during high-UV periods.",
    warning:
      "Avoid direct sun during outdoor exercise — UV light can trigger lupus flares.",
    hasConditionPage: true,
  },
  {
    slug: "knee-arthritis",
    name: "Knee Arthritis",
    shortName: "Knee OA",
    safeExercises: ["swimming", "cycling", "walking", "strength-training", "stretching"],
    whyMovementHelps:
      "Strengthening the quadriceps and glutes reduces knee pain more reliably than any non-surgical treatment. Combine with low-impact aerobic work for best results.",
    modifications:
      "Use a stationary bike with low resistance to start. Avoid deep knee flexion (squats below 90°) until quad strength improves.",
    hasConditionPage: true,
  },
  {
    slug: "hand-arthritis",
    name: "Hand Arthritis",
    shortName: "Hand OA",
    safeExercises: ["stretching", "yoga", "tai-chi", "pilates", "swimming"],
    whyMovementHelps:
      "Daily range-of-motion and gentle grip work preserves hand function, reduces stiffness, and protects the small joints from contracture.",
    modifications:
      "Warm hands in warm water before exercises. Use a soft therapy ball for gentle resistance rather than heavy weights.",
    hasConditionPage: true,
  },
  {
    slug: "shoulder-arthritis",
    name: "Shoulder Arthritis",
    shortName: "Shoulder OA",
    safeExercises: ["stretching", "yoga", "swimming", "tai-chi", "pilates"],
    whyMovementHelps:
      "Maintaining shoulder range of motion prevents the frozen-shoulder stiffness that often complicates shoulder arthritis. Pendulum and wall-walking exercises are foundational.",
    modifications:
      "Stop short of sharp pain. A heated wheat bag for 10 minutes before exercise improves tolerance.",
    hasConditionPage: true,
  },
  {
    slug: "polymyalgia-rheumatica",
    name: "Polymyalgia Rheumatica",
    shortName: "PMR",
    safeExercises: ["walking", "stretching", "tai-chi", "yoga", "swimming"],
    whyMovementHelps:
      "Gentle daily movement counteracts the muscle weakness that develops from PMR and from long-term steroid treatment, supporting bone health and reducing fall risk.",
    modifications:
      "Mornings are typically the worst — schedule exercise for later in the day. Resistance work helps offset steroid-related muscle loss but should be light.",
    hasConditionPage: true,
  },
  {
    slug: "reactive-arthritis",
    name: "Reactive Arthritis",
    shortName: "ReA",
    safeExercises: ["swimming", "cycling", "stretching", "tai-chi", "walking"],
    whyMovementHelps:
      "Gentle low-impact exercise during recovery helps restore joint mobility and prevents deconditioning while the underlying inflammation resolves.",
    modifications:
      "Most cases of reactive arthritis resolve within 6 months — pace yourself and build activity gradually as symptoms improve.",
    hasConditionPage: true,
  },
  {
    slug: "hip-arthritis",
    name: "Hip Arthritis",
    shortName: "Hip OA",
    safeExercises: ["swimming", "cycling", "walking", "strength-training", "stretching"],
    whyMovementHelps:
      "Glute and hip-abductor strengthening plus low-impact cardio reduce groin and outer-hip pain more reliably than rest alone.",
    modifications:
      "Avoid deep loaded squats early. Use a bike or pool if walking flares the groin. A pole in the opposite hand can offload the painful hip.",
    hasConditionPage: true,
  },
  {
    slug: "elbow-arthritis",
    name: "Elbow Arthritis",
    shortName: "Elbow OA",
    safeExercises: ["stretching", "strength-training", "yoga", "swimming", "cycling"],
    whyMovementHelps:
      "Gentle range-of-motion and forearm strengthening preserve elbow function for dressing, cooking and lifting without locking the joint.",
    modifications:
      "Skip heavy loaded curls during a flare. Warm the elbow before work and stop short of sharp catching pain.",
    hasConditionPage: true,
  },
];

export const conditionBySlug = new Map(conditions.map((c) => [c.slug, c]));
