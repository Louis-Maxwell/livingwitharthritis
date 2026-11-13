/**
 * AEO/GEO page data — answer-first summaries, FAQs, review metadata for
 * top condition + guide + hub pages. Consumed by <AeoEnhancement /> and
 * injected as FAQPage JSON-LD at runtime.
 *
 * Keep answers concise (40-80 words), UK English, plain-language.
 * Sources: NICE clinical guidelines clinical topics, project medical reviewer.
 */

export interface AeoPage {
  question: string;
  answer: string;
  faqs?: { q: string; a: string }[];
  /** Optional 3-4 "Key clinical takeaways" shown under the answer. */
  takeaways?: string[];
  reviewer?: string;
  updatedAt?: string; // ISO YYYY-MM-DD
}

const REVIEWER = "Louis Maxwell, HCPC PH128483";
const UPDATED = "2026-09-11";

const withDefaults = (p: Omit<AeoPage, "reviewer" | "updatedAt"> & Partial<Pick<AeoPage, "reviewer" | "updatedAt">>): AeoPage => ({
  reviewer: REVIEWER,
  updatedAt: UPDATED,
  ...p,
});

export const PAGE_AEO: Record<string, AeoPage> = {
  // â”€â”€ Conditions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  "/conditions/osteoarthritis": withDefaults({
    question: "What is osteoarthritis?",
    answer:
      "Osteoarthritis (OA) is the most common arthritis in the UK. It involves changes in the cartilage that cushions bone ends and in other joint tissues, most often in knees, hips, hands and spine. Pain is usually worse with use, morning stiffness is typically under 30 minutes, and NICE NG226 recommends therapeutic exercise, weight management where relevant, and information and support as core care.",
    updatedAt: "2026-11-11",
    takeaways: [
      "There is no cure that reverses osteoarthritis, but exercise, pacing, weight advice where relevant and the right pain relief help many people.",
      "NICE recommends therapeutic exercise, including muscle strengthening and general fitness, as core care.",
      "Osteoarthritis can usually be diagnosed without an X-ray if you are 45 or over, have activity-related joint pain and morning stiffness of 30 minutes or less (NICE NG226).",
      "A suddenly hot, red, swollen joint with fever needs same-day help from NHS 111 or your GP."
    ],
    faqs: [
      { q: "Can osteoarthritis be cured?", a: "There is no cure that reverses osteoarthritis, but many people manage symptoms with exercise, pacing, weight advice where relevant and the right pain relief. Severe symptoms may lead to a discussion about joint surgery." },
      { q: "What's the best exercise for osteoarthritis?", a: "NICE recommends therapeutic exercise including muscle strengthening and general fitness. Walking, swimming, cycling, seated strength and tai chi are common starting points — start small and build up." },
      { q: "Do I need an X-ray for osteoarthritis?", a: "Often no. NICE says osteoarthritis can usually be diagnosed clinically; imaging is used when the diagnosis is unclear, red flags are present, or surgery is being planned." },
      { q: "What pain relief does NICE recommend for osteoarthritis?", a: "NICE says medicines should be used alongside exercise, at the lowest effective dose for the shortest time. A topical NSAID is offered first for knee osteoarthritis and can be considered for other joints. Paracetamol and weak opioids are not routinely recommended, as there is no strong evidence that paracetamol helps. Ask a pharmacist or GP before starting any medicine." },
      { q: "When should I see a GP?", a: "If joint pain is not improving after a few weeks, wakes you most nights, comes with swelling or morning stiffness over 30 minutes, or limits daily life. A suddenly hot, red, swollen joint with fever needs same-day help from NHS 111 or your GP." },
    ],
  }),
  "/conditions/rheumatoid-arthritis": withDefaults({
    question: "What is rheumatoid arthritis?",
    answer:
      "Rheumatoid arthritis (RA) is an autoimmune condition where the immune system attacks the joint lining, causing pain, swelling and stiffness, usually first in the small joints of the hands and feet (NHS). If you are newly diagnosed, NICE NG100 says you should be offered a DMARD such as methotrexate as soon as possible, ideally within 3 months of persistent symptoms.",
    takeaways: [
      "Rheumatoid arthritis is an autoimmune condition: the immune system attacks the joint lining, causing pain, swelling and stiffness.",
      "NICE NG100 recommends starting a DMARD such as methotrexate as soon as possible, ideally within 3 months of persistent symptoms.",
      "Treatment aims for remission or low disease activity, checked with regular blood tests and disease activity scores.",
      "Ask for your rheumatology advice line number so you can get rapid help with flares."
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
  
    faqs: [
      { q: "What is the difference between ankylosing spondylitis and axial spondyloarthritis?", a: "Axial spondyloarthritis (axSpA) is the umbrella term. Ankylosing spondylitis (AS) is the form of axSpA where damage to the sacroiliac joints is visible on an X-ray. Non-radiographic axSpA (nr-axSpA) is the same condition earlier in its course — visible only on MRI. Treatment is the same for both." },
      { q: "What is the first sign of ankylosing spondylitis?", a: "The earliest sign is usually persistent lower back or buttock pain that comes on slowly before age 45, is worse in the morning, lasts over 30 minutes and improves with movement." },
      { q: "Is ankylosing spondylitis a disability?", a: "AS is recognised under the UK Equality Act 2010 as it can have a long-term substantial effect on daily activities. Many people qualify for reasonable adjustments at work and may be eligible for PIP." },
      { q: "Can ankylosing spondylitis be cured?", a: "There is no cure, but biologics, NSAIDs and daily exercise can keep inflammation under control and prevent spinal damage for most people." },
      { q: "What is the HLA-B27 test?", a: "A blood test that checks for the HLA-B27 gene, found in around 90% of UK people with AS. A positive test alone doesn't diagnose AS — it's used alongside symptoms and MRI scans." },
      { q: "Should I exercise if my back hurts?", a: "Yes — gentle, regular movement is the single most important treatment for AS. Pain that eases with activity is typical. A physiotherapist can build a safe, progressive programme." },
    ],
  }),
  "/conditions/gout": withDefaults({
    question: "What is gout?",
    answer:
      "Gout is a type of inflammatory arthritis caused by high uric acid crystallising inside joints — usually the big toe — triggering sudden severe pain, redness and swelling. UK guidelines recommend urate-lowering therapy (allopurinol) after a second attack to prevent joint damage. Diet and alcohol adjustments help.",
  
    faqs: [
      { q: "What are the first signs of gout?", a: "The first sign is usually a sudden, severe attack of pain in a single joint — most often the big toe — that wakes you up at night. The joint becomes red, hot, swollen and so tender that even the weight of a bedsheet feels unbearable. Attacks typically peak within 24 hours." },
      { q: "How do I know if my toe pain is gout?", a: "Gout in the big toe (called podagra) comes on suddenly, usually overnight, with intense burning pain, redness, heat and swelling at the base of the toe. If you can't bear weight on it or even touch it, and the attack settles over 3–10 days, gout is the most likely cause. A blood test for uric acid and joint fluid analysis can confirm it." },
      { q: "What does a gout attack feel like?", a: "Most people describe a sudden, intense burning or throbbing pain in one joint — often the big toe — that starts overnight. The joint becomes red, hot, swollen and so tender that even a bedsheet can be unbearable." },
      { q: "Is gout curable?", a: "Gout itself is a long-term condition, but with allopurinol or febuxostat plus diet and lifestyle changes, most people stop having attacks completely." },
      { q: "What foods should I avoid with gout?", a: "Limit red meat, organ meats, shellfish, oily fish (anchovies, sardines), beer, spirits and sugary drinks. Cherries, water and low-fat dairy can help reduce attacks." },
      { q: "How long does a gout attack last?", a: "An untreated attack peaks at 24 hours and usually settles within 3 to 10 days. NSAIDs or colchicine started early can shorten and ease attacks." },
      { q: "Is gout the same as arthritis?", a: "Gout is a type of inflammatory arthritis caused by uric-acid crystals, distinct from osteoarthritis (wear and tear) or rheumatoid arthritis (autoimmune)." },
    ],
  }),
  "/conditions/fibromyalgia": withDefaults({
    question: "What is fibromyalgia?",
    answer:
      "Fibromyalgia is a long-term condition causing widespread pain, fatigue, sleep problems and 'fibro fog'. It's a disorder of pain processing rather than joint damage. NICE recommends graded exercise, CBT and paced activity as first-line management.",
  
    faqs: [
      { q: "Is fibromyalgia a form of arthritis?", a: "No. Fibromyalgia doesn't damage joints or cause inflammation. However, it commonly occurs alongside arthritis and is treated by similar rheumatology teams." },
      { q: "How is fibromyalgia diagnosed in the UK?", a: "Diagnosis is clinical — based on widespread pain lasting over 3 months, plus fatigue, sleep and cognitive symptoms. Blood tests are used to rule out other conditions." },
      { q: "What is fibro fog?", a: "Fibro fog is the cognitive symptom of fibromyalgia — short-term memory lapses, word-finding difficulties and trouble concentrating. It improves with better sleep, pacing and exercise." },
      { q: "Can fibromyalgia be cured?", a: "There is no cure, but with self-management, exercise, medication and CBT, many people significantly reduce symptoms and stay in work and family life." },
      { q: "Does fibromyalgia get worse over time?", a: "Fibromyalgia is not progressive — it doesn't damage tissue. Symptoms fluctuate, often worsening with stress, poor sleep or overdoing activity, and easing with steady self-management." },
    ],
  }),
  "/conditions/lupus": withDefaults({
    question: "What is lupus?",
    answer:
      "Lupus (systemic lupus erythematosus, SLE) is an autoimmune disease that can affect skin, joints, kidneys, heart and lungs. Common symptoms include joint pain, a butterfly rash, fatigue and sun sensitivity. Hydroxychloroquine is the mainstay of treatment.",
  
    faqs: [
      { q: "Is lupus a form of arthritis?", a: "Lupus isn't classed as arthritis but it commonly causes joint pain and stiffness. Many people are managed by the same rheumatology teams that treat rheumatoid arthritis." },
      { q: "Can lupus be cured?", a: "There is no cure, but modern treatments — particularly hydroxychloroquine — control symptoms and reduce flares for most people. Many achieve long periods of remission." },
      { q: "What is the butterfly rash?", a: "A flat or slightly raised red rash across the cheeks and bridge of the nose, in the shape of a butterfly. It is one of the most recognisable signs of lupus, though not everyone develops it." },
      { q: "Why is sun protection so important with lupus?", a: "UV light can trigger lupus flares — both skin rashes and internal symptoms. Daily SPF 50, UV-protective clothing and hats are essential, even on cloudy UK days." },
      { q: "Can people with lupus have children?", a: "Yes. Pregnancy in lupus needs to be planned with your rheumatology and obstetric team, ideally during a period of stable disease, with medications reviewed in advance." },
    ],
  }),
  "/conditions/knee-arthritis": withDefaults({
    question: "What is knee arthritis?",
    answer:
      "Knee arthritis is most often osteoarthritis. It typically causes knee pain with activity such as walking or stairs, stiffness after rest and sometimes swelling. NICE guideline NG226 recommends therapeutic exercise and, if you are living with overweight, weight loss as core treatment, with a topical NSAID as the first medicine to offer for knee osteoarthritis.",
    updatedAt: "2026-11-11",
    takeaways: [
      "Osteoarthritis can usually be diagnosed without an X-ray if you are 45 or over, have activity-related joint pain and have no morning stiffness or stiffness lasting 30 minutes or less (NICE NG226).",
      "If you are living with overweight, any weight loss is likely to help; NICE says losing 10% of body weight is likely to be better than 5%.",
      "NICE recommends offering a topical NSAID for knee osteoarthritis and does not routinely recommend paracetamol or weak opioids.",
      "Joint replacement may be considered when symptoms substantially affect your quality of life and non-surgical treatment has not worked or is unsuitable.",
    ],
    faqs: [
      { q: "What's the best exercise for knee arthritis?", a: "Exercise that strengthens the muscles around the knee, such as straight-leg raises, sit-to-stands and mini squats, plus general fitness such as walking, cycling or swimming. NICE recommends therapeutic exercise tailored to your needs for everyone with osteoarthritis. Start gently and build up gradually." },
      { q: "Should I use a walking stick?", a: "A stick can help some people walk more comfortably and steadily. NICE suggests considering walking aids, such as walking sticks, for knee or hip osteoarthritis. A physiotherapist can check the height and show you which hand to hold it in." },
    ],
  }),
  "/conditions/hip-arthritis": withDefaults({
    question: "What is hip arthritis?",
    answer:
      "Hip arthritis is joint damage — usually osteoarthritis — of the hip, causing groin or buttock pain, stiffness and difficulty putting on socks or shoes. Physio-led strengthening, weight management and, when severe, hip replacement (over 100,000 done in the UK each year) provide long-term relief.",
  
    faqs: [
      { q: "What does hip arthritis feel like?", a: "Most people feel a deep ache in the groin or front of the hip that worsens with walking, standing up from a chair, or putting on socks. Stiffness is common after sitting and first thing in the morning, usually easing within 30 minutes of moving." },
      { q: "How do I relieve hip pain while sleeping?", a: "Sleep on your back or on the unaffected side with a firm pillow between your knees to keep the hips aligned. A medium-firm mattress, a warm bath before bed, and a topical NSAID gel applied to the hip help reduce night pain. Avoid sleeping on the painful side and don't tuck your top knee in front of the bottom one — it twists the joint." },
      { q: "What is the best exercise for hip arthritis?", a: "Glute and hip-abductor strengthening (bridges, clams, side-lying leg raises) combined with low-impact cardio such as cycling, swimming or pool walking is the most evidence-based approach. NICE recommends exercise as a core treatment for everyone with hip OA." },
      { q: "Should I keep walking with hip arthritis?", a: "Yes. Regular walking strengthens the muscles that support the hip and reduces pain over time. Build up gradually, wear cushioned shoes, and use a walking pole in the hand opposite to the painful hip to offload the joint by up to 25%." },
      { q: "When is a hip replacement needed?", a: "Hip replacement is usually considered when pain disturbs sleep, severely limits walking or daily activity, and conservative measures (exercise, weight management, painkillers, injections) have not worked over several months. UK outcomes are excellent — over 95% of hip replacements still function well at 10 years." },
      { q: "Does losing weight help hip arthritis?", a: "Yes. The hip carries roughly three times body weight when walking and up to five times when climbing stairs, so even small weight loss meaningfully reduces joint load and pain." },
    ],
  }),
  "/conditions/hand-arthritis": withDefaults({
    question: "What is hand arthritis?",
    answer:
      "Hand arthritis affects the small joints of the fingers, thumbs and wrists. Osteoarthritis typically causes bony bumps and thumb-base pain; rheumatoid usually causes symmetrical knuckle swelling. Splints, hand exercises and topical NSAID gels help most people.",
  
    faqs: [
      { q: "What are the first signs of hand arthritis?", a: "Early signs include stiffness in the fingers in the morning, a dull ache at the base of the thumb when opening jars or turning keys, and small bony lumps on the end finger joints (Heberden's nodes)." },
      { q: "What is the best exercise for arthritic hands?", a: "A daily 5-minute routine of fist-to-fan, finger-to-thumb touches, and gentle putty squeezes maintains range of motion and grip strength without overloading inflamed joints." },
      { q: "Do hand splints actually help?", a: "Yes — for thumb base (CMC) arthritis, a custom or off-the-shelf neoprene splint reduces pain during pinching tasks and is recommended by NICE as part of first-line care." },
      { q: "Are the bony lumps on my fingers permanent?", a: "Heberden's and Bouchard's nodes are bone changes and don't shrink, but the pain associated with their formation usually settles within 1–2 years. The remaining stiffness can be managed with exercise." },
      { q: "When is hand surgery needed?", a: "Surgery (most commonly trapeziectomy for thumb base arthritis or joint fusion for severe finger OA) is reserved for persistent pain that hasn't responded to splinting, exercise, injections and topical NSAIDs over 6+ months." },
    ],
  }),
  "/conditions/shoulder-arthritis": withDefaults({
    question: "What is shoulder arthritis?",
    answer:
      "Shoulder arthritis is cartilage loss in the glenohumeral or acromioclavicular joints, causing deep aching pain, reduced reach and night pain when lying on the affected side. Physio, corticosteroid injections and, if severe, shoulder replacement are options.",
  
    faqs: [
      { q: "What does shoulder arthritis feel like?", a: "Most people describe a deep ache at the back of the shoulder that worsens when reaching overhead, behind the back, or lying on that side at night. Stiffness limits putting on coats and reaching seatbelts." },
      { q: "Is shoulder arthritis the same as a frozen shoulder?", a: "No. Frozen shoulder (adhesive capsulitis) is inflammation of the joint capsule and usually resolves within 1–3 years. Shoulder arthritis is cartilage wear and is progressive — but both can cause similar early symptoms, so accurate diagnosis matters." },
      { q: "What is the best exercise for shoulder arthritis?", a: "Pendulum swings, doorway stretches and gentle external rotation with a resistance band are the most evidence-supported exercises. They protect range of motion and rotator cuff strength without overloading the joint." },
      { q: "Should I get an injection in my shoulder?", a: "Corticosteroid injections can give 6–12 weeks of meaningful pain relief and are useful to bridge a flare or to allow physiotherapy to progress. Most clinicians limit injections to 2–3 per year." },
      { q: "When is shoulder replacement needed?", a: "Shoulder replacement is considered when night pain is severe, function is limited despite physiotherapy and injections, and X-rays confirm advanced joint changes. The reverse total shoulder replacement is the most common option in the UK." },
    ],
  }),
  "/conditions/elbow-arthritis": withDefaults({
    question: "What is elbow arthritis?",
    answer:
      "Elbow arthritis is joint damage in the elbow causing pain, stiffness, locking or grating during movement. Osteoarthritis and rheumatoid arthritis are the main causes. Treatment ranges from activity modification and NSAIDs to arthroscopy or elbow replacement.",
  
    faqs: [
      { q: "What does elbow arthritis feel like?", a: "Most people describe a deep ache on the outside or back of the elbow that worsens when straightening the arm fully or carrying a heavy bag. Many lose the last few degrees of extension, so the arm no longer goes completely straight." },
      { q: "Is elbow pain always arthritis?", a: "No. The most common causes of elbow pain in UK adults are tennis elbow (lateral epicondylitis) and golfer's elbow (medial epicondylitis) — tendon overload conditions rather than joint arthritis. True elbow arthritis is less common and usually follows an old fracture or develops in people with rheumatoid arthritis." },
      { q: "What is the best exercise for elbow arthritis?", a: "Gentle range-of-motion work — bending and straightening the elbow within a pain-free range, plus forearm rotations (palm up, palm down) — is the most evidence-supported routine. Light isometric grip work protects forearm strength without loading the joint." },
      { q: "Should I see a GP about elbow pain?", a: "See your GP if elbow pain lasts more than six weeks, wakes you at night, locks or catches, or is accompanied by tingling into the ring and little fingers — that pattern can indicate ulnar nerve irritation that benefits from early treatment." },
      { q: "Can elbow arthritis be cured?", a: "Arthritis itself isn't cured, but most people manage symptoms well with exercise, activity modification, topical NSAIDs and occasional corticosteroid injections. Elbow replacement is reserved for severe pain or loss of function and gives good relief in around 85% of cases." },
    ],
  }),
  "/conditions/foot-and-ankle-arthritis": withDefaults({
    question: "What is foot and ankle arthritis?",
    answer:
      "Foot and ankle arthritis is joint damage in the ankle, midfoot or big toe that causes pain with walking, morning stiffness and difficulty finding comfortable shoes. Hallux rigidus, post-traumatic ankle OA and rheumatoid foot involvement are common UK patterns. Supportive footwear, orthotics, gentle exercises and podiatry help most people.",
  
    faqs: [
      { q: "What are the first signs of foot or ankle arthritis?", a: "Morning stiffness in the ankle or big toe, a deep ache with the first steps of the day, swelling after walking, and shoes that feel tight over a bony bump on the big toe joint." },
      { q: "What is the best footwear for foot arthritis?", a: "Choose a wide, deep toe box, firm heel counter, cushioned or rocker sole, low heel and adjustable fastenings. Removable insoles leave room for orthotics." },
      { q: "What exercises help ankle arthritis?", a: "Daily ankle circles, alphabet tracing, towel scrunches, gentle calf raises and single-leg balance near a counter. Warm the foot first and stop short of sharp pain." },
      { q: "Can NHS podiatry help?", a: "Yes. Ask your GP for a podiatry referral, or self-refer where available. Podiatrists assess biomechanics and can prescribe custom orthotics." },
      { q: "When should I see a GP about foot or ankle pain?", a: "If pain lasts more than a few weeks, limits walking, comes with warm swelling or deformity, or follows an old fracture. Seek urgent care for a hot, red joint with fever." },
    ],
  }),
  "/conditions/juvenile-arthritis": withDefaults({
    question: "What is juvenile arthritis?",
    answer:
      "Juvenile idiopathic arthritis (JIA) is arthritis starting before age 16, lasting more than 6 weeks. It affects around 1 in 1,000 UK children. Early paediatric rheumatology care and DMARDs help most children live active lives.",
  
    faqs: [
      { q: "What are the first signs of arthritis in a child?", a: "Look out for limping (worse in the morning), a swollen joint, a child avoiding a normally favourite activity, or unexplained fevers and rashes. Always see your GP if joint symptoms last more than two weeks." },
      { q: "Is juvenile arthritis the same as rheumatoid arthritis?", a: "No. JIA is its own group of conditions. Some forms behave similarly to rheumatoid arthritis, but JIA also includes types not seen in adults, such as systemic JIA (Still's disease)." },
      { q: "Will my child grow out of JIA?", a: "Some children — particularly those with oligoarticular JIA — do go into long-term remission. Others have ongoing disease into adulthood. Modern treatments have transformed the outlook for most." },
      { q: "Why does my child need eye checks?", a: "JIA can cause silent eye inflammation (uveitis) that, if missed, can damage sight. Regular slit-lamp checks by an ophthalmologist are essential." },
      { q: "Can my child still play sport?", a: "Yes — sport is encouraged. Swimming and cycling are particularly good. Adapt during flares and work with the rheumatology team and PE staff." },
    ],
  }),
  "/conditions/reactive-arthritis": withDefaults({
    question: "What is reactive arthritis?",
    answer:
      "Reactive arthritis is joint inflammation that develops after an infection elsewhere in the body — usually gut or urinary. Symptoms include joint pain, eye inflammation and urinary symptoms. Most cases resolve within 3-12 months.",
  
    faqs: [
      { q: "How long does reactive arthritis last?", a: "Most people recover fully within 3 to 6 months. Around 1 in 5 develop longer-lasting joint problems, and a smaller number go on to develop a chronic inflammatory arthritis, which is why early specialist input matters." },
      { q: "Is reactive arthritis curable?", a: "Yes — for most people reactive arthritis settles completely once the triggering infection clears and inflammation is treated. NSAIDs, joint injections and physiotherapy speed recovery." },
      { q: "Can reactive arthritis come back?", a: "It can. People with the HLA-B27 gene are more likely to have repeat episodes, often triggered by a new gut or urinary infection. Practising food hygiene and safer sex reduces the risk." },
      { q: "How is reactive arthritis diagnosed in the UK?", a: "Your GP will ask about recent gut, urinary or chest infections and examine your joints, eyes and skin. Blood tests (CRP, ESR, HLA-B27), urine tests and sometimes joint fluid analysis or imaging are used to confirm the diagnosis and rule out other arthritis." },
      { q: "Is reactive arthritis contagious?", a: "No. Reactive arthritis itself cannot be passed from person to person. However, the infections that trigger it (such as chlamydia or salmonella) can be — so treating partners and practising good food hygiene matters." },
      { q: "What is the difference between reactive arthritis and rheumatoid arthritis?", a: "Reactive arthritis is triggered by a recent infection, usually affects one or a few large joints, and most people recover within months. Rheumatoid arthritis is a lifelong autoimmune disease that typically affects small joints on both sides of the body and needs long-term medication." },
    ],
  }),
  "/conditions/polymyalgia-rheumatica": withDefaults({
    question: "What is polymyalgia rheumatica?",
    answer:
      "Polymyalgia rheumatica (PMR) causes sudden shoulder and hip stiffness and pain, mainly in adults over 50. Low-dose steroids (prednisolone 15 mg) usually give dramatic relief within days. Treatment typically continues for 1-2 years.",
  
    faqs: [
      { q: "How is polymyalgia rheumatica diagnosed in the UK?", a: "Your GP will check your symptoms, examine your shoulders and hips, and arrange blood tests (CRP and ESR) to look for inflammation. A dramatic improvement within a few days of starting prednisolone helps confirm the diagnosis." },
      { q: "How long does polymyalgia rheumatica last?", a: "Most people need steroid treatment for 1 to 3 years. Around half of those affected have one or more flares during the taper, but the condition usually goes into long-term remission." },
      { q: "Is polymyalgia rheumatica an autoimmune disease?", a: "Yes — PMR is driven by an overactive immune response that inflames the lining of joints and bursae, particularly in the shoulders and hips. It is not contagious and is not caused by anything you have done." },
      { q: "What is the link with giant cell arteritis?", a: "Around 1 in 5 people with PMR also develop giant cell arteritis (GCA), which inflames blood vessels in the head. New headaches, scalp tenderness, jaw pain when chewing, or any change in vision need urgent medical attention." },
      { q: "Can I exercise with polymyalgia rheumatica?", a: "Yes, and you should. Gentle walking, shoulder and hip mobility work, and light resistance training protect muscle and bone during long-term steroid use. Start slowly and build up." },
      { q: "Are there natural alternatives to steroids for PMR?", a: "There is no proven natural alternative to steroids for PMR — untreated inflammation can damage tissue and increase the risk of GCA. A Mediterranean diet, exercise and bone-protection medicines support steroid treatment rather than replace it." },
    ],
  }),

  // â”€â”€ Guides â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  "/guides/newly-diagnosed": withDefaults({
    question: "I've just been diagnosed with arthritis — what should I do?",
    answer:
      "Book a rheumatology follow-up if not already arranged, start gentle daily movement, and read up on your specific type. NICE recommends beginning exercise and joint protection within weeks of diagnosis for best long-term outcomes. Track symptoms, ask your GP about pain relief options, and use our free written guides or weekday phone line.",
    faqs: [
      { q: "What should I ask at my first rheumatology appointment?", a: "Ask about your arthritis type, medicines, flare plan, work adjustments, and when to seek urgent help. Bring a written symptom diary and medication list." },
      { q: "Should I rest completely after diagnosis?", a: "No — short rests during flares help, but daily gentle movement usually protects joints better than bed rest. Check specific advice with your clinical team." },
      { q: "Where can I get PIP information?", a: "Start with our Benefits & PIP guide and evidence diary, then speak to Citizens Advice or a welfare-rights adviser. We provide education, not legal representation." },
    ],
  }),
  "/guides/understanding-pain": withDefaults({
    question: "What are the main types of pain?",
    answer:
      "Pain can be inflammatory or mechanical, focal or systemic, bilateral, fibromyalgia-type, acute or chronic, or neuropathic. Matching the pattern helps your GP choose the right next steps. Describe location, timing, morning stiffness and nerve-like burning or tingling clearly.",
    faqs: [
      { q: "Is inflammatory pain the same as arthritis?", a: "Not always — inflammatory pain can come from autoimmune arthritis and other causes. Mechanical pain is more linked to load, injury or wear. A clinical assessment sorts them out." },
      { q: "When is pain chronic?", a: "Pain lasting longer than about three months is usually called chronic. See your GP if pain persists, wakes you at night, or comes with hot swollen joints." },
      { q: "What is neuropathic pain?", a: "Nerve-related pain often burns, tingles or feels electric. Diabetes and some treatments can cause it. Ask your clinician about cause-specific options." },
    ],
  }),
  "/guides/arthritis-pain-relief": withDefaults({
    question: "How do I relieve arthritis pain?",
    answer:
      "Use heat for stiff joints or a wrapped cold pack for hot, swollen ones, keep moving gently and build up exercise, which NICE recommends as a core treatment for osteoarthritis. For knee osteoarthritis NICE advises trying an NSAID gel first; NSAID tablets may be added at the lowest dose for the shortest time. NICE says paracetamol and weak opioids should not be offered routinely for osteoarthritis. Inflammatory arthritis needs specialist treatment. Check with a pharmacist or GP what is safe for you.",
    faqs: [
      { q: "What is the fastest way to ease an arthritis flare?", a: "Use heat for stiffness or a cold pack wrapped in a cloth for a hot swollen joint, reduce rather than stop activity, and use only medicines your GP or pharmacist has advised. Full rest often increases stiffness." },
      { q: "Does exercise help arthritis pain?", a: "Yes. NICE recommends therapeutic exercise, including strengthening and general fitness, as a core treatment for osteoarthritis. Start small and build up gradually." },
      { q: "When should I see a GP about joint pain?", a: "If pain is not improving after a few weeks, wakes you most nights, comes with swollen or warm joints or morning stiffness over 30 minutes, or limits daily life. A suddenly hot, red, swollen joint with fever needs same-day help from NHS 111 or your GP." },
    ],
  }),
  "/guides/hip-exercises-for-osteoarthritis": withDefaults({
    question: "What are the best hip exercises for osteoarthritis?",
    answer:
      "NICE guideline NG226 recommends therapeutic exercise tailored to you, such as local muscle strengthening and general aerobic fitness, as a core treatment for hip osteoarthritis. Useful home moves include glute bridges, clamshells, side-lying leg lifts, sit-to-stands and mini squats, alongside walking, cycling or swimming. NICE also suggests considering supervised exercise sessions.",
    takeaways: [
      "NICE NG226 lists therapeutic exercise, and weight management if appropriate, as core treatments for osteoarthritis.",
      "Joint pain may increase when you first start; NICE says regular, consistent exercise is still beneficial for your joints.",
      "NICE suggests considering walking aids, such as a walking stick, for hip or knee osteoarthritis.",
      "Get urgent help for a hot, red, swollen joint with fever, or if you cannot put weight on the leg after a fall.",
    ],
    updatedAt: "2026-11-11",
  }),
  "/guides/knee-exercises-for-osteoarthritis": withDefaults({
    question: "What are the best free knee exercises for osteoarthritis in the UK?",
    answer:
      "NICE guideline NG226 recommends therapeutic exercise, including local muscle strengthening and general aerobic fitness, as a core treatment for knee osteoarthritis. This free 8-move home routine strengthens the thigh, hip and calf muscles that support the knee. Pain may increase at first; NICE says regular, consistent exercise is still beneficial, so build up gradually.",
    takeaways: [
      "NICE NG226 lists therapeutic exercise, and weight management if appropriate, as core treatments for osteoarthritis.",
      "Long-term, regular exercise increases the benefits, reducing pain and improving function and quality of life (NICE NG226).",
      "Stop that session if pain is sharp or catching, the knee locks or gives way, or new swelling lasts overnight.",
      "Get urgent help for a hot, red, swollen knee with fever, or a painful, swollen calf.",
    ],
    updatedAt: "2026-11-11",
  }),
  "/guides/free-arthritis-resources-uk": withDefaults({
    question: "What free arthritis resources do UK charities offer?",
    answer:
      "Living With Arthritis (charity 1218461) offers free home exercise routines, diet advice, PIP claim tools and newly diagnosed checklists. Arthritis UK and NRAS also provide free information. Living With Arthritis is independent of Arthritis UK.",
    faqs: [
      { q: "Is Living With Arthritis the same as Arthritis UK?", a: "No — it is an independent UK charity (1218461), not Arthritis UK (formerly Versus Arthritis)." },
      { q: "Are the exercise and PIP tools free?", a: "Yes. Guides, home physio routines, the PIP evidence diary and flare plan are free to use." },
    ],
  }),


  "/guides/can-exercise-make-osteoarthritis-worse": withDefaults({
    question: "Can exercise make osteoarthritis worse?",
    answer:
      "No — done correctly, exercise reduces OA pain and slows progression. Some soreness during and up to 2 hours after exercise is normal. Sharp, sudden or persistent pain lasting more than 24 hours means you've done too much; scale back but don't stop.",
  }),
  "/guides/fall-prevention-older-adults": withDefaults({
    question: "How can older adults prevent falls?",
    answer:
      "Strength and balance training (tai chi, Otago programme) cuts falls by around 30%. Also: home hazard checks, medication review, eye tests every 2 years and vitamin D 10 mcg/day. Contact your GP or UK healthcare falls clinic if you've fallen twice in a year.",
  }),
  "/guides/sarcopenia-muscle-loss": withDefaults({
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
    question: "What are my disability rights in the UK if I have arthritis?",
    answer:
      "Under the Equality Act 2010 (England, Scotland and Wales), arthritis counts as a disability if it has a substantial and long-term negative effect on your normal daily activities. If it does, employers, shops, services, schools, colleges and landlords must not discriminate against you, and many must make reasonable adjustments. Northern Ireland has similar protection under the Disability Discrimination Act 1995.",
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

  // â”€â”€ Hubs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  "/arthritis-flare-ups": withDefaults({
    question: "What should I do during an arthritis flare-up?",
    answer:
      "During a flare, pace activity and keep gently moving within comfort, use heat or cold as appropriate, take only medicines advised by your GP or pharmacist, and note possible triggers. Seek urgent care for a single hot, swollen joint with fever or sudden inability to weight-bear. This is educational guidance, not personal medical advice.",
    takeaways: [
      "Pace activity and avoid boom-and-bust; keep gentle range-of-motion movement unless advised otherwise.",
      "Use heat or cold for comfort and take only medicines your GP or pharmacist has advised.",
      "Many osteoarthritis flares settle over days to a couple of weeks; inflammatory flares vary, so follow your rheumatology care plan.",
      "A single hot, swollen joint with fever, or sudden inability to bear weight, needs urgent care."
    ],
    faqs: [
      { q: "How long do arthritis flares last?", a: "Many OA flares settle over days to a couple of weeks with pacing and usual treatments. Inflammatory disease flares vary — contact your rheumatology team if your care plan says to." },
      { q: "Should I stop all exercise in a flare?", a: "Avoid boom-and-bust. Keep gentle range-of-motion unless advised otherwise; rebuild load gradually as pain settles." },
      { q: "Where is the printable flare plan?", a: "Use our free printable flare action plan under Resources, then read the full flare-ups guide for detail." },
      { q: "When is a flare an emergency?", a: "Seek urgent care for a single hot, swollen joint with fever or a sudden inability to bear weight." },
    ],
  }),
  "/guides/benefits-pip": withDefaults({
    question: "How do I claim PIP for arthritis in the UK?",
    answer:
      "To claim PIP in England or Wales, call the DWP PIP new claims line on 0800 917 2222 (Monday to Friday, 8am to 5pm). DWP sends the PIP2 \"How your disability affects you\" form: return it within 1 month with evidence. You may have an assessment before the decision. If you disagree, ask for mandatory reconsideration within 1 month, then appeal to a tribunal.",
    takeaways: [
      "PIP depends on how arthritis affects daily living and mobility, not on the diagnosis alone.",
      "Daily living and mobility are scored separately: 8 to 11 points gives the standard rate and 12 or more the enhanced rate.",
      "PIP is not means-tested and you can claim while working.",
      "Return the PIP2 form within 1 month; challenge a decision with mandatory reconsideration within 1 month, then a tribunal appeal."
    ],
  }),
  "/diet/mediterranean-diet-for-arthritis": withDefaults({
    question: "Does the Mediterranean diet help arthritis?",
    answer:
      "A Mediterranean-style diet, rich in vegetables, fruit, beans, wholegrains, fish and olive or rapeseed oil, may modestly help some people with arthritis, especially rheumatoid arthritis, and is good for heart health. NICE says there is no strong evidence diet changes benefit RA, but people can be encouraged to follow Mediterranean principles. It is not a cure and does not replace medicines.",
    faqs: [
      { q: "Does the Mediterranean diet help arthritis?", a: "It may help some people, particularly with rheumatoid arthritis, but the evidence is limited. A small 12-week trial found modest improvements in disease activity and physical function, and NICE says adults with RA can be encouraged to follow Mediterranean diet principles, while explaining there is no strong evidence their arthritis will benefit. It is not a cure and does not replace medicines." },
      { q: "Is the Mediterranean diet good for osteoarthritis?", a: "There is only limited research in osteoarthritis. The main dietary step NICE recommends for osteoarthritis is weight management if you are living with overweight or obesity. A Mediterranean-style pattern can be a sustainable way to support weight loss and heart health." },
      { q: "Can I follow it if I am vegetarian or vegan?", a: "Yes. Beans, lentils, chickpeas, tofu, nuts and seeds can replace fish and meat. Vegans need reliable sources of vitamin B12, iodine and calcium. Ask a pharmacist before taking an algae-based omega-3 or other supplement, and see a dietitian if you are unsure your diet is balanced." },
      { q: "Do I need to drink red wine?", a: "No. You do not need to drink alcohol to follow the pattern. If you drink, the UK guideline is no more than 14 units a week spread over 3 or more days. If you take methotrexate, ask your rheumatology team what is safe for you." },
    ],
  }),
  "/blog/knee-arthritis-exercises-uk": withDefaults({
    question: "What are the best knee arthritis exercises in the UK?",
    answer:
      "Quadriceps strengthening, sit-to-stands, straight-leg raises, gentle cycling and walking as tolerated are commonly recommended for knee osteoarthritis. Start low, progress slowly, and stop sharp pain. Educational only — check with a physiotherapist if unsure.",
    faqs: [
      { q: "Should I squat with knee OA?", a: "Shallow sit-to-stands are often fine; deep loaded squats may aggravate some knees. Individual assessment is best." },
      { q: "How many days per week?", a: "Two to three strength sessions plus daily gentle movement suits many people, adjusted for flares." },
      { q: "Where else can I read about knee OA?", a: "See our knee arthritis condition page and the osteoarthritis pillar guide." },
    ],
  }),
  "/diet-hub": withDefaults({
    question: "What's the best diet for arthritis?",
    answer:
      "A Mediterranean diet — oily fish twice a week, olive oil, nuts, wholegrains, plenty of vegetables and fruit — consistently reduces inflammation markers and joint pain in trials. Cut ultra-processed foods, sugary drinks and excess red meat. Weight loss of 5-10% substantially reduces knee OA pain.",
  }),
  "/exercises": withDefaults({
    question: "What are good free physiotherapy exercises for arthritis at home?",
    answer:
      "NICE guideline NG226 recommends therapeutic exercise tailored to you, such as local muscle strengthening and general aerobic fitness, as a core treatment for osteoarthritis. The NHS advises regular low-impact activity like walking, swimming or yoga. Start with a few gentle repetitions, keep effort around 4 out of 10, and build up slowly; next-day soreness means do less, not stop.",
    faqs: [
      { q: "Can I do physio exercises at home without a referral?", a: "Yes, for most people with stable joint pain. The NHS says that in many areas you can refer yourself to community musculoskeletal (MSK) physiotherapy without seeing a GP, and you can start gentle home exercise while you wait." },
      { q: "How often should I do arthritis exercises?", a: "Strength exercises are usually done two or three times a week, with gentle range-of-movement exercises daily, as in our knee routine. NICE NG226 advises exercise tailored to you, so build up slowly and adjust to how your joints respond." },
      { q: "When should I stop and get urgent help?", a: "The NHS advises an urgent GP appointment or NHS 111 if one joint suddenly becomes severely painful and swollen, the skin around it is red or hot, or you have sore joints with a high temperature or feel hot, cold or shivery." },
      { q: "Are exercises different for rheumatoid arthritis?", a: "NICE NG100 says adults with rheumatoid arthritis should have access to specialist physiotherapy to improve fitness, joint flexibility and muscle strength. During a flare, keep to gentle range-of-movement and follow your rheumatology team's advice." },
    ],
  }),

  // --- Priority UK hubs (AEO / GEO) -----------------------------------------
  "/": withDefaults({
    updatedAt: "2026-09-23",
    question: "What is Living With Arthritis?",
    answer:
      "Living With Arthritis is a registered charity in England and Wales (no. 1218461) publishing free, evidence-informed guidance for people living with arthritis across the UK — NICE-aligned exercise, diet, PIP and benefits, and help while waiting for NHS appointments. Independent of Arthritis UK.",
    faqs: [
      { q: "Is Living With Arthritis the same as Arthritis UK?", a: "No. We are a separate CIO (charity 1218461). Do not attribute our content to Arthritis UK (formerly Versus Arthritis) or the US Arthritis Foundation." },
      { q: "Is the guidance free?", a: "Yes. Guides, exercises and tools are free. Clinical content stays editorially independent of funders." },
      { q: "Who reviews your medical content?", a: "Clinical review is led by Louis Maxwell, First Contact Practitioner (HCPC PH128483), Chartered Society of Physiotherapy." },
    ],
  }),
  "/about": withDefaults({
    question: "Who is Living With Arthritis?",
    answer:
      "Living With Arthritis is a UK charity registered in England and Wales (no. 1218461), founded by David Williams and independent of Arthritis UK. Everything we offer is free: arthritis guides, a PIP claim guide and evidence diary, a flare action plan, home exercise routines, a symptom and flare tracker and a community hub, for adults with arthritis and their carers.",
    faqs: [
      { q: "What does Living With Arthritis offer for free?", a: "Free arthritis guides, a step-by-step PIP claim guide, a printable PIP evidence diary, a flare action plan, home exercise routines, a printable symptom and flare tracker and a community hub. Everything is free to read, with no sign-up needed." },
      { q: "Who is Living With Arthritis for?", a: "Adults in the UK living with arthritis or joint pain, and the family members and carers who support them. Our guidance is educational and does not replace advice from your GP, pharmacist or rheumatology team." },
      { q: "Who runs Living With Arthritis?", a: "Living With Arthritis was founded by David Williams. Louis Maxwell, a physiotherapist and First Contact Practitioner registered with the HCPC (PH128483), is Operations Director and reviews our clinical content." },
      { q: "What is the charity number?", a: "1218461 (England and Wales)." },
      { q: "Where is the charity based?", a: "We are a UK charity (England and Wales, no. 1218461) serving people across the United Kingdom online. A new registered office address will be published when confirmed — contact info@livingwitharthritis.org.uk or 07760 512 084." },
    ],
  }),
  "/guides/diet": withDefaults({
    question: "What is the best diet for arthritis?",
    answer:
      "The NHS advises a healthy, balanced diet and keeping to a healthy weight, because extra weight strains your joints. NICE NG226 says any weight loss helps people with osteoarthritis who are overweight, and NICE NG100 encourages people with rheumatoid arthritis to follow Mediterranean diet principles: more fruit, vegetables, fish and plant oils, less meat. No diet cures arthritis.",
    takeaways: [
      "No diet cures arthritis; a balanced diet supports exercise, medicines and your other treatment.",
      "If you have osteoarthritis and are overweight, any weight loss helps, and losing 10% of body weight is likely better than 5% (NICE NG226).",
      "NICE NG100 encourages Mediterranean diet principles for rheumatoid arthritis: more fruit, vegetables, fish and plant oils, less meat.",
      "Don't drink too much alcohol, and follow your rheumatology team's limits if you take methotrexate."
    ],
    faqs: [
      { q: "Can diet cure arthritis?", a: "No. The NHS says there is currently no cure for arthritis, and NICE NG100 says there is no strong evidence that changing your diet will improve rheumatoid arthritis. A balanced diet supports exercise, medicines and the other treatment your clinical team recommends." },
      { q: "How much weight should I lose for knee or hip osteoarthritis?", a: "NICE NG226 says any amount of weight loss is likely to help if you are overweight, and losing 10% of your body weight is likely to be better than 5%. Ask your GP about local NHS weight management support." },
      { q: "What is a Mediterranean diet for arthritis?", a: "NICE NG100 describes it as more bread, fruit, vegetables and fish, less meat, and replacing butter and cheese with products based on vegetable and plant oils." },
      { q: "Should I cut out alcohol?", a: "The NHS advises people with arthritis not to drink too much alcohol and not to smoke. If you take methotrexate, follow the alcohol limits your rheumatology team gives you." },
    ],
  }),
  "/guides/exercise": withDefaults({
    question: "What exercise is best for arthritis?",
    answer:
      "NICE places exercise first-line for osteoarthritis: combine low-impact aerobic activity (walking, cycling, swimming) with strengthening two or more days a week and flexibility work. Moderate discomfort that settles within 24 hours is expected; reduce intensity if pain stays high overnight or joints swell.",
    faqs: [
      { q: "Should I exercise if my joints hurt?", a: "Yes — start gently. Stop and scale back if pain stays high overnight or swelling increases." },
      { q: "How much each week?", a: "Around 150 minutes of moderate low-impact activity plus two strengthening sessions, split into short blocks if needed." },
    ],
  }),
  "/arthritis-waiting-list-help": withDefaults({
    question: "What can I do while waiting for a rheumatology appointment?",
    answer:
      "While you wait, check your referral has been received, track your symptoms weekly, keep active, and ask about NHS physiotherapy self-referral. In England you have a legal right to start consultant-led treatment within 18 weeks, with exceptions; Scotland, Wales and Northern Ireland have different rules. Contact your GP if symptoms get worse so the referral can be reviewed.",
    faqs: [
      { q: "How long will I wait for a rheumatology appointment?", a: "It depends on where you live, the hospital and how urgent your referral is. Check the official sites: My Planned Care in England, NHS inform in Scotland, your health board and GOV.WALES statistics in Wales, and My Waiting Times NI in Northern Ireland. Suspected inflammatory arthritis should be referred urgently." },
      { q: "What is the 18-week rule?", a: "In England you have a legal right to start non-urgent, consultant-led treatment within 18 weeks of your referral being received or booked, with some exceptions. If you are likely to wait longer, you can ask to be offered a different provider. Scotland, Wales and Northern Ireland have different rules." },
      { q: "Should I go back to my GP while I wait?", a: "Yes, if your symptoms are getting worse, new joints are affected or you are struggling with daily life or work. Take a symptom record so your GP can update the hospital or ask for the referral to be reprioritised." },
      { q: "Can I refer myself to physiotherapy?", a: "In many areas you can refer yourself to NHS community musculoskeletal (MSK) physiotherapy without seeing your GP. Check your GP surgery or local NHS website." },
    ],
  }),
  "/blog/working-with-arthritis-uk-rights": withDefaults({
    question: "What workplace rights do people with arthritis have in the UK?",
    answer:
      "Arthritis can be a disability under the Equality Act 2010 when it has a substantial, long-term effect on day-to-day activities. That can trigger reasonable adjustments. Access to Work may fund equipment, travel or support. Speak to your employer or Acas for practical next steps.",
    faqs: [
      { q: "What is Access to Work?", a: "A UK government grant that can help pay for workplace support if a disability or health condition affects your job." },
      { q: "Do I have to tell my employer?", a: "You are not forced to disclose, but sharing enough for reasonable adjustments is often needed for legal protection to apply in practice." },
    ],
  }),
  "/blog/managing-methotrexate-side-effects-practical-tips": withDefaults({
    question: "How do I manage methotrexate side effects?",
    answer:
      "Follow your rheumatology team's dose and timing. Folic acid is often prescribed to reduce some side effects. Report fever, unexplained bruising, severe mouth ulcers, breathlessness or persistent vomiting promptly. Never stop methotrexate suddenly without clinical advice unless told to for an acute reason.",
    faqs: [
      { q: "Why take folic acid with methotrexate?", a: "Folic acid reduces some methotrexate side effects; use the dose and day your team recommended." },
      { q: "Can I drink alcohol?", a: "Ask your team — many people are advised to keep alcohol low because both alcohol and methotrexate affect the liver." },
    ],
  }),
};

/** Look up AEO data for a route. Returns undefined if not configured. */
export function getPageAeo(route: string): AeoPage | undefined {
  const clean = route.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return PAGE_AEO[clean];
}

export const AEO_ROUTES = Object.keys(PAGE_AEO);
