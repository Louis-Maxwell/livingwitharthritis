import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Exercise", "Treatment"],
  slug: "ankylosing-spondylitis",
  name: "Ankylosing Spondylitis",
  tagline:
    "Ankylosing spondylitis (AS) is a long-term inflammatory arthritis that mainly affects the spine and pelvis. Early diagnosis and the right exercise programme can keep you mobile for life.",
  metaTitle: "Ankylosing Spondylitis: Symptoms, Causes & Treatment",
  metaDescription:
    "UK guide to ankylosing spondylitis — back pain symptoms, HLA-B27 testing, biologic treatment and the daily stretches that protect your spine. Written for patients.",
  keywords:
    "ankylosing spondylitis, AS, axial spondyloarthritis, spinal arthritis, lower back pain young adult, HLA-B27, biologic therapy, ankylosing spondylitis exercises, ankylosing spondylitis UK, inflammatory back pain, NASS",
  alternateNames: ["AS", "Axial spondyloarthritis", "Bechterew's disease"],
  whatIs: (
    <>
      <p>
        Ankylosing spondylitis is a type of <strong>inflammatory arthritis</strong> where the
        body's immune system attacks the joints between the spine and pelvis (the sacroiliac
        joints). Over time, inflammation can cause spinal vertebrae to fuse, reducing
        flexibility.
      </p>
      <p>
        It usually starts between the ages of <strong>17 and 45</strong> and affects roughly
        1 in 200 adults in the UK. With early diagnosis, modern biologic treatments and a
        consistent exercise programme, most people stay active and well.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Slow-onset lower back and buttock pain</strong> lasting more than 3 months",
    "<strong>Morning stiffness</strong> lasting 30 minutes or more",
    "Pain that <strong>improves with movement</strong> and worsens with rest",
    "Night pain — often waking you in the second half of the night",
    "Stiffness in the neck, hips or chest wall",
    "Fatigue from chronic inflammation",
    "Eye inflammation (uveitis) — red, painful, light-sensitive eyes",
  ],
  causes: [
    "<strong>HLA-B27 gene</strong> — present in around 90% of UK patients with AS",
    "<strong>Family history</strong> of AS or related conditions",
    "<strong>Male sex</strong> — historically thought more common in men, though women are often under-diagnosed",
    "Age — most cases begin in late teens to mid-40s",
    "Possible link to gut bacteria and inflammatory bowel disease",
  ],
  treatments: [
    "<strong>Daily exercise and physiotherapy</strong> — the single most important treatment",
    "<strong>NSAIDs</strong> (ibuprofen, naproxen) for inflammation and stiffness",
    "<strong>Biologic medicines</strong> (anti-TNF, IL-17 inhibitors) for active disease",
    "<strong>JAK inhibitors</strong> for cases unresponsive to biologics",
    "Posture awareness — sleep on a firm mattress with a thin pillow",
    "Stop smoking — smoking accelerates spinal damage in AS",
  ],
  diet: (
    <>
      <p>
        No single diet cures AS, but an <strong>anti-inflammatory Mediterranean pattern</strong>
        helps reduce systemic inflammation and supports a healthy weight, which protects the
        spine and joints.
      </p>
      <ul>
        <li>Oily fish 2–3 times a week (salmon, mackerel, sardines)</li>
        <li>Plenty of vegetables, fruit, legumes and whole grains</li>
        <li>Olive oil as the main added fat</li>
        <li>Limit red meat, ultra-processed food and added sugar</li>
        <li>Vitamin D and calcium for bone health — speak to your GP about levels</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Exercise is the cornerstone of AS care. Aim for{" "}
        <strong>at least 30 minutes of movement most days</strong>, including:
      </p>
      <ul>
        <li><strong>Spinal extension</strong> — cat-cow, cobra and prone press-ups</li>
        <li><strong>Postural exercises</strong> — chin tucks, shoulder retractions</li>
        <li><strong>Deep breathing</strong> to maintain chest expansion</li>
        <li><strong>Swimming and hydrotherapy</strong> — buoyancy reduces joint load</li>
        <li><strong>Pilates and yoga</strong> tailored to AS</li>
        <li><strong>Strength work</strong> for back, glutes and core</li>
      </ul>
      <p>
        Avoid contact sports and high-impact movements that risk spinal injury once fusion has
        begun.
      </p>
    </>
  ),
  faqs: [
    {
      question: "What is the first sign of ankylosing spondylitis?",
      answer:
        "The earliest sign is usually persistent lower back or buttock pain that comes on slowly before age 45, is worse in the morning, lasts over 30 minutes and improves with movement.",
    },
    {
      question: "Is ankylosing spondylitis a disability?",
      answer:
        "AS is recognised under the UK Equality Act 2010 as it can have a long-term substantial effect on daily activities. Many people qualify for reasonable adjustments at work and may be eligible for PIP.",
    },
    {
      question: "Can ankylosing spondylitis be cured?",
      answer:
        "There is no cure, but biologics, NSAIDs and daily exercise can keep inflammation under control and prevent spinal damage for most people.",
    },
    {
      question: "What is the HLA-B27 test?",
      answer:
        "A blood test that checks for the HLA-B27 gene, found in around 90% of UK people with AS. A positive test alone doesn't diagnose AS — it's used alongside symptoms and MRI scans.",
    },
    {
      question: "Should I exercise if my back hurts?",
      answer:
        "Yes — gentle, regular movement is the single most important treatment for AS. Pain that eases with activity is typical. A physiotherapist can build a safe, progressive programme.",
    },
  ],
  related: [
    {
      label: "Exercise Hub",
      to: "/exercises",
      desc: "Joint-by-joint movement plans, including spine and posture",
    },
    {
      label: "Rheumatoid arthritis",
      to: "/conditions/rheumatoid-arthritis",
      desc: "Another autoimmune arthritis — symptoms and treatment",
    },
    {
      label: "Psoriatic arthritis",
      to: "/conditions/psoriatic-arthritis",
      desc: "Closely related to AS, also in the spondyloarthritis family",
    },
    {
      label: "Help while waiting for rheumatology",
      to: "/arthritis-waiting-list-help",
      desc: "What to do during long referral waits",
    },
  ],
};

const AnkylosingSpondylitis = () => <ConditionPageTemplate data={data} />;
export default AnkylosingSpondylitis;
