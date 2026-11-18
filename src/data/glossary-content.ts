// Real, plain-English definitions for high-value glossary terms.
// UK-focused (UK healthcare terminology where relevant). Keep entries 50–100 words.
// Fallback UI applies when a slug is not defined here.

export interface GlossaryEntry {
  /** Display label — overrides the slug-derived label when set. */
  label: string;
  /** Short one-line summary shown in listings. */
  short: string;
  /** Full definition, 50–100 words. Plain-English, UK-focused. */
  body: string;
  /** Optional related term slugs (must exist in GLOSSARY_ROUTES). */
  related?: string[];
  /** Editorial source check, not a clinical-review attestation. */
  editorialUpdatedAt?: string;
  sources?: Array<{ name: string; url: string }>;
  reviewNote?: string;
}

export const GLOSSARY_CONTENT: Record<string, GlossaryEntry> = {
  "facet-joint-injection": {
    "label": "Facet joint injection",
    "short": "An injection into the small joints linking the bones of the spine, sometimes used to reduce pain temporarily.",
    "body": "Facet joints link the bones of the spine and help guide movement. A specialist may offer an injection of local anaesthetic and steroid into these joints for selected back or neck pain. The injection may reduce pain temporarily; it is not a cure and does not help everyone. It is usually performed with imaging guidance. Discuss the possible benefits, alternatives and risks, including infection, bleeding and a temporary increase in pain, with your treating team. Follow their preparation and aftercare instructions rather than assuming advice for another injection applies.",
    "related": [
      "corticosteroid"
    ],
    "sources": [
      {
        "name": "East Kent Hospitals NHS: Facet joint injections",
        "url": "https://leaflets.ekhuft.nhs.uk/facet-joint-injections/html/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "methotrexate": {
    "label": "Methotrexate",
    "short": "A prescription medicine that reduces immune-system activity and inflammation in conditions such as rheumatoid arthritis.",
    "body": "Methotrexate is used for inflammatory conditions including rheumatoid and psoriatic arthritis. For these conditions it is taken once a week, on the same day each week, not every day. Cancer treatment uses different specialist regimens. It may be prescribed as tablets, liquid or an injection. Follow your prescription and keep your weekly dose record with you. Methotrexate can increase the risk of infection, so ask your prescribing team for urgent advice if you develop an infection. Your team will explain monitoring, blood tests and precautions with other medicines.",
    "related": [
      "dmard",
      "sulfasalazine"
    ],
    "sources": [
      {
        "name": "NHS: About methotrexate",
        "url": "https://www.nhs.uk/medicines/methotrexate/about-methotrexate/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "pain-scale": {
    "label": "Pain scale",
    "short": "A way to describe how much pain you feel, often using a score from 0 for no pain to 10 for the worst pain.",
    "body": "A pain scale helps you communicate your experience to a healthcare professional. A common numerical scale runs from 0, meaning no pain, to 10, meaning the worst pain. The score records your own experience of pain. It is also useful to describe where the pain is, when it occurs and how it affects sleep, movement and daily activities. Use the same scale when tracking change. Ask your clinician how your score should guide your individual activity or treatment plan.",
    "related": [
      "flare"
    ],
    "sources": [
      {
        "name": "Kingston and Richmond NHS: Physio after your appointment",
        "url": "https://www.kingstonandrichmond.nhs.uk/patients-and-families/patient-leaflets/after-physio"
      },
      {
        "name": "Robert Jones and Agnes Hunt NHS: Managing pain after surgery",
        "url": "https://www.rjah.nhs.uk/media/jhljg23f/managing-pain-after-surgery-print-friendly-new.pdf"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "self-referral": {
    "label": "Self-referral",
    "short": "Contacting a healthcare service directly to ask for an assessment, without first needing another professional to refer you.",
    "body": "Self-referral lets you ask a service for help directly, often through an online form. In England, many community musculoskeletal services accept self-referrals for joint, muscle or back problems, including arthritis, without a confirmed diagnosis. Availability and eligibility vary by area; some services still need a GP referral. A health professional reviews the request and the service explains what happens next, including waiting times. Self-referral is not a guaranteed appointment or immediate treatment. Routine community MSK services do not provide urgent or emergency help; use the appropriate urgent-care route when needed.",
    "related": [
      "physiotherapy-triage"
    ],
    "sources": [
      {
        "name": "NHS: Get help for back or joint problems",
        "url": "https://www.nhs.uk/nhs-services/get-nhs-help-for-back-joint-problems/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "bone-density": {
    "label": "Bone density",
    "short": "A measure used to assess bone strength and help estimate the risk of osteoporosis and broken bones.",
    "body": "Bone density describes how dense your bones are. A DEXA scan uses low-dose X-rays to measure it, often at the hip and lower spine. The result helps assess osteoporosis and fracture risk, but it is not the whole picture: your age, previous fractures and other risk factors also matter. Low bone density can be present without symptoms until a bone breaks. A clinician interprets the scan alongside your medical history and explains whether treatment or other steps are needed. Tell the scanning team if you may be pregnant.",
    "related": [
      "bisphosphonates"
    ],
    "sources": [
      {
        "name": "NHS: Bone density scan",
        "url": "https://www.nhs.uk/tests-and-treatments/dexa-scan/"
      },
      {
        "name": "NHS: How a bone density scan is performed",
        "url": "https://www.nhs.uk/tests-and-treatments/dexa-scan/what-happens/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "codeine": {
    "label": "Codeine",
    "short": "An opioid painkiller that can cause sleepiness, constipation and dependence, and must be used as directed.",
    "body": "Codeine is an opioid medicine used for pain. Some products combine it with another painkiller, so check the ingredients to avoid accidentally taking the same medicine twice. Common side effects include constipation, nausea and sleepiness. Do not drive or use machinery if it makes you sleepy. Dependence and addiction can occur; discuss the dose, duration and any plan to stop with your prescriber or pharmacist. Do not increase the dose yourself. Tell your healthcare team about other medicines and supplements, as combinations can increase the risk of serious side effects.",
    "related": [
      "nsaid"
    ],
    "sources": [
      {
        "name": "NHS: Codeine",
        "url": "https://www.nhs.uk/medicines/codeine/"
      },
      {
        "name": "NHS: About ibuprofen and codeine",
        "url": "https://www.nhs.uk/medicines/ibuprofen-and-codeine-nurofen-plus/about-ibuprofen-and-codeine/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "nice": {
    "label": "NICE",
    "short": "The National Institute for Health and Care Excellence, which produces evidence-based guidance for health and care.",
    "body": "NICE is the National Institute for Health and Care Excellence. Its guidelines contain evidence-based recommendations for health and care in England and Wales, including advice relevant to arthritis assessment and treatment. NICE develops recommendations using evidence reviews and input from professionals, people using services and carers. It also produces other types of guidance, such as technology appraisals, as well as quality standards. Reading a NICE recommendation can help you discuss choices with your healthcare team. It is not a personal diagnosis or an instruction to start, stop or change treatment yourself.",
    "related": [
      "dmard"
    ],
    "sources": [
      {
        "name": "NICE: About NICE guidelines",
        "url": "https://www.nice.org.uk/what-nice-does/our-guidance/about-nice-guidelines"
      },
      {
        "name": "NICE: What NICE does",
        "url": "https://www.nice.org.uk/what-nice-does"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "bisphosphonates": {
    "label": "Bisphosphonates",
    "short": "Medicines that slow bone loss and help maintain bone strength, used to treat or prevent osteoporosis in suitable people.",
    "body": "Bisphosphonates are medicines used to slow the weakening of bones and reduce fracture risk in people with osteoporosis or certain risk factors. Alendronic acid is one example. Your clinician chooses treatment using your fracture risk, scan results, medical history and preferences. Instructions differ between medicines and formulations. Some tablets have strict rules about taking them with water and staying upright afterwards; follow your own leaflet and prescription. Tell your dentist about treatment and keep up dental checks. Discuss side effects, treatment duration and any planned pause with your prescribing team.",
    "related": [
      "bone-density"
    ],
    "sources": [
      {
        "name": "NHS: Osteoporosis",
        "url": "https://www.nhs.uk/conditions/osteoporosis/treatment/"
      },
      {
        "name": "NHS: About alendronic acid",
        "url": "https://www.nhs.uk/medicines/alendronic-acid/about-alendronic-acid/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "hydroxychloroquine": {
    "label": "Hydroxychloroquine",
    "short": "A prescription disease-modifying anti-rheumatic drug used for rheumatoid arthritis, lupus and some other inflammatory conditions.",
    "body": "Hydroxychloroquine is a DMARD, a disease-modifying anti-rheumatic drug. It changes the immune response to help control conditions such as rheumatoid arthritis and lupus. It usually comes as tablets; take the prescribed dose with food or milk and follow your medicine leaflet. Nausea, diarrhoea, headache and rash are possible side effects. Eye problems are uncommon but important: your team may arrange regular eye checks depending on treatment duration and risk. Seek prompt medical advice about new persistent vision changes. Ask your prescriber or pharmacist before combining it with other medicines.",
    "related": [
      "dmard"
    ],
    "sources": [
      {
        "name": "NHS: Hydroxychloroquine",
        "url": "https://www.nhs.uk/medicines/hydroxychloroquine/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "dass-score": {
    "label": "DASS score (not DAS28)",
    "short": "DASS measures symptoms of depression, anxiety and stress. It is different from DAS28, a rheumatoid arthritis disease-activity assessment.",
    "body": "The Depression Anxiety Stress Scales (DASS) are questionnaires about emotional symptoms over the past week. The original form has 42 questions; DASS21 is a shorter version. Scores describe symptom severity but do not, on their own, diagnose a mental health condition. They do not measure rheumatoid arthritis inflammation. DAS28 is a different assessment combining a joint examination, blood tests and your view of your health. If a clinic letter mentions a score, ask your healthcare team which assessment was used and what it means for you.",
    "related": [
      "rheumatoid-arthritis"
    ],
    "sources": [
      {
        "name": "UNSW: Overview of the DASS and its uses",
        "url": "https://dass.psy.unsw.edu.au/over.htm"
      },
      {
        "name": "NRAS: The DAS28 score",
        "url": "https://nras.org.uk/resource/the-das28-score/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "cfs": {
    "label": "Chronic fatigue syndrome (ME/CFS)",
    "short": "ME/CFS is a long-term condition involving severe fatigue and other symptoms, including symptoms worsening after physical or mental activity.",
    "body": "Myalgic encephalomyelitis, also called chronic fatigue syndrome (ME/CFS), can affect daily activities, sleep, concentration and memory. A key symptom is post-exertional malaise: symptoms get worse after activity and recovery can be prolonged. ME/CFS is not simply feeling tired after a busy day. There is no single diagnostic test; a GP assesses symptoms and checks for other causes. Persistent fatigue with arthritis does not automatically mean ME/CFS. Seek a GP assessment rather than self-diagnosing. Management is individual and can include help with energy management and other symptoms.",
    "related": [
      "fatigue"
    ],
    "sources": [
      {
        "name": "NHS: ME/CFS overview",
        "url": "https://www.nhs.uk/conditions/chronic-fatigue-syndrome-cfs/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "passive-vs-active-movement": {
    "label": "Passive and active movement",
    "short": "Active movement uses your own muscles. Passive movement uses outside help, such as your other hand, to move a joint.",
    "body": "In physiotherapy, active movement means moving a joint using your own muscle power. Passive movement means the joint is moved with outside help, for example using your other hand while the affected muscles relax. The type of movement advised depends on the joint, injury and stage of recovery; one is not always better than the other. Follow the plan from your physiotherapist or hand therapist, especially after surgery. Move slowly and within the limits they give you. Do not force a stretch through sharp or lasting pain.",
    "related": [
      "range-of-motion"
    ],
    "sources": [
      {
        "name": "Sherwood Forest Hospitals NHS: Thumb exercises",
        "url": "https://www.sfh-tr.nhs.uk/media/bbapxq3v/pil202503-05-te-thumb-exercises.pdf"
      },
      {
        "name": "Dorset County Hospital NHS: Wrist exercises",
        "url": "https://dchft.nhs.uk/leaflets/wrist-exercises/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },
  "meniscus": {
    "label": "Meniscus",
    "short": "A meniscus is cartilage in the knee that helps protect the joint during movement. A tear can cause pain, swelling or difficulty moving the knee.",
    "body": "The meniscus is cartilage between the bones of the knee. It helps protect them as the knee moves. A tear may follow a twisting injury, including a relatively minor twist, and can cause pain, stiffness, swelling or difficulty bending and straightening the leg. These symptoms can have other causes, so clicking alone does not establish a meniscus tear. Treatment depends on the problem and may include physiotherapy; not every tear needs surgery. Get urgent GP or NHS 111 help if you cannot bear weight or straighten the knee, or it becomes hot and swollen.",
    "related": [
      "cartilage"
    ],
    "sources": [
      {
        "name": "NHS: Meniscus tear",
        "url": "https://www.nhs.uk/conditions/meniscus-tear/"
      }
    ],
    "editorialUpdatedAt": "2026-11-18",
    "reviewNote": "This definition was checked against the linked sources. It has not yet had an independent clinical review."
  },

  sulfasalazine: {
    label: "Sulfasalazine",
    short: "A prescription medicine that reduces inflammation and is used to treat rheumatoid arthritis and inflammatory bowel disease.",
    body: "Sulfasalazine reduces inflammation. In rheumatoid arthritis, it may take one to three months before symptoms improve; it is not an immediate pain reliever. Blood, liver and kidney tests are usually needed before treatment and regularly afterwards. Follow the monitoring plan from your prescribing team rather than a fixed schedule found online. Feeling sick and indigestion are common side effects, and urine can turn orange. Take the medicine as prescribed. Speak to your doctor before stopping it, and ask your pharmacist or rheumatology team about side effects or other medicines.",
    related: ["dmard", "flare"],
    editorialUpdatedAt: "2026-11-17",
    reviewNote: "This definition was checked against the linked NHS sources. It has not yet had an independent clinical review.",
    sources: [
      { name: "NHS: About sulfasalazine", url: "https://www.nhs.uk/medicines/sulfasalazine/about-sulfasalazine/" },
      { name: "NHS: Common questions about sulfasalazine", url: "https://www.nhs.uk/medicines/sulfasalazine/common-questions-about-sulfasalazine/" },
      { name: "NHS Specialist Pharmacy Service: Sulfasalazine monitoring", url: "https://sps.nhs.uk/monitorings/sulfasalazine-monitoring/" },
    ],
  },
  raynauds: {
    label: "Raynaud's phenomenon",
    short: "Episodes of reduced blood flow, usually in fingers or toes, often triggered by cold or stress and causing colour changes, pain or numbness.",
    body: "Raynaud's phenomenon affects circulation, usually in the fingers and toes. Cold or stress can trigger colour changes, pain, numbness or pins and needles. Keeping warm and avoiding sudden temperature changes can help. It can occur on its own or alongside another condition; symptoms alone do not diagnose arthritis or lupus. See a GP if symptoms are severe, worsening, one-sided, affect daily life, start for the first time after age 30, or occur with joint pain, a rash or muscle weakness. Sores or damaged skin on affected fingers or toes need prompt medical assessment.",
    related: ["lupus", "scleroderma"],
    editorialUpdatedAt: "2026-11-17",
    reviewNote: "This definition was checked against the linked NHS sources. It has not yet had an independent clinical review.",
    sources: [
      { name: "NHS: Raynaud's", url: "https://www.nhs.uk/conditions/raynauds/" },
      { name: "NHS Tayside: Raynaud's phenomenon referral guidance", url: "https://www.rightdecisions.scot.nhs.uk/nhs-tayside-refguide/medicine/rheumatology/raynauds-phenomenon/" },
    ],
  },
  dmard: {
    label: "DMARD",
    short:
      "Disease-modifying anti-rheumatic drug — slows autoimmune arthritis damage rather than just easing pain.",
    body:
      "DMARD stands for Disease-Modifying Anti-Rheumatic Drug. Unlike painkillers, DMARDs damp down the overactive immune response driving conditions like rheumatoid, psoriatic and juvenile arthritis, which slows joint damage over months. Conventional DMARDs include methotrexate, sulfasalazine, hydroxychloroquine and leflunomide — nearly always started by an UK healthcare rheumatologist, then monitored with regular blood tests. They typically take 6–12 weeks to work. If they don't control disease activity, the team may add or switch to a biologic or targeted synthetic DMARD.",
    related: ["biologic", "nsaid", "remission", "flare"],
  },
  biologic: {
    label: "Biologic",
    short:
      "Advanced injectable or infused medicine that blocks a specific part of the immune system.",
    body:
      "Biologics are laboratory-grown proteins that block a very specific step of the immune response — for example TNF, IL-6 or IL-17 — rather than damping the whole system. In the UK they're prescribed by rheumatology when conventional DMARDs like methotrexate haven't controlled rheumatoid, psoriatic or axial spondyloarthritis to NICE thresholds. Most are self-injected under the skin (weekly, fortnightly or monthly); a few are given by hospital infusion. Because they suppress infection-fighting cells, patients are screened for TB, hepatitis and other infections before starting, and monitored throughout.",
    related: ["dmard", "remission", "flare", "seronegative"],
  },
  nsaid: {
    label: "NSAID",
    short:
      "Non-steroidal anti-inflammatory drug — like ibuprofen or naproxen — used for arthritis pain and stiffness.",
    body:
      "NSAID stands for Non-Steroidal Anti-Inflammatory Drug. This family — ibuprofen, naproxen, diclofenac, etoricoxib and others — reduces pain, swelling and stiffness by blocking COX enzymes that produce inflammatory prostaglandins. NSAIDs are widely used in osteoarthritis, gout flares and inflammatory arthritis, either as tablets, topical gels or by injection. Because they can irritate the stomach and raise blood-pressure or kidney-injury risk, UK guidance recommends the lowest effective dose for the shortest time, often with a stomach-protecting drug (PPI) for people over 45 or on long courses.",
    related: ["corticosteroid", "dmard", "flare"],
  },
  corticosteroid: {
    label: "Corticosteroid",
    short:
      "Powerful anti-inflammatory steroid — as tablets, injections or joint injections — used to calm flares.",
    body:
      "Corticosteroids (e.g. prednisolone, methylprednisolone, triamcinolone) are lab-made copies of the hormone cortisol. They quickly damp down inflammation, which is why the UK healthcare system uses them in short courses or single injections to control arthritis flares, polymyalgia rheumatica, lupus or gout. A steroid joint injection can give weeks to months of relief in a single knee, shoulder or hand. Long-term oral use is avoided where possible because of side-effects like weight gain, raised blood sugar, thinning skin, mood changes and osteoporosis.",
    related: ["nsaid", "flare", "dmard"],
  },
  synovium: {
    label: "Synovium",
    short:
      "The thin membrane lining a joint — the tissue that becomes inflamed in rheumatoid arthritis.",
    body:
      "The synovium (or synovial membrane) is the thin, richly-supplied tissue that lines the inside of every movable joint and produces a small amount of slippery synovial fluid to lubricate cartilage. In inflammatory arthritis — most classically rheumatoid arthritis — the immune system attacks this lining, so it thickens, floods the joint with fluid and releases enzymes that gradually erode cartilage and bone. Ultrasound and MRI can pick up an inflamed synovium (synovitis) even before X-ray changes appear.",
    related: ["cartilage", "joint-effusion", "pannus", "osteophyte"],
  },
  cartilage: {
    label: "Cartilage",
    short:
      "The smooth, rubbery cushion that caps the ends of bones inside a joint.",
    body:
      "Cartilage is a firm but flexible tissue that caps the ends of bones inside a joint, letting them glide over each other with almost no friction. It has no blood supply of its own, so once damaged it heals slowly and often incompletely. In osteoarthritis the cartilage gradually thins, splits and wears away, which is why joints become stiff, ache after activity, and can grind (crepitus). Weight management, muscle-strengthening exercise and pacing are the mainstays of protecting whatever cartilage is left.",
    related: ["osteophyte", "subchondral", "crepitus", "synovium"],
  },
  "hla-b27": {
    label: "HLA-B27",
    short:
      "A gene marker strongly linked to ankylosing spondylitis and other spondyloarthritis.",
    body:
      "HLA-B27 is a variant of a normal immune-system gene (human leukocyte antigen). It is much more common in people with ankylosing spondylitis, reactive arthritis, psoriatic arthritis and acute anterior uveitis, so the UK healthcare system uses a simple blood test as one piece of evidence when diagnosing spondyloarthritis. Being HLA-B27 positive does not mean you will develop disease — most carriers never do — and being negative does not rule it out. It is one clue among symptoms, examination and imaging.",
    related: ["seronegative", "enthesitis", "morning-stiffness"],
  },
  "rheumatoid-factor": {
    label: "Rheumatoid factor",
    short:
      "A blood-test antibody found in most, but not all, people with rheumatoid arthritis.",
    body:
      "Rheumatoid factor (RF) is an antibody the immune system produces against parts of other antibodies. About two-thirds of people with rheumatoid arthritis test positive, and higher levels tend to mean more aggressive disease and more chance of joint erosion or nodules. However RF can also appear in SjÃ¶gren's syndrome, chronic infections and in some healthy older adults, so it is never used alone. UK rheumatologists interpret it alongside symptoms, examination, anti-CCP and imaging.",
    related: ["anti-ccp", "esr", "crp", "seronegative"],
  },
  "anti-ccp": {
    label: "Anti-CCP",
    short:
      "A more specific rheumatoid arthritis antibody than rheumatoid factor.",
    body:
      "Anti-CCP (anti-cyclic citrullinated peptide) antibodies attack proteins the body has slightly modified through a process called citrullination. They are far more specific to rheumatoid arthritis than rheumatoid factor and can appear years before joint symptoms start. A positive anti-CCP in someone with joint pain strongly points to rheumatoid arthritis and predicts a higher risk of erosive damage, so the UK healthcare system uses it early in the diagnostic workup to justify starting DMARDs quickly.",
    related: ["rheumatoid-factor", "dmard", "esr", "crp"],
  },
  esr: {
    label: "ESR",
    short:
      "Erythrocyte sedimentation rate — a blood test that goes up when the body is inflamed.",
    body:
      "ESR (erythrocyte sedimentation rate) measures how quickly red blood cells settle to the bottom of a thin tube in one hour. Inflammation makes them stick together and fall faster, so a raised ESR is a general marker of inflammation, infection or some cancers. Rheumatology teams use it alongside CRP to gauge how active a disease like polymyalgia rheumatica, giant cell arteritis or rheumatoid arthritis is, and to track response to treatment. It rises and falls more slowly than CRP.",
    related: ["crp", "rheumatoid-factor", "flare"],
  },
  crp: {
    label: "CRP",
    short:
      "C-reactive protein — a fast-moving blood test that rises with inflammation or infection.",
    body:
      "CRP (C-reactive protein) is a protein the liver releases within hours of inflammation, infection or tissue damage. Because it goes up and comes down quickly, it is the go-to blood test for tracking flares of rheumatoid, psoriatic or axial spondyloarthritis, and for spotting infections in someone on immunosuppression. A normal CRP does not rule out arthritis — some inflammatory conditions barely raise it — so clinicians read it alongside ESR, symptoms and imaging.",
    related: ["esr", "flare", "dmard"],
  },
  "joint-effusion": {
    label: "Joint effusion",
    short:
      "A build-up of extra fluid inside a joint — often felt as swelling and tightness.",
    body:
      "A joint effusion is an abnormal build-up of synovial fluid inside a joint capsule, causing visible swelling, warmth and a tight, fluid-filled feeling. It can follow injury, osteoarthritis flares, inflammatory arthritis, gout, pseudogout or infection. Clinicians may aspirate (draw off) the fluid with a needle both to relieve pressure and to test it — checking cell count, crystals and culture — before deciding on treatment such as a steroid injection, urate-lowering therapy or antibiotics.",
    related: ["synovium", "flare", "crepitus"],
  },
  crepitus: {
    label: "Crepitus",
    short:
      "The grating, clicking or crunching feeling in a joint when it moves.",
    body:
      "Crepitus is the audible or palpable grating, popping or crunching that can accompany joint movement. Painless clicks are extremely common and rarely mean disease. Persistent, coarse crepitus with pain and stiffness — especially in the knee, hip or base of thumb — is a classic feature of osteoarthritis, where roughened cartilage and bony spurs (osteophytes) rub during movement. Crepitus alone is not diagnostic; clinicians pair it with history, examination and, if needed, imaging.",
    related: ["osteophyte", "cartilage", "subchondral"],
  },
  flare: {
    label: "Flare",
    short:
      "A period when arthritis symptoms suddenly get much worse than usual.",
    body:
      "A flare is a temporary but noticeable worsening of arthritis symptoms — more pain, swelling, stiffness, fatigue and sometimes fever — often lasting days to weeks. In inflammatory arthritis, flares reflect a spike in immune activity and may need a short course of steroids or a treatment change. In osteoarthritis, they are usually triggered by overload, injury or weather changes. Keeping a simple flare plan (pacing, gentle movement, cold/heat, pain relief and when to contact your team) is one of the most useful self-management tools.",
    related: ["remission", "corticosteroid", "nsaid", "dmard"],
  },
  remission: {
    label: "Remission",
    short:
      "When inflammatory arthritis is calm enough that symptoms and lab tests are near-normal.",
    body:
      "Remission means inflammatory arthritis activity has dropped low enough that a person has little or no joint pain or swelling, normal function, and near-normal inflammatory markers (CRP/ESR). UK rheumatology teams aim for remission — or at least low disease activity — using a 'treat to target' approach: measure activity every few months and step treatment up until targets are met. Achieving early remission protects joints from long-term damage and often lets people stay in work and normal life.",
    related: ["flare", "dmard", "biologic"],
  },
  seronegative: {
    label: "Seronegative",
    short:
      "Inflammatory arthritis where the usual rheumatoid blood-test antibodies are absent.",
    body:
      "'Seronegative' means the standard rheumatoid antibodies — rheumatoid factor and anti-CCP — are not detectable in the blood. Some people with rheumatoid arthritis are seronegative and tend to have milder disease; the umbrella term 'seronegative spondyloarthritis' also covers ankylosing spondylitis, psoriatic arthritis, reactive arthritis and enteropathic arthritis, which share features like enthesitis, HLA-B27 links and back involvement rather than classic rheumatoid antibodies.",
    related: ["rheumatoid-factor", "anti-ccp", "hla-b27", "enthesitis"],
  },
  enthesitis: {
    label: "Enthesitis",
    short:
      "Inflammation where a tendon or ligament joins onto bone — a hallmark of spondyloarthritis.",
    body:
      "Enthesitis is inflammation of an enthesis — the point where a tendon, ligament or joint capsule attaches to bone. Common sites include the Achilles tendon, plantar fascia, elbow and around the pelvis. Painful, tender entheses that don't settle are a hallmark of the spondyloarthritis family (ankylosing, psoriatic and reactive arthritis) and help distinguish it from rheumatoid arthritis, which mostly targets the joint lining (synovium).",
    related: ["dactylitis", "hla-b27", "seronegative"],
  },
  dactylitis: {
    label: "Dactylitis",
    short:
      "'Sausage' swelling of a whole finger or toe — very typical of psoriatic and reactive arthritis.",
    body:
      "Dactylitis is uniform swelling of an entire finger or toe, giving it a 'sausage digit' appearance because tendons, joints and soft tissue are all inflamed at once. It's a classic sign of psoriatic arthritis, reactive arthritis and other spondyloarthritis, and less commonly appears in sarcoidosis and TB. Because dactylitis predicts more erosive disease, UK guidelines treat persistent cases actively, often with DMARDs or biologics.",
    related: ["enthesitis", "seronegative", "biologic"],
  },
  "morning-stiffness": {
    label: "Morning stiffness",
    short:
      "Joint stiffness on waking — the length of it helps tell inflammatory arthritis from osteoarthritis.",
    body:
      "Morning stiffness is stiffness in joints on first waking or after long rest. Inflammatory arthritis (rheumatoid, psoriatic, ankylosing spondylitis, polymyalgia rheumatica) typically causes prolonged stiffness of over 30–60 minutes that improves with movement. Osteoarthritis stiffness is usually shorter — less than 30 minutes — and tends to return after activity. Clinicians ask about duration and pattern because it is one of the most useful clues when deciding which type of arthritis is likely.",
    related: ["flare", "remission", "crepitus"],
  },
  osteophyte: {
    label: "Osteophyte",
    short:
      "A bony spur that grows around a worn joint — a classic osteoarthritis finding on X-ray.",
    body:
      "Osteophytes are smooth bony outgrowths that form at the edges of a joint as it remodels in response to osteoarthritis. They are the body's attempt to spread load across a worn joint, but can restrict movement or press on nerves — for example in the spine where they can contribute to sciatica. Osteophytes on an X-ray, together with joint-space narrowing and subchondral bone changes, are one of the classic radiographic features clinicians use to grade osteoarthritis.",
    related: ["subchondral", "cartilage", "crepitus"],
  },
  subchondral: {
    label: "Subchondral bone",
    short:
      "The layer of bone just beneath cartilage — where osteoarthritis changes are often first seen.",
    body:
      "The subchondral bone lies immediately under the cartilage in a joint. In osteoarthritis, as cartilage wears, load transfers to this bone; it responds by thickening (sclerosis), forming cysts and remodelling — all changes visible on X-ray. Painful subchondral bone-marrow lesions on MRI are increasingly recognised as a source of osteoarthritis pain and a target for research into new treatments.",
    related: ["cartilage", "osteophyte", "crepitus"],
  },
  pannus: {
    label: "Pannus",
    short:
      "Aggressive inflamed tissue that grows over cartilage in rheumatoid arthritis.",
    body:
      "Pannus is thickened, invasive tissue formed from an inflamed synovium in rheumatoid arthritis. It creeps over the joint's cartilage and bone and releases enzymes that erode both — the mechanism behind the joint deformities seen in poorly-controlled rheumatoid disease. Modern early DMARD and biologic treatment aims to stop pannus forming in the first place, which is why the UK healthcare system refers suspected rheumatoid arthritis to specialists within weeks of symptoms.",
    related: ["synovium", "dmard", "biologic"],
  },
  ankylosis: {
    label: "Ankylosis",
    short:
      "Complete stiffening of a joint as it fuses — the end-stage picture in advanced ankylosing spondylitis.",
    body:
      "Ankylosis is fusion of a joint so it no longer moves. It can be bony (bones grow together) or fibrous (thick scar tissue locks the joint). In advanced ankylosing spondylitis the spinal vertebrae can fuse into a rigid 'bamboo spine' visible on X-ray. Early diagnosis, exercise-based physiotherapy and modern biologics have dramatically reduced how often this end-stage picture develops in the UK.",
    related: ["hla-b27", "enthesitis", "biologic"],
  },
  "uric-acid": {
    label: "Uric acid",
    short:
      "A waste chemical whose crystals cause gout when levels stay too high.",
    body:
      "Uric acid is a normal breakdown product of purines from cells and certain foods. When blood levels stay high, needle-like urate crystals can form in joints (classically the big toe) and cause the sudden, severe pain of gout, or build into lumps under the skin (tophi). UK healthcare treatment combines short-term flare relief (NSAIDs, colchicine or steroids) with long-term urate-lowering therapy — usually allopurinol or febuxostat — aiming for a target blood urate.",
    related: ["tophi", "flare", "nsaid"],
  },
  tophi: {
    label: "Tophi",
    short:
      "Chalky lumps of urate crystals that form under the skin in long-standing gout.",
    body:
      "Tophi (singular: tophus) are firm lumps of urate crystals deposited under the skin, over joints or in cartilage such as the ear, after years of high uric acid. They can ulcerate, damage joints or become infected. Tophi tell rheumatologists that gout is well-established and that a lower urate target is needed; with consistent urate-lowering therapy over 1–2 years, most tophi shrink and can disappear.",
    related: ["uric-acid", "flare"],
  },
  musculoskeletal: {
    label: "Musculoskeletal (MSK)",
    short:
      "Anything involving muscles, bones, joints, tendons or ligaments.",
    body:
      "Musculoskeletal — often shortened to MSK — refers to the whole system of muscles, bones, joints, tendons, ligaments and the nerves that supply them. UK healthcare 'MSK services' cover physiotherapy triage, sports injuries, back pain, arthritis and osteoporosis, and are usually the first stop before rheumatology or orthopaedics. Many areas of England let patients self-refer to an MSK physio without seeing a GP first.",
    related: ["physiotherapy-triage", "enthesitis"],
  },
  "physiotherapy-triage": {
    label: "Physiotherapy triage",
    short:
      "First-contact UK healthcare physio assessment — often replacing the traditional GP referral route.",
    body:
      "Many UK healthcare areas now use a First Contact Physiotherapist (FCP) or MSK triage service as the first stop for joint or back problems. An experienced physio assesses you (sometimes on the same day you'd have seen a GP), orders any imaging or blood tests needed, and either treats you directly, sends you into a rehabilitation programme, or refers you on to rheumatology or orthopaedics — usually faster than the traditional GP route.",
    related: ["musculoskeletal"],
  },
};

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY_CONTENT[slug];
    }
