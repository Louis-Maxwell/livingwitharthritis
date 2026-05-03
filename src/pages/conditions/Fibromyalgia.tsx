import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  slug: "fibromyalgia",
  name: "Fibromyalgia",
  tagline:
    "Fibromyalgia is a long-term condition that causes widespread body pain, profound fatigue and brain fog. It is not a form of arthritis, but it often sits alongside it — and it responds well to a structured self-management plan.",
  metaTitle: "Fibromyalgia: Symptoms, Causes & UK Treatment Guide",
  metaDescription:
    "UK fibromyalgia guide — widespread pain, fatigue, fibro fog, sleep problems, pacing, exercise and medication. Evidence-based, written for patients by Living With Arthritis.",
  keywords:
    "fibromyalgia, fibromyalgia symptoms, fibromyalgia treatment UK, fibro fog, chronic widespread pain, pacing, fibromyalgia exercise, pregabalin fibromyalgia, fibromyalgia diet, chronic pain management",
  alternateNames: ["Fibromyalgia syndrome", "FMS", "Chronic widespread pain syndrome"],
  whatIs: (
    <>
      <p>
        Fibromyalgia is a long-term condition that causes <strong>pain all over the body</strong>,
        often alongside extreme tiredness, poor sleep and difficulty concentrating ("fibro
        fog"). It is thought to be caused by changes in the way the central nervous system
        processes pain signals.
      </p>
      <p>
        Around <strong>1 in 20 people in the UK</strong> are affected, with women more
        commonly diagnosed than men. While there is no cure, a combination of pacing, gentle
        exercise, sleep hygiene and medication can dramatically improve quality of life.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Widespread pain</strong> on both sides of the body, above and below the waist, lasting more than 3 months",
    "<strong>Profound fatigue</strong> not relieved by rest",
    "<strong>Sleep problems</strong> — non-restorative sleep, restless legs",
    "<strong>Cognitive difficulties</strong> ('fibro fog') — memory and concentration issues",
    "Headaches and migraine",
    "Irritable bowel symptoms",
    "Heightened sensitivity to light, sound, smells or touch",
    "Anxiety or low mood",
  ],
  causes: [
    "<strong>Central sensitisation</strong> — the nervous system amplifies pain signals",
    "<strong>Triggering events</strong> — physical injury, infection, surgery, emotional stress",
    "<strong>Genetic vulnerability</strong> — fibromyalgia often runs in families",
    "More common alongside rheumatoid arthritis, lupus or osteoarthritis",
    "Sleep disorders and unrefreshing sleep",
  ],
  treatments: [
    "<strong>Pacing</strong> — balancing activity and rest to avoid boom-and-bust cycles",
    "<strong>Graded exercise</strong> built up slowly, especially aerobic and aquatic work",
    "<strong>Cognitive behavioural therapy (CBT)</strong> for pain coping and sleep",
    "<strong>Antidepressants</strong> (amitriptyline, duloxetine) — used at low doses for pain and sleep",
    "<strong>Pregabalin or gabapentin</strong> for nerve-related pain",
    "<strong>Sleep hygiene</strong> — consistent bedtime, cool dark room, no screens late",
    "Mindfulness, yoga and tai chi",
  ],
  diet: (
    <>
      <p>
        No single diet treats fibromyalgia, but a balanced anti-inflammatory pattern can ease
        fatigue and support a healthy weight.
      </p>
      <ul>
        <li>Mediterranean diet rich in vegetables, fish, olive oil and whole grains</li>
        <li>Limit caffeine, alcohol and ultra-processed foods that disrupt sleep</li>
        <li>Stay well hydrated</li>
        <li>Check vitamin D and B12 levels — deficiencies are common in fibromyalgia</li>
        <li>If certain foods seem to trigger symptoms, keep a brief food and symptom diary</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Movement is one of the most effective treatments for fibromyalgia, even though pain
        and fatigue can make it feel counter-intuitive. Start tiny and build slowly.
      </p>
      <ul>
        <li><strong>Walking</strong> — start with 5 minutes a day and add a minute each week</li>
        <li><strong>Aquatic exercise</strong> in a warm pool — particularly well-evidenced</li>
        <li><strong>Tai chi and yoga</strong> for gentle strength, balance and breathing</li>
        <li>Pilates for core strength without high impact</li>
        <li>Strength work 2 days a week — light weights or resistance bands</li>
      </ul>
      <p>
        A "good" session should leave you no more sore than usual the following day. If it
        does, drop back and rebuild.
      </p>
    </>
  ),
  faqs: [
    {
      question: "Is fibromyalgia a form of arthritis?",
      answer:
        "No. Fibromyalgia doesn't damage joints or cause inflammation. However, it commonly occurs alongside arthritis and is treated by similar rheumatology teams.",
    },
    {
      question: "How is fibromyalgia diagnosed in the UK?",
      answer:
        "Diagnosis is clinical — based on widespread pain lasting over 3 months, plus fatigue, sleep and cognitive symptoms. Blood tests are used to rule out other conditions.",
    },
    {
      question: "What is fibro fog?",
      answer:
        "Fibro fog is the cognitive symptom of fibromyalgia — short-term memory lapses, word-finding difficulties and trouble concentrating. It improves with better sleep, pacing and exercise.",
    },
    {
      question: "Can fibromyalgia be cured?",
      answer:
        "There is no cure, but with self-management, exercise, medication and CBT, many people significantly reduce symptoms and stay in work and family life.",
    },
    {
      question: "Does fibromyalgia get worse over time?",
      answer:
        "Fibromyalgia is not progressive — it doesn't damage tissue. Symptoms fluctuate, often worsening with stress, poor sleep or overdoing activity, and easing with steady self-management.",
    },
  ],
  related: [
    {
      label: "Lupus",
      to: "/conditions/lupus",
      desc: "Another common fellow-traveller of fibromyalgia",
    },
    {
      label: "Arthritis flare-ups",
      to: "/arthritis-flare-ups",
      desc: "Pacing strategies that work for fibro flares too",
    },
    {
      label: "Exercise Hub",
      to: "/exercises",
      desc: "Gentle, joint-friendly routines you can adapt",
    },
    {
      label: "Community & peer support",
      to: "/community",
      desc: "Talk to others living with chronic pain",
    },
  ],
};

const Fibromyalgia = () => <ConditionPageTemplate data={data} />;
export default Fibromyalgia;
