/**
 * Unique titles, descriptions, extra UK sections and cross-links for
 * high-value library topics. Overlay only — do not rewrite
 * src/data/healthTopics.ts.
 *
 * Used when the generated subtitle is too short or too generic for
 * Google (e.g. "Understanding widespread chronic pain"), and when
 * inject-canonicals would otherwise bake a "Library — slug" stub.
 */
export interface ExtraSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface LibraryTopicSeo {
  title: string;
  description: string;
  h1?: string;
  related?: { label: string; href: string }[];
  extraSections?: ExtraSection[];
  faqs?: { q: string; a: string }[];
}

export const LIBRARY_TOPIC_SEO: Record<string, LibraryTopicSeo> = {
  fibromyalgia: {
    title: "Fibromyalgia UK: symptoms, diagnosis and treatment",
    description:
      "UK guide to fibromyalgia — widespread pain, fatigue, fibro fog, how GPs diagnose it, and NICE-aligned pacing, exercise and medication options.",
    h1: "Fibromyalgia in the UK: widespread pain, fatigue and fibro fog",
    related: [
      { label: "Fibromyalgia condition guide", href: "/conditions/fibromyalgia" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Mental health and chronic pain", href: "/arthritis-mental-health" },
    ],
  },
  osteoarthritis: {
    title: "Osteoarthritis UK: what it is and how to manage it",
    description:
      "Plain-English UK library note on osteoarthritis — why cartilage wears, which joints are affected, and the NICE first-line steps of exercise, weight and pain relief.",
    h1: "Osteoarthritis: the UK's most common joint condition",
    related: [
      { label: "Full osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "What is osteoarthritis? FAQ", href: "/faq/what-is-osteoarthritis" },
    ],
  },
  amitriptyline: {
    title: "Amitriptyline for pain: UK arthritis and fibro guide",
    description:
      "How amitriptyline is used in the UK for nerve pain, fibromyalgia and sleep — typical doses, side effects, and what to ask your GP or pharmacist.",
    related: [
      { label: "Fibromyalgia treatment", href: "/conditions/fibromyalgia" },
      { label: "Arthritis medication explained", href: "/faq/arthritis-medication-explained" },
      { label: "Pain relief creams", href: "/faq/best-pain-relief-creams-arthritis" },
    ],
  },
  "lupus-symptoms": {
    title: "Lupus symptoms UK: butterfly rash, fatigue and early signs",
    description:
      "UK library guide to lupus (SLE) symptoms — butterfly rash, fatigue, joint pain, photosensitivity and kidney clues — plus when to see your GP.",
    h1: "Lupus symptoms in the UK: the signs people actually notice first",
    related: [
      { label: "Lupus symptoms (condition page)", href: "/conditions/lupus/symptoms" },
      { label: "Full lupus guide", href: "/conditions/lupus" },
      { label: "Lupus exercises", href: "/conditions/lupus/exercises" },
      { label: "Library: what lupus is", href: "/library/lupus" },
    ],
    extraSections: [
      {
        heading: "How this library note differs from the condition hub",
        body: "The condition hub at /conditions/lupus/symptoms is a structured checklist for people already thinking in NHS pathway terms. This library note is the slower explainer: why the same person can look well one week and exhausted the next, how a malar rash differs from rosacea or sunburn, and which combinations of symptoms should prompt a GP appointment rather than another month of waiting. It is written for first searches such as \"lupus symptoms UK\" and \"butterfly rash and joint pain\".",
      },
      {
        heading: "Early signs people in the UK often miss",
        body: "Lupus is called the great imitator because early features look like viral illness, stress, or \"just being run down\". Many people see their GP several times before anyone mentions SLE. Patterns that deserve a second look include fatigue that is not explained by a normal blood count, joint pain that moves between the hands and knees without lasting damage, mouth ulcers that keep returning, and a facial rash that flares after a bright UK day even when it is not hot.",
        bullets: [
          "Unexplained fevers or night sweats alongside joint aches",
          "Hair thinning at the temples or a sore scalp after sun",
          "Fingers that blanch white then blue in the cold (Raynaud's)",
          "Chest pain that is worse when you breathe in (pleurisy)",
          "Puffy ankles, foamy urine or rising blood pressure — possible kidney involvement",
        ],
      },
      {
        heading: "Butterfly rash versus other facial rashes",
        body: "The classic malar rash sits across both cheeks and the bridge of the nose and usually spares the nasolabial folds (the creases from nose to mouth). It may be flat or slightly raised, pink to purple, and often worsens after UV exposure. Rosacea tends to spare the same folds less reliably and comes with flushing and visible vessels. Eczema itches and often has a personal or family history of atopy. If a rash appears with joint pain, mouth ulcers or extreme fatigue, mention lupus specifically — GPs see facial rashes every day and will not automatically think of SLE.",
      },
      {
        heading: "Fatigue, flares and working or studying",
        body: "Lupus fatigue is not ordinary tiredness. People describe a flu-like heaviness that sleep does not lift. Flares can be triggered by UV light, infection, some medicines, and poorly managed stress. In the UK, occupational health, Access to Work and reasonable adjustments under the Equality Act 2010 are relevant if fatigue or photosensitivity affects a job or course. A short symptom diary — energy, rash, joint swelling, urine changes — helps a rheumatology nurse see the pattern between six-monthly appointments.",
      },
      {
        heading: "Tests your GP can start before rheumatology",
        body: "There is no single lupus test. A GP can request a full blood count, kidney and liver function, urine dip and protein, ESR or CRP, and an antinuclear antibody (ANA) screen. A positive ANA is common and does not mean you have lupus on its own; a negative ANA makes SLE less likely. If clinical suspicion is high, ask about anti-dsDNA, ENA, complement (C3 and C4) and antiphospholipid antibodies. NICE-aligned practice is to refer to rheumatology when inflammatory symptoms persist and bloods or urine suggest a systemic disease.",
      },
      {
        heading: "When lupus symptoms are urgent",
        body: "Most lupus symptoms can wait for a GP appointment. Seek same-day or emergency care if you have severe chest pain or breathlessness, a sudden severe headache with confusion, markedly reduced urine output with swelling, a high fever while on immunosuppressants, or new weakness or seizure. These can signal organ-threatening disease or infection — both need urgent assessment, not another library search.",
      },
    ],
  },
  lupus: {
    title: "Lupus (SLE) UK: what it is and how it is managed",
    description:
      "Plain-English UK library guide to systemic lupus erythematosus — who it affects, how rheumatology treats it, and why sun protection matters every day.",
    h1: "Lupus (SLE) in the UK: a library overview",
    related: [
      { label: "Lupus symptoms in detail", href: "/library/lupus-symptoms" },
      { label: "Condition hub: lupus", href: "/conditions/lupus" },
      { label: "Lupus treatment", href: "/conditions/lupus/treatment" },
      { label: "Hydroxychloroquine library note", href: "/library/hydroxychloroquine" },
    ],
    extraSections: [
      {
        heading: "Who gets lupus in the UK",
        body: "SLE is much more common in women than men and often starts between the mid-teens and mid-forties. It is also more common, and sometimes more severe, in people of African, Caribbean and South Asian heritage. That matters in UK clinics because delayed diagnosis is still reported when joint pain is put down to \"young person's aches\" or a facial rash is treated as acne or allergy. Lupus UK and NHS rheumatology teams both stress that early hydroxychloroquine and sun protection change the long-term outlook.",
      },
      {
        heading: "How UK rheumatology usually treats SLE",
        body: "Almost everyone with SLE is offered hydroxychloroquine unless it is contraindicated. Flares may need a short steroid course. Organ involvement — kidneys, blood, lungs, brain — leads to immunosuppressants such as mycophenolate, azathioprine or methotrexate, and selected people are offered biologics such as belimumab. Treatment is not one-size-fits-all: a skin-and-joint picture is managed differently from lupus nephritis. Regular blood and urine tests are part of staying well, not a sign that something has already gone wrong.",
      },
    ],
  },
  "gout-symptoms": {
    title: "Gout symptoms UK: sudden toe pain, swelling and triggers",
    description:
      "How a gout attack feels in the UK — overnight big-toe pain, heat and swelling — plus common triggers and when to ask your GP about allopurinol.",
    h1: "Gout symptoms: why the attack often starts at night",
    related: [
      { label: "Gout symptoms (condition page)", href: "/conditions/gout/symptoms" },
      { label: "What is gout?", href: "/library/what-is-gout" },
      { label: "Gout diet", href: "/conditions/gout/diet" },
      { label: "Allopurinol library note", href: "/library/allopurinol" },
    ],
    extraSections: [
      {
        heading: "What a first UK attack usually looks like",
        body: "A first gout attack often wakes someone in the small hours with a red-hot big toe that cannot bear a bedsheet. The joint looks shiny, and walking to the bathroom is miserable. Ankles, knees, wrists and elbows can be hit instead. Attacks typically peak within a day and settle over one to two weeks. Between attacks the joint can look completely normal — which is why people delay seeing a GP until the third or fourth episode.",
      },
      {
        heading: "Symptoms that are not gout",
        body: "An infected joint (septic arthritis) is a medical emergency: severe pain, fever and inability to move the joint need same-day urgent care, not a wait-and-see gout plan. Cellulitis around the foot can also look red and hot. If this is your first attack, ask for a diagnosis rather than assuming it is gout from a photograph. Joint fluid analysis is the gold standard when the picture is unclear.",
      },
      {
        heading: "After the pain: what your GP should discuss",
        body: "UK guidance treats gout as a long-term urate problem, not a series of bad nights. After even one confirmed attack, many people benefit from a conversation about urate-lowering treatment (usually allopurinol), a target blood urate, and lifestyle steps that help but do not replace medicine. Recurring attacks, tophi, kidney stones or CKD make long-term treatment more important, not less.",
      },
    ],
  },
  "arthritis-symptoms": {
    title: "Arthritis symptoms UK: pain, stiffness and when to see a GP",
    description:
      "How arthritis symptoms present in the UK — joint pain, morning stiffness, swelling and fatigue — and which patterns need a prompt GP appointment.",
    h1: "Arthritis symptoms: what to notice before a diagnosis has a name",
    related: [
      { label: "Arthritis overview", href: "/library/arthritis" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Benefits & PIP", href: "/benefits-pip" },
    ],
    extraSections: [
      {
        heading: "Inflammatory versus wear-and-tear patterns",
        body: "Two patterns help a GP decide what to do next. Osteoarthritis pain usually builds over months or years, worsens with use, and stiffness lasts under half an hour. Inflammatory arthritis (RA, PsA, lupus, AS) more often causes prolonged morning stiffness, warmth, swelling of several joints, and fatigue that feels systemic. Either pattern deserves a GP visit if it is limiting work, sleep or walking — but inflammatory features should be mentioned explicitly because NICE expects earlier rheumatology referral.",
      },
      {
        heading: "Symptoms that should not wait",
        body: "Book urgently if a single joint is suddenly hot, red and you cannot weight-bear; if you have a high fever with joint pain; or if a child has a persistent limp. Those can be infection or, in children, juvenile idiopathic arthritis. For everyone else, more than a few weeks of joint swelling, stiffness lasting over 30 minutes, or unexplained fatigue with pain is enough to justify a routine GP appointment and basic blood tests.",
      },
    ],
  },
  "ankylosing-spondylitis": {
    title: "Ankylosing spondylitis UK: inflammatory back pain explained",
    description:
      "UK library guide to ankylosing spondylitis (axial spondyloarthritis) — night pain, morning stiffness that eases with movement, and why daily exercise is treatment.",
    h1: "Ankylosing spondylitis: inflammatory back pain, not 'just a bad back'",
    related: [
      { label: "AS condition hub", href: "/conditions/ankylosing-spondylitis" },
      { label: "AS treatment", href: "/conditions/ankylosing-spondylitis/treatment" },
      { label: "AS diet", href: "/conditions/ankylosing-spondylitis/diet" },
      { label: "AS exercises", href: "/conditions/ankylosing-spondylitis/exercises" },
    ],
    extraSections: [
      {
        heading: "Why GPs still miss inflammatory back pain",
        body: "Most back pain in UK primary care is mechanical. AS (now often called axial spondyloarthritis) is the exception that improves with movement and worsens with rest. Pain that wakes you in the second half of the night, stiffness lasting more than 30 minutes, buttock pain that swaps sides, and a start before age 45 are the clues NICE NG65 asks clinicians to look for. People often spend years being told to 'keep stretching' without an HLA-B27 test, CRP, or rheumatology referral.",
      },
      {
        heading: "More than the spine",
        body: "AS can inflame the eyes (uveitis — a red, painful, light-sensitive eye that needs same-day ophthalmology), the heels and Achilles insertions, and sometimes the gut or skin. Chest wall involvement makes a deep breath feel tight. These extra-spinal features are why a 'bad back' story plus a red eye should not be treated as two unrelated problems.",
      },
      {
        heading: "What good UK care looks like",
        body: "NASS and rheumatology teams treat daily spinal mobility work as medicine, not an optional extra. NSAIDs are often taken regularly rather than as required. If inflammation stays active, NHS pathways include TNF or IL-17 inhibitors. Physiotherapy, hydrotherapy and a smoking-cessation conversation (smoking worsens AS) sit alongside drugs. This library page is the overview; the condition subpages cover treatment, diet and exercises in more depth.",
      },
    ],
  },

  turmeric: {
    title: "Turmeric for arthritis UK: curcumin evidence and safety",
    description:
      "UK library note on turmeric and curcumin for joint pain — what trials suggest, why black pepper matters, and why supplements are not a cure. Educational only.",
    h1: "Turmeric and curcumin for arthritis: a cautious UK overview",
    related: [
      { label: "Turmeric & curcumin supplement guide", href: "/supplements/turmeric" },
      { label: "Turmeric for arthritis blog", href: "/blog/turmeric-for-arthritis" },
      { label: "Diet pillar", href: "/guides/diet" },
      { label: "Supplements hub", href: "/supplements" },
    ],
  },
  "turmeric-benefits": {
    title: "Turmeric benefits UK: joints, inflammation and limits",
    description:
      "What turmeric may and may not do for arthritis symptoms in the UK — modest evidence, interaction checks, and links to diet and supplement hubs.",
    related: [
      { label: "Turmeric library overview", href: "/library/turmeric" },
      { label: "Turmeric supplement guide", href: "/supplements/turmeric" },
      { label: "Anti-inflammatory diet", href: "/guides/diet" },
      { label: "Glucosamine hub", href: "/supplements/glucosamine" },
    ],
  },
  arthritis: {
    title: "What is arthritis? UK library overview",
    description:
      "Plain-English UK overview of arthritis — OA, inflammatory types, shared symptoms, and where to go next for exercise, pain relief, diet and benefits.",
    h1: "Arthritis explained: types, symptoms and next steps in the UK",
    related: [
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Benefits & PIP", href: "/benefits-pip" },
    ],
  },
  "access-to-work": {
    title: "Access to Work UK for arthritis: grants, eligibility & how to apply",
    description:
      "What Access to Work can fund for people with arthritis in England, Scotland and Wales — equipment, travel, support workers — plus Equality Act adjustments, PIP links and how to apply on GOV.UK.",
    h1: "Access to Work for arthritis: UK workplace support explained",
    related: [
      { label: "Benefits & PIP hub", href: "/benefits-pip" },
      { label: "Full PIP & benefits guide", href: "/guides/benefits-pip" },
      { label: "Disability support", href: "/guides/disability-support" },
      { label: "Working with arthritis (rights)", href: "/blog/working-with-arthritis-uk-rights" },
    ],
    faqs: [
      {
        q: "What is Access to Work?",
        a: "Access to Work is a UK government grant that can help pay for practical support if a disability or long-term health condition — including arthritis — affects your job. It complements, rather than replaces, your employer's Equality Act duty to make reasonable adjustments.",
      },
      {
        q: "Who can apply for Access to Work with arthritis?",
        a: "You can usually apply if you are 16 or over, live and work in England, Scotland or Wales, are in paid work or about to start, and have a long-term condition such as rheumatoid arthritis, osteoarthritis or another musculoskeletal condition that affects how you do your job.",
      },
      {
        q: "What can Access to Work pay for?",
        a: "Common awards include specialist equipment or adaptations, changes to the working environment, travel to work if public transport is not manageable, a support worker or job coach, and some mental health support. Exact awards depend on individual assessment.",
      },
      {
        q: "How do I apply for Access to Work?",
        a: "Apply online via GOV.UK Access to Work or by phone. A workplace assessment may follow. You can apply before starting a new role or while already employed. Keep notes on flare days, tasks you struggle with, and equipment that already helps.",
      },
      {
        q: "Does Access to Work replace reasonable adjustments?",
        a: "No. Under the Equality Act 2010, employers must still consider reasonable adjustments such as flexible hours, extra breaks or modified duties. Access to Work is designed for support that goes beyond what is reasonable for the employer alone.",
      },
      {
        q: "Can I claim PIP and Access to Work together?",
        a: "Yes. PIP looks at daily living and mobility; Access to Work looks at workplace support. Many people use both. Start with our Benefits & PIP hub for claim prep, then use this page for workplace grants.",
      },
    ],
    extraSections: [
      {
        heading: "Arthritis-specific workplace examples",
        body: "People with arthritis often use Access to Work for sit-stand desks, ergonomic chairs, vertical mice, voice recognition software, parking closer to the entrance, or taxi fares during flares when public transport is not realistic. Self-employed people can also apply. Bring a short flare diary to any assessment so bad days are visible, not only good ones.",
        bullets: [
          "Dictation software when hand or wrist arthritis slows typing",
          "Supportive seating and desk height for spinal or hip OA",
          "Travel support when morning stiffness makes commuting unreliable",
        ],
      },
      {
        heading: "Next steps after you apply",
        body: "While you wait for a decision, talk to your manager or HR about Equality Act reasonable adjustments, and ask occupational health for a workstation review if one is available. If benefits questions sit alongside work worries, use the PIP guide and evidence diary so you are not juggling blank forms alone.",
      },
    ],
  },
  glucosamine: {
    title: "Glucosamine UK: knee OA evidence and caution",
    description:
      "UK library overview of glucosamine for joint pain — mixed evidence for knee osteoarthritis, typical discussion points with a pharmacist, and diet-first alternatives.",
    related: [
      { label: "Glucosamine supplement guide", href: "/supplements/glucosamine" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Diet pillar", href: "/guides/diet" },
      { label: "Supplements hub", href: "/supplements" },
    ],
  },
  "knee-pain": {
    title: "Knee pain UK: arthritis causes and self-care",
    description:
      "UK library guide to knee pain with arthritis — common patterns, when to see a GP, and links to OA, exercise and pain-relief pillars.",
    related: [
      { label: "Knee arthritis guide", href: "/conditions/knee-arthritis" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
    ],
  },
  naproxen: {
    title: "Naproxen for arthritis UK: NSAID library note",
    description:
      "Educational UK overview of naproxen for joint pain — how NSAIDs fit alongside exercise and pain relief, plus safety checks with your pharmacist or GP.",
    related: [
      { label: "Painkillers & NSAIDs guide", href: "/guides/painkillers-and-nsaids" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Diet pillar", href: "/guides/diet" },
    ],
  },
  ibuprofen: {
    title: "Ibuprofen for arthritis UK: when people use it",
    description:
      "UK library note on ibuprofen for joint pain — short-term symptom relief themes, stomach and kidney cautions, and non-drug pillars that matter more long-term.",
    related: [
      { label: "Painkillers & NSAIDs guide", href: "/guides/painkillers-and-nsaids" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
    ],
  },
};

export function getLibraryPillarRelated(
  slug: string,
  category?: string,
): { label: string; href: string }[] {
  const fromSeo = LIBRARY_TOPIC_SEO[slug]?.related;
  if (fromSeo && fromSeo.length > 0) return fromSeo;

  const pillars: { label: string; href: string }[] = [
    { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
    { label: "Exercise for arthritis", href: "/guides/exercise" },
    { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
    { label: "Diet pillar", href: "/guides/diet" },
  ];

  if (category === "Support" || slug.includes("pip") || slug.includes("access-to-work") || slug.includes("benefit")) {
    return [
      { label: "Benefits & PIP hub", href: "/benefits-pip" },
      { label: "PIP guide", href: "/guides/benefits-pip" },
      { label: "Disability support", href: "/guides/disability-support" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
    ];
  }
  if (category === "Supplement") {
    return [
      { label: "Diet pillar", href: "/guides/diet" },
      { label: "Supplements hub", href: "/supplements" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
    ];
  }
  if (category === "Medication" || category === "Treatment") {
    return [
      { label: "Painkillers & NSAIDs", href: "/guides/painkillers-and-nsaids" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "Exercise for arthritis", href: "/guides/exercise" },
    ];
  }
  return pillars;
}

export function getLibraryTopicSeo(slug: string): LibraryTopicSeo | undefined {
  return LIBRARY_TOPIC_SEO[slug];
}
