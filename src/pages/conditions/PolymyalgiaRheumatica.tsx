import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Inflammatory", "Older Adults"],
  slug: "polymyalgia-rheumatica",
  name: "Polymyalgia Rheumatica",
  tagline:
    "Polymyalgia rheumatica (PMR) is an inflammatory condition that causes severe stiffness and pain across the shoulders, neck and hips — almost always in adults over 50. With low-dose steroids most people feel dramatically better within days.",
  metaTitle: "Polymyalgia Rheumatica: UK Symptoms & Treatment Guide",
  metaDescription:
    "UK guide to polymyalgia rheumatica (PMR) — shoulder and hip stiffness in over-50s, GP diagnosis, steroid treatment and self-care. Written for patients by Living With Arthritis.",
  keywords:
    "polymyalgia rheumatica, PMR, polymyalgia symptoms, polymyalgia treatment, steroid for PMR, prednisolone, shoulder stiffness over 50, hip stiffness morning, giant cell arteritis, inflammatory arthritis UK, polymyalgia diet, polymyalgia exercise",
  alternateNames: ["PMR", "Polymyalgia"],
  aeoAnswer: {
    question: "What is the best treatment for polymyalgia rheumatica?",
    answer: (
      <p>
        UK guidelines recommend low-dose prednisolone (typically 15 mg daily), which usually
        relieves shoulder and hip stiffness within 2–3 days. The dose is then tapered slowly
        over 1–3 years under GP or rheumatology supervision, with calcium, vitamin D and
        bone-protection medicine to offset steroid side-effects. Methotrexate is added if PMR
        keeps relapsing.
      </p>
    ),
    reviewed: "2026-06-13",
  },
  whatIs: (
    <>
      <p>
        Polymyalgia rheumatica (PMR) is an inflammatory condition that causes pain and severe
        morning stiffness in the shoulders, neck, upper arms, hips and thighs. Symptoms usually
        come on quickly — sometimes overnight — and are almost unheard of below the age of 50.
      </p>
      <p>
        Around <strong>1 in 1,200 adults over 50 in the UK</strong> develop PMR each year, making
        it one of the most common inflammatory rheumatic diseases in older adults. It responds
        rapidly to low-dose steroids, and most people are off treatment within 1–3 years.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Severe morning stiffness</strong> in the shoulders, neck and hips lasting over 45 minutes",
    "<strong>Aching, tender muscles</strong> in the upper arms and thighs",
    "<strong>Difficulty getting out of bed</strong>, dressing or raising the arms",
    "Fatigue, low mood and loss of appetite",
    "Mild fever, weight loss or night sweats",
    "Symptoms typically appear on <strong>both sides of the body at once</strong>",
  ],
  causes: [
    "<strong>Age</strong> — almost exclusively affects people over 50, peaking in the 70s",
    "<strong>Female sex</strong> — women are 2–3 times more likely to be affected",
    "<strong>Northern European heritage</strong> increases risk",
    "<strong>Immune system overactivity</strong> targeting the lining of joints and bursae",
    "Possible viral triggers (research ongoing)",
    "Linked to <strong>giant cell arteritis (GCA)</strong> in around 1 in 5 cases — see your GP urgently for new headaches, jaw pain or vision changes",
  ],
  treatments: [
    "<strong>Low-dose prednisolone</strong> (typically 15 mg daily) — most people feel dramatically better within 2–3 days",
    "Slow tapering of steroids over 1–3 years under GP or rheumatology supervision",
    "<strong>Calcium and vitamin D</strong>, plus bone-protection medicine to reduce steroid-induced osteoporosis",
    "<strong>Methotrexate</strong> as a steroid-sparing option for relapsing PMR",
    "Regular blood tests (CRP, ESR) to monitor inflammation",
    "Urgent referral if symptoms of giant cell arteritis develop",
  ],
  diet: (
    <>
      <p>
        There is no cure-by-diet for PMR, but a <strong>Mediterranean, anti-inflammatory
        pattern</strong> supports steroid treatment and protects bones during a long taper.
      </p>
      <h3>Eat more</h3>
      <ul>
        <li>Oily fish (salmon, sardines, mackerel) for omega-3</li>
        <li>Leafy greens, broccoli and tinned fish for calcium</li>
        <li>Fortified milk, eggs and 10–20 minutes of daylight for vitamin D</li>
        <li>Olive oil, nuts, seeds and pulses</li>
        <li>Plenty of water and herbal teas</li>
      </ul>
      <h3>Limit</h3>
      <ul>
        <li>Salt and ultra-processed food — steroids raise blood pressure</li>
        <li>Sugary drinks and refined carbs — steroids raise blood sugar</li>
        <li>Excess alcohol — affects bone density and sleep</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Gentle, regular movement protects muscle and bone during long-term steroid use. Start
        slowly — most people feel able to exercise within a week of starting prednisolone.
      </p>
      <ul>
        <li>Daily walking — aim to build up to 30 minutes</li>
        <li>Range-of-movement shoulder and hip exercises each morning</li>
        <li>Resistance bands or light weights, twice a week, to maintain muscle</li>
        <li>Tai chi or yoga for balance and fall prevention</li>
        <li>Swimming or aqua-aerobics for joint-friendly cardio</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "What is polymyalgia rheumatica?",
      answer:
        "Polymyalgia rheumatica (PMR) is an inflammatory condition that causes severe stiffness and aching in the shoulders, neck and hips. It almost always affects people over 50 and responds quickly to low-dose steroid tablets.",
    },
    {
      question: "How is polymyalgia rheumatica diagnosed in the UK?",
      answer:
        "Your GP will check your symptoms, examine your shoulders and hips, and arrange blood tests (CRP and ESR) to look for inflammation. A dramatic improvement within a few days of starting prednisolone helps confirm the diagnosis.",
    },
    {
      question: "How long does polymyalgia rheumatica last?",
      answer:
        "Most people need steroid treatment for 1 to 3 years. Around half of those affected have one or more flares during the taper, but the condition usually goes into long-term remission.",
    },
    {
      question: "Is polymyalgia rheumatica an autoimmune disease?",
      answer:
        "Yes — PMR is driven by an overactive immune response that inflames the lining of joints and bursae, particularly in the shoulders and hips. It is not contagious and is not caused by anything you have done.",
    },
    {
      question: "What is the link with giant cell arteritis?",
      answer:
        "Around 1 in 5 people with PMR also develop giant cell arteritis (GCA), which inflames blood vessels in the head. New headaches, scalp tenderness, jaw pain when chewing, or any change in vision need urgent medical attention.",
    },
    {
      question: "Can I exercise with polymyalgia rheumatica?",
      answer:
        "Yes, and you should. Gentle walking, shoulder and hip mobility work, and light resistance training protect muscle and bone during long-term steroid use. Start slowly and build up.",
    },
    {
      question: "Are there natural alternatives to steroids for PMR?",
      answer:
        "There is no proven natural alternative to steroids for PMR — untreated inflammation can damage tissue and increase the risk of GCA. A Mediterranean diet, exercise and bone-protection medicines support steroid treatment rather than replace it.",
    },
  ],
  related: [
    {
      label: "Anti-inflammatory diet",
      to: "/diet",
      desc: "Mediterranean meals that pair well with long-term steroid use",
    },
    {
      label: "Arthritis flare-ups",
      to: "/arthritis-flare-ups",
      desc: "What to do when stiffness and pain return suddenly",
    },
    {
      label: "Rheumatoid arthritis",
      to: "/conditions/rheumatoid-arthritis",
      desc: "Another inflammatory condition often confused with PMR",
    },
    {
      label: "Advice Hub",
      to: "/blog-hub",
      desc: "Browse arthritis guidance by topic",
    },
  ],
};

const PolymyalgiaRheumatica = () => <ConditionPageTemplate data={data} />;
export default PolymyalgiaRheumatica;
