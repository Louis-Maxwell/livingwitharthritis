import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Health", "Lifestyle"],
  slug: "juvenile-arthritis",
  name: "Juvenile Arthritis",
  tagline:
    "Juvenile idiopathic arthritis (JIA) is the most common form of arthritis in children and young people in the UK. With early treatment, most children grow up with full joint function.",
  metaTitle: "Juvenile Arthritis: Symptoms, Types & Treatment for Children",
  metaDescription:
    "UK guide to juvenile idiopathic arthritis (JIA) — symptoms in children, the seven subtypes, biologic treatment, school support and parent advice from Living With Arthritis.",
  keywords:
    "juvenile arthritis, juvenile idiopathic arthritis, JIA, arthritis in children, childhood arthritis, paediatric rheumatology, methotrexate children, biologic therapy children, juvenile arthritis UK, school support arthritis",
  alternateNames: ["JIA", "Juvenile idiopathic arthritis", "Childhood arthritis"],
  whatIs: (
    <>
      <p>
        Juvenile idiopathic arthritis (JIA) covers a group of autoimmune conditions that cause
        joint inflammation in children and young people <strong>under the age of 16</strong>.
        "Idiopathic" simply means the cause is unknown.
      </p>
      <p>
        Around <strong>15,000 children and young people in the UK</strong> live with JIA. Most
        are treated by specialist paediatric rheumatology teams, and modern medicines mean the
        outlook is far better than a generation ago.
      </p>
      <h3>The seven subtypes of JIA</h3>
      <ul>
        <li>Oligoarticular JIA (1–4 joints)</li>
        <li>Polyarticular JIA, rheumatoid factor negative</li>
        <li>Polyarticular JIA, rheumatoid factor positive</li>
        <li>Systemic JIA (Still's disease)</li>
        <li>Psoriatic JIA</li>
        <li>Enthesitis-related arthritis</li>
        <li>Undifferentiated JIA</li>
      </ul>
    </>
  ),
  symptoms: [
    "<strong>Joint pain, swelling or stiffness</strong> lasting more than 6 weeks",
    "Limping — particularly first thing in the morning",
    "Reluctance to use a hand, knee or other joint",
    "Unexplained fevers or rashes (systemic JIA)",
    "Swollen lymph nodes",
    "Eye redness or pain (uveitis — needs urgent eye check)",
    "Slowed growth or unequal limb length in long-standing disease",
  ],
  causes: [
    "Autoimmune — the immune system mistakenly attacks the joint lining",
    "<strong>Genetic predisposition</strong> — certain HLA genes increase risk",
    "Possible environmental triggers (infections, gut bacteria) under research",
    "Not caused by injury, diet or anything parents have done",
  ],
  treatments: [
    "<strong>NSAIDs</strong> for early symptom relief",
    "<strong>Steroid joint injections</strong> — often given under sedation",
    "<strong>Methotrexate</strong> — the most widely used DMARD in JIA",
    "<strong>Biologics</strong> (anti-TNF, IL-1 and IL-6 inhibitors) for resistant disease",
    "<strong>Physiotherapy and occupational therapy</strong> to keep joints moving",
    "<strong>Regular eye screening</strong> for uveitis",
    "School support — Education, Health and Care Plan (EHCP) where needed",
  ],
  diet: (
    <>
      <p>
        Children with JIA need a balanced diet that supports growth, bone density and a
        healthy weight. There is no specific JIA diet.
      </p>
      <ul>
        <li>Plenty of fruit, vegetables and whole grains</li>
        <li>Calcium-rich foods (milk, yoghurt, fortified plant drinks) and vitamin D</li>
        <li>Oily fish or omega-3-fortified foods 1–2 times a week</li>
        <li>Limit sugary drinks and ultra-processed snacks</li>
        <li>Speak to a paediatric dietitian if your child is on long-term steroids</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Regular, age-appropriate movement helps maintain strength, flexibility and bone health.
        Children with JIA can usually take part in PE with sensible adaptations.
      </p>
      <ul>
        <li>Swimming — gentle on joints and great for full-body strength</li>
        <li>Cycling, scootering and dancing</li>
        <li>Physiotherapy-led stretches for affected joints</li>
        <li>Avoid heavy contact sports during active flares</li>
        <li>Talk to school PE staff so activities can be adapted, not avoided</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "What are the first signs of arthritis in a child?",
      answer:
        "Look out for limping (worse in the morning), a swollen joint, a child avoiding a normally favourite activity, or unexplained fevers and rashes. Always see your GP if joint symptoms last more than two weeks.",
    },
    {
      question: "Is juvenile arthritis the same as rheumatoid arthritis?",
      answer:
        "No. JIA is its own group of conditions. Some forms behave similarly to rheumatoid arthritis, but JIA also includes types not seen in adults, such as systemic JIA (Still's disease).",
    },
    {
      question: "Will my child grow out of JIA?",
      answer:
        "Some children — particularly those with oligoarticular JIA — do go into long-term remission. Others have ongoing disease into adulthood. Modern treatments have transformed the outlook for most.",
    },
    {
      question: "Why does my child need eye checks?",
      answer:
        "JIA can cause silent eye inflammation (uveitis) that, if missed, can damage sight. Regular slit-lamp checks by an ophthalmologist are essential.",
    },
    {
      question: "Can my child still play sport?",
      answer:
        "Yes — sport is encouraged. Swimming and cycling are particularly good. Adapt during flares and work with the rheumatology team and PE staff.",
    },
  ],
  related: [
    {
      label: "Rheumatoid arthritis",
      to: "/conditions/rheumatoid-arthritis",
      desc: "Adult autoimmune arthritis with shared treatments",
    },
    {
      label: "Community & peer support",
      to: "/community",
      desc: "Connect with other families living with arthritis",
    },
    {
      label: "Advice Hub",
      to: "/blog-hub",
      desc: "Diet, exercise, flare-ups and treatment guides",
    },
    {
      label: "FAQs",
      to: "/faq",
      desc: "Quick answers from UK clinicians",
    },
  ],
};

const JuvenileArthritis = () => <ConditionPageTemplate data={data} />;
export default JuvenileArthritis;
