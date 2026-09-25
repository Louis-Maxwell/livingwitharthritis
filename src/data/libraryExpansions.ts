/**
 * Expanded library overlays (Sep 2026 quick-wins batch). Merged into
 * LIBRARY_TOPIC_SEO in libraryTopicSeo.ts. Written by Louis Maxwell;
 * pending clinical review. Plain text only.
 */
import type { LibraryTopicSeo } from "./libraryTopicSeo";

const REVIEW_NOTE = {
  heading: "About this page",
  body: "Written by Louis Maxwell, First Contact Practitioner (HCPC PH128483), and pending clinical review. This is general information, not a diagnosis. Always follow the advice of your own GP, physiotherapist or rheumatology team. For emergencies call 999; for urgent advice use NHS 111.",
};

export const LIBRARY_EXPANSIONS: Record<string, LibraryTopicSeo> = {
  hydroxychloroquine: {
    title: "Hydroxychloroquine: eye checks, side effects, what to expect",
    description:
      "Taking hydroxychloroquine for lupus or RA? How long it takes to work, common side effects, why yearly eye screening matters and tips for taking it well.",
    h1: "Hydroxychloroquine: eye checks, side effects and what to expect",
    related: [
      { label: "Lupus guide", href: "/conditions/lupus" },
      { label: "Rheumatoid arthritis guide", href: "/conditions/rheumatoid-arthritis" },
      { label: "Sjögren's", href: "/library/sjogrens" },
      { label: "Starting a new arthritis medicine", href: "/blog/starting-a-new-arthritis-medicine-questions-to-ask" },
      { label: "Arthritis medicines explained", href: "/treatments/drug-guide" },
    ],
    extraSections: [
      {
        heading: "Who is prescribed hydroxychloroquine",
        body: "Hydroxychloroquine is one of the most widely used medicines in rheumatology. It is a first-choice treatment for lupus, where it helps prevent flares and protects organs over the long term, and it is often continued even when lupus is quiet. In rheumatoid arthritis it is used for milder disease or combined with other DMARDs such as methotrexate and sulfasalazine. It is also used for Sjögren's, palindromic rheumatism and some skin conditions. It is considered only mildly immune-suppressing, which is one reason it is so commonly used.",
      },
      {
        heading: "Taking it well",
        body: "Hydroxychloroquine is a tablet taken once or twice a day. Your dose is worked out by your rheumatology team, partly based on your body weight, to keep the risk to your eyes low. Always take it as your team advises, and do not change the dose yourself.",
        bullets: [
          "Take it with food or a glass of milk if it upsets your stomach.",
          "Leave a gap of several hours between hydroxychloroquine and indigestion remedies (antacids), which can reduce absorption.",
          "Keep taking it even when you feel well; in lupus in particular, stopping can lead to flares.",
          "If you miss a dose, check your leaflet or ask your pharmacist. Do not double up.",
          "Keep tablets out of reach of children, as hydroxychloroquine is very dangerous in overdose.",
        ],
      },
      {
        heading: "How long it takes to work",
        body: "Hydroxychloroquine works slowly. Some people notice an improvement in joint pain, rashes or tiredness after six to eight weeks, but it can take three to six months to reach its full effect. Your team may use other treatments to control symptoms in the meantime.",
      },
      {
        heading: "Eye screening explained",
        body: "Long-term use of hydroxychloroquine can, in a small number of people, damage the retina at the back of the eye. Early damage usually causes no symptoms, which is why screening matters: it can pick up changes before your sight is affected, so the medicine can be stopped.\n\nIn the UK, screening is usually done in a hospital eye department with special scans of the retina and a visual field test. Most people have a baseline check early on and then yearly screening once they have taken hydroxychloroquine for five years. Screening starts sooner, after one year, if you have extra risk factors, such as reduced kidney function, a higher dose relative to your weight, or taking tamoxifen. Ask your team whether you have been referred.\n\nA routine eye test at an optician is still worthwhile, but it does not replace hospital screening. Tell your team or an optometrist promptly if you notice difficulty reading, blurred or missing areas in your vision, or trouble seeing in dim light.",
      },
      {
        heading: "Other side effects",
        body: "Most people take hydroxychloroquine with few problems. Side effects that can occur include:",
        bullets: [
          "Feeling sick, indigestion, tummy pain or diarrhoea, which often settle with time or taking tablets with food.",
          "Headaches.",
          "Skin rashes, itching or, over the long term, darkening of the skin in patches.",
          "Increased sensitivity to sunlight, so use sun protection.",
          "Low blood sugar in some people, especially those with diabetes; know the signs, such as shaking, sweating and confusion.",
          "Rarely, effects on mood, hearing, muscles or heart rhythm. Tell your team about palpitations or fainting, and get urgent help for chest pain.",
        ],
      },
      {
        heading: "Pregnancy, breastfeeding, vaccines and alcohol",
        body: "Hydroxychloroquine is usually continued during pregnancy and breastfeeding, particularly in lupus, because stopping it can lead to flares. Always discuss pregnancy plans with your team. It does not usually rule out vaccines, including most live vaccines, but check if you take other immune-suppressing medicines as well. There is no specific interaction with alcohol, but keep within UK low-risk drinking guidelines.",
      },
      {
        heading: "When to seek help",
        body: "Contact your GP or rheumatology team the same day, or call NHS 111, if you have a widespread rash with fever or blistering, unexplained bruising, signs of low blood sugar that keep happening, or palpitations. Call 999 for chest pain, fainting or signs of a severe allergic reaction.",
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "How long does hydroxychloroquine take to work?", a: "Some people notice benefits after six to eight weeks, but it can take three to six months to reach its full effect." },
      { q: "Why do I need eye screening on hydroxychloroquine?", a: "Long-term use can rarely damage the retina without early symptoms. Screening picks up changes early so the medicine can be stopped before sight is affected." },
      { q: "Can I take hydroxychloroquine during pregnancy?", a: "It is usually continued during pregnancy and breastfeeding, especially in lupus. Discuss your plans with your rheumatology team." },
      { q: "Does hydroxychloroquine lower immunity?", a: "It is only mildly immune-suppressing compared with many other arthritis medicines, and most people can have routine vaccines. Check with your team if you take other medicines too." },
      { q: "Can I drink alcohol on hydroxychloroquine?", a: "There is no specific interaction, but keeping within UK low-risk drinking guidelines is sensible." },
    ],
  },
  "carpal-tunnel": {
    title: "Carpal tunnel syndrome: numb hands, night tingling, relief",
    description:
      "Tingling or numb fingers at night? Learn why carpal tunnel happens, wrist splints, exercises, steroid injections and when surgery is worth it in the UK.",
    h1: "Carpal tunnel syndrome: numb hands, night tingling and relief",
    related: [
      { label: "Hand arthritis guide", href: "/conditions/hand-arthritis" },
      { label: "Hand exercises for arthritis", href: "/blog/hand-exercises-for-arthritis" },
      { label: "Occupational therapy for hand pain", href: "/blog/expert-qa-occupational-therapy-hand-pain" },
      { label: "Pins and needles", href: "/library/pins-needles" },
      { label: "Arthritis surgery options", href: "/treatments/surgery-options" },
    ],
    extraSections: [
      {
        heading: "What it feels like day to day",
        body: "Carpal tunnel syndrome usually creeps in. Many people first notice tingling or numbness in the thumb, index and middle fingers when they wake, and find themselves shaking the hand to get the feeling back. Holding a phone, a book or a steering wheel for a while can bring it on. The little finger is usually spared, because a different nerve supplies it.\n\nAs it progresses, fine tasks such as doing up buttons, picking up coins or opening jars can become clumsy, and you may drop things. In longer-standing cases the muscle at the base of the thumb can become thinner and weaker.",
      },
      {
        heading: "Why arthritis and carpal tunnel often go together",
        body: "The carpal tunnel is a tight space, so anything that takes up room inside it can squeeze the median nerve. Inflamed tendon linings in rheumatoid arthritis, bony changes in wrist osteoarthritis, fluid retention in pregnancy, and conditions such as diabetes and an underactive thyroid can all play a part. If you have inflammatory arthritis and new carpal tunnel symptoms, tell your rheumatology team, because it can be a sign of active inflammation at the wrist.",
      },
      {
        heading: "How it is diagnosed",
        body: "Your GP or physiotherapist will usually diagnose carpal tunnel syndrome from your symptoms and a hand examination, which may include simple tests that press on or stretch the nerve. If the diagnosis is unclear, symptoms are severe, or surgery is being considered, you may be referred for nerve conduction studies, which measure how well signals travel along the nerve. Blood tests can check for linked conditions such as diabetes or thyroid problems.",
      },
      {
        heading: "Things you can try first",
        body: "Mild to moderate symptoms often improve without surgery, especially when started early.",
        bullets: [
          "A wrist splint worn at night keeps the wrist straight and takes pressure off the nerve. Many pharmacies sell them, and physiotherapists can advise on fit.",
          "Notice what brings symptoms on. Take breaks from gripping or repetitive tasks, and keep your wrist in a neutral position when typing or using tools.",
          "Try gentle nerve and tendon gliding exercises taught by a physiotherapist or hand therapist.",
          "Avoid sleeping with your wrists tightly curled under your pillow or body.",
          "Managing linked conditions, such as keeping diabetes or thyroid problems well controlled, can help.",
        ],
      },
      {
        heading: "Steroid injections and surgery",
        body: "If splints and activity changes are not enough, a steroid injection into the carpal tunnel can reduce swelling and ease symptoms. For some people the relief is lasting, for others it wears off.\n\nCarpal tunnel release surgery cuts the ligament that forms the roof of the tunnel, giving the nerve more room. It is usually done as a day case under local anaesthetic. Surgery is generally considered when symptoms are severe, keep coming back, or there are signs of lasting nerve damage such as constant numbness or muscle wasting. Recovery involves keeping the hand elevated and moving your fingers early, with a gradual return to heavier gripping over the following weeks.",
      },
      {
        heading: "When to get help quickly",
        body: "Book a GP or physiotherapy appointment if symptoms are stopping you sleeping, are there most of the time, or you notice weakness or wasting at the base of your thumb. Seek urgent medical help if numbness or weakness comes on suddenly, affects your face, arm or leg as well as your hand, or follows a significant wrist injury, as these need checking straight away.",
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "Will carpal tunnel syndrome go away on its own?", a: "Sometimes, particularly when it is linked to pregnancy or a short spell of heavy hand use. Many people improve with a night splint and activity changes. If symptoms persist or worsen, speak to your GP or physiotherapist." },
      { q: "How long should I wear a wrist splint?", a: "Night splints are usually worn every night for several weeks to see if they help. A physiotherapist or GP can advise how long to continue and whether daytime use makes sense for you." },
      { q: "Is carpal tunnel the same as arthritis?", a: "No. Carpal tunnel syndrome is a squeezed nerve, while arthritis affects the joints. They can happen together, and arthritis in or around the wrist can make carpal tunnel more likely." },
      { q: "Can I self-refer to a physiotherapist for carpal tunnel?", a: "In many parts of the UK you can refer yourself to NHS physiotherapy or musculoskeletal services. Check your local NHS website or ask at your GP practice." },
      { q: "How soon can I use my hand after carpal tunnel surgery?", a: "Light use such as eating and dressing usually starts within days, while heavier gripping and lifting return gradually over several weeks. Your surgical team will give you a plan that fits your job and hobbies." },
    ],
  },
  "knee-pain": {
    title: "Knee pain: common causes and what you can do about it",
    description:
      "Sore knee when walking, kneeling or on stairs? Understand the common causes, self-help that works, when to rest or move, and when to see a GP or physio.",
    h1: "Knee pain: common causes and what you can do about it",
    related: [
      { label: "Knee arthritis guide", href: "/conditions/knee-arthritis" },
      { label: "Knee exercises for arthritis", href: "/blog/knee-arthritis-exercises-uk" },
      { label: "Morning knee stiffness", href: "/blog/morning-knee-stiffness-30-minutes" },
      { label: "Knee supports", href: "/library/knee-support" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
    ],
    extraSections: [
      {
        heading: "Common causes by pattern",
        body: "Knee pain has many causes, and where and when it hurts gives useful clues. This list is a guide, not a diagnosis.",
        bullets: [
          "Aching when walking or on stairs, stiffness after sitting, and sometimes creaking, especially over 45: often knee osteoarthritis.",
          "Pain around or behind the kneecap, worse on stairs, squatting or after sitting with bent knees: often patellofemoral pain, common in active younger people.",
          "Pain on the inner or outer side after a twist, sometimes with swelling, catching or locking: may be a meniscus (cartilage) problem.",
          "Pain just below the kneecap in people who run or jump: often a tendon problem.",
          "A soft swelling on the front of the knee after a lot of kneeling: may be bursitis.",
          "Swelling of several joints, long morning stiffness or feeling unwell: may be inflammatory arthritis, which needs a GP review.",
          "A sudden, very painful, hot, red swollen big toe or knee: can be gout or pseudogout.",
        ],
      },
      {
        heading: "What helps most knee pain",
        body: "For most everyday knee pain, keeping moving is more helpful than prolonged rest. Rest from the activity that provokes it for a short time if you need to, but stay active in other ways.\n\nStrengthening the muscles at the front and back of the thigh and around the hip is one of the most reliable ways to reduce knee pain and improve function, including in osteoarthritis. Start with a few simple exercises such as sit-to-stands from a chair, straight leg raises and step-ups, and build up gradually. Some discomfort during exercise is normal, but pain should settle back to your usual level within a day.\n\nOther things that help include losing weight if you are carrying extra, comfortable shock-absorbing shoes, a walking pole or stick in the opposite hand on bad days, and anti-inflammatory gel on the knee after checking with a pharmacist.",
      },
      {
        heading: "Resting, icing and supports",
        body: "After a minor strain, short-term measures such as relative rest, an ice pack wrapped in a towel and elevation can ease swelling. For stiff, arthritic knees many people prefer warmth. Knee sleeves and supports can make some people feel more confident, but they do not replace strengthening. Avoid wearing a brace all day unless a clinician has recommended it.",
      },
      {
        heading: "Seeing a professional",
        body: "In many areas you can refer yourself to NHS physiotherapy or a first contact practitioner at your GP surgery. They can examine your knee, explain what is going on and set up an exercise plan. X-rays are not always needed to diagnose knee osteoarthritis in people over 45 with typical symptoms, and scans are usually reserved for when the result would change what happens next.",
      },
      {
        heading: "When to seek urgent help",
        body: "Some knee problems need prompt medical attention.",
        bullets: [
          "Go to A&E or call 999 if the knee is hot, red and very swollen and you have a fever or feel unwell, because a joint infection needs same-day treatment.",
          "Go to A&E or an urgent treatment centre if you cannot put weight on the leg after an injury, the knee looks deformed, or you heard a pop followed by rapid swelling.",
          "Get urgent medical help if your calf is swollen, red and painful, as this can be a blood clot.",
          "See your GP soon if the knee keeps locking or giving way, or if several joints are swollen.",
        ],
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "Should I rest or exercise a painful knee?", a: "For most knee pain, gentle activity and strengthening help more than prolonged rest. Ease off the activity that aggravates it for a short time, keep moving in other ways, and build up gradually." },
      { q: "Do I need an X-ray for knee pain?", a: "Not always. Knee osteoarthritis can usually be diagnosed from your symptoms and an examination if you are over 45. Imaging is used when the result would change your care or when a different problem is suspected." },
      { q: "Is it safe to walk with knee arthritis?", a: "Yes, walking is generally good for knee arthritis. Pace yourself, wear supportive shoes, and use a stick in the opposite hand on bad days if it helps." },
      { q: "Why does my knee hurt more going downstairs?", a: "Going downstairs puts more load through the front of the knee and relies on thigh muscles working while lengthening. Strengthening exercises and using the handrail often help." },
      { q: "When is knee pain an emergency?", a: "Seek urgent help if the knee is hot, red and swollen with a fever, if you cannot bear weight after an injury, or if your calf is swollen and painful." },
    ],
  },
  raynauds: {
    title: "Raynaud's: cold, white fingers and how to keep warm",
    description:
      "Fingers turning white or blue in the cold? Learn what triggers Raynaud's, practical ways to stay warm, when it links to other conditions and when to see a GP.",
    h1: "Raynaud's: cold, white fingers and how to keep warm",
    related: [
      { label: "Scleroderma", href: "/library/scleroderma" },
      { label: "Lupus guide", href: "/conditions/lupus" },
      { label: "Cold weather and arthritis", href: "/blog/cold-weather-arthritis-uk-winter" },
      { label: "Winter arthritis at home", href: "/blog/winter-arthritis-frailty-cold-houses-uk" },
    ],
    extraSections: [
      {
        heading: "What happens during an attack",
        body: "In Raynaud's, small blood vessels in the fingers and toes overreact to cold or stress and narrow sharply. The skin often turns white, then blue as oxygen drops, then red as blood rushes back. Fingers can feel numb, painful, tingly or throb as they warm up. Attacks can last from a few minutes to much longer. Toes, ears, nose and nipples can also be affected.",
      },
      {
        heading: "Primary and secondary Raynaud's",
        body: "Primary Raynaud's happens on its own, often starting in the teens or twenties. It is usually a nuisance rather than a danger.\n\nSecondary Raynaud's happens because of another condition, most often an autoimmune condition such as scleroderma (systemic sclerosis), lupus, Sjögren's or rheumatoid arthritis. Some medicines, smoking and heavy use of vibrating tools can also cause it. Secondary Raynaud's is more likely to start later in life, affect only some fingers, be severe, or cause skin sores.",
      },
      {
        heading: "How a GP will assess it",
        body: "Your GP will ask about your attacks, other symptoms such as joint pain, rashes, tight skin, dry eyes or mouth and difficulty swallowing, and your medicines. They may arrange blood tests, including tests for autoimmune conditions. A specialist may look at the tiny blood vessels at the base of your nails with a magnifier (capillaroscopy), which helps show whether an underlying condition is likely.",
      },
      {
        heading: "Keeping warm and preventing attacks",
        body: "Keeping your whole body warm matters as much as warming your hands.",
        bullets: [
          "Dress in layers and keep your core warm; wear a hat and warm socks.",
          "Use gloves or mittens outdoors and when handling cold food from the fridge or freezer.",
          "Try hand and foot warmers, heated gloves or insoles on cold days.",
          "Warm the car before you set off, and avoid sudden moves from warm rooms into cold air where possible.",
          "Stop smoking, as it narrows blood vessels further; your GP or pharmacy can help.",
          "Keep active to help circulation, and find ways to manage stress, which can trigger attacks.",
          "If an attack starts, move somewhere warm and warm your hands gently in lukewarm, not hot, water or under your armpits.",
        ],
      },
      {
        heading: "Medicines and specialist treatment",
        body: "If self-help is not enough, your GP may suggest a medicine that relaxes blood vessels, most commonly a calcium channel blocker. Your GP will talk through side effects such as headaches, flushing or ankle swelling. Your GP will also review any current medicines that could be making Raynaud's worse. People with severe secondary Raynaud's, especially with finger ulcers, are usually cared for by a rheumatology team, who have further treatments available, including hospital-based infusions.",
      },
      {
        heading: "When to see a GP or get urgent help",
        body: "See your GP if Raynaud's starts after about age 30, affects only one side or a few fingers, is very painful, or comes with joint pain, rashes, tight skin, tiredness, dry eyes or mouth, or difficulty swallowing. Seek urgent medical advice the same day if a finger or toe develops a sore or ulcer, turns black, or stays white or blue and cold rather than recovering after warming.",
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "Is Raynaud's serious?", a: "Primary Raynaud's is usually uncomfortable but not dangerous. Secondary Raynaud's can be linked to conditions that need specialist care, so new or severe symptoms should be checked by a GP." },
      { q: "Can Raynaud's be cured?", a: "There is no cure, but most people can reduce how often and how badly attacks happen by keeping warm, stopping smoking and, if needed, using medicines that widen blood vessels." },
      { q: "Is Raynaud's linked to arthritis?", a: "It can be. Raynaud's is common in autoimmune conditions such as scleroderma, lupus and Sjögren's, and sometimes occurs with rheumatoid arthritis." },
      { q: "What should I do during an attack?", a: "Get somewhere warm, warm your whole body, and gently warm your hands or feet in lukewarm water or under your armpits. Avoid very hot water, which can hurt numb skin." },
      { q: "When is Raynaud's an emergency?", a: "Seek same-day medical advice if a finger or toe develops an ulcer, turns black, or stays cold and discoloured instead of recovering after warming." },
    ],
  },
  sjogrens: {
    title: "Sjögren's: dry eyes, dry mouth and tiredness explained",
    description:
      "Sjögren's causes dry eyes, dry mouth, joint pain and fatigue. Learn how it is diagnosed, practical relief for dryness, dental care and treatment options.",
    h1: "Sjögren's: dry eyes, dry mouth and tiredness explained",
    related: [
      { label: "Lupus guide", href: "/conditions/lupus" },
      { label: "Rheumatoid arthritis guide", href: "/conditions/rheumatoid-arthritis" },
      { label: "Hydroxychloroquine", href: "/library/hydroxychloroquine" },
      { label: "Arthritis fatigue explained", href: "/blog/arthritis-fatigue-explained" },
      { label: "Raynaud's", href: "/library/raynauds" },
    ],
    extraSections: [
      {
        heading: "More than dry eyes and mouth",
        body: "Dryness is the best-known feature of Sjögren's, but for many people the tiredness is just as hard to live with. Joint and muscle aches are common, and some people have Raynaud's, dry skin, a dry cough, vaginal dryness, swollen glands in the cheeks or under the jaw, or numbness and tingling from nerve involvement. Symptoms vary a lot between people and can come and go.",
      },
      {
        heading: "How Sjögren's is diagnosed",
        body: "There is no single test. A rheumatologist puts together your symptoms with other checks, which may include blood tests for particular antibodies (such as anti-Ro and anti-La), tests of tear production and eye surface health carried out by an eye specialist, measurement of saliva flow, and sometimes a small biopsy from the inside of the lip. Because symptoms overlap with lots of other causes of dryness, including menopause, some medicines and ageing, getting a diagnosis can take time.",
      },
      {
        heading: "Looking after dry eyes",
        body: "Lubricating eye drops, gels and ointments are the mainstay. Preservative-free drops are often recommended if you use them many times a day. Gels or ointments at night can help if you wake with sore eyes.",
        bullets: [
          "Keep screens slightly below eye level and remember to blink fully.",
          "Avoid sitting in draughts from fans, air conditioning or car vents.",
          "Try wraparound glasses outdoors on windy days.",
          "Ask your optometrist or GP about warm compresses and lid hygiene.",
          "See an optician or eye service promptly for eye pain, light sensitivity or blurred vision that does not clear with blinking.",
        ],
      },
      {
        heading: "Looking after a dry mouth and teeth",
        body: "Saliva protects teeth, so a dry mouth raises the risk of tooth decay, gum problems and mouth infections such as thrush.",
        bullets: [
          "Sip water regularly and keep a bottle by the bed.",
          "Try saliva substitutes, gels or sprays, or sugar-free gum or lozenges to stimulate saliva.",
          "Use a high-fluoride toothpaste if your dentist recommends one, and see your dentist and hygienist regularly.",
          "Cut back on sugary snacks and acidic drinks between meals.",
          "Tell your dentist and pharmacist that you have Sjögren's.",
        ],
      },
      {
        heading: "Treatment for the whole body",
        body: "When joint pain, fatigue or other body-wide symptoms are a problem, a rheumatologist may suggest hydroxychloroquine, which needs regular eye checks, or other medicines for more serious organ involvement. Pacing, regular gentle exercise and good sleep habits help many people with fatigue. Medicines that cause dryness as a side effect are worth reviewing with your GP or pharmacist, but do not stop any prescribed medicine without advice.",
      },
      {
        heading: "When to seek medical advice",
        body: "Tell your GP or rheumatology team about new or worsening symptoms. See a doctor promptly if a gland in your cheek, jaw or neck stays swollen for weeks, if you notice a new lump, unexplained weight loss or night sweats, or if you have persistent numbness, breathlessness or a new rash. Most of these have simple explanations, but they should be checked.",
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "Is Sjögren's a type of arthritis?", a: "Sjögren's is an autoimmune condition that mainly affects moisture-producing glands, but it often causes joint pain and can occur alongside rheumatoid arthritis or lupus. Rheumatologists usually look after it." },
      { q: "Can Sjögren's be cured?", a: "There is no cure, but treatments for dryness, fatigue and joint pain can make a big difference to daily life, and many people live full lives with the right support." },
      { q: "Which eye drops are best for Sjögren's?", a: "Preservative-free lubricating drops are often recommended for frequent use, with gels or ointments at night. Your optometrist, pharmacist or eye clinic can help you find the right type." },
      { q: "Why do I need to see the dentist more often?", a: "Less saliva means less natural protection for your teeth and gums, so decay and gum problems can develop faster. Regular dental care and fluoride help prevent this." },
      { q: "Does Sjögren's cause tiredness?", a: "Yes, fatigue is very common. Pacing, gentle regular exercise, good sleep habits and treating any linked problems, such as low thyroid or anaemia, can help." },
    ],
  },
  vasculitis: {
    title: "Vasculitis: types, symptoms and treatment in one guide",
    description:
      "Vasculitis means inflamed blood vessels. This guide explains the main types from GCA to GPA, warning signs, blood and urine tests, treatment and living well.",
    h1: "Vasculitis: types, symptoms and treatment explained",
    related: [
      { label: "Polymyalgia rheumatica", href: "/conditions/polymyalgia-rheumatica" },
      { label: "Kawasaki disease", href: "/library/kawasaki" },
      { label: "Steroids for arthritis", href: "/guides/steroids-for-arthritis" },
      { label: "Lupus guide", href: "/conditions/lupus" },
      { label: "Arthritis medicines explained", href: "/treatments/drug-guide" },
    ],
    extraSections: [
      {
        heading: "Urgent warning signs",
        body: "Some types of vasculitis can damage the eyes, kidneys, lungs or nerves quickly, so a few symptoms need urgent attention.",
        bullets: [
          "A new headache, scalp tenderness, jaw pain when chewing or any change in vision, especially if you are over 50: contact your GP the same day or call NHS 111. If you have lost vision, go to A&E. This can be giant cell arteritis.",
          "Coughing up blood or sudden breathlessness: call 999 or go to A&E.",
          "Blood in your urine, a new rash of purple spots, sudden numbness, weakness or foot drop, or feeling very unwell with fever: get medical help the same day.",
        ],
      },
      {
        heading: "The main types",
        body: "Vasculitis is grouped by the size of the blood vessels involved.",
        bullets: [
          "Large vessels: giant cell arteritis (GCA), which affects arteries in the head and is the most common type in older adults and often overlaps with polymyalgia rheumatica; and Takayasu arteritis, which is rare and usually affects younger people.",
          "Medium vessels: polyarteritis nodosa and Kawasaki disease, which mainly affects young children.",
          "Small vessels: granulomatosis with polyangiitis (GPA), microscopic polyangiitis and eosinophilic granulomatosis with polyangiitis (EGPA), often grouped as ANCA-associated vasculitis; and IgA vasculitis (Henoch-Schönlein purpura), most common in children.",
          "Vasculitis linked to other conditions, such as lupus, rheumatoid arthritis, infections including hepatitis, or certain medicines.",
        ],
      },
      {
        heading: "How it is diagnosed",
        body: "Diagnosis combines your symptoms with tests. Blood tests look for inflammation (such as CRP and ESR), kidney function and particular antibodies. A urine dip test checks for blood or protein that may signal kidney involvement, and it is simple, quick and important. Scans such as ultrasound, CT or PET, and sometimes a biopsy of affected tissue, help confirm the type and extent. Because vasculitis can affect several organs, you may see more than one specialist.",
      },
      {
        heading: "Treatment",
        body: "Treatment aims to switch off the inflammation quickly to protect organs, then keep it under control with the lowest effective treatment. Steroids are often used first because they work fast, with the dose reduced gradually over time. Other immune-calming medicines, such as methotrexate, azathioprine, mycophenolate, rituximab or cyclophosphamide, may be added to control the disease and reduce the steroid dose. Some biologics are also used for specific types. Your team will explain the monitoring your medicines need, including blood tests, bone protection and infection precautions.",
      },
      {
        heading: "Living with vasculitis",
        body: "Many people reach remission, although vasculitis can come back, so ongoing follow-up matters. Learn the early signs of a relapse that apply to you and how to contact your specialist team. Keep your vaccinations up to date as advised, particularly if you take immunosuppressants. Stay as active as you can, as this helps with fatigue, mood and bone health after steroids. Tell every health professional you see about your diagnosis and medicines, and carry a steroid card if you have been given one.",
      },
      REVIEW_NOTE,
    ],
    faqs: [
      { q: "Is vasculitis a type of arthritis?", a: "Vasculitis is inflammation of blood vessels rather than joints, but it can cause joint pain, and it is usually managed by rheumatology teams alongside other specialists." },
      { q: "Can vasculitis be cured?", a: "Many people reach remission with treatment, and some stay well for long periods. Because it can return, regular follow-up and knowing your relapse warning signs are important." },
      { q: "Why do I need urine tests for vasculitis?", a: "Some types of vasculitis affect the kidneys without causing symptoms at first. A simple urine test can pick up blood or protein early so treatment can be adjusted." },
      { q: "What is the link between PMR and giant cell arteritis?", a: "They often occur together, especially in people over 50. Anyone with PMR should know the warning signs of GCA, such as new headache, jaw pain on chewing or vision changes, and seek same-day help if they appear." },
      { q: "Will I be on steroids for a long time?", a: "Steroids are usually reduced gradually as the disease settles, and other medicines may be added to help lower the dose. Never stop steroids suddenly; follow your team's plan." },
    ],
  },
};
