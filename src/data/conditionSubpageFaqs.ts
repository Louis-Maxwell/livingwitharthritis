// Programmatic FAQ generator for /conditions/:condition/:subpage pages.
// Produces 5 question-based long-tail keyword variations per page,
// applied to all 13 conditions Ã— 4 sub-pages = 52 unique FAQ blocks.

import type { SubpageSlug } from "./conditionSubpages";

export interface SubpageFaq {
  question: string;
  answer: string;
}

const UNIQUE_SUBPAGE_FAQS: Record<
  string,
  Partial<Record<SubpageSlug, SubpageFaq[]>>
> = {
  lupus: {
    symptoms: [
      {
        question: "What are the first signs of lupus in the UK?",
        answer:
          "People often notice extreme fatigue, flitting joint pain in the hands or knees, a rash after sun, mouth ulcers, or hair thinning before anyone says the word lupus. A butterfly-shaped rash across the cheeks is classic but not required. See a GP if several of these last more than a few weeks.",
      },
      {
        question: "How is lupus diagnosed on the NHS?",
        answer:
          "There is no single test. A GP can start blood count, kidney tests, urine protein and an ANA screen, then refer to rheumatology. Specialists may add anti-dsDNA, ENA, complement and antiphospholipid antibodies. A positive ANA alone does not mean you have SLE.",
      },
      {
        question: "Can lupus symptoms come and go?",
        answer:
          "Yes. SLE runs in flares and quieter spells. UV light, infection and some medicines can trigger flares. A short diary of energy, rash, joints and urine changes helps your rheumatology nurse see the pattern between appointments.",
      },
      {
        question: "When should I see a GP about lupus symptoms?",
        answer:
          "Book if unexplained fatigue, sun-triggered rashes, joint swelling or recurrent mouth ulcers persist. Seek same-day care for severe chest pain, confusion, very little urine with swelling, or a high fever while on immunosuppressants.",
      },
      {
        question: "Is lupus the same as rheumatoid arthritis?",
        answer:
          "No. Both can swell small joints, but lupus more often adds rashes, photosensitivity, mouth ulcers or kidney clues. RA is typically more persistently destructive to joints if untreated. The treatments overlap only in part — hydroxychloroquine is the SLE mainstay.",
      },
    ],
    exercises: [
      {
        question: "What are the best exercises for lupus?",
        answer:
          "Walking, swimming, tai chi and short strength circuits are the usual SLE-friendly mix. Keep sessions modest and regular. Avoid midday outdoor workouts if you are photosensitive — UV can trigger skin and systemic flares.",
      },
      {
        question: "Is it safe to exercise with SLE?",
        answer:
          "Yes for most people on quieter days. During a flare, switch to gentle range-of-motion and stop if a joint is red-hot. Chest pain, unusual breathlessness or a swollen calf is a reason to stop and get medical advice, not to push through.",
      },
      {
        question: "What exercises should I avoid with lupus?",
        answer:
          "Avoid high-UV outdoor sessions without SPF 50 and covering clothing, and avoid heavy loading of a hot swollen joint. Contact sport needs extra caution if you have antiphospholipid syndrome or low platelets. A physiotherapist can tailor this.",
      },
      {
        question: "How often should I exercise with SLE?",
        answer:
          "Most days, in short blocks. Two or three walks, one water session and two light strength sessions in a week is a realistic UK pattern. Benefits for fatigue and mood usually build over several weeks, not after one gym visit.",
      },
      {
        question: "Can exercise reduce lupus fatigue?",
        answer:
          "Gentle, consistent movement is one of the better evidenced self-management tools for lupus fatigue and also supports heart and bone health — both important in SLE, especially if you have needed steroids.",
      },
    ],
  },
  "reactive-arthritis": {
    symptoms: [
      {
        question: "What are the first signs of reactive arthritis?",
        answer:
          "A knee, ankle or foot that swells one to four weeks after a gut or urinary infection is the typical start. Heel pain, a sausage-like toe, red eyes or burning urine can appear even after the original infection has gone.",
      },
      {
        question: "How is reactive arthritis diagnosed in the UK?",
        answer:
          "Diagnosis is clinical: the timeline plus examination. A GP or emergency team must first rule out a septic (infected) joint. Stool, urine or sexual-health tests look for a still-active trigger. There is no single blood test that proves reactive arthritis.",
      },
      {
        question: "Can reactive arthritis symptoms come and go?",
        answer:
          "Yes. Swelling can shift between joints. Most people improve over weeks to months. A sore heel or stiff knee can linger after the dramatic swelling has gone. Disease that stays active beyond six months needs a rheumatology review.",
      },
      {
        question: "When should I see a GP about reactive arthritis?",
        answer:
          "See a GP if joint swelling appears within weeks of diarrhoea or a urinary infection. Go urgent the same day if one joint is extremely hot, you cannot weight-bear, or you have a high fever — that may be septic arthritis, not reactive disease.",
      },
      {
        question: "Is reactive arthritis the same as septic arthritis?",
        answer:
          "No. Septic arthritis is infection inside the joint and is an emergency. Reactive arthritis is an immune reaction after an infection elsewhere. If you cannot tell them apart, treat it as urgent and let a clinician decide.",
      },
    ],
    diet: [
      {
        question: "What is the best diet for reactive arthritis?",
        answer:
          "A Mediterranean-style plate with plenty of fluid, plants, oily fish and, if you tolerate them, live yogurt or kefir supports recovery after a gut trigger. It will not replace NSAIDs or treating a still-active infection.",
      },
      {
        question: "What foods should I avoid with reactive arthritis?",
        answer:
          "Limit ultra-processed food, sugary drinks and alcohol while joints are settling. If diarrhoea started the episode, reintroduce fibre gradually rather than jumping to a high-fibre reset. Avoid foods that personally still upset your gut.",
      },
      {
        question: "Can diet reduce reactive arthritis inflammation?",
        answer:
          "An anti-inflammatory pattern and a healthy weight help, but the main drivers are time, NSAIDs or injections, and clearing any remaining trigger infection. Diet is supportive, not a cure.",
      },
      {
        question: "Do supplements help reactive arthritis?",
        answer:
          "Evidence is limited. Omega-3 and correcting vitamin D deficiency are reasonable to discuss. Do not use 'immune boosting' herbs while you are on immunosuppressants or if the original infection is still being treated. Ask a pharmacist.",
      },
      {
        question: "Should I take NSAIDs with food?",
        answer:
          "Yes. Naproxen or ibuprofen should be taken with a meal. If you have had ulcers, ask about stomach protection. Fixing tablet timing matters more than searching for a reactive-arthritis superfood.",
      },
    ],
  },
  "ankylosing-spondylitis": {
    treatment: [
      {
        question: "What is the best treatment for ankylosing spondylitis in the UK?",
        answer:
          "Daily spinal exercise plus a regular NSAID is the usual first step. If night pain and stiffness stay active, NHS rheumatology can consider TNF or IL-17 inhibitors. There is no single best tablet — the plan depends on disease activity and extra-spinal features such as uveitis.",
      },
      {
        question: "Can ankylosing spondylitis be cured?",
        answer:
          "There is no cure, but modern treatment can control inflammation and protect mobility. Daily movement is part of treatment, not an optional extra. Many people work and stay active once inflammation is controlled.",
      },
      {
        question: "What painkillers help ankylosing spondylitis?",
        answer:
          "NSAIDs are first-line and are often taken regularly rather than as required. Opioids are a poor long-term plan for inflammatory back pain. If NSAIDs are not enough, the next evidence-based step is usually a biologic, not stronger codeine.",
      },
      {
        question: "Do I need a referral to see a rheumatologist for AS?",
        answer:
          "Yes. GPs can start NSAIDs and blood tests, but diagnosis and biologics sit with rheumatology. Mention night pain, morning stiffness over 30 minutes, and pain that eases with movement — those are the NICE NG65 clues.",
      },
      {
        question: "Is daily exercise really treatment for AS?",
        answer:
          "Yes. NASS and UK rheumatology treat spinal mobility work as medicine. Resting a stiff AS spine makes it stiffer. Pair any new drug with a daily 10–20 minute mobility routine.",
      },
    ],
    diet: [
      {
        question: "What is the best diet for ankylosing spondylitis?",
        answer:
          "There is no AS-specific diet. A Mediterranean pattern — vegetables, oily fish, olive oil, pulses, modest alcohol — supports inflammation control, weight and bone health. It sits beside daily exercise and prescribed medicine.",
      },
      {
        question: "What foods should I avoid with AS?",
        answer:
          "Limit ultra-processed food, excess sugar and heavy drinking. There is no strong evidence that cutting all starch or going gluten-free helps unless you have coeliac disease. Watch for personal gut triggers if you also have IBD symptoms.",
      },
      {
        question: "Can diet reduce AS inflammation?",
        answer:
          "A healthy eating pattern and a healthy weight help overall inflammation and make exercise easier. Diet will not replace NSAIDs or biologics when MRI or bloods show active axial disease.",
      },
      {
        question: "Do supplements help ankylosing spondylitis?",
        answer:
          "Replace vitamin D if you are deficient. Omega-3 has the most consistent supportive data for inflammatory arthritis in general. Tell your pharmacist about high-dose turmeric or herbal mixes if you take other medicines.",
      },
      {
        question: "Why does AS diet advice mention bones?",
        answer:
          "Reduced mobility, inflammation and sometimes steroids raise osteoporosis risk. Calcium-rich foods or fortified alternatives, vitamin D in UK winter, and resistance exercise matter as much as 'anti-inflammatory' marketing.",
      },
    ],
  },
};

export function buildSubpageFaqs(
  conditionName: string,
  conditionShort: string,
  subpage: SubpageSlug,
  slug?: string,
): SubpageFaq[] {
  if (slug && UNIQUE_SUBPAGE_FAQS[slug]?.[subpage]) {
    return UNIQUE_SUBPAGE_FAQS[slug][subpage]!;
  }
  const lcName = conditionName.toLowerCase();
  const lcShort = conditionShort.toLowerCase();

  if (subpage === "symptoms") {
    return [
      {
        question: `What are the first signs of ${lcName}?`,
        answer: `The earliest signs of ${lcName} often include joint pain, stiffness — particularly in the morning or after rest — and reduced flexibility in the affected area. Symptoms typically develop gradually, so keep a short symptom diary and speak to your GP if pain persists for more than a few weeks.`,
      },
      {
        question: `How is ${lcName} diagnosed in the UK?`,
        answer: `In the UK, GPs diagnose ${lcName} from your symptoms, a clinical examination, and — where appropriate — blood tests, X-rays, ultrasound or MRI. For inflammatory types, your GP may refer you to UK healthcare rheumatology for specialist review under NICE guidance.`,
      },
      {
        question: `Can ${lcShort} symptoms come and go?`,
        answer: `Yes. Many people with ${lcShort} experience flares — periods of worse pain, swelling and stiffness — followed by quieter spells. Tracking your flares helps you and your GP spot triggers and adjust treatment.`,
      },
      {
        question: `When should I see a GP about ${lcName} symptoms?`,
        answer: `Book a GP appointment if joint pain has lasted more than a few weeks, is interfering with sleep or daily life, or is accompanied by swelling, warmth, locking or unexplained fatigue. Early assessment leads to better long-term outcomes.`,
      },
      {
        question: `Is ${lcName} the same as general arthritis pain?`,
        answer: `No — there are over 100 forms of arthritis, and ${lcName} has its own pattern of symptoms, affected joints and treatment pathway. Getting the right diagnosis matters because the most effective treatments differ between conditions.`,
      },
    ];
  }

  if (subpage === "treatment") {
    return [
      {
        question: `What is the best treatment for ${lcName} in the UK?`,
        answer: `UK treatment for ${lcName} follows NICE guidance and usually combines self-management (exercise, weight control, pacing), pain relief, and — where needed — specialist medication or therapy. There is no single "best" option; the right plan depends on the type, severity and joints involved.`,
      },
      {
        question: `Can ${lcName} be cured?`,
        answer: `Most forms of ${lcShort} cannot be cured, but they can be very effectively managed. With the right combination of exercise, medication, and lifestyle support, many people maintain a full and active life.`,
      },
      {
        question: `What painkillers help ${lcName}?`,
        answer: `Common options include paracetamol, topical or oral NSAIDs (such as ibuprofen) and, for inflammatory types, prescription medication such as DMARDs or biologics. Always take pain relief at the lowest effective dose and ask your GP or pharmacist about interactions.`,
      },
      {
        question: `Do I need a referral to see a rheumatologist for ${lcShort}?`,
        answer: `Yes — in the UK, you'll usually need a referral from your GP to access UK healthcare rheumatology services. If your GP suspects an inflammatory arthritis, NICE recommends urgent referral so that treatment can start early.`,
      },
      {
        question: `Are there free UK healthcare resources for ${lcName} treatment?`,
        answer: `Yes. UK healthcare physiotherapy, occupational therapy, pain clinics and self-management programmes are available — many free at the point of use. Ask your GP or check the UK healthcare system website for services in your area.`,
      },
    ];
  }

  if (subpage === "exercises") {
    return [
      {
        question: `What are the best exercises for ${lcName}?`,
        answer: `The best exercises for ${lcName} combine gentle range-of-motion work, strengthening of muscles around the affected joints, and low-impact aerobic activity such as walking, cycling or swimming. Start gradually and build up over several weeks.`,
      },
      {
        question: `Is it safe to exercise with ${lcShort}?`,
        answer: `Yes — for most people with ${lcShort}, regular movement is one of the most effective self-management tools. Some short-term discomfort can be normal, but stop if you have sharp pain or sudden swelling and speak to a physiotherapist.`,
      },
      {
        question: `What exercises should I avoid with ${lcName}?`,
        answer: `Avoid high-impact activities that cause sharp joint pain, heavy loaded movements without proper preparation, and anything that triggers swelling lasting more than 24 hours. A physiotherapist can tailor a programme to your joints and goals.`,
      },
      {
        question: `How often should I exercise with ${lcShort}?`,
        answer: `Aim for short, regular sessions — most days of the week — rather than long, intense workouts. UK physiotherapy guidance suggests building up to around 150 minutes of moderate activity per week, split into manageable sessions.`,
      },
      {
        question: `Can exercise reduce ${lcName} pain?`,
        answer: `Yes — strong evidence shows that consistent exercise reduces pain, stiffness and fatigue in ${lcName}, while improving sleep, mood and overall function. Benefits usually appear within 6–8 weeks of regular practice.`,
      },
    ];
  }

  // diet
  return [
    {
      question: `What is the best diet for ${lcName}?`,
      answer: `A Mediterranean-style anti-inflammatory diet is the most evidence-backed eating pattern for ${lcName}. It emphasises vegetables, fruit, wholegrains, pulses, oily fish, olive oil, nuts and seeds, with limited ultra-processed food and sugar.`,
    },
    {
      question: `What foods should I avoid with ${lcShort}?`,
      answer: `Limit ultra-processed foods, sugary drinks, excess alcohol, and large amounts of red or processed meat. Many people also notice individual triggers — a short food diary can help you spot them.`,
    },
    {
      question: `Can diet reduce ${lcName} inflammation?`,
      answer: `Yes — an anti-inflammatory eating pattern, combined with maintaining a healthy weight, has been shown to reduce joint pain and inflammatory markers in ${lcName}. Diet works best alongside exercise and any prescribed medication.`,
    },
    {
      question: `Do supplements help with ${lcShort}?`,
      answer: `Evidence is mixed. Omega-3 fish oil, vitamin D (where deficient), and turmeric/curcumin have the most supportive research for ${lcShort}. Speak to your GP or pharmacist before starting supplements, especially if you take other medication.`,
    },
    {
      question: `Is there a single food that triggers ${lcName} flares?`,
      answer: `No single food causes ${lcName}, but ultra-processed foods, excess sugar, and (for gout in particular) high-purine foods and alcohol can worsen symptoms. Focus on overall pattern rather than individual "miracle" or "forbidden" foods.`,
    },
  ];
}

// Long-tail H2 sub-section labels per page type — used to enrich on-page
// keyword coverage without inventing condition-specific copy.
export function buildSubpageH2Variants(
  conditionName: string,
  subpage: SubpageSlug,
): string[] {
  const lc = conditionName.toLowerCase();
  if (subpage === "symptoms") {
    return [
      `Early signs of ${lc}`,
      `How ${lc} symptoms differ from general joint pain`,
      `${conditionName} flare-up symptoms in the UK`,
    ];
  }
  if (subpage === "treatment") {
    return [
      `UK healthcare treatment options for ${lc}`,
      `Medication and pain relief for ${lc}`,
      `Self-management and lifestyle support for ${lc}`,
    ];
  }
  if (subpage === "exercises") {
    return [
      `Safe exercises for ${lc} pain relief`,
      `Exercises to avoid with ${lc}`,
      `Building a weekly routine for ${lc}`,
    ];
  }
  return [
    `Anti-inflammatory diet for ${lc}`,
    `Foods to avoid with ${lc}`,
    `Supplements and ${lc} — what the evidence says`,
  ];
}
