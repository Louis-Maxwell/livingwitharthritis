// Offline/network-failure fallback responses for the Arthritis Support chat.
// Used when the live AI backend is unreachable (e.g. blocked by preview proxy,
// flaky network) so visitors always see useful, safe general guidance.
//
// All answers are GENERAL guidance only — never diagnosis or prescribing —
// and signpost professional care.

export const FALLBACK_DISCLAIMER =
  "\n\n---\n\n_General guidance from the Living With Arthritis knowledge library. This is educational information, not medical advice — please speak with your GP, pharmacist or rheumatology team before changing medication or starting a new programme._";

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

**Strength (2–3Ã— per week):**
- **Straight-leg raises** — 2 sets of 10
- **Sit-to-stands** from a chair — 2 sets of 10
- **Wall sits** — hold 10–20 seconds, repeat 5Ã—
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

**Call 999 or 112 or seek urgent care if:**
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
  {
    keywords: /\bvitamin\s*d\b|\bvit\s*d\b/i,
    answer: `**Vitamin D and arthritis**

Vitamin D supports **bone strength, muscle function and immune balance** — all relevant to arthritis. Low levels are linked to more joint pain, worse osteoarthritis symptoms and a higher risk of falls.

**Why it matters in the UK:**
- From **October to March** the sun is too weak to make vitamin D in the skin.
- The healthcare system recommends **10 micrograms (400 IU) a day** for most adults during autumn and winter.
- People with darker skin, those who cover up, housebound adults and older people may need it **year-round**.

**Possible benefits for arthritis:**
- Helps prevent **osteoporosis** and reduces fracture risk (important if you take steroids).
- May modestly **reduce muscle pain** and weakness when deficiency is corrected.
- Some evidence of lower flare frequency in rheumatoid arthritis when levels are normalised.

**Practical tips:**
- A daily **10–25 Âµg (400–1000 IU)** supplement is safe for most adults.
- Ask your GP for a blood test if you have ongoing fatigue, bone pain or frequent flares.
- Pair with **calcium-rich foods** (dairy, fortified plant milks, leafy greens) and weight-bearing exercise.

Avoid high-dose vitamin D without medical advice — too much can raise blood calcium.`,
  },
  {
    keywords: /\b(osteoarthritis|\boa\b)\b/i,
    answer: `**Osteoarthritis (OA) — the essentials**

OA is the most common form of arthritis. The smooth cartilage that cushions the ends of bones gradually wears down, so the joint becomes stiff, achy and sometimes swollen. It most often affects **knees, hips, hands and the spine**.

**Typical signs:**
- Pain that is **worse with activity** and eased by rest
- **Short** morning stiffness (under 30 minutes)
- A grating or clicking sensation (crepitus)
- Reduced range of movement; sometimes mild swelling

**What helps most (NICE NG226):**
- **Movement** — low-impact exercise is the single most effective treatment.
- **Weight management** — losing 5–10% of body weight can significantly reduce knee and hip pain.
- **Strength work** for the muscles around the affected joint.
- **Topical NSAID gels** before oral painkillers for knee and hand OA.
- **Heat, supportive footwear** and walking aids when useful.

**When to ask for more help:**
- Pain stops you sleeping or doing daily tasks
- Joint suddenly becomes hot, red and very swollen
- You're considering injections or surgery — ask for a rheumatology or orthopaedic referral

OA is manageable. Most people stay active for decades with the right routine.`,
  },
  {
    keywords: /\b(knee|hip)\b.*\b(pain|arthritis|ache|stiff)/i,
    answer: `**Knee and hip pain — practical guidance**

Knee and hip pain are usually due to **osteoarthritis**, soft-tissue strain or, less commonly, inflammatory arthritis.

**Self-care that helps most people:**
- **Keep moving** — gentle walking, cycling or swimming most days.
- **Strengthen the supporting muscles** — quadriceps, glutes and core. Try sit-to-stands, glute bridges and straight-leg raises.
- **Lose excess weight** if relevant — each kilogram lost removes ~4 kg of load from the knee.
- **Topical NSAID gel** (e.g. ibuprofen, diclofenac) rubbed in 3–4Ã— a day.
- **Heat** for stiffness, **ice** for swelling (20 minutes, with a cloth barrier).
- Supportive footwear; avoid worn-out shoes.

**See your GP if:**
- Pain lasts more than 2 weeks or stops you sleeping
- The joint is swollen, hot or unstable
- You can't bear weight after a fall
- Symptoms get worse despite self-care

A physiotherapist can design a tailored programme — ask your GP for a referral or self-refer where available.`,
  },
  {
    keywords: /\b(inflammation|inflamed|swelling|swollen)\b/i,
    answer: `**Reducing inflammation in arthritis**

Chronic low-grade inflammation drives both joint damage and fatigue. The most effective changes are everyday habits, not single foods or supplements.

**Strongest evidence:**
- **Mediterranean-style eating** — vegetables, fruit, olive oil, oily fish, pulses, whole grains.
- **Regular movement** — even 20–30 minutes of walking most days lowers inflammatory markers.
- **Healthy weight** — fat tissue produces inflammatory chemicals; modest weight loss helps.
- **Good sleep** (7–9 hours) and stress management — both directly affect immune activity.
- **Stop smoking** — smoking worsens RA and reduces medication effectiveness.

**Helpful additions:**
- Oily fish twice a week, or 2 g/day omega-3 (EPA+DHA).
- Turmeric with black pepper, ginger, garlic in cooking.
- Limit ultra-processed foods, sugary drinks and excess alcohol.

**Signs of inflammation to flag to your GP:**
- Joint that is warm, red and very swollen
- Morning stiffness lasting more than an hour
- Fever, weight loss or unexplained fatigue with joint symptoms`,
  },
  {
    keywords: /\b(cause|causes|why.*(get|have)).*(arthritis)|what is arthritis|symptoms of arthritis/i,
    answer: `**Arthritis — causes and common symptoms**

"Arthritis" is an umbrella term for over 100 conditions that affect the joints. The two most common are **osteoarthritis** (wear-related) and **rheumatoid arthritis** (autoimmune).

**Common symptoms across types:**
- Joint pain, stiffness or aching
- Swelling, warmth or tenderness
- Reduced range of movement
- Fatigue, especially in inflammatory types

**Risk factors:**
- **Age** — risk rises after 45
- **Family history** — especially for RA, psoriatic arthritis and OA of the hands
- **Previous joint injury** — old injuries raise OA risk in that joint
- **Body weight** — extra load on knees, hips and spine
- **Sex** — women are more likely to develop most types
- **Smoking** — worsens RA and slows recovery
- **Occupation** — repetitive heavy work can accelerate OA

**When to see your GP:**
- Joint symptoms lasting more than 2 weeks
- Morning stiffness over 30 minutes
- Swelling, warmth or systemic symptoms (fever, weight loss, rash)

Early diagnosis matters most for inflammatory arthritis — treatment in the first weeks can prevent long-term joint damage.`,
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

If your concern is urgent (sudden severe pain, a hot swollen joint with fever, chest pain or weakness), please contact **999 or 112** or call **999** rather than waiting on chat.`;

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
