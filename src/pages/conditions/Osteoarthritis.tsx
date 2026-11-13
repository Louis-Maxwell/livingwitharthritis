import { Helmet } from "react-helmet-async";
import REVIEW_RECORDS from "@/data/reviewRecords.json";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Activity,
  Heart,
  Apple,
  Dumbbell,
  Pill,
  ThermometerSun,
  AlertTriangle,
  Users,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import UrgentHelpAndSources from "@/components/seo/UrgentHelpAndSources";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_OA } from "@/data/clinical/ukCitations";
import { LOUIS_MAXWELL_REF } from "@/lib/louisMaxwell";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import LastReviewed from "@/components/LastReviewed";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/osteoarthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Osteoarthritis: UK Symptoms, Treatment and Exercises",
  "description": "UK osteoarthritis guide: what to do when joints hurt, red flags, plain-English symptoms, NICE NG226 diagnosis and core treatments, pain relief, exercise, aids, flares, PIP and when to see your GP.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2026-11-05",
  "lastReviewed": REVIEW_RECORDS.pages["/conditions/osteoarthritis"],
  "author": LOUIS_MAXWELL_REF,
  "reviewedBy": LOUIS_MAXWELL_REF,
  "publisher": {
    "@type": "Organization",
    "name": "Living With Arthritis",
    "url": BASE,
    "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` },
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Osteoarthritis",
    "alternateName": ["OA", "Degenerative joint disease"],
    "associatedAnatomy": {
      "@type": "AnatomicalStructure",
      "name": "Synovial joints (knees, hips, hands, spine)",
    },
    "signOrSymptom": [
      "Joint pain worse with use",
      "Short-lived morning stiffness",
      "Swelling",
      "Reduced range of motion",
      "Crepitus",
    ],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Therapeutic exercise" },
      { "@type": "MedicalTherapy", "name": "Weight management" },
      { "@type": "MedicalTherapy", "name": "Information and support" },
      { "@type": "MedicalTherapy", "name": "Topical NSAID" },
    ],
  },
  "audience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient",
    "geographicArea": { "@type": "Country", "name": "United Kingdom" },
  },
  "mainEntityOfPage": URL,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is osteoarthritis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Osteoarthritis is the most common type of arthritis in the UK. It involves changes in the cartilage that cushions the ends of bones, plus other joint tissues, which can cause pain, short-lived stiffness and reduced movement. It is more than simple \"wear and tear\". NICE guideline NG226 covers diagnosis and management for people aged 16 and over.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the best treatment for osteoarthritis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NICE recommends therapeutic exercise for everyone with osteoarthritis, weight management where it is relevant, and information and support. Pain medicines support those core treatments rather than replace them: for knee osteoarthritis an anti-inflammatory gel is usually tried first; tablets, if used, should be the lowest dose for the shortest time. Imaging is not needed first for most people.",
      },
    },
    {
      "@type": "Question",
      "name": "Can osteoarthritis be cured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no cure that reverses osteoarthritis, but many people manage symptoms well with exercise, pacing, weight advice where relevant, joint protection, and the right pain relief. Severe symptoms that have not improved with core treatments may lead to a discussion about joint surgery.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the best exercise for osteoarthritis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NICE recommends therapeutic exercise that includes muscle strengthening and general fitness. Walking, swimming, cycling, seated strength work and tai chi are common starting points. Start small, build up gradually, and expect some aching at first.",
      },
    },
    {
      "@type": "Question",
      "name": "When should I see a GP about osteoarthritis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "See your GP if joint pain is not improving after a few weeks of self-care, wakes you most nights, comes with swelling or morning stiffness lasting longer than 30 minutes, or stops you doing everyday things. Get same-day help from NHS 111 or your GP if a joint is suddenly hot, red and swollen, especially with a fever, and call 999 in an emergency.",
      },
    },
  ],
};

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="prose prose-lg max-w-none text-foreground/85 prose-headings:font-display prose-headings:text-foreground prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground">
      {children}
    </div>
  </motion.section>
);

const Osteoarthritis = () => (
  <>
    <Helmet>
      <title>Osteoarthritis: Symptoms, Treatment & Exercises (UK)</title>
      <meta
        name="description"
        content="UK osteoarthritis guide: what to do now, red flags, NICE NG226 diagnosis and core treatments, safe pain relief, exercise, aids, flares and when to see your GP."
      />
      <meta
        name="keywords"
        content="osteoarthritis, osteoarthritis symptoms, osteoarthritis treatment, osteoarthritis exercises, OA, knee osteoarthritis, hip osteoarthritis, hand osteoarthritis, NICE NG226, joint pain uk"
      />
      <meta property="og:title" content="Osteoarthritis: Symptoms, Treatment & Exercises (UK)" />
      <meta
        property="og:description"
        content="What to do now, red flags, NICE-aligned core treatments, exercise, pain relief and when to see your GP — clinically reviewed UK guide."
      />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Osteoarthritis UK guide — symptoms, treatment and exercises" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Osteoarthritis: UK Symptoms & Treatment" />
      <meta
        name="twitter:description"
        content="NICE-aligned osteoarthritis guide: exercise, weight advice, pain relief and red flags."
      />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: URL,
          inLanguage: "en-GB",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".speakable-intro"],
          },
        })}
      </script>
    </Helmet>
    <div className="min-h-dvh bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Osteoarthritis" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link
            to="/#conditions"
            className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
            <Activity className="w-3 h-3" /> Condition guide
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Osteoarthritis: start here when joints ache and stiffen
          </h1>
          <AeoEnhancement route="/conditions/osteoarthritis" />
          <p className="speakable-intro text-lg text-muted-foreground leading-relaxed">
            Osteoarthritis (OA) is the most common arthritis in the UK. Joints hurt more with use, stiffness is usually short-lived, and the core treatments recommended by NICE are therapeutic exercise, weight management where it helps, and clear information and support — not resting forever or relying on painkillers alone. This page follows NHS and NICE NG226 advice and tells you when to get help. It is educational, not a diagnosis.
          </p>
          <div className="mt-5 space-y-2">
            <LastReviewed date="2026-11-05" />
            <MedicalReviewBadge
              reviewer="Louis Maxwell"
              title="First Contact Practitioner"
              credential="HCPC PH128483"
              date="November 2026"
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Next: try gentle exercises
            </Link>
            <Link
              to="/guides/arthritis-pain-relief"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
            >
              Pain relief hub
            </Link>
            <Link
              to="/guides/newly-diagnosed"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/40 transition-colors"
            >
              Newly diagnosed?
            </Link>
          </div>
        </div>
      </div>

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
        <section aria-labelledby="oa-now" className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <h2 id="oa-now" className="font-display text-2xl font-bold text-foreground mb-3">
            OA right now: start here
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-foreground/85">
            <li>
              <strong>Check for red flags</strong> in the box below. If any apply, get help first.
            </li>
            <li>
              <strong>Keep moving gently:</strong> bend and straighten the joint a few times every hour. Complete rest usually makes stiffness worse.
            </li>
            <li>
              <strong>Heat or cold:</strong> warm (not hot) pack or shower for stiff, aching joints; cold pack wrapped in a tea towel for a hot, swollen joint. Up to about 20 minutes.
            </li>
            <li>
              <strong>Pain relief:</strong> for knee osteoarthritis, NICE usually starts with an anti-inflammatory gel. Ask a pharmacist what is safe for you before using tablets.
            </li>
            <li>
              <strong>Lighten the day:</strong> share or drop what can wait, and break jobs into short pieces with rests. See{" "}
              <Link to="/blog/joint-protection-easier-everyday-tasks" className="text-primary underline">
                joint protection
              </Link>
              .
            </li>
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">
            Need a fuller pain plan? Use the{" "}
            <Link to="/guides/arthritis-pain-relief" className="text-primary underline">
              arthritis pain relief hub
            </Link>{" "}
            and the printable{" "}
            <Link to="/resources/flare-action-plan" className="text-primary underline">
              flare action plan
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="oa-red-flags" className="mb-12 rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
          <h2 id="oa-red-flags" className="font-display text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> Red flags: get help now
          </h2>
          <p className="text-foreground/85">
            <strong>Call NHS 111 or your GP for a same-day appointment</strong> if:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-foreground/85">
            <li>
              one joint suddenly becomes hot, red, swollen and very painful, especially with a fever or feeling unwell (this can be an infected joint or gout)
            </li>
            <li>a joint is very painful after a fall or injury, or you cannot put weight on a leg</li>
            <li>you suddenly cannot move a joint that usually moves</li>
          </ul>
          <p className="text-foreground/85 mt-3">
            <strong>Call 999 or go to A&amp;E</strong> if you have chest pain; a fall with a suspected broken hip or a head injury; or back pain with numbness around your bottom or genitals, new bladder or bowel control problems, or weakness in both legs.
          </p>
        </section>

        <Section icon={BookOpen} title="1. What osteoarthritis is (plain English)">
          <p>
            Osteoarthritis involves changes in the cartilage that cushions the ends of your bones, and in other tissues in and around the joint. Pain, short-lived stiffness and reduced movement are common. Calling it only &quot;wear and tear&quot; undersells how the joint adapts and how much exercise and self-care can help.
          </p>
          <p>
            It most often affects the <strong>knees, hips, hands and spine</strong>, but any synovial joint can be involved. Around{" "}
            <strong>8.75 million people</strong> aged 45 and over in the UK have sought treatment for osteoarthritis (Arthritis Research UK 2013, cited by{" "}
            <a
              href="https://cks.nice.org.uk/topics/osteoarthritis/background-information/prevalence/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NICE CKS
            </a>
            ). Living With Arthritis is an independent UK charity (registered charity 1218461) and is not part of Versus Arthritis / Arthritis UK.
          </p>
          <p>
            Guidance for clinicians and patients is set out in{" "}
            <a href="https://www.nice.org.uk/guidance/ng226" target="_blank" rel="noopener noreferrer">
              NICE NG226
            </a>{" "}
            and on the{" "}
            <a href="https://www.nhs.uk/conditions/osteoarthritis/" target="_blank" rel="noopener noreferrer">
              NHS osteoarthritis pages
            </a>
            .
          </p>
        </Section>

        <Section icon={ThermometerSun} title="2. Symptoms — and when it might not be OA">
          <p>Typical osteoarthritis symptoms develop gradually:</p>
          <ul>
            <li>
              <strong>Joint pain</strong> that is worse with use and later in the day
            </li>
            <li>
              <strong>Stiffness</strong> after rest or first thing in the morning that usually eases within about 30 minutes
            </li>
            <li>
              <strong>Swelling</strong>, tenderness, reduced range of movement, or a grating feeling (crepitus)
            </li>
          </ul>
          <p>
            <strong>These patterns point more toward inflammatory arthritis</strong> such as rheumatoid arthritis, and need a different pathway:
          </p>
          <ul>
            <li>morning stiffness that regularly lasts longer than 30 minutes</li>
            <li>several joints swollen, warm or red at once, often symmetrically</li>
            <li>feeling generally unwell with joint symptoms</li>
          </ul>
          <p>
            If that sounds like you, read{" "}
            <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">
              rheumatoid arthritis
            </Link>{" "}
            and{" "}
            <Link to="/conditions/early-arthritis-symptoms" className="text-primary underline">
              early arthritis symptoms
            </Link>
            , and see your GP. Painkillers alone are not enough for inflammatory arthritis.
          </p>
        </Section>

        <Section icon={Stethoscope} title="3. Diagnosis: GP first, imaging not always first">
          <p>
            NICE says osteoarthritis can usually be diagnosed clinically. Many people do{" "}
            <strong>not</strong> need an X-ray or MRI before starting core treatments. Imaging is used when the diagnosis is unclear, red flags are present, or surgery is being planned.
          </p>
          <p>
            Your GP can assess the joint, discuss exercise and weight advice, review medicines, and refer you to physiotherapy or other services. In many areas you can also{" "}
            <strong>self-refer to community musculoskeletal (MSK) physiotherapy</strong> — ask your GP surgery or search for local MSK self-referral.
          </p>
          <p>
            If you were recently told you have osteoarthritis, the{" "}
            <Link to="/guides/newly-diagnosed" className="text-primary underline">
              newly diagnosed guide
            </Link>{" "}
            has a first-week checklist.
          </p>
        </Section>

        <Section icon={Dumbbell} title="4. Core treatments: exercise, weight, information">
          <p>NICE NG226 puts three things at the centre of care for everyone with osteoarthritis:</p>
          <ul>
            <li>
              <strong>Therapeutic exercise</strong> — muscle strengthening and general fitness, tailored to you
            </li>
            <li>
              <strong>Weight management</strong> — if you are living with overweight or obesity, losing any amount of weight is likely to help load-bearing joints
            </li>
            <li>
              <strong>Information and support</strong> — clear advice about the condition and how to live with it
            </li>
          </ul>
          <p>Practical starting points:</p>
          <ul>
            <li>
              <Link to="/exercises" className="text-primary underline">
                Exercise hub
              </Link>{" "}
              — paced, joint-friendly routines
            </li>
            <li>
              <Link to="/guides/knee-exercises-for-osteoarthritis" className="text-primary underline">
                Knee exercises for osteoarthritis
              </Link>{" "}
              ·{" "}
              <Link to="/guides/hip-exercises-for-osteoarthritis" className="text-primary underline">
                Hip exercises for osteoarthritis
              </Link>
            </li>
            <li>
              <Link to="/blog/swimming-exercises-hip-osteoarthritis" className="text-primary underline">
                Swimming and pool exercises for hip OA
              </Link>
            </li>
            <li>
              <Link to="/blog/walking-with-arthritis-start-build-up-keep-going" className="text-primary underline">
                Walking with arthritis
              </Link>{" "}
              ·{" "}
              <Link to="/blog/seated-strength-frail-osteoarthritis-uk" className="text-primary underline">
                Seated strength for osteoarthritis
              </Link>
            </li>
            <li>
              <Link to="/blog/knee-osteoarthritis-frailty-staying-steady-home-uk" className="text-primary underline">
                Knee OA: staying steady at home
              </Link>
            </li>
          </ul>
          <p>
            Some aching when you start is normal and should settle; pain that lasts into the next day means do a bit less next time.
          </p>
        </Section>

        <Section icon={Pill} title="5. Pain relief aligned with NICE NG226">
          <p>
            Medicines support exercise and self-care; they do not replace them. Use the lowest effective dose for the shortest time, and check with a pharmacist or GP what is safe for you.
          </p>
          <ul>
            <li>
              <strong>Anti-inflammatory gels (topical NSAIDs)</strong> — NICE recommends offering these first for knee osteoarthritis, and considering them for other joints
            </li>
            <li>
              <strong>Anti-inflammatory tablets (oral NSAIDs)</strong> — may be added if gels are not enough or not suitable, often with a stomach-protecting medicine; not safe for everyone
            </li>
            <li>
              <strong>Paracetamol and weak opioids</strong> — NICE says these should not be offered routinely for osteoarthritis
            </li>
            <li>
              <strong>Strong opioids</strong> — NICE says these should not be offered for osteoarthritis
            </li>
            <li>
              <strong>Steroid injections</strong> — may be considered when other treatments have not helped enough; relief is short term, so they are usually combined with exercise
            </li>
          </ul>
          <p>
            More detail:{" "}
            <Link to="/guides/painkillers-and-nsaids" className="text-primary underline">
              painkillers and NSAIDs
            </Link>
            ,{" "}
            <Link to="/guides/arthritis-pain-relief" className="text-primary underline">
              arthritis pain relief
            </Link>
            , and{" "}
            <Link to="/blog/best-supplement-for-knee-joint" className="text-primary underline">
              knee supplements — honest evidence
            </Link>
            . Never stop or change a prescribed medicine yourself.
          </p>
        </Section>

        <Section icon={ThermometerSun} title="6. Heat, cold and flare days">
          <ul>
            <li>
              <strong>Heat</strong> — stiff, aching joints: warm shower, wheat bag or hot water bottle in a cover
            </li>
            <li>
              <strong>Cold</strong> — hot, swollen joints: cold pack or frozen peas wrapped in a tea towel
            </li>
            <li>
              <strong>Safety</strong> — always wrap packs, use for up to about 20 minutes, check skin, do not use on numb or broken skin, and never fall asleep with a heat pack
            </li>
          </ul>
          <p>
            On a flare day, reduce how much you do rather than stopping altogether, then build back up. Use the{" "}
            <Link to="/resources/flare-action-plan" className="text-primary underline">
              flare action plan
            </Link>{" "}
            and{" "}
            <Link to="/arthritis-flare-ups" className="text-primary underline">
              flare-up guide
            </Link>
            .
          </p>
        </Section>

        <Section icon={Heart} title="7. Aids, footwear and getting around at home">
          <ul>
            <li>
              <strong>Walking aids</strong> — NICE says a walking stick or similar can be considered for hip or knee osteoarthritis; a physiotherapist can check the height
            </li>
            <li>
              <strong>Footwear</strong> — cushioned, supportive shoes: see{" "}
              <Link to="/blog/best-walking-shoes-arthritis-uk" className="text-primary underline">
                walking shoes for arthritis
              </Link>
            </li>
            <li>
              <strong>Transfers</strong> — getting up from a chair, bed, toilet or car:{" "}
              <Link to="/blog/hip-and-knee-oa-frailty-transfers-uk" className="text-primary underline">
                hip and knee OA transfers
              </Link>
            </li>
            <li>
              <strong>Everyday tasks</strong> —{" "}
              <Link to="/blog/joint-protection-easier-everyday-tasks" className="text-primary underline">
                joint protection
              </Link>
            </li>
            <li>
              <strong>Occupational therapy</strong> — ask your GP or council if dressing, cooking or washing is getting hard
            </li>
          </ul>
        </Section>

        <Section icon={Apple} title="8. Food and weight">
          <p>
            No food cures osteoarthritis. A{" "}
            <Link to="/diet/mediterranean-diet-for-arthritis" className="text-primary underline">
              Mediterranean-style pattern
            </Link>{" "}
            (vegetables, beans, wholegrains, olive oil, oily fish) is a healthy way to eat and can support weight management. NICE&apos;s main dietary message for OA is weight management where relevant. See the{" "}
            <Link to="/guides/diet" className="text-primary underline">
              diet hub
            </Link>
            . Supplements such as glucosamine are not recommended by NICE for osteoarthritis; check any supplement with a pharmacist.
          </p>
        </Section>

        <Section icon={Activity} title="9. Work, money and PIP">
          <p>
            If osteoarthritis affects daily living or mobility, you may be able to claim benefits or get workplace support. Start with the{" "}
            <Link to="/guides/benefits-pip" className="text-primary underline">
              benefits and PIP hub
            </Link>
            , the{" "}
            <Link to="/faq/arthritis-disability-benefits-uk" className="text-primary underline">
              disability benefits FAQ
            </Link>
            , and the printable{" "}
            <Link to="/resources/pip-evidence-diary" className="text-primary underline">
              PIP evidence diary
            </Link>
            .
          </p>
        </Section>

        <Section icon={Pill} title="10. Treatments NICE does not recommend for OA">
          <p>
            Some options are widely advertised but NICE does not recommend them for osteoarthritis because there is not enough evidence that they help: acupuncture and dry needling, electrotherapy including TENS, glucosamine, and strong opioids. Talk to your GP or physiotherapist before spending money on them. Regenerative injections such as PRP are not routine NHS care for OA.
          </p>
        </Section>

        <Section icon={Stethoscope} title="When to see your GP">
          <p>Book a GP appointment if:</p>
          <ul>
            <li>pain is not improving after a few weeks of self-care, or is getting worse</li>
            <li>a joint is swollen, warm or red</li>
            <li>morning stiffness regularly lasts longer than 30 minutes</li>
            <li>pain wakes you most nights</li>
            <li>you are using painkillers most days, or they are not helping</li>
            <li>pain is stopping you working, sleeping or doing everyday things</li>
            <li>you are losing weight, feeling feverish or generally unwell with joint pain</li>
          </ul>
          <p>
            Your GP can check what type of arthritis you have, review medicines, and refer you to physiotherapy, orthopaedics or other services. If you are already waiting, see{" "}
            <Link to="/arthritis-waiting-list-help" className="text-primary underline">
              help while you are on a waiting list
            </Link>
            . For urgent warning signs, use the red flags box at the top of this page.
          </p>
        </Section>

        <Section icon={Users} title="For carers and family">
          <p>
            Help the person keep moving gently rather than doing everything for them, support short exercise sessions, and keep a list of medicines for the pharmacist. Watch for red flags, especially a hot, swollen joint with fever. See{" "}
            <Link to="/blog/carers-allowance-help-if-you-care-for-someone" className="text-primary underline">
              carers&apos; support
            </Link>{" "}
            if you provide regular care.
          </p>
        </Section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30 mb-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Build your own plan</h2>
          <p className="text-muted-foreground mb-5">
            Put exercise, pacing and pain relief into a simple weekly routine.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/self-help"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Open the self-help tool
            </Link>
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
            >
              Browse exercises
            </Link>
          </div>
        </div>
      </main>

      <nav
        aria-label="Customer job pathways for osteoarthritis"
        className="container mx-auto px-6 md:px-10 max-w-3xl mb-10 rounded-xl border border-border/40 bg-muted/20 p-5"
      >
        <p className="text-sm font-semibold text-foreground m-0 mb-3">What do you need next?</p>
        <ul className="text-sm text-muted-foreground space-y-2 m-0 list-disc list-inside">
          <li>
            <Link to="/guides/arthritis-pain-relief" className="text-primary underline underline-offset-2">
              Pain relief hub
            </Link>{" "}
            — paced movement, heat/cold and medicines overview
          </li>
          <li>
            <Link to="/exercises" className="text-primary underline underline-offset-2">
              Exercise hub
            </Link>{" "}
            ·{" "}
            <Link to="/guides/knee-exercises-for-osteoarthritis" className="text-primary underline underline-offset-2">
              Knee exercises
            </Link>{" "}
            ·{" "}
            <Link to="/guides/hip-exercises-for-osteoarthritis" className="text-primary underline underline-offset-2">
              Hip exercises
            </Link>
          </li>
          <li>
            <Link to="/blog/swimming-exercises-hip-osteoarthritis" className="text-primary underline underline-offset-2">
              Swimming for hip OA
            </Link>{" "}
            ·{" "}
            <Link to="/blog/walking-with-arthritis-start-build-up-keep-going" className="text-primary underline underline-offset-2">
              Walking with arthritis
            </Link>{" "}
            ·{" "}
            <Link to="/blog/best-walking-shoes-arthritis-uk" className="text-primary underline underline-offset-2">
              Walking shoes
            </Link>
          </li>
          <li>
            <Link to="/blog/knee-osteoarthritis-frailty-staying-steady-home-uk" className="text-primary underline underline-offset-2">
              Knee OA steady at home
            </Link>{" "}
            ·{" "}
            <Link to="/blog/hip-and-knee-oa-frailty-transfers-uk" className="text-primary underline underline-offset-2">
              Getting up safely
            </Link>{" "}
            ·{" "}
            <Link to="/blog/seated-strength-frail-osteoarthritis-uk" className="text-primary underline underline-offset-2">
              Seated strength
            </Link>
          </li>
          <li>
            <Link to="/blog/joint-protection-easier-everyday-tasks" className="text-primary underline underline-offset-2">
              Joint protection
            </Link>{" "}
            ·{" "}
            <Link to="/blog/best-supplement-for-knee-joint" className="text-primary underline underline-offset-2">
              Knee supplements (honest evidence)
            </Link>
          </li>
          <li>
            <Link to="/guides/painkillers-and-nsaids" className="text-primary underline underline-offset-2">
              Painkillers &amp; NSAIDs
            </Link>{" "}
            ·{" "}
            <Link to="/resources/flare-action-plan" className="text-primary underline underline-offset-2">
              Flare action plan
            </Link>
          </li>
          <li>
            <Link to="/guides/benefits-pip" className="text-primary underline underline-offset-2">
              Benefits &amp; PIP hub
            </Link>{" "}
            ·{" "}
            <Link to="/faq/arthritis-disability-benefits-uk" className="text-primary underline underline-offset-2">
              Disability benefits FAQ
            </Link>{" "}
            ·{" "}
            <Link to="/resources/pip-evidence-diary" className="text-primary underline underline-offset-2">
              PIP evidence diary
            </Link>
          </li>
          <li>
            <Link to="/guides/newly-diagnosed" className="text-primary underline underline-offset-2">
              Newly diagnosed
            </Link>{" "}
            ·{" "}
            <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline underline-offset-2">
              Rheumatoid arthritis
            </Link>{" "}
            ·{" "}
            <Link to="/conditions/early-arthritis-symptoms" className="text-primary underline underline-offset-2">
              Early symptoms
            </Link>
          </li>
        </ul>
      </nav>
      <ArticleCitations citations={CITATIONS_OA} />
      <UrgentHelpAndSources path="/conditions/osteoarthritis" />
      <EducationalDisclaimerBox lastReviewed={REVIEW_RECORDS.pages["/conditions/osteoarthritis"]} />
      <TopicClusterNav path="/conditions/osteoarthritis" />
      <Footer />
    </div>
  </>
);

export default Osteoarthritis;
