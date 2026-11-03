import ClusterLandingPage, { type ClusterLandingData } from "@/components/conditions/ClusterLandingPage";

const DATA: ClusterLandingData = {
  path: "/conditions/back-pain",
  name: "Back pain and arthritis",
  h1: "Back pain and arthritis: is it arthritis, and what helps?",
  title: "Is My Back Pain Arthritis? Signs, Types & When to See a GP",
  description: "How to tell if back pain could be arthritis: wear-related spinal changes vs inflammatory back pain (axial SpA), self-help that works, red flags and when to see a GP.",
  question: "Is my back pain caused by arthritis?",
  answer:
    "Most back pain is not caused by arthritis and gets better on its own within a few weeks with keeping active and simple pain relief. Arthritis is more likely when back pain keeps coming back or lasts for months. Wear-related changes in the spine (spondylosis, a form of osteoarthritis) usually cause stiffness that eases as you get moving and aches more after activity. Inflammatory back pain, from axial spondyloarthritis (including ankylosing spondylitis), typically starts before age 45, lasts more than 3 months, is worse in the morning or at night and improves with exercise rather than rest. If that pattern sounds familiar, see a GP: inflammatory back pain needs a rheumatology assessment.",
  sections: [
    {
      id: "types",
      heading: "Types of arthritis that cause back pain",
      links: [
        { to: "/blog/spinal-arthritis-back-pain-uk", label: "Spinal arthritis (spondylosis)", desc: "wear-related changes in the spine's joints and discs, more common with age; our in-depth guide" },
        { to: "/conditions/axial-spondyloarthritis", label: "Axial spondyloarthritis", desc: "inflammatory arthritis of the spine and pelvis, often starting in young adults" },
        { to: "/conditions/ankylosing-spondylitis", label: "Ankylosing spondylitis", desc: "the form of axial spondyloarthritis that shows changes on X-ray" },
        { to: "/conditions/psoriatic-arthritis", label: "Psoriatic arthritis", desc: "can affect the spine as well as the joints, in people with psoriasis" },
      ],
    },
    {
      id: "mechanical-vs-inflammatory",
      heading: "Wear-related or inflammatory? Patterns to notice",
      intro: "No single sign proves either type, but these patterns help you describe your symptoms to a GP:",
      items: [
        "Wear-related (mechanical): stiffness for a short time after rest, aching that is worse after activity or at the end of the day, more common from middle age.",
        "Inflammatory: back pain that began gradually before age 45 and has lasted more than 3 months.",
        "Inflammatory: morning stiffness lasting longer than 30 minutes, or pain that wakes you in the second half of the night.",
        "Inflammatory: pain that improves with exercise but not with rest, sometimes with buttock pain that alternates sides.",
        "Inflammatory: other clues such as psoriasis, inflammatory bowel disease, uveitis (a painful red eye) or a close relative with spondyloarthritis.",
      ],
    },
    {
      id: "self-help",
      heading: "What helps back pain",
      intro: "NHS and NICE guidance for back pain focuses on staying active:",
      items: [
        "Keep moving and carry on with daily activities as much as you can; bed rest tends to slow recovery.",
        "Regular exercise such as walking, swimming, yoga, pilates or a structured programme from a physiotherapist.",
        "Heat, and pain relief such as anti-inflammatory medicines if they are suitable for you (check with a pharmacist).",
        "If you have inflammatory back pain, daily stretching and exercise are a core part of treatment alongside medicines from a rheumatology team.",
      ],
      links: [{ to: "/blog/back-arthritis-exercises-uk", label: "Exercises for back arthritis" }],
    },
  ],
  readMore: [
    { to: "/blog/spinal-arthritis-back-pain-uk", label: "Spinal arthritis and back pain: symptoms, treatment and self-help" },
    { to: "/blog/lower-back-stiffness-worse-after-sitting", label: "Lower back stiffness that is worse after sitting" },
    { to: "/blog/back-arthritis-exercises-uk", label: "Best exercises for back arthritis" },
    { to: "/blog/cauda-equina-warning-signs-uk", label: "Cauda equina warning signs: when to go to A&E" },
  ],
  faqs: [
    { q: "How do I know if my back pain is arthritis?", a: "You usually cannot tell on your own. Back pain that keeps coming back or lasts for months is worth discussing with a GP or physiotherapist, who will ask about the pattern of pain and stiffness and examine you. Inflammatory back pain, which starts before age 45, lasts over 3 months and is worse in the morning, may need blood tests, scans and a rheumatology referral." },
    { q: "Do I need an X-ray or MRI for back pain?", a: "Usually not. NICE advises against routine imaging for low back pain in non-specialist settings, because scan findings often do not match symptoms. Imaging may be used if a specialist suspects a specific cause, such as axial spondyloarthritis." },
    { q: "Is walking good for arthritis in the back?", a: "For most people, yes. Staying active is one of the most helpful things for back pain, and walking is an easy way to start. Build up gradually and pace yourself on bad days." },
    { q: "Can young people get arthritis in the back?", a: "Yes. Axial spondyloarthritis, including ankylosing spondylitis, usually starts in the late teens to mid-40s. Long-lasting back pain and morning stiffness in a younger adult should be checked by a GP." },
  ],
};

export default function BackPain() {
  return <ClusterLandingPage data={DATA} />;
}
