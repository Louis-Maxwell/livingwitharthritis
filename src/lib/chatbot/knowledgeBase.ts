/**
 * Living With Arthritis — local chatbot knowledge base.
 * Educational UK guidance only: no diagnosis, no doses/prescribing.
 * Signpost GP / NHS 111 / 999. Charity 1218461 · HCPC PH128483.
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
};

export const SAFETY_DISCLAIMER =
  "\n\n---\n\n_General guidance from Living With Arthritis (registered charity 1218461). Educational information only — not a diagnosis or prescription. Speak with your GP, pharmacist or rheumatology team before changing medication or starting a new programme. For urgent symptoms call **NHS 111**; for emergencies call **999**._";

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
    synonyms: ["emergency", "999", "life threatening"],
    priority: 100,
    answer: `**This may need emergency care**

If you have **chest pain**, sudden weakness or slurred speech, severe difficulty breathing, or swelling of the face/throat, call **999** now.

For a joint that is suddenly **hot, red, very swollen** with fever or feeling very unwell, seek urgent care today (possible joint infection) — call **NHS 111** or go to A&E if you cannot get through.

This chat cannot replace emergency services.`,
    nextSteps: [
      "Call 999 for life-threatening symptoms",
      "Call NHS 111 for urgent but non-life-threatening advice",
    ],
    related: [
      { type: "guide", title: "Contact us", url: "/contact", description: "Non-urgent charity contact" },
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
    synonyms: ["about us", "independent", "who runs", "founder", "ph128483", "1218461"],
    priority: 20,
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
    keywords: ["donate", "donation", "gift aid", "contact", "email you", "phone number", "whatsapp", "get in touch", "helpline"],
    synonyms: ["support the charity", "how to help", "volunteer"],
    priority: 15,
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
    id: "pip-benefits",
    keywords: ["pip", "personal independence payment", "disability benefit", "dla", "attendance allowance", "universal credit", "benefits", "claim pip"],
    synonyms: ["welfare", "disability support", "daily living component", "mobility component"],
    priority: 18,
    answer: `**PIP and arthritis benefits (UK) — orientation only**

**Personal Independence Payment (PIP)** is a working-age disability benefit for people who need help with daily living or getting around because of a long-term condition — including many forms of arthritis. It is **not means-tested** and you can claim whether or not you work.

**In broad terms:**
- Two components: **daily living** and **mobility** (standard or enhanced rates after assessment).
- Assessment focuses on how your condition affects **activities** (cooking, dressing, managing treatment, moving around) — not only diagnosis labels.
- Keep a brief symptom/flare diary and examples of bad days; assessors look at reliability, safety, and needing help or aids.

**Practical next steps:**
- Read our plain-English hub: **/guides/benefits-pip**
- Check current rules on GOV.UK
- Citizens Advice or a local welfare-rights adviser can help with forms and mandatory reconsiderations

We cannot assess your entitlement — rules change.`,
    nextSteps: [
      "Read /guides/benefits-pip",
      "Gather examples of how arthritis affects daily tasks on bad days",
      "Consider Citizens Advice support with the form",
    ],
    related: [
      { type: "guide", title: "Benefits & PIP guide", url: "/guides/benefits-pip", description: "UK PIP orientation for arthritis" },
      { type: "guide", title: "Benefits hub", url: "/benefits-pip" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "access-to-work",
    keywords: ["access to work", "work", "employer", "workplace", "job", "equality act", "reasonable adjustment", "occupational health", "sick leave", "fit note"],
    synonyms: ["at work", "working with arthritis", "disability at work", "adjustments"],
    priority: 12,
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
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
  {
    id: "waiting-lists",
    keywords: ["waiting list", "nhs wait", "referral", "rheumatology wait", "physio wait", "how long for", "appointment delay"],
    synonyms: ["waiting times", "backlog", "queue for physio", "seen by specialist"],
    priority: 10,
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
    keywords: ["newly diagnosed", "just diagnosed", "new diagnosis", "first diagnosed", "what now", "where do i start"],
    synonyms: ["recently diagnosed", "new to arthritis", "diagnosis today"],
    priority: 14,
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
    keywords: ["flare", "flare-up", "flare up", "flaring", "bad flare", "sudden worse"],
    synonyms: ["flareups", "exacerbation", "symptom spike"],
    priority: 16,
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
    keywords: ["heat", "cold", "ice pack", "hot water bottle", "wheat bag", "heat pad", "ice for", "hot or cold"],
    synonyms: ["warmth", "cryotherapy", "thermal"],
    priority: 9,
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
    keywords: ["fatigue", "exhausted", "tired all the time", "no energy", "brain fog", "worn out"],
    synonyms: ["energy crash", "worn down", "lethargy"],
    priority: 11,
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
    ],
  },
  {
    id: "knee-exercise",
    keywords: ["knee pain", "knee exercise", "exercises for knee", "knee arthritis", "sore knee", "bad knee"],
    synonyms: ["patella", "knees hurt", "osteoarthritis knee", "oa knee"],
    priority: 13,
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
    keywords: ["hip pain", "hip exercise", "exercises for hip", "hip arthritis", "sore hip"],
    synonyms: ["hips hurt", "oa hip", "osteoarthritis hip"],
    priority: 12,
    answer: `**Hip pain and exercise**

Strong glutes and gentle mobility often ease OA-related hip pain.

**Useful moves**
- Glute bridges
- Sit-to-stands
- Side-lying leg lifts (within comfort)
- Walking, cycling, swimming

Avoid forcing deep stretches into sharp groin pain. Sudden inability to weight-bear after a fall needs urgent assessment (possible fracture), especially if you take steroids.

Browse **/exercises** for paced programmes.`,
    nextSteps: ["Build glute strength 2–3 times weekly", "Use /exercises for guided sessions"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "hand-exercise",
    keywords: ["hand pain", "hand exercise", "finger", "wrist pain", "exercises for hands", "hand arthritis"],
    synonyms: ["fingers stiff", "thumb pain", "oa hands"],
    priority: 11,
    answer: `**Hand and wrist arthritis — movement tips**

Short, frequent mobility beats occasional hard sessions.

**Ideas**
- Gentle tendon glides and fist open/close in warm water
- Thumb opposition and soft putty or towel squeezes (without sharp pain)
- Night splints for some people with base-of-thumb OA — ask OT/physio
- Topical gels; pacing gripping tasks

Inflammatory signs (warm swelling, long morning stiffness) deserve GP review for possible inflammatory arthritis.

See **/exercises** for hand-friendly routines.`,
    nextSteps: ["Try warm-water hand mobility each morning", "Pace gripping and jar-opening tasks"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
    ],
  },
  {
    id: "shoulder-neck-exercise",
    keywords: ["shoulder pain", "neck pain", "shoulder exercise", "neck exercise", "frozen shoulder"],
    synonyms: ["stiff neck", "shoulder arthritis"],
    priority: 10,
    answer: `**Shoulder and neck — gentle movement**

Posture breaks, scapular squeezes and supported range-of-motion often help stiffness. Avoid aggressive overhead loading during flares.

Red flags needing urgent care: trauma with severe pain, unexplained weight loss, fever with joint pain, progressive weakness, or neurological symptoms in arms/legs.

Routines: **/exercises** including neck/shoulder pages where listed.`,
    nextSteps: ["Alternate posture every 30–40 minutes", "Use /exercises for seated options"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "exercise", title: "Neck exercises", url: "/exercises/neck-arthritis-exercises" },
    ],
  },
  {
    id: "ankle-foot-exercise",
    keywords: ["ankle pain", "foot pain", "ankle exercise", "foot exercise", "ankle arthritis"],
    synonyms: ["sore ankles", "plantar", "feet hurt"],
    priority: 9,
    answer: `**Ankle and foot arthritis**

Supportive shoes, calf stretches and gentle ankle circles help many people. Pool exercise reduces load.

See **/exercises/ankle-arthritis-exercises** and the main **/exercises** hub. Sudden hot swollen joint with fever → urgent care.`,
    nextSteps: ["Check footwear wear", "Try pool or seated ankle mobility"],
    related: [
      { type: "exercise", title: "Ankle exercises", url: "/exercises/ankle-arthritis-exercises" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
    ],
  },
  {
    id: "anti-inflammatory-diet",
    keywords: ["anti-inflammatory", "anti inflammatory", "inflammation diet", "mediterranean", "best foods", "foods for arthritis", "anti-inflammatory foods", "anti inflammatory foods"],
    synonyms: ["eat for joints", "inflammatory foods", "omega-3 food"],
    priority: 15,
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

Modest weight loss, if relevant, often eases knee and hip load. Recipes and plans: **/diet**.`,
    nextSteps: ["Shift one meal a day toward a Mediterranean plate", "Open /diet for UK-focused ideas"],
    related: [
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "guide", title: "Mediterranean diet", url: "/diet/mediterranean-diet-for-arthritis" },
      { type: "guide", title: "Foods to avoid", url: "/diet/foods-to-avoid-with-arthritis" },
    ],
  },
  {
    id: "diet-general",
    keywords: ["diet", "nutrition", "what to eat", "meal plan", "weight loss", "lose weight", "foods to avoid"],
    synonyms: ["eating", "calories", "healthy eating"],
    priority: 8,
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
    keywords: ["osteoarthritis exercise", "safe exercises for oa", "exercises for osteoarthritis", "oa exercise", "safe exercises for osteoarthritis"],
    synonyms: ["exercise for oa", "oa workout"],
    priority: 14,
    answer: `**Safe exercises for osteoarthritis**

Low-impact movement is one of the most effective OA treatments — it eases stiffness, strengthens supporting muscles and lifts mood.

**Aerobic (most days, 20–30 min):** walking, stationary cycling, swimming/aqua
**Strength (2–3×/week):** sit-to-stands, straight-leg raises, wall sits, glute bridges
**Flexibility & balance:** gentle stretches, tai chi, chair yoga

Discomfort that settles quickly can be OK; sharp or prolonged pain means ease back. Free routines: **/exercises**.`,
    nextSteps: ["Pick one aerobic and one strength habit this week", "Open /exercises"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
    ],
  },
  {
    id: "exercise-general",
    keywords: ["exercise", "workout", "physio", "walking", "swimming", "activity", "tai chi", "yoga", "pilates", "movement"],
    synonyms: ["gym", "stretching", "strength training", "aqua"],
    priority: 7,
    answer: `**Exercise with arthritis — practical UK guidance**

Movement is medicine for many people with OA and inflammatory arthritis when paced sensibly. **Motion is Lotion.**

**Helpful pattern**
- Low-impact aerobic most days (walk, cycle, swim)
- Strength 2–3×/week for muscles that support sore joints
- Flexibility and balance little and often (tai chi, gentle yoga)

On flare days, reduce intensity rather than stopping completely. Browse **/exercises**. A physiotherapist (including First Contact Practitioners in many GP practices) can tailor a plan.`,
    nextSteps: ["Visit /exercises", "Start with 10–15 minutes and build"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "exercise", title: "Tai chi for arthritis", url: "/exercises/tai-chi-for-arthritis" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "ra",
    keywords: ["rheumatoid", "what is ra", "rheumatoid arthritis"],
    synonyms: ["autoimmune arthritis", "inflammatory arthritis ra"],
    priority: 13,
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

Only a clinician can diagnose RA. We do not prescribe. Learn more under **/conditions** and self-care via **/exercises** and **/diet**.`,
    nextSteps: ["See GP promptly for suspected inflammatory arthritis", "Use /exercises for paced movement"],
    related: [
      { type: "condition", title: "Rheumatoid arthritis", url: "/conditions/rheumatoid-arthritis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
    ],
  },
  {
    id: "oa-general",
    keywords: ["osteoarthritis", "what is oa", "wear and tear"],
    synonyms: ["degenerative joint", "cartilage wear"],
    priority: 12,
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

Explore **/exercises** and condition pages. Hot/red joint with fever needs urgent care.`,
    nextSteps: ["Build a weekly movement habit", "Open /exercises"],
    related: [
      { type: "condition", title: "Osteoarthritis", url: "/conditions/osteoarthritis" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
    ],
  },
  {
    id: "pain",
    keywords: ["pain", "ache", "hurts", "sore", "pain relief", "painkiller", "nsaid", "ibuprofen", "paracetamol", "naproxen"],
    synonyms: ["agony", "throbbing", "stiff and sore"],
    priority: 8,
    answer: `**Pain management — general guidance (not prescribing)**

Combine paced movement, sleep, stress reduction and pharmacist/GP-advised pain relief.

**Often discussed in UK care**
- Topical NSAID gels for local joint pain
- Paracetamol within labelled limits if suitable for you
- Short courses of oral NSAIDs only with advice (stomach, kidney, heart, blood-pressure risks)
- Heat/cold, pacing, weight management, physio

**We never give personal doses.** Check combinations with your pharmacist — especially if you take blood thinners or heart medicines.

Opioids have limited role in most arthritis and carry dependence risk.

Urgent: sudden severe pain with hot swollen joint and fever → **NHS 111/999** as appropriate.`,
    nextSteps: ["Ask a pharmacist about topical options", "Pair relief with /exercises pacing"],
    related: [
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Guides", url: "/guides" },
    ],
  },
  {
    id: "methotrexate",
    keywords: ["methotrexate", "mtx", "dmard"],
    synonyms: ["immune suppressant", "disease modifying"],
    priority: 14,
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
    keywords: ["supplement", "glucosamine", "chondroitin", "collagen", "turmeric", "curcumin", "omega-3", "fish oil", "vitamin d", "vit d"],
    synonyms: ["vitamins", "cod liver"],
    priority: 10,
    answer: `**Supplements — evidence snapshot (not a shopping list prescription)**

No supplement reverses arthritis. A few may help symptoms modestly for some people.

- **Omega-3 (fish oil)** — among the better-studied for inflammatory symptoms; ask a pharmacist
- **Curcumin / ginger** — modest evidence; check interactions
- **Glucosamine ± chondroitin** — mixed evidence for knee OA
- **Vitamin D** — UK autumn/winter low-dose advice is common; correct deficiency with GP guidance; avoid high doses without advice

Always check interactions (blood thinners, diabetes meds, etc.) with a **pharmacist or GP**. Give any trial enough weeks before judging — and stop if you feel unwell.`,
    nextSteps: ["Ask a pharmacist before combining supplements with medicines", "Prioritise diet and movement first"],
    related: [
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "guide", title: "Guides", url: "/guides" },
    ],
  },
  {
    id: "see-doctor",
    keywords: ["see a doctor", "see my gp", "when to see", "should i see", "go to gp", "visit the doctor", "red flag"],
    synonyms: ["need a doctor", "gp appointment", "call 111"],
    priority: 12,
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

Early review of possible inflammatory arthritis can protect joints long-term.`,
    nextSteps: ["Book GP if symptoms persist beyond two weeks", "Call 111/999 for red-flag symptoms"],
    related: [
      { type: "guide", title: "Flare-ups", url: "/arthritis-flare-ups" },
      { type: "guide", title: "Contact (non-urgent)", url: "/contact" },
    ],
  },
  {
    id: "arthritis-general",
    keywords: ["arthritis", "joint pain", "what is arthritis", "types of arthritis", "symptoms of arthritis"],
    synonyms: ["joints hurt", "stiff joints"],
    priority: 5,
    answer: `**Arthritis — overview**

"Arthritis" covers 100+ conditions affecting joints. Most common in the UK: **osteoarthritis (OA)** and inflammatory types such as **rheumatoid arthritis (RA)**.

**Shared themes**
- Pain, stiffness, swelling, reduced movement
- Fatigue (especially inflammatory disease)
- Flares and better days

**Self-care pillars we emphasise**
- Movement (*Motion is Lotion*) → **/exercises**
- Anti-inflammatory eating → **/diet**
- Flare plans → **/arthritis-flare-ups**
- UK benefits orientation → **/guides/benefits-pip**

We are Living With Arthritis, charity **1218461**, independent of Arthritis UK. We do not diagnose — see your GP for personal assessment.`,
    nextSteps: ["Tell us the joint or topic you care about most", "Browse /about to meet the charity"],
    related: [
      { type: "exercise", title: "Exercise hub", url: "/exercises" },
      { type: "guide", title: "Diet hub", url: "/diet" },
      { type: "guide", title: "About us", url: "/about" },
    ],
  },
];

export const GENERIC_TOPIC: KnowledgeTopic = {
  id: "generic",
  keywords: [],
  answer: `**Thanks for your question.**

I can help with UK-safe **arthritis** topics — pain, OA/RA, flares, exercise by joint, diet, fatigue, heat/cold, PIP/benefits, waiting lists, work/Access to Work, newly diagnosed guidance, and who we are.

Try asking:
- "Safe exercises for knee pain"
- "Anti-inflammatory diet"
- "How do I manage a flare?"
- "Can I claim PIP with arthritis?"
- "Who are you?"

Browse **/exercises**, **/diet**, **/arthritis-flare-ups**, **/guides/benefits-pip**, **/about** or **/contact**.

Urgent symptoms (hot swollen joint with fever, chest pain, severe breathlessness): **999** or **NHS 111** — not chat.`,
  nextSteps: [
    "Ask about a joint, diet, flares or benefits",
    "Explore /exercises and /diet",
  ],
  related: [
    { type: "exercise", title: "Exercise hub", url: "/exercises" },
    { type: "guide", title: "Diet hub", url: "/diet" },
    { type: "guide", title: "Benefits & PIP", url: "/guides/benefits-pip" },
    { type: "guide", title: "About us", url: "/about" },
    { type: "guide", title: "Contact", url: "/contact" },
  ],
};
