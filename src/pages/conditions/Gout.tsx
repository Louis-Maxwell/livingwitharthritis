import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Nutrition", "Lifestyle"],
  slug: "gout",
  name: "Gout",
  tagline:
    "Gout is a painful inflammatory arthritis caused by urate crystals in a joint. Treatment can settle attacks and lower the risk of future flares.",
  metaTitle: "Gout Symptoms, Causes, Diet & Treatment (UK Guide)",
  metaDescription:
    "What is gout? UK guide to gout symptoms, the first signs in the big toe, triggers, low-purine diet, allopurinol treatment and how to prevent attacks.",
  keywords:
    "gout, what is gout, gout symptoms, first signs of gout, gout in big toe, gout treatment, gout diet, low purine diet, allopurinol, uric acid, gout flare up, foods to avoid gout, gout UK, crystal arthritis, joint pain charity, arthritis support",
  alternateNames: ["Crystal arthritis", "Urate arthropathy", "Podagra"],
  aeoAnswer: {
    question: "What is the fastest way to stop a gout attack?",
    answer: (
      <p>
        Contact a GP promptly. An NSAID, colchicine or a short course of
        corticosteroid may be offered depending on your other conditions and
        medicines. Rest the joint and use a wrapped cold pack for comfort.
        Do not start or change prescription treatment without medical advice.
      </p>
    ),
    reviewed: "2026-06-13",
  },
  whatIs: (
    <>
      <p>
        Gout is a form of inflammatory arthritis that develops when high levels of uric acid
        in the blood form sharp crystals inside a joint — most commonly the big toe.
        Attacks come on suddenly, often overnight, and can leave the joint red, hot and
        unbearable to touch.
      </p>
      <p>
        Effective treatment can settle an attack and lower the urate level over
        time, reducing the risk of future attacks and joint damage.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Sudden severe pain</strong> in a single joint, often the big toe",
    "<strong>Redness, heat and swelling</strong> around the joint",
    "<strong>Shiny, tight skin</strong> over the affected area",
    "<strong>Extreme tenderness</strong> — even bedsheets can feel painful",
    "Attacks typically peak within 24 hours and last 3–10 days",
    "Tophi — chalky lumps under the skin in long-standing gout",
  ],
  causes: [
    "<strong>High blood uric acid</strong> (hyperuricaemia) — the underlying driver",
    "<strong>Diet</strong> — red meat, organ meats, shellfish, sugary drinks, beer",
    "<strong>Alcohol</strong>, particularly beer and spirits",
    "<strong>Obesity</strong> and metabolic syndrome",
    "<strong>Genetics</strong> — gout runs in families",
    "<strong>Kidney problems</strong> reducing uric acid clearance",
    "Certain medicines (diuretics, low-dose aspirin)",
  ],
  diagnosis: (
    <>
      <p>
        A GP can often diagnose gout from the classic pattern — sudden, severe pain in a
        single joint, usually the big toe — but confirming it properly matters, since other
        conditions can look similar.
      </p>
      <h3>Joint fluid aspiration</h3>
      <p>
        The gold-standard test is removing a small sample of fluid from the affected joint
        with a fine needle and examining it under a polarised-light microscope for
        needle-shaped urate crystals. This also rules out a joint infection, which can look
        similar but needs urgent, different treatment.
      </p>
      <h3>Blood tests</h3>
      <p>
        A blood uric acid test is useful but not always conclusive on its own — levels can
        be normal during an actual attack and only rise again afterwards, so a single normal
        result doesn't rule gout out.
      </p>
      <h3>Imaging</h3>
      <p>
        Ultrasound or dual-energy CT scanning can show characteristic urate crystal deposits
        non-invasively, and are especially useful for confirming gout in joints that are
        difficult to aspirate, or in long-standing disease.
      </p>
    </>
  ),
  treatments: [
    "<strong>NSAIDs</strong> (ibuprofen, naproxen) — first-line for acute attacks",
    "<strong>Colchicine</strong> — used when NSAIDs aren't suitable",
    "<strong>Steroid tablets or injections</strong> for severe attacks",
    "<strong>Allopurinol or febuxostat</strong> — long-term urate-lowering therapy",
    "Drink plenty of water and rest the joint during an attack",
    "Apply an ice pack wrapped in a tea towel for 20 minutes at a time",
  ],
  diet: (
    <>
      <p>
        A <strong>low-purine, Mediterranean-style diet</strong> reduces uric acid and helps
        prevent attacks.
      </p>
      <h3>Eat more</h3>
      <ul>
        <li>Vegetables, including those once thought to trigger gout (spinach, mushrooms)</li>
        <li>Whole grains and legumes</li>
        <li>Low-fat dairy — yoghurt and skimmed milk lower uric acid</li>
        <li>Cherries and berries — linked to fewer attacks</li>
        <li>Plenty of water (2 litres a day)</li>
      </ul>
      <h3>Limit or avoid</h3>
      <ul>
        <li>Red meat, liver, kidney, game</li>
        <li>Shellfish, anchovies, sardines, mackerel</li>
        <li>Beer, spirits and sugary fizzy drinks</li>
        <li>High-fructose syrups in processed food</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Regular movement helps weight loss and improves circulation. Avoid exercise during an
        active attack — wait 24 hours after symptoms settle.
      </p>
      <ul>
        <li>Swimming and water aerobics</li>
        <li>Cycling — easy on the toe joint</li>
        <li>Yoga and tai chi for flexibility</li>
        <li>Brisk walking once attacks are controlled</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "What are the first signs of gout?",
      answer:
        "The first sign is usually a sudden, severe attack of pain in a single joint — most often the big toe — that wakes you up at night. The joint becomes red, hot, swollen and so tender that even the weight of a bedsheet feels unbearable. Attacks typically peak within 24 hours.",
    },
    {
      question: "How do I know if my toe pain is gout?",
      answer:
        "Gout in the big toe (called podagra) comes on suddenly, usually overnight, with intense burning pain, redness, heat and swelling at the base of the toe. If you can't bear weight on it or even touch it, and the attack settles over 3–10 days, gout is the most likely cause. A blood test for uric acid and joint fluid analysis can confirm it.",
    },
    {
      question: "What does a gout attack feel like?",
      answer:
        "Most people describe a sudden, intense burning or throbbing pain in one joint — often the big toe — that starts overnight. The joint becomes red, hot, swollen and so tender that even a bedsheet can be unbearable.",
    },
    {
      question: "Is gout curable?",
      answer:
        "Gout is a long-term condition, but urate-lowering treatment can greatly reduce future attacks when it is appropriate and taken as prescribed.",
    },
    {
      question: "What foods should I avoid with gout?",
      answer:
        "Limit red meat, organ meats, shellfish, oily fish (anchovies, sardines), beer, spirits and sugary drinks. Cherries, water and low-fat dairy can help reduce attacks.",
    },
    {
      question: "How long does a gout attack last?",
      answer:
        "An untreated attack peaks at 24 hours and usually settles within 3 to 10 days. NSAIDs or colchicine started early can shorten and ease attacks.",
    },
    {
      question: "Is gout the same as arthritis?",
      answer:
        "Gout is a type of inflammatory arthritis caused by uric-acid crystals, distinct from osteoarthritis (wear and tear) or rheumatoid arthritis (autoimmune).",
    },
  ],
  sources: [
    {
      label: "NHS: Gout",
      url: "https://www.nhs.uk/conditions/gout/",
    },
    {
      label: "NICE NG219: Gout — diagnosis and management",
      url: "https://www.nice.org.uk/guidance/ng219",
    },
  ],
  related: [
    {
      label: "Gout symptoms",
      to: "/conditions/gout/symptoms",
      desc: "Early signs of a gout attack, big-toe pain, and when to see a GP",
    },
    {
      label: "Febuxostat for gout",
      to: "/guides/febuxostat-for-gout",
      desc: "How febuxostat works for long-term uric acid control and gout prevention",
    },
    {
      label: "Anti-inflammatory diet",
      to: "/diet",
      desc: "Mediterranean meal plans that work alongside gout treatment",
    },
    {
      label: "Arthritis flare-ups",
      to: "/arthritis-flare-ups",
      desc: "What to do when joint pain spikes suddenly",
    },
    {
      label: "Osteoarthritis",
      to: "/conditions/osteoarthritis",
      desc: "Wear-and-tear arthritis — symptoms and treatment",
    },
  ],
};

const Gout = () => <ConditionPageTemplate data={data} />;
export default Gout;
