// Per-condition content for the 4 sub-pages:
// /conditions/:condition/symptoms | treatment | exercises | diet
// Keyed by the same slugs used in src/App.tsx /conditions/* routes.

export type SubpageSlug = "symptoms" | "treatment" | "exercises" | "diet";

export const subpageSlugs: SubpageSlug[] = ["symptoms", "treatment", "exercises", "diet"];

export const subpageLabel: Record<SubpageSlug, string> = {
  symptoms: "Symptoms",
  treatment: "Treatment",
  exercises: "Exercises",
  diet: "Diet",
};

export interface SymptomsContent {
  headline: string;
  intro: string;
  commonSymptoms: string[];
  whenToSeeGP: string;
}

export interface TreatmentContent {
  headline: string;
  intro: string;
  approaches: Array<{ name: string; description: string }>;
}

export interface ExercisesContent {
  headline: string;
  intro: string;
  keyBenefits: string[];
}

export interface DietContent {
  headline: string;
  intro: string;
  foodsToFavor: string[];
  foodsToLimit: string[];
}

export interface ConditionSubpages {
  symptoms: SymptomsContent;
  treatment: TreatmentContent;
  exercises: ExercisesContent;
  diet: DietContent;
}

// UK-aligned, plain-English content. Sources: NHS, NICE, Versus Arthritis,
// NRAS, NASS, Lupus UK, PMRGCAuk, FMA UK clinical summaries (2024â€“2025).
export const conditionSubpages: Record<string, ConditionSubpages> = {
  osteoarthritis: {
    symptoms: {
      headline: "Osteoarthritis symptoms â€” what to look for",
      intro:
        "Osteoarthritis (OA) is the most common form of arthritis in the UK, affecting around 8.5 million adults. Symptoms develop gradually as cartilage wears down in weight-bearing and high-use joints â€” most often the knees, hips, hands, and spine.",
      commonSymptoms: [
        "Joint pain that worsens with activity and eases with rest",
        "Morning stiffness lasting under 30 minutes",
        "Reduced range of motion in the affected joint",
        "Grating or crunching sensations (crepitus)",
        "Mild swelling around the joint, especially after use",
        "Bony enlargements at the finger joints (Heberden's and Bouchard's nodes)",
      ],
      whenToSeeGP:
        "Book a GP appointment if joint pain has lasted more than a few weeks, is limiting daily activities, or is accompanied by significant swelling, locking, or giving way.",
    },
    treatment: {
      headline: "Osteoarthritis treatment options",
      intro:
        "OA cannot be cured, but evidence-based treatment significantly improves pain and function. NICE recommends a combined approach centred on exercise, weight management, and pain relief.",
      approaches: [
        { name: "Exercise therapy", description: "Strength training and aerobic activity reduce knee and hip pain more reliably than any other non-surgical treatment." },
        { name: "Weight management", description: "Every kilogram lost reduces knee joint load by up to four kilograms during walking." },
        { name: "Topical NSAIDs", description: "First-line pharmacological option for hand and knee OA per NICE 2022 guidance." },
        { name: "Oral NSAIDs and paracetamol", description: "Short-term use for flare control, taken at the lowest effective dose." },
        { name: "Steroid injections", description: "Short-term relief for severe flares â€” typically no more than three per year per joint." },
        { name: "Joint replacement surgery", description: "Considered when conservative treatment no longer controls pain or function." },
      ],
    },
    exercises: {
      headline: "Best exercises for osteoarthritis",
      intro:
        "Movement is the single most effective self-management tool for OA. Combine low-impact aerobic activity with strength work targeting the muscles around affected joints.",
      keyBenefits: [
        "Reduces joint pain and stiffness within 6â€“8 weeks of consistent practice",
        "Strengthens supporting muscles, reducing joint load",
        "Maintains range of motion and prevents deconditioning",
        "Supports healthy weight and cardiovascular health",
        "Improves mood, sleep, and energy levels",
      ],
    },
    diet: {
      headline: "Diet for osteoarthritis",
      intro:
        "There's no specific OA diet, but maintaining a healthy weight and following a Mediterranean-style eating pattern can reduce inflammation and joint pain.",
      foodsToFavor: [
        "Oily fish (salmon, mackerel, sardines) two to three times a week for omega-3s",
        "Extra-virgin olive oil as the main cooking fat",
        "Colourful vegetables and fruit, especially leafy greens and berries",
        "Wholegrains: oats, brown rice, wholemeal bread",
        "Pulses, nuts, and seeds for plant protein and fibre",
      ],
      foodsToLimit: [
        "Ultra-processed foods high in added sugar and refined flour",
        "Sugary drinks and excess alcohol",
        "Processed and red meats more than a few times per week",
        "Foods high in saturated fat (deep-fried foods, pastries)",
      ],
    },
  },

  "rheumatoid-arthritis": {
    symptoms: {
      headline: "Rheumatoid arthritis symptoms",
      intro:
        "Rheumatoid arthritis (RA) is an autoimmune condition affecting around 450,000 adults in the UK. Early symptoms can be subtle â€” recognising them matters because early DMARD treatment dramatically improves long-term outcomes.",
      commonSymptoms: [
        "Symmetrical joint pain and swelling, often in the small joints of the hands and feet",
        "Morning stiffness lasting over an hour",
        "Warm, tender, swollen joints",
        "Persistent fatigue and a general feeling of being unwell",
        "Low-grade fever during active disease",
        "Rheumatoid nodules â€” firm lumps under the skin near affected joints",
      ],
      whenToSeeGP:
        "See your GP urgently if you have persistent joint swelling, especially in the small joints of the hands or feet â€” early referral to rheumatology improves long-term outcomes.",
    },
    treatment: {
      headline: "Rheumatoid arthritis treatment",
      intro:
        "RA is treated with disease-modifying anti-rheumatic drugs (DMARDs) that slow or stop joint damage. Treatment is started as early as possible â€” ideally within 12 weeks of symptoms.",
      approaches: [
        { name: "Conventional DMARDs", description: "Methotrexate is the first-line treatment, often combined with sulfasalazine or hydroxychloroquine." },
        { name: "Biologic DMARDs", description: "Anti-TNF and other biologics are used when conventional DMARDs aren't enough." },
        { name: "JAK inhibitors", description: "Targeted oral therapies for moderate-to-severe disease." },
        { name: "Short-course steroids", description: "Used to control flares while DMARDs take effect." },
        { name: "Specialist nurse support", description: "Rheumatology nurses provide ongoing monitoring, education, and advice." },
        { name: "Occupational therapy", description: "Joint protection, splinting, and adaptations to maintain independence." },
      ],
    },
    exercises: {
      headline: "Best exercises for rheumatoid arthritis",
      intro:
        "Regular gentle exercise helps RA by maintaining joint range of motion, reducing fatigue, and protecting against the deconditioning that often follows flares.",
      keyBenefits: [
        "Maintains joint range of motion and reduces stiffness",
        "Strengthens the muscles that protect inflamed joints",
        "Reduces fatigue (counter-intuitive but well-evidenced)",
        "Supports cardiovascular health â€” important because RA increases heart risk",
        "Improves mood and reduces flare-related anxiety",
      ],
    },
    diet: {
      headline: "Diet for rheumatoid arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet may reduce RA pain and disease activity, and supports the bone and heart health that DMARD treatment depends on.",
      foodsToFavor: [
        "Oily fish two to three times a week (omega-3s reduce joint stiffness)",
        "Olive oil, nuts, and seeds",
        "Plenty of fruit and vegetables (aim for 7+ portions daily)",
        "Wholegrains and pulses",
        "Calcium-rich foods (dairy or fortified alternatives) to protect bone density",
      ],
      foodsToLimit: [
        "Ultra-processed foods high in refined sugar and seed oils",
        "Excess red and processed meat",
        "Excessive alcohol (interacts with methotrexate)",
        "Sugary drinks",
      ],
    },
  },

  "psoriatic-arthritis": {
    symptoms: {
      headline: "Psoriatic arthritis symptoms",
      intro:
        "Psoriatic arthritis (PsA) is an inflammatory arthritis associated with psoriasis. Around 150,000 people in the UK live with PsA, and roughly 1 in 5 people with psoriasis develop it.",
      commonSymptoms: [
        "Joint pain and stiffness, often asymmetrical",
        "Dactylitis â€” sausage-like swelling of a whole finger or toe",
        "Nail changes: pitting, ridging, or separation from the nail bed",
        "Lower back and buttock pain (axial involvement)",
        "Enthesitis â€” pain where tendons attach to bone, especially at the heel",
        "Fatigue and reduced exercise tolerance",
      ],
      whenToSeeGP:
        "If you have psoriasis and develop joint pain, swelling, dactylitis, or persistent back stiffness, ask your GP about referral to rheumatology for screening.",
    },
    treatment: {
      headline: "Psoriatic arthritis treatment",
      intro:
        "PsA treatment targets both skin and joint disease. Coordinated care between rheumatology and dermatology gives the best outcomes.",
      approaches: [
        { name: "DMARDs", description: "Methotrexate and sulfasalazine are commonly used for joint disease." },
        { name: "Biologic therapies", description: "Anti-TNF, IL-17, and IL-23 inhibitors treat both joint and skin symptoms." },
        { name: "Targeted oral therapies", description: "Apremilast and JAK inhibitors for moderate disease." },
        { name: "Steroid injections", description: "Used for individual swollen joints or dactylitis." },
        { name: "NSAIDs", description: "Symptomatic relief for pain and stiffness." },
        { name: "Skin treatment", description: "Topicals, phototherapy, or systemic treatment under dermatology." },
      ],
    },
    exercises: {
      headline: "Best exercises for psoriatic arthritis",
      intro:
        "Regular movement reduces PsA inflammation, supports tendon and entheses health, and helps manage the fatigue that often comes with the condition.",
      keyBenefits: [
        "Reduces joint and tendon stiffness",
        "Supports a healthy weight (excess weight worsens both PsA and psoriasis)",
        "Improves mood and energy",
        "Protects cardiovascular health",
        "Water-based exercise is particularly comfortable when skin is sensitive",
      ],
    },
    diet: {
      headline: "Diet for psoriatic arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports both the joint and skin components of PsA, and helps maintain a healthy weight.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil, nuts, and seeds",
        "Plenty of colourful vegetables and fruit",
        "Wholegrains and pulses",
        "Adequate vitamin D (a deficiency is common in psoriasis)",
      ],
      foodsToLimit: [
        "Ultra-processed and high-sugar foods",
        "Excess alcohol (can worsen psoriasis)",
        "Excess red and processed meat",
        "Foods that personally trigger your psoriasis flares",
      ],
    },
  },

  gout: {
    symptoms: {
      headline: "Gout symptoms",
      intro:
        "Gout is caused by sharp urate crystals forming in joints, leading to sudden, severe attacks. It affects around 1 in 40 adults in the UK and is the most common form of inflammatory arthritis in men.",
      commonSymptoms: [
        "Sudden onset of severe joint pain, often overnight or in the early morning",
        "Hot, red, swollen joint â€” most commonly the base of the big toe",
        "Skin over the joint may look shiny and peel as the attack settles",
        "Even bedsheet pressure can feel unbearable during an attack",
        "Attacks typically last 5â€“10 days and resolve fully between flares",
        "Long-standing gout can cause visible lumps called tophi",
      ],
      whenToSeeGP:
        "See your GP urgently during a first suspected attack to confirm the diagnosis. Book a routine appointment if you have repeated attacks to discuss long-term urate-lowering treatment.",
    },
    treatment: {
      headline: "Gout treatment",
      intro:
        "Gout treatment has two parts: managing the acute attack, and lowering uric acid long term to prevent further attacks and joint damage.",
      approaches: [
        { name: "NSAIDs during attacks", description: "First-line for most people â€” start as soon as the attack begins." },
        { name: "Colchicine", description: "Effective for acute attacks, particularly if NSAIDs aren't suitable." },
        { name: "Short steroid course", description: "Used when NSAIDs and colchicine aren't appropriate." },
        { name: "Allopurinol", description: "Long-term urate-lowering therapy â€” the cornerstone of preventing future attacks." },
        { name: "Febuxostat", description: "Alternative urate-lowering option when allopurinol isn't tolerated." },
        { name: "Lifestyle measures", description: "Weight management, reduced alcohol, and good hydration alongside medication." },
      ],
    },
    exercises: {
      headline: "Best exercises for gout",
      intro:
        "Between attacks, regular non-weight-bearing exercise reduces gout flare frequency, supports healthy weight, and protects cardiovascular health.",
      keyBenefits: [
        "Supports a healthy weight (a major factor in gout risk)",
        "Improves circulation, helping the body clear uric acid",
        "Reduces flare frequency over time",
        "Protects cardiovascular health (gout is linked to heart disease)",
        "Maintains joint function between attacks",
      ],
    },
    diet: {
      headline: "Diet for gout",
      intro:
        "Diet alone won't control gout, but it makes a meaningful difference alongside urate-lowering medication. Focus on hydration, alcohol moderation, and limiting high-purine foods.",
      foodsToFavor: [
        "Plenty of water (aim for 2 litres daily)",
        "Low-fat dairy â€” protective against gout attacks",
        "Cherries and cherry juice (modest evidence for reducing flares)",
        "Coffee in moderation",
        "Vegetables, wholegrains, and plant proteins",
      ],
      foodsToLimit: [
        "Beer and spirits â€” strongly associated with attacks",
        "Sugar-sweetened drinks and foods high in fructose",
        "Organ meats (liver, kidney, sweetbreads)",
        "Shellfish and oily fish in large amounts",
        "Game meats and large amounts of red meat",
      ],
    },
  },

  "ankylosing-spondylitis": {
    symptoms: {
      headline: "Ankylosing spondylitis symptoms",
      intro:
        "Ankylosing spondylitis (AS), now often called axial spondyloarthritis, is an inflammatory arthritis that mainly affects the spine and sacroiliac joints. It usually starts before age 45.",
      commonSymptoms: [
        "Lower back and buttock pain that improves with activity, worsens with rest",
        "Morning stiffness lasting more than 30 minutes",
        "Pain that wakes you in the second half of the night",
        "Reduced spinal flexibility (bending forward, side-bending, rotation)",
        "Chest tightness from rib-joint involvement",
        "Heel pain, eye inflammation (uveitis), or fatigue in some people",
      ],
      whenToSeeGP:
        "See your GP if you've had back pain for more than three months that improves with movement and worsens with rest â€” this is a recognised red flag for inflammatory back pain.",
    },
    treatment: {
      headline: "Ankylosing spondylitis treatment",
      intro:
        "AS treatment combines daily exercise â€” the single most important self-management step â€” with medication to control inflammation and prevent spinal fusion.",
      approaches: [
        { name: "Daily spinal exercise", description: "Mobility, stretching, and posture work are the foundation of AS management." },
        { name: "NSAIDs", description: "First-line pharmacological treatment, often taken regularly rather than as needed." },
        { name: "Biologic therapies", description: "Anti-TNF and IL-17 inhibitors for active disease that doesn't respond to NSAIDs." },
        { name: "Specialist physiotherapy", description: "NASS-recommended structured programmes maintain spinal mobility." },
        { name: "Hydrotherapy", description: "Particularly helpful for stiffness and supported movement." },
        { name: "Surgery", description: "Rare but considered for severe spinal deformity or hip involvement." },
      ],
    },
    exercises: {
      headline: "Best exercises for ankylosing spondylitis",
      intro:
        "Daily exercise is the single most important self-management step in AS. It preserves spinal range of motion, maintains posture, and reduces stiffness â€” and is recommended by NASS as a daily routine.",
      keyBenefits: [
        "Preserves spinal mobility and prevents stiffening",
        "Maintains posture and reduces deformity risk",
        "Reduces morning stiffness",
        "Supports chest expansion and breathing capacity",
        "Improves sleep, mood, and overall wellbeing",
      ],
    },
    diet: {
      headline: "Diet for ankylosing spondylitis",
      intro:
        "There's no specific AS diet, but a Mediterranean eating pattern supports inflammation control, bone health (a concern with long-term AS), and a healthy weight.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil as the main cooking fat",
        "Wide variety of vegetables and fruit",
        "Wholegrains, pulses, and seeds",
        "Calcium and vitamin D for bone health",
      ],
      foodsToLimit: [
        "Ultra-processed foods",
        "Excess sugar and refined carbohydrates",
        "Excess alcohol",
        "Foods that personally appear to trigger your symptoms",
      ],
    },
  },

  "juvenile-arthritis": {
    symptoms: {
      headline: "Juvenile arthritis symptoms",
      intro:
        "Juvenile idiopathic arthritis (JIA) is the most common form of arthritis in children, affecting around 1 in 1,000 under-16s in the UK. Early recognition leads to better long-term outcomes.",
      commonSymptoms: [
        "Joint pain, swelling, or warmth lasting more than six weeks",
        "Morning stiffness or a limp on waking",
        "A reluctance to use a particular limb or joint",
        "Unexplained fevers, rashes, or fatigue (in systemic JIA)",
        "Eye inflammation (uveitis) â€” often without symptoms, so screening is essential",
        "Growth delay or limb-length differences in long-standing disease",
      ],
      whenToSeeGP:
        "See your GP if your child has joint swelling, persistent limp, or stiffness on waking that hasn't settled in a few weeks. Early referral to paediatric rheumatology is important.",
    },
    treatment: {
      headline: "Juvenile arthritis treatment",
      intro:
        "JIA treatment is led by paediatric rheumatology and aims to control inflammation, prevent joint damage, and protect normal growth and development.",
      approaches: [
        { name: "Methotrexate", description: "First-line DMARD for most subtypes of JIA." },
        { name: "Biologic therapies", description: "Anti-TNF and other biologics for moderate-to-severe disease." },
        { name: "Steroid joint injections", description: "Targeted treatment for individual swollen joints." },
        { name: "NSAIDs", description: "Used for symptom control alongside disease-modifying treatment." },
        { name: "Paediatric physiotherapy", description: "Maintains range of motion and supports normal physical development." },
        { name: "Uveitis screening", description: "Regular eye checks by ophthalmology to detect silent eye inflammation." },
      ],
    },
    exercises: {
      headline: "Best exercises for juvenile arthritis",
      intro:
        "Children and young people with JIA benefit from low-impact, play-based movement that protects growing joints while building strength, confidence, and social connection.",
      keyBenefits: [
        "Maintains joint range of motion",
        "Builds strength to protect affected joints",
        "Supports normal growth and bone development",
        "Improves confidence and social participation",
        "Reduces the deconditioning that comes with chronic illness",
      ],
    },
    diet: {
      headline: "Diet for juvenile arthritis",
      intro:
        "Children with JIA need a balanced, age-appropriate diet that supports growth, bone health, and immune function. Calcium and vitamin D are particularly important during steroid treatment.",
      foodsToFavor: [
        "Calcium-rich foods (dairy or fortified alternatives) every day",
        "Oily fish for omega-3s and vitamin D",
        "Variety of fruit and vegetables",
        "Wholegrains and pulses",
        "Lean protein for growth and muscle development",
      ],
      foodsToLimit: [
        "Sugary drinks and ultra-processed snacks",
        "Excess fast food",
        "Foods that personally trigger flares",
      ],
    },
  },

  fibromyalgia: {
    symptoms: {
      headline: "Fibromyalgia symptoms",
      intro:
        "Fibromyalgia is a chronic pain condition affecting around 1 in 20 adults in the UK. It's not arthritis but is often managed alongside it and is included here because of how often the two coexist.",
      commonSymptoms: [
        "Widespread pain lasting more than three months",
        "Persistent fatigue, even after sleep",
        "Cognitive difficulties â€” often called 'fibro fog'",
        "Sleep that doesn't feel restorative",
        "Heightened sensitivity to touch, light, sound, or temperature",
        "Irritable bowel symptoms, headaches, and mood changes",
      ],
      whenToSeeGP:
        "See your GP if you have widespread pain and fatigue lasting more than three months. Diagnosis is clinical and your GP can rule out other conditions and refer for support.",
    },
    treatment: {
      headline: "Fibromyalgia treatment",
      intro:
        "Fibromyalgia treatment focuses on self-management â€” graded exercise, pacing, and sleep â€” supported by medication where helpful. There's no single cure.",
      approaches: [
        { name: "Graded exercise", description: "The strongest evidence-based treatment for reducing pain and fatigue." },
        { name: "Cognitive behavioural therapy", description: "Helps with pain coping, sleep, and mood." },
        { name: "Pacing strategies", description: "Spreading activity across the week to avoid post-exertional crashes." },
        { name: "Amitriptyline or duloxetine", description: "Low-dose medications used for pain and sleep, prescribed by your GP." },
        { name: "Sleep hygiene", description: "Targeted improvements often reduce pain and fatigue significantly." },
        { name: "Pain management programmes", description: "Multidisciplinary UK healthcare programmes for complex cases." },
      ],
    },
    exercises: {
      headline: "Best exercises for fibromyalgia",
      intro:
        "Very gentle, graded exercise is one of the most strongly evidenced treatments for fibromyalgia, reducing widespread pain, improving sleep, and easing fatigue over 8â€“12 weeks of consistent practice.",
      keyBenefits: [
        "Reduces widespread pain over 8â€“12 weeks of consistent practice",
        "Improves sleep quality",
        "Reduces fatigue (counter-intuitive but well-evidenced)",
        "Improves mood and reduces anxiety",
        "Builds tolerance to daily activity",
      ],
    },
    diet: {
      headline: "Diet for fibromyalgia",
      intro:
        "There's no specific fibromyalgia diet, but a Mediterranean-style eating pattern supports energy, mood, and inflammation control. Limiting caffeine and alcohol often helps sleep.",
      foodsToFavor: [
        "Regular balanced meals to support energy levels",
        "Oily fish, olive oil, nuts, and seeds",
        "Wholegrains for steady energy",
        "Plenty of fruit and vegetables",
        "Magnesium-rich foods (leafy greens, pulses, seeds)",
      ],
      foodsToLimit: [
        "Excess caffeine, especially after lunch",
        "Excess alcohol (disrupts sleep)",
        "Ultra-processed foods and added sugars",
        "Foods that personally trigger your symptoms",
      ],
    },
  },

  lupus: {
    symptoms: {
      headline: "Lupus symptoms",
      intro:
        "Systemic lupus erythematosus (SLE) is an autoimmune condition that can affect joints, skin, kidneys, blood, and other organs. Symptoms come and go in flares and remissions.",
      commonSymptoms: [
        "Joint pain and swelling, often in the hands, wrists, and knees",
        "Persistent fatigue",
        "Butterfly-shaped rash across the cheeks and nose, or sun-triggered rashes",
        "Hair thinning",
        "Mouth or nose ulcers",
        "Fevers, chest pain, or kidney involvement during flares",
      ],
      whenToSeeGP:
        "See your GP if you have persistent unexplained fatigue, joint pain, rashes â€” particularly sun-triggered â€” or recurrent mouth ulcers. Blood tests can screen for lupus.",
    },
    treatment: {
      headline: "Lupus treatment",
      intro:
        "Lupus treatment is tailored to which organs are involved. The goal is to control inflammation, prevent organ damage, and minimise medication side effects.",
      approaches: [
        { name: "Hydroxychloroquine", description: "The cornerstone of long-term lupus treatment for almost everyone with SLE." },
        { name: "Corticosteroids", description: "Short courses for flares, kept at the lowest effective dose." },
        { name: "Immunosuppressants", description: "Methotrexate, mycophenolate, or azathioprine for more active disease." },
        { name: "Biologic therapies", description: "Belimumab and other biologics for selected cases." },
        { name: "Sun protection", description: "SPF 50+ daily â€” UV light is a major trigger for lupus flares." },
        { name: "Specialist monitoring", description: "Regular blood and urine tests to detect organ involvement early." },
      ],
    },
    exercises: {
      headline: "Best exercises for lupus",
      intro:
        "Regular gentle exercise reduces lupus fatigue, supports cardiovascular health â€” an important consideration in SLE â€” and protects joint and muscle function.",
      keyBenefits: [
        "Reduces lupus fatigue",
        "Supports cardiovascular health (lupus increases heart risk)",
        "Maintains joint range of motion",
        "Protects bone density during steroid treatment",
        "Improves mood and reduces flare-related anxiety",
      ],
    },
    diet: {
      headline: "Diet for lupus",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports lupus management, protects heart and bone health, and helps offset the side effects of long-term steroid treatment.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil, nuts, and seeds",
        "Plenty of fruit and vegetables",
        "Wholegrains and pulses",
        "Calcium and vitamin D for bone protection",
      ],
      foodsToLimit: [
        "Excess salt (important during steroid treatment)",
        "Ultra-processed and high-sugar foods",
        "Excess alcohol",
        "Alfalfa sprouts â€” anecdotally linked to lupus flares",
      ],
    },
  },

  "knee-arthritis": {
    symptoms: {
      headline: "Knee arthritis symptoms",
      intro:
        "Knee osteoarthritis is the most common cause of long-term knee pain in UK adults. Symptoms usually develop gradually over years.",
      commonSymptoms: [
        "Knee pain that worsens with walking, stairs, or kneeling",
        "Stiffness, particularly after sitting for long periods",
        "Swelling around the knee, especially after activity",
        "Grating or clicking sensations during movement",
        "Knee giving way or feeling unstable",
        "Reduced ability to fully straighten or bend the knee",
      ],
      whenToSeeGP:
        "See your GP if knee pain has lasted more than a few weeks, is limiting your daily activities, or is accompanied by significant swelling, locking, or giving way.",
    },
    treatment: {
      headline: "Knee arthritis treatment",
      intro:
        "NICE recommends starting with exercise, weight management, and topical pain relief. Surgery is considered only when conservative measures no longer control symptoms.",
      approaches: [
        { name: "Quadriceps strengthening", description: "Stronger quads reliably reduce knee OA pain â€” more so than any single drug." },
        { name: "Weight management", description: "Every kilogram lost reduces knee load by up to four kilograms during walking." },
        { name: "Topical NSAIDs", description: "First-line drug treatment per NICE 2022 guidance." },
        { name: "Walking aids", description: "A stick used in the opposite hand reduces knee load by up to 25%." },
        { name: "Steroid injections", description: "Short-term relief for flares â€” typically no more than three per year." },
        { name: "Knee replacement surgery", description: "Considered when conservative care no longer manages pain or function." },
      ],
    },
    exercises: {
      headline: "Best exercises for knee arthritis",
      intro:
        "Strengthening the quadriceps and glutes reduces knee pain more reliably than any non-surgical treatment. Combine with low-impact aerobic activity for best results.",
      keyBenefits: [
        "Reduces knee pain within 6â€“8 weeks of consistent practice",
        "Strengthens quads and glutes â€” the muscles that protect the knee",
        "Improves balance and reduces fall risk",
        "Supports a healthy weight",
        "May delay or avoid the need for knee replacement",
      ],
    },
    diet: {
      headline: "Diet for knee arthritis",
      intro:
        "Maintaining a healthy weight is the single most impactful dietary step you can take for knee OA. A Mediterranean eating pattern supports both weight and inflammation.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil, nuts, and seeds",
        "Plenty of vegetables and fruit â€” aim for 7+ portions daily",
        "Wholegrains and pulses for fibre and satiety",
        "Lean protein to support muscle around the joint",
      ],
      foodsToLimit: [
        "Ultra-processed foods and added sugars",
        "Sugary drinks",
        "Excess alcohol",
        "Foods high in saturated fat",
      ],
    },
  },

  "hand-arthritis": {
    symptoms: {
      headline: "Hand arthritis symptoms",
      intro:
        "Hand arthritis most often affects the base of the thumb and the small joints of the fingers. Symptoms can significantly affect grip, dexterity, and daily tasks.",
      commonSymptoms: [
        "Pain or aching in the fingers, thumb base, or wrist",
        "Morning stiffness in the hands",
        "Reduced grip strength â€” opening jars or turning keys becomes difficult",
        "Visible bony lumps at the finger joints (Heberden's and Bouchard's nodes)",
        "Swelling and warmth in finger joints (suggests inflammatory arthritis)",
        "Loss of fine motor control for buttons, zips, or handwriting",
      ],
      whenToSeeGP:
        "See your GP if hand symptoms are limiting daily activities, if you notice swelling and warmth (suggesting inflammatory arthritis), or if symptoms are affecting both hands symmetrically.",
    },
    treatment: {
      headline: "Hand arthritis treatment",
      intro:
        "Hand OA is treated with a combination of joint protection, exercise, and pain relief. Inflammatory hand arthritis (such as RA) is treated with disease-modifying drugs alongside hand therapy.",
      approaches: [
        { name: "Hand exercises", description: "Daily range-of-motion and gentle strengthening exercises preserve function." },
        { name: "Topical NSAIDs", description: "First-line drug treatment for hand OA." },
        { name: "Splinting", description: "Particularly helpful for thumb-base OA and during flares of inflammatory arthritis." },
        { name: "Occupational therapy", description: "Joint protection, adaptive equipment, and task modification." },
        { name: "Steroid injections", description: "Useful for severely painful individual joints." },
        { name: "Surgery", description: "Considered for severe thumb-base or finger joint problems that don't respond to other treatment." },
      ],
    },
    exercises: {
      headline: "Best exercises for hand arthritis",
      intro:
        "Daily range-of-motion and gentle grip work preserves hand function, reduces stiffness, and protects the small joints from contracture.",
      keyBenefits: [
        "Maintains finger and thumb range of motion",
        "Reduces morning stiffness",
        "Preserves grip strength for daily tasks",
        "Protects against joint contracture",
        "Can be done while watching TV or at your desk",
      ],
    },
    diet: {
      headline: "Diet for hand arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet may reduce hand pain and supports the general health of joint tissues.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil, nuts, and seeds",
        "Colourful fruit and vegetables",
        "Wholegrains and pulses",
        "Adequate hydration to support joint tissue health",
      ],
      foodsToLimit: [
        "Ultra-processed foods and added sugars",
        "Excess alcohol",
        "Foods high in saturated fat",
      ],
    },
  },

  "shoulder-arthritis": {
    symptoms: {
      headline: "Shoulder arthritis symptoms",
      intro:
        "Shoulder arthritis affects the glenohumeral or acromioclavicular joint and is most common after age 50. It can also follow rotator cuff injury.",
      commonSymptoms: [
        "Deep, aching shoulder pain â€” often worse at night",
        "Stiffness and reduced range of motion",
        "Difficulty reaching overhead, behind the back, or across the body",
        "Clicking or grinding sensations during movement",
        "Pain that radiates down the upper arm",
        "Weakness from disuse of the affected arm",
      ],
      whenToSeeGP:
        "See your GP if shoulder pain has lasted more than a few weeks, wakes you at night, or is significantly limiting overhead reach or dressing.",
    },
    treatment: {
      headline: "Shoulder arthritis treatment",
      intro:
        "Shoulder arthritis treatment focuses on preserving range of motion, controlling pain, and avoiding the frozen-shoulder stiffness that often complicates the condition.",
      approaches: [
        { name: "Physiotherapy", description: "Tailored range-of-motion and strengthening programmes preserve function." },
        { name: "Pain relief", description: "Paracetamol, topical NSAIDs, and short-term oral NSAIDs for flares." },
        { name: "Heat or ice", description: "Heat before exercise; ice after activity for inflammation." },
        { name: "Steroid injections", description: "Often very effective for shoulder OA pain â€” used selectively." },
        { name: "Activity modification", description: "Adapting overhead tasks and lifting to protect the shoulder." },
        { name: "Joint replacement surgery", description: "Considered for severe arthritis when conservative care fails." },
      ],
    },
    exercises: {
      headline: "Best exercises for shoulder arthritis",
      intro:
        "Maintaining shoulder range of motion prevents the frozen-shoulder stiffness that often complicates shoulder arthritis. Pendulum and wall-walking exercises are foundational.",
      keyBenefits: [
        "Maintains shoulder range of motion",
        "Prevents frozen-shoulder complications",
        "Strengthens the rotator cuff and scapular muscles",
        "Reduces pain over weeks of consistent practice",
        "Improves ability to dress, reach, and lift",
      ],
    },
    diet: {
      headline: "Diet for shoulder arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports joint health and helps maintain a healthy weight, reducing strain on all joints.",
      foodsToFavor: [
        "Oily fish for omega-3s",
        "Olive oil, nuts, and seeds",
        "Plenty of fruit and vegetables",
        "Wholegrains and pulses",
        "Lean protein for shoulder muscle health",
      ],
      foodsToLimit: [
        "Ultra-processed foods",
        "Added sugars and sugary drinks",
        "Excess alcohol",
        "Foods high in saturated fat",
      ],
    },
  },

  "polymyalgia-rheumatica": {
    symptoms: {
      headline: "Polymyalgia rheumatica symptoms",
      intro:
        "Polymyalgia rheumatica (PMR) is an inflammatory condition causing pain and stiffness in the shoulders, neck, and hips. It almost always starts after age 50 and affects women more often than men.",
      commonSymptoms: [
        "Bilateral shoulder and hip-girdle stiffness, worst in the morning",
        "Morning stiffness lasting more than 45 minutes",
        "Difficulty getting out of bed, rising from a chair, or raising arms",
        "Aching across the upper arms, thighs, and buttocks",
        "Tiredness, low mood, and a general feeling of being unwell",
        "Possible mild fever or weight loss in some cases",
      ],
      whenToSeeGP:
        "See your GP promptly if you're over 50 and develop new bilateral shoulder and hip stiffness lasting more than two weeks. Urgent review is needed if you also have new severe headache or vision changes (possible giant cell arteritis).",
    },
    treatment: {
      headline: "Polymyalgia rheumatica treatment",
      intro:
        "PMR responds dramatically well to low-dose corticosteroids. Treatment is usually continued for 1â€“2 years with very gradual dose tapering.",
      approaches: [
        { name: "Low-dose prednisolone", description: "Most people feel much better within a few days of starting treatment." },
        { name: "Slow steroid taper", description: "Dose is reduced gradually over 1â€“2 years to prevent relapse." },
        { name: "Bone protection", description: "Calcium, vitamin D, and often a bisphosphonate to protect against steroid-induced osteoporosis." },
        { name: "Gastric protection", description: "PPIs are often co-prescribed during steroid treatment." },
        { name: "Methotrexate", description: "Sometimes added to help reduce the steroid dose if relapses are frequent." },
        { name: "Specialist referral", description: "Considered for diagnostic uncertainty or atypical course." },
      ],
    },
    exercises: {
      headline: "Best exercises for polymyalgia rheumatica",
      intro:
        "Gentle daily movement counteracts the muscle weakness that develops from PMR and from long-term steroid treatment, supporting bone health and reducing fall risk.",
      keyBenefits: [
        "Maintains muscle strength during steroid treatment",
        "Supports bone density",
        "Reduces fall risk",
        "Improves mood and energy",
        "Helps with the slow recovery of physical capacity",
      ],
    },
    diet: {
      headline: "Diet for polymyalgia rheumatica",
      intro:
        "A balanced diet rich in calcium, vitamin D, and protein supports bone and muscle health during the long course of steroid treatment.",
      foodsToFavor: [
        "Calcium-rich foods (dairy or fortified alternatives) every day",
        "Oily fish for omega-3s and vitamin D",
        "Lean protein to protect muscle mass",
        "Plenty of fruit and vegetables",
        "Wholegrains and pulses",
      ],
      foodsToLimit: [
        "Excess salt (important during steroid treatment)",
        "Added sugars and sugary drinks",
        "Excess alcohol",
        "Ultra-processed foods",
      ],
    },
  },

  "reactive-arthritis": {
    symptoms: {
      headline: "Reactive arthritis symptoms",
      intro:
        "Reactive arthritis is joint inflammation triggered by an infection elsewhere in the body â€” usually a gut or urinary infection. Symptoms typically appear 2â€“4 weeks after the triggering infection.",
      commonSymptoms: [
        "Joint pain and swelling, often in the knees, ankles, or feet",
        "Lower back or buttock pain",
        "Heel pain (enthesitis)",
        "Dactylitis â€” sausage-like swelling of a toe or finger",
        "Eye inflammation (conjunctivitis or uveitis)",
        "Burning on passing urine, even after the triggering infection has cleared",
      ],
      whenToSeeGP:
        "See your GP if you develop joint pain and swelling within a few weeks of a gut or urinary infection. Mention the recent infection â€” it's an important clue for diagnosis.",
    },
    treatment: {
      headline: "Reactive arthritis treatment",
      intro:
        "Most cases of reactive arthritis resolve within 6 months. Treatment focuses on symptom control, managing the triggering infection if still present, and preventing joint damage in persistent cases.",
      approaches: [
        { name: "NSAIDs", description: "First-line for joint pain and stiffness." },
        { name: "Steroid joint injections", description: "Helpful for individually swollen joints." },
        { name: "Antibiotics", description: "Used to treat the triggering infection if still active (not for the arthritis itself)." },
        { name: "Sulfasalazine or methotrexate", description: "Considered for persistent disease lasting beyond 6 months." },
        { name: "Physiotherapy", description: "Maintains range of motion and helps return to normal activity." },
        { name: "Eye and skin review", description: "Ophthalmology and dermatology input if eyes, skin, or nails are involved." },
      ],
    },
    exercises: {
      headline: "Best exercises for reactive arthritis",
      intro:
        "Gentle low-impact exercise during recovery helps restore joint mobility and prevents deconditioning while the underlying inflammation resolves.",
      keyBenefits: [
        "Maintains joint range of motion during recovery",
        "Prevents deconditioning",
        "Supports return to normal activity",
        "Improves mood and energy",
        "Helps with persistent enthesitis (heel and tendon pain)",
      ],
    },
    diet: {
      headline: "Diet for reactive arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports recovery and gut health â€” particularly important if the triggering infection was gastrointestinal.",
      foodsToFavor: [
        "Plenty of water for hydration during recovery",
        "Oily fish for omega-3s",
        "Fermented foods for gut health (yogurt, kefir, sauerkraut)",
        "Plenty of fruit and vegetables",
        "Wholegrains and pulses",
      ],
      foodsToLimit: [
        "Ultra-processed foods",
        "Added sugars",
        "Excess alcohol",
        "Anything that personally upsets your gut",
      ],
    },
  },
};
