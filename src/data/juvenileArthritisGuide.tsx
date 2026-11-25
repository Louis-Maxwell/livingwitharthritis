import type { ConditionPageData } from "@/components/conditions/ConditionPageTemplate";
import safety from "./childArthritisSafety.json";

export const juvenileArthritisData: ConditionPageData = {
  blogCategories: ["Health", "Lifestyle"],
  slug: "juvenile-arthritis",
  reviewStatus: "pending",
  sources: safety.sources,
  name: "Juvenile Arthritis",
  tagline:
    "Juvenile idiopathic arthritis (JIA) is a group of conditions causing joint inflammation that starts before age 16. A child with joint problems or an unexplained limp needs assessment; do not wait for symptoms to last a set number of weeks.",
  metaTitle: "Juvenile Arthritis: Symptoms, Types & Treatment for Children",
  metaDescription:
    "Child-specific JIA information: when to get help for a limp or joint symptoms, eye screening, paediatric treatment and adapted activity. Living With Arthritis.",
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
        A paediatric rheumatology team assesses and treats JIA. The outlook and treatment
        vary between children. This guide cannot predict a child's long-term joint function.
      </p>

    </>
  ),
  symptoms: [
    "<strong>Joint pain, swelling or stiffness</strong>: seek assessment rather than waiting six weeks",
    "Limping — particularly first thing in the morning",
    "Reluctance to use a hand, knee or other joint",
    "Unexplained fevers or rashes (systemic JIA)",
    "Swollen lymph nodes",
    "Eye inflammation (uveitis) can be silent; attend screening even without eye symptoms",
    "Slowed growth or unequal limb length in long-standing disease",
  ],
  causes: [
    "In JIA the immune system attacks the joints; why this happens is not fully understood",
    "JIA is not something a child catches from another person",
    "Nothing a child or parent did or did not do caused their JIA",
  ],
  treatments: [
    "An individual treatment and monitoring plan from paediatric rheumatology",
    "Medicines to control inflammation, selected and monitored for the child",
    "Joint steroid injections when the specialist team recommends them",
    "Paediatric physiotherapy, occupational therapy and pain-management support",
    "Specialist eye screening even when the eyes look and feel normal",
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
        <li>Discuss food choices and any supplements with the paediatric team</li>
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
        "Look out for limping, a swollen or stiff joint, or reluctance to use a limb. Arrange a GP assessment for joint problems or an unexplained limp. Do not wait two or six weeks. Use the emergency advice on this page for sudden hip, knee or thigh pain, inability to bear weight or an unwell child.",
    },
    {
      question: "Is juvenile arthritis the same as rheumatoid arthritis?",
      answer:
        "No. JIA is its own group of conditions. Some forms behave similarly to rheumatoid arthritis, but JIA also includes types not seen in adults, such as systemic JIA (Still's disease).",
    },
    {
      question: "Will my child grow out of JIA?",
      answer:
        "The course varies between children. Ask the paediatric rheumatology team about your child's condition, treatment goals and follow-up. Improvement is not a reason to stop treatment or eye screening without the team's advice.",
    },
    {
      question: "Why does my child need eye checks?",
      answer:
        "JIA can cause silent eye inflammation (uveitis) that, if missed, can damage sight. Regular slit-lamp checks by an ophthalmologist are essential.",
    },
    {
      question: "Can my child still play sport?",
      answer:
        "When JIA is assessed and well controlled, children can often take part in activities they enjoy. The paediatric physiotherapist and school should agree adaptations for the individual child, particularly during a flare or after a procedure. Do not apply an adult exercise programme to a child.",
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
