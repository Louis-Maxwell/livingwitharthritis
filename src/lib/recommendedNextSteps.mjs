// "Recommended next step" links for in-article content loops.
// Shared by the React module (src/components/RecommendedNextStep.tsx) and
// the static prerender (scripts/static-article-html.mjs) so crawlers and
// readers without JavaScript see the same onward links.
// Every href must be an existing route (see recommended-next-steps.test.ts).

/** @typedef {{ href: string, label: string, description: string }} NextStepLink */

const L = {
  hipExercises: { href: "/guides/hip-exercises-for-osteoarthritis", label: "Hip exercises for osteoarthritis", description: "A gentle home routine to build hip strength and movement, with stop rules." },
  painkillers: { href: "/guides/painkillers-and-nsaids", label: "Painkillers and anti-inflammatories explained", description: "How paracetamol, NSAIDs and gels are used, and when to check with a pharmacist." },
  pipDiary: { href: "/resources/pip-evidence-diary", label: "Printable PIP evidence diary", description: "Record how daily living and mobility change on better and worse days." },
  pipGuide: { href: "/guides/benefits-pip", label: "How to claim PIP for arthritis: step by step", description: "The phone call, the form, the assessment and what to do if you disagree." },
  kneeExercises: { href: "/guides/knee-exercises-for-osteoarthritis", label: "Knee exercises for osteoarthritis", description: "Eight home moves with starting levels, a weekly plan and the 4/10 pain rule." },
  exerciseHub: { href: "/exercises", label: "Exercises by joint", description: "Routines for knees, hips, hands, back, shoulders, neck and ankles." },
  exerciseGuide: { href: "/guides/exercise", label: "Physiotherapy exercises for arthritis at home", description: "How to start moving safely and build up week by week." },
  painRelief: { href: "/guides/arthritis-pain-relief", label: "Arthritis pain relief", description: "Pacing, heat and cold, movement and medicines in one place." },
  diet: { href: "/guides/diet", label: "Diet and arthritis", description: "Food patterns that support weight, energy and heart health." },
  supplements: { href: "/supplements", label: "Supplements and arthritis: what the evidence says", description: "Plain-English evidence summaries before you spend money." },
  flarePlan: { href: "/resources/flare-action-plan", label: "Flare action plan", description: "A printable plan for what to do on a bad day." },
  newlyDiagnosed: { href: "/guides/newly-diagnosed", label: "Newly diagnosed with arthritis", description: "Your first steps, questions for your GP and where to find support." },
  disability: { href: "/guides/disability-support", label: "Disability support and your rights", description: "Benefits, work adjustments and practical help in the UK." },
};

/** Exact-path mappings agreed for the highest-traffic pages. */
const EXACT = {
  "/blog/hip-replacement-recovery-week-by-week": [L.hipExercises, L.painkillers],
  "/blog/pip-for-arthritis-uk": [L.pipDiary, L.pipGuide],
  "/exercises": [L.kneeExercises, L.hipExercises],
  "/guides/knee-exercises-for-osteoarthritis": [L.hipExercises, L.exerciseHub],
  "/guides/hip-exercises-for-osteoarthritis": [L.kneeExercises, L.exerciseHub],
  "/blog/best-supplements-arthritis-uk": [L.supplements, L.diet],
  "/guides/benefits-pip": [L.pipDiary, L.disability],
};

/** Keyword defaults, first match wins. Tested against path + title text. */
const RULES = [
  [/\b(pip|benefit|attendance allowance|access to work|universal credit|disability)\b/i, [L.pipGuide, L.pipDiary]],
  [/\b(hip)\b/i, [L.hipExercises, L.painRelief]],
  [/\b(knee)\b/i, [L.kneeExercises, L.painRelief]],
  [/\b(supplement|turmeric|glucosamine|collagen|omega|vitamin|diet|food|eat|nutrition)\b/i, [L.diet, L.supplements]],
  [/\b(flare)\b/i, [L.flarePlan, L.painRelief]],
  [/\b(painkiller|nsaid|ibuprofen|paracetamol|medicine|medication|pain)\b/i, [L.painkillers, L.painRelief]],
  [/\b(exercise|exercises|walking|stretch|strength|tai chi|yoga|pilates|swimming)\b/i, [L.exerciseHub, L.kneeExercises]],
  [/\b(diagnos|rheumatoid|osteoarthritis|gout|psoriatic|lupus)\w*/i, [L.newlyDiagnosed, L.exerciseHub]],
];

const DEFAULT = [L.exerciseGuide, L.painRelief];

function norm(path) {
  const p = String(path || "").split(/[?#]/)[0].replace(/\/+$/, "");
  return p || "/";
}

/**
 * Up to two onward links for a page. Never links a page to itself.
 * @param {string} path current route, e.g. "/blog/pip-for-arthritis-uk"
 * @param {string} [context] optional title/keywords used for defaults
 * @returns {NextStepLink[]}
 */
export function recommendedNextSteps(path, context = "") {
  const current = norm(path);
  const text = `${current.replace(/[/-]+/g, " ")} ${context}`;
  const picked = EXACT[current] || RULES.find(([re]) => re.test(text))?.[1] || DEFAULT;
  const out = picked.filter((link) => link.href !== current);
  if (out.length < 2) {
    for (const link of DEFAULT) {
      if (out.length >= 2) break;
      if (link.href !== current && !out.some((o) => o.href === link.href)) out.push(link);
    }
  }
  return out.slice(0, 2);
}

/** All destination hrefs, for route-existence tests. */
export const RECOMMENDED_NEXT_STEP_HREFS = Object.values(L).map((l) => l.href);

/** Static (no-JS) HTML for the prerendered article body. */
export function recommendedNextStepsHtml(path, context = "") {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const links = recommendedNextSteps(path, context);
  if (!links.length) return "";
  return `<nav class="recommended-next-step" aria-label="Recommended next step"><h2>Recommended next step</h2><ul>${links
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a>: ${esc(l.description)}</li>`)
    .join("")}</ul></nav>`;
}
