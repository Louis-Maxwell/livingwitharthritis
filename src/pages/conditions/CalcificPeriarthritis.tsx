import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Inflammatory", "Shoulder"],
  slug: "calcific-periarthritis",
  name: "Calcific Periarthritis",
  tagline:
    "Calcific periarthritis causes sudden, severe pain when calcium crystals build up in a tendon — most often around the shoulder. It looks alarming on an X-ray, but it usually settles completely with the right treatment.",
  metaTitle: "Calcific Periarthritis: Symptoms, Causes & Treatment",
  metaDescription:
    "UK guide to calcific periarthritis — sudden shoulder or joint pain from calcium deposits in a tendon. Symptoms, causes, X-ray findings, treatment and recovery time.",
  keywords:
    "calcific periarthritis, calcific tendinitis, calcific tendinopathy, calcium deposits shoulder, hydroxyapatite deposition disease, sudden shoulder pain, calcific periarthritis treatment, calcific periarthritis UK, shoulder calcification, calcium crystals tendon",
  alternateNames: [
    "Calcific tendinitis (tendinopathy)",
    "Hydroxyapatite deposition disease",
    "Peritendinitis calcarea",
  ],
  whatIs: (
    <>
      <p>
        Calcific periarthritis is a sudden, intensely painful inflammation of the soft tissue
        around a joint, caused by deposits of <strong>calcium hydroxyapatite crystals</strong>{" "}
        forming inside a tendon or its surrounding tissue. The shoulder is by far the most common
        site — usually the supraspinatus tendon of the rotator cuff — but it can also affect the
        hip, wrist, finger, knee or foot.
      </p>
      <p>
        Unlike osteoarthritis, the joint surface itself is usually healthy. The pain comes from
        the body&apos;s inflammatory reaction as the deposit forms and then breaks down. Attacks
        typically peak over <strong>1–2 weeks</strong> and settle over{" "}
        <strong>6–12 weeks</strong>, and in most people the calcium deposit eventually resorbs on
        its own. It is most common between the ages of <strong>30 and 60</strong> and slightly
        more common in women.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Sudden, severe pain</strong> around the shoulder or another joint, often waking you at night",
    "Pain that comes on over hours to a couple of days with no injury",
    "<strong>Marked loss of movement</strong> — lifting the arm above shoulder height may be almost impossible",
    "Local warmth, swelling and tenderness over the tendon rather than the joint line",
    "Pain lying on the affected side",
    "In milder cases, a nagging ache and catching sensation with overhead activity",
    "Occasionally a mild fever and raised inflammatory markers, which can mimic infection",
  ],
  causes: [
    "<strong>Calcium hydroxyapatite crystal deposition</strong> within a tendon, then an inflammatory flare as it resorbs",
    "<strong>Repetitive overhead loading</strong> of the rotator cuff — sport, manual work, decorating",
    "Reduced local blood supply and age-related tendon change (most common at 30–60)",
    "<strong>Diabetes and thyroid disorders</strong> — both raise the risk noticeably",
    "Kidney disease and disorders of calcium or phosphate handling",
    "Female sex and a previous episode on the other side",
  ],
  treatments: [
    "<strong>NSAIDs</strong> (ibuprofen, naproxen) with stomach protection — first-line for the acute flare",
    "<strong>Relative rest and ice</strong> for the first few days, avoiding overhead loading",
    "<strong>Ultrasound-guided steroid injection</strong> for pain that does not settle with tablets",
    "<strong>Barbotage (needle lavage)</strong> — an ultrasound-guided procedure that breaks up and washes out the deposit",
    "<strong>Extracorporeal shockwave therapy (ESWT)</strong> for persistent deposits",
    "Physiotherapy once the acute pain eases, to restore range and rotator-cuff strength",
    "Surgery (arthroscopic removal) is rarely needed and reserved for long-standing, disabling cases",
  ],
  diet: (
    <>
      <p>
        No diet dissolves a calcium deposit, and cutting calcium out of your diet does{" "}
        <strong>not</strong> help — it weakens bone without changing the tendon. What diet can do
        is dampen the inflammatory response and support the conditions linked to recurrence.
      </p>
      <h3>Eat more</h3>
      <ul>
        <li>Oily fish (salmon, sardines, mackerel) twice a week for omega-3</li>
        <li>Fruit, vegetables, wholegrains, olive oil, nuts and pulses</li>
        <li>Adequate protein to support tendon repair and muscle around the joint</li>
      </ul>
      <h3>Limit</h3>
      <ul>
        <li>Ultra-processed food, refined sugar and sugary drinks</li>
        <li>Alcohol, particularly while taking NSAIDs</li>
      </ul>
      <p>
        If you have diabetes or a thyroid condition, keeping it well controlled is one of the few
        things shown to reduce the chance of a further episode.
      </p>
    </>
  ),
  exercise: (
    <>
      <p>
        During the acute attack, stop overhead loading — pushing through it prolongs the flare.
        As pain eases, graded movement prevents the shoulder stiffening into a frozen state.
      </p>
      <ul>
        <li>Pendulum swings and passive range-of-movement work in the first two weeks</li>
        <li>Assisted elevation with a stick or the other arm as pain allows</li>
        <li>Isometric rotator-cuff holds before progressing to resistance bands</li>
        <li>Scapular setting and postural work to offload the cuff</li>
        <li>Gradual return to overhead lifting only once full pain-free range has returned</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "What is calcific periarthritis?",
      answer:
        "Calcific periarthritis is sudden inflammation of the tissue around a joint caused by calcium hydroxyapatite crystals forming in a tendon. It most often affects the rotator cuff of the shoulder and causes severe pain and loss of movement, usually without any injury.",
    },
    {
      question: "How long does calcific periarthritis last?",
      answer:
        "The severe phase usually peaks within one to two weeks and settles over six to twelve weeks. Some people have a lingering ache for a few months, and the calcium deposit itself often resorbs completely over one to two years.",
    },
    {
      question: "Is calcific periarthritis the same as calcific tendinitis?",
      answer:
        "They describe the same disease process. Calcific tendinitis refers to the calcium deposit within the tendon; calcific periarthritis is the term used when the inflammation spreads into the surrounding tissue and causes an acute, very painful attack.",
    },
    {
      question: "How is calcific periarthritis diagnosed?",
      answer:
        "A plain X-ray usually shows the calcium deposit clearly, which is often enough to confirm the diagnosis. Ultrasound is used to assess the deposit's consistency and to guide injection or barbotage. Blood tests may be done to rule out infection or gout, which can look similar.",
    },
    {
      question: "Is calcific periarthritis a form of arthritis?",
      answer:
        "Not in the usual sense. Arthritis means inflammation of the joint itself, whereas calcific periarthritis affects the tendon and soft tissue around the joint. The cartilage is usually normal, which is why most people recover full function.",
    },
    {
      question: "Does calcific periarthritis go away on its own?",
      answer:
        "In most cases yes. The body gradually reabsorbs the calcium deposit, and the attack settles within a few months. Treatment is aimed at controlling pain and preventing stiffness while that happens, rather than curing the condition.",
    },
    {
      question: "What is the fastest way to relieve the pain?",
      answer:
        "For a severe attack, an anti-inflammatory tablet taken regularly plus relative rest and ice usually helps within days. If that is not enough, an ultrasound-guided steroid injection gives the quickest relief, and barbotage can be added to break down the deposit itself.",
    },
    {
      question: "Can calcific periarthritis come back?",
      answer:
        "It can, either in the same tendon or on the other side. Recurrence is more likely if you have diabetes or a thyroid disorder, so managing those conditions and rebuilding rotator-cuff strength after an attack are the best preventive steps.",
    },
  ],
  related: [
    {
      label: "Shoulder arthritis",
      to: "/conditions/shoulder-arthritis",
      desc: "Pain and stiffness from wear in the shoulder joint itself",
    },
    {
      label: "Shoulder pain relief",
      to: "/guides/shoulder-pain-relief",
      desc: "Physio-aligned mobility and strengthening routine",
    },
    {
      label: "Gout",
      to: "/conditions/gout",
      desc: "The other common crystal-related cause of sudden joint pain",
    },
    {
      label: "Arthritis flare-ups",
      to: "/arthritis-flare-ups",
      desc: "Step-by-step guide to managing a sudden flare",
    },
  ],
};

const CalcificPeriarthritis = () => <ConditionPageTemplate data={data} />;
export default CalcificPeriarthritis;
