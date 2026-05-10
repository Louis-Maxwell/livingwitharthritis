import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Nutrition", "Lifestyle"],
  slug: "gout",
  name: "Gout",
  tagline:
    "Gout is one of the most painful forms of inflammatory arthritis, caused by uric-acid crystals collecting in the joints. With the right treatment and diet, attacks can be prevented entirely.",
  metaTitle: "Gout: Symptoms, Causes, Diet & Treatment Guide",
  metaDescription:
    "UK guide to gout — symptoms, triggers, low-purine diet, allopurinol treatment and natural ways to prevent attacks. Written for patients by Living With Arthritis.",
  keywords:
    "gout, gout symptoms, gout treatment, gout diet, low purine diet, allopurinol, uric acid, gout flare up, foods to avoid gout, gout in big toe, gout UK, crystal arthritis, joint pain charity, arthritis support",
  alternateNames: ["Crystal arthritis", "Urate arthropathy"],
  whatIs: (
    <>
      <p>
        Gout is a form of inflammatory arthritis that develops when high levels of uric acid
        in the blood form sharp crystals inside a joint — most commonly the big toe.
        Attacks come on suddenly, often overnight, and can leave the joint red, hot and
        unbearable to touch.
      </p>
      <p>
        Around <strong>1 in 40 adults in the UK</strong> live with gout, making it the most
        common inflammatory arthritis. The good news: with the right medication and lifestyle
        changes, most people can stop attacks altogether.
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
      question: "What does a gout attack feel like?",
      answer:
        "Most people describe a sudden, intense burning or throbbing pain in one joint — often the big toe — that starts overnight. The joint becomes red, hot, swollen and so tender that even a bedsheet can be unbearable.",
    },
    {
      question: "Is gout curable?",
      answer:
        "Gout itself is a long-term condition, but with allopurinol or febuxostat plus diet and lifestyle changes, most people stop having attacks completely.",
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
  related: [
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
    {
      label: "Advice Hub",
      to: "/blog-hub",
      desc: "Browse arthritis guidance by topic",
    },
  ],
};

const Gout = () => <ConditionPageTemplate data={data} />;
export default Gout;
