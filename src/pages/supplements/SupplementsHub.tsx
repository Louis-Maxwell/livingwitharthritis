import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Pill } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import PageSchema from "@/components/seo/PageSchema";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements`;

const META_TITLE = "Arthritis Supplements: What Works (UK Guide)";
const META_DESC =
  "Honest UK guides to the most popular arthritis supplements — glucosamine, MSM, turmeric, omega-3, collagen — what the evidence says, dosing and side effects.";

const SUPPLEMENTS = [
  {
    to: "/supplements/glucosamine",
    label: "Glucosamine",
    desc: "Most-studied joint supplement. Glucosamine sulfate 1,500 mg/day gives modest knee OA pain relief for some people.",
    available: true,
  },
  {
    to: "/supplements/msm",
    label: "MSM (methylsulfonylmethane)",
    desc: "Organic sulfur compound. Small trials show modest pain and stiffness improvements in knee OA, often stacked with glucosamine.",
    available: true,
  },
  {
    to: "/blog/category/supplements",
    label: "Turmeric & curcumin",
    desc: "Strong anti-inflammatory action — comparable to low-dose NSAIDs in some knee OA trials. Coming soon as a dedicated guide.",
    available: false,
  },
  {
    to: "/blog/category/supplements",
    label: "Omega-3 fish oil",
    desc: "Best evidence is in rheumatoid arthritis: 2.7 g+ EPA/DHA per day reduces morning stiffness and tender joints.",
    available: false,
  },
  {
    to: "/blog/category/supplements",
    label: "Collagen peptides",
    desc: "Hydrolysed type II collagen — emerging evidence for joint comfort and cartilage support.",
    available: false,
  },
  {
    to: "/blog/category/supplements",
    label: "Ginger",
    desc: "Plant-based anti-inflammatory. 500–1,000 mg extract per day modestly eases knee OA pain and stiffness.",
    available: false,
  },
];

const SUPPLEMENT_FAQS = [
  {
    question: "Do supplements really work for arthritis?",
    answer:
      "Evidence is mixed. Glucosamine sulfate (1,500 mg/day), turmeric/curcumin and omega-3 fish oil have the strongest data — each can offer modest pain or stiffness improvement for some people. None are as effective as exercise, weight management or an anti-inflammatory diet, and none reverse joint damage.",
  },
  {
    question: "Which arthritis supplement has the best evidence?",
    answer:
      "For knee osteoarthritis, glucosamine sulfate and turmeric/curcumin have the most consistent positive trials. For rheumatoid arthritis, high-dose omega-3 fish oil (2.7 g+ EPA/DHA per day) has good evidence for reducing morning stiffness and tender joints.",
  },
  {
    question: "Are joint supplements safe?",
    answer:
      "Most are well tolerated, but they can interact with prescription medication. Glucosamine may interact with warfarin, turmeric thins the blood, and high-dose fish oil increases bleeding risk. Always check with your GP or pharmacist before starting one, especially if you take blood-thinners or have diabetes.",
  },
  {
    question: "How long do supplements take to work for arthritis?",
    answer:
      "Allow 8–12 weeks of consistent daily use before judging whether a supplement is helping. If there's no benefit after 3 months, it is unlikely to work for you and you can stop.",
  },
];

export default function SupplementsHub() {
  useEffect(() => {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: SUPPLEMENTS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.label,
        url: `${BASE}${s.to}`,
      })),
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Supplements", item: URL },
      ],
    };
    const scripts = [itemList, breadcrumb].map((d) => {
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
          content="arthritis supplements, joint supplements UK, glucosamine, msm, turmeric, omega 3, collagen, supplements for joint pain"
        />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <meta name="geo.region" content="GB" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
      </Helmet>

      <PageSchema
        url="/supplements"
        name="Arthritis Supplements: What Actually Works (UK Guide)"
        description="Evidence-based UK guides to the most popular arthritis supplements — glucosamine, MSM, turmeric, omega-3 and collagen — covering the data, dosing and side effects."
        medical={{ condition: "Arthritis" }}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Supplements" },
        ]}
        faqs={SUPPLEMENT_FAQS}
        lastReviewed="2026-06-01"
        idPrefix="supplements-hub"
      />

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Supplements" }]} />

        <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
              <Pill className="w-3 h-3" /> Supplement Hub
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Arthritis supplements: what actually works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The UK joint-supplement aisle is overwhelming. We've cut through the marketing with
              honest, plain-English guides — covering glucosamine, MSM, turmeric, omega-3,
              collagen and ginger. Each guide explains the evidence, the right dose and the
              honest verdict.
            </p>
          </div>
        </div>

        <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-4">
            {SUPPLEMENTS.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="group rounded-xl border border-border/40 px-5 py-5 hover:bg-accent transition-colors flex flex-col"
              >
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {s.label} <ArrowRight className="w-3.5 h-3.5" />
                  {!s.available && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Coming soon
                    </span>
                  )}
                </span>
                <span className="block text-sm text-muted-foreground mt-2 leading-relaxed">
                  {s.desc}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Supplements are not a substitute
            </h2>
            <p className="text-muted-foreground mb-5">
              The strongest evidence in arthritis care is for movement, weight management and an
              anti-inflammatory diet. Use supplements as a small addition, not a replacement, and
              speak to your GP or pharmacist before starting one — especially if you take
              prescription medication.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/diet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Diet hub
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
