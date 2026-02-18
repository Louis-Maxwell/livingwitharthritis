export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  keywords: string[];
  content: string; // markdown-style plain text sections
  sections: { heading: string; body: string }[];
  /** Curated cross-article links: { slug, anchorText } */
  relatedLinks?: { slug: string; anchorText: string }[];
}

export const articles: Article[] = [
  {
    slug: "best-exercises-for-arthritis-uk",
    title: "Best Exercises for Arthritis in the UK: A Complete Guide",
    description:
      "Discover the safest, most effective arthritis exercises recommended by UK physiotherapists. From walking to swimming, learn how movement reduces joint pain.",
    category: "Exercise",
    readTime: "7 min read",
    publishedAt: "2026-02-10",
    author: "Living With Arthritis",
    keywords: [
      "arthritis exercises UK",
      "exercises for arthritis",
      "joint exercises UK",
      "physiotherapy arthritis UK",
      "low impact exercise arthritis",
    ],
    content: "",
    sections: [
      {
        heading: "Why Exercise Matters for Arthritis",
        body: "Many people with arthritis fear that exercise will worsen their pain, but the opposite is true. UK physiotherapists consistently recommend regular, low-impact movement as one of the most effective ways to manage arthritis symptoms. Exercise strengthens the muscles around your joints, improves flexibility, and reduces inflammation — all without the side effects of medication.",
      },
      {
        heading: "Walking: The UK's Most Accessible Option",
        body: "A daily 20–30 minute walk on flat ground, parks, or canal towpaths is ideal for most arthritis sufferers. Walking builds quad and glute strength to support knee and hip joints. Aim for a comfortable pace — you should be able to hold a conversation. British weather needn't stop you: many UK leisure centres have indoor walking tracks.",
      },
      {
        heading: "Swimming and Hydrotherapy",
        body: "Water supports up to 90% of your body weight, dramatically reducing joint stress. Swimming and aqua aerobics are especially recommended for people with hip or knee osteoarthritis. Many NHS trusts offer hydrotherapy pools and refer patients through physiotherapy departments. A 30-minute session, 2–3 times per week, can significantly improve range of motion.",
      },
      {
        heading: "Strength Training for Joint Support",
        body: "Building muscle around affected joints is critical. Key exercises include seated leg raises (quads), wall slides (knees), and resistance band rows (shoulders). Start with 2 sets of 8–10 repetitions, resting 60 seconds between sets. Resistance bands are inexpensive, widely available in UK pharmacies and online, and gentle enough for beginners.",
      },
      {
        heading: "Tai Chi and Yoga",
        body: "Both disciplines have strong evidence for reducing arthritis pain and improving balance, which reduces fall risk — a major concern for older UK adults. Many UK councils and NHS programmes offer free or subsidised tai chi classes for over-60s. Chair yoga is a great adaptation for those with limited mobility.",
      },
      {
        heading: "Cycling",
        body: "Stationary or outdoor cycling is low-impact and highly effective for knee osteoarthritis. The UK's growing network of cycle paths (including the National Cycle Network) makes outdoor cycling accessible. Adjust saddle height so your knee bends slightly at the bottom of the pedal stroke — this protects the knee joint.",
      },
      {
        heading: "How to Get Started Safely",
        body: "Always speak to your GP or a physiotherapist before starting a new exercise regime, especially if your arthritis is severe or you have other health conditions. Start slowly, listen to your body, and build duration gradually. Mild discomfort during exercise is normal; sharp or lasting pain is a signal to stop and seek advice.",
      },
    ],
    relatedLinks: [
      { slug: "virtual-physiotherapy-arthritis-uk", anchorText: "virtual physiotherapy for arthritis UK" },
      { slug: "best-diet-for-joint-pain-uk", anchorText: "anti-inflammatory diet to support your exercise programme" },
      { slug: "knee-pain-arthritis-uk", anchorText: "specific exercises for knee arthritis" },
    ],
  },
  {
    slug: "best-diet-for-joint-pain-uk",
    title: "Best Diet for Joint Pain in the UK: Anti-Inflammatory Foods That Help",
    description:
      "Learn which anti-inflammatory foods can reduce joint pain and stiffness. A UK-focused guide to the Mediterranean diet, omega-3s, and foods to avoid.",
    category: "Nutrition",
    readTime: "8 min read",
    publishedAt: "2026-02-11",
    author: "Living With Arthritis",
    keywords: [
      "best diet for joint pain UK",
      "anti-inflammatory diet UK",
      "diet for arthritis UK",
      "foods for joint pain UK",
      "Mediterranean diet arthritis",
    ],
    content: "",
    sections: [
      {
        heading: "How Diet Affects Arthritis",
        body: "Chronic inflammation drives arthritis pain and joint damage. What you eat directly influences your body's inflammatory response. A diet rich in anti-inflammatory nutrients — and low in pro-inflammatory processed foods — can meaningfully reduce pain, stiffness, and fatigue over time, without the side effects of long-term NSAID use.",
      },
      {
        heading: "The Mediterranean Diet: Best Evidence for UK Patients",
        body: "Multiple clinical trials confirm that a Mediterranean-style diet reduces markers of inflammation and joint pain in people with osteoarthritis and rheumatoid arthritis. UK dietitians frequently recommend it. The pattern is: plenty of vegetables, fruit, wholegrains, olive oil, nuts, seeds, and fish — with limited red meat and processed foods.",
      },
      {
        heading: "Oily Fish: The UK's Best Anti-Inflammatory Food",
        body: "Salmon, mackerel, sardines, herring, and trout are all rich in omega-3 fatty acids (EPA and DHA), which are proven to reduce joint inflammation. UK dietary guidelines recommend at least two portions of fish per week, one of which should be oily. Tinned sardines and mackerel are affordable UK staples that work just as well as fresh fillets.",
      },
      {
        heading: "Berries, Cherries, and Colourful Vegetables",
        body: "Strawberries, blueberries, and cherries contain anthocyanins — powerful antioxidants that combat oxidative stress in joints. Aim for a 'rainbow plate': dark leafy greens (spinach, kale), orange vegetables (sweet potatoes, carrots), and red and purple produce. All are widely available and affordable in UK supermarkets.",
      },
      {
        heading: "Turmeric and Ginger: Evidence-Based Spices",
        body: "Curcumin (the active compound in turmeric) has been shown in clinical trials to reduce arthritis pain to a similar degree as ibuprofen in some patients. Add a teaspoon to curries, soups, or golden lattes. Combine with black pepper to dramatically boost absorption. Ginger (fresh or powdered) similarly inhibits COX-2, the same pathway targeted by anti-inflammatory drugs.",
      },
      {
        heading: "Foods to Avoid with Arthritis",
        body: "Limit ultra-processed foods, sugary drinks, white bread, and excessive red or processed meat. These promote systemic inflammation. High salt intake is associated with worse rheumatoid arthritis outcomes in UK studies. Alcohol, while not completely prohibited, should be kept within NHS guidelines (14 units per week maximum).",
      },
      {
        heading: "Weight Management: The Single Biggest Dietary Impact",
        body: "Every kilogram of excess body weight adds approximately 4 kg of pressure on the knee joint. Losing just 5–10% of your body weight can significantly reduce knee pain. A Mediterranean diet naturally supports weight loss without calorie counting. Pairing it with the low-impact exercises described in our exercise guide gives the best outcomes.",
      },
    ],
    relatedLinks: [
      { slug: "arthritis-supplements-uk", anchorText: "evidence-based arthritis supplements like turmeric and omega-3" },
      { slug: "best-exercises-for-arthritis-uk", anchorText: "best exercises for arthritis UK" },
      { slug: "gout-uk-guide", anchorText: "dietary changes for gout" },
    ],
  },
  {
    slug: "osteoarthritis-symptoms-uk",
    title: "Osteoarthritis Symptoms in the UK: What to Look For and When to See a Doctor",
    description:
      "Understand the early and advanced symptoms of osteoarthritis. A UK patient guide covering diagnosis, when to see your GP, and what to expect from the NHS.",
    category: "Conditions",
    readTime: "6 min read",
    publishedAt: "2026-02-12",
    author: "Living With Arthritis",
    keywords: [
      "osteoarthritis symptoms UK",
      "osteoarthritis UK",
      "signs of osteoarthritis",
      "when to see GP arthritis",
      "NHS osteoarthritis",
    ],
    content: "",
    sections: [
      {
        heading: "What Is Osteoarthritis?",
        body: "Osteoarthritis (OA) is the most common form of arthritis in the UK, affecting around 8.75 million people. It occurs when the protective cartilage cushioning the ends of your bones gradually wears down, causing the bones to rub together. It most commonly affects the knees, hips, hands, and spine.",
      },
      {
        heading: "Early Symptoms to Watch For",
        body: "Early osteoarthritis often starts with mild joint pain after activity or at the end of the day, brief morning stiffness that eases within 30 minutes, a sense of tenderness when pressing on a joint, and reduced flexibility. Many people dismiss these early signs as normal ageing — but identifying them early means you can slow progression through lifestyle changes.",
      },
      {
        heading: "Advanced Symptoms",
        body: "As osteoarthritis progresses, symptoms can include persistent pain at rest, visible joint swelling, a grating or crunching sensation (crepitus), bone spurs (osteophytes) that you can feel around the joint, and muscle weakness due to reduced movement. In severe cases, joint deformity can occur.",
      },
      {
        heading: "When to See Your GP",
        body: "Book a GP appointment if your joint pain lasts longer than a few weeks, significantly limits your daily activities, wakes you at night, or comes with significant swelling, warmth, or redness (which may indicate inflammation or another condition). In the UK, your GP can refer you for X-rays, blood tests to rule out other causes, and physiotherapy.",
      },
      {
        heading: "How the NHS Diagnoses Osteoarthritis",
        body: "There is no single definitive test for osteoarthritis. Your GP will review your symptoms, conduct a physical examination, and may order X-rays to assess cartilage loss and bone changes. Blood tests are typically used to rule out rheumatoid arthritis, gout, and other inflammatory conditions. MRI scans are sometimes used for complex presentations.",
      },
      {
        heading: "NHS Treatment Pathway",
        body: "Most UK patients are initially managed with lifestyle advice, physiotherapy referral, and analgesics (paracetamol, then NSAIDs if tolerated). Steroid injections are available for severe flare-ups. In cases where joint damage is severe and quality of life significantly impaired, your GP can refer you for joint replacement surgery. Waiting times vary by NHS trust.",
      },
    ],
    relatedLinks: [
      { slug: "best-exercises-for-arthritis-uk", anchorText: "best exercises for osteoarthritis UK" },
      { slug: "arthritis-medication-uk", anchorText: "arthritis medications available on the NHS" },
      { slug: "knee-pain-arthritis-uk", anchorText: "managing knee osteoarthritis" },
    ],
  },
  {
    slug: "rheumatoid-arthritis-uk-guide",
    title: "Rheumatoid Arthritis in the UK: Symptoms, Diagnosis, and Treatment",
    description:
      "A comprehensive UK guide to rheumatoid arthritis — an autoimmune condition affecting 400,000 people in Britain. Covers symptoms, DMARD treatment, and living well.",
    category: "Conditions",
    readTime: "8 min read",
    publishedAt: "2026-02-12",
    author: "Living With Arthritis",
    keywords: [
      "rheumatoid arthritis UK",
      "RA symptoms UK",
      "rheumatoid arthritis treatment UK",
      "DMARD UK",
      "autoimmune arthritis UK",
    ],
    content: "",
    sections: [
      {
        heading: "What Is Rheumatoid Arthritis?",
        body: "Rheumatoid arthritis (RA) is an autoimmune condition in which the immune system attacks the lining of the joints, causing inflammation, pain, and over time, joint damage. Around 400,000 people in the UK have RA, and it affects women three times more often than men. It can occur at any age, including in children.",
      },
      {
        heading: "How RA Differs from Osteoarthritis",
        body: "Unlike osteoarthritis, which is caused by wear and tear, RA is driven by immune system dysfunction. RA typically affects joints symmetrically (both wrists, both knees), is often accompanied by systemic symptoms like fatigue, fever, and weight loss, and can affect organs including the heart and lungs if untreated.",
      },
      {
        heading: "Symptoms of Rheumatoid Arthritis",
        body: "Key symptoms include prolonged morning stiffness lasting over 30 minutes (often hours), warm, swollen joints, symmetrical joint involvement, significant fatigue, and small joints in the hands and feet affected first. Blood tests may show elevated CRP, ESR, and the presence of rheumatoid factor (RF) or anti-CCP antibodies.",
      },
      {
        heading: "Getting Diagnosed in the UK",
        body: "If your GP suspects RA, you should be referred to a rheumatologist within 3 weeks under NICE guidelines. Rheumatologists use clinical assessment combined with blood tests and imaging (ultrasound or X-ray) to confirm diagnosis. Early diagnosis and treatment are critical — delaying treatment even by a few months can result in irreversible joint damage.",
      },
      {
        heading: "Disease-Modifying Drugs (DMARDs) on the NHS",
        body: "Unlike painkillers that only manage symptoms, DMARDs (Disease-Modifying Anti-Rheumatic Drugs) slow or halt the progression of RA. Methotrexate is typically the first DMARD prescribed. If this is insufficient, biologic DMARDs (such as adalimumab or etanercept) are available on the NHS via NICE-approved criteria. All are prescribed and monitored by your rheumatology team.",
      },
      {
        heading: "Living Well with RA in the UK",
        body: "Many people with RA lead full, active lives with the right treatment. Regular monitoring appointments with your rheumatology team, occupational therapy for joint protection strategies, and the lifestyle measures that help osteoarthritis (low-impact exercise, anti-inflammatory diet) all contribute. UK charities like Versus Arthritis offer excellent peer support networks.",
      },
    ],
    relatedLinks: [
      { slug: "arthritis-medication-uk", anchorText: "DMARDs and biologic drugs for rheumatoid arthritis UK" },
      { slug: "best-exercises-for-arthritis-uk", anchorText: "low-impact exercises suitable for RA patients" },
      { slug: "best-diet-for-joint-pain-uk", anchorText: "anti-inflammatory diet for rheumatoid arthritis" },
    ],
  },
  {
    slug: "arthritis-supplements-uk",
    title: "Arthritis Supplements in the UK: What Works and What Doesn't",
    description:
      "An evidence-based review of the most popular arthritis supplements available in UK pharmacies and online — including glucosamine, fish oil, turmeric, and collagen.",
    category: "Nutrition",
    readTime: "7 min read",
    publishedAt: "2026-02-13",
    author: "Living With Arthritis",
    keywords: [
      "arthritis supplements UK",
      "glucosamine UK",
      "fish oil arthritis UK",
      "turmeric supplement arthritis",
      "collagen for joints UK",
    ],
    content: "",
    sections: [
      {
        heading: "Should You Take Supplements for Arthritis?",
        body: "The supplement market for joint health is enormous in the UK, but evidence quality varies widely. Most arthritis supplements are safe, but few have the consistent clinical evidence that medications do. The NHS does not routinely prescribe supplements for arthritis, but many rheumatologists and GPs consider some worthwhile as adjuncts to lifestyle measures.",
      },
      {
        heading: "Glucosamine and Chondroitin",
        body: "These are the most widely studied joint supplements. Some studies show modest benefits for knee osteoarthritis pain and function — particularly the combined supplement. However, the large GAIT trial found no significant benefit over placebo for most participants. The 2019 Cochrane review concluded effects are probably clinically insignificant. They are generally safe and some patients report clear benefit — try them for 3 months to assess your own response.",
      },
      {
        heading: "Omega-3 Fish Oil",
        body: "Fish oil (EPA and DHA) has the strongest evidence of any supplement for arthritis — particularly rheumatoid arthritis. High-dose omega-3 (2–3 g EPA+DHA daily) significantly reduces joint tenderness, morning stiffness, and the need for NSAIDs in RA patients. For osteoarthritis the evidence is more modest but generally positive. Look for products with at least 1000mg EPA+DHA per capsule.",
      },
      {
        heading: "Turmeric / Curcumin",
        body: "Curcumin extracts (not basic turmeric powder, which has poor absorption) have shown meaningful pain reduction in multiple clinical trials, with some studies showing benefits comparable to ibuprofen. Look for high-bioavailability formulations — those combined with piperine (black pepper extract) or using phospholipid complexes (e.g., Meriva). Effective doses used in trials are 500–1000mg curcumin daily.",
      },
      {
        heading: "Collagen Supplements",
        body: "Hydrolysed collagen (collagen peptides) shows emerging promise. Studies suggest it may reduce joint pain and improve function, potentially by providing building blocks for cartilage repair and modulating the immune response. Evidence is less robust than fish oil but growing. Type II collagen (native or hydrolysed) is most relevant for joint health. Generally safe with few side effects.",
      },
      {
        heading: "Vitamin D",
        body: "Vitamin D deficiency is widespread in the UK due to limited sunlight. Deficiency is associated with increased pain sensitivity, muscle weakness, and worse arthritis outcomes. The NHS recommends all UK residents consider a 10mcg (400 IU) supplement daily in autumn and winter. Those with darker skin or who avoid sun exposure should take it year-round. Higher doses may be appropriate — ask your GP to test your levels.",
      },
    ],
    relatedLinks: [
      { slug: "best-diet-for-joint-pain-uk", anchorText: "anti-inflammatory foods that support joint health" },
      { slug: "arthritis-medication-uk", anchorText: "NHS arthritis medications explained" },
      { slug: "rheumatoid-arthritis-uk-guide", anchorText: "fish oil for rheumatoid arthritis" },
    ],
  },
  {
    slug: "virtual-physiotherapy-arthritis-uk",
    title: "Virtual Physiotherapy for Arthritis UK: How Online Sessions Can Transform Your Care",
    description:
      "How virtual physiotherapy works for arthritis patients in the UK. Benefits, what to expect, and how to access online physiotherapy through the NHS and private providers.",
    category: "Physiotherapy",
    readTime: "6 min read",
    publishedAt: "2026-02-13",
    author: "Living With Arthritis",
    keywords: [
      "virtual physiotherapy UK",
      "online physiotherapy arthritis UK",
      "NHS physiotherapy online",
      "physiotherapy arthritis UK",
      "remote physiotherapy",
    ],
    content: "",
    sections: [
      {
        heading: "What Is Virtual Physiotherapy?",
        body: "Virtual physiotherapy delivers the same evidence-based exercises, advice, and personalised programmes as in-person sessions — but via video call, phone, or digital platform from your home. The COVID-19 pandemic accelerated NHS adoption, and many trusts now offer digital-first physiotherapy as standard, significantly improving access for people in rural areas or those with mobility difficulties.",
      },
      {
        heading: "Is Virtual Physio as Effective as In-Person?",
        body: "For most arthritis conditions, yes. A 2022 systematic review published in the British Journal of Sports Medicine found telehealth physiotherapy produced equivalent outcomes to in-person care for musculoskeletal conditions including knee and hip osteoarthritis. Hands-on treatments (joint mobilisation, manual therapy) remain best done in person, but exercise prescription, education, and monitoring work very well remotely.",
      },
      {
        heading: "Benefits for UK Arthritis Patients",
        body: "Key advantages include eliminating travel (painful for many arthritis sufferers), no waiting rooms, flexible appointment times that fit around work and family, and access to specialists regardless of geography. For patients in rural Scotland, Wales, or Northern Ireland where specialist services are sparse, virtual physiotherapy can be transformative.",
      },
      {
        heading: "How to Access NHS Virtual Physiotherapy",
        body: "Ask your GP for a physiotherapy referral specifying a preference for virtual sessions. Many NHS trusts operate self-referral to physiotherapy (MSK self-referral) — check your local trust's website. The NHS Musculoskeletal Health Questionnaire completed online often determines suitability. Waiting times vary; many areas have 6–18 week waits for NHS physiotherapy.",
      },
      {
        heading: "Private Virtual Physiotherapy Options",
        body: "Private virtual physiotherapy typically costs £40–£80 per session in the UK. Platforms such as Physio.co.uk, Physitrack, and various insurance-linked providers offer same-week appointments. If you have private health insurance, virtual physiotherapy is often covered. Always check your physiotherapist is registered with the Health and Care Professions Council (HCPC).",
      },
      {
        heading: "What to Expect in Your First Virtual Physio Session",
        body: "Your physiotherapist will take a detailed history of your symptoms, conduct a visual assessment (asking you to demonstrate movement and range of motion on camera), agree goals with you, and prescribe a home exercise programme. They will typically send a follow-up exercise plan via email or app. Subsequent sessions monitor progress and progress the programme.",
      },
    ],
    relatedLinks: [
      { slug: "best-exercises-for-arthritis-uk", anchorText: "arthritis exercises to do at home" },
      { slug: "knee-pain-arthritis-uk", anchorText: "physiotherapy for knee arthritis UK" },
      { slug: "hip-pain-arthritis-uk", anchorText: "physiotherapy exercises for hip arthritis" },
    ],
  },
  {
    slug: "knee-pain-arthritis-uk",
    title: "Knee Pain from Arthritis: A UK Patient's Complete Guide",
    description:
      "Comprehensive guide to managing arthritis knee pain in the UK. Covers diagnosis, exercises, NHS treatment options, and when to consider knee replacement surgery.",
    category: "Conditions",
    readTime: "7 min read",
    publishedAt: "2026-02-14",
    author: "Living With Arthritis",
    keywords: [
      "knee pain arthritis UK",
      "knee osteoarthritis UK",
      "arthritis knee exercises",
      "knee replacement UK NHS",
      "knee pain relief UK",
    ],
    content: "",
    sections: [
      {
        heading: "Why Knee Arthritis Is So Common in the UK",
        body: "The knee is the most commonly affected joint in osteoarthritis, bearing the full weight of the body with every step. In the UK, around 4.7 million adults have osteoarthritis of the knee. Risk factors include previous sports injury (common in the UK's physically active population), excess body weight, and occupational knee stress (kneeling, squatting).",
      },
      {
        heading: "Recognising Knee Arthritis Symptoms",
        body: "Knee arthritis typically presents as pain on the inner side of the knee, worsened by stairs, hills, or prolonged standing. Morning stiffness lasting under 30 minutes, clicking or crunching when moving the knee, and swelling after activity are common. The knee may bow outward (varus deformity) in advanced cases.",
      },
      {
        heading: "Best Exercises for Knee Arthritis",
        body: "Straight-leg raises strengthen the quadriceps without loading the knee joint. Step-ups on a low step build functional leg strength. Stationary cycling provides cardiovascular benefit with minimal joint stress. Swimming (particularly front crawl and backstroke leg kicks) maintains range of motion. All should be done consistently — 3–5 times per week — for meaningful benefit.",
      },
      {
        heading: "NHS Treatments for Knee Arthritis",
        body: "First-line NHS treatment includes physiotherapy, weight loss support, and analgesics. Intra-articular steroid injections provide short-term relief (weeks to months) and are available from your GP or rheumatologist. Hyaluronic acid injections are available privately but not routinely on the NHS. NICE guidelines (NG226) now guide UK clinicians on knee OA management.",
      },
      {
        heading: "Knee Replacement Surgery in the UK",
        body: "Total or partial knee replacement is highly effective for severe knee OA, with around 100,000 procedures performed on the NHS annually. NICE recommends offering joint replacement when non-surgical management has failed and quality of life is significantly impaired. NHS waiting times have lengthened post-pandemic — many NHS trusts have waits of 18 months or more. Private surgery can be arranged within weeks.",
      },
      {
        heading: "Protecting Your Knees Day-to-Day",
        body: "Footwear matters: avoid flat, unsupportive shoes — cushioned trainers reduce knee impact during walking. Using a walking stick in the opposite hand to your affected knee reduces the load. Sitting at a chair height that keeps knees at 90° reduces knee stress. Avoid kneeling on hard surfaces; use knee pads if necessary.",
      },
    ],
    relatedLinks: [
      { slug: "best-exercises-for-arthritis-uk", anchorText: "low-impact exercises for knee arthritis UK" },
      { slug: "virtual-physiotherapy-arthritis-uk", anchorText: "virtual physiotherapy for knee osteoarthritis" },
      { slug: "arthritis-medication-uk", anchorText: "knee injection and NHS pain relief options" },
    ],
  },
  {
    slug: "gout-uk-guide",
    title: "Gout in the UK: Symptoms, Triggers, and Treatment Options",
    description:
      "Everything UK patients need to know about gout — the UK's fastest-growing form of arthritis. Covers uric acid triggers, NHS treatments, and diet changes that help.",
    category: "Conditions",
    readTime: "6 min read",
    publishedAt: "2026-02-14",
    author: "Living With Arthritis",
    keywords: [
      "gout UK",
      "gout symptoms UK",
      "gout diet UK",
      "uric acid treatment UK",
      "gout NHS",
    ],
    content: "",
    sections: [
      {
        heading: "What Is Gout?",
        body: "Gout is a form of inflammatory arthritis caused by the build-up of uric acid crystals in a joint. It causes sudden, severe attacks of pain, redness, warmth, and swelling — most commonly in the big toe. Gout affects around 2.5% of UK adults and is the UK's fastest growing form of arthritis, with prevalence doubling over the past 20 years.",
      },
      {
        heading: "Who Gets Gout in the UK?",
        body: "Gout is more common in men (particularly over 40) and postmenopausal women. Risk factors include obesity, high blood pressure, kidney disease, taking diuretics, drinking alcohol (especially beer and spirits), and eating a diet high in purines (red meat, offal, seafood). Genetic factors also play a strong role.",
      },
      {
        heading: "Recognising a Gout Attack",
        body: "Gout attacks typically begin suddenly, often at night. The affected joint (usually the big toe, but also ankle, knee, or wrist) becomes intensely painful, swollen, hot, and red — often so sensitive that even the weight of a bedsheet is unbearable. Attacks usually last 3–10 days and resolve completely between episodes, particularly early in the condition.",
      },
      {
        heading: "Diet Changes That Reduce Gout",
        body: "Limit high-purine foods: red meat (beef, lamb, pork), offal (liver, kidneys), game, seafood (anchovies, mussels, scallops), and yeast extract (Marmite). Reduce alcohol — particularly beer, which is very high in purines. Stay well hydrated (aim for 2–3 litres of water daily). Cherries and cherry juice have moderate evidence for reducing gout attack frequency. A low-fat dairy intake may lower uric acid levels.",
      },
      {
        heading: "NHS Treatment for Gout",
        body: "Acute gout attacks are treated with NSAIDs (naproxen, indomethacin), colchicine, or corticosteroids. For people who have frequent attacks (more than 2 per year), long-term urate-lowering therapy with allopurinol is recommended. Allopurinol is inexpensive, effective, and widely prescribed by UK GPs. Regular blood tests to monitor uric acid levels are needed.",
      },
      {
        heading: "Living Gout-Free: Long-Term Management",
        body: "With consistent allopurinol treatment and appropriate diet changes, most people with gout can become effectively attack-free. The target uric acid level is below 360 μmol/L (UK units). Review your GP annually. If taking diuretics for blood pressure, ask whether alternative antihypertensives (such as losartan, which lowers uric acid) are appropriate for you.",
      },
    ],
    relatedLinks: [
      { slug: "best-diet-for-joint-pain-uk", anchorText: "anti-inflammatory diet and foods to avoid with arthritis" },
      { slug: "arthritis-medication-uk", anchorText: "NSAIDs and corticosteroids for gout attacks on the NHS" },
      { slug: "osteoarthritis-symptoms-uk", anchorText: "difference between gout and osteoarthritis" },
    ],
  },
  {
    slug: "hip-pain-arthritis-uk",
    title: "Hip Arthritis UK: Symptoms, NHS Treatments, and Self-Management Tips",
    description:
      "A practical UK guide to hip osteoarthritis — covering symptoms, physiotherapy exercises, NHS care pathway, and when hip replacement surgery might be right for you.",
    category: "Conditions",
    readTime: "6 min read",
    publishedAt: "2026-02-15",
    author: "Living With Arthritis",
    keywords: [
      "hip arthritis UK",
      "hip osteoarthritis UK",
      "hip replacement NHS UK",
      "hip pain exercises",
      "arthritis hip pain relief UK",
    ],
    content: "",
    sections: [
      {
        heading: "Hip Osteoarthritis in the UK",
        body: "Hip osteoarthritis affects around 1 in 9 people in the UK over the age of 45. It is characterised by gradual breakdown of the cartilage lining the hip joint, leading to bone-on-bone friction. Around 100,000 hip replacement operations are performed on the NHS every year, making it one of the most common elective surgical procedures in Britain.",
      },
      {
        heading: "Symptoms of Hip Arthritis",
        body: "Hip OA pain is typically felt in the groin, thigh, or buttock. It is worse after activity and in the morning. A reduced range of motion (difficulty putting on socks or shoes, getting in and out of a car) is characteristic. Unlike knee OA, hip OA pain can radiate to the knee, sometimes confusing diagnosis.",
      },
      {
        heading: "Best Exercises for Hip Arthritis",
        body: "Hip circles, side-lying hip abduction (clam shells), and bridges strengthen the hip stabilising muscles. Swimming (particularly front crawl) and stationary cycling (with correct saddle height) are ideal aerobic options. Avoid deep squatting and high-impact activities. A physiotherapist can tailor a programme specific to your hip and fitness level.",
      },
      {
        heading: "NHS Treatment Pathway for Hip OA",
        body: "Management begins with physiotherapy, weight management support (via GP referral to weight loss services), and analgesics. Steroid injections can provide short-term relief and help with diagnosis. NICE guidance (NG226) updated in 2022 emphasises exercise and weight loss as first-line treatments before considering surgery.",
      },
      {
        heading: "Hip Replacement Surgery on the NHS",
        body: "Total hip replacement (THR) is highly effective, with most patients reporting dramatic pain relief and improved function. The NHS performs around 100,000 THRs annually with excellent outcomes — implant survivorship exceeds 95% at 10 years. Post-pandemic waiting lists are lengthy in most NHS trusts. Your GP can refer you; private surgery typically avoids waiting with costs starting around £10,000–£14,000.",
      },
      {
        heading: "Day-to-Day Hip Protection",
        body: "Use a raised toilet seat to reduce hip flexion stress. Choose a higher seat height at work and home. When sleeping, place a pillow between your knees to maintain hip alignment. Invest in a walking stick (used in the opposite hand to the affected hip) to redistribute load. Avoid sitting cross-legged or rotating your hip inward aggressively.",
      },
    ],
    relatedLinks: [
      { slug: "best-exercises-for-arthritis-uk", anchorText: "best exercises for hip arthritis UK" },
      { slug: "virtual-physiotherapy-arthritis-uk", anchorText: "virtual physiotherapy for hip osteoarthritis" },
      { slug: "arthritis-medication-uk", anchorText: "pain relief and steroid injections for hip OA" },
    ],
  },
  {
    slug: "arthritis-medication-uk",
    title: "Arthritis Medication in the UK: A Patient's Guide to NHS Treatments",
    description:
      "An overview of arthritis medications available on the NHS — from paracetamol and NSAIDs to biologics. Understand your treatment options and discuss them confidently with your GP.",
    category: "Treatment",
    readTime: "8 min read",
    publishedAt: "2026-02-15",
    author: "Living With Arthritis",
    keywords: [
      "arthritis medication UK",
      "NSAIDs arthritis UK",
      "biologic drugs arthritis UK",
      "NHS arthritis treatment",
      "paracetamol arthritis",
    ],
    content: "",
    sections: [
      {
        heading: "Understanding the Medication Ladder",
        body: "UK arthritis treatment follows a stepped approach guided by NICE. Clinicians start with the safest, simplest treatments and step up based on response. Lifestyle measures (exercise, weight loss) are always first; medications are added on top. For osteoarthritis, the sequence is: paracetamol → topical NSAIDs → oral NSAIDs → opioids (with caution) → intra-articular injections → surgical referral.",
      },
      {
        heading: "Paracetamol",
        body: "Despite recent NICE guidance questioning its long-term efficacy for OA, paracetamol remains widely used for mild arthritis pain. It is safe for most people when taken at the recommended dose (1g, up to 4 times daily). It does not reduce inflammation but can take the edge off background pain. Always check it is not already included in other medicines you take.",
      },
      {
        heading: "Topical NSAIDs",
        body: "Diclofenac gel (available OTC as Voltarol) applied directly to the affected joint is recommended by NICE as first-line for knee OA. Topical NSAIDs have similar efficacy to oral NSAIDs for joint pain but with fewer systemic side effects — making them safer for older patients and those with stomach, heart, or kidney concerns.",
      },
      {
        heading: "Oral NSAIDs and COX-2 Inhibitors",
        body: "Ibuprofen, naproxen, and diclofenac tablets reduce both pain and inflammation and are particularly useful for flare-ups. They should be taken at the lowest effective dose for the shortest time. Celecoxib (a COX-2 inhibitor) has a better gastrointestinal safety profile. All oral NSAIDs require gastroprotection (usually omeprazole) in patients over 45 or with GI risk factors.",
      },
      {
        heading: "Disease-Modifying Drugs (DMARDs) for RA",
        body: "For rheumatoid arthritis, DMARDs are the cornerstone of treatment. Methotrexate is typically first-line and significantly slows joint damage. If inadequate response to two conventional DMARDs, biological DMARDs (adalimumab, etanercept, rituximab) or JAK inhibitors (baricitinib, tofacitinib) are considered — all subject to NICE approval and managed by rheumatologists.",
      },
      {
        heading: "Steroid Injections",
        body: "Corticosteroid injections directly into an affected joint can provide rapid, potent anti-inflammatory relief lasting weeks to months. They are available via your GP for accessible joints (knee, shoulder) and from rheumatologists or musculoskeletal radiologists (guided injection) for deeper joints like the hip. NICE recommends limiting to 3 injections per year per joint.",
      },
      {
        heading: "Discussing Medications with Your GP",
        body: "Always tell your GP about all medications, supplements, and herbal remedies you take — many interact with arthritis drugs. Ask specifically about your risk of gastrointestinal, cardiovascular, and renal side effects. Request regular medication reviews (at least annually). You have the right to ask for referral to a rheumatologist if you feel your arthritis is not well controlled.",
      },
    ],
    relatedLinks: [
      { slug: "rheumatoid-arthritis-uk-guide", anchorText: "DMARDs and biologic treatment for rheumatoid arthritis" },
      { slug: "arthritis-supplements-uk", anchorText: "supplements to take alongside arthritis medication" },
      { slug: "osteoarthritis-symptoms-uk", anchorText: "when to see your GP for osteoarthritis" },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const categoryColors: Record<string, string> = {
  Exercise: "bg-secondary/10 text-secondary",
  Nutrition: "bg-amber-100 text-amber-700",
  Conditions: "bg-primary/10 text-primary",
  Physiotherapy: "bg-blue-100 text-blue-700",
  Treatment: "bg-purple-100 text-purple-700",
};
