import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pill, FlaskConical, ShieldAlert, HelpCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements/turmeric`;

const META_TITLE = "Is Turmeric Good for Arthritis? UK Curcumin Guide";
const META_DESC =
  "Honest UK guide to turmeric and curcumin for arthritis: the evidence, the right dose (around 1,000 mg/day), why black pepper matters for absorption, side effects and interactions.";

const FAQS = [
  {
    q: "Is turmeric good for arthritis?",
    a: "Yes, modestly. Trials of curcumin (the active compound in turmeric) at around 1,000 mg/day for 8–12 weeks show meaningful reductions in knee osteoarthritis pain and stiffness, sometimes comparable to ibuprofen or diclofenac but with fewer stomach side effects.",
  },
  {
    q: "How much turmeric or curcumin should I take?",
    a: "Clinical trials mostly use 500–1,000 mg of curcumin extract per day, usually split into two doses with food. Cooking with turmeric powder alone will not deliver that dose — supplements standardised to 95% curcuminoids are what the studies test.",
  },
  {
    q: "Why is black pepper (piperine) added to turmeric supplements?",
    a: "Curcumin is poorly absorbed on its own. Adding piperine from black pepper increases its bioavailability by up to 2,000%. Most reputable UK curcumin supplements include piperine or use a formulation like Meriva or BCM-95 that boosts absorption in other ways.",
  },
  {
    q: "How long does turmeric take to work for arthritis?",
    a: "Allow at least 8–12 weeks of daily use. If pain and stiffness have not improved by 3 months, stop — you are unlikely to be a responder.",
  },
  {
    q: "What are the side effects of turmeric?",
    a: "Turmeric is generally well tolerated. The most common issues are mild indigestion, nausea or diarrhoea. Rare cases of liver injury have been reported at high doses, so stick to standard trial doses and stop if you feel unwell.",
  },
  {
    q: "Who should avoid turmeric supplements?",
    a: "Talk to your GP before taking turmeric if you are pregnant, take blood thinners (warfarin, apixaban, aspirin), have gallstones or bile-duct problems, diabetes medication, or are due to have surgery within two weeks.",
  },
  {
    q: "Turmeric vs ibuprofen for arthritis — which is better?",
    a: "For knee osteoarthritis, head-to-head trials show curcumin roughly matches ibuprofen or diclofenac for pain relief over 4–12 weeks, with fewer stomach and kidney side effects. It is slower to act. For short flares, NSAIDs still work faster.",
  },
];

export default function Turmeric() {
  useEffect(() => {
    const medical = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: META_TITLE,
      description: META_DESC,
      url: URL,
      inLanguage: "en-GB",
      datePublished: "2026-07-11",
      dateModified: "2026-07-11",
      about: {
        "@type": "Drug",
        name: "Turmeric",
        alternateName: ["Curcumin", "Curcuma longa", "Curcuminoids"],
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
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    // BreadcrumbList intentionally not emitted here — <PageBreadcrumb> below covers it.
    const scripts = [medical, faq].map((d) => {
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
          content="turmeric arthritis, curcumin arthritis, is turmeric good for arthritis, turmeric dosage, turmeric black pepper, curcumin knee pain, turmeric side effects, turmeric vs ibuprofen, turmeric uk"
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
          segments={[{ label: "Supplements", href: "/supplements" }, { label: "Turmeric" }]}
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
              Is turmeric good for arthritis?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Turmeric — and specifically its active compound curcumin — has some of the strongest
              trial evidence of any joint supplement. Here is what the studies actually show, the
              right dose, why black pepper matters, and who should avoid it.
            </p>
          </div>
        </div>

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

          <AnswerBox question="Does turmeric help arthritis pain?" reviewed="2026-07-11">
            <p>
              Yes. Multiple randomised trials show <strong>curcumin extract at around 1,000 mg/day</strong> reduces
              knee osteoarthritis pain and stiffness over 8–12 weeks, with effects comparable to
              ibuprofen or diclofenac but with fewer gastrointestinal side effects. A 2016 systematic
              review supports this dose for arthritis symptom relief. Take it with black pepper
              (piperine) or a bioavailability-enhanced formula to absorb enough curcumin to work.
            </p>
          </AnswerBox>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                What is turmeric and curcumin?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-headings:font-display prose-headings:text-foreground">
              <p>
                Turmeric (<em>Curcuma longa</em>) is the yellow spice used in curry. Its active
                anti-inflammatory compound is <strong>curcumin</strong>, one of a group of molecules
                called curcuminoids. Standard turmeric powder is only 2–5% curcumin by weight, which
                is why supplements use concentrated extracts standardised to <strong>95% curcuminoids</strong>.
              </p>
              <p>
                Curcumin works by blocking inflammatory signalling pathways in the joint —
                particularly NF-κB and COX-2 — which is the same pathway that NSAIDs like ibuprofen
                target, but through a different mechanism.
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
                  <strong>Kuptniratsaikul 2014</strong> — 1,500 mg/day curcumin extract for 4 weeks
                  matched ibuprofen 1,200 mg/day for knee OA pain, with fewer GI side effects.
                </li>
                <li>
                  <strong>Shep 2019</strong> — curcumin was non-inferior to diclofenac for knee OA
                  over 28 days, with significantly better tolerability.
                </li>
                <li>
                  <strong>Daily 2016 systematic review and meta-analysis</strong> — around
                  1,000 mg/day curcumin produces clinically meaningful pain and function
                  improvements in arthritis, comparable to NSAIDs short-term.
                </li>
                <li>
                  <strong>Wang 2021</strong> — curcumin reduced knee OA pain and improved WOMAC
                  scores vs placebo at 12 weeks.
                </li>
              </ul>
              <p>
                Honest summary: turmeric has some of the best supplement evidence for arthritis,
                but the effect is comparable to a standard NSAID — not a cure. It works best used
                alongside exercise and weight management, and only from properly formulated
                supplements, not kitchen turmeric.
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
                <li><strong>Typical dose:</strong> 500–1,000 mg curcumin extract per day (standardised to 95% curcuminoids).</li>
                <li><strong>Split:</strong> two doses with food to reduce GI upset.</li>
                <li><strong>Absorption:</strong> combine with piperine (black pepper) — this can increase absorption by up to 2,000%. Alternatives include Meriva (phytosome), BCM-95 and Longvida formulations.</li>
                <li><strong>Trial length:</strong> 8–12 weeks before judging the effect.</li>
                <li><strong>Cooking with turmeric</strong> alone will not deliver a therapeutic dose — use it for flavour and antioxidant benefit, but rely on standardised supplements for arthritis.</li>
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
              <p>Turmeric is generally well tolerated. Possible side effects include:</p>
              <ul>
                <li>Mild indigestion, nausea or diarrhoea</li>
                <li>Headache or dizziness</li>
                <li>Skin rash at high doses</li>
                <li>Rare reports of liver injury at very high doses or with poorly manufactured products</li>
              </ul>
              <h3>Speak to your GP first if you</h3>
              <ul>
                <li>Take blood thinners (warfarin, apixaban, aspirin, clopidogrel) — turmeric mildly increases bleeding risk</li>
                <li>Take diabetes medication — curcumin can lower blood sugar</li>
                <li>Have gallstones or bile-duct obstruction</li>
                <li>Are pregnant or breastfeeding — avoid high-dose supplements</li>
                <li>Are due to have surgery within the next 2 weeks — stop 14 days beforehand</li>
              </ul>
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
            <div className="space-y-4">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border/40 bg-card p-5 open:bg-accent/40"
                >
                  <summary className="cursor-pointer list-none font-display text-base md:text-lg font-semibold text-foreground flex items-center justify-between gap-4">
                    {f.q}
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Compare turmeric to other options
            </h2>
            <p className="text-muted-foreground mb-5">
              Turmeric is one of several evidence-backed options. See where it fits alongside
              glucosamine, MSM and lifestyle changes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/supplements/glucosamine"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Glucosamine guide
              </Link>
              <Link
                to="/supplements/msm"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                MSM guide
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
