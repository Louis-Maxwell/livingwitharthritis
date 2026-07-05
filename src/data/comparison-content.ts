// Long-form comparison content for high-value /guides/*-vs-* routes.
// Each entry is 800–1200 words of evidence-informed, UK-focused copy.
// The ComparisonPage falls back to a lightweight template when a slug
// is not defined here.

export interface ComparisonOption {
  name: string;
  howItWorks: string;
  bestFor: string;
  sideEffects: string;
  nhs: string;
  cost: string;
}

export interface ComparisonKeyPoint {
  label: string;
  a: string;
  b: string;
}

export interface ComparisonArticle {
  /** Full route path, e.g. "/guides/paracetamol-vs-ibuprofen-for-arthritis". */
  path: string;
  /** Human title override (else derived from slug). */
  title: string;
  /** Meta description for <head>. */
  metaDescription: string;
  /** Opening paragraph. */
  intro: string;
  /** Option A summary. */
  optionA: ComparisonOption;
  /** Option B summary. */
  optionB: ComparisonOption;
  /** Main body sections (in order). */
  sections: { heading: string; paragraphs: string[] }[];
  /** Side-by-side comparison table rows. */
  table: ComparisonKeyPoint[];
  /** Short bullet takeaways. */
  takeaways: string[];
}

export const COMPARISON_CONTENT: Record<string, ComparisonArticle> = {
  "/guides/paracetamol-vs-ibuprofen-for-arthritis": {
    path: "/guides/paracetamol-vs-ibuprofen-for-arthritis",
    title: "Paracetamol vs Ibuprofen for Arthritis",
    metaDescription:
      "Which works better for arthritis pain — paracetamol or ibuprofen? A UK, NHS-aligned side-by-side comparison covering effectiveness, safety, cost and best-for scenarios.",
    intro:
      "Paracetamol and ibuprofen are the two most common over-the-counter painkillers used for arthritis in the UK. They look similar on the shelf but work in very different ways, and current NICE guidance treats them very differently. This guide explains what each one does, how well the evidence says it works for osteoarthritis and inflammatory arthritis, the safety trade-offs, and when it is worth stepping up to a stronger option.",
    optionA: {
      name: "Paracetamol",
      howItWorks:
        "Acts mainly in the brain to reduce pain signalling. It is not a strong anti-inflammatory, so it does not reduce joint swelling.",
      bestFor:
        "Mild osteoarthritis pain, breakthrough pain on top of other treatment, and people who cannot safely take NSAIDs.",
      sideEffects:
        "Very safe at recommended doses (up to 4 g/day for adults). Liver damage with overdose or in heavy drinkers.",
      nhs: "First-choice simple analgesic on NHS repeat prescriptions, though NICE 2022 no longer recommends routine long-term use for osteoarthritis.",
      cost: "£0.30–£2 for 16 tablets over the counter; free on NHS prescription if exempt (~£9.90 charge otherwise).",
    },
    optionB: {
      name: "Ibuprofen",
      howItWorks:
        "A non-steroidal anti-inflammatory drug (NSAID) that blocks COX enzymes, reducing both pain and inflammation.",
      bestFor:
        "Inflammatory flare-ups, morning stiffness, painful osteoarthritis flares — especially in the knee, hand or hip.",
      sideEffects:
        "Stomach irritation and ulcers, raised blood pressure, kidney strain, heart-attack and stroke risk with high doses or long-term use.",
      nhs: "Available on NHS prescription, often paired with a stomach-protecting drug (PPI) if used regularly. Topical NSAID gels are preferred for hand and knee OA.",
      cost: "£0.50–£3 for 16 tablets; topical gel around £4–£8 a tube.",
    },
    sections: [
      {
        heading: "How each one actually works",
        paragraphs: [
          "Paracetamol's mechanism is still debated, but its main effect is in the central nervous system, dampening how pain signals are processed. Crucially, it barely touches inflammation — so it can take the edge off aching joints but doesn't shrink swollen ones.",
          "Ibuprofen works peripherally at the joint. By blocking cyclooxygenase (COX-1 and COX-2), it stops the production of prostaglandins, the chemicals that drive inflammatory pain, swelling and warmth. That's why it tends to work better on obvious flares with visible swelling.",
        ],
      },
      {
        heading: "What the UK evidence says",
        paragraphs: [
          "NICE's 2022 osteoarthritis guideline changed the landscape: it no longer recommends paracetamol as routine treatment for osteoarthritis, because trials show only a small effect, similar to placebo. Instead, it recommends topical NSAIDs (like ibuprofen gel) first, then oral NSAIDs when needed, at the lowest effective dose for the shortest time.",
          "For inflammatory arthritis (rheumatoid, psoriatic, ankylosing spondylitis) neither paracetamol nor ibuprofen changes the underlying disease. They only help with symptoms while disease-modifying drugs (DMARDs) or biologics do the real work.",
        ],
      },
      {
        heading: "Safety — where the differences really show",
        paragraphs: [
          "Paracetamol is remarkable in that, at the correct dose, most people can take it long-term with minimal issues. The main risk is overdose — deliberate or accidental — which can silently damage the liver.",
          "Ibuprofen and other NSAIDs carry more day-to-day risk. Even short courses can raise blood pressure, worsen heart failure, irritate the stomach or reduce kidney function — particularly in people over 65, on blood pressure or diuretic medication, or with kidney disease. Regular users are often prescribed a proton pump inhibitor (PPI) like omeprazole to protect the stomach lining.",
          "Ibuprofen gel applied to the joint gives similar pain relief to tablets for hand and knee osteoarthritis with far less systemic absorption, which is why UK guidance now leads with it.",
        ],
      },
      {
        heading: "Cost and access on the NHS",
        paragraphs: [
          "Both are cheap. A pack of 16 tablets of either is under £3 in most UK supermarkets and pharmacies. On NHS prescription in England a single item costs £9.90 (2024/25), so buying either over the counter is usually cheaper unless you have an exemption or a Prescription Prepayment Certificate.",
          "Topical ibuprofen gel is available both over the counter and on prescription, and is often stocked cheaply in supermarket own-brand tubes.",
        ],
      },
      {
        heading: "Which should you choose?",
        paragraphs: [
          "For a flare with obvious swelling, warmth and stiffness, ibuprofen (topical first, oral if needed) is usually the more effective option — provided you can tolerate it. For general aching without much swelling, or if NSAIDs are risky for you, paracetamol is still a sensible option, even if the strength of evidence for osteoarthritis is modest.",
          "Many people end up using both: paracetamol as a background painkiller, with topical or short-course oral ibuprofen when a flare hits. Talk to your pharmacist or GP before combining them regularly, especially if you're over 65 or on other medications.",
        ],
      },
    ],
    table: [
      { label: "Reduces inflammation?", a: "No — mostly a painkiller", b: "Yes — anti-inflammatory" },
      { label: "Best for", a: "Mild aches, when NSAIDs are unsafe", b: "Flares with swelling and stiffness" },
      { label: "Main risk", a: "Liver damage in overdose", b: "Stomach, kidney, heart, blood pressure" },
      { label: "NICE OA guidance", a: "No longer routine", b: "Topical first, then oral, lowest dose" },
      { label: "OTC cost (16 tablets)", a: "£0.30–£2", b: "£0.50–£3" },
      { label: "NHS prescription (England)", a: "£9.90 per item", b: "£9.90 per item" },
    ],
    takeaways: [
      "For osteoarthritis with visible swelling, topical ibuprofen is now the NICE first-line choice.",
      "Paracetamol is safer day-to-day but works less well than NSAIDs on inflamed joints.",
      "Never exceed 4 g paracetamol or the ibuprofen pack dose without medical advice.",
      "Ask your pharmacist about stomach protection if you take ibuprofen regularly.",
      "Neither drug slows arthritis — inflammatory arthritis needs DMARDs or biologics.",
    ],
  },

  "/guides/osteoarthritis-vs-rheumatoid-arthritis": {
    path: "/guides/osteoarthritis-vs-rheumatoid-arthritis",
    title: "Osteoarthritis vs Rheumatoid Arthritis",
    metaDescription:
      "Osteoarthritis vs rheumatoid arthritis explained — how they differ in cause, symptoms, tests, treatment and long-term outlook, written for UK patients.",
    intro:
      "Osteoarthritis (OA) and rheumatoid arthritis (RA) are the two most common forms of arthritis in the UK, but they are very different diseases. Confusing them delays the right treatment — particularly for rheumatoid arthritis, where early diagnosis genuinely changes outcomes. This guide compares them side-by-side, using NHS and NICE frameworks, so you can recognise which pattern fits and what to ask your GP.",
    optionA: {
      name: "Osteoarthritis (OA)",
      howItWorks:
        "A wear-and-repair disorder of the joint — the cartilage thins, the bone underneath remodels and small bony spurs (osteophytes) form.",
      bestFor:
        "'Best for' doesn't apply — this describes people typically affected: over 45, often after injury, obesity or years of joint load.",
      sideEffects:
        "Deep aching pain that's worse with use, short (<30 min) morning stiffness, joint enlargement and crepitus.",
      nhs: "Managed largely in primary care with exercise, weight loss, topical/oral NSAIDs and, if severe, joint replacement.",
      cost: "Most treatment is NHS-funded; steroid injections, physio and joint replacements are all available on the NHS.",
    },
    optionB: {
      name: "Rheumatoid arthritis (RA)",
      howItWorks:
        "An autoimmune disease — the immune system attacks the joint lining (synovium), causing chronic inflammation and, if untreated, joint erosion.",
      bestFor:
        "Typically develops between 40–60 (though possible at any age), three times more common in women, often with a family history.",
      sideEffects:
        "Symmetrical joint swelling (both hands, both feet), morning stiffness lasting >1 hour, fatigue and sometimes flu-like symptoms.",
      nhs: "Rapid referral to rheumatology, DMARDs (methotrexate first), progressing to biologics if needed under NICE thresholds.",
      cost: "All standard treatment is NHS-funded, including biologics for people who meet NICE criteria.",
    },
    sections: [
      {
        heading: "Different causes, different pattern",
        paragraphs: [
          "Osteoarthritis is a disorder of the joint itself. Cartilage — the smooth cap on bone ends — gradually thins and cracks, and the underlying bone tries to compensate by thickening and growing osteophytes. It's driven by mechanical load, past injury, genetics and body weight, and typically affects weight-bearing joints (knees, hips, spine) and the small joints of the hand.",
          "Rheumatoid arthritis is a systemic autoimmune disease. The immune system attacks the synovium — the thin lining of every movable joint — creating persistent inflammation that erodes cartilage and bone if left uncontrolled. It usually starts symmetrically in small joints (knuckles, wrists, base of toes) and can affect the whole body: fatigue, weight loss, lung and eye involvement.",
        ],
      },
      {
        heading: "Symptoms clues that point one way or the other",
        paragraphs: [
          "Timing of stiffness is one of the most useful clues. OA stiffness is short — usually under 30 minutes on waking and after inactivity — and joints feel better with gentle movement then worse with heavy use. RA stiffness lasts more than an hour, sometimes most of the morning, and improves with movement.",
          "Distribution matters too. OA tends to be asymmetric: one bad knee, one thumb base. RA is classically symmetrical: both wrists, all the knuckles of both hands, or the balls of both feet.",
          "Swelling in OA is bony and hard (Heberden's and Bouchard's nodes on finger joints). In RA it is soft and boggy — the inflamed synovium — with visible warmth.",
        ],
      },
      {
        heading: "How UK doctors tell them apart",
        paragraphs: [
          "GPs diagnose osteoarthritis clinically in adults over 45 with typical activity-related joint pain and short morning stiffness — no imaging or blood tests are needed unless the picture is unusual.",
          "For rheumatoid arthritis, NICE recommends urgent referral to rheumatology if small joints of the hands or feet are swollen, if more than one joint is involved, or if there has been a delay of more than three months between symptom onset and being seen. Bloods (CRP, ESR, rheumatoid factor, anti-CCP) and ultrasound or MRI look for synovitis; anti-CCP in particular is highly specific for RA.",
        ],
      },
      {
        heading: "Treatment is genuinely different",
        paragraphs: [
          "OA treatment aims to protect the joint and control symptoms. That means muscle-strengthening and aerobic exercise, weight management if relevant, topical NSAID gel, oral NSAIDs (short courses), and — for advanced cases — joint replacement, which is one of the most successful operations the NHS performs.",
          "RA treatment aims to switch the disease off. DMARDs — usually methotrexate — are started as soon as possible, with a 'treat-to-target' approach: measure activity every few months and step treatment up (adding hydroxychloroquine, sulfasalazine, then biologics) until inflammation is under control. Early, aggressive treatment often prevents lasting joint damage.",
        ],
      },
      {
        heading: "Long-term outlook",
        paragraphs: [
          "OA is progressive but not systemic. Most people manage well with self-help and pharmacy medicines; a proportion eventually need joint replacement, particularly for the hip or knee.",
          "RA today, treated early, often reaches low disease activity or remission. Untreated, it can cause visible joint deformity, disability and shortens life expectancy through cardiovascular and lung complications. That's why speed of diagnosis matters so much.",
        ],
      },
    ],
    table: [
      { label: "Cause", a: "Wear and joint remodelling", b: "Autoimmune synovial inflammation" },
      { label: "Typical age", a: "Usually 45+", b: "Any age, often 40–60" },
      { label: "Pattern", a: "Asymmetric, weight-bearing joints", b: "Symmetric, small joints of hands/feet" },
      { label: "Morning stiffness", a: "<30 minutes", b: ">1 hour" },
      { label: "Blood tests useful?", a: "Rarely", b: "CRP, ESR, RF, anti-CCP" },
      { label: "Main treatment", a: "Exercise, weight loss, NSAIDs", b: "DMARDs / biologics" },
      { label: "Systemic symptoms", a: "No", b: "Yes — fatigue, sometimes lung, eye" },
    ],
    takeaways: [
      "OA is a joint disease; RA is a whole-body autoimmune disease.",
      "Long morning stiffness and symmetric small-joint swelling point to RA — see your GP quickly.",
      "OA is diagnosed clinically; RA usually needs bloods and rheumatology review.",
      "Early DMARDs dramatically change the long-term outlook for RA.",
      "Exercise helps both — but never replaces DMARDs in inflammatory arthritis.",
    ],
  },

  "/guides/dmards-vs-biologics": {
    path: "/guides/dmards-vs-biologics",
    title: "DMARDs vs Biologics for Arthritis",
    metaDescription:
      "DMARDs vs biologics — how they differ in how they work, who gets them on the NHS, side-effects and cost. A plain-English UK guide.",
    intro:
      "For rheumatoid, psoriatic and axial spondyloarthritis, DMARDs and biologics are the two families of medicines that actually change the disease. They are not painkillers — they suppress the immune activity driving joint damage. This guide compares them for UK patients navigating NHS rheumatology.",
    optionA: {
      name: "Conventional DMARDs",
      howItWorks:
        "Broadly damp down the immune system. Methotrexate is the anchor drug; others include sulfasalazine, hydroxychloroquine and leflunomide.",
      bestFor:
        "First-line treatment for rheumatoid, psoriatic and juvenile arthritis. Often used long-term.",
      sideEffects:
        "Nausea, mouth ulcers, hair thinning, raised liver enzymes, low blood counts. Reversible with dose changes.",
      nhs: "Freely prescribed on the NHS, usually started by rheumatology and monitored with regular blood tests.",
      cost: "Very cheap — methotrexate tablets cost the NHS pennies per week.",
    },
    optionB: {
      name: "Biologics",
      howItWorks:
        "Target one specific step of the immune response — TNF, IL-6, IL-17, JAK, B cells — using engineered proteins or small molecules.",
      bestFor:
        "People whose disease stays active despite two conventional DMARDs, or who cannot tolerate them.",
      sideEffects:
        "Increased infection risk, injection-site reactions; specific classes carry other risks (e.g. shingles, cardiovascular).",
      nhs: "Prescribed by rheumatology under NICE-approved criteria after DMARD failure, monitored by hospital.",
      cost: "£8,000–£15,000+/year — usually free to eligible NHS patients; biosimilars have reduced the price significantly.",
    },
    sections: [
      {
        heading: "How the two families really differ",
        paragraphs: [
          "Conventional DMARDs are old-school immune suppressants: they slow down a wide range of immune activity, which is why they work but also why they need blood monitoring. Methotrexate — the most-used arthritis medicine in the world — is safe and effective for most people at once-weekly doses.",
          "Biologics are precision tools. Instead of dampening the whole immune system, they block one signal — for example TNF-α (adalimumab, etanercept, infliximab), IL-6 (tocilizumab), IL-17 (secukinumab) or B-cells (rituximab). Newer 'targeted synthetic DMARDs' (JAK inhibitors like tofacitinib and baricitinib) are tablets rather than injections but work in the same targeted way.",
        ],
      },
      {
        heading: "How the NHS decides who gets what",
        paragraphs: [
          "NICE sets clear criteria. For rheumatoid arthritis, biologics are approved after a person has failed to respond to at least two conventional DMARDs (one of which is usually methotrexate) and still has moderate to severe disease activity — measured by DAS28 score. Similar rules apply to psoriatic arthritis and ankylosing spondylitis.",
          "This means most UK patients start on methotrexate, add hydroxychloroquine or sulfasalazine, and only move to biologics if disease activity stays high. It's not a matter of newer being 'better' — for a large minority of patients, DMARDs alone give excellent control.",
        ],
      },
      {
        heading: "Side-effect trade-offs",
        paragraphs: [
          "DMARDs need regular blood tests (fortnightly at start, then every 8–12 weeks) to catch liver, kidney or blood-count problems early. Common day-to-day side-effects — nausea, mouth ulcers, tiredness the day after methotrexate — often improve with folic acid, dose splitting or an anti-sickness tablet.",
          "Biologics have lower rates of these particular issues but a higher risk of serious infection, TB reactivation and, for some classes, shingles or blood clots. That's why patients are screened for TB, hepatitis and vaccinated before starting, and told to hold doses during active infections.",
        ],
      },
      {
        heading: "Cost and access",
        paragraphs: [
          "For the individual patient, both are free on the NHS if criteria are met (though there's a prescription charge in England for DMARD tablets unless you're exempt). To the NHS, however, biologics cost thousands per patient per year — mitigated significantly by the rise of biosimilars, which are cheaper 'generic' versions with equivalent effect.",
          "Privately, methotrexate and other DMARDs can be prescribed for a few pounds a month; biologics privately cost hundreds to a few thousand a month, so almost all UK patients access them through the NHS.",
        ],
      },
      {
        heading: "Which is 'better'?",
        paragraphs: [
          "For most newly-diagnosed rheumatoid arthritis, methotrexate remains the anchor drug — often combined with a short course of steroids to bridge until it kicks in. Roughly half of patients get durable low disease activity or remission on DMARDs alone.",
          "For those with persistent activity or specific features (like severe skin psoriasis or axial disease), biologics are transformative and now expected in the NHS treatment pathway. Increasingly, rheumatologists tailor the choice of biologic to the disease pattern and personal factors like pregnancy, cardiovascular risk and needle tolerance.",
        ],
      },
    ],
    table: [
      { label: "Type of medicine", a: "Broad immune suppressants", b: "Targeted immune blockers" },
      { label: "First-line?", a: "Yes", b: "After DMARD failure" },
      { label: "How given", a: "Tablets or weekly injection", b: "Injection or infusion (some tablets)" },
      { label: "Monitoring", a: "Regular bloods", b: "Screening + infection watch" },
      { label: "NHS cost/year", a: "Under £100", b: "£8,000–£15,000+" },
      { label: "Access on NHS", a: "Freely prescribed", b: "NICE criteria required" },
    ],
    takeaways: [
      "Most UK patients start on methotrexate — cheap, effective, and well understood.",
      "Biologics come in after two DMARDs haven't controlled disease.",
      "Both need infection awareness, but biologics carry a higher infection risk.",
      "Biosimilars have made biologics far more affordable for the NHS.",
      "The goal for either family is remission or low disease activity, not just pain relief.",
    ],
  },

  "/guides/swimming-vs-walking-arthritis": {
    path: "/guides/swimming-vs-walking-arthritis",
    title: "Swimming vs Walking for Arthritis",
    metaDescription:
      "Swimming vs walking for arthritis — which helps more, which is safer for painful joints, and what UK guidance recommends.",
    intro:
      "Regular movement is one of the most powerful treatments for arthritis — the closest thing to a wonder drug. But when joints hurt, choosing the right kind of movement matters. This guide compares swimming and walking side-by-side for UK arthritis patients, drawing on NHS and Versus Arthritis guidance.",
    optionA: {
      name: "Swimming (and water-based exercise)",
      howItWorks:
        "Water supports up to 90% of body weight, taking load off painful joints while still building strength, aerobic fitness and range of motion.",
      bestFor:
        "Hip, knee and back osteoarthritis, flare recovery, people carrying extra weight, or those very deconditioned.",
      sideEffects:
        "Chlorine may irritate skin; access can be limited by cost and pool availability; getting in and out can be tricky with hip/knee pain.",
      nhs: "Some areas offer NHS-referred hydrotherapy or subsidised 'aquatic exercise on prescription' schemes.",
      cost: "£4–£7 a public swim; £30–£50 monthly gym membership; NHS hydrotherapy free but usually short courses.",
    },
    optionB: {
      name: "Walking",
      howItWorks:
        "Low-impact aerobic exercise that strengthens leg muscles, improves cardiovascular health and maintains bone density.",
      bestFor:
        "Most mild-to-moderate arthritis, people who prefer outdoor exercise, and anyone building daily activity habits.",
      sideEffects:
        "Weight-bearing means more knee and hip load than swimming; can flare pain if pace, terrain or footwear are wrong.",
      nhs: "Actively recommended by NHS 'Better Health' campaigns; NHS Couch to 5K and walking groups are widely available.",
      cost: "Essentially free — you already have shoes.",
    },
    sections: [
      {
        heading: "The joint-load question",
        paragraphs: [
          "The single biggest difference between swimming and walking is joint load. Chest-deep water reduces effective body weight by around 75%, and neck-deep water by around 90%. That's why hydrotherapy pools are heated and used specifically for people whose joints can't tolerate normal exercise — after a knee replacement, during a rheumatoid flare, or when hip osteoarthritis makes even a short walk painful.",
          "Walking, by contrast, loads each knee with about 1.5 times body weight per step. That's usually fine for mild osteoarthritis and actually helps cartilage stay healthy through 'load and unload' cycles — but it can be too much during a flare or with badly deconditioned muscles.",
        ],
      },
      {
        heading: "What each does for your fitness",
        paragraphs: [
          "Both count towards the UK's recommended 150 minutes per week of moderate activity. Swimming works upper body, core and legs simultaneously, so it builds more overall muscular endurance than walking. Walking, however, is more specific to the daily task of walking, which matters if your goal is getting to the shops without pain.",
          "Cardiovascular benefits are comparable at equivalent intensity. Where the two really diverge is bone density: walking preserves bone through mechanical loading, while swimming — pleasant as it is — does not. Post-menopausal women and anyone at risk of osteoporosis should ideally include some weight-bearing exercise even if they primarily swim.",
        ],
      },
      {
        heading: "What UK guidelines say",
        paragraphs: [
          "NICE recommends any exercise that a person will actually do, tailored to their condition and preference. Versus Arthritis and the NHS emphasise the same message: something is better than nothing, and the 'best' exercise is the one you enjoy enough to keep going.",
          "For inflammatory arthritis flares and after joint surgery, hydrotherapy (physiotherapist-led exercise in a warm pool) is often prescribed short-term to rebuild strength without triggering pain. Once pain settles, most people are gradually moved onto walking, cycling or land-based physiotherapy.",
        ],
      },
      {
        heading: "Practical realities",
        paragraphs: [
          "Swimming has real barriers: getting to a pool, changing rooms, hair care, cost and — for some — anxiety about being in a swimming costume. Walking removes almost all of those. On the other hand, walking in a British winter with icy pavements is riskier for anyone unsteady on their feet.",
          "A good compromise for many patients: walking as everyday movement (aiming for a modest step target), plus one or two pool sessions per week for range of motion and non-weight-bearing strength.",
        ],
      },
      {
        heading: "Choosing based on your joint",
        paragraphs: [
          "Hip and knee osteoarthritis often favour swimming as the primary exercise, particularly during flares. Back arthritis and mild lower-limb OA usually do very well with walking. Hand and wrist arthritis? Neither is particularly targeted, but both help general fitness — pair with specific hand exercises from a physiotherapist.",
          "If your pain rises by more than two points on a 0–10 scale during exercise, or is still worse the next morning, reduce intensity rather than stop entirely. That's not a sign to give up; it's a sign to adjust.",
        ],
      },
    ],
    table: [
      { label: "Joint load", a: "Very low (up to 90% offloaded)", b: "Full body weight per step" },
      { label: "Cardiovascular fitness", a: "Excellent", b: "Excellent" },
      { label: "Bone density", a: "Minimal effect", b: "Preserves it" },
      { label: "Best during a flare", a: "Yes", b: "Usually no" },
      { label: "Access", a: "Requires pool", b: "Anywhere, anytime" },
      { label: "Typical cost", a: "£4–£7 per session", b: "Free" },
    ],
    takeaways: [
      "Swimming is gentler on joints; walking is better for bones.",
      "During a flare, water-based exercise usually wins.",
      "Walking counts towards your weekly 150 minutes and is free.",
      "Combining both — pool weekly, walk daily — suits many arthritis patients.",
      "Speak to a physio about NHS-referred hydrotherapy if pain limits walking.",
    ],
  },

  "/guides/heat-vs-cold-arthritis-pain": {
    path: "/guides/heat-vs-cold-arthritis-pain",
    title: "Heat vs Cold Therapy for Arthritis Pain",
    metaDescription:
      "Heat pack or ice pack for arthritis pain? A UK guide to when each helps most, how to use them safely, and evidence from NHS pain services.",
    intro:
      "Heat and cold are the oldest self-management tools we have for joint pain, and — done properly — they remain some of the most useful. This guide explains when to reach for a hot water bottle versus a bag of frozen peas, based on NHS pain-service advice and the arthritis charity guidance most physiotherapists follow.",
    optionA: {
      name: "Heat therapy",
      howItWorks:
        "Warms tissue, relaxes muscle spasm, increases blood flow and gates the transmission of pain signals.",
      bestFor:
        "Stiff, aching joints, morning stiffness in rheumatoid or ankylosing spondylitis, and muscle-driven low back pain.",
      sideEffects:
        "Burns if too hot or applied too long; should be avoided over active flares, broken skin or reduced sensation.",
      nhs: "Recommended by NHS pain services and physiotherapists as a self-care measure.",
      cost: "£5–£20 for a wheat bag, hot water bottle or reusable heat pad.",
    },
    optionB: {
      name: "Cold therapy",
      howItWorks:
        "Reduces tissue temperature, narrows blood vessels, slows nerve conduction and damps down inflammation.",
      bestFor:
        "Swollen, warm, red joints in inflammatory flares, gout attacks and after activity that has aggravated a joint.",
      sideEffects:
        "Frostbite or nerve irritation if applied direct to skin or for too long; not for Raynaud's or poor circulation.",
      nhs: "Recommended for acute inflammatory flares by NHS and rheumatology teams.",
      cost: "£0 (frozen peas!) to £15 for a reusable gel pack.",
    },
    sections: [
      {
        heading: "What heat and cold actually do",
        paragraphs: [
          "Heat opens up local blood vessels, brings warm blood to stiff tissue and helps muscles relax. It also reduces the sensitivity of pain receptors — a temporary but real effect. That's why a hot shower in the morning is often the single most helpful thing for rheumatoid or ankylosing spondylitis stiffness.",
          "Cold does the opposite: it narrows blood vessels, slows chemical activity in inflamed tissue and numbs the area. That makes it best for the swollen, throbbing, warm joint you get in a gout attack or a rheumatoid flare.",
        ],
      },
      {
        heading: "Simple rule of thumb",
        paragraphs: [
          "If the joint is stiff and achy, choose heat. If it is hot, swollen and angry, choose cold. If it's both — say, an osteoarthritic knee that's been overused — most people find alternating heat and cold sessions helps.",
          "This isn't a hard rule. Some people with rheumatoid arthritis prefer heat even during flares because the muscle-relaxing effect outweighs the mild pro-inflammatory effect. Trust your own body.",
        ],
      },
      {
        heading: "How to use each one safely",
        paragraphs: [
          "For heat: aim for pleasantly warm, not scalding. 15–20 minutes at a time, with a towel or clothing between skin and the heat source. Never sleep with an electric blanket or heat pad on. Avoid heat on skin with reduced sensation (from neuropathy or after some steroid injections).",
          "For cold: wrap an ice pack or bag of frozen peas in a thin tea towel — never straight onto the skin. 10–15 minutes maximum, with at least an hour off between applications. Skip cold on numb areas, on Raynaud's-affected fingers, or if you have poor circulation.",
        ],
      },
      {
        heading: "What the evidence says",
        paragraphs: [
          "Systematic reviews consistently show that superficial heat provides small but meaningful short-term pain relief in osteoarthritis, low back pain and rheumatoid arthritis. Cold has a weaker evidence base but is repeatedly shown to reduce pain and swelling after acute flares, and after exercise that has stirred up a joint.",
          "Neither modality changes the underlying disease. They are self-management tools that make daily life more bearable and can reduce reliance on painkillers — a genuinely useful thing given NSAID risks in older adults.",
        ],
      },
      {
        heading: "Combining with other self-care",
        paragraphs: [
          "Heat before exercise or stretching can help you move further; cold afterwards can settle any post-exercise swelling. Many physiotherapists teach this 'heat-move-cold' routine for stubborn joints.",
          "Contrast bathing — alternating warm and cold water — is popular anecdotally for hand and foot arthritis, though evidence is limited. If it feels good and skin tolerates it, it's harmless.",
        ],
      },
    ],
    table: [
      { label: "Best on stiff joints", a: "Yes", b: "No" },
      { label: "Best on hot, swollen joints", a: "No", b: "Yes" },
      { label: "Typical session", a: "15–20 min", b: "10–15 min" },
      { label: "Cost", a: "£5–£20", b: "£0–£15" },
      { label: "Avoid if", a: "Reduced sensation, over broken skin", b: "Raynaud's, poor circulation" },
    ],
    takeaways: [
      "Stiff and achy → heat. Hot and swollen → cold.",
      "Always use a barrier between skin and heat/ice; never sleep on either.",
      "Heat before movement, cold after can be a helpful routine.",
      "Both reduce pain temporarily; neither changes the disease.",
      "Stop and seek advice if pain increases or skin reacts.",
    ],
  },

  "/guides/mediterranean-diet-vs-anti-inflammatory-diet": {
    path: "/guides/mediterranean-diet-vs-anti-inflammatory-diet",
    title: "Mediterranean vs Anti-Inflammatory Diet for Arthritis",
    metaDescription:
      "Mediterranean diet vs anti-inflammatory diet for arthritis — how they overlap, where they differ, and what UK evidence really supports.",
    intro:
      "'Anti-inflammatory' has become a marketing word attached to almost every food trend. The Mediterranean diet is one of the few eating patterns with genuinely strong evidence for reducing arthritis pain and cardiovascular risk. This guide compares the two, for UK readers who want to eat in a way that actually helps their joints — without buying £40 supplements.",
    optionA: {
      name: "Mediterranean diet",
      howItWorks:
        "A defined dietary pattern rich in vegetables, fruit, wholegrains, legumes, olive oil, nuts and oily fish, with modest dairy and low red meat.",
      bestFor:
        "Anyone with arthritis (particularly RA and OA), and anyone reducing cardiovascular risk alongside joint health.",
      sideEffects:
        "None; may cost slightly more if extra virgin olive oil and oily fish are new to your weekly shop.",
      nhs: "Explicitly recommended by NHS Eatwell and by NICE for cardiovascular prevention.",
      cost: "£40–£70 per person per week; overlaps with normal UK shopping.",
    },
    optionB: {
      name: "'Anti-inflammatory' diet",
      howItWorks:
        "Not a single defined pattern — usually a set of principles emphasising oily fish, turmeric, ginger, berries, leafy greens, while cutting sugar, ultra-processed food and, sometimes, gluten or nightshades.",
      bestFor:
        "People who want a framework beyond Mediterranean, or who tolerate elimination approaches.",
      sideEffects:
        "Risk of over-restriction, especially if nightshades or wheat are cut without clinical need.",
      nhs: "Not a formal NHS pattern; individual foods align with Mediterranean advice.",
      cost: "Can be expensive if it relies on speciality supplements and superfoods.",
    },
    sections: [
      {
        heading: "How much overlap is there?",
        paragraphs: [
          "In practice, most versions of 'anti-inflammatory eating' are 90% Mediterranean plus a few extras — turmeric, ginger, green tea, sometimes limiting nightshades, wheat or dairy. Both patterns emphasise vegetables, fruit, nuts, seeds, oily fish, olive oil and legumes, and both discourage ultra-processed food, sugary drinks and excess red or processed meat.",
          "The real difference is that the Mediterranean diet is defined by decades of research — including large randomised trials like PREDIMED — whereas 'anti-inflammatory' as a label is looser and often driven by supplement marketing.",
        ],
      },
      {
        heading: "What the arthritis evidence actually shows",
        paragraphs: [
          "For rheumatoid arthritis, several trials of Mediterranean-style eating show modest but real reductions in joint pain, tender joint count and CRP. Effects are smaller than DMARDs but real, and improve cardiovascular risk — important because RA itself raises heart-attack risk.",
          "For osteoarthritis, evidence is weaker but consistent: people eating a Mediterranean-style diet report less pain and better function, largely mediated by weight loss and reduced systemic inflammation.",
          "Individual 'anti-inflammatory' foods (turmeric/curcumin, omega-3, ginger, green tea) each have trials of variable quality, generally showing small pain-relief effects. Nothing comes close to the effect size of Mediterranean eating as a whole pattern.",
        ],
      },
      {
        heading: "Where they genuinely differ",
        paragraphs: [
          "Some anti-inflammatory approaches recommend cutting nightshades (tomatoes, aubergine, peppers, potatoes), gluten or dairy. There is no consistent evidence these help arthritis in general — although a small subset of people with coeliac disease or genuine intolerances do improve. Blanket elimination risks nutritional gaps and lower quality of life.",
          "Some approaches lean heavily on supplements — turmeric capsules, high-dose fish oil, MSM, glucosamine. The evidence for these is patchy: high-dose omega-3 has modest RA benefit; curcumin has some knee osteoarthritis trials; glucosamine's effect is small and inconsistent.",
        ],
      },
      {
        heading: "Building it in real UK life",
        paragraphs: [
          "You don't need to buy anything exotic. A Mediterranean-style shopping list in the UK looks like: bags of frozen berries, tinned tomatoes and beans, oats, rye or wholewheat bread, extra virgin olive oil, mixed nuts, plain yoghurt, two portions of oily fish a week (tinned sardines and mackerel are cheap), plenty of vegetables and occasional lean chicken or eggs. Red meat and processed meat move to the edge of the plate.",
          "If you want to add 'anti-inflammatory' extras, safe additions are turmeric with black pepper in cooking, fresh or powdered ginger, and green tea. Skip the £30 pill bottles unless a rheumatologist or dietitian specifically recommends them.",
        ],
      },
      {
        heading: "What to prioritise if you can only change one thing",
        paragraphs: [
          "For arthritis, the highest-yield change is usually: eat oily fish twice a week, swap sunflower/vegetable oil for olive oil, and eat vegetables at every meal. Do just that and you're already Mediterranean, already anti-inflammatory, and likely to feel a difference over 8–12 weeks.",
          "Weight loss, where relevant, amplifies everything: each kilogram off reduces load on the knee joint by roughly 4 kg per step, and losing 10% of body weight can rival the pain relief of common medication in obese OA patients.",
        ],
      },
    ],
    table: [
      { label: "Evidence in arthritis", a: "Strong (RA and OA)", b: "Mixed, mostly single-food studies" },
      { label: "Defined pattern?", a: "Yes", b: "Loose set of principles" },
      { label: "Cost", a: "Everyday supermarket", b: "Higher if supplement-heavy" },
      { label: "Elimination-based?", a: "No", b: "Sometimes (nightshades, gluten)" },
      { label: "NHS-endorsed?", a: "Yes (via Eatwell + NICE)", b: "Not formally" },
    ],
    takeaways: [
      "Mediterranean eating has the strongest evidence for arthritis.",
      "Most 'anti-inflammatory' diets are Mediterranean plus optional extras.",
      "Skip elimination diets unless clinically indicated.",
      "Two portions of oily fish and olive oil are the biggest single wins.",
      "Weight loss magnifies the benefit of any dietary change.",
    ],
  },

  "/guides/nhs-vs-private-rheumatology": {
    path: "/guides/nhs-vs-private-rheumatology",
    title: "NHS vs Private Rheumatology in the UK",
    metaDescription:
      "NHS vs private rheumatology — waiting times, costs, medication access and what genuinely changes if you go private in the UK.",
    intro:
      "Getting rheumatology care in the UK usually means the NHS, but private appointments can shorten waits and give you more choice over your consultant. This guide compares both routes honestly, so you can decide whether — and when — private is worth it.",
    optionA: {
      name: "NHS rheumatology",
      howItWorks:
        "GP refers you; you're triaged; a rheumatologist assesses, orders tests, starts treatment on NICE-approved pathways. Fully funded.",
      bestFor:
        "The overwhelming majority of patients — care is high-quality and complete, if slower than private.",
      sideEffects:
        "Long waits (often 12–30+ weeks for first appointment), less continuity of consultant, limited appointment times.",
      nhs: "Universal, free at the point of use for UK residents.",
      cost: "£0 to the patient (prescription charges may apply in England).",
    },
    optionB: {
      name: "Private rheumatology",
      howItWorks:
        "Self-referral or GP letter to a private consultant, seen within days to weeks. Any prescribed medicines usually shift back to NHS for long-term supply.",
      bestFor:
        "Getting a diagnosis faster, second opinions, more flexible appointment times, complex cases.",
      sideEffects:
        "Cost; not always straightforward to move biologics from private to NHS; less integration with your NHS record.",
      nhs: "Runs alongside NHS — most rheumatologists work in both.",
      cost: "£200–£350 first appointment, £150–£250 follow-ups, plus tests and imaging (often £150–£500).",
    },
    sections: [
      {
        heading: "What you actually get in each",
        paragraphs: [
          "In the NHS, care follows NICE pathways: bloods, imaging, DMARDs, biologics if criteria are met. Consultants change over time in some clinics; nurse-led follow-up is common. The clinical care is generally excellent, but access is rationed by waiting lists.",
          "Privately, you get a longer first appointment (typically 45–60 minutes), quick access to ultrasound or MRI, and the same consultant every time. The clinical decisions look very similar — most private rheumatologists work in the NHS too and follow the same guidelines.",
        ],
      },
      {
        heading: "Waiting times — the real reason people go private",
        paragraphs: [
          "In parts of the UK the wait for an NHS first rheumatology appointment can be 20+ weeks, and longer for follow-up scans. When early inflammatory arthritis is suspected, that delay matters — every extra month before starting DMARDs adds a small but measurable risk of joint damage.",
          "A private first appointment is often available within 5–10 working days. If bloods and ultrasound confirm inflammation, a private consultant can start DMARDs immediately (usually on private prescription initially).",
        ],
      },
      {
        heading: "The medication transfer question",
        paragraphs: [
          "For most patients this is where private care gets complicated. Methotrexate and other conventional DMARDs can usually be transferred back to your NHS GP as a 'shared care' arrangement, saving hundreds of pounds a year. Not all GP surgeries accept shared care immediately — it depends on local guidelines.",
          "Biologics are much harder to transfer. NHS access requires NICE eligibility criteria met by NHS records, which private records don't always satisfy directly. Many patients start biologics privately, then re-enter the NHS via a formal transfer that essentially repeats the eligibility assessment.",
        ],
      },
      {
        heading: "Cost — being realistic",
        paragraphs: [
          "A first private consultation is typically £200–£350; follow-ups £150–£250. Add £50–£150 for bloods, £150–£400 for MRI or ultrasound. So a full private diagnostic workup often costs £500–£1,000 before treatment starts.",
          "Some private health insurance policies cover this; some specifically exclude chronic conditions once diagnosed. Read the policy wording carefully — you cannot 'insure yourself' for arthritis after you're already diagnosed.",
        ],
      },
      {
        heading: "When private is worth it — and when it isn't",
        paragraphs: [
          "Private is often worth it if: you have new, potentially inflammatory joint symptoms and the NHS wait is over 3 months; you want a second opinion on a complex diagnosis; you need faster access to imaging; or you're symptomatic between NHS appointments and want a bridging opinion.",
          "Private is usually not worth it if: you already have a diagnosis and an NHS team; your treatment is stable; you only want private for 'comfort' rather than clinical urgency. The clinical decisions won't differ — you'd just be paying for the same guideline-based care faster.",
        ],
      },
      {
        heading: "A common hybrid approach",
        paragraphs: [
          "Many UK patients use a hybrid: one private appointment to get a rapid diagnosis and start treatment, then transfer conventional DMARDs to their GP under shared care, and re-enter the NHS system for long-term follow-up. This can dramatically shorten the diagnostic delay without long-term cost.",
        ],
      },
    ],
    table: [
      { label: "First appointment wait", a: "12–30+ weeks", b: "Within 1–2 weeks" },
      { label: "First appointment cost", a: "£0", b: "£200–£350" },
      { label: "Consultant continuity", a: "Variable", b: "Same consultant" },
      { label: "Imaging access", a: "Weeks–months", b: "Days" },
      { label: "Biologic access", a: "NICE-eligibility pathway", b: "Faster start; NHS transfer complex" },
      { label: "Long-term follow-up", a: "Excellent (once in system)", b: "Often moved back to NHS" },
    ],
    takeaways: [
      "Private mostly buys speed, not different medicines.",
      "For suspected early inflammatory arthritis, speed matters clinically.",
      "Shared care lets you move DMARDs back to NHS to control costs.",
      "Biologics are hardest to transfer privately → NHS; plan accordingly.",
      "A one-off private consult can be a smart bridge into the NHS pathway.",
    ],
  },
};

export function getComparisonArticle(path: string): ComparisonArticle | undefined {
  return COMPARISON_CONTENT[path];
}
