/**
 * Living With Arthritis — local chatbot knowledge base.
 * Educational UK guidance only: no diagnosis, no doses/prescribing.
 * Signpost GP / NHS 111 / 999. Charity 1218461 · HCPC PH128483.
 *
 * Matching uses keywords + synonyms scored in optimizedChatService.
 * Keep answers concrete, UK-safe, and link internal hubs where useful.
 */

export type ChatResourceRef = {
  type: "guide" | "exercise" | "condition" | "article" | "video";
  title: string;
  url: string;
  description?: string;
};

export type KnowledgeTopic = {
  id: string;
  /** Primary match terms (any hit scores). */
  keywords: string[];
  /** Extra synonyms / phrases (slightly lower weight). */
  synonyms?: string[];
  /** Optional phrases that must co-occur for a strong match. */
  requireAny?: string[];
  /** Priority boost for safety / high-intent topics. */
  priority?: number;
  answer: string;
  nextSteps?: string[];
  related?: ChatResourceRef[];
  /** Suggested follow-up chip labels for the UI / clarifying prompts. */
  chips?: string[];
};

export const SAFETY_DISCLAIMER =
  "\n\n---\n\n_General guidance from Living With Arthritis (registered charity 1218461). Educational information only — not a diagnosis or prescription. Speak with your GP, pharmacist or rheumatology team before changing medication or starting a new programme. For urgent symptoms call **NHS 111**; for emergencies call **999**._";

/** Suggested topic chips shown in low-confidence / generic replies. */
export const SUGGESTED_CHIPS: string[] = [
  "Safe exercises for knee pain",
  "Anti-inflammatory diet",
  "How do I manage a flare?",
  "Can I claim PIP?",
  "What is rheumatoid arthritis?",
  "OA vs RA differences",
  "Is exercise safe with arthritis?",
  "Gout flare tips",
  "Fatigue and pacing",
  "Who are you?",
  "Donate or contact",
];

/** Keywords that should surface the emergency red-flag block even on other topics. */
export const URGENT_RED_FLAG_TERMS: string[] = [
  "chest pain",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "shortness of breath",
  "slurred speech",
  "face drooping",
  "stroke",
  "anaphylaxis",
  "swelling of the face",
  "swollen face",
  "throat swelling",
  "call 999",
  "heart attack",
  "hot red swollen",
  "fever and joint",
  "joint infection",
  "can't walk",
  "cannot walk",
  "unable to bear weight",
  "blackout",
  "unconscious",
];

export const EMERGENCY_RED_FLAG_BLOCK = `**If you have urgent symptoms right now**
- **Chest pain**, sudden weakness/slurred speech, severe difficulty breathing, or face/throat swelling → call **999**
- A joint that is suddenly **hot, red, very swollen** with **fever** or feeling very unwell → **NHS 111** or A&E (possible joint infection)
- Feeling unsafe or in crisis → call **999**, or Samaritans **116 123** (free, 24/7)

This chat cannot replace emergency or crisis services.
`;

export const TOPICS: KnowledgeTopic[] = [
  {
    id: "emergency",
    keywords: [
      "chest pain",
      "can't breathe",
      "cannot breathe",
      "difficulty breathing",
      "slurred speech",
      "face drooping",
      "stroke",
      "anaphylaxis",
      "swelling of the face",
      "call 999",
      "heart attack",
    ],
    synonyms: ["emergency", "999", "life threatening", "a and e", "aande", "casualty"],
    priority: 100,
    chips: ["When should I see a GP?", "Flare-up tips", "Contact the charity"],
    answer: `**This may need emergency care**

If you have **chest pain**, sudden weakness or slurred speech, severe difficulty breathing, or swelling of the face/throat, call **999** now.

For a joint that is suddenly **hot, red, very swollen** with fever or feeling very unwell, seek urgent care today (possible joint infection) — call **NHS 111** or go to A&E if you cannot get through.

If you are in emotional crisis, call **999** or Samaritans **116 123**.

This chat cannot replace emergency services.`,
    nextSteps: [
      "Call 999 for life-threatening symptoms",
      "Call NHS 111 for urgent but non-life-threatening advice",
      "Samaritans 116 123 for crisis support",
    ],
    related: [
      { type: "guide", title: "Contact us (non-urgent)", url: "/contact", description: "Charity contact — not emergency care" },
      { type: "guide", title: "When to seek care", url: "/guides" },
    ],
  },
  {
    id: "who-we-are",
    keywords: [
      "who are you",
      "who we are",
      "about you",
      "about the charity",
      "what is living with arthritis",
      "are you arthritis uk",
      "versus arthritis",
      "charity number",
      "hcpc",
      "louis maxwell",
      "motion is lotion",
    ],
    synonyms: ["about us", "independent", "who runs", "founder", "ph128483", "1218461", "are you versus"],
    priority: 20,
    chips: ["Donate or contact", "Exercise hub", "Diet hub"],
    answer: `**Who we are**

We are **Living With Arthritis** — an independent UK charity (Charitable Incorporated Organisation, registered charity **1218461** in England and Wales).

- We are **not** Arthritis UK (formerly Versus Arthritis) and **not** the US Arthritis Foundation.
- Clinical review is led by our founder **Louis Maxwell**, an HCPC-registered First Contact Practitioner (**PH128483**) and CSP member.
- Our motto: **Motion is Lotion** — gentle, regular movement is one of the best treatments for most arthritis.
- Everything on the site is free; we do **not** diagnose or prescribe.

Ask about exercises, diet, flares, PIP, or browse **/about**.`,
    nextSteps: [
      "Read our About page",
      "Donate or get in touch if you want to support the work",
    ],
    related: [
      { type: "guide", title: "About us", url: "/about", description: "Charity 1218461 · independent of Arthritis UK" },
      { type: "guide", title: "Contact", url: "/contact", description: "Email or WhatsApp the team" },
      { type: "guide", title: "Donate", url: "/donate", description: "Support free UK arthritis guidance" },
    ],
  },
  {
    id: "donate-contact",
    keywords: [
      "donate",
      "donation",
      "gift aid",
      "contact",
      "email you",
      "phone number",
      "whatsapp",
      "get in touch",
      "helpline",
      "how to help",
      "support the charity",
    ],
    synonyms: ["volunteer", "fundraising", "give money", "speak to someone", "call you", "text you"],
    priority: 15,
    chips: ["Who are you?", "PIP benefits", "Exercise hub"],
    answer: `**Donate or contact Living With Arthritis**

We are a small independent UK charity (**1218461**). Donations and Gift Aid help keep guides, exercises and this chat free.

**Contact**
- Email: **info@livingwitharthritis.org.uk** (we aim to reply within two working days)
- Phone / WhatsApp: **07760 512 084**
- Web forms: **/contact**

**Donate:** **/donate**

We cannot provide emergency medical care by phone — for urgent symptoms use **NHS 111** or **999**.`,
    nextSteps: ["Open the contact page", "Consider a one-off or monthly donation"],
    related: [
      { type: "guide", title: "Contact", url: "/contact" },
      { type: "guide", title: "Donate", url: "/donate" },
      { type: "guide", title: "About us", url: "/about" },
    ],
  },
  {
    id: "website-nav",
    keywords: [
      "where is the blog",
      "find exercises",
      "exercise hub",
      "diet hub",
      "website map",
      "site navigation",
      "where do i find",
      "browse the site",
      "pillar guides",
      "show me the blog",
    ],
    synonyms: ["sitemap", "menu", "pages on the site", "hub pages", "library"],
    priority: 11,
    chips: ["Safe knee exercises", "Anti-inflammatory diet", "Benefits & PIP"],
    answer: `**Finding your way around the site**

Useful hubs on Living With Arthritis:

- **Exercises:** **/exercises** (also **/guides/exercise**) — joint-friendly routines; *Motion is Lotion*
- **Diet:** **/diet** (also **/guides/diet**) — Mediterranean / anti-inflammatory eating
- **Blog:** **/blog** — practical articles and updates
- **Conditions:** **/conditions/osteoarthritis**, **/conditions/rheumatoid-arthritis**, gout, PsA, AS, JIA, fibromyalgia and more
- **Benefits & PIP:** **/guides/benefits-pip** and **/benefits-pip**
- **Flares:** **/arthritis-flare-ups**
- **Mental health:** **/arthritis-mental-health**
- **About / contact / donate:** **/about**, **/contact**, **/donate**

Ask me about a joint, condition, diet, flares or PIP and I will answer with links.`,
    nextSteps: ["Open /exercises or /diet", "Browse /blog for recent articles"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "article", title: "Blog", url: "/blog" },
      { type: "guide", title: "Guides hub", url: "/guides" },
    ],
  },
  {
    id: "pip-benefits",
    keywords: [
      "pip",
      "personal independence payment",
      "disability benefit",
      "dla",
      "attendance allowance",
      "universal credit",
      "benefits",
      "claim pip",
      "pip assessment",
      "mandatory reconsideration",
      "how to claim pip",
      "pip points",
      "pip diary",
      "pip evidence",
      "pip descriptors",
    ],
    synonyms: ["welfare", "disability support", "daily living component", "mobility component", "esa", "pip form", "pip application", "pip questionnaire"],
    priority: 18,
    chips: ["Access to Work", "Work adjustments", "Contact us"],
    answer: `**PIP and arthritis benefits (UK) — orientation only**

**Personal Independence Payment (PIP)** is a working-age disability benefit for people who need help with daily living or getting around because of a long-term condition — including many forms of arthritis. It is **not means-tested** and you can claim whether or not you work.

**In broad terms:**
- Two components: **daily living** and **mobility** (standard or enhanced rates after assessment).
- You score **points** against activity descriptors (e.g. preparing food, washing, dressing, managing therapy, moving around). Diagnosis alone does not decide the award.
- Assessors look at whether you can do activities **safely**, **repeatedly**, in a **reasonable time**, and to an **acceptable standard** — including on bad/flare days.
- Keep a brief symptom/flare **diary** with real examples (how long tasks take, help needed, aids used). Our **/resources/pip-evidence-diary** template can help structure notes.

**How people usually start a claim (check GOV.UK for current steps):**
1. Start the claim process via GOV.UK / DWP (phone or online pathway as listed there)
2. Complete the questionnaire with concrete daily-life examples
3. Attend assessment if invited; take notes/aids list; consider a companion
4. If refused, you can usually ask for a **mandatory reconsideration** within the time limit — Citizens Advice can help

**Practical next steps:**
- Read our plain-English hub: **/guides/benefits-pip**
- Check current rules and rates on **GOV.UK**
- Citizens Advice or a local welfare-rights adviser for forms and reconsiderations

We cannot assess your entitlement or predict points — rules change and every case differs.`,
    nextSteps: [
      "Read /guides/benefits-pip",
      "Gather examples of how arthritis affects daily tasks on bad days",
      "Consider Citizens Advice support with the form",
    ],
    related: [
      { type: "guide", title: "Benefits & PIP guide", url: "/guides/benefits-pip", description: "UK PIP orientation for arthritis" },
      { type: "guide", title: "Benefits hub", url: "/benefits-pip" },
      { type: "article", title: "Arthritis disability benefits FAQ", url: "/faq/arthritis-disability-benefits-uk", description: "PIP, ESA, Blue Badge orientation" },
      { type: "article", title: "PIP for arthritis UK (blog)", url: "/blog/pip-for-arthritis-uk" },
      { type: "guide", title: "Access to Work", url: "/library/access-to-work" },
      { type: "guide", title: "PIP evidence diary", url: "/resources/pip-evidence-diary", description: "Template for flare and daily-living notes" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "access-to-work",
    keywords: [
      "access to work",
      "work",
      "employer",
      "workplace",
      "job",
      "equality act",
      "reasonable adjustment",
      "occupational health",
      "sick leave",
      "fit note",
      "work adjustments",
    ],
    synonyms: ["at work", "working with arthritis", "disability at work", "adjustments", "hr arthritis", "phased return"],
    priority: 12,
    chips: ["PIP benefits", "Fatigue pacing", "Flare-up tips"],
    answer: `**Work, Access to Work and arthritis (UK)**

Many people with arthritis stay in work with the right adjustments.

**Know your rights**
- Arthritis can count as a disability under the **Equality Act 2010** if it has a substantial, long-term effect on daily activities.
- Employers should consider **reasonable adjustments** (flexible hours, equipment, breaks, home working where feasible).

**Access to Work**
- A UK government grant that can fund equipment, travel support or a support worker if you have a disability or health condition.
- Apply via GOV.UK; you usually need a job (or job offer). Your employer does not decide the award.

**Practical tips**
- Document flare patterns and what helps
- Ask HR / occupational health early rather than waiting for a crisis
- See our workplace guides under **/guides** and **/blog**

For benefit income support see **/guides/benefits-pip**. This is general information, not employment-law advice.`,
    nextSteps: [
      "Check Access to Work on GOV.UK",
      "List adjustments that would help on flare days",
      "Read PIP/benefits guidance if income support is also needed",
    ],
    related: [
      { type: "guide", title: "Benefits & PIP", url: "/guides/benefits-pip" },
      { type: "article", title: "Guides hub", url: "/guides" },
      { type: "article", title: "Blog", url: "/blog" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "waiting-lists",
    keywords: [
      "waiting list",
      "nhs wait",
      "referral",
      "rheumatology wait",
      "physio wait",
      "how long for",
      "appointment delay",
    ],
    synonyms: ["waiting times", "backlog", "queue for physio", "seen by specialist", "stuck on waiting"],
    priority: 10,
    chips: ["Safe exercises while waiting", "When to see a GP", "Flare plan"],
    answer: `**NHS waiting lists — what you can do while you wait**

Waiting for rheumatology, orthopaedics or physiotherapy is common in the UK. You can still act safely while you wait.

**While you wait**
- Keep a symptom diary (pain, stiffness duration, flares, function)
- Start paced low-impact movement — see **/exercises**
- Ask your GP about **First Contact Practitioner** physio in primary care where available
- Check if your area offers **self-referral** to physiotherapy
- Optimise sleep, weight management and anti-inflammatory eating (**/diet**)

**Chase care if:**
- Symptoms rapidly worsen, or a joint is hot/red/swollen with fever → **NHS 111** / urgent care
- You were told to seek earlier review if function drops

We cannot shorten official waiting times, but self-management and primary-care physio often help bridge the gap.`,
    nextSteps: [
      "Ask about physio self-referral or First Contact Practitioners",
      "Use /exercises for safe routines while waiting",
      "Contact GP if symptoms escalate",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Guides", url: "/guides" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "newly-diagnosed",
    keywords: [
      "newly diagnosed",
      "just diagnosed",
      "new diagnosis",
      "first diagnosed",
      "what now",
      "where do i start",
    ],
    synonyms: ["recently diagnosed", "new to arthritis", "diagnosis today", "got diagnosed"],
    priority: 14,
    chips: ["Exercise hub", "Flare-up plan", "Anti-inflammatory diet"],
    answer: `**Newly diagnosed with arthritis — a calm starting plan**

Hearing a diagnosis can feel overwhelming. You do not need to fix everything today.

**First priorities**
1. Understand your **type** (OA, RA, PsA, gout, etc.) — ask your clinician for the exact label and care plan.
2. Know your **safety net**: GP, rheumatology advice line (if you have one), **NHS 111**, **999** for emergencies.
3. Start **gentle movement** most days — *Motion is Lotion* — see **/exercises**.
4. Build an **anti-inflammatory plate** — **/diet**.
5. Plan for **flares** before they hit — **/arthritis-flare-ups**.

**Avoid**
- Stopping prescribed medicines without advice
- Aggressive new exercise programmes during an active flare
- Relying on chat or social media instead of your clinical team

We are Living With Arthritis (charity **1218461**), independent of Arthritis UK — free guides only; we do not diagnose or prescribe.`,
    nextSteps: [
      "Bookmark /exercises and /diet",
      "Read the flare-up guide",
      "Write questions for your next GP/rheumatology visit",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "guide", title: "Flare-up guide", url: "/arthritis-flare-ups" },
      { type: "guide", title: "About us", url: "/about" },
    ],
  },
  {
    id: "flare",
    keywords: ["flare", "flare-up", "flare up", "flaring", "bad flare", "sudden worse", "flare management"],
    synonyms: ["flareups", "exacerbation", "symptom spike", "joints flared"],
    priority: 16,
    chips: ["Heat or cold?", "Gentle exercises", "When to call 111"],
    answer: `**Managing an arthritis flare**

A flare is a temporary worsening of pain, swelling and fatigue. The goal is to calm it without losing all your progress.

**First 24–48 hours**
- Rest the joint but keep **gently** moving — full bed rest increases stiffness.
- **Ice** for hot/swollen joints (about 20 minutes, cloth barrier).
- **Heat** for stiff joints (warm bath, wheat bag).
- Use your usual pain relief only as labelled / prescribed — ask a pharmacist if unsure.

**Next few days**
- Drop exercise intensity (often ~50%) rather than stopping completely.
- Prioritise sleep and reduce stress where you can.
- Favour anti-inflammatory meals; ease alcohol and ultra-processed foods.

**Contact your GP or rheumatology team if:**
- The flare lasts more than 1–2 weeks
- New rash, fever, eye pain, or chest symptoms
- Usual medication is not controlling symptoms

Full guide: **/arthritis-flare-ups**`,
    nextSteps: [
      "Follow the flare pacing plan for 48 hours",
      "Read /arthritis-flare-ups",
      "Call NHS 111 if a joint is hot, red and you feel unwell",
    ],
    related: [
      { type: "guide", title: "Flare-up guide", url: "/arthritis-flare-ups" },
      { type: "exercise", title: "Gentle exercises", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
    ],
  },
  {
    id: "heat-cold",
    keywords: [
      "heat",
      "cold",
      "ice pack",
      "hot water bottle",
      "wheat bag",
      "heat pad",
      "ice for",
      "hot or cold",
      "heat or ice",
    ],
    synonyms: ["warmth", "cryotherapy", "thermal", "ice or heat", "cold pack"],
    priority: 9,
    chips: ["Flare-up tips", "Knee exercises", "Pain relief basics"],
    answer: `**Heat and cold for arthritis**

Both can help — choose based on how the joint feels.

**Use cold when**
- The joint is hot, swollen or recently flared
- About 10–20 minutes with a cloth barrier; do not put ice directly on skin

**Use heat when**
- The joint feels stiff and achy (especially mornings)
- Warm shower, wheat bag or heat wrap — not scalding

**Tips**
- Many people alternate: heat to loosen, gentle movement, cold afterwards if swollen
- Never sleep on an electric heat pad that can burn numb skin
- Stop if skin becomes very red, blistered or pain increases sharply

Combine with pacing and movement — see **/exercises** and **/arthritis-flare-ups**.`,
    nextSteps: ["Match heat vs cold to swelling vs stiffness", "Add gentle range-of-motion after heat"],
    related: [
      { type: "guide", title: "Flare-up guide", url: "/arthritis-flare-ups" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
    ],
  },
  {
    id: "fatigue",
    keywords: ["fatigue", "exhausted", "tired all the time", "no energy", "brain fog", "worn out", "arthritis tiredness"],
    synonyms: ["energy crash", "worn down", "lethargy", "crippling tiredness"],
    priority: 11,
    chips: ["Sleep tips", "Pacing at work", "Gentle exercise"],
    answer: `**Arthritis fatigue — practical pacing**

Fatigue in inflammatory arthritis and OA is real — it is not "just tiredness".

**What often helps**
- **Pacing:** plan rest *before* you crash; break tasks into chunks
- **Sleep routine:** consistent times; limit late caffeine/alcohol
- **Gentle daily movement** — short walks or seated routines can *raise* energy over weeks
- **Flare management** so inflammatory load settles
- Check with your GP for contributors: anaemia, thyroid, vitamin D, sleep apnoea, low mood, medication side effects

**Avoid** boom-and-bust (overdoing good days then paying for days).

See energy and exercise articles via **/exercises** and **/guides**. Seek GP review for sudden extreme fatigue with other red-flag symptoms.`,
    nextSteps: [
      "Try a simple pacing diary for one week",
      "Keep short daily movement rather than long weekend catch-ups",
      "Ask GP to rule out other causes if fatigue is severe or new",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Guides", url: "/guides" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "guide", title: "Mental health", url: "/arthritis-mental-health" },
    ],
  },
  {
    id: "sleep",
    keywords: [
      "sleep",
      "insomnia",
      "can't sleep",
      "cannot sleep",
      "waking at night",
      "night pain",
      "sleeping with pain",
    ],
    synonyms: ["poor sleep", "restless night", "broken sleep", "sleep hygiene"],
    priority: 11,
    chips: ["Fatigue pacing", "Flare tips", "Mental health"],
    answer: `**Sleep and arthritis**

Night pain and broken sleep are common with arthritis — and poor sleep makes pain and fatigue worse next day.

**Practical ideas**
- Consistent bed/wake times; wind-down routine (dim lights, less screens)
- Supportive mattress/pillows; side-sleepers may cushion knees with a pillow
- Heat for stiffness before bed; ice earlier if a joint is hot
- Limit late caffeine, alcohol and heavy meals
- Gentle daytime movement often improves sleep more than daytime napping

**See your GP if:** loud snoring / gasping (possible sleep apnoea), new severe night pain, or mood is dropping with insomnia.

Pair with pacing (**/exercises**) and flare plans (**/arthritis-flare-ups**).`,
    nextSteps: [
      "Trial a consistent wind-down for 7 nights",
      "Ask GP about sleep apnoea or medication timing if nights are severe",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "guide", title: "Mental health", url: "/arthritis-mental-health" },
    ],
  },
  {
    id: "mental-health",
    keywords: [
      "mental health",
      "depression",
      "anxiety",
      "low mood",
      "stressed",
      "overwhelmed",
      "lonely",
      "feeling down",
      "panic",
    ],
    synonyms: ["wellbeing", "emotional", "crying a lot", "worried all the time", "mental wellbeing"],
    priority: 13,
    chips: ["Fatigue pacing", "Contact us", "Gentle exercise"],
    answer: `**Arthritis and mental health**

Living with pain, flares and uncertainty commonly affects mood. That does not mean you are weak — it is a recognised part of long-term conditions.

**What often helps**
- Talking to your **GP** about mood; NHS talking therapies / IAPT referral where available
- Paced movement — **/exercises** — which can lift mood as well as joints
- Sleep, social contact, and realistic daily goals
- Peer stories and practical articles: **/arthritis-mental-health** and **/blog**

**Urgent / crisis**
- If you feel unsafe or are in crisis, call **999** or Samaritans **116 123** (free, 24/7)
- This chat is not a crisis line

We are Living With Arthritis (charity **1218461**) — educational support only.`,
    nextSteps: [
      "Read /arthritis-mental-health",
      "Speak to your GP about mood support",
      "Use Samaritans 116 123 if in crisis",
    ],
    related: [
      { type: "guide", title: "Arthritis & mental health", url: "/arthritis-mental-health" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "knee-exercise",
    keywords: [
      "knee pain",
      "knee exercise",
      "exercises for knee",
      "knee arthritis",
      "sore knee",
      "bad knee",
      "knees hurt",
    ],
    synonyms: ["patella", "osteoarthritis knee", "oa knee", "swollen knee", "knee oa"],
    priority: 13,
    chips: ["Hip exercises", "Anti-inflammatory diet", "Flare tips"],
    answer: `**Knee pain and exercise (UK-safe)**

For most osteoarthritis-related knee pain, **strength + low-impact movement** beats rest alone. *Motion is Lotion.*

**Helpful starters (pain-free range):**
- Sit-to-stands from a chair
- Straight-leg raises
- Glute bridges
- Gentle stationary cycling or flat walking
- Pool walking / swimming if land impact flares you

**Rules of thumb**
- Mild ache that settles within ~2 hours is often OK; sharp or lasting pain means ease back
- Supportive footwear; avoid worn-out trainers
- Topical anti-inflammatory gels are often tried before oral painkillers for knee OA (ask a pharmacist)

See **/exercises** and joint pages under **/exercises/knee** where available. See a GP if you cannot bear weight, the knee locks/gives way repeatedly, or it is hot and red with fever.`,
    nextSteps: [
      "Start 2–3 strength moves most days",
      "Browse /exercises for follow-along routines",
      "Ask about physio self-referral if pain persists",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises", description: "Knee-friendly routines" },
      { type: "condition", title: "Knee arthritis", url: "/conditions/knee-arthritis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "hip-exercise",
    keywords: ["hip pain", "hip exercise", "exercises for hip", "hip arthritis", "sore hip", "hips hurt"],
    synonyms: ["oa hip", "osteoarthritis hip", "groin pain arthritis"],
    priority: 12,
    chips: ["Knee exercises", "Exercise hub", "Weight & diet"],
    answer: `**Hip pain and exercise**

Strong glutes and gentle mobility often ease OA-related hip pain.

**Useful moves**
- Glute bridges
- Sit-to-stands
- Side-lying leg lifts (within comfort)
- Walking, cycling, swimming

Avoid forcing deep stretches into sharp groin pain. Sudden inability to weight-bear after a fall needs urgent assessment (possible fracture), especially if you take steroids.

Browse **/exercises** and **/conditions/hip-arthritis** for paced programmes.`,
    nextSteps: ["Build glute strength 2–3 times weekly", "Use /exercises for guided sessions"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Hip arthritis", url: "/conditions/hip-arthritis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "hand-exercise",
    keywords: [
      "hand pain",
      "hand exercise",
      "finger",
      "wrist pain",
      "exercises for hands",
      "hand arthritis",
      "thumb pain",
    ],
    synonyms: ["fingers stiff", "oa hands", "knuckle pain", "base of thumb"],
    priority: 11,
    chips: ["RA overview", "Heat vs cold", "Diet hub"],
    answer: `**Hand and wrist arthritis — movement tips**

Short, frequent mobility beats occasional hard sessions.

**Ideas**
- Gentle tendon glides and fist open/close in warm water
- Thumb opposition and soft putty or towel squeezes (without sharp pain)
- Night splints for some people with base-of-thumb OA — ask OT/physio
- Topical gels; pacing gripping tasks

Inflammatory signs (warm swelling, long morning stiffness) deserve GP review for possible inflammatory arthritis.

See **/exercises** and **/conditions/hand-arthritis**.`,
    nextSteps: ["Try warm-water hand mobility each morning", "Pace gripping and jar-opening tasks"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Hand arthritis", url: "/conditions/hand-arthritis" },
      { type: "guide", title: "Diet hub", url: "/diet" },
    ],
  },
  {
    id: "back-pain",
    keywords: [
      "back pain",
      "lower back",
      "lumbar",
      "spine pain",
      "backache",
      "sciatica",
      "back arthritis",
    ],
    synonyms: ["sore back", "spinal arthritis", "disc pain", "lumbago"],
    priority: 12,
    chips: ["AS / axial SpA", "Gentle exercise", "When to see a GP"],
    answer: `**Back pain and arthritis — general UK guidance**

Many people with OA or inflammatory disease get spinal stiffness and ache. Most mechanical back pain improves with paced movement rather than long bed rest.

**Helpful habits**
- Short walks and gentle mobility several times a day
- Core/hip strength within comfort (physio-guided if available)
- Heat for stiffness; change posture every 30–40 minutes
- Supportive sleep setup

**See a GP soon if:** pain after trauma, unexplained weight loss, fever, progressive leg weakness, bladder/bowel change, or saddle numbness — these can be **red flags**.

Inflammatory back pain (younger adults, night pain, marked morning stiffness improving with movement) may need rheumatology pathways — see **/conditions/ankylosing-spondylitis**.

Routines: **/exercises**.`,
    nextSteps: [
      "Keep gentle movement rather than prolonged bed rest",
      "Seek urgent care for neurological red flags",
      "Browse /exercises",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Ankylosing spondylitis", url: "/conditions/ankylosing-spondylitis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "shoulder-neck-exercise",
    keywords: [
      "shoulder pain",
      "neck pain",
      "shoulder exercise",
      "neck exercise",
      "frozen shoulder",
      "stiff neck",
    ],
    synonyms: ["shoulder arthritis", "cervical", "neck stiffness"],
    priority: 10,
    chips: ["Exercise hub", "Heat vs cold", "When to see a GP"],
    answer: `**Shoulder and neck — gentle movement**

Posture breaks, scapular squeezes and supported range-of-motion often help stiffness. Avoid aggressive overhead loading during flares.

Red flags needing urgent care: trauma with severe pain, unexplained weight loss, fever with joint pain, progressive weakness, or neurological symptoms in arms/legs.

Routines: **/exercises** including **/exercises/neck-arthritis-exercises** where listed. Condition page: **/conditions/shoulder-arthritis**.`,
    nextSteps: ["Alternate posture every 30–40 minutes", "Use /exercises for seated options"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "exercise", title: "Neck exercises", url: "/exercises/neck-arthritis-exercises" },
      { type: "condition", title: "Shoulder arthritis", url: "/conditions/shoulder-arthritis" },
    ],
  },
  {
    id: "ankle-foot-exercise",
    keywords: ["ankle pain", "foot pain", "ankle exercise", "foot exercise", "ankle arthritis", "sore feet"],
    synonyms: ["sore ankles", "plantar", "feet hurt", "toe arthritis"],
    priority: 9,
    chips: ["Gout overview", "Exercise hub", "Supportive footwear"],
    answer: `**Ankle and foot arthritis**

Supportive shoes, calf stretches and gentle ankle circles help many people. Pool exercise reduces load.

Sudden hot swollen big toe or midfoot with intense pain may be **gout** — see **/conditions/gout** and seek GP advice.

See **/exercises/ankle-arthritis-exercises** and the main **/exercises** hub. Sudden hot swollen joint with fever → urgent care.`,
    nextSteps: ["Check footwear wear", "Try pool or seated ankle mobility"],
    related: [
      { type: "exercise", title: "Ankle exercises", url: "/exercises/ankle-arthritis-exercises" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Gout", url: "/conditions/gout" },
    ],
  },
  {
    id: "anti-inflammatory-diet",
    keywords: [
      "anti-inflammatory",
      "anti inflammatory",
      "inflammation diet",
      "mediterranean",
      "best foods",
      "foods for arthritis",
      "anti-inflammatory foods",
      "anti inflammatory foods",
    ],
    synonyms: ["eat for joints", "inflammatory foods", "omega-3 food", "joint friendly food"],
    priority: 15,
    chips: ["Foods to avoid", "Gout diet", "Exercise hub"],
    answer: `**Anti-inflammatory eating for arthritis**

A **Mediterranean-style** pattern has the strongest everyday evidence for joint-friendly eating.

**Eat more**
- Oily fish (salmon, mackerel, sardines) — about two portions a week
- Extra-virgin olive oil
- Colourful vegetables and fruit (berries, leafy greens)
- Whole grains, pulses, nuts and seeds
- Herbs/spices such as ginger, garlic, turmeric *in food* (supplements: ask a pharmacist)

**Eat less**
- Ultra-processed foods, sugary drinks, refined carbs
- Fried / processed meats; excess alcohol

Modest weight loss, if relevant, often eases knee and hip load. Food patterns support care — they are **not a cure** for rheumatoid arthritis. Recipes and plans: **/diet**; RA-focused food-first guide: **/blog/anti-inflammatory-diet-rheumatoid-arthritis**.`,
    nextSteps: ["Shift one meal a day toward a Mediterranean plate", "Open /diet for UK-focused ideas"],
    related: [
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "article", title: "Anti-inflammatory diet for RA", url: "/blog/anti-inflammatory-diet-rheumatoid-arthritis", description: "Food-first RA plates — not a cure" },
      { type: "article", title: "Omega-3 foods for joints", url: "/blog/omega-3-foods-for-joints" },
      { type: "guide", title: "Mediterranean diet", url: "/diet/mediterranean-diet-for-arthritis" },
      { type: "guide", title: "Foods to avoid", url: "/diet/foods-to-avoid-with-arthritis" },
    ],
  },
  {
    id: "diet-general",
    keywords: [
      "diet",
      "nutrition",
      "what to eat",
      "meal plan",
      "weight loss",
      "lose weight",
      "foods to avoid",
      "diets for arthritis",
      "diet for osteoarthritis",
      "diet for arthritis",
      "nutritionist for arthritis",
    ],
    synonyms: ["eating", "calories", "healthy eating", "what should i eat", "oa diet"],
    priority: 8,
    chips: ["Anti-inflammatory foods", "Gout diet notes", "Exercise hub"],
    answer: `**Eating well with arthritis**

Focus on a **Mediterranean pattern**: plants, olive oil, oily fish, pulses, whole grains; limit ultra-processed foods and sugary drinks.

If you carry extra weight, even modest loss often helps knee/hip OA — combine small changes with strength training to protect muscle.

Hydration and fibre support overall health. Personal medical diets (gout low-purine plans, kidney disease) need clinician or dietitian advice.

Explore **/diet** and **/guides/diet**.`,
    nextSteps: ["Browse /diet", "Pair nutrition changes with /exercises"],
    related: [
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "guide", title: "Diet guide", url: "/guides/diet" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
    ],
  },
  {
    id: "oa-exercise",
    keywords: [
      "osteoarthritis exercise",
      "safe exercises for oa",
      "exercises for osteoarthritis",
      "oa exercise",
      "safe exercises for osteoarthritis",
    ],
    synonyms: ["exercise for oa", "oa workout", "oa physio"],
    priority: 14,
    chips: ["Knee exercises", "Diet for joints", "OA overview"],
    answer: `**Safe exercises for osteoarthritis**

Low-impact movement is one of the most effective OA treatments — it eases stiffness, strengthens supporting muscles and lifts mood.

**Aerobic (most days, 20–30 min):** walking, stationary cycling, swimming/aqua
**Strength (2–3×/week):** sit-to-stands, straight-leg raises, wall sits, glute bridges
**Flexibility & balance:** gentle stretches, tai chi, chair yoga

Discomfort that settles quickly can be OK; sharp or prolonged pain means ease back. Free routines: **/exercises** and **/guides/exercise**.`,
    nextSteps: ["Pick one aerobic and one strength habit this week", "Open /exercises"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Exercise guide", url: "/guides/exercise" },
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
    ],
  },

  {
    id: "exercise-safety",
    keywords: [
      "exercise safety",
      "is exercise safe",
      "safe to exercise",
      "should i exercise with arthritis",
      "exercise during flare",
      "when to stop exercise",
      "when should i stop exercising",
      "stop exercising",
      "stop exercise",
      "exercise making pain worse",
      "hurt after exercise",
      "sharp pain when exercising",
      "exercising with arthritis",
    ],
    synonyms: ["exercise red flags", "exercise rules", "can i exercise", "exercise harm", "stop exercising with arthritis"],
    priority: 22,
    chips: ["OA exercises", "Flare-day movement", "When to see a GP?"],
    answer: `**Exercise safety with arthritis (UK educational guidance)**

For most people with osteoarthritis and many with inflammatory arthritis, **appropriate** exercise is safe and helpful — NICE-style guidance puts movement ahead of long-term painkillers for OA. It should still be paced.

**Usually OK**
- Mild ache up to about **4/10** during/after that settles within ~24 hours
- Gentle warm-up; build time and load gradually (roughly ≤10% week-to-week)
- Prefer low-impact options (walk, cycle, swim, strength, tai chi)

**Ease back / modify**
- Pain that stays high overnight or swells the joint for >24–48 hours
- During a flare: shorter sets, range-of-motion, water work — do not force through sharp pain

**Stop and seek clinical advice**
- **Sharp**, catching, locking, or sudden giving-way pain
- New chest pain, severe breathlessness, dizziness, or collapse → **999** if severe
- Hot, red, very swollen joint with fever → **NHS 111** / urgent care (possible infection)

Start gently via **/exercises** and **/guides/can-exercise-make-osteoarthritis-worse**. Ask a physio/FCP/GP before a new programme if you have heart, balance, or unstable joint problems.`,
    nextSteps: [
      "Open /exercises for joint-specific routines",
      "Read /guides/can-exercise-make-osteoarthritis-worse",
      "Modify rather than stop completely on flare days",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Can exercise make OA worse?", url: "/guides/can-exercise-make-osteoarthritis-worse" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "guide", title: "Exercise guide", url: "/guides/exercise" },
    ],
  },
  {
    id: "exercise-general",
    keywords: [
      "exercise",
      "workout",
      "physio",
      "walking",
      "swimming",
      "activity",
      "tai chi",
      "yoga",
      "pilates",
      "movement",
    ],
    synonyms: ["gym", "stretching", "strength training", "aqua", "motion is lotion"],
    priority: 7,
    chips: ["Knee exercises", "OA exercises", "Flare-day movement"],
    answer: `**Exercise with arthritis — practical UK guidance**

Movement is medicine for many people with OA and inflammatory arthritis when paced sensibly. **Motion is Lotion.**

**Helpful pattern**
- Low-impact aerobic most days (walk, cycle, swim)
- Strength 2–3×/week for muscles that support sore joints
- Flexibility and balance little and often (tai chi, gentle yoga)

On flare days, reduce intensity rather than stopping completely. Browse **/exercises** and **/guides/exercise**. A physiotherapist (including First Contact Practitioners in many GP practices) can tailor a plan.`,
    nextSteps: ["Visit /exercises", "Start with 10–15 minutes and build"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Exercise guide", url: "/guides/exercise" },
      { type: "exercise", title: "Tai chi for arthritis", url: "/exercises/tai-chi-for-arthritis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "ra",
    keywords: ["rheumatoid", "what is ra", "rheumatoid arthritis", "ra symptoms"],
    synonyms: ["autoimmune arthritis", "inflammatory arthritis ra", "ra diagnosis"],
    priority: 13,
    chips: ["DMARDs overview", "Flare tips", "Exercise with RA"],
    answer: `**Rheumatoid arthritis (RA) — essentials**

RA is an **autoimmune** condition where the immune system attacks joint linings, often symmetrically (both hands/feet), with pain, swelling, stiffness and fatigue.

**Typical clues**
- Morning stiffness often **>30–60 minutes**
- Warm, swollen small joints
- Flares over time

**UK care (general)**
- Early rheumatology referral matters (NICE pathways)
- DMARDs (e.g. methotrexate) and sometimes biologics — **only as prescribed by your team**
- Physio, OT, movement, sleep and not smoking all help

Only a clinician can diagnose RA. We do not prescribe. Learn more: **/conditions/rheumatoid-arthritis**. Self-care: **/exercises**, **/diet**, **/arthritis-flare-ups**.`,
    nextSteps: ["See GP promptly for suspected inflammatory arthritis", "Use /exercises for paced movement"],
    related: [
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },

  {
    id: "oa-vs-ra",
    keywords: [
      "oa vs ra",
      "oa versus ra",
      "difference between oa and ra",
      "osteoarthritis vs rheumatoid",
      "osteoarthritis versus rheumatoid",
      "osteoarthritis vs rheumatoid arthritis",
      "osteoarthritis or rheumatoid",
      "is it oa or ra",
      "wear and tear or autoimmune",
      "inflammatory or osteoarthritis",
      "difference between osteoarthritis and rheumatoid",
    ],
    synonyms: ["oa or ra", "ra vs oa", "difference oa ra", "autoimmune or wear", "compare oa ra"],
    requireAny: ["vs", "versus", "difference", " or ", "compare"],
    priority: 28,
    chips: ["What is OA?", "What is RA?", "When to see a GP?"],
    answer: `**Osteoarthritis (OA) vs rheumatoid arthritis (RA) — education only**

These are different conditions. Only a clinician can diagnose which (if either) you have.

**Osteoarthritis (OA)** — most common form; joint-surface / cartilage wear with secondary inflammation. Often one or a few joints (knee, hip, hand, spine). Morning stiffness often **under ~30 minutes**. Care focus: movement, strength, weight management when relevant, topical gels, pacing (NICE NG226-style self-care).

**Rheumatoid arthritis (RA)** — autoimmune inflammatory arthritis. Often symmetrical small joints (hands/feet). Morning stiffness often **over 30–60 minutes**, with fatigue and wider inflammation possible. Care focus: early rheumatology referral, DMARDs/biologics **only as prescribed**, plus physio and pacing.

**See a GP soon** if morning stiffness is prolonged, joints are warm/swollen, or daily tasks are becoming hard — early inflammatory arthritis review can protect joints.

Learn more: **/conditions/osteoarthritis**, **/conditions/rheumatoid-arthritis**. This chat does **not** diagnose.`,
    nextSteps: [
      "Compare hubs at /conditions/osteoarthritis and /conditions/rheumatoid-arthritis",
      "Book GP if inflammatory features persist",
      "Use /exercises for paced movement while you wait",
    ],
    related: [
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "guide", title: "Newly diagnosed", url: "/guides/newly-diagnosed" },
      { type: "guide", title: "When to seek care", url: "/guides" },
    ],
  },
  {
    id: "oa-general",
    keywords: ["osteoarthritis", "what is oa", "wear and tear", "oa symptoms"],
    synonyms: ["degenerative joint", "cartilage wear"],
    priority: 12,
    chips: ["OA exercises", "Knee OA", "Diet hub"],
    answer: `**Osteoarthritis (OA) — essentials**

OA is the most common arthritis. Cartilage cushioning wears, so joints feel stiff, achy and sometimes swollen — often knees, hips, hands and spine.

**Typical pattern**
- Pain worse with activity, easier with rest
- Morning stiffness usually **under ~30 minutes**
- Grating/clicking; reduced range

**What helps most (aligned with NICE-style self-care)**
- Movement and strength
- Weight management when relevant
- Topical gels before long-term oral painkillers for many knee/hand cases (pharmacist/GP advice)
- Heat, footwear, pacing

Explore **/conditions/osteoarthritis** and **/exercises**. Hot/red joint with fever needs urgent care.`,
    nextSteps: ["Build a weekly movement habit", "Open /exercises"],
    related: [
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
    ],
  },
  {
    id: "psa",
    keywords: [
      "psoriatic arthritis",
      "psa",
      "psoriasis arthritis",
      "psoriatic",
      "skin and joints",
    ],
    synonyms: ["psa flare", "nail pitting arthritis", "psoriasis joints"],
    priority: 13,
    chips: ["RA vs PsA", "Flare tips", "Exercise hub"],
    answer: `**Psoriatic arthritis (PsA) — essentials**

PsA is an inflammatory arthritis linked with psoriasis. Joints, tendons (enthesitis), spine and nails can be involved — patterns vary a lot between people.

**Typical themes**
- Joint pain/swelling that may be asymmetric
- Sausage digits (dactylitis), tendon pain, nail changes
- Skin psoriasis (sometimes mild or in the past)
- Fatigue and flares

**UK care (general)**
- GP referral to rheumatology; dermatology often involved
- Treatments may include DMARDs or biologics — **only as prescribed**
- Movement, sleep, not smoking, and skin care all matter

We do not diagnose. Read **/conditions/psoriatic-arthritis**; self-care via **/exercises**, **/diet**, **/arthritis-flare-ups**.`,
    nextSteps: [
      "See GP/rheumatology for suspected PsA",
      "Pace movement with /exercises",
      "Plan for flares",
    ],
    related: [
      { type: "condition", title: "Psoriatic arthritis", url: "/conditions/psoriatic-arthritis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "gout",
    keywords: [
      "gout",
      "gout flare",
      "gout treatment",
      "uric acid",
      "big toe pain",
      "gout attack",
      "gout diet",
      "allopurinol",
      "febuxostat",
      "urate lowering",
      "colchicine",
    ],
    synonyms: ["gouty", "high urate", "podagra", "gout crystal"],
    priority: 14,
    chips: ["Anti-inflammatory diet", "Flare tips", "When to see a GP"],
    answer: `**Gout — essentials (educational only)**

Gout is caused by urate crystals in a joint — often a sudden, very painful, hot swollen joint (commonly the big toe).

**During a flare (general self-care themes)**
- Rest and elevate; ice with a cloth barrier
- Ask a pharmacist/GP about short-term pain relief options suitable for you
- Keep drinking fluids unless advised otherwise
- Do **not** stop long-term urate-lowering medicines during a flare unless your clinician says so

**Longer term**
- Urate-lowering therapy (e.g. allopurinol or febuxostat) is a clinical decision — see **/guides/febuxostat-for-gout**
- Limit excess alcohol, sugary drinks and very high-purine binge patterns; maintain a healthy weight
- Condition page: **/conditions/gout** · treatment overview: **/conditions/gout/treatment** · diet: **/diet**

Fever with a hot joint can also be infection — use **NHS 111**/urgent care if unsure.`,
    nextSteps: [
      "Read /conditions/gout/treatment",
      "Ask GP about prevention after repeated attacks",
      "Review diet patterns on /guides/diet",
    ],
    related: [
      { type: "condition", title: "Gout treatment", url: "/conditions/gout/treatment" },
      { type: "condition", title: "Gout", url: "/conditions/gout" },
      { type: "guide", title: "Febuxostat guide", url: "/guides/febuxostat-for-gout" },
      { type: "guide", title: "Diet pillar", url: "/guides/diet" },
    ],
  },
  {
    id: "as-axial",
    keywords: [
      "ankylosing spondylitis",
      "axial spondyloarthritis",
      "axial spa",
      "as arthritis",
      "inflammatory back",
    ],
    synonyms: ["bechterew", "spondyloarthritis", "hla-b27", "morning back stiffness"],
    priority: 13,
    chips: ["Back pain tips", "Exercise hub", "When to see a GP"],
    answer: `**Ankylosing spondylitis / axial spondyloarthritis — essentials**

These inflammatory conditions mainly affect the spine and sacroiliac joints. Pain often improves with movement and may wake you in the second half of the night; morning stiffness can last over 30–45 minutes.

**UK care themes**
- Early rheumatology assessment matters
- Physio-led exercise is a cornerstone — keep the spine moving
- Medicines (including biologics for some people) are clinician-prescribed only

Red flags (trauma, neurological deficits, fever, unexplained weight loss) need urgent assessment.

Read **/conditions/ankylosing-spondylitis** and build movement via **/exercises**.`,
    nextSteps: [
      "Discuss inflammatory back pain features with your GP",
      "Keep daily mobility — /exercises",
    ],
    related: [
      { type: "condition", title: "Ankylosing spondylitis", url: "/conditions/ankylosing-spondylitis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "jia",
    keywords: [
      "jia",
      "juvenile idiopathic arthritis",
      "juvenile arthritis",
      "child arthritis",
      "kids arthritis",
      "teen arthritis",
    ],
    synonyms: ["childhood arthritis", "paediatric rheumatology", "juvenile ra"],
    priority: 12,
    chips: ["Contact us", "Exercise hub", "When to see a doctor"],
    answer: `**Juvenile idiopathic arthritis (JIA) — orientation**

JIA is arthritis lasting 6+ weeks in someone under 16. There are several subtypes. Care belongs with **paediatric rheumatology** — not this chat.

**Parents/carers — general themes**
- Seek GP/urgent review for a limp, swollen joint, morning stiffness, or unexplained fever with joint symptoms in a child
- Treatment plans (including medicines) are specialist decisions
- Keep schooling, play and paced activity in the plan where clinicians advise

We provide adult-focused educational content. Condition overview: **/conditions/juvenile-arthritis**. Non-urgent charity contact: **/contact**.

Emergencies: **999** / **NHS 111**.`,
    nextSteps: [
      "Seek paediatric/GP review promptly for childhood joint swelling",
      "Read /conditions/juvenile-arthritis for orientation only",
    ],
    related: [
      { type: "condition", title: "Juvenile arthritis", url: "/conditions/juvenile-arthritis" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "fibromyalgia",
    keywords: [
      "fibromyalgia",
      "fibro",
      "widespread pain",
      "tender points",
      "fibromyalgia vs arthritis",
    ],
    synonyms: ["fm syndrome", "central sensitisation", "all over pain"],
    priority: 12,
    chips: ["Sleep tips", "Fatigue pacing", "Mental health"],
    answer: `**Fibromyalgia — essentials**

Fibromyalgia involves widespread pain, fatigue, sleep problems and often brain fog. Joints are usually not hot/swollen the way inflammatory arthritis is — but the two can coexist.

**What often helps (general)**
- Paced graded activity rather than boom-and-bust
- Sleep routines and stress reduction
- GP-led care; sometimes pain-management / psychology pathways
- Gentle movement: **/exercises**

Medicines, if used, are individual clinical decisions — we do not prescribe.

Read **/conditions/fibromyalgia** and **/arthritis-mental-health**. Sudden hot swollen joints with fever still need urgent assessment.`,
    nextSteps: [
      "Open /conditions/fibromyalgia",
      "Try paced short movement daily",
      "Discuss sleep and mood with your GP",
    ],
    related: [
      { type: "condition", title: "Fibromyalgia", url: "/conditions/fibromyalgia" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Mental health", url: "/arthritis-mental-health" },
    ],
  },
  {
    id: "pain",
    keywords: [
      "pain",
      "ache",
      "hurts",
      "sore",
      "pain relief",
      "painkiller",
      "paracetamol",
    ],
    synonyms: ["agony", "throbbing", "stiff and sore", "joint ache"],
    priority: 8,
    chips: ["NSAIDs overview", "Heat vs cold", "Exercise pacing"],
    answer: `**Pain management — general guidance (not prescribing)**

Combine paced movement, sleep, stress reduction and pharmacist/GP-advised pain relief.

**Often discussed in UK care**
- Topical NSAID gels for local joint pain
- Paracetamol within labelled limits if suitable for you
- Short courses of oral NSAIDs only with advice (stomach, kidney, heart, blood-pressure risks)
- Heat/cold, pacing, weight management, physio

**We never give personal doses.** Check combinations with your pharmacist — especially if you take blood thinners or heart medicines.

Opioids have limited role in most arthritis and carry dependence risk. More detail: **/guides/painkillers-and-nsaids**.

Urgent: sudden severe pain with hot swollen joint and fever → **NHS 111/999** as appropriate.`,
    nextSteps: ["Ask a pharmacist about topical options", "Pair relief with /exercises pacing"],
    related: [
      { type: "guide", title: "Painkillers & NSAIDs guide", url: "/guides/painkillers-and-nsaids" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
    ],
  },
  {
    id: "nsaids",
    keywords: [
      "nsaid",
      "nsaids",
      "ibuprofen",
      "naproxen",
      "anti inflammatory tablets",
      "voltarol",
      "diclofenac",
    ],
    synonyms: ["anti-inflammatory tablets", "oral nsaid", "ibuprofen gel"],
    priority: 12,
    chips: ["Pain relief basics", "Ask a pharmacist", "Flare tips"],
    answer: `**NSAIDs — educational overview (not prescribing)**

NSAIDs (e.g. ibuprofen, naproxen) reduce pain and inflammation for some people with arthritis. Gels/creams are often tried first for local joint pain.

**Important safety themes (ask a pharmacist/GP)**
- Stomach irritation/ulcer risk; kidney and blood-pressure effects; heart risk with some NSAIDs
- Interactions with blood thinners, certain blood-pressure and heart medicines
- Never combine multiple NSAIDs (tablet + another oral NSAID)
- Follow labelled limits; we **do not give personal doses**

Guide: **/guides/painkillers-and-nsaids**. Alternatives include pacing, topical options, heat/cold and physio — **/exercises**, **/arthritis-flare-ups**.`,
    nextSteps: [
      "Check suitability with a pharmacist before starting",
      "Read /guides/painkillers-and-nsaids",
    ],
    related: [
      { type: "guide", title: "Painkillers & NSAIDs", url: "/guides/painkillers-and-nsaids" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
    ],
  },
  {
    id: "steroids",
    keywords: [
      "steroid",
      "steroids",
      "prednisolone",
      "cortisone",
      "steroid injection",
      "corticosteroid",
    ],
    synonyms: ["steroid tablets", "depomedrone", "kenalog", "bridging steroid"],
    priority: 13,
    chips: ["DMARDs overview", "Flare tips", "When to seek care"],
    answer: `**Steroids for arthritis — educational only**

Corticosteroids (tablets, injections or infusions) can quickly calm inflammation. They are **prescribed and monitored by clinicians** — we never advise doses or taper schedules.

**General points often discussed in UK care**
- Bridging flares while longer-term medicines take effect
- Joint injections for selected inflamed joints
- Side-effect awareness: sleep, mood, blood sugar, blood pressure, bone health, infection risk with longer use
- Do not stop tablets suddenly without medical advice

Read **/guides/steroids-for-arthritis**. Urgent review if you are on steroids and develop severe illness, possible fracture after a fall, or vision changes (as advised by your team).`,
    nextSteps: [
      "Use your rheumatology/GP advice line for steroid questions",
      "Read /guides/steroids-for-arthritis",
    ],
    related: [
      { type: "guide", title: "Steroids guide", url: "/guides/steroids-for-arthritis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
    ],
  },
  {
    id: "dmards",
    keywords: [
      "dmard",
      "dmards",
      "disease modifying",
      "sulfasalazine",
      "hydroxychloroquine",
      "leflunomide",
      "azathioprine",
    ],
    synonyms: ["immune modulating", "conventional dmard", "csdmard"],
    priority: 13,
    chips: ["Methotrexate", "Biologics overview", "RA overview"],
    answer: `**DMARDs — educational overview (not prescribing)**

**Disease-modifying anti-rheumatic drugs (DMARDs)** slow inflammatory arthritis activity (RA, PsA and related conditions). Examples discussed in UK care include methotrexate, sulfasalazine, hydroxychloroquine, leflunomide and others.

**Shared themes**
- Regular blood monitoring is common
- Infection-risk awareness; vaccines — ask your team
- Never start, stop or change doses yourself
- Pregnancy/contraception planning may be essential for some DMARDs

Methotrexate-specific notes are available if you ask. Azathioprine orientation: **/guides/azathioprine-for-arthritis**. Always confirm with rheumatology/GP/pharmacist.

We do not provide doses or personal regimens.`,
    nextSteps: [
      "Keep monitoring appointments",
      "Use your rheumatology advice line for medicine queries",
    ],
    related: [
      { type: "guide", title: "Azathioprine guide", url: "/guides/azathioprine-for-arthritis" },
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "guide", title: "Guides hub", url: "/guides" },
    ],
  },
  {
    id: "biologics",
    keywords: [
      "biologic",
      "biologics",
      "anti-tnf",
      "humira",
      "adalimumab",
      "etanercept",
      "jak inhibitor",
      "biosimilar",
      "infusion arthritis",
    ],
    synonyms: ["biologic therapy", "monoclonal", "il-17", "il-6 inhibitor", "advanced therapy"],
    priority: 13,
    chips: ["DMARDs overview", "Infection awareness", "RA / PsA pages"],
    answer: `**Biologics & advanced therapies — educational only**

Biologic and targeted synthetic medicines (e.g. anti-TNF, other monoclonal antibodies, some JAK inhibitors) are used when inflammatory arthritis needs stronger control. They are **specialist-prescribed** with screening and monitoring.

**General themes**
- Infection-risk awareness; report fevers promptly to your team
- Screening (e.g. TB/hepatitis) before starting is common
- Vaccination advice comes from your clinical team
- Never share injectables or change schedules yourself

We do not name personal regimens or doses. Condition pages (**/conditions/rheumatoid-arthritis**, **/conditions/psoriatic-arthritis**) and **/guides** give orientation — your rheumatology team decides treatment.`,
    nextSteps: [
      "Use your rheumatology advice line for biologic questions",
      "Report significant infection symptoms promptly",
    ],
    related: [
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "condition", title: "Psoriatic arthritis", url: "/conditions/psoriatic-arthritis" },
      { type: "guide", title: "Guides hub", url: "/guides" },
    ],
  },
  {
    id: "methotrexate",
    keywords: ["methotrexate", "mtx"],
    synonyms: ["methotrexate weekly", "mtx side effects"],
    requireAny: ["methotrexate", "mtx"],
    priority: 14,
    chips: ["DMARDs overview", "RA overview", "When to seek care"],
    answer: `**Methotrexate — general information (not prescribing)**

Methotrexate is a common **DMARD** used in RA, psoriatic arthritis and related conditions. It reduces over-active immune activity that drives joint inflammation.

**Usually discussed with your team**
- Typically taken **once weekly** (not daily) — schedule and folic acid cover are clinician decisions
- Regular blood monitoring is routine
- Alcohol, infection risk, and pregnancy/contraception planning need personal advice
- Never start, stop or change doses yourself

Missed dose or feeling unwell → rheumatology advice line, GP or pharmacist — do not double up without advice.

**Urgent same-day help** for high fever, unexplained bruising, severe mouth ulcers, marked breathlessness, or yellowing of skin/eyes while on methotrexate.

We do not provide doses. Confirm everything with your clinical team.`,
    nextSteps: ["Use your rheumatology advice line for medicine queries", "Keep monitoring appointments"],
    related: [
      { type: "guide", title: "Guides hub", url: "/guides" },
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "supplements",
    keywords: [
      "supplement",
      "glucosamine",
      "chondroitin",
      "collagen",
      "glucosamine and collagen",
      "omega-3",
      "omega 3 for joints",
      "fish oil",
      "vitamin d",
      "vit d",
      "supplements for knee pain",
      "best joint supplement",
    ],
    synonyms: ["vitamins", "cod liver", "msm supplement", "omega 3 joints"],
    priority: 10,
    chips: ["Diet hub", "Pain relief basics", "Ask a pharmacist"],
    answer: `**Supplements — evidence snapshot (not a shopping list prescription)**

No supplement reverses arthritis. A few may help symptoms modestly for some people.

- **Omega-3 (fish oil)** — among the better-studied for inflammatory symptoms; ask a pharmacist
- **Curcumin / ginger** — modest evidence; check interactions
- **Glucosamine ± chondroitin** — mixed evidence for knee OA
- **Vitamin D** — UK autumn/winter low-dose advice is common; correct deficiency with GP guidance; avoid high doses without advice

Always check interactions (blood thinners, diabetes meds, etc.) with a **pharmacist or GP**. Give any trial enough weeks before judging — and stop if you feel unwell.

Hub: **/supplements** · diet first: **/guides/diet**.

Useful reads: **/blog/omega-3-foods-for-joints**, **/blog/best-supplement-for-knee-joint**, **/blog/glucosamine-vs-collagen** (educational comparisons — not product endorsements).`,
    nextSteps: ["Ask a pharmacist before combining supplements with medicines", "Prioritise diet and movement first"],
    related: [
      { type: "guide", title: "Supplements hub", url: "/supplements" },
      { type: "guide", title: "Turmeric & curcumin", url: "/supplements/turmeric" },
      { type: "article", title: "Omega-3 foods for joints", url: "/blog/omega-3-foods-for-joints" },
      { type: "article", title: "Glucosamine vs collagen", url: "/blog/glucosamine-vs-collagen" },
      { type: "guide", title: "Diet pillar", url: "/guides/diet" },
    ],
  },
  {
    id: "see-doctor",
    keywords: [
      "see a doctor",
      "see my gp",
      "when to see",
      "should i see",
      "go to gp",
      "visit the doctor",
      "red flag",
      "urgent care",
      "when to worry",
      "when to seek care",
      "should i go to hospital",
      "nhs 111",
      "emergency arthritis",
    ],
    synonyms: ["need a doctor", "gp appointment", "call 111", "a&e arthritis", "should i go to a and e", "seek help", "get checked"],
    priority: 12,
    chips: ["Flare tips", "Emergency signs", "Contact charity"],
    answer: `**When to see a doctor about joint pain**

**See your GP soon if:**
- Joint pain/stiffness lasting more than ~2 weeks
- Morning stiffness over ~30 minutes
- Swelling, warmth or redness
- Daily tasks becoming hard
- Fatigue with joint symptoms

**Urgent — NHS 111 / A&E / 999 as appropriate:**
- Hot, red, very swollen joint with fever or severe unwellness
- Inability to bear weight after injury
- Chest pain, sudden weakness, slurred speech, severe breathing difficulty

Early review of possible inflammatory arthritis can protect joints long-term. Non-urgent charity contact: **/contact**.`,
    nextSteps: ["Book GP if symptoms persist beyond two weeks", "Call 111/999 for red-flag symptoms"],
    related: [
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "guide", title: "Contact (non-urgent)", url: "/contact" },
      { type: "guide", title: "Guides", url: "/guides" },
    ],
  },
  {
    id: "weather-cold",
    keywords: [
      "cold weather",
      "weather and arthritis",
      "damp weather",
      "barometric",
      "winter arthritis",
      "cold makes pain worse",
    ],
    synonyms: ["rain and joints", "weather pain", "cold climate joints"],
    priority: 8,
    chips: ["Heat vs cold", "Layering & movement", "Flare tips"],
    answer: `**Cold, damp weather and arthritis**

Many people notice more ache in cold or damp weather. Evidence is mixed, but comfort strategies still help.

**Practical ideas**
- Layer clothing; keep hands/feet warm
- Gentle warm-up before outdoor walks
- Indoor movement on very cold days — **/exercises**
- Heat for stiffness; continue pacing rather than stopping activity

Weather does not replace medical review if symptoms suddenly change. See **/arthritis-flare-ups** if pain spikes.`,
    nextSteps: ["Plan an indoor movement option for cold days", "Use heat before gentle mobility"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "morning-stiffness",
    keywords: [
      "morning stiffness",
      "stiff in the morning",
      "stiffness lasting",
      "waking stiff",
    ],
    synonyms: ["morning ache", "takes ages to get going", "gel phenomenon"],
    priority: 10,
    chips: ["RA overview", "OA overview", "Gentle warm-up"],
    answer: `**Morning stiffness**

Brief stiffness that eases within ~30 minutes is common in OA. Stiffness lasting **over 30–60 minutes**, especially with warm swollen joints, can suggest inflammatory arthritis and deserves GP review.

**Easing the morning**
- Warm shower or wheat bag before mobility
- Gentle range-of-motion in bed or seated
- Lay out clothes/aids the night before to reduce rushing

Track duration for your clinician. Movement hub: **/exercises**. Condition overviews: **/conditions/osteoarthritis**, **/conditions/rheumatoid-arthritis**.`,
    nextSteps: [
      "Note how long stiffness lasts each morning",
      "Book GP if stiffness is prolonged with swelling",
    ],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
    ],
  },
  {
    id: "arthritis-general",
    keywords: [
      "arthritis",
      "joint pain",
      "what is arthritis",
      "types of arthritis",
      "symptoms of arthritis",
      "arthritis meaning",
      "do i have arthritis",
      "living with arthritis",
      "arthritis uk help",
      "joint arthritis",
    ],
    synonyms: ["joints hurt", "stiff joints", "arthritis help", "joint disease", "arthritic"],
    priority: 8,
    chips: ["OA overview", "RA overview", "Exercise hub", "PIP benefits"],
    answer: `**Arthritis — overview (head term)**

"Arthritis" is an umbrella for 100+ conditions that affect joints. In the UK the most common are **osteoarthritis (OA)** and inflammatory types such as **rheumatoid arthritis (RA)**. Others include PsA, gout, AS/axial SpA, JIA, and overlapping issues like fibromyalgia.

**Shared themes**
- Pain, stiffness, swelling, reduced movement
- Fatigue (especially inflammatory disease)
- Flares and better days

**Where to start on this site**
- Condition pillars → **/conditions/osteoarthritis**, **/conditions/arthritis**, **/library/arthritis**
- Movement (*Motion is Lotion*) → **/guides/exercise** and **/exercises**
- Pain relief (educational) → **/guides/arthritis-pain-relief**
- Diet & supplements caution → **/guides/diet**, **/supplements**
- UK benefits orientation → **/benefits-pip**

We are Living With Arthritis, charity **1218461**, independent of Versus Arthritis / Arthritis UK. Clinically reviewed themes are led by Louis Maxwell (HCPC **PH128483**). We do **not** diagnose — see your GP for personal assessment.`,
    nextSteps: [
      "Name the joint or type (OA, RA, gout…) for a more specific answer",
      "Browse the health library at /library",
      "Read /about to meet the charity",
    ],
    related: [
      { type: "condition", title: "Osteoarthritis guide", url: "/conditions/osteoarthritis" },
      { type: "guide", title: "Exercise for arthritis", url: "/guides/exercise" },
      { type: "guide", title: "Arthritis pain relief", url: "/guides/arthritis-pain-relief" },
      { type: "guide", title: "Benefits & PIP", url: "/benefits-pip" },
      { type: "article", title: "Health library", url: "/library" },
      { type: "guide", title: "About us", url: "/about" },
    ],
  },
  {
    id: "turmeric-curcumin",
    keywords: [
      "turmeric",
      "curcumin",
      "turmeric for arthritis",
      "turmeric supplement",
      "is turmeric good for arthritis",
      "curcumin for joints",
      "turmeric capsules",
    ],
    synonyms: ["golden milk", "curcuma", "turmeric and black pepper", "piperine turmeric"],
    requireAny: ["turmeric", "curcumin", "curcuma"],
    priority: 14,
    chips: ["Diet hub", "Supplements hub", "Glucosamine"],
    answer: `**Turmeric / curcumin for arthritis (educational)**

Turmeric (and its active compound **curcumin**) is widely searched for joint pain. Evidence is **modest** — some trials in knee osteoarthritis suggest symptom help at study doses of curcumin extract, especially with black pepper (**piperine**) for absorption. It is **not** a cure, does **not** reverse joint damage, and is not a substitute for prescribed treatment.

**Practical cautions**
- Cooking with turmeric powder alone rarely matches trial doses
- Can interact with blood thinners and some medicines — ask a **pharmacist or GP**
- Stop and seek advice if you feel unwell

**Read next (real pages on this site)**
- Supplement guide → **/supplements/turmeric**
- Evidence blog → **/blog/turmeric-for-arthritis**
- Library note → **/library/turmeric**
- Diet first → **/guides/diet** · hub → **/supplements**`,
    nextSteps: [
      "Read /supplements/turmeric before buying anything",
      "Check interactions with your pharmacist",
      "Prioritise movement and diet pillars",
    ],
    related: [
      { type: "guide", title: "Turmeric & curcumin guide", url: "/supplements/turmeric" },
      { type: "article", title: "Turmeric for arthritis blog", url: "/blog/turmeric-for-arthritis" },
      { type: "article", title: "Turmeric library note", url: "/library/turmeric" },
      { type: "guide", title: "Diet pillar", url: "/guides/diet" },
      { type: "guide", title: "Supplements hub", url: "/supplements" },
    ],
  },
  {
    id: "walking-shoes",
    keywords: [
      "walking shoes",
      "best walking shoes",
      "shoes for arthritis",
      "trainers for arthritis",
      "footwear for arthritis",
      "best shoes for osteoarthritis",
      "arthritis walking shoes",
      "shoes for knee pain",
    ],
    synonyms: ["supportive shoes", "cushioned trainers", "orthotic shoes", "footwear knee oa"],
    requireAny: ["shoe", "shoes", "trainer", "trainers", "footwear"],
    priority: 13,
    chips: ["Exercise hub", "OA overview", "Knee arthritis"],
    answer: `**Walking shoes for arthritis (UK)**

Supportive, cushioned walking shoes can make daily steps more comfortable with knee, hip or foot arthritis — but **shoe choice is personal** and this chat cannot prescribe a brand.

**What often helps**
- Wide toe box, secure fastening, cushioned midsole
- Try shoes later in the day when feet are a little swollen
- Combine with gradual walking and joint-friendly exercise — *Motion is Lotion*

**Read next**
- UK walking-shoes blog → **/blog/best-walking-shoes-arthritis-uk**
- Exercise pillar → **/guides/exercise** · hub → **/exercises**
- OA overview → **/conditions/osteoarthritis**

If pain is sudden, hot/red with fever, or you cannot weight-bear, seek **NHS 111** / urgent care — not footwear advice.`,
    nextSteps: [
      "Read /blog/best-walking-shoes-arthritis-uk",
      "Build a gentle walking plan via /guides/exercise",
      "Ask podiatry or physio if foot shape or deformity is complex",
    ],
    related: [
      { type: "article", title: "Best walking shoes for arthritis (UK)", url: "/blog/best-walking-shoes-arthritis-uk" },
      { type: "guide", title: "Exercise for arthritis", url: "/guides/exercise" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
    ],
  },
];

export const GENERIC_TOPIC: KnowledgeTopic = {
  id: "generic",
  keywords: [],
  chips: SUGGESTED_CHIPS,
  answer: `**I can help with UK-safe arthritis topics**

Try one of these (or rephrase your question):
- Pain & joints — knee, hip, hand, back, neck
- Conditions — OA, RA, PsA, gout, AS, JIA, fibromyalgia
- Flares, heat/cold, fatigue, sleep, mental health
- Exercise & diet hubs — **/exercises**, **/diet**, **/blog**
- Medicines (educational) — NSAIDs, steroids, DMARDs, biologics
- PIP / benefits, work adjustments, waiting lists
- Who we are (charity **1218461**), donate & contact

**Suggested questions**
- "Safe exercises for knee pain"
- "Anti-inflammatory diet"
- "How do I manage a flare?"
- "Can I claim PIP with arthritis?"
- "What is psoriatic arthritis?"
- "Who are you?"

Browse **/exercises**, **/diet**, **/arthritis-flare-ups**, **/guides/benefits-pip**, **/blog**, **/about** or **/contact** (email **info@livingwitharthritis.org.uk** · **07760 512 084**).

**Urgent symptoms** (hot swollen joint with fever, chest pain, severe breathlessness, or crisis): **999**, **NHS 111**, or Samaritans **116 123** — not chat.`,
  nextSteps: [
    "Ask about a joint, condition, diet, flares or benefits",
    "Explore /exercises, /diet and /blog",
    "Email info@livingwitharthritis.org.uk for non-urgent help",
  ],
  related: [
    { type: "exercise", title: "Exercise hub", url: "/exercises" },
    { type: "guide", title: "Diet hub", url: "/diet" },
    { type: "guide", title: "Benefits & PIP", url: "/guides/benefits-pip" },
    { type: "article", title: "Blog", url: "/blog" },
    { type: "guide", title: "About us", url: "/about" },
    { type: "guide", title: "Contact", url: "/contact" },
  ],
};
