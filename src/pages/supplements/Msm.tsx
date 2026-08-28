import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pill, FlaskConical, ShieldAlert, HelpCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements/msm`;

const META_TITLE = "MSM Supplement for Joint Pain: UK Guide & Evidence";
const META_DESC =
  "What is MSM (methylsulfonylmethane)? Honest UK guide to the evidence for joint pain and arthritis, dosage, side effects and whether MSM is worth combining with glucosamine.";

const FAQS = [
  {
    q: "What is MSM?",
    a: "MSM stands for methylsulfonylmethane — an organic sulfur compound found naturally in plants, animals and humans. As a supplement it's sold for joint pain, stiffness and inflammation, usually as a white odourless powder or tablet.",
  },
  {
    q: "Does MSM work for arthritis and joint pain?",
    a: "Small-to-medium trials of MSM (1,500–6,000 mg/day) show modest reductions in knee osteoarthritis pain and stiffness over 12 weeks. Evidence is less strong than for glucosamine sulfate or curcumin, but MSM is well tolerated and often combined with glucosamine.",
  },
  {
    q: "What is the correct MSM dosage?",
    a: "Most trials use 1,500–3,000 mg per day, split into two or three doses with food. Doses up to 6,000 mg have been used safely short term but offer no clear extra benefit.",
  },
  {
    q: "How long does MSM take to work?",
    a: "Allow 8–12 weeks of daily use. If you feel no improvement in pain or stiffness by 3 months, stop.",
  },
  {
    q: "Are there any side effects of MSM?",
    a: "MSM is one of the better-tolerated joint supplements. Mild bloating, diarrhoea, nausea, headache or skin rash are the most common issues. Avoid if you are pregnant, breastfeeding, or take blood thinners — and speak to your GP first if you take regular medication.",
  },
  {
    q: "MSM vs glucosamine — which is better?",
    a: "They work differently. Glucosamine supports cartilage structure; MSM appears to reduce inflammation and oxidative stress in the joint. The combination is more studied than MSM alone and tends to be the formulation most UK brands sell.",
  },
  {
    q: "Is MSM safe long term?",
    a: "There are no good long-term safety studies beyond 12 weeks. Most people use it in cycles — 3 months on, then a break to judge benefit before continuing.",
  },
];

export default function Msm() {
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
        name: "MSM",
        alternateName: ["Methylsulfonylmethane", "Methyl sulfonyl methane", "Dimethyl sulfone"],
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
        logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
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
          content="msm, msm supplement, methylsulfonylmethane, msm for joint pain, msm dosage, msm side effects, msm vs glucosamine, msm benefits, msm arthritis, msm uk, msm knee pain, methylsulfonylmethane benefits"
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
          segments={[{ label: "Supplements", href: "/supplements" }, { label: "MSM" }]}
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
              MSM for joint pain
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MSM (methylsulfonylmethane) is a sulfur compound found in many UK joint formulas.
              Here's what the trials actually show, the right dose to take and whether MSM is
              worth combining with glucosamine.
            </p>
          </div>
        </div>

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

          <AnswerBox question="What is MSM and does it help arthritis?" reviewed="2026-06-18">
            <p>
              MSM is an organic sulfur compound (methylsulfonylmethane). Small trials at
              <strong> 1,500–3,000 mg/day</strong> show modest reductions in knee osteoarthritis
              pain and stiffness over 12 weeks. It is well tolerated and often combined with
              glucosamine sulfate. Evidence is weaker than for curcumin or glucosamine alone.
            </p>
          </AnswerBox>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What is MSM?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                MSM stands for <strong>methylsulfonylmethane</strong>. It's a natural organic
                sulfur compound found in small amounts in plants, animals and humans. Sulfur is a
                building block for collagen and the cartilage that lines our joints.
              </p>
              <p>
                As a supplement, MSM is sold for joint pain, stiffness, inflammation, exercise
                recovery, allergies and skin health. In the UK it usually appears either on its own
                or stacked with <Link to="/supplements/glucosamine" className="text-primary underline">glucosamine</Link> and
                chondroitin.
              </p>
            </div>
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
              <ul>
                <li>
                  <strong>Kim 2006</strong> — 3,000 mg MSM twice daily for 12 weeks improved knee OA
                  pain and physical function vs placebo.
                </li>
                <li>
                  <strong>Debbi 2011</strong> — 1.125 g MSM three times daily for 12 weeks reduced
                  pain and improved knee OA function vs placebo.
                </li>
                <li>
                  <strong>2017 systematic review</strong> (Brien et al.) — MSM produced statistically
                  significant but small improvements in pain and function for knee OA.
                </li>
                <li>
                  <strong>Combined with glucosamine</strong> — several trials suggest the combination
                  outperforms either ingredient alone for moderate OA pain.
                </li>
                <li>
                  <strong>NICE NG226</strong> does not currently recommend MSM on the UK healthcare system.
                </li>
              </ul>
              <p>
                The honest summary: real but modest effect, decent safety profile, and best used as a
                12-week trial alongside exercise and weight management — not as a replacement for
                them.
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
              <ul>
                <li><strong>Typical dose:</strong> 1,500–3,000 mg per day.</li>
                <li><strong>Split:</strong> two or three doses, taken with food.</li>
                <li><strong>Form:</strong> capsule, tablet or unflavoured powder dissolved in water.</li>
                <li><strong>Trial length:</strong> 8–12 weeks before judging the effect.</li>
                <li><strong>Stack:</strong> commonly combined with 1,500 mg glucosamine sulfate.</li>
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
              <p>MSM is one of the better-tolerated joint supplements. Mild side effects can include:</p>
              <ul>
                <li>Bloating, mild diarrhoea or nausea</li>
                <li>Headache</li>
                <li>Skin rash or itching</li>
                <li>Insomnia if taken late in the day</li>
              </ul>
              <h3>Take care if you</h3>
              <ul>
                <li>Are pregnant or breastfeeding — not enough safety data, avoid</li>
                <li>Take blood thinners (warfarin, apixaban) — speak to your GP first</li>
                <li>Have liver or kidney disease</li>
              </ul>
              <p>
                Always tell your GP or pharmacist about any supplement, especially before surgery or
                if you start a new prescription medicine.
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
              idPrefix="supplements-msm-faq"
              items={FAQS.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Compare MSM to other joint supplements
            </h2>
            <p className="text-muted-foreground mb-5">
              MSM is one of many options. See where it fits next to glucosamine, plus what we
              recommend for the underlying condition.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/supplements/glucosamine"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Glucosamine guide
              </Link>
              <Link
                to="/conditions/osteoarthritis"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Osteoarthritis
              </Link>
              <Link
                to="/diet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Anti-inflammatory diet
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
