import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AnswerBox from "@/components/seo/AnswerBox";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations, { type Citation } from "@/components/blog/ArticleCitations";
import { buildBreadcrumb, injectJsonLd } from "@/lib/jsonLd";

const BASE = "https://livingwitharthritis.org.uk";
const PATH = "/arthritis-treatment";
const URL = `${BASE}${PATH}`;
const REVIEWED = "2026-10-14";

const citations: Citation[] = [
  {
    label: "Osteoarthritis in over 16s: diagnosis and management (NG226)",
    url: "https://www.nice.org.uk/guidance/ng226",
    publisher: "NICE",
  },
  {
    label: "Rheumatoid arthritis in adults: management (NG100)",
    url: "https://www.nice.org.uk/guidance/ng100",
    publisher: "NICE",
  },
  {
    label: "NSAIDs (non-steroidal anti-inflammatory drugs)",
    url: "https://www.nhs.uk/conditions/nsaids/",
    publisher: "NHS",
  },
  {
    label: "Steroid injections",
    url: "https://www.nhs.uk/conditions/steroid-injections/",
    publisher: "NHS",
  },
  {
    label: "Exercise and arthritis",
    url: "https://www.arthritis-uk.org/information-and-support/living-with-arthritis/health-and-wellbeing/exercising-with-arthritis/",
    publisher: "Arthritis UK",
  },
];

const treatmentGroups = [
  {
    title: "Core self-management",
    links: [
      { label: "Exercise for arthritis", href: "/guides/exercise" },
      { label: "Arthritis pain relief", href: "/guides/arthritis-pain-relief" },
      { label: "Mediterranean diet for arthritis", href: "/diet/mediterranean-diet-for-arthritis" },
    ],
    copy: "Movement, strengthening, weight support where relevant, sleep and pacing are the foundation for most arthritis treatment plans.",
  },
  {
    title: "Medicines and injections",
    links: [
      { label: "Painkillers and NSAIDs", href: "/guides/painkillers-and-nsaids" },
      { label: "Steroids guide", href: "/guides/steroids-for-arthritis" },
      { label: "Rheumatoid arthritis", href: "/conditions/rheumatoid-arthritis" },
    ],
    copy: "Treatment may include topical NSAIDs, oral medicines, steroid injections, DMARDs or biologics depending on arthritis type and risk.",
  },
  {
    title: "Support and escalation",
    links: [
      { label: "Waiting-list help", href: "/arthritis-waiting-list-help" },
      { label: "Knee replacement guide", href: "/guides/knee-replacement-surgery" },
      { label: "PIP and benefits", href: "/guides/benefits-pip" },
    ],
    copy: "If symptoms limit daily life, treatment also includes referral, workplace changes, home adaptations, benefits evidence and surgery discussions when appropriate.",
  },
];

const faqs = [
  {
    q: "What is the best treatment for arthritis?",
    a: "The best treatment depends on the arthritis type. Osteoarthritis treatment usually starts with exercise, weight support where relevant, topical anti-inflammatory medicines and pacing. Inflammatory arthritis usually needs early rheumatology care and medicines such as DMARDs.",
  },
  {
    q: "Can arthritis be treated without surgery?",
    a: "Yes. Most arthritis treatment is non-surgical: exercise, physiotherapy, medicines, pacing, weight support, sleep, joint protection and injections where suitable. Surgery is usually considered when symptoms remain severe despite conservative care.",
  },
  {
    q: "When should arthritis treatment be escalated?",
    a: "Ask for review if pain wakes you at night, function is worsening, you rely on regular painkillers, a joint is repeatedly swollen, or symptoms suggest inflammatory arthritis such as prolonged morning stiffness and multiple swollen joints.",
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

export default function ArthritisTreatment() {
  useEffect(() => {
    const medicalWebPage = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${URL}#medicalwebpage`,
      url: URL,
      name: "Arthritis Treatment Options in the UK",
      description:
        "UK guide to arthritis treatment options: exercise, physiotherapy, pain relief, anti-inflammatory medicines, injections, DMARDs, biologics, surgery and self-management.",
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
        possibleTreatment: [
          { "@type": "MedicalTherapy", name: "Therapeutic exercise" },
          { "@type": "Drug", name: "NSAIDs" },
          { "@type": "MedicalTherapy", name: "Physiotherapy" },
          { "@type": "MedicalTherapy", name: "Steroid injection" },
          { "@type": "MedicalTherapy", name: "DMARDs and biologic medicines" },
          { "@type": "MedicalProcedure", name: "Joint replacement surgery" },
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
      { name: "Arthritis treatment", path: PATH },
    ]);
    const c1 = injectJsonLd("arthritis-treatment-medical-webpage", medicalWebPage);
    const c2 = injectJsonLd("arthritis-treatment-faq", faq);
    const c3 = injectJsonLd("arthritis-treatment-breadcrumb", breadcrumb);
    return () => {
      c1();
      c2();
      c3();
    };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Arthritis Treatment UK"
        description="Arthritis treatment options in the UK: exercise, pain relief, physiotherapy, medicines, injections, DMARDs, surgery and when to seek review."
        path={PATH}
        type="article"
        keywords="arthritis treatment, arthritis treatment UK, arthritis pain treatment, osteoarthritis treatment, rheumatoid arthritis treatment"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/conditions/arthritis" className="hover:text-primary">Arthritis</Link> /{" "}
        <span>Treatment</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        Arthritis treatment options in the UK
      </h1>
      <p className="speakable-intro text-xl text-muted-foreground leading-relaxed mb-6">
        Arthritis treatment depends on the type of arthritis and how it affects your
        life. Most plans combine exercise, pacing, weight support where relevant, pain
        relief, medicines, physiotherapy and escalation to rheumatology or surgery when needed.
      </p>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="October 2026" />

      <AnswerBox question="What treatment helps arthritis most?" reviewed={REVIEWED}>
        For osteoarthritis, NICE recommends therapeutic exercise for everyone, with
        weight support where appropriate and medicines or injections used carefully.
        Inflammatory arthritis needs early diagnosis and disease-modifying treatment
        through rheumatology to reduce inflammation and protect joints.
      </AnswerBox>

      <section className="grid gap-4 md:grid-cols-3 my-10">
        {treatmentGroups.map((group) => (
          <div key={group.title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold mb-3">{group.title}</h2>
            <p className="text-sm text-foreground/85 mb-4">{group.copy}</p>
            <ul className="space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary underline underline-offset-2 font-semibold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Section title="1. Exercise and physiotherapy">
        <p>
          Exercise is a treatment, not just general lifestyle advice. A good arthritis
          plan includes range-of-movement work, strengthening, aerobic activity and
          balance. For osteoarthritis, exercise should be tailored to the person and
          continued long enough to build strength and confidence.
        </p>
        <p>
          Start with the <Link to="/guides/exercise">exercise guide</Link>, then choose
          joint-specific plans such as{" "}
          <Link to="/guides/knee-exercises-for-osteoarthritis">knee exercises</Link>,{" "}
          <Link to="/guides/hip-exercises-for-osteoarthritis">hip exercises</Link> or{" "}
          <Link to="/exercises/ankle-arthritis-exercises">ankle exercises</Link>.
        </p>
      </Section>

      <Section title="2. Pain relief and anti-inflammatory medicines">
        <p>
          Pain relief is usually layered: heat or cold, pacing, topical anti-inflammatory
          gel, short courses of oral medicines where suitable, and review if symptoms
          remain uncontrolled. NSAIDs are not suitable for everyone, especially people
          with stomach ulcers, kidney disease, some heart risks or blood-thinning medicines.
        </p>
        <p>
          Read the <Link to="/guides/arthritis-pain-relief">arthritis pain relief guide</Link>{" "}
          and the <Link to="/guides/painkillers-and-nsaids">painkillers and NSAIDs guide</Link>.
        </p>
      </Section>

      <Section title="3. Treatment by arthritis type">
        <ul>
          <li><strong>Osteoarthritis:</strong> exercise, weight support if relevant, topical NSAIDs, pacing, injections in selected cases and surgery discussion for severe joint damage.</li>
          <li><strong>Rheumatoid arthritis:</strong> early rheumatology referral, DMARDs, biologics or targeted medicines, monitoring blood tests and flare plans.</li>
          <li><strong>Gout:</strong> flare treatment plus urate-lowering medicine where indicated.</li>
          <li><strong>Psoriatic arthritis and axial spondyloarthritis:</strong> rheumatology-led treatment, exercise and medicines targeting inflammation.</li>
        </ul>
        <p>
          If you are unsure which type you have, start with{" "}
          <Link to="/arthritis-symptoms">arthritis symptoms</Link> and{" "}
          <Link to="/conditions/arthritis">the main arthritis guide</Link>.
        </p>
      </Section>

      <Section title="4. Injections, surgery and escalation">
        <p>
          Steroid injections can help selected joints for a short period, especially
          when pain is stopping exercise or sleep. Surgery, such as joint replacement,
          is usually considered only after non-surgical treatments have not controlled
          symptoms enough and imaging/assessment supports referral.
        </p>
        <p>
          If waiting times are affecting you, use the{" "}
          <Link to="/arthritis-waiting-list-help">arthritis waiting-list help guide</Link>{" "}
          to prepare questions, keep moving safely and gather evidence for review.
        </p>
      </Section>

      <Section title="5. Work, benefits and daily living support">
        <p>
          Treatment is not only medicines. If arthritis affects dressing, cooking,
          walking, work or sleep, you may need occupational therapy advice, workplace
          adjustments, Access to Work, PIP evidence or home adaptations.
        </p>
        <p>
          Continue with <Link to="/living-with-arthritis">living with arthritis</Link>,{" "}
          <Link to="/guides/benefits-pip">PIP and benefits</Link>, and{" "}
          <Link to="/blog/arthritis-and-work-uk">arthritis at work</Link>.
        </p>
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
