// Offline/network-failure fallback responses for the Arthritis AI chat.
// Used when the live AI backend is unreachable (e.g. blocked by preview proxy,
// flaky network) so visitors always see useful, safe general guidance.
//
// All answers are GENERAL guidance only — never diagnosis or prescribing —
// and signpost professional care.

export const FALLBACK_DISCLAIMER =
  "\n\n---\n\n_Live AI is temporarily unavailable, so this is a general answer from our arthritis knowledge base. This is not medical advice — please discuss with your GP, pharmacist or rheumatology team before changing medication or starting a new programme._";

type Entry = { keywords: RegExp; answer: string };

const ENTRIES: Entry[] = [
  {
    keywords: /\b(anti[- ]?inflammatory|inflammation).*(food|diet|eat)|\b(food|diet|eat).*(anti[- ]?inflammatory|inflammation)\b/i,
    answer: `**Best anti-inflammatory foods for arthritis**

A **Mediterranean-style diet** has the strongest evidence for reducing arthritis-related inflammation and joint pain.

**Eat more of:**
- **Oily fish** (salmon, mackerel, sardines) — 2 portions a week for omega-3.
- **Extra-virgin olive oil** as your main cooking fat.
- **Colourful vegetables and fruit** — berries, leafy greens, peppers, tomatoes.
- **Whole grains** — oats, brown rice, wholewheat pasta.
- **Pulses, nuts and seeds** — lentils, chickpeas, walnuts, flaxseed.
- **Herbs and spices** — turmeric (with black pepper), ginger, garlic.

**Eat less of:**
- Ultra-processed foods, sugary drinks, refined carbohydrates.
- Fried and heavily processed meats.
- Excess alcohol.

A 2018 *Frontiers in Nutrition* review and NICE NG226 both support Mediterranean eating for joint health. Combine it with gentle weight management — every 1 kg lost takes ~4 kg of load off the knees.`,
  },
  {
    keywords: /\b(osteoarthritis|\boa\b).*(exercise|workout|activity)|exercise.*(osteoarthritis|\boa\b)|safe exercise/i,
    answer: `**Safe exercises for osteoarthritis**

Low-impact movement is one of the most effective treatments for OA — it eases stiffness, builds the muscles that protect the joint, and lifts mood.

**Aerobic (most days, 20–30 min):**
- Walking on flat ground
- Stationary cycling
- Swimming or aqua-aerobics (excellent for knees and hips)

**Strength (2–3× per week):**
- **Straight-leg raises** — 2 sets of 10
- **Sit-to-stands** from a chair — 2 sets of 10
- **Wall sits** — hold 10–20 seconds, repeat 5×
- **Glute bridges** — 2 sets of 10

**Flexibility and balance (daily, 5–10 min):**
- Gentle stretches for calves, hamstrings, hip flexors
- Tai chi or chair yoga

**Rules of thumb:**
- A little discomfort during exercise is OK; sharp pain is not.
- "Soreness rule": if joint pain lasts >2 hours after exercise, ease back next time.
- Start small and build slowly.

Our free Exercise Hub has follow-along videos tailored to joint and ability.`,
  },
  {
    keywords: /\b(rheumatoid|\bra\b)\b/i,
    answer: `**Rheumatoid arthritis (RA) — the essentials**

RA is an **autoimmune** condition where the immune system attacks the lining of the joints, causing pain, swelling and stiffness — usually symmetrically (e.g. both hands, both feet).

**Typical signs:**
- Morning stiffness lasting **more than 30–60 minutes**
- Warm, swollen, tender small joints (fingers, wrists, toes)
- Fatigue, low-grade fever, general unwellness
- Symptoms come in **flares**

**How it's managed in the UK:**
- Early referral to **rheumatology** — ideally within 6 weeks of symptoms (NICE NG100).
- **DMARDs** (e.g. methotrexate) to slow the disease.
- **Biologics** if DMARDs aren't enough.
- Short courses of steroids for flares.
- Physiotherapy, occupational therapy, and lifestyle support.

**What helps day-to-day:**
- Anti-inflammatory Mediterranean diet
- Gentle, regular movement — even on bad days
- Good sleep and stress management
- Stop smoking (smoking worsens RA and reduces drug effectiveness)

Only a clinician can diagnose RA — typically through blood tests (anti-CCP, RF, CRP) and imaging.`,
  },
  {
    keywords: /\b(when|should).*(see|visit|go to).*(doctor|gp)|see a doctor/i,
    answer: `**When to see a doctor about joint pain**

**See your GP soon if you have:**
- Joint pain or stiffness lasting **more than 2 weeks**
- Morning stiffness lasting **more than 30 minutes**
- Swelling, warmth or redness around a joint
- Difficulty with daily tasks (gripping, walking, stairs)
- Unexplained fatigue alongside joint symptoms

**Call NHS 111 or seek urgent care if:**
- A joint is suddenly hot, red, very swollen, and you feel unwell or feverish (possible joint infection)
- You can't bear weight after an injury
- Severe pain not eased by usual pain relief

**Call 999 if:**
- Chest pain, sudden weakness or slurred speech
- Severe difficulty breathing or swelling of the face/throat

Early diagnosis of inflammatory arthritis (e.g. RA, PsA) makes a real difference — don't wait it out.`,
  },
  {
    keywords: /\b(supplement|glucosamine|chondroitin|collagen|turmeric|curcumin|omega.?3|fish oil|vitamin)/i,
    answer: `**Supplements for arthritis — what the evidence says**

No supplement reverses arthritis, but a few may help symptoms modestly.

- **Omega-3 (fish oil)** — best evidence; ~2 g EPA+DHA/day may reduce RA joint tenderness and morning stiffness.
- **Curcumin (turmeric extract)** — ~1000 mg/day with piperine; meta-analyses show pain relief similar to NSAIDs in knee OA.
- **Ginger** — ~500–1000 mg/day extract; modest pain reduction.
- **Glucosamine + chondroitin** — mixed evidence; some people find it helps knee OA over 8–12 weeks.
- **Collagen peptides** — emerging evidence for joint comfort, less established than the above.
- **Vitamin D** — worth checking levels, especially in the UK winter; deficiency worsens pain.

**Before starting any supplement:**
- Check with your **GP or pharmacist** — many interact with blood thinners, diabetes meds, or chemotherapy.
- Buy from reputable brands with third-party testing.
- Give it **8–12 weeks** before judging effect.`,
  },
  {
    keywords: /\b(flare|flare[- ]up)/i,
    answer: `**Managing an arthritis flare**

A flare is a temporary worsening of pain, swelling and fatigue. The goal is to calm it down without losing all your progress.

**In the first 24–48 hours:**
- **Rest the joint** but keep gently moving — full bed rest stiffens you up.
- **Ice** for hot/swollen joints (20 min, with a cloth barrier).
- **Heat** for stiff joints (warm bath, wheat bag).
- Take your usual pain relief as prescribed (paracetamol, topical NSAID gel).

**Over the next few days:**
- Drop exercise intensity by ~50%, but don't stop.
- Prioritise sleep — aim for 8 hours.
- Reduce stress: many flares are triggered by stress, illness, or poor sleep.
- Eat anti-inflammatory meals; reduce alcohol and ultra-processed foods.

**Contact your rheumatology team if:**
- The flare lasts more than 1–2 weeks
- You have new symptoms (rash, fever, eye pain)
- Your usual medication isn't controlling it

Keep a brief flare diary — it helps your clinician spot triggers.`,
  },
  {
    keywords: /\b(pain relief|painkiller|nsaid|ibuprofen|paracetamol|naproxen)/i,
    answer: `**Pain relief for arthritis — general guidance**

A stepped approach works best, alongside exercise and weight management.

**First line:**
- **Topical NSAID gel** (e.g. ibuprofen, diclofenac) — rubbed into the painful joint. NICE recommends this **before** oral painkillers for knee/hand OA.
- **Paracetamol** for mild pain (max 4 g/day in adults).

**Second line — short courses only, with food:**
- **Oral NSAIDs** (ibuprofen, naproxen) — effective but can affect the stomach, kidneys and blood pressure. Always with a stomach protector (PPI) if used regularly.

**Other options your GP may consider:**
- Capsaicin cream
- Duloxetine for chronic pain
- Steroid joint injection for severe flares
- Referral to physiotherapy or pain management

**Avoid or use with caution:**
- Opioids — limited evidence in arthritis, high risk of dependence.
- Long-term daily NSAIDs without medical review.

Always check with your **pharmacist** before combining painkillers, especially if you take blood thinners, blood pressure or heart medication.`,
  },
  {
    keywords: /\b(diet|eat|nutrition|food|weight)/i,
    answer: `**Eating well with arthritis**

The single most powerful dietary change for joint health is moving towards a **Mediterranean pattern**:

- **Plant-forward plate** — half vegetables and fruit, a quarter whole grains, a quarter protein.
- **Healthy fats** — extra-virgin olive oil, nuts, seeds, oily fish.
- **Lean protein** — fish, beans, lentils, eggs, modest poultry; less red and processed meat.
- **Limit** sugar, refined carbs, ultra-processed foods and alcohol.

**If you carry extra weight:**
Losing even **5–10%** of body weight significantly reduces knee and hip OA pain. Pair small calorie reductions with strength training to preserve muscle.

**Hydration and gut health matter too** — aim for 1.5–2 L water/day and include fibre-rich foods (oats, beans, vegetables) which support a healthier inflammatory profile.

For UK-specific recipes and meal plans, see our free Diet Hub.`,
  },
  {
    keywords: /\b(tai chi|yoga|pilates|stretch|flexibility)/i,
    answer: `**Tai chi, yoga and gentle movement**

**Tai chi** has strong evidence for OA — multiple trials show it reduces knee pain, improves balance and lowers fall risk. NICE includes it in OA exercise recommendations.

**Yoga** (chair or gentle Hatha) improves flexibility, reduces stiffness and helps mood. Avoid hot/Bikram styles in active flares.

**How to start safely:**
- Begin with a class for people with arthritis or older adults.
- 2–3 sessions a week, 20–40 minutes.
- Skip any pose that causes sharp joint pain.
- Tell the instructor about your condition.

Our free Exercise Hub has seated tai chi and beginner tai chi videos designed for arthritis.`,
  },
];

const GENERIC_ANSWER = `**Thanks for your question.**

I can help with **arthritis-related** topics — symptoms, exercises, anti-inflammatory diet, pain relief, supplements, flare management, and UK care pathways.

Some things you can ask:
- "What are the best anti-inflammatory foods?"
- "Safe exercises for knee osteoarthritis"
- "How do I manage a flare-up?"
- "When should I see a doctor about joint pain?"
- "What supplements help with arthritis?"

If your concern is urgent (sudden severe pain, a hot swollen joint with fever, chest pain or weakness), please contact **NHS 111** or call **999** rather than waiting on chat.`;

export function getFallbackAnswer(userInput: string): string {
  const text = userInput.trim();
  if (!text) return GENERIC_ANSWER + FALLBACK_DISCLAIMER;
  for (const entry of ENTRIES) {
    if (entry.keywords.test(text)) {
      return entry.answer + FALLBACK_DISCLAIMER;
    }
  }
  return GENERIC_ANSWER + FALLBACK_DISCLAIMER;
}
