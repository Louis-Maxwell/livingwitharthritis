// Programmatic FAQ generator for /conditions/:condition/:subpage pages.
// Produces 5 question-based long-tail keyword variations per page,
// applied to all 13 conditions Ã— 4 sub-pages = 52 unique FAQ blocks.

import type { SubpageSlug } from "./conditionSubpages";

export interface SubpageFaq {
  question: string;
  answer: string;
}

export function buildSubpageFaqs(
  conditionName: string,
  conditionShort: string,
  subpage: SubpageSlug,
): SubpageFaq[] {
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
