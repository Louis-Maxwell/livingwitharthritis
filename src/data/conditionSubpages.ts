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

export interface ExtraSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface SymptomsContent {
  headline: string;
  intro: string;
  commonSymptoms: string[];
  whenToSeeGP: string;
  extraSections?: ExtraSection[];
}

export interface TreatmentContent {
  headline: string;
  intro: string;
  approaches: Array<{ name: string; description: string }>;
  extraSections?: ExtraSection[];
}

export interface ExercisesContent {
  headline: string;
  intro: string;
  keyBenefits: string[];
  extraSections?: ExtraSection[];
}

export interface DietContent {
  headline: string;
  intro: string;
  foodsToFavor: string[];
  foodsToLimit: string[];
  extraSections?: ExtraSection[];
}

export interface ConditionSubpages {
  symptoms: SymptomsContent;
  treatment: TreatmentContent;
  exercises: ExercisesContent;
  diet: DietContent;
}

// UK-aligned, plain-English content. Sources: NHS, NICE, Versus Arthritis,
// NRAS, NASS, Lupus UK, PMRGCAuk, FMA UK clinical summaries (2024–2025).
export const conditionSubpages: Record<string, ConditionSubpages> = {
  osteoarthritis: {
    symptoms: {
      headline: "Osteoarthritis symptoms — what to look for",
      intro:
        "Osteoarthritis (OA) is the most common form of arthritis in the UK, affecting around 8.5 million adults. Symptoms develop gradually as cartilage wears down in weight-bearing and high-use joints — most often the knees, hips, hands, and spine.",
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
        { name: "Steroid injections", description: "Short-term relief for severe flares — typically no more than three per year per joint." },
        { name: "Joint replacement surgery", description: "Considered when conservative treatment no longer controls pain or function." },
      ],
    },
    exercises: {
      headline: "Best exercises for osteoarthritis",
      intro:
        "Movement is the single most effective self-management tool for OA. Combine low-impact aerobic activity with strength work targeting the muscles around affected joints.",
      keyBenefits: [
        "Reduces joint pain and stiffness within 6–8 weeks of consistent practice",
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
        "Rheumatoid arthritis (RA) is an autoimmune condition affecting around 450,000 adults in the UK. Early symptoms can be subtle — recognising them matters because early DMARD treatment dramatically improves long-term outcomes.",
      commonSymptoms: [
        "Symmetrical joint pain and swelling, often in the small joints of the hands and feet",
        "Morning stiffness lasting over an hour",
        "Warm, tender, swollen joints",
        "Persistent fatigue and a general feeling of being unwell",
        "Low-grade fever during active disease",
        "Rheumatoid nodules — firm lumps under the skin near affected joints",
      ],
      whenToSeeGP:
        "See your GP urgently if you have persistent joint swelling, especially in the small joints of the hands or feet — early referral to rheumatology improves long-term outcomes.",
    },
    treatment: {
      headline: "Rheumatoid arthritis treatment",
      intro:
        "RA is treated with disease-modifying anti-rheumatic drugs (DMARDs) that slow or stop joint damage. Treatment is started as early as possible — ideally within 12 weeks of symptoms.",
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
        "Supports cardiovascular health — important because RA increases heart risk",
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
        "Dactylitis — sausage-like swelling of a whole finger or toe",
        "Nail changes: pitting, ridging, or separation from the nail bed",
        "Lower back and buttock pain (axial involvement)",
        "Enthesitis — pain where tendons attach to bone, especially at the heel",
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
        "Hot, red, swollen joint — most commonly the base of the big toe",
        "Skin over the joint may look shiny and peel as the attack settles",
        "Even bedsheet pressure can feel unbearable during an attack",
        "Attacks typically last 5–10 days and resolve fully between flares",
        "Long-standing gout can cause visible lumps called tophi",
      ],
      whenToSeeGP:
        "See your GP urgently during a first suspected attack to confirm the diagnosis. Book a routine appointment if you have repeated attacks to discuss long-term urate-lowering treatment.",
    },
    treatment: {
      headline: "Gout treatment",
      intro:
        "Gout treatment has two parts: managing the acute attack, and lowering uric acid long term to prevent further attacks and joint damage. This page is educational UK guidance only — not a prescription or diagnosis. Your GP, rheumatology team or pharmacist decides what is safe for you.",
      approaches: [
        { name: "NSAIDs during attacks", description: "Often first-line for people who can take them — start early in an attack if your clinician has advised this class." },
        { name: "Colchicine", description: "Used for acute attacks when NSAIDs are unsuitable; dosing and kidney checks are clinician decisions." },
        { name: "Short steroid course", description: "Sometimes used when NSAIDs and colchicine are not appropriate." },
        { name: "Allopurinol", description: "Long-term urate-lowering therapy — the usual cornerstone of preventing future attacks once the diagnosis is confirmed." },
        { name: "Febuxostat", description: "Alternative urate-lowering option when allopurinol is not tolerated — see our Febuxostat guide." },
        { name: "Lifestyle measures", description: "Weight management, alcohol moderation, hydration and a lower-purine pattern alongside medication — not instead of it." },
      ],
      extraSections: [
        {
          heading: "Acute attack vs long-term prevention",
          body: "Treating the painful flare and preventing the next one are different jobs. Acute medicines calm the joint for days; urate-lowering therapy (usually allopurinol, sometimes febuxostat) is started or adjusted when attacks repeat or tophi appear. Do not stop long-term urate-lowering medicine during a flare unless your clinician tells you to — that is a common myth that can prolong attacks.\n\nIf a joint is suddenly hot, red and very swollen with fever or you feel severely unwell, seek urgent care (NHS 111 / A&E) because joint infection can look similar to gout.",
        },
        {
          heading: "What UK pathways usually look like",
          body: "A first suspected attack is often assessed in primary care, sometimes with joint fluid testing when the diagnosis is unclear. Repeated attacks usually trigger a conversation about long-term urate lowering and a target blood urate level. Rheumatology input is more likely when attacks are frequent, tophi are present, kidney disease complicates choices, or first-line medicines are not tolerated.\n\nFor medicine-specific reading see /guides/febuxostat-for-gout. For food patterns that support (not replace) treatment, see /conditions/gout/diet and /guides/diet.",
        },
        {
          heading: "Self-care themes between appointments",
          body: "Rest and elevate the joint in a flare; ice with a cloth barrier for short spells; ask a pharmacist which short-term pain options fit your other medicines. Between attacks, keep moving with non-impact exercise once the joint settles, stay hydrated unless advised otherwise, and cut binge alcohol and sugary drinks. Track attack dates — that diary helps your GP decide when prevention is worth starting.",
          bullets: [
            "Educational only — no doses or medicine starts from this page",
            "Charity 1218461 · clinical authorship HCPC PH128483",
            "Motion is Lotion still applies between gout attacks",
          ],
        },
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
        "Low-fat dairy — protective against gout attacks",
        "Cherries and cherry juice (modest evidence for reducing flares)",
        "Coffee in moderation",
        "Vegetables, wholegrains, and plant proteins",
      ],
      foodsToLimit: [
        "Beer and spirits — strongly associated with attacks",
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
        "Ankylosing spondylitis (AS), now often called axial spondyloarthritis, is an inflammatory arthritis that mainly affects the spine and sacroiliac joints. It usually starts before age 45. Unlike ordinary back strain, the pain eases when you move and stiffens when you sit or lie still — a pattern NICE asks GPs to treat as a referral clue, not a gym niggle.",
      commonSymptoms: [
        "Lower back and buttock pain that improves with activity, worsens with rest",
        "Morning stiffness lasting more than 30 minutes",
        "Pain that wakes you in the second half of the night",
        "Reduced spinal flexibility (bending forward, side-bending, rotation)",
        "Chest tightness from rib-joint involvement",
        "Heel pain, eye inflammation (uveitis), or fatigue in some people",
      ],
      whenToSeeGP:
        "See your GP if you've had back pain for more than three months that improves with movement and worsens with rest — this is a recognised red flag for inflammatory back pain.",
      extraSections: [
        {
          heading: "How AS symptoms differ from mechanical back pain",
          body: "Mechanical back pain usually follows lifting, a long drive or a poor night's sleep and eases with rest. AS pain is the opposite: people feel worse after a Sunday on the sofa and better after a walk or a swim. Buttock pain that swaps sides, alternating sciatica-like aches, and stiffness that needs a hot shower before you can put socks on are typical. Symptoms starting before 45, lasting more than three months, and responding to NSAIDs are the cluster NICE NG65 uses to separate inflammatory back pain from everyday strain.",
        },
        {
          heading: "Eyes, heels and chest — symptoms outside the spine",
          body: "A sudden painful red eye with light sensitivity is uveitis until proven otherwise and needs same-day ophthalmology, not another week of lubricating drops. Heel and Achilles insertion pain (enthesitis) is common. Rib-joint inflammation can make a deep breath feel tight and is sometimes mistaken for a chest infection. Mentioning these extras at a GP appointment is often what moves the story from 'bad back' to 'please consider axial SpA'.",
        },
        {
          heading: "What your GP can do before rheumatology",
          body: "Ask for a CRP or ESR, and discuss HLA-B27 if the history is typical — a negative gene test does not rule AS out. MRI of the sacroiliac joints is more useful than a plain lumbar X-ray in early disease, because X-rays can stay normal for years. Keep a two-week note of night waking, morning stiffness length, and what movement does to the pain. That note is more useful than another generic 'back pain' leaflet.",
        },
      ],
    },
    treatment: {
      headline: "Ankylosing spondylitis treatment",
      intro:
        "AS treatment combines daily exercise — the single most important self-management step — with medication to control inflammation and prevent spinal fusion. In the UK this is a rheumatology-led pathway, not a one-off pain-clinic injection.",
      approaches: [
        { name: "Daily spinal exercise", description: "Mobility, stretching, and posture work are the foundation of AS management — NASS treats this as daily medicine, not an optional extra." },
        { name: "NSAIDs", description: "First-line pharmacological treatment, often taken regularly rather than as needed so inflammation stays down overnight." },
        { name: "Biologic therapies", description: "Anti-TNF and IL-17 inhibitors for active disease that doesn't respond to NSAIDs, started through NHS rheumatology." },
        { name: "Specialist physiotherapy", description: "NASS-recommended structured programmes maintain spinal mobility and teach safe extension work." },
        { name: "Hydrotherapy", description: "Particularly helpful for stiffness and supported movement when land exercise feels too sore." },
        { name: "Surgery", description: "Rare but considered for severe spinal deformity or hip involvement after specialist review." },
      ],
      extraSections: [
        {
          heading: "How UK treatment is stepped",
          body: "Most people start with a regular NSAID plus a daily mobility routine while awaiting or attending rheumatology. If disease activity stays high — ongoing night pain, raised CRP, or MRI inflammation — NICE-aligned practice is to consider a biologic rather than adding stronger opioids. Smoking cessation is part of treatment: smoking is linked to worse radiographic progression. Steroid injections can help a stubborn sacroiliac or peripheral joint but are not a long-term spine strategy.",
        },
        {
          heading: "What to ask in rheumatology clinic",
          body: "Useful questions include: is my disease currently active on bloods or MRI; should I take NSAIDs every day; am I eligible for a TNF or IL-17 inhibitor; and can I be referred to hydrotherapy or a NASS-linked physio class. Ask about bone health if you have been less mobile or used steroids. Bring a list of eye episodes and gut or skin problems — they change the extra-articular picture.",
        },
        {
          heading: "Treatment is not the same as rest",
          body: "Resting a stiff AS spine makes it stiffer. Short rests during a flare are sensible; days in bed are not. The treatment page exists because people still hear 'take it easy' from well-meaning relatives. Pair any new medicine with the exercise page so the two plans do not fight each other.",
        },
      ],
    },
    exercises: {
      headline: "Best exercises for ankylosing spondylitis",
      intro:
        "Daily exercise is the single most important self-management step in AS. It preserves spinal range of motion, maintains posture, and reduces stiffness — and is recommended by NASS as a daily routine, including on quieter days when it is tempting to skip.",
      keyBenefits: [
        "Preserves spinal mobility and prevents stiffening",
        "Maintains posture and reduces deformity risk",
        "Reduces morning stiffness",
        "Supports chest expansion and breathing capacity",
        "Improves sleep, mood, and overall wellbeing",
      ],
      extraSections: [
        {
          heading: "A practical UK daily routine",
          body: "Ten to twenty minutes is enough if it is every day. A typical NASS-style session includes thoracic extension over a rolled towel, knee-to-chest and hip flexor stretches, standing side-bends, and a few deep breaths with hands on the ribs to remind the chest wall to move. Swimming (especially backstroke) and walking on even ground are the aerobic staples. Do the mobility block before sitting at a desk, not only in the evening when the spine has already seized.",
        },
        {
          heading: "What to avoid with AS",
          body: "Avoid high-impact loading of a fused or very stiff spine, repeated loaded flexion (toes-to-floor 'good mornings', sit-up batteries), and contact sport until a physiotherapist has cleared you. Heavy overhead work can aggravate neck and thoracic joints. If a movement causes sharp pain rather than a stretch, stop that variation and keep the rest of the session.",
        },
        {
          heading: "Flares, uveitis and NHS physiotherapy",
          body: "On a flare day, shorten the session rather than skipping the week — five minutes of breathing and gentle extension still counts. A red, painful, light-sensitive eye needs same-day ophthalmology for possible uveitis, not a wait-and-see approach. In many UK areas you can self-refer to NHS physiotherapy without a GP letter; ask for someone who knows axial spondyloarthritis. Pair this page with the main AS condition guide and the treatment subpage so exercise and medicine stay on the same plan. This is general UK information, not personal medical advice.",
        },
      ],
    },
    diet: {
      headline: "Diet for ankylosing spondylitis",
      intro:
        "There's no specific AS diet, but a Mediterranean eating pattern supports inflammation control, bone health (a concern with long-term AS), and a healthy weight so the spine and hips carry less load.",
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
      extraSections: [
        {
          heading: "Bone health is part of the AS diet conversation",
          body: "Reduced mobility, inflammation and, for some people, steroid exposure raise osteoporosis risk. Calcium-rich foods or fortified alternatives, vitamin D (especially in UK winter), and not skipping protein at breakfast matter as much as 'anti-inflammatory' branding on a yoghurt pot. If you have been on long-term steroids or have had a fragility fracture, ask about a DEXA scan rather than guessing from diet alone.",
        },
        {
          heading: "Weight, alcohol and gut overlap",
          body: "Extra weight loads the hips and lumbar spine and makes exercise harder — the one treatment AS cannot skip. Alcohol adds empty calories and can worsen sleep, which already suffers when night pain wakes you. Some people with axial SpA also have inflammatory bowel disease; if diarrhoea, blood or unexplained weight loss appear, that is a gastroenterology question, not a reason to start a restrictive 'AS protocol' diet from social media.",
        },
        {
          heading: "Supplements with honest evidence",
          body: "Omega-3 fish oil has the most consistent supportive data for inflammatory arthritis in general; vitamin D should be replaced if you are deficient. There is no robust evidence that cutting all starch, going gluten-free without coeliac disease, or taking high-dose turmeric replaces NSAIDs or biologics. Tell your pharmacist about any supplement if you take methotrexate, warfarin or a biologic.",
        },
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
        "Eye inflammation (uveitis) — often without symptoms, so screening is essential",
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
        "Cognitive difficulties — often called 'fibro fog'",
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
        "Fibromyalgia treatment focuses on self-management — graded exercise, pacing, and sleep — supported by medication where helpful. There's no single cure.",
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
        "Very gentle, graded exercise is one of the most strongly evidenced treatments for fibromyalgia, reducing widespread pain, improving sleep, and easing fatigue over 8–12 weeks of consistent practice.",
      keyBenefits: [
        "Reduces widespread pain over 8–12 weeks of consistent practice",
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
        "Systemic lupus erythematosus (SLE) is an autoimmune condition that can affect joints, skin, kidneys, blood, and other organs. Symptoms come and go in flares and remissions. This page is the NHS-pathway checklist; the library note at /library/lupus-symptoms explains the same signs in more narrative detail.",
      commonSymptoms: [
        "Joint pain and swelling, often in the hands, wrists, and knees",
        "Persistent fatigue",
        "Butterfly-shaped rash across the cheeks and nose, or sun-triggered rashes",
        "Hair thinning",
        "Mouth or nose ulcers",
        "Fevers, chest pain, or kidney involvement during flares",
      ],
      whenToSeeGP:
        "See your GP if you have persistent unexplained fatigue, joint pain, rashes — particularly sun-triggered — or recurrent mouth ulcers. Blood tests can screen for lupus.",
      extraSections: [
        {
          heading: "How lupus symptoms differ from rheumatoid arthritis",
          body: "Both SLE and RA can swell the small joints of the hands. RA is typically more persistent, symmetrical and damaging to cartilage if untreated. Lupus joint pain often flits between joints, may be less destructive, and almost always travels with extra-articular clues — a sun-triggered rash, mouth ulcers, hair loss, low white cells, or urine changes. Telling your GP about those extras is what stops the story being filed as 'possible RA' or 'viral illness' for another six months.",
        },
        {
          heading: "Photosensitivity on ordinary UK days",
          body: "UV can trigger both skin and systemic flares. You do not need a Mediterranean holiday: a bright March day, a conservatory, or fluorescent lighting can be enough for some people. A rash that appears after gardening or a lunchtime walk, then fades, is worth mentioning. Daily SPF 50, a wide-brimmed hat and UV-protective clothing are clinical advice from Lupus UK, not vanity.",
        },
        {
          heading: "Kidney and chest clues you should not ignore",
          body: "Foamy or pink urine, new ankle swelling, or rising blood pressure can be lupus nephritis and need prompt blood and urine tests. Chest pain that is worse on inspiration can be pleurisy or pericarditis. These are not 'wait and see' symptoms if you already have a lupus diagnosis — contact your rheumatology advice line the same day. If you are not yet diagnosed, take them to a GP urgently rather than waiting for a routine slot.",
        },
        {
          heading: "Tests that help a UK diagnosis",
          body: "A GP can start FBC, U&E, LFT, urine protein, ESR/CRP and ANA. Rheumatology may add anti-dsDNA, ENA, complement and antiphospholipid antibodies. A positive ANA alone is not a diagnosis; a matching clinical picture is. Keep a photograph of the rash and a two-week fatigue/joint diary for the first specialist letter.",
        },
      ],
    },
    treatment: {
      headline: "Lupus treatment",
      intro:
        "Lupus treatment is tailored to which organs are involved. The goal is to control inflammation, prevent organ damage, and minimise medication side effects. In the UK this is almost always rheumatology-led, with GP blood monitoring shared once you are stable.",
      approaches: [
        { name: "Hydroxychloroquine", description: "The cornerstone of long-term lupus treatment for almost everyone with SLE — it reduces flares and helps protect organs." },
        { name: "Corticosteroids", description: "Short courses for flares, kept at the lowest effective dose because of bone, skin and glucose effects." },
        { name: "Immunosuppressants", description: "Methotrexate, mycophenolate, or azathioprine for more active or organ-threatening disease." },
        { name: "Biologic therapies", description: "Belimumab and other biologics for selected NHS cases that stay active despite standard drugs." },
        { name: "Sun protection", description: "SPF 50+ daily — UV light is a major trigger for lupus flares, including on cloudy UK days." },
        { name: "Specialist monitoring", description: "Regular blood and urine tests to detect organ involvement early, not only when you feel unwell." },
      ],
      extraSections: [
        {
          heading: "Hydroxychloroquine in everyday UK care",
          body: "Most people stay on hydroxychloroquine long term. It is not a painkiller you take as required; stopping it is a common reason flares return. Eye screening is organised because rare retinal toxicity is the main long-term risk — attend those appointments even when you feel well. Tell every new prescriber you take it; some drugs interact.",
        },
        {
          heading: "Steroids: useful, not a lifestyle",
          body: "A short prednisolone course can shut down a flare while slower drugs take effect. Bone protection, blood-pressure and glucose checks, and a plan to taper matter more than the starting dose. If you need repeated courses, that is a signal to escalate disease-modifying treatment, not to live on 10 mg forever.",
        },
        {
          heading: "Pregnancy and contraception conversations",
          body: "Many people with SLE have healthy pregnancies when disease is quiet and medicines are reviewed in advance. Mycophenolate and some other immunosuppressants are not safe in pregnancy; hydroxychloroquine usually continues. Ask for a pre-pregnancy rheumatology and obstetric-medicine review rather than stopping tablets yourself.",
        },
      ],
    },
    exercises: {
      headline: "Best exercises for lupus",
      intro:
        "Regular gentle exercise reduces lupus fatigue, supports cardiovascular health — an important consideration in SLE — and protects joint and muscle function. It is not a cure, but it is one of the few treatments you can start while waiting for a rheumatology slot.",
      keyBenefits: [
        "Reduces lupus fatigue",
        "Supports cardiovascular health (lupus increases heart risk)",
        "Maintains joint range of motion",
        "Protects bone density during steroid treatment",
        "Improves mood and reduces flare-related anxiety",
      ],
      extraSections: [
        {
          heading: "Safe movement during a lupus flare",
          body: "On a high-inflammation day, swap walks for range-of-motion in a chair, gentle stretching, and breathing work. Hot, swollen joints should be moved through a comfortable arc, not loaded. Resume your usual walk or swim only when fevers settle and the joint is no longer red-hot. Post-exertional crashes that last more than a day mean the session was too long, not that exercise is 'bad for lupus'.",
        },
        {
          heading: "UV, heat and where to train in the UK",
          body: "Outdoor midday running in summer is a poor match for photosensitive SLE. Indoor swimming, early-morning walks, a shady park, or a cool gym are safer. Heat can worsen fatigue independently of UV. If you use a conservatory or exercise by a large window, apply SPF first — glass does not block all relevant UV.",
        },
        {
          heading: "A weekly SLE-friendly pattern",
          body: "Aim for most days, not heroic weekends. Two or three 10–20 minute walks, one water-based session, and two short strength circuits (sit-to-stand, wall press-ups, light bands) cover heart, bone and joint needs. Tai chi or yoga suits flare weeks. If you are on steroids, include some resistance work to offset muscle loss — light and consistent beats occasional heavy sessions.",
        },
        {
          heading: "When to stop and call the team",
          body: "Stop and seek advice for chest pain, unusual breathlessness, a swollen calf, or a headache unlike your usual lupus headaches. People with antiphospholipid syndrome need extra caution around contact sport and dehydration. Otherwise, delayed-onset muscle soreness is allowed; sharp joint pain the next morning is a cue to shorten the next session.",
        },
      ],
    },
    diet: {
      headline: "Diet for lupus",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports lupus management, protects heart and bone health, and helps offset the side effects of long-term steroid treatment. It will not replace hydroxychloroquine.",
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
        "Alfalfa sprouts — anecdotally linked to lupus flares",
      ],
      extraSections: [
        {
          heading: "Steroids, salt and the supermarket shop",
          body: "Prednisolone makes the body hold salt and can raise blood pressure and blood sugar. That is why this page flags processed meat, crisps and ready meals — not because they 'cause lupus'. Cooking from fresh ingredients most days, flavouring with herbs instead of extra salt, and keeping sweet drinks for rare treats is the practical UK version of a lupus diet.",
        },
        {
          heading: "Heart-healthy eating with SLE",
          body: "SLE raises cardiovascular risk. Oily fish, extra-virgin olive oil, nuts and plenty of plants are the same pattern cardiology already recommends. Smoking cessation and blood-pressure checks sit beside the plate. If you have antiphospholipid syndrome and take warfarin, keep vitamin K-rich greens consistent week to week rather than bingeing kale then dropping it.",
        },
        {
          heading: "Alfalfa, supplements and pharmacy questions",
          body: "Alfalfa sprouts appear in lupus diet lists because of case reports of flares, not because they are a common UK staple. The more useful conversation is about supplements: high-dose vitamin E, unregulated 'immune boosters' and some herbal mixes can interact with immunosuppressants. Check with a pharmacist before adding turmeric capsules, echinacea or anything sold as an immune stimulant.",
        },
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
        { name: "Quadriceps strengthening", description: "Stronger quads reliably reduce knee OA pain — more so than any single drug." },
        { name: "Weight management", description: "Every kilogram lost reduces knee load by up to four kilograms during walking." },
        { name: "Topical NSAIDs", description: "First-line drug treatment per NICE 2022 guidance." },
        { name: "Walking aids", description: "A stick used in the opposite hand reduces knee load by up to 25%." },
        { name: "Steroid injections", description: "Short-term relief for flares — typically no more than three per year." },
        { name: "Knee replacement surgery", description: "Considered when conservative care no longer manages pain or function." },
      ],
    },
    exercises: {
      headline: "Best exercises for knee arthritis",
      intro:
        "Strengthening the quadriceps and glutes reduces knee pain more reliably than any non-surgical treatment. Combine with low-impact aerobic activity for best results.",
      keyBenefits: [
        "Reduces knee pain within 6–8 weeks of consistent practice",
        "Strengthens quads and glutes — the muscles that protect the knee",
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
        "Plenty of vegetables and fruit — aim for 7+ portions daily",
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
        "Reduced grip strength — opening jars or turning keys becomes difficult",
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
        "Deep, aching shoulder pain — often worse at night",
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
        { name: "Steroid injections", description: "Often very effective for shoulder OA pain — used selectively." },
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
        "PMR responds dramatically well to low-dose corticosteroids. Treatment is usually continued for 1–2 years with very gradual dose tapering.",
      approaches: [
        { name: "Low-dose prednisolone", description: "Most people feel much better within a few days of starting treatment." },
        { name: "Slow steroid taper", description: "Dose is reduced gradually over 1–2 years to prevent relapse." },
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
        "Reactive arthritis is joint inflammation triggered by an infection elsewhere in the body — usually a gut or urinary infection. Symptoms typically appear 2–4 weeks after the triggering infection, which may already have settled, so people often do not connect the two.",
      commonSymptoms: [
        "Joint pain and swelling, often in the knees, ankles, or feet",
        "Lower back or buttock pain",
        "Heel pain (enthesitis)",
        "Dactylitis — sausage-like swelling of a toe or finger",
        "Eye inflammation (conjunctivitis or uveitis)",
        "Burning on passing urine, even after the triggering infection has cleared",
      ],
      whenToSeeGP:
        "See your GP if you develop joint pain and swelling within a few weeks of a gut or urinary infection. Mention the recent infection — it's an important clue for diagnosis.",
      extraSections: [
        {
          heading: "The infection-to-joint timeline",
          body: "A typical UK story is a week of diarrhoea after travel or a takeaway, or a urinary infection, then a quiet fortnight, then a knee or ankle that swells almost overnight. The germ has usually gone; the immune system is still reacting. That is why antibiotics for the joint itself are often not the answer once the original infection has cleared. Write the dates down — rheumatology letters are easier when the timeline is clear.",
        },
        {
          heading: "How this differs from septic arthritis",
          body: "A single extremely hot joint with fever and inability to move it can be infection inside the joint — a same-day emergency. Reactive arthritis more often involves more than one joint, follows a recent gut or urinary illness, and the person is less systemically toxic. If you are unsure which you have, treat it as urgent. A GP or emergency department can rule out sepsis and crystal arthritis before labelling it reactive.",
        },
        {
          heading: "Eyes, heels and the classic pattern",
          body: "The old teaching triad — arthritis, urethritis, conjunctivitis — still appears, but many people have only two of the three. Heel pain and a swollen 'sausage' toe are as useful as a red eye. Lower back or buttock pain can look like a slipped disc. If you have recently had chlamydia or a gut infection, say so; sexual-health and stool history changes the blood tests a GP orders.",
        },
      ],
    },
    treatment: {
      headline: "Reactive arthritis treatment",
      intro:
        "Most cases of reactive arthritis resolve within 6 months. Treatment focuses on symptom control, managing the triggering infection if still present, and preventing joint damage in persistent cases.",
      approaches: [
        { name: "NSAIDs", description: "First-line for joint pain and stiffness while the reactive flare settles." },
        { name: "Steroid joint injections", description: "Helpful for individually swollen knees or ankles when tablets are not enough." },
        { name: "Antibiotics", description: "Used to treat the triggering infection if still active (not for the arthritis itself once the germ has gone)." },
        { name: "Sulfasalazine or methotrexate", description: "Considered for persistent disease lasting beyond 6 months." },
        { name: "Physiotherapy", description: "Maintains range of motion and helps return to work and walking." },
        { name: "Eye and skin review", description: "Ophthalmology and dermatology input if eyes, skin, or nails are involved." },
      ],
      extraSections: [
        {
          heading: "What 'most cases settle in six months' actually means",
          body: "Settling is not always a straight line. People often have a sore heel or a stiff knee for weeks after the dramatic swelling has gone. Persistent disease beyond six months is the point UK rheumatology usually considers a DMARD. Until then, NSAIDs, an injection, and physio are the core — plus treating any still-active STI or gut pathogen so you are not re-triggering the immune response.",
        },
        {
          heading: "Sexual health and partner treatment",
          body: "If a urinary or genital infection was the trigger, partners may need testing even when you feel the joint is the only problem left. That conversation belongs with sexual-health services or your GP, not a search for stronger painkillers. It is ordinary NHS care, not a judgement.",
        },
      ],
    },
    exercises: {
      headline: "Best exercises for reactive arthritis",
      intro:
        "Gentle low-impact exercise during recovery helps restore joint mobility and prevents deconditioning while the underlying inflammation resolves. Pushing a hot, swollen knee on a long hike usually prolongs the flare.",
      keyBenefits: [
        "Maintains joint range of motion during recovery",
        "Prevents deconditioning",
        "Supports return to normal activity",
        "Improves mood and energy",
        "Helps with persistent enthesitis (heel and tendon pain)",
      ],
      extraSections: [
        {
          heading: "The first fortnight of a swollen joint",
          body: "Use the joint through a comfortable range several times a day — ankle circles, seated knee bends, gentle heel slides on a sheet. Ice after activity if the joint heats up. A walking stick in the opposite hand unloads a painful knee. Swimming or cycling with low resistance is preferable to pavement jogging until the swelling has clearly receded.",
        },
        {
          heading: "Heel and Achilles care",
          body: "Enthesitis hates sudden hills and barefoot walking on hard floors. Cushioned shoes, a short calf stretch after warmth (not first thing on a cold floor), and avoiding plyometrics until the insertion is quiet are the practical steps. If the heel stays sore after the knee has settled, ask physio about a targeted tendon-loading plan rather than resting it completely for months.",
        },
      ],
    },
    diet: {
      headline: "Diet for reactive arthritis",
      intro:
        "A Mediterranean-style anti-inflammatory diet supports recovery and gut health — particularly important if the triggering infection was gastrointestinal. This is a recovery plate, not a detox.",
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
      extraSections: [
        {
          heading: "Eating after a gut-triggered flare",
          body: "If diarrhoea started this episode, your gut may still be irritable for weeks. Small regular meals, adequate fluid, and a gradual return to fibre work better than a sudden high-fibre 'reset'. Yogurt with live cultures or kefir is a reasonable everyday choice if you tolerate dairy; it is not a prescription. Skip alcohol until the joints are quieter — it dehydrates and disrupts sleep, both of which make pain feel worse.",
        },
        {
          heading: "NSAIDs, stomach lining and meal timing",
          body: "Naproxen or ibuprofen for a swollen knee should be taken with food. If you have a history of ulcers, ask about a proton-pump inhibitor rather than taking NSAIDs on an empty stomach. Diet cannot replace that advice. People sometimes search for a reactive-arthritis superfood while taking ibuprofen three times a day without food — fix the tablet timing first.",
        },
        {
          heading: "When 'gut health' needs a doctor, not a diet",
          body: "Ongoing bloody diarrhoea, nocturnal stool, or unexplained weight loss after a 'food poisoning' story can be inflammatory bowel disease, not a finished infection. That is a GP and gastroenterology question. Do not stay on a highly restrictive elimination diet for months without a plan — it delays the right referral and thins out nutrition while you are trying to rebuild muscle.",
        },
      ],
    },
  },

  "hip-arthritis": {
    symptoms: {
      headline: "Hip arthritis symptoms",
      intro:
        "Hip osteoarthritis usually starts as a deep ache in the groin or front of the hip, often mistaken for knee or thigh pain. Morning stiffness usually eases within about 30 minutes of moving.",
      commonSymptoms: [
        "Deep groin or front-of-hip ache that worsens with walking or standing from a chair",
        "Stiffness after sitting or first thing in the morning",
        "Pain putting on socks, shoes or clipping toenails",
        "Outer-hip or buttock ache that can travel to the knee",
        "A limp or shorter stride after longer walks",
        "Night pain that wakes you when you roll onto the painful side",
      ],
      whenToSeeGP:
        "See your GP if groin pain has lasted more than a few weeks, wakes you at night, or is stopping you walking usual distances. Ask about physiotherapy and, if night pain or limp is severe, whether imaging is needed.",
    },
    treatment: {
      headline: "Hip arthritis treatment",
      intro:
        "UK first-line care for hip osteoarthritis is exercise, weight support where needed, and simple pain relief — not an early rush to replacement. Surgery is considered when sleep, walking and daily tasks stay badly limited after months of conservative care.",
      approaches: [
        { name: "Exercise and physiotherapy", description: "Glute and hip-abductor strength plus low-impact cardio are core NICE-aligned treatment for everyone with hip OA." },
        { name: "Weight management", description: "The hip takes roughly three times body weight when walking, so even modest weight loss can cut load and pain." },
        { name: "Pain relief", description: "Paracetamol, topical NSAIDs, and short courses of oral NSAIDs for flares if safe for you." },
        { name: "Walking aids", description: "A stick in the opposite hand, or a pole, can offload a painful hip on longer walks." },
        { name: "Steroid injection", description: "Sometimes used for a severe flare while rehabilitation continues — not a permanent fix." },
        { name: "Hip replacement", description: "Considered when pain disturbs sleep, limits daily life, and 3–6 months of conservative care has not been enough." },
      ],
    },
    exercises: {
      headline: "Best exercises for hip arthritis",
      intro:
        "NICE lists exercise as a core treatment for hip osteoarthritis. Strength work for the glutes and hip abductors plus swimming, cycling or pool walking usually beats rest.",
      keyBenefits: [
        "Reduces groin and outer-hip pain with consistent practice",
        "Improves ability to stand from a chair and climb stairs",
        "Supports the muscles that stabilise a worn hip joint",
        "Low-impact options (pool, bike) keep fitness without heavy joint load",
        "Helps before and after any planned hip replacement",
      ],
    },
    diet: {
      headline: "Diet for hip arthritis",
      intro:
        "There is no special hip-arthritis diet, but weight control and an anti-inflammatory pattern matter because extra load on the hip shows up quickly in pain and walking distance.",
      foodsToFavor: [
        "A Mediterranean-style pattern: oily fish, vegetables, pulses, olive oil",
        "Protein at each meal to protect muscle while you strengthen",
        "High-fibre carbs that support steady weight loss if needed",
        "Calcium-rich foods or fortified alternatives for bone health",
        "Water through the day, especially around exercise",
      ],
      foodsToLimit: [
        "Sugary drinks and ultra-processed snacks that make weight loss harder",
        "Very large late-night meals if reflux worsens night pain",
        "Crash diets that strip muscle you need for the hip",
        "Excess alcohol, which disrupts sleep and recovery",
      ],
      extraSections: [
        {
          heading: "Why weight loss helps the hip specifically",
          body: "Every extra kilogram is multiplied across the hip when you walk or climb stairs. A realistic 5% body-weight reduction often brings a clear drop in day-to-day pain for people with hip OA — more useful than most supplement claims.",
        },
        {
          heading: "Food and NSAIDs",
          body: "If you use ibuprofen or naproxen for hip flares, take it with food and follow UK safety advice if you have stomach, kidney or heart history. Diet cannot replace that check with a pharmacist or GP.",
        },
      ],
    },
  },

  "elbow-arthritis": {
    symptoms: {
      headline: "Elbow arthritis symptoms",
      intro:
        "Elbow osteoarthritis is less common than hip or knee OA but causes a stiff, aching joint that catches when you straighten or rotate the forearm — often after prior injury or heavy manual work.",
      commonSymptoms: [
        "Deep ache around the elbow, worse with gripping or lifting",
        "Stiffness, especially first thing or after rest",
        "Catching, clicking or locking when straightening the arm",
        "Pain turning a door handle, pouring a kettle, or using a screwdriver",
        "Swelling or warmth after heavier use",
        "Weak grip from pain rather than true nerve damage (though nerve symptoms need a separate check)",
      ],
      whenToSeeGP:
        "See your GP if elbow pain and stiffness last more than a few weeks, locking is frequent, or you cannot straighten the arm. Mention any old fracture or dislocation of that elbow.",
    },
    treatment: {
      headline: "Elbow arthritis treatment",
      intro:
        "Most elbow arthritis is managed with activity changes, gentle movement, and short-term pain relief. Injections or surgery are reserved for stubborn locking or disabling pain after conservative care.",
      approaches: [
        { name: "Activity modification", description: "Ease repetitive gripping, heavy lifting and vibration tools during flares." },
        { name: "Physiotherapy", description: "Range-of-motion and forearm strengthening protect the joint without forcing end-range pain." },
        { name: "Pain relief", description: "Topical NSAIDs first-line for many people; oral NSAIDs short-term if appropriate." },
        { name: "Heat before movement", description: "Warm the elbow before exercise or morning tasks to reduce stiffness." },
        { name: "Injection", description: "Steroid injection is occasional for a bad flare — discuss benefits and limits with a clinician." },
        { name: "Surgery", description: "Rarely needed; considered for severe arthritis or mechanical locking that blocks daily life." },
      ],
    },
    exercises: {
      headline: "Best exercises for elbow arthritis",
      intro:
        "Keep the elbow moving through comfortable range and strengthen the forearm gradually. Avoid grinding into sharp catching pain.",
      keyBenefits: [
        "Maintains bend and straighten range for dressing and cooking",
        "Improves grip strength for jars and kettles",
        "Reduces morning stiffness with daily gentle work",
        "Supports recovery after a flare without total rest",
        "Pairs well with activity changes at work or hobbies",
      ],
    },
    diet: {
      headline: "Diet for elbow arthritis",
      intro:
        "Diet will not rebuild worn elbow cartilage, but steady weight control, protein for muscle, and an anti-inflammatory pattern support the whole-joint plan.",
      foodsToFavor: [
        "Oily fish or omega-3 sources most weeks",
        "Lean protein to support forearm and upper-body strength work",
        "Fruit, vegetables, pulses and wholegrains",
        "Water around exercise sessions",
      ],
      foodsToLimit: [
        "Ultra-processed snacks that crowd out useful meals",
        "Excess alcohol",
        "Very high-dose supplement stacks marketed for 'cartilage repair' without evidence",
      ],
    },
  },
};

