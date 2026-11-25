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

// UK-aligned, plain-English content. Sources: NHS, NICE, Arthritis UK (formerly Versus Arthritis),
// NRAS, NASS, Lupus UK, PMRGCAuk, FMA UK clinical summaries (2024–2025).
export const conditionSubpages: Record<string, ConditionSubpages> = {
  osteoarthritis: {
    symptoms: {
      headline: "Osteoarthritis symptoms — what to look for",
      intro:
        "Osteoarthritis commonly causes joint pain, stiffness and reduced movement, often affecting knees, hips or hands. Changes in cartilage and other joint tissues can make everyday loading uncomfortable. See your GP for persistent symptoms, and seek urgent advice for a suddenly painful, hot or swollen joint.",
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
        "Osteoarthritis treatment usually combines therapeutic exercise, weight support where appropriate and carefully chosen pain relief. Strengthening surrounding muscles and reducing excess joint loading can improve function without reversing the condition. Ask your clinician about a tailored plan, medicine safety and further options if daily activities remain difficult.",
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
        "Exercise is a core treatment for osteoarthritis, combining muscle strengthening with activity that improves general fitness. Stronger muscles support affected joints, while regular movement helps maintain function. Start at a manageable level and ask a physiotherapist to adapt the exercises to your symptoms and abilities.",
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
        "A balanced diet and weight management can support osteoarthritis care, but no food rebuilds damaged cartilage. Excess body weight places additional strain on weight-bearing joints, while varied meals support general health. If weight loss is appropriate, discuss a sustainable eating and activity plan with your healthcare team.",
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
        "Rheumatoid arthritis can cause painful, swollen joints and prolonged stiffness, often affecting the hands and feet. The immune system attacks joint tissues, producing inflammation that can damage joints without treatment. See your GP promptly for persistent swelling or stiffness so assessment and specialist referral are not delayed.",
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
        "Rheumatoid arthritis treatment usually includes disease-modifying medicines alongside support for symptoms and everyday function. These medicines reduce immune-driven inflammation and can slow joint damage, rather than simply masking pain. Follow your rheumatology plan, attend monitoring appointments and discuss side effects before changing or stopping prescribed treatment.",
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
        "Exercise can help people with rheumatoid arthritis maintain joint movement and strengthen muscles around affected joints. Balancing activity with rest limits deconditioning without ignoring active inflammation or fatigue. Start gradually, adapt the programme with your physiotherapist and seek urgent advice for new hot, swollen or suddenly severely painful joints.",
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
        "A healthy balanced diet supports general wellbeing with rheumatoid arthritis, but does not replace disease-modifying medicines. Maintaining an appropriate weight can reduce extra strain on joints and support cardiovascular health. Discuss dietary changes, weight concerns and supplements with your healthcare team, particularly if you take regular medicines.",
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
        "Psoriatic arthritis can cause painful, swollen joints, stiffness and swollen fingers or toes, sometimes alongside psoriasis or nail changes. Immune-system inflammation affects joints and related tissues, not only the skin. See your GP for recurring joint symptoms, even if you have never been diagnosed with psoriasis.",
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
        "Psoriatic arthritis is treated with medicines that control symptoms and, when needed, reduce disease activity. Immune-driven inflammation can affect both joints and skin, so treatment is tailored to the pattern of illness. Tell your rheumatology team about persistent symptoms, side effects and difficulties with daily activities.",
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
        "Low-impact exercise can support joint strength and function in people with psoriatic arthritis. Moving regularly helps maintain mobility, while strengthening supports muscles around affected joints. Choose activities you can manage, increase gradually and ask your physiotherapist how to adapt movements when pain, swelling or fatigue changes.",
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
        "A healthy balanced diet supports wellbeing with psoriatic arthritis, but food changes do not replace prescribed treatment. Keeping to an appropriate weight reduces additional pressure on joints and supports general health. Discuss weight support with your healthcare team and check supplements or herbal products for medicine interactions.",
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
        "Gout can cause sudden severe joint pain with hot, swollen skin, commonly affecting the big toe. Urate crystals in and around a joint trigger a strong inflammatory response. Seek medical assessment rather than self-diagnosing, with urgent GP or NHS 111 advice for sudden severe symptoms or feeling unwell.",
      commonSymptoms: [
        "Sudden onset of severe joint pain, often overnight or in the early morning",
        "Hot, red, swollen joint — most commonly the base of the big toe",
        "Once the attack eases, the skin over the joint can turn itchy and flaky",
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
        "Gout treatment addresses both painful attacks and, where needed, long-term urate control to prevent recurrence. Urate-lowering medicines reduce the crystal burden that drives attacks, while other treatments manage inflammation. Follow your prescribed plan and ask your GP about ongoing symptoms, repeated attacks or medicine side effects.",
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
        "Gentle regular activity between gout attacks supports fitness and weight management, but painful joints need protection during an attack. Pressure on an inflamed joint can increase pain rather than help recovery. Avoid strenuous loading during an attack and discuss suitable activity and flare treatment with your clinician.",
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
        "A healthy diet, appropriate weight and adequate fluids can help reduce gout attacks alongside medical treatment. Gout develops when urate crystals form around joints, so dietary changes alone may not control the condition. Avoid crash diets and discuss alcohol, food choices and urate-lowering treatment with your GP.",
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
        "Ankylosing spondylitis commonly causes persistent back pain and stiffness, sometimes with fatigue or pain in other joints. Inflammation affects the spine and areas where tendons attach to bone. See your GP for ongoing symptoms so a rheumatologist can assess whether inflammatory back disease is the cause.",
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
        "Ankylosing spondylitis treatment usually combines exercise, physiotherapy and medicines to relieve symptoms and control inflammation. Keeping the spine moving helps maintain flexibility, while medicines address inflammatory activity that exercise alone cannot treat. Follow your rheumatology plan and discuss persistent pain, stiffness or treatment concerns with your team.",
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
        "Regular exercise and physiotherapy are important parts of managing ankylosing spondylitis alongside medical treatment. Mobility work helps maintain spinal flexibility and posture, while suitable activity supports general fitness. Ask your physiotherapist for an individual programme and adapt it if symptoms change rather than forcing painful movements.",
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
      ],
    },
    diet: {
      headline: "Diet for ankylosing spondylitis",
      intro:
        "A balanced diet supports general health with ankylosing spondylitis, but there is no established dietary cure. Adequate nutrition supports muscles and bones, while an appropriate weight avoids additional strain on joints. Discuss dietary restrictions, weight changes and any supplement use with your healthcare team alongside your treatment plan.",
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
        "Juvenile idiopathic arthritis can cause persistent joint pain, swelling, stiffness or changes in how a child moves. Inflammation can affect joint function and interfere with everyday play and activities. Arrange a GP assessment for a child with joint problems rather than assuming they are ordinary growing pains.",
      commonSymptoms: [
        "Joint pain, swelling or warmth: seek assessment rather than waiting six weeks",
        "Morning stiffness or a limp on waking",
        "A reluctance to use a particular limb or joint",
        "Unexplained fevers, rashes, or fatigue (in systemic JIA)",
        "Eye inflammation (uveitis) — often without symptoms, so screening is essential",
        "Growth delay or limb-length differences in long-standing disease",
      ],
      whenToSeeGP:
        "Arrange a GP assessment for a child with joint problems or an unexplained limp. Do not wait a few weeks or use the six-week JIA classification period as a waiting rule. Follow the emergency and eye advice above when relevant.",
    },
    treatment: {
      headline: "Juvenile arthritis treatment",
      intro:
        "Juvenile arthritis treatment is planned by a paediatric rheumatology team and may include medicines, physiotherapy and practical support. Controlling inflammation helps protect joint function while a child grows and develops. Follow the individual treatment and monitoring plan, and discuss changes in symptoms or activity with the team.",
      approaches: [
        { name: "Individual medicine plan", description: "The paediatric rheumatology team chooses treatment for the child and arranges monitoring. Do not use adult doses or change treatment from this page." },
        { name: "Specialist follow-up", description: "Review symptoms, treatment effects and any new concerns with the child's team." },
        { name: "Steroid joint injections", description: "Targeted treatment for individual swollen joints." },
        { name: "NSAIDs", description: "Used for symptom control alongside disease-modifying treatment." },
        { name: "Paediatric physiotherapy", description: "Maintains range of motion and supports normal physical development." },
        { name: "Uveitis screening", description: "Regular eye checks by ophthalmology to detect silent eye inflammation." },
      ],
    },
    exercises: {
      headline: "Activity and exercise for a child with JIA",
      intro:
        "Children with juvenile arthritis can benefit from activity adapted to their symptoms, abilities and treatment plan. Suitable movement helps maintain joint mobility and muscle strength while supporting participation in play. Ask the paediatric physiotherapy team about appropriate activities and how to adjust them when symptoms change.",
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
        "Children with juvenile arthritis need a varied, age-appropriate diet rather than restrictive arthritis diets or unverified supplements. Adequate energy and nutrients support growth, muscle function and bone health during treatment. Discuss poor appetite, weight changes or supplement questions with the paediatric team or a registered dietitian.",
      foodsToFavor: [
        "Calcium-rich foods (dairy or fortified alternatives) every day",
        "Age-appropriate foods and portions, with advice from the paediatric team",
        "Variety of fruit and vegetables",
        "Wholegrains and pulses",
        "Lean protein for growth and muscle development",
      ],
      foodsToLimit: [
        "Sugary drinks and ultra-processed snacks",
        "Excess fast food",
        "Do not remove food groups or start a supplement without paediatric or dietitian advice",
      ],
    },
  },

  fibromyalgia: {
    symptoms: {
      headline: "Fibromyalgia symptoms",
      intro:
        "Fibromyalgia commonly causes widespread pain, fatigue, sleep problems and difficulties with concentration, rather than swollen joints from arthritis. It is associated with changes in how the nervous system processes pain signals. See your GP for assessment because other conditions can cause similar symptoms and may need different treatment.",
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
        "Fibromyalgia management usually combines activity, support for sleep and wellbeing, and other treatments tailored to symptoms. Changes in pain processing mean symptoms are real even without joint damage or inflammation. Discuss a manageable care plan with your GP, including exercise, talking therapies and medicines where appropriate.",
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
        "Exercise can help manage fibromyalgia symptoms when it is introduced at a level the person can tolerate. Gradual activity supports physical function without relying on long periods of inactivity that can reduce fitness. Start gently, pace activities and ask a healthcare professional for help adapting the programme.",
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
        "A balanced diet can support general wellbeing with fibromyalgia, but no specific diet is an established cure. Regular varied meals provide energy and nutrients, while sleep and activity also affect day-to-day symptoms. Discuss persistent digestive problems, restrictive diets or unexplained weight changes with your GP or dietitian.",
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
        "Lupus can cause joint and muscle pain, persistent tiredness and skin rashes, with symptoms that may fluctuate. The immune system attacks healthy tissues and can affect organs as well as joints. See your GP for recurring symptoms and follow specialist advice if lupus is already diagnosed.",
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
        "Lupus treatment is tailored to symptoms and the organs involved, often using medicines such as hydroxychloroquine or steroids. Reducing immune-driven inflammation helps limit symptoms and protect affected tissues. Follow your specialist plan, attend monitoring appointments and report new symptoms rather than changing prescribed medicines on your own.",
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
        "Staying active can support wellbeing with lupus, but activity needs to be balanced with rest and symptom management. Gentle movement helps maintain muscle and joint function while pacing limits excessive fatigue. Discuss a suitable programme with your healthcare team and protect yourself from sunlight during outdoor activity.",
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
        "A healthy balanced diet supports lupus care but cannot replace medicines that control the disease. Calcium and vitamin D contribute to bone health, which is important when steroid treatment is needed. Ask your healthcare team about suitable food choices, supplements and any restrictions related to kidney involvement.",
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
        "Knee osteoarthritis commonly causes pain, stiffness and difficulty with walking, stairs or getting up from a chair. Changes in joint tissues and surrounding muscle function can make loading the knee uncomfortable. See your GP for persistent symptoms, with urgent advice for sudden severe pain or a hot swollen joint.",
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
        "Knee osteoarthritis treatment usually starts with therapeutic exercise, weight support where appropriate and suitable pain relief. Strengthening muscles around the knee and reducing excess loading can improve everyday function. Ask your clinician about an individual plan, medicine safety and further options if symptoms continue to limit daily life.",
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
        "Knee osteoarthritis exercise programmes usually combine strengthening the surrounding muscles with activity that improves general fitness. Stronger thigh and hip muscles help support the knee during walking and everyday tasks. Start with manageable movements and ask your physiotherapist about progression, especially if symptoms or balance are changing.",
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
        "A balanced diet and appropriate weight management can support knee osteoarthritis care, without promising to repair cartilage. Excess body weight increases the load carried through the knees during everyday movement. Discuss sustainable weight support where appropriate and combine eating changes with an exercise plan suited to your abilities.",
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
        "Hand arthritis can cause painful, stiff fingers or thumbs and make gripping, writing and opening containers difficult. Osteoarthritis and inflammatory arthritis affect joint tissues differently, so similar symptoms do not always have the same cause. See your GP for persistent symptoms or swelling rather than self-diagnosing.",
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
        "Hand arthritis treatment depends on whether symptoms arise from osteoarthritis or an inflammatory condition such as rheumatoid arthritis. Joint protection, suitable exercises and pain relief support function, while inflammatory disease may need disease-modifying treatment. Ask your clinician about diagnosis, hand therapy and aids for difficult daily tasks.",
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
        "Gentle hand exercises can help maintain movement and support everyday activities affected by arthritis. Range-of-motion movements address stiffness, while appropriate strengthening supports grip and muscle function around the joints. Start gently and ask a hand therapist or physiotherapist how to adapt exercises to pain, swelling or reduced function.",
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
        "No particular food is proven to repair arthritic hand joints, but a balanced diet supports overall health. Adequate nutrition helps maintain muscles and bones alongside exercises, joint protection and prescribed treatment. Choose varied meals and discuss supplements with your pharmacist or healthcare team, especially alongside regular medicines.",
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
        "Shoulder arthritis can cause pain, stiffness and difficulty reaching, dressing or lifting the arm. Changes within the shoulder joint can restrict movement, but tendon problems and other conditions can produce similar symptoms. See your GP for persistent problems, and seek urgent assessment for sudden severe symptoms or injury.",
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
        "Shoulder arthritis treatment may include suitable exercises, activity adjustments and pain relief, with further options considered individually. Maintaining comfortable movement supports function, while treatment choices depend on the cause and severity of symptoms. Ask your clinician about assessment and a tailored plan if daily activities remain difficult.",
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
        "Gentle shoulder movement and appropriate strengthening can support function when arthritis makes reaching or dressing difficult. Mobility exercises help maintain range, while strengthening supports the muscles controlling the shoulder. Ask your physiotherapist which movements suit your diagnosis and avoid forcing the arm through sharp or worsening pain.",
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
        "A balanced diet supports general health with shoulder arthritis, but no specific food repairs an affected joint. Adequate nutrition supports muscle and bone health alongside an appropriate exercise and treatment plan. Choose varied meals and discuss supplements, weight concerns or dietary restrictions with your healthcare team if needed.",
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
        "Polymyalgia rheumatica causes shoulder, neck and hip pain with prolonged morning stiffness, usually in older adults. Inflammation affects tissues around these areas, but other conditions can cause similar symptoms. See a GP for persistent symptoms; new headache, jaw pain or visual changes need immediate GP or NHS 111 advice.",
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
        "Polymyalgia rheumatica is usually treated with prednisolone, with the dose reduced gradually under medical supervision. Steroids reduce inflammation and symptoms, but treatment often continues for many months to prevent relapse. Follow the prescribed schedule and discuss returning symptoms or side effects rather than altering the dose yourself.",
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
        "Gentle activity can help maintain function with polymyalgia rheumatica when it is matched to symptoms and treatment. Moving regularly supports joint mobility and muscle function, while pacing helps manage tiredness. Discuss a suitable programme with your clinician or physiotherapist and report significant worsening rather than pushing through it.",
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
        "A balanced diet supports bone and muscle health during treatment for polymyalgia rheumatica, especially when steroids are prescribed. Calcium, vitamin D and adequate nutrition matter because treatment and reduced activity can affect bone health. Ask your healthcare team about dietary needs and whether supplements are appropriate for you.",
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
        "Reactive arthritis can cause sore, stiff and swollen joints after an infection, sometimes alongside eye or urinary symptoms. The immune system begins attacking joints after the original infection, which may already have settled. Seek assessment for unusual joint swelling, with urgent GP or NHS 111 advice for severe or associated symptoms.",
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
        "Reactive arthritis treatment may include anti-inflammatory medicines, physiotherapy and antibiotics if the triggering infection is still present. Inflammation can continue after an infection has cleared, so treatment depends on current symptoms and findings. Follow your care plan and tell your clinician about persistent joint, eye or urinary symptoms.",
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
        "Gentle movement can support recovery from reactive arthritis, while strenuous loading may be unsuitable when joints are swollen. Regular comfortable movement helps limit stiffness, and strengthening can be introduced when inflammation allows. Follow your care team's flare advice and seek urgent assessment for new severe or hot swollen joints.",
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
        "A healthy balanced diet supports general recovery with reactive arthritis, but it does not replace assessment or prescribed treatment. Symptoms follow an immune response to infection, not a need for detox diets. Eat varied meals and discuss ongoing digestive symptoms, weight loss or dietary restrictions with your clinician.",
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
        "Hip osteoarthritis can cause pain around the groin, hip or thigh and make walking or everyday tasks difficult. Joint changes and reduced muscle function can affect how comfortably the hip moves and bears weight. See your GP for persistent symptoms rather than assuming all hip pain is arthritis.",
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
        "Hip osteoarthritis treatment usually combines therapeutic exercise, weight support where appropriate and suitable pain relief. Stronger supporting muscles and reduced excess loading can improve function, while surgery may be considered when symptoms remain disabling. Discuss an individual plan and referral options with your clinician if daily life is affected.",
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
        "Exercise for hip osteoarthritis usually combines strengthening with activity that improves general fitness, adapted to symptoms and ability. Supporting muscles help control the hip during walking, stairs and getting out of chairs. Start at a manageable level and ask your physiotherapist how to progress without forcing painful movements.",
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
        "A balanced diet and weight support where appropriate can help people managing hip osteoarthritis, but cannot rebuild cartilage. Excess body weight increases loading through the hips, while varied meals support general health. Discuss sustainable changes with your healthcare team and combine them with an exercise plan suited to you.",
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
        "Elbow arthritis can cause aching, stiffness and difficulty straightening the arm or rotating the forearm. Changes in joint tissues may restrict movement, but injuries and other conditions can cause similar problems. See your GP for persistent symptoms, with urgent assessment for sudden severe pain or a hot swollen joint.",
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
        "Elbow arthritis treatment may include adapting activities, maintaining comfortable movement and choosing suitable pain relief with a clinician. The plan depends on the cause of arthritis and how symptoms affect function. Ask about assessment, physiotherapy and further options if pain, locking or restricted movement persist despite initial care.",
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
        "Gentle elbow movement and suitable strengthening can help maintain function when arthritis affects bending, straightening or forearm rotation. Moving within a comfortable range supports mobility without forcing a stiff joint. Ask a physiotherapist how to adapt exercises and seek assessment for sharp catching pain or worsening symptoms.",
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
        "No specific diet rebuilds an arthritic elbow joint, but balanced eating supports general health during treatment. Adequate nutrition supports muscles and bones alongside movement, activity changes and suitable pain relief. Choose varied meals and discuss supplements or restrictive diets with your healthcare team, particularly if you take regular medicines.",
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

  "foot-and-ankle-arthritis": {
    symptoms: {
      headline: "Foot and ankle arthritis symptoms",
      intro:
        "Foot and ankle arthritis can cause pain, stiffness or swelling that affects walking and the fit of shoes. Different joints and types of arthritis can be involved, so symptoms need individual assessment. See your GP for persistent problems, with urgent advice for sudden severe pain or a hot swollen joint.",
      commonSymptoms: [
        "Deep ache in the ankle or midfoot that builds with walking",
        "Stiff big toe that blocks push-off (hallux rigidus)",
        "Morning stiffness that eases after the first few steps",
        "Swelling around the ankle, midfoot or ball of the foot",
        "Bony bump on top of the big toe joint",
        "Difficulty finding comfortable footwear",
      ],
      whenToSeeGP:
        "See your GP if foot or ankle pain lasts more than a few weeks, limits walking, or comes with warm swelling or deformity. Mention any old fracture or known inflammatory arthritis.",
    },
    treatment: {
      headline: "Foot and ankle arthritis treatment",
      intro:
        "Foot and ankle arthritis care may combine suitable footwear, exercise, pain relief and specialist advice about supports. Reducing uncomfortable loading and maintaining movement can help daily function, but treatment depends on the joints involved. Ask your clinician or podiatrist about a plan if walking remains painful or limited.",
      approaches: [
        { name: "Supportive footwear", description: "Wide toe box, cushioned or rocker sole, low heel and adjustable fastenings." },
        { name: "Podiatry and orthotics", description: "Custom insoles redistribute pressure away from painful joints." },
        { name: "Physiotherapy", description: "Ankle mobility, intrinsic foot strength and balance training." },
        { name: "Pain relief", description: "Topical NSAIDs first-line for many; oral NSAIDs short-term if appropriate." },
        { name: "Injection", description: "Occasional corticosteroid injection for a stubborn flare — discuss with a clinician." },
        { name: "Surgery", description: "Fusion or replacement considered when pain or deformity still blocks daily walking after conservative care." },
      ],
    },
    exercises: {
      headline: "Best exercises for foot and ankle arthritis",
      intro:
        "Gentle ankle and toe movement, suitable strengthening and balance work can support function with foot and ankle arthritis. These activities help maintain mobility and control for everyday walking when adapted to symptoms. Ask your physiotherapist about suitable exercises and footwear, rather than forcing painful movements or unstable positions.",
      keyBenefits: [
        "Maintains ankle bend and straighten range for walking",
        "Strengthens calves and intrinsic foot muscles",
        "Improves single-leg balance and confidence",
        "Reduces morning stiffness with daily gentle work",
        "Supports recovery after a flare without total rest",
      ],
    },
    diet: {
      headline: "Diet for foot and ankle arthritis",
      intro:
        "A balanced diet supports general health with foot and ankle arthritis, but cannot rebuild damaged joint cartilage. Appropriate weight management can reduce extra loading through the feet during walking and standing. Discuss sustainable eating changes where needed and combine them with suitable footwear, activity and your prescribed treatment plan.",
      foodsToFavor: [
        "Oily fish or omega-3 sources most weeks",
        "Lean protein to support calf and foot strength work",
        "Fruit, vegetables, pulses and wholegrains",
        "Water around walking and exercise sessions",
      ],
      foodsToLimit: [
        "Ultra-processed snacks that crowd out useful meals",
        "Excess alcohol (especially if gout is in the picture)",
        "Very high-dose 'cartilage repair' supplement stacks without evidence",
      ],
    },
  },
};
