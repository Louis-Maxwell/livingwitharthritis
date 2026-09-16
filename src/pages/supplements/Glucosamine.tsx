import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pill, FlaskConical, ShieldAlert, HelpCircle, Scale, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import RelatedGuides from "@/components/faq/RelatedGuides";
import { CITATIONS_SUPPLEMENTS } from "@/data/clinical/ukCitations";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements/glucosamine`;

const META_TITLE = "Glucosamine for Arthritis: Does It Work? UK Guide";
const META_DESC =
  "UK guide to glucosamine for arthritis — what the evidence really says, glucosamine sulfate vs HCl, dosage, side effects and how it compares to chondroitin, MSM and collagen.";

const FAQS = [
  {
    q: "Does glucosamine actually work for arthritis?",
    a: "Evidence is mixed and NICE advises healthcare professionals not to offer glucosamine for osteoarthritis. Some studies report small benefits, while others do not. It is not a cure and there is no good evidence that it regrows cartilage.",
  },
  {
    q: "Is glucosamine sulfate better than glucosamine HCl?",
    a: "Research has used different formulations, which is one reason results are difficult to compare. Some positive studies used glucosamine sulfate, but NICE does not recommend offering glucosamine for osteoarthritis.",
  },
  {
    q: "How long until glucosamine works?",
    a: "There is no reliable timeframe because evidence of benefit is inconsistent. If you choose to try it, discuss the product and a sensible review point with a pharmacist or GP rather than continuing indefinitely without benefit.",
  },
  {
    q: "What's the right glucosamine dosage?",
    a: "There is no NHS-recommended dose for treating arthritis. Trial doses and retail products vary. Follow the product directions and ask a pharmacist before use, particularly if you take other medicines.",
  },
  {
    q: "What are the side effects of glucosamine?",
    a: "Side effects can include stomach upset, heartburn, nausea or headache. Ask a pharmacist or GP before taking it if you use warfarin, have allergies, are pregnant or breastfeeding, or have another health condition.",
  },
  {
    q: "Glucosamine vs chondroitin — which is better?",
    a: "Evidence for both products, alone or together, is inconsistent. Neither should replace exercise, weight management where appropriate, or treatment recommended by your healthcare professional.",
  },
  {
    q: "Does the UK healthcare system recommend glucosamine?",
    a: "NICE advises healthcare professionals not to offer glucosamine for osteoarthritis because there is no strong evidence of benefit. It remains available to buy, so ask a pharmacist about safety and interactions before trying it.",
  },
];

export default function Glucosamine() {
  useEffect(() => {
    const medical = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: META_TITLE,
      description: META_DESC,
      url: URL,
      inLanguage: "en-GB",
      datePublished: "2026-06-18",
      dateModified: "2026-06-18",
      about: {
        "@type": "Drug",
        name: "Glucosamine",
        alternateName: ["Glucosamine sulfate", "Glucosamine hydrochloride", "Glucosamine sulphate"],
      },
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: { "@type": "Country", name: "United Kingdom" },
      },
      publisher: {
        "@type": "Organization",
        name: "Living With Arthritis",
        url: BASE,
        logo: { "@type": "ImageObject", url: `${BASE}/og/landing-share.png` },
      },
    };
    // BreadcrumbList intentionally not emitted here — <PageBreadcrumb> below covers it.
    // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
    const scripts = [medical].map((d) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(d);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${META_TITLE} | Living With Arthritis UK`}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="keywords"
          content="glucosamine, glucosamine for arthritis, glucosamine sulfate, glucosamine UK, glucosamine dosage, glucosamine side effects, glucosamine vs chondroitin, glucosamine vs collagen, does glucosamine work, glucosamine and chondroitin, glucosamine osteoarthritis, glucosamine knee"
        />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <meta name="geo.region" content="GB" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: "Supplements", href: "/supplements" },
            { label: "Glucosamine" },
          ]}
        />

        <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
            <Link
              to="/supplements"
              className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to supplements
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Pill className="w-3 h-3" /> Supplement Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Glucosamine for arthritis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Glucosamine is one of the most-bought joint supplements in the UK. Here's what the
              evidence actually shows, the right dose to take, and how it compares to chondroitin,
              MSM and collagen — written in plain English.
            </p>
          </div>
        </div>

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

          <AnswerBox question="Does glucosamine work for arthritis?">
            <p>
              Evidence is mixed, and NICE advises healthcare professionals not
              to offer glucosamine for osteoarthritis. It is not a cure and
              should not replace exercise or recommended treatment. Ask a
              pharmacist before trying it, especially if you take warfarin or
              other medicines.
            </p>
          </AnswerBox>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What is glucosamine?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Glucosamine is a natural amino sugar that the body uses to build and repair
                cartilage — the smooth tissue that cushions the ends of bones in a joint. As we
                age, cartilage breaks down faster than it can be replaced, which is the main driver
                of <Link to="/conditions/osteoarthritis" className="text-primary underline">osteoarthritis</Link>.
              </p>
              <p>
                Most glucosamine supplements are made from the shells of shellfish (some
                vegetarian/vegan versions are fermented from corn). They come in three main forms:
              </p>
              <ul>
                <li><strong>Glucosamine sulfate</strong> — the form used in most positive UK and European trials. This is what to look for on the label.</li>
                <li><strong>Glucosamine hydrochloride (HCl)</strong> — cheaper, but weaker evidence.</li>
                <li><strong>N-acetyl glucosamine</strong> — sometimes added; very little evidence for arthritis.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
              Sources and safety information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://www.nice.org.uk/guidance/ng226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  NICE NG226: Osteoarthritis in over 16s
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhs.uk/medicines/warfarin/taking-warfarin-with-other-medicines-and-herbal-supplements/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  NHS: Taking warfarin with other medicines and supplements
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What the evidence says
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Glucosamine is one of the most-studied joint supplements in the world — and the
                results are mixed.
              </p>
              <ul>
                <li>
                  <strong>European trials of glucosamine sulfate</strong> (Pavelka 2002, Reginster 2001)
                  found that 1,500 mg/day for 3 years reduced knee OA pain and slowed joint-space narrowing.
                </li>
                <li>
                  <strong>The US GAIT study</strong> (Clegg 2006) found no benefit for mild knee OA, but a
                  subgroup with moderate-to-severe pain did improve when glucosamine was combined with
                  chondroitin.
                </li>
                <li>
                  <strong>The LEGS trial</strong> (Fransen 2015) showed slowed cartilage loss with combined
                  glucosamine + chondroitin over 2 years.
                </li>
                <li>
                  <strong>The UK's NICE guidelines (NG226)</strong> do not recommend glucosamine on the UK healthcare system
                  because the overall effect is small and inconsistent.
                </li>
              </ul>
              <p>
                Bottom line: it's not a miracle, but it's safe, cheap, and a reasonable 3-month trial
                if your osteoarthritis pain isn't being controlled by exercise and weight management
                alone.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Dosage and how to take it
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                There is no NHS-recommended glucosamine dose for treating
                arthritis. If you decide to try a product after speaking with a
                pharmacist:
              </p>
              <ul>
                <li>Follow the product label rather than combining several products.</li>
                <li>Check whether the formulation and source are clearly stated.</li>
                <li>Agree how and when you will judge benefit.</li>
                <li>Stop and seek advice if you develop a suspected side effect.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Side effects and safety
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>Glucosamine is generally well tolerated. The most common side effects are mild and short-lived:</p>
              <ul>
                <li>Stomach upset, heartburn, nausea</li>
                <li>Headache, drowsiness</li>
                <li>Rash or itching</li>
              </ul>
              <h3>Ask a pharmacist or GP before use if you</h3>
              <ul>
                <li>Have a shellfish or other significant allergy</li>
                <li>Are pregnant or breastfeeding</li>
                <li>Take warfarin or another medicine that needs monitoring</li>
                <li>Are due to have surgery</li>
              </ul>
              <p>
                Always tell your GP or pharmacist about any supplement you start, especially if you
                take regular medication.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Glucosamine vs chondroitin, MSM and collagen
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <ul>
                <li>
                  <strong>Chondroitin</strong> — often combined with glucosamine,
                  but evidence of meaningful benefit is inconsistent.
                </li>
                <li>
                  <strong><Link to="/supplements/msm" className="text-primary underline">MSM</Link></strong> — small
                  studies exist, but the evidence base remains limited.
                </li>
                <li>
                  <strong>Collagen products</strong> — formulations vary and
                  evidence is not strong enough to promise benefit.
                </li>
                <li>
                  <strong>Turmeric / curcumin</strong> — research is ongoing;
                  products vary and interactions are possible.
                </li>
                <li>
                  <strong>Omega-3 (fish oil)</strong> — best evidence is in rheumatoid arthritis, not OA.
                </li>
              </ul>
              <p>
                Do not replace prescribed treatment with a supplement. A
                pharmacist can help check interactions and avoid duplicating
                ingredients across products.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Frequently asked questions
              </h2>
            </div>
            <FaqAccordion
              idPrefix="supplements-glucosamine-faq"
              items={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          <EducationalDisclaimerBox lastReviewed="2026-09-16" />
          <TopicClusterNav path="/supplements/glucosamine" />
          <ArticleCitations citations={CITATIONS_SUPPLEMENTS} />
          <RelatedGuides
            title="Related educational guides"
            headingId="glucosamine-related"
            items={[
              {
                title: "Supplements hub — what the evidence says",
                href: "/supplements",
                description: "Glucosamine, turmeric, omega-3 and collagen in one caution-first UK hub.",
              },
              {
                title: "Best supplement for knee joints?",
                href: "/blog/best-supplement-for-knee-joint",
                description: "Educational comparison for knee OA — not a product recommendation.",
              },
              {
                title: "Osteoarthritis guide",
                href: "/conditions/osteoarthritis",
                description: "NICE-aligned treatment, exercise and diet for OA.",
              },
              {
                title: "Omega-3 foods for joints",
                href: "/blog/omega-3-foods-for-joints",
                description: "Food sources of omega-3, with the evidence limits made clear.",
              },
            ]}
          />
          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Pair supplements with what really works
            </h2>
            <p className="text-muted-foreground mb-5">
              Evidence for supplements varies. Exercise and weight management,
              where appropriate, remain core osteoarthritis treatments in NICE
              guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/conditions/osteoarthritis"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Osteoarthritis guide
              </Link>
              <Link
                to="/diet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Anti-inflammatory diet
              </Link>
              <Link
                to="/exercises"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Exercise hub
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
