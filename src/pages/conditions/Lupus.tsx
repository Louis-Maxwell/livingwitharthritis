import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Health", "Treatment"],
  slug: "lupus",
  name: "Lupus",
  tagline:
    "Lupus (systemic lupus erythematosus) is an autoimmune condition that can cause joint pain, fatigue, skin rashes and inflammation in many parts of the body. With modern treatment, most people live full, active lives.",
  metaTitle: "Lupus (SLE): Symptoms, Causes & UK Treatment Guide",
  metaDescription:
    "UK guide to lupus (SLE) — joint pain, butterfly rash, fatigue, hydroxychloroquine, sun protection and lifestyle. Evidence-based advice from Living With Arthritis.",
  keywords:
    "lupus, systemic lupus erythematosus, SLE, lupus symptoms, lupus treatment, hydroxychloroquine, butterfly rash, lupus diet, lupus UK, autoimmune disease, joint pain, chronic illness",
  alternateNames: ["SLE", "Systemic lupus erythematosus"],
  whatIs: (
    <>
      <p>
        Lupus is a long-term <strong>autoimmune disease</strong> in which the immune system
        mistakenly attacks healthy tissue. The most common form is{" "}
        <strong>systemic lupus erythematosus (SLE)</strong>, which can affect joints, skin,
        kidneys, heart, lungs and the brain.
      </p>
      <p>
        Around <strong>50,000 people in the UK</strong> live with lupus. It is most often
        diagnosed in women aged 15–45, and is more common in people of African, Caribbean,
        South Asian and Chinese heritage.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Joint pain and stiffness</strong> — often the first symptom",
    "<strong>Extreme fatigue</strong> not relieved by rest",
    "<strong>Butterfly-shaped rash</strong> across the cheeks and nose",
    "Sensitivity to sunlight (photosensitivity)",
    "Mouth ulcers and hair loss",
    "Raynaud's phenomenon — fingers turning white or blue in the cold",
    "Unexplained fevers",
    "Kidney problems (lupus nephritis) — often silent in early stages",
  ],
  causes: [
    "Autoimmune — the immune system attacks the body's own tissues",
    "<strong>Genetics</strong> — risk is higher with a family history",
    "<strong>Hormones</strong> — oestrogen plays a role, helping explain why it's more common in women of reproductive age",
    "<strong>Environmental triggers</strong> — UV light, infections, certain medications, stress",
    "Smoking worsens disease activity",
  ],
  treatments: [
    "<strong>Hydroxychloroquine</strong> — first-line for most people, reduces flares and protects organs",
    "<strong>Steroids</strong> (low-dose long-term or short bursts during flares)",
    "<strong>Immunosuppressants</strong> (azathioprine, mycophenolate, methotrexate)",
    "<strong>Biologics</strong> (belimumab, rituximab) for resistant disease",
    "<strong>Strict sun protection</strong> — SPF 50, hats, UV-protective clothing year-round",
    "Stop smoking",
    "Regular monitoring of blood pressure, kidneys and cholesterol",
  ],
  diet: (
    <>
      <p>
        A Mediterranean-style anti-inflammatory diet supports immune balance, heart health and
        a healthy weight — all important in lupus.
      </p>
      <ul>
        <li>Plenty of vegetables, fruit, whole grains and legumes</li>
        <li>Oily fish 2–3 times a week for omega-3</li>
        <li>Olive oil as the main added fat</li>
        <li>Limit salt and saturated fat — important for heart and kidney health</li>
        <li>Vitamin D supplement is often recommended (sun avoidance lowers natural levels)</li>
        <li>Avoid alfalfa sprouts — they contain L-canavanine, which can trigger flares</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Gentle, regular exercise reduces fatigue, supports mood and protects bones from
        steroid-related thinning.
      </p>
      <ul>
        <li>Walking, swimming and cycling at a comfortable pace</li>
        <li>Yoga, tai chi or pilates for flexibility and stress relief</li>
        <li>Light strength work 2 days a week</li>
        <li>Pace activity — rest before fatigue forces you to</li>
        <li>Wear UV protection if exercising outdoors, even on cloudy days</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "Is lupus a form of arthritis?",
      answer:
        "Lupus isn't classed as arthritis but it commonly causes joint pain and stiffness. Many people are managed by the same rheumatology teams that treat rheumatoid arthritis.",
    },
    {
      question: "Can lupus be cured?",
      answer:
        "There is no cure, but modern treatments — particularly hydroxychloroquine — control symptoms and reduce flares for most people. Many achieve long periods of remission.",
    },
    {
      question: "What is the butterfly rash?",
      answer:
        "A flat or slightly raised red rash across the cheeks and bridge of the nose, in the shape of a butterfly. It is one of the most recognisable signs of lupus, though not everyone develops it.",
    },
    {
      question: "Why is sun protection so important with lupus?",
      answer:
        "UV light can trigger lupus flares — both skin rashes and internal symptoms. Daily SPF 50, UV-protective clothing and hats are essential, even on cloudy UK days.",
    },
    {
      question: "Can people with lupus have children?",
      answer:
        "Yes. Pregnancy in lupus needs to be planned with your rheumatology and obstetric team, ideally during a period of stable disease, with medications reviewed in advance.",
    },
  ],
  related: [
    {
      label: "Rheumatoid arthritis",
      to: "/conditions/rheumatoid-arthritis",
      desc: "Another autoimmune condition with overlapping treatments",
    },
    {
      label: "Fibromyalgia",
      to: "/conditions/fibromyalgia",
      desc: "Often seen alongside lupus — recognise the difference",
    },
    {
      label: "Anti-inflammatory diet",
      to: "/diet",
      desc: "Mediterranean meal plans suited to autoimmune conditions",
    },
    {
      label: "Community & peer support",
      to: "/community",
      desc: "Connect with others living with autoimmune disease",
    },
  ],
};

const Lupus = () => <ConditionPageTemplate data={data} />;
export default Lupus;
