import ClusterLandingPage, { type ClusterLandingData } from "@/components/conditions/ClusterLandingPage";

const DATA: ClusterLandingData = {
  path: "/conditions/early-arthritis-symptoms",
  name: "Early signs of arthritis",
  h1: "Early signs of arthritis: symptoms to look out for",
  title: "Early Signs of Arthritis: 7 Symptoms & When to See a GP (UK)",
  description: "The early signs of arthritis explained: joint pain, stiffness, swelling and warmth, how osteoarthritis and inflammatory arthritis start differently, and when to see a GP.",
  question: "What are the first signs of arthritis?",
  answer:
    "The first signs of arthritis are usually joint pain, stiffness, swelling or reduced movement that lasts for more than a few weeks. In osteoarthritis, symptoms tend to start gradually in one or a few joints, such as the knees, hips or the base of the thumb, with brief stiffness after rest and pain that is worse after activity. Inflammatory arthritis, such as rheumatoid or psoriatic arthritis, more often causes warm, swollen joints, morning stiffness lasting more than 30 minutes and tiredness, sometimes in several joints on both sides of the body. See a GP if a joint is swollen or symptoms are not settling: inflammatory arthritis responds best to early treatment.",
  sections: [
    {
      id: "early-signs",
      heading: "7 early signs of arthritis",
      items: [
        "Joint pain that keeps coming back or has lasted more than a few weeks.",
        "Stiffness, especially first thing in the morning or after sitting still.",
        "Swelling around a joint, or a joint that looks puffy or bigger than the other side.",
        "Warmth or redness over a joint.",
        "Reduced movement, such as difficulty making a fist, kneeling or climbing stairs.",
        "Weakness or a joint that feels unstable or gives way.",
        "Feeling unusually tired or generally unwell alongside joint symptoms (more typical of inflammatory arthritis).",
      ],
    },
    {
      id: "oa-vs-inflammatory",
      heading: "How different types of arthritis start",
      links: [
        { to: "/conditions/osteoarthritis", label: "Osteoarthritis", desc: "gradual pain and short-lived stiffness in weight-bearing joints or hands, worse after use" },
        { to: "/blog/signs-rheumatoid-arthritis-early-stages", label: "Rheumatoid arthritis", desc: "swollen, tender joints in the hands and feet, often both sides, with long morning stiffness" },
        { to: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis", desc: "joint pain with psoriasis, a swollen whole finger or toe, or nail changes" },
        { to: "/blog/early-signs-gout-big-toe", label: "Gout", desc: "a sudden, very painful, hot and swollen joint, often the big toe" },
        { to: "/conditions/back-pain", label: "Inflammatory back pain", desc: "long-lasting back pain and morning stiffness starting before age 45" },
        { to: "/blog/thumb-base-pain-early-hand-arthritis", label: "Hand arthritis", desc: "aching at the base of the thumb or knobbly finger joints" },
      ],
    },
    {
      id: "next-steps",
      heading: "What to do if you notice early signs",
      items: [
        "Keep a short diary: which joints, how long stiffness lasts in the morning, and what makes it better or worse.",
        "Stay active with gentle exercise; it helps most types of joint pain.",
        "Try simple self-care for mild symptoms, such as heat or cold packs and pain relief a pharmacist recommends.",
        "Book a GP appointment if symptoms last more than a few weeks or a joint is swollen.",
      ],
      links: [
        { to: "/symptom-checker", label: "Use our symptom checker to organise your symptoms" },
        { to: "/guides/newly-diagnosed", label: "Newly diagnosed? What to expect next" },
      ],
    },
  ],
  readMore: [
    { to: "/blog/signs-rheumatoid-arthritis-early-stages", label: "Signs of rheumatoid arthritis in the early stages" },
    { to: "/blog/early-signs-gout-big-toe", label: "Early signs of gout in the big toe" },
    { to: "/blog/thumb-base-pain-early-hand-arthritis", label: "Thumb base pain: early signs of hand arthritis" },
    { to: "/blog/arthritis-in-young-adults", label: "Arthritis in young adults: recognising it early" },
    { to: "/blog/early-arthritis-intervention-uk", label: "Why early treatment matters in arthritis" },
  ],
  faqs: [
    { q: "What age does arthritis usually start?", a: "It depends on the type. Osteoarthritis usually starts from the mid-40s onwards. Rheumatoid arthritis can start at any age but often begins between 30 and 60. Axial spondyloarthritis usually starts before 45, and children can get juvenile arthritis." },
    { q: "Can a blood test show early arthritis?", a: "There is no single blood test for arthritis. Tests such as CRP, ESR, rheumatoid factor and anti-CCP can support a diagnosis of inflammatory arthritis, but some people with it have normal results. Osteoarthritis is usually diagnosed from your symptoms and an examination, without tests." },
    { q: "Is joint pain always arthritis?", a: "No. Joint pain is often caused by strains, tendon problems or overuse and settles within a few weeks. Pain that persists, or comes with swelling and stiffness, is more likely to be arthritis and is worth getting checked." },
    { q: "Why does early diagnosis matter?", a: "For inflammatory arthritis, NICE recommends urgent referral to a rheumatology team when it is suspected, because early treatment helps control inflammation and protect joints. For osteoarthritis, starting exercise and self-management early helps you stay active." },
  ],
};

export default function EarlyArthritisSymptoms() {
  return <ClusterLandingPage data={DATA} />;
}
