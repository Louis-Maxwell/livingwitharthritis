import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pill, FlaskConical, ShieldAlert, HelpCircle, Scale, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AnswerBox from "@/components/seo/AnswerBox";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements/glucosamine`;

const META_TITLE = "Glucosamine for Arthritis: Does It Work? UK Guide";
const META_DESC =
  "UK guide to glucosamine for arthritis — what the evidence really says, glucosamine sulfate vs HCl, dosage, side effects and how it compares to chondroitin, MSM and collagen.";

const FAQS = [
  {
    q: "Does glucosamine actually work for arthritis?",
    a: "Evidence is mixed. Larger UK and European trials show glucosamine sulfate (1,500 mg/day) gives a modest reduction in knee osteoarthritis pain over 6+ months for some people. Glucosamine hydrochloride performs less well. It is not a cure and does not regrow cartilage.",
  },
  {
    q: "Is glucosamine sulfate better than glucosamine HCl?",
    a: "Most positive trials used glucosamine sulfate. NICE and the European OA guidelines (ESCEO) only recommend pharmaceutical-grade crystalline glucosamine sulfate, not HCl. Read the label and look for 'glucosamine sulfate' with a stated 1,500 mg daily dose.",
  },
  {
    q: "How long until glucosamine works?",
    a: "Allow 8–12 weeks of consistent daily use before judging the effect. If you feel no benefit by 3 months, stop — your money is better spent elsewhere.",
  },
  {
    q: "What's the right glucosamine dosage?",
    a: "1,500 mg per day, taken with food. This can be a single dose or split (e.g. 500 mg three times daily). Higher doses don't improve results.",
  },
  {
    q: "What are the side effects of glucosamine?",
    a: "Generally well tolerated. Mild stomach upset, heartburn, nausea or headache are the most common. Avoid if you have a shellfish allergy (most glucosamine is shellfish-derived), are pregnant or breastfeeding, or take warfarin — glucosamine can raise INR.",
  },
  {
    q: "Glucosamine vs chondroitin — which is better?",
    a: "Trials of combined glucosamine + chondroitin (the GAIT study) show benefit only for moderate-to-severe knee OA, not mild cases. Taken alone, glucosamine sulfate has stronger evidence than chondroitin in Europe.",
  },
  {
    q: "Does the NHS recommend glucosamine?",
    a: "No. NICE does not recommend glucosamine on the NHS because the evidence is inconsistent. You can still buy it from UK pharmacies — many people try it for 3 months and continue only if they feel a clear benefit.",
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
        logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
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
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Supplements", item: `${BASE}/supplements` },
        { "@type": "ListItem", position: 3, name: "Glucosamine", item: URL },
      ],
    };
    const scripts = [medical, faq, breadcrumb].map((d) => {
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
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
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

        <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <MedicalReviewBadge />

          <AnswerBox question="Does glucosamine work for arthritis?" reviewed="2026-06-18">
            <p>
              Glucosamine <strong>sulfate</strong> at <strong>1,500 mg/day</strong> gives a modest
              reduction in knee osteoarthritis pain for some people after 8–12 weeks of consistent
              use. It does not regrow cartilage and the NHS does not prescribe it. If you don't feel
              clear benefit after 3 months, stop.
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
                  <strong>The UK's NICE guidelines (NG226)</strong> do not recommend glucosamine on the NHS
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
              <ul>
                <li><strong>Dose:</strong> 1,500 mg of glucosamine sulfate per day.</li>
                <li><strong>Schedule:</strong> one 1,500 mg tablet, or 500 mg three times a day.</li>
                <li><strong>With food</strong> to reduce stomach upset.</li>
                <li><strong>Trial length:</strong> 8–12 weeks before judging the effect.</li>
                <li><strong>Stop if</strong> you notice no clear benefit by 3 months.</li>
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
              <h3>Do not take glucosamine if you</h3>
              <ul>
                <li>Have a shellfish allergy (unless the label confirms vegan/fermented source)</li>
                <li>Are pregnant or breastfeeding — not enough safety data</li>
                <li>Take warfarin — glucosamine can raise INR and increase bleeding risk</li>
                <li>Are about to have surgery — stop 2 weeks before</li>
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
                  <strong>Chondroitin</strong> — often combined with glucosamine. Modest benefit in
                  moderate-to-severe knee OA; little benefit alone for mild OA.
                </li>
                <li>
                  <strong><Link to="/supplements/msm" className="text-primary underline">MSM</Link></strong> — small
                  studies suggest it eases pain and stiffness in knee OA. Often added to glucosamine
                  formulas.
                </li>
                <li>
                  <strong>Collagen peptides (hydrolysed type II)</strong> — emerging evidence for joint
                  comfort; may complement glucosamine rather than replace it.
                </li>
                <li>
                  <strong>Turmeric / curcumin</strong> — strong anti-inflammatory action; in some trials
                  works as well as low-dose ibuprofen for knee OA.
                </li>
                <li>
                  <strong>Omega-3 (fish oil)</strong> — best evidence is in rheumatoid arthritis, not OA.
                </li>
              </ul>
              <p>
                If you're going to try one, try it on its own for 12 weeks. Stacking three supplements
                makes it impossible to tell what's working.
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
              Pair supplements with what really works
            </h2>
            <p className="text-muted-foreground mb-5">
              Supplements help a bit. Exercise, weight management and an anti-inflammatory diet help
              a lot. Build all three together.
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
