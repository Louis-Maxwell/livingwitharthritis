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
  reviewer?: string;
  updatedAt?: string; // ISO YYYY-MM-DD
}

const REVIEWER = "Living With Arthritis clinical team (HCPC-registered physiotherapy)";
const UPDATED = "2026-07-01";

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
      "Osteoarthritis (OA) is the most common form of arthritis in the UK. It happens when protective cartilage on the ends of your bones wears down over time, most often in knees, hips, hands and spine. Symptoms include joint pain that worsens with activity, morning stiffness under 30 minutes, swelling and reduced movement. It's manageable with exercise, weight control, and, when needed, medication or joint replacement.",
    faqs: [
      { q: "Can osteoarthritis be reversed?", a: "No, cartilage loss can't currently be reversed, but symptoms and progression can be significantly slowed with exercise, weight management and joint-friendly activity." },
      { q: "What's the best exercise for osteoarthritis?", a: "Low-impact aerobic exercise (walking, cycling, swimming) plus strength training around the affected joint. NICE recommends 30 minutes most days." },
      { q: "Does osteoarthritis show on an X-ray?", a: "Yes — X-rays show joint space narrowing and bone spurs, though symptoms don't always match imaging severity." },
      { q: "When should I see a GP?", a: "If joint pain limits daily activity, wakes you at night, or hasn't improved after 6 weeks of self-management, book a GP appointment." },
    ],
  }),
  "/conditions/rheumatoid-arthritis": withDefaults({
    question: "What is rheumatoid arthritis?",
    answer:
      "Rheumatoid arthritis (RA) is an autoimmune condition where the immune system attacks the lining of your joints, causing pain, swelling and stiffness — usually symmetrical (both hands, both feet). Early treatment with DMARDs (disease-modifying drugs) within 3 months of symptoms starting can prevent joint damage. It affects about 400,000 adults in the UK.",
    faqs: [
      { q: "Is rheumatoid arthritis a disability?", a: "It can qualify as a disability under the Equality Act 2010 if it substantially affects daily activities. Many people with RA are eligible for PIP." },
      { q: "What's the difference between OA and RA?", a: "OA is wear-and-tear cartilage loss. RA is an autoimmune inflammatory disease. RA usually affects joints symmetrically and causes prolonged morning stiffness (>1 hour)." },
      { q: "Can diet help RA?", a: "A Mediterranean-style diet rich in oily fish, olive oil and vegetables can reduce inflammatory markers. It doesn't replace DMARDs but supports overall control." },
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
      "Knee arthritis is joint damage in the knee — most often osteoarthritis — causing pain when standing, walking or climbing stairs, stiffness after rest, and swelling. NICE recommends exercise and weight loss as first-line treatment; every 5 kg lost cuts knee load by roughly 20 kg.",
    faqs: [
      { q: "What's the best exercise for knee arthritis?", a: "Quadriceps strengthening (straight-leg raises, wall sits) plus low-impact aerobic (cycling, swimming). 3-5 sessions a week for 8+ weeks shows meaningful pain reduction." },
      { q: "Should I use a walking stick?", a: "Use it in the opposite hand to the painful knee — this reduces load by up to 25%." },
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
      "Book a rheumatology follow-up if not already arranged, start gentle daily movement, and read up on your specific type. NICE recommends beginning exercise and joint protection within weeks of diagnosis for best long-term outcomes. Track symptoms, ask your GP about pain relief options, and consider our free virtual physiotherapy triage.",
  }),
  "/guides/arthritis-pain-relief": withDefaults({
    question: "How do I relieve arthritis pain?",
    answer:
      "First-line pain relief includes paracetamol, topical NSAID gels and heat/cold packs. Exercise reduces pain more than most drugs long-term. If pain persists, your GP can consider oral NSAIDs, corticosteroid injections or, for inflammatory arthritis, DMARDs.",
  }),
  "/guides/hip-exercises-for-osteoarthritis": withDefaults({
    question: "What are the best hip exercises for osteoarthritis?",
    answer:
      "Evidence-based hip OA exercises include glute bridges, clamshells, standing hip abduction, wall squats and stationary cycling. Aim for 3 sessions per week of 30 minutes; expect meaningful pain reduction after 8-12 weeks. NICE guideline NG226 recommends supervised programmes.",
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
  "/guides/sarcopenia-muscle-control": withDefaults({
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
    question: "What UK disability support is available for arthritis?",
    answer:
      "You may qualify for Personal Independence Payment (PIP), Blue Badge, Access to Work grants, and workplace reasonable adjustments under the Equality Act 2010. Citizens Advice and Versus Arthritis helpline (0800 5200 520) guide applications.",
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
  "/diet-hub": withDefaults({
    question: "What's the best diet for arthritis?",
    answer:
      "A Mediterranean diet — oily fish twice a week, olive oil, nuts, wholegrains, plenty of vegetables and fruit — consistently reduces inflammation markers and joint pain in trials. Cut ultra-processed foods, sugary drinks and excess red meat. Weight loss of 5-10% substantially reduces knee OA pain.",
  }),
  "/exercise-hub": withDefaults({
    question: "What's the best exercise for arthritis?",
    answer:
      "Combine aerobic (walking, swimming, cycling) with strength training 2-3 times a week and flexibility work. NICE guideline NG226 recommends exercise as first-line for all arthritis types — with pain reduction comparable to NSAIDs and no side effects.",
  }),
};

/** Look up AEO data for a route. Returns undefined if not configured. */
export function getPageAeo(route: string): AeoPage | undefined {
  const clean = route.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return PAGE_AEO[clean];
}

export const AEO_ROUTES = Object.keys(PAGE_AEO);
