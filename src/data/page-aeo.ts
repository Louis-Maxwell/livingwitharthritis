/**
 * AEO/GEO page data — answer-first summaries, FAQs, review metadata for
 * top condition + guide + hub pages. Consumed by <AeoEnhancement /> and
 * injected as FAQPage JSON-LD at runtime.
 *
 * Keep answers concise (40-80 words), UK English, plain-language.
 * Sources: NICE guidelines, NHS clinical topics, project medical reviewer.
 */

export interface AeoPage {
  question: string;
  answer: string;
  faqs?: { q: string; a: string }[];
  reviewer?: string;
  updatedAt?: string; // ISO YYYY-MM-DD
}

const REVIEWER = "Living With Arthritis clinical team (HCPC-registered physiotherapy)";
const UPDATED = "2026-07-01";

const withDefaults = (p: Omit<AeoPage, "reviewer" | "updatedAt"> & Partial<Pick<AeoPage, "reviewer" | "updatedAt">>): AeoPage => ({
  reviewer: REVIEWER,
  updatedAt: UPDATED,
  ...p,
});

export const PAGE_AEO: Record<string, AeoPage> = {
  // ── Conditions ─────────────────────────────────────────────────────────
  "/conditions/osteoarthritis": withDefaults({
    question: "What is osteoarthritis?",
    answer:
      "Osteoarthritis (OA) is the most common form of arthritis in the UK. It happens when protective cartilage on the ends of your bones wears down over time, most often in knees, hips, hands and spine. Symptoms include joint pain that worsens with activity, morning stiffness under 30 minutes, swelling and reduced movement. It's manageable with exercise, weight control, and, when needed, medication or joint replacement.",
    faqs: [
      { q: "Can osteoarthritis be reversed?", a: "No, cartilage loss can't currently be reversed, but symptoms and progression can be significantly slowed with exercise, weight management and joint-friendly activity." },
      { q: "What's the best exercise for osteoarthritis?", a: "Low-impact aerobic exercise (walking, cycling, swimming) plus strength training around the affected joint. NICE recommends 30 minutes most days." },
      { q: "Does osteoarthritis show on an X-ray?", a: "Yes — X-rays show joint space narrowing and bone spurs, though symptoms don't always match imaging severity." },
      { q: "When should I see a GP?", a: "If joint pain limits daily activity, wakes you at night, or hasn't improved after 6 weeks of self-management, book a GP appointment." },
    ],
  }),
  "/conditions/rheumatoid-arthritis": withDefaults({
    question: "What is rheumatoid arthritis?",
    answer:
      "Rheumatoid arthritis (RA) is an autoimmune condition where the immune system attacks the lining of your joints, causing pain, swelling and stiffness — usually symmetrical (both hands, both feet). Early treatment with DMARDs (disease-modifying drugs) within 3 months of symptoms starting can prevent joint damage. It affects about 400,000 adults in the UK.",
    faqs: [
      { q: "Is rheumatoid arthritis a disability?", a: "It can qualify as a disability under the Equality Act 2010 if it substantially affects daily activities. Many people with RA are eligible for PIP." },
      { q: "What's the difference between OA and RA?", a: "OA is wear-and-tear cartilage loss. RA is an autoimmune inflammatory disease. RA usually affects joints symmetrically and causes prolonged morning stiffness (>1 hour)." },
      { q: "Can diet help RA?", a: "A Mediterranean-style diet rich in oily fish, olive oil and vegetables can reduce inflammatory markers. It doesn't replace DMARDs but supports overall control." },
    ],
  }),
  "/conditions/psoriatic-arthritis": withDefaults({
    question: "What is psoriatic arthritis?",
    answer:
      "Psoriatic arthritis (PsA) is an inflammatory arthritis that affects around 1 in 5 people with psoriasis. It causes joint pain, swelling and stiffness — often in fingers, toes, lower back or knees — plus nail changes and skin plaques. Early diagnosis and DMARDs or biologics prevent joint damage.",
    faqs: [
      { q: "Can you have PsA without psoriasis?", a: "Yes, about 15% of people develop joint symptoms before skin symptoms. Family history and nail pitting are clues." },
      { q: "Is psoriatic arthritis worse than rheumatoid arthritis?", a: "Both can cause serious joint damage. PsA has more variable patterns; RA is usually more symmetrical. Outcomes depend on early treatment." },
    ],
  }),
  "/conditions/ankylosing-spondylitis": withDefaults({
    question: "What is ankylosing spondylitis?",
    answer:
      "Ankylosing spondylitis (AS), or axial spondyloarthritis, is a long-term inflammatory arthritis mainly affecting the spine and sacroiliac joints. It typically starts in the late teens or twenties with gradual lower back pain and morning stiffness that improves with movement. Daily exercise, physio and biologic drugs keep the spine flexible.",
  }),
  "/conditions/gout": withDefaults({
    question: "What is gout?",
    answer:
      "Gout is a type of inflammatory arthritis caused by high uric acid crystallising inside joints — usually the big toe — triggering sudden severe pain, redness and swelling. UK guidelines recommend urate-lowering therapy (allopurinol) after a second attack to prevent joint damage. Diet and alcohol adjustments help.",
  }),
  "/conditions/fibromyalgia": withDefaults({
    question: "What is fibromyalgia?",
    answer:
      "Fibromyalgia is a long-term condition causing widespread pain, fatigue, sleep problems and 'fibro fog'. It's a disorder of pain processing rather than joint damage. NICE recommends graded exercise, CBT and paced activity as first-line management.",
  }),
  "/conditions/lupus": withDefaults({
    question: "What is lupus?",
    answer:
      "Lupus (systemic lupus erythematosus, SLE) is an autoimmune disease that can affect skin, joints, kidneys, heart and lungs. Common symptoms include joint pain, a butterfly rash, fatigue and sun sensitivity. Hydroxychloroquine is the mainstay of treatment.",
  }),
  "/conditions/knee-arthritis": withDefaults({
    question: "What is knee arthritis?",
    answer:
      "Knee arthritis is joint damage in the knee — most often osteoarthritis — causing pain when standing, walking or climbing stairs, stiffness after rest, and swelling. NICE recommends exercise and weight loss as first-line treatment; every 5 kg lost cuts knee load by roughly 20 kg.",
    faqs: [
      { q: "What's the best exercise for knee arthritis?", a: "Quadriceps strengthening (straight-leg raises, wall sits) plus low-impact aerobic (cycling, swimming). 3-5 sessions a week for 8+ weeks shows meaningful pain reduction." },
      { q: "Should I use a walking stick?", a: "Use it in the opposite hand to the painful knee — this reduces load by up to 25%." },
    ],
  }),
  "/conditions/hip-arthritis": withDefaults({
    question: "What is hip arthritis?",
    answer:
      "Hip arthritis is joint damage — usually osteoarthritis — of the hip, causing groin or buttock pain, stiffness and difficulty putting on socks or shoes. Physio-led strengthening, weight management and, when severe, hip replacement (over 100,000 done in the UK each year) provide long-term relief.",
  }),
  "/conditions/hand-arthritis": withDefaults({
    question: "What is hand arthritis?",
    answer:
      "Hand arthritis affects the small joints of the fingers, thumbs and wrists. Osteoarthritis typically causes bony bumps and thumb-base pain; rheumatoid usually causes symmetrical knuckle swelling. Splints, hand exercises and topical NSAID gels help most people.",
  }),
  "/conditions/shoulder-arthritis": withDefaults({
    question: "What is shoulder arthritis?",
    answer:
      "Shoulder arthritis is cartilage loss in the glenohumeral or acromioclavicular joints, causing deep aching pain, reduced reach and night pain when lying on the affected side. Physio, corticosteroid injections and, if severe, shoulder replacement are options.",
  }),
  "/conditions/elbow-arthritis": withDefaults({
    question: "What is elbow arthritis?",
    answer:
      "Elbow arthritis is joint damage in the elbow causing pain, stiffness, locking or grating during movement. Osteoarthritis and rheumatoid arthritis are the main causes. Treatment ranges from activity modification and NSAIDs to arthroscopy or elbow replacement.",
  }),
  "/conditions/juvenile-arthritis": withDefaults({
    question: "What is juvenile arthritis?",
    answer:
      "Juvenile idiopathic arthritis (JIA) is arthritis starting before age 16, lasting more than 6 weeks. It affects around 1 in 1,000 UK children. Early paediatric rheumatology care and DMARDs help most children live active lives.",
  }),
  "/conditions/reactive-arthritis": withDefaults({
    question: "What is reactive arthritis?",
    answer:
      "Reactive arthritis is joint inflammation that develops after an infection elsewhere in the body — usually gut or urinary. Symptoms include joint pain, eye inflammation and urinary symptoms. Most cases resolve within 3-12 months.",
  }),
  "/conditions/polymyalgia-rheumatica": withDefaults({
    question: "What is polymyalgia rheumatica?",
    answer:
      "Polymyalgia rheumatica (PMR) causes sudden shoulder and hip stiffness and pain, mainly in adults over 50. Low-dose steroids (prednisolone 15 mg) usually give dramatic relief within days. Treatment typically continues for 1-2 years.",
  }),

  // ── Guides ────────────────────────────────────────────────────────────
  "/guides/newly-diagnosed": withDefaults({
    question: "I've just been diagnosed with arthritis — what should I do?",
    answer:
      "Book a rheumatology follow-up if not already arranged, start gentle daily movement, and read up on your specific type. NICE recommends beginning exercise and joint protection within weeks of diagnosis for best long-term outcomes. Track symptoms, ask your GP about pain relief options, and consider our free virtual physiotherapy triage.",
  }),
  "/guides/arthritis-pain-relief": withDefaults({
    question: "How do I relieve arthritis pain?",
    answer:
      "First-line pain relief includes paracetamol, topical NSAID gels and heat/cold packs. Exercise reduces pain more than most drugs long-term. If pain persists, your GP can consider oral NSAIDs, corticosteroid injections or, for inflammatory arthritis, DMARDs.",
  }),
  "/guides/hip-exercises-for-osteoarthritis": withDefaults({
    question: "What are the best hip exercises for osteoarthritis?",
    answer:
      "Evidence-based hip OA exercises include glute bridges, clamshells, standing hip abduction, wall squats and stationary cycling. Aim for 3 sessions per week of 30 minutes; expect meaningful pain reduction after 8-12 weeks. NICE guideline NG226 recommends supervised programmes.",
  }),
  "/guides/can-exercise-make-osteoarthritis-worse": withDefaults({
    question: "Can exercise make osteoarthritis worse?",
    answer:
      "No — done correctly, exercise reduces OA pain and slows progression. Some soreness during and up to 2 hours after exercise is normal. Sharp, sudden or persistent pain lasting >24 hours means you've done too much; scale back but don't stop.",
  }),
  "/guides/fall-prevention-older-adults": withDefaults({
    question: "How can older adults prevent falls?",
    answer:
      "Strength and balance training (tai chi, Otago programme) cuts falls by around 30%. Also: home hazard checks, medication review, eye tests every 2 years and vitamin D 10 mcg/day. Contact your GP or NHS falls clinic if you've fallen twice in a year.",
  }),
  "/guides/sarcopenia-muscle-control": withDefaults({
    question: "What is sarcopenia?",
    answer:
      "Sarcopenia is age-related muscle loss that accelerates after 60 and worsens arthritis symptoms. Resistance training (2-3 sessions per week) plus 1.0-1.2 g protein/kg body weight/day reverses much of it, even in your 80s.",
  }),
  "/guides/bone-density-osteoporosis": withDefaults({
    question: "How do I improve bone density?",
    answer:
      "Weight-bearing exercise (walking, jogging, dancing), resistance training, calcium 700 mg/day and vitamin D 10 mcg/day support bone density. If your FRAX score is high, your GP may prescribe bisphosphonates.",
  }),
  "/guides/disability-support": withDefaults({
    question: "What UK disability support is available for arthritis?",
    answer:
      "You may qualify for Personal Independence Payment (PIP), Blue Badge, Access to Work grants, and workplace reasonable adjustments under the Equality Act 2010. Citizens Advice and Versus Arthritis helpline (0800 5200 520) guide applications.",
  }),
  "/guides/frailty-management-hub": withDefaults({
    question: "How is frailty managed with arthritis?",
    answer:
      "Frailty and arthritis together respond to comprehensive geriatric assessment: strength training, protein-rich diet, medication review, hearing/vision checks and social connection. Ask your GP for a formal frailty (Clinical Frailty Scale) review.",
  }),
  "/guides/preventative-msk-health": withDefaults({
    question: "How do I keep my muscles and joints healthy?",
    answer:
      "The three pillars are: 150 minutes moderate aerobic activity per week, 2 strength sessions per week, and 7-9 hours of sleep. Add Mediterranean-style diet, don't smoke, and keep BMI under 27 for lowest lifetime arthritis risk.",
  }),
  "/guides/musculoskeletal-health": withDefaults({
    question: "What is musculoskeletal health?",
    answer:
      "Musculoskeletal (MSK) health means healthy bones, joints, muscles, tendons and ligaments. MSK conditions affect 20 million people in the UK. Movement, strength, sleep and weight management are the four proven levers to protect it.",
  }),

  // ── Hubs ────────────────────────────────────────────────────────────
  "/diet-hub": withDefaults({
    question: "What's the best diet for arthritis?",
    answer:
      "A Mediterranean diet — oily fish twice a week, olive oil, nuts, wholegrains, plenty of vegetables and fruit — consistently reduces inflammation markers and joint pain in trials. Cut ultra-processed foods, sugary drinks and excess red meat. Weight loss of 5-10% substantially reduces knee OA pain.",
  }),
  "/exercise-hub": withDefaults({
    question: "What's the best exercise for arthritis?",
    answer:
      "Combine aerobic (walking, swimming, cycling) with strength training 2-3 times a week and flexibility work. NICE guideline NG226 recommends exercise as first-line for all arthritis types — with pain reduction comparable to NSAIDs and no side effects.",
  }),
};

/** Look up AEO data for a route. Returns undefined if not configured. */
export function getPageAeo(route: string): AeoPage | undefined {
  const clean = route.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return PAGE_AEO[clean];
}

export const AEO_ROUTES = Object.keys(PAGE_AEO);
