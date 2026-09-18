/**
 * 1,000 UK-focused arthritis keywords — split into two clearly labelled groups:
 *   • 500 "organic" (informational, long-tail, question-based)
 *   • 500 "paid" (commercial / transactional intent for PPC campaigns)
 *
 * This file is the single source of truth for the /admin/keyword-strategy
 * dashboard and for editorial teams building meta titles / descriptions.
 * It's expanded programmatically from seed matrices so the taxonomy stays
 * consistent — but the exported array is a plain, immutable list of 1000
 * entries.
 *
 * Semrush UK volumes / ranking metrics (real numbers only) live in
 * `keywords-semrush-organic.json` + `keywords-semrush-organic.ts`.
 * Label that file's source as Semrush — never Ahrefs. Do not invent volumes.
 */

export type KeywordIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational";

export type KeywordCategory =
  | "condition"
  | "symptom"
  | "treatment"
  | "medication"
  | "exercise"
  | "tai-chi"
  | "diet"
  | "supplement"
  | "physio"
  | "surgery"
  | "donation"
  | "support"
  | "product"
  | "local-service";

export type KeywordGroup = "organic" | "paid";

export interface KeywordEntry {
  keyword: string;
  intent: KeywordIntent;
  category: KeywordCategory;
  /** Best-fit landing page on the site. */
  targetPage: string;
  group: KeywordGroup;
  /**
   * Optional Semrush UK monthly search volume (Nq).
   * Only set when verified from Semrush — never invent.
   */
  volume?: number;
  /** Optional Semrush organic position when this domain ranks. */
  position?: number;
  /** Provenance when volume/position come from Semrush. */
  metricsSource?: "Semrush";
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Seed data
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CONDITIONS = [
  "osteoarthritis",
  "rheumatoid arthritis",
  "psoriatic arthritis",
  "ankylosing spondylitis",
  "gout",
  "juvenile arthritis",
  "lupus arthritis",
  "fibromyalgia",
  "reactive arthritis",
  "polymyalgia rheumatica",
] as const;

const JOINTS = [
  "knee",
  "hip",
  "hand",
  "wrist",
  "shoulder",
  "neck",
  "spine",
  "ankle",
  "elbow",
  "foot",
] as const;

const CITIES = [
  "london",
  "manchester",
  "birmingham",
  "glasgow",
  "edinburgh",
  "leeds",
  "liverpool",
  "bristol",
  "sheffield",
  "cardiff",
] as const;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Helper
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const conditionSlug = (c: string) =>
  c.replace(/ /g, "-").replace("arthritis", "arthritis");

const pushed = new Set<string>();
const out: KeywordEntry[] = [];

const add = (entry: KeywordEntry) => {
  const key = entry.keyword.toLowerCase();
  if (pushed.has(key)) return;
  pushed.add(key);
  out.push(entry);
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ORGANIC (500) — informational, long-tail, question-based
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ORG_TEMPLATES: Array<
  (c: string) => Omit<KeywordEntry, "group"> | null
> = [
  (c) => ({ keyword: `what is ${c}`, intent: "informational", category: "condition", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} symptoms uk`, intent: "informational", category: "symptom", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} causes`, intent: "informational", category: "condition", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} diagnosis nhs`, intent: "informational", category: "condition", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} treatment options`, intent: "informational", category: "treatment", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} vs osteoarthritis`, intent: "informational", category: "condition", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `early signs of ${c}`, intent: "informational", category: "symptom", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `is ${c} hereditary`, intent: "informational", category: "condition", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `living with ${c}`, intent: "informational", category: "support", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} flare up management`, intent: "informational", category: "treatment", targetPage: `/conditions/${conditionSlug(c)}` }),
  (c) => ({ keyword: `${c} diet plan uk`, intent: "informational", category: "diet", targetPage: `/diet-hub` }),
  (c) => ({ keyword: `foods to avoid with ${c}`, intent: "informational", category: "diet", targetPage: `/diet-hub` }),
  (c) => ({ keyword: `${c} anti inflammatory diet`, intent: "informational", category: "diet", targetPage: `/diet-hub` }),
  (c) => ({ keyword: `best supplements for ${c}`, intent: "informational", category: "supplement", targetPage: `/diet-hub` }),
  (c) => ({ keyword: `does turmeric help ${c}`, intent: "informational", category: "supplement", targetPage: `/diet-hub` }),
  (c) => ({ keyword: `mediterranean diet for ${c}`, intent: "informational", category: "diet", targetPage: `/diet-hub` }),
];

for (const c of CONDITIONS) {
  for (const tpl of ORG_TEMPLATES) {
    const partial = tpl(c);
    if (partial) add({ ...partial, group: "organic" });
  }
}

const JOINT_ORG_TEMPLATES: Array<(j: string) => Omit<KeywordEntry, "group">> = [
  (j) => ({ keyword: `${j} arthritis exercises`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `best exercises for ${j} arthritis uk`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} pain relief without surgery`, intent: "informational", category: "treatment", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `how to reduce ${j} arthritis pain`, intent: "informational", category: "treatment", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} arthritis stretches`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} arthritis symptoms`, intent: "informational", category: "symptom", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} osteoarthritis nhs`, intent: "informational", category: "condition", targetPage: `/conditions/osteoarthritis` }),
  (j) => ({ keyword: `strengthen ${j} joints`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} arthritis morning stiffness`, intent: "informational", category: "symptom", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `physio exercises for ${j} pain`, intent: "informational", category: "physio", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `tai chi for ${j} arthritis`, intent: "informational", category: "tai-chi", targetPage: `/tai-chi` }),
  (j) => ({ keyword: `yoga for ${j} arthritis uk`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `swimming for ${j} arthritis`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `walking with ${j} arthritis`, intent: "informational", category: "exercise", targetPage: `/exercise-hub` }),
  (j) => ({ keyword: `${j} replacement recovery`, intent: "informational", category: "surgery", targetPage: `/library` }),
];

for (const j of JOINTS) {
  for (const tpl of JOINT_ORG_TEMPLATES) {
    add({ ...tpl(j), group: "organic" });
  }
}

const ORG_QUESTIONS = [
  { k: "how to sleep with arthritis pain", cat: "support" as const, tp: "/library" },
  { k: "how to reduce inflammation naturally uk", cat: "diet" as const, tp: "/diet-hub" },
  { k: "best breakfast for arthritis", cat: "diet" as const, tp: "/diet-hub" },
  { k: "arthritis and cold weather uk", cat: "symptom" as const, tp: "/library" },
  { k: "can weight loss reduce arthritis pain", cat: "treatment" as const, tp: "/diet-hub" },
  { k: "does walking help arthritis in knees", cat: "exercise" as const, tp: "/exercise-hub" },
  { k: "is cycling good for knee arthritis", cat: "exercise" as const, tp: "/exercise-hub" },
  { k: "arthritis friendly recipes uk", cat: "diet" as const, tp: "/diet-hub" },
  { k: "how much curcumin per day for arthritis", cat: "supplement" as const, tp: "/diet-hub" },
  { k: "glucosamine vs collagen for joints", cat: "supplement" as const, tp: "/diet-hub" },
  { k: "omega 3 dose for arthritis", cat: "supplement" as const, tp: "/diet-hub" },
  { k: "vitamin d and rheumatoid arthritis", cat: "supplement" as const, tp: "/diet-hub" },
  { k: "gluten free diet and rheumatoid arthritis", cat: "diet" as const, tp: "/diet-hub" },
  { k: "arthritis fatigue causes", cat: "symptom" as const, tp: "/library" },
  { k: "hand arthritis grip strength exercises", cat: "exercise" as const, tp: "/exercise-hub" },
  { k: "tai chi 24 form for beginners", cat: "tai-chi" as const, tp: "/tai-chi" },
  { k: "sun style tai chi for arthritis", cat: "tai-chi" as const, tp: "/tai-chi" },
  { k: "seated tai chi routines", cat: "tai-chi" as const, tp: "/tai-chi" },
  { k: "tai chi vs yoga for arthritis", cat: "tai-chi" as const, tp: "/tai-chi" },
  { k: "chair yoga for elderly with arthritis", cat: "exercise" as const, tp: "/exercise-hub" },
  { k: "hydrotherapy for rheumatoid arthritis uk", cat: "physio" as const, tp: "/exercise-hub" },
  { k: "gp referral for rheumatology uk", cat: "treatment" as const, tp: "/library" },
  { k: "how long does an arthritis flare last", cat: "symptom" as const, tp: "/library" },
  { k: "arthritis and mental health uk", cat: "support" as const, tp: "/library" },
  { k: "pip for arthritis how to claim", cat: "support" as const, tp: "/library" },
  { k: "blue badge arthritis uk", cat: "support" as const, tp: "/library" },
  { k: "arthritis at work reasonable adjustments", cat: "support" as const, tp: "/library" },
  { k: "arthritis and driving uk", cat: "support" as const, tp: "/library" },
  { k: "arthritis in children signs", cat: "condition" as const, tp: "/conditions/juvenile-arthritis" },
  { k: "arthritis in young adults", cat: "condition" as const, tp: "/library" },
  { k: "gout attack home remedy uk", cat: "treatment" as const, tp: "/conditions/gout" },
  { k: "gout diet foods to avoid", cat: "diet" as const, tp: "/conditions/gout" },
  { k: "psoriatic arthritis skin symptoms", cat: "symptom" as const, tp: "/conditions/psoriatic-arthritis" },
  { k: "ankylosing spondylitis stretches", cat: "exercise" as const, tp: "/conditions/ankylosing-spondylitis" },
  { k: "lupus fatigue management", cat: "symptom" as const, tp: "/conditions/lupus-arthritis" },
  { k: "fibromyalgia flare triggers", cat: "symptom" as const, tp: "/conditions/fibromyalgia" },
  { k: "polymyalgia rheumatica steroid taper", cat: "treatment" as const, tp: "/conditions/polymyalgia-rheumatica" },
  { k: "biologics for rheumatoid arthritis nhs", cat: "medication" as const, tp: "/conditions/rheumatoid-arthritis" },
  { k: "methotrexate side effects arthritis", cat: "medication" as const, tp: "/conditions/rheumatoid-arthritis" },
  { k: "hydroxychloroquine and arthritis", cat: "medication" as const, tp: "/conditions/rheumatoid-arthritis" },
  { k: "steroid injection knee nhs", cat: "treatment" as const, tp: "/library" },
  { k: "cortisone injection how long does it last", cat: "treatment" as const, tp: "/library" },
  { k: "knee replacement recovery timeline uk", cat: "surgery" as const, tp: "/library" },
  { k: "hip replacement waiting list nhs", cat: "surgery" as const, tp: "/library" },
  { k: "arthritis walking aids uk", cat: "product" as const, tp: "/library" },
  { k: "best trainers for knee arthritis uk", cat: "product" as const, tp: "/library" },
  { k: "compression gloves for hand arthritis", cat: "product" as const, tp: "/library" },
  { k: "electric jar opener arthritis", cat: "product" as const, tp: "/library" },
  { k: "raised toilet seat for arthritis uk", cat: "product" as const, tp: "/library" },
  { k: "arthritis support groups uk", cat: "support" as const, tp: "/community" },
  { k: "arthritis buddy scheme uk", cat: "support" as const, tp: "/community" },
  { k: "living with arthritis podcast uk", cat: "support" as const, tp: "/library" },
];

for (const q of ORG_QUESTIONS) {
  add({ keyword: q.k, intent: "informational", category: q.cat, targetPage: q.tp, group: "organic" });
}

// Long-tail expansion until we hit 500 organic
const ORG_MODIFIERS = [
  "in the uk",
  "UK healthcare system",
  "at home",
  "for beginners",
  "for over 60s",
  "for over 50s",
  "for seniors",
  "without medication",
  "explained",
  "guide",
  "checklist",
  "myths",
  "facts",
  "research 2026",
];

const seeds = [
  ...CONDITIONS.map((c) => `${c} tips`),
  ...JOINTS.map((j) => `${j} arthritis`),
  "morning stiffness",
  "joint swelling",
  "chronic pain",
  "inflammation reduction",
  "anti inflammatory foods",
  "arthritis fatigue",
  "arthritis pain relief",
  "arthritis exercise plan",
  "arthritis stretching routine",
  "tai chi routine",
];

for (const s of seeds) {
  for (const m of ORG_MODIFIERS) {
    if (out.filter((k) => k.group === "organic").length >= 500) break;
    add({
      keyword: `${s} ${m}`.replace(/\s+/g, " ").trim(),
      intent: "informational",
      category: s.includes("tai chi")
        ? "tai-chi"
        : s.includes("diet") || s.includes("food") || s.includes("inflammation")
          ? "diet"
          : s.includes("exercise") || s.includes("stretch")
            ? "exercise"
            : "condition",
      targetPage: s.includes("tai chi")
        ? "/tai-chi"
        : s.includes("diet") || s.includes("food") || s.includes("inflammation")
          ? "/diet-hub"
          : s.includes("exercise") || s.includes("stretch")
            ? "/exercise-hub"
            : "/library",
      group: "organic",
    });
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PAID (500) — commercial / transactional intent
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PAID_SERVICE_TEMPLATES: Array<(city: string) => Omit<KeywordEntry, "group">> = [
  (city) => ({ keyword: `arthritis physiotherapy ${city}`, intent: "commercial", category: "physio", targetPage: `/exercise-hub` }),
  (city) => ({ keyword: `rheumatology clinic ${city}`, intent: "commercial", category: "physio", targetPage: `/library` }),
  (city) => ({ keyword: `private arthritis specialist ${city}`, intent: "commercial", category: "physio", targetPage: `/library` }),
  (city) => ({ keyword: `arthritis support charity ${city}`, intent: "navigational", category: "support", targetPage: `/community` }),
  (city) => ({ keyword: `knee replacement surgeon ${city}`, intent: "commercial", category: "surgery", targetPage: `/library` }),
  (city) => ({ keyword: `hip replacement clinic ${city}`, intent: "commercial", category: "surgery", targetPage: `/library` }),
  (city) => ({ keyword: `arthritis physio near ${city}`, intent: "commercial", category: "physio", targetPage: `/exercise-hub` }),
  (city) => ({ keyword: `tai chi classes ${city}`, intent: "commercial", category: "tai-chi", targetPage: `/tai-chi` }),
  (city) => ({ keyword: `hydrotherapy pool ${city}`, intent: "commercial", category: "physio", targetPage: `/exercise-hub` }),
  (city) => ({ keyword: `arthritis nutritionist ${city}`, intent: "commercial", category: "diet", targetPage: `/diet-hub` }),
];

for (const city of CITIES) {
  for (const tpl of PAID_SERVICE_TEMPLATES) {
    add({ ...tpl(city), group: "paid" });
  }
}

const PAID_NEAR_ME: Array<Omit<KeywordEntry, "group">> = [
  { keyword: "arthritis physiotherapy near me", intent: "commercial", category: "physio", targetPage: "/exercise-hub" },
  { keyword: "arthritis specialist near me", intent: "commercial", category: "physio", targetPage: "/library" },
  { keyword: "rheumatologist near me", intent: "commercial", category: "physio", targetPage: "/library" },
  { keyword: "private rheumatologist uk", intent: "commercial", category: "physio", targetPage: "/library" },
  { keyword: "arthritis clinic near me", intent: "commercial", category: "physio", targetPage: "/library" },
  { keyword: "tai chi teacher near me", intent: "commercial", category: "tai-chi", targetPage: "/tai-chi" },
  { keyword: "book arthritis physio", intent: "transactional", category: "physio", targetPage: "/appointments" },
  { keyword: "book rheumatology appointment", intent: "transactional", category: "physio", targetPage: "/appointments" },
  { keyword: "online arthritis consultation uk", intent: "transactional", category: "physio", targetPage: "/appointments" },
  { keyword: "arthritis telehealth uk", intent: "transactional", category: "physio", targetPage: "/appointments" },
];
for (const e of PAID_NEAR_ME) add({ ...e, group: "paid" });

const PAID_DONATION: Array<Omit<KeywordEntry, "group">> = [
  { keyword: "arthritis charity donation uk", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "donate to arthritis charity", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "arthritis support donation uk", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "gift aid arthritis donation", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "monthly donation arthritis charity", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "zakat arthritis charity uk", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "fundraise for arthritis charity", intent: "transactional", category: "donation", targetPage: "/fundraise" },
  { keyword: "arthritis charity legacy giving", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "arthritis charity in memory donation", intent: "transactional", category: "donation", targetPage: "/donate" },
  { keyword: "donate arthritis research uk", intent: "transactional", category: "donation", targetPage: "/donate" },
];
for (const e of PAID_DONATION) add({ ...e, group: "paid" });

const PAID_PRODUCTS: Array<Omit<KeywordEntry, "group">> = [
  { keyword: "buy compression gloves arthritis uk", intent: "transactional", category: "product", targetPage: "/shop" },
  { keyword: "arthritis knee support brace uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "best knee brace osteoarthritis uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "buy tens machine arthritis pain", intent: "transactional", category: "product", targetPage: "/shop" },
  { keyword: "arthritis walking stick uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "electric heat pad joint pain", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "paraffin wax bath arthritis uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "orthopaedic mattress arthritis uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "ergonomic chair for back pain uk", intent: "commercial", category: "product", targetPage: "/shop" },
  { keyword: "arthritis kitchen aids uk", intent: "commercial", category: "product", targetPage: "/shop" },
];
for (const e of PAID_PRODUCTS) add({ ...e, group: "paid" });

// Bulk paid expansion via city Ã— modifier until we hit 500 paid
const PAID_MODIFIERS = [
  "cost",
  "price",
  "book online",
  "same day",
  "private",
  "reviews",
  "top rated",
  "best rated",
  "walk in",
  "consultation",
  "specialist",
  "clinic",
  "appointment",
  "free",
  "affordable",
];
const PAID_SEEDS = [
  "arthritis physio",
  "knee osteoarthritis treatment",
  "hip arthritis treatment",
  "hand arthritis treatment",
  "rheumatology consultation",
  "arthritis pain clinic",
  "tai chi class",
  "hydrotherapy session",
  "arthritis nutritionist",
  "compression sleeve",
  "orthopaedic insoles",
  "physio massage",
];

for (const s of PAID_SEEDS) {
  for (const m of PAID_MODIFIERS) {
    for (const city of CITIES) {
      if (out.filter((k) => k.group === "paid").length >= 500) break;
      add({
        keyword: `${s} ${m} ${city}`.replace(/\s+/g, " ").trim(),
        intent: m === "book online" || m === "appointment" ? "transactional" : "commercial",
        category: s.includes("tai chi")
          ? "tai-chi"
          : s.includes("physio") || s.includes("hydrotherapy") || s.includes("massage")
            ? "physio"
            : s.includes("nutrition")
              ? "diet"
              : s.includes("sleeve") || s.includes("insole")
                ? "product"
                : "local-service",
        targetPage: s.includes("tai chi")
          ? "/tai-chi"
          : s.includes("nutrition")
            ? "/diet-hub"
            : s.includes("sleeve") || s.includes("insole")
              ? "/shop"
              : "/appointments",
        group: "paid",
      });
    }
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Trim / pad exports
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const organic = out.filter((k) => k.group === "organic").slice(0, 500);
const paid = out.filter((k) => k.group === "paid").slice(0, 500);

export const KEYWORDS_1000: readonly KeywordEntry[] = Object.freeze([
  ...organic,
  ...paid,
]);

export const ORGANIC_KEYWORDS = organic;
export const PAID_KEYWORDS = paid;

/** Return the up-to-N most relevant keywords for a given landing page. */
export function getKeywordsForPage(path: string, limit = 8): KeywordEntry[] {
  const matches = KEYWORDS_1000.filter((k) => k.targetPage === path);
  return matches.slice(0, limit);
}

/** Return a comma-joined <meta name="keywords"> string for a page. */
export function metaKeywordsForPage(path: string, limit = 8): string {
  return getKeywordsForPage(path, limit)
    .map((k) => k.keyword)
    .join(", ");
}
