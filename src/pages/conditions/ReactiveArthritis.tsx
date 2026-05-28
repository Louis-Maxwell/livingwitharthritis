import ConditionPageTemplate, { type ConditionPageData } from "@/components/conditions/ConditionPageTemplate";

const data: ConditionPageData = {
  blogCategories: ["Inflammatory", "Young Adults"],
  slug: "reactive-arthritis",
  name: "Reactive Arthritis",
  tagline:
    "Reactive arthritis causes joint pain and swelling that develops after an infection, usually in the gut or urinary tract. For most people it settles within six months — but early treatment makes a real difference.",
  metaTitle: "Reactive Arthritis: UK Symptoms, Causes & Treatment",
  metaDescription:
    "UK guide to reactive arthritis — joint pain after gut or urinary infection, symptoms, NICE-aligned treatment and recovery. Written for patients by Living With Arthritis.",
  keywords:
    "reactive arthritis, reactive arthritis symptoms, reactive arthritis treatment, post infection arthritis, Reiter's syndrome, joint pain after stomach bug, joint pain after chlamydia, HLA-B27, reactive arthritis UK, swollen knee after infection, sausage toe",
  alternateNames: ["Reiter's syndrome (historical term)", "Post-infectious arthritis"],
  whatIs: (
    <>
      <p>
        Reactive arthritis is joint pain and swelling that develops as a reaction to an infection
        somewhere else in the body — most often a gut infection (such as salmonella or
        campylobacter) or a sexually transmitted infection (most commonly chlamydia). Symptoms
        usually appear 1–4 weeks after the original infection has settled.
      </p>
      <p>
        It most commonly affects adults aged <strong>20–40</strong>, and around <strong>4 in
        every 100,000 people in the UK</strong> are diagnosed each year. Most people make a full
        recovery within 3 to 6 months.
      </p>
    </>
  ),
  symptoms: [
    "<strong>Pain and swelling</strong> in one or a few large joints — often the knee, ankle or foot",
    "<strong>Sausage-like swelling</strong> of a whole finger or toe (dactylitis)",
    "<strong>Heel pain</strong> from inflamed tendons (enthesitis), especially the Achilles",
    "Low back or buttock pain from inflammation of the sacroiliac joints",
    "<strong>Eye redness or irritation</strong> (conjunctivitis or uveitis)",
    "Painless mouth ulcers or a skin rash on the palms or soles",
    "Burning when passing urine, even without an active infection",
  ],
  causes: [
    "<strong>Gut infections</strong> — salmonella, shigella, campylobacter, yersinia",
    "<strong>Sexually transmitted infections</strong> — most commonly chlamydia",
    "Throat or chest infections (less common)",
    "<strong>HLA-B27 gene</strong> — present in around 70% of people with reactive arthritis and linked to more severe disease",
    "Age 20–40 and male sex (slightly higher risk for STI-triggered cases)",
    "Family history of reactive arthritis, psoriasis or ankylosing spondylitis",
  ],
  treatments: [
    "<strong>Treat the underlying infection</strong> — antibiotics for chlamydia and any active gut or urinary infection",
    "<strong>NSAIDs</strong> (ibuprofen, naproxen) — first-line for joint pain and swelling",
    "<strong>Steroid joint injections</strong> for badly affected single joints",
    "<strong>Short course of steroid tablets</strong> for severe, multi-joint flares",
    "<strong>Sulfasalazine or methotrexate</strong> (DMARDs) if symptoms last beyond 3–6 months",
    "Physiotherapy to restore movement and strength",
    "Urgent eye assessment if vision changes or eye pain develop",
  ],
  diet: (
    <>
      <p>
        There is no specific diet for reactive arthritis, but an <strong>anti-inflammatory,
        Mediterranean-style pattern</strong> supports recovery and reduces flare risk.
      </p>
      <h3>Eat more</h3>
      <ul>
        <li>Oily fish (salmon, sardines, mackerel) twice a week for omega-3</li>
        <li>Fruit, vegetables and wholegrains for antioxidants and fibre</li>
        <li>Olive oil, nuts, seeds, beans and lentils</li>
        <li>Live yoghurt or kefir if recovering from a gut infection</li>
      </ul>
      <h3>Limit</h3>
      <ul>
        <li>Ultra-processed food, refined sugar and sugary drinks</li>
        <li>Alcohol — particularly while taking NSAIDs or antibiotics</li>
        <li>Anything that recently caused gut symptoms, until your gut settles</li>
      </ul>
    </>
  ),
  exercise: (
    <>
      <p>
        Movement is medicine — once acute swelling settles, gentle exercise restores range and
        prevents stiffness. Rest the most painful joints during a flare, but keep the rest of the
        body moving.
      </p>
      <ul>
        <li>Daily range-of-movement exercises for affected joints</li>
        <li>Swimming or aqua-aerobics — buoyancy unloads sore knees and ankles</li>
        <li>Stationary cycling for the knees and hips</li>
        <li>Pilates or yoga for core strength and spinal mobility</li>
        <li>Gradual return to walking and low-impact cardio as symptoms improve</li>
      </ul>
    </>
  ),
  faqs: [
    {
      question: "What is reactive arthritis?",
      answer:
        "Reactive arthritis is joint inflammation triggered by an infection elsewhere in the body — usually a gut infection (such as salmonella) or a sexually transmitted infection (most often chlamydia). Symptoms typically appear 1–4 weeks after the original infection.",
    },
    {
      question: "How long does reactive arthritis last?",
      answer:
        "Most people recover fully within 3 to 6 months. Around 1 in 5 develop longer-lasting joint problems, and a smaller number go on to develop a chronic inflammatory arthritis, which is why early specialist input matters.",
    },
    {
      question: "Is reactive arthritis curable?",
      answer:
        "Yes — for most people reactive arthritis settles completely once the triggering infection clears and inflammation is treated. NSAIDs, joint injections and physiotherapy speed recovery.",
    },
    {
      question: "Can reactive arthritis come back?",
      answer:
        "It can. People with the HLA-B27 gene are more likely to have repeat episodes, often triggered by a new gut or urinary infection. Practising food hygiene and safer sex reduces the risk.",
    },
    {
      question: "How is reactive arthritis diagnosed in the UK?",
      answer:
        "Your GP will ask about recent gut, urinary or chest infections and examine your joints, eyes and skin. Blood tests (CRP, ESR, HLA-B27), urine tests and sometimes joint fluid analysis or imaging are used to confirm the diagnosis and rule out other arthritis.",
    },
    {
      question: "Is reactive arthritis contagious?",
      answer:
        "No. Reactive arthritis itself cannot be passed from person to person. However, the infections that trigger it (such as chlamydia or salmonella) can be — so treating partners and practising good food hygiene matters.",
    },
    {
      question: "What is the difference between reactive arthritis and rheumatoid arthritis?",
      answer:
        "Reactive arthritis is triggered by a recent infection, usually affects one or a few large joints, and most people recover within months. Rheumatoid arthritis is a lifelong autoimmune disease that typically affects small joints on both sides of the body and needs long-term medication.",
    },
  ],
  related: [
    {
      label: "Ankylosing spondylitis",
      to: "/conditions/ankylosing-spondylitis",
      desc: "Another HLA-B27 linked inflammatory arthritis",
    },
    {
      label: "Anti-inflammatory diet",
      to: "/diet",
      desc: "Mediterranean meal plans to support recovery",
    },
    {
      label: "Arthritis flare-ups",
      to: "/arthritis-flare-ups",
      desc: "Step-by-step guide to managing a sudden flare",
    },
    {
      label: "Advice Hub",
      to: "/blog-hub",
      desc: "Browse arthritis guidance by topic",
    },
  ],
};

const ReactiveArthritis = () => <ConditionPageTemplate data={data} />;
export default ReactiveArthritis;
