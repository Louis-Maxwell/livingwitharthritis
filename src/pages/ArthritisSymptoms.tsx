import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AnswerBox from "@/components/seo/AnswerBox";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations, { type Citation } from "@/components/blog/ArticleCitations";
import { buildBreadcrumb, injectJsonLd } from "@/lib/jsonLd";

const BASE = "https://livingwitharthritis.org.uk";
const PATH = "/arthritis-symptoms";
const URL = `${BASE}${PATH}`;
const REVIEWED = "2026-10-14";

const citations: Citation[] = [
  {
    label: "Osteoarthritis",
    url: "https://www.nhs.uk/conditions/osteoarthritis/",
    publisher: "NHS",
  },
  {
    label: "Rheumatoid arthritis",
    url: "https://www.nhs.uk/conditions/rheumatoid-arthritis/",
    publisher: "NHS",
  },
  {
    label: "Osteoarthritis in over 16s: diagnosis and management (NG226)",
    url: "https://www.nice.org.uk/guidance/ng226",
    publisher: "NICE",
  },
  {
    label: "Exercise and arthritis",
    url: "https://www.arthritis-uk.org/information-and-support/living-with-arthritis/health-and-wellbeing/exercising-with-arthritis/",
    publisher: "Arthritis UK",
  },
];

const symptomGroups = [
  {
    title: "Common arthritis symptoms",
    items: [
      "Joint pain that lasts more than two weeks",
      "Stiffness after rest or first thing in the morning",
      "Swelling, warmth or tenderness around a joint",
      "Reduced range of movement or difficulty gripping, walking or climbing stairs",
      "Crepitus: grating, clicking or crunching sensations",
      "Fatigue, low mood or sleep disruption from persistent pain",
    ],
  },
  {
    title: "Symptoms that suggest inflammatory arthritis",
    items: [
      "Morning stiffness lasting more than 30-60 minutes",
      "Swelling in several joints, especially both hands or feet",
      "Pain that improves as you move rather than worsening with use",
      "Unexplained fatigue, feverish feelings or weight loss",
      "Psoriasis, eye inflammation, bowel symptoms or recent infection alongside joint pain",
    ],
  },
  {
    title: "Symptoms that suggest osteoarthritis",
    items: [
      "Pain that worsens with activity and eases with rest",
      "Short-lived stiffness after sitting or first thing in the morning",
      "Knee, hip, hand, spine or foot pain that builds gradually",
      "Bony enlargement or reduced movement in one or a few joints",
      "Flare-ups after heavier activity, cold weather or poor sleep",
    ],
  },
];

const faqs = [
  {
    q: "What are the first signs of arthritis?",
    a: "Early arthritis often starts with joint pain, stiffness, swelling or reduced movement that lasts more than two weeks. Morning stiffness, warmth around a joint, or symptoms affecting several joints should be discussed with a GP.",
  },
  {
    q: "How do I know if joint pain is arthritis?",
    a: "Arthritis is more likely when pain is linked with stiffness, swelling, reduced movement, warmth, crepitus, or repeated flare-ups. A clinician may examine the joint and use blood tests or imaging to identify the type.",
  },
  {
    q: "When are arthritis symptoms urgent?",
    a: "Seek same-day help for a very hot, red, swollen joint, fever, sudden severe pain after injury, inability to weight-bear, new weakness, or feeling very unwell with joint swelling.",
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="prose prose-lg max-w-none text-foreground/85 prose-a:text-primary prose-a:underline prose-li:leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function ArthritisSymptoms() {
  useEffect(() => {
    const medicalWebPage = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${URL}#medicalwebpage`,
      url: URL,
      name: "Arthritis Symptoms: Early Signs, Red Flags and When to See a GP",
      description:
        "UK guide to arthritis symptoms, including early signs, osteoarthritis symptoms, inflammatory arthritis warning signs, red flags and when to seek clinical help.",
      inLanguage: "en-GB",
      isPartOf: { "@id": `${BASE}/#website` },
      publisher: { "@id": `${BASE}/#organization` },
      medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
      specialty: ["Rheumatology", "Physiotherapy"],
      lastReviewed: REVIEWED,
      reviewedBy: {
        "@type": "Person",
        name: "Louis Maxwell",
        alternateName: "Maxwell",
        jobTitle: "First Contact Practitioner",
        identifier: "HCPC PH128483",
        url: `${BASE}/authors/maxwell`,
      },
      about: {
        "@type": "MedicalCondition",
        name: "Arthritis",
        signOrSymptom: [
          "Joint pain",
          "Joint stiffness",
          "Joint swelling",
          "Reduced range of motion",
          "Fatigue",
          "Morning stiffness",
        ],
      },
    };
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: "Home", path: "/" },
      { name: "Arthritis", path: "/conditions/arthritis" },
      { name: "Arthritis symptoms", path: PATH },
    ]);
    const c1 = injectJsonLd("arthritis-symptoms-medical-webpage", medicalWebPage);
    const c2 = injectJsonLd("arthritis-symptoms-faq", faq);
    const c3 = injectJsonLd("arthritis-symptoms-breadcrumb", breadcrumb);
    return () => {
      c1();
      c2();
      c3();
    };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Arthritis Symptoms UK"
        description="Arthritis symptoms guide: early signs, osteoarthritis vs inflammatory arthritis, red flags and when to see a GP in the UK."
        path={PATH}
        type="article"
        keywords="arthritis symptoms, early signs of arthritis, arthritis symptoms UK, joint pain symptoms, inflammatory arthritis symptoms"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/conditions/arthritis" className="hover:text-primary">Arthritis</Link> /{" "}
        <span>Symptoms</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        Arthritis symptoms: early signs, red flags and when to see a GP
      </h1>
      <p className="speakable-intro text-xl text-muted-foreground leading-relaxed mb-6">
        Arthritis symptoms usually include joint pain, stiffness, swelling or reduced
        movement. The pattern matters: osteoarthritis often worsens with use, while
        inflammatory arthritis often causes longer morning stiffness and swollen joints.
      </p>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="October 2026" />

      <AnswerBox question="What symptoms suggest arthritis?" reviewed={REVIEWED}>
        Arthritis is more likely when joint pain lasts longer than two weeks and is
        linked with stiffness, swelling, warmth, reduced movement or repeated flare-ups.
        A very hot swollen joint, fever, sudden severe pain, or inability to weight-bear
        needs urgent clinical advice.
      </AnswerBox>

      <section className="grid gap-4 md:grid-cols-3 my-10">
        {symptomGroups.map((group) => (
          <div key={group.title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold mb-3">{group.title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/85">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <Section title="Arthritis symptoms by pattern">
        <p>
          Searchers often ask whether their pain is "just age", a strain, or arthritis.
          The safest answer is to look at the pattern and get assessed if symptoms
          persist. <Link to="/conditions/osteoarthritis">Osteoarthritis</Link> commonly
          affects knees, hips, hands and the spine, while{" "}
          <Link to="/conditions/rheumatoid-arthritis">rheumatoid arthritis</Link> often
          affects several small joints symmetrically.
        </p>
        <ul>
          <li><strong>Mechanical pattern:</strong> pain builds with activity and eases with rest.</li>
          <li><strong>Inflammatory pattern:</strong> prolonged morning stiffness, swelling and symptoms improving with movement.</li>
          <li><strong>Flare pattern:</strong> symptoms vary over days or weeks and may be triggered by activity, illness, stress or sleep disruption.</li>
        </ul>
      </Section>

      <Section title="When to ask for clinical help">
        <p>
          Book a GP or first-contact practitioner appointment if symptoms last more
          than two weeks, interfere with walking, work or sleep, or keep returning.
          Earlier assessment is especially important for suspected inflammatory
          arthritis, because treatment works best when started early.
        </p>
        <p>
          Seek same-day help if a joint is very hot, red and swollen, you have a fever,
          you cannot weight-bear, or symptoms started after a significant injury.
        </p>
      </Section>

      <Section title="Next steps after symptoms">
        <ul>
          <li><Link to="/arthritis-treatment">Compare arthritis treatment options</Link>.</li>
          <li><Link to="/guides/arthritis-pain-relief">Start with arthritis pain relief</Link>.</li>
          <li><Link to="/guides/exercise">Use a safe arthritis exercise plan</Link>.</li>
          <li><Link to="/living-with-arthritis">Read the complete living with arthritis guide</Link>.</li>
          <li><Link to="/guides/benefits-pip">Check PIP and benefits guidance</Link> if symptoms affect daily living or mobility.</li>
        </ul>
      </Section>

      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        {faqs.map((faq) => (
          <div key={faq.q} className="mb-5">
            <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
            <p className="text-foreground/85 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </section>

      <ArticleCitations citations={citations} />
      <EducationalDisclaimerBox lastReviewed={REVIEWED} />
    </article>
  );
}
