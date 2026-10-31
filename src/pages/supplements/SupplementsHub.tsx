import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Pill } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import PageSchema from "@/components/seo/PageSchema";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_SUPPLEMENTS } from "@/data/clinical/ukCitations";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/supplements`;

const META_TITLE = "Arthritis Supplements: What Works (UK Guide)";
const META_DESC =
  "UK hub for arthritis supplements: glucosamine, MSM, turmeric, omega-3, collagen, ginger and vitamin D. What the evidence and NICE say, and what to check first.";

const SUPPLEMENTS = [
  {
    to: "/supplements/glucosamine",
    label: "Glucosamine",
    desc: "The best-known joint supplement. NICE (NG226) says it should not be offered for osteoarthritis because there is no strong evidence that it helps.",
  },
  {
    to: "/supplements/msm",
    label: "MSM (methylsulfonylmethane)",
    desc: "An organic sulfur compound. Only small, short trials exist, so the evidence is limited.",
  },
  {
    to: "/supplements/turmeric",
    label: "Turmeric and curcumin",
    desc: "Some small trials suggest curcumin may modestly ease knee OA pain, but evidence is limited and it can interact with medicines.",
  },
  {
    to: "/blog/arthritis-and-omega-3-fish-oil",
    label: "Omega-3 fish oil",
    desc: "Most evidence is in rheumatoid arthritis. Eating oily fish is the food-first option. Check with your GP or pharmacist before taking capsules.",
  },
  {
    to: "/supplements/collagen",
    label: "Collagen peptides",
    desc: "Hydrolysed peptides and undenatured type II collagen. The evidence for osteoarthritis symptoms is mixed and limited.",
  },
  {
    to: "/supplements/collagen-alternatives",
    label: "Collagen alternatives",
    desc: "Vegan, halal and allergy-friendly options to discuss when collagen is not suitable for you.",
  },
  {
    to: "/blog/ginger-root-natural-anti-inflammatory",
    label: "Ginger",
    desc: "A common kitchen spice. Trial evidence for arthritis is limited, and supplements may interact with blood thinners.",
  },
  {
    to: "/blog/vitamin-d-arthritis-uk",
    label: "Vitamin D",
    desc: "The NHS advises everyone in the UK to consider 10 micrograms a day in autumn and winter. It is about general bone and muscle health, not treating arthritis.",
  },
];

const FURTHER_READING = [
  { to: "/blog/best-supplements-arthritis-uk", label: "Best supplements for arthritis in the UK: what the evidence says" },
  { to: "/blog/best-supplements-joint-pain", label: "Supplements for joint pain" },
  { to: "/blog/best-supplement-for-knee-joint", label: "Supplements for the knee joint" },
  { to: "/blog/glucosamine-vs-collagen", label: "Glucosamine vs collagen" },
  { to: "/blog/turmeric-for-arthritis", label: "Turmeric for arthritis" },
  { to: "/blog/turmeric-curcumin-arthritis-evidence", label: "Turmeric and curcumin: the evidence" },
  { to: "/blog/turmeric-and-methotrexate-interaction", label: "Turmeric and methotrexate" },
  { to: "/blog/ginger-vs-turmeric-for-arthritis", label: "Ginger vs turmeric" },
  { to: "/blog/omega-3-foods-for-joints", label: "Omega-3 foods for joints" },
  { to: "/blog/fatty-fish-omega-3-arthritis-evidence", label: "Oily fish and omega-3: the evidence" },
  { to: "/blog/vitamin-d-and-falls-arthritis-uk", label: "Vitamin D and falls" },
  { to: "/blog/vitamin-d-winter-arthritis-frailty-uk", label: "Vitamin D in winter" },
  { to: "/blog/medication-supplement-interactions-arthritis", label: "Medicine and supplement interactions" },
];

const SUPPLEMENT_FAQS = [
  {
    question: "Do supplements really work for arthritis?",
    answer:
      "The evidence is mixed, and for most supplements it is weak. Some people report small improvements, but none work as well as exercise and weight management, and none reverse joint damage. Check with your GP or pharmacist before starting one.",
  },
  {
    question: "Does NICE recommend glucosamine?",
    answer:
      "No. NICE guideline NG226 says glucosamine should not be offered to manage osteoarthritis. If you ask about it, your clinician should explain that there is no strong evidence that it helps.",
  },
  {
    question: "Which arthritis supplement has the best evidence?",
    answer:
      "None has strong evidence. For knee osteoarthritis, some small trials of curcumin report modest benefits. For rheumatoid arthritis, some trials of omega-3 fish oil suggest it may ease stiffness. NICE advises against glucosamine. Check with your GP or pharmacist before starting any of them.",
  },
  {
    question: "Are joint supplements safe?",
    answer:
      "Many are well tolerated, but they can interact with prescription medicines. Turmeric, ginger and fish oil may add to the effect of blood thinners. Always check with your GP or pharmacist before starting one, especially if you take blood thinners, methotrexate or diabetes medicines.",
  },
  {
    question: "How long should I try a supplement for?",
    answer:
      "Agree a trial period with your pharmacist and keep a simple symptom diary. If you notice no clear benefit by the end of it, it is reasonable to stop rather than keep paying for it.",
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
    // BreadcrumbList is intentionally not emitted here — <PageBreadcrumb>
    // below already injects it, and <PageSchema> no longer duplicates it.
    const scripts = [itemList].map((d) => {
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
        <title>{`${META_TITLE} | Living With Arthritis`}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="keywords"
          content="arthritis supplements, joint supplements UK, glucosamine, msm, turmeric, omega 3, collagen, supplements for joint pain"
        />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <meta name="geo.region" content="GB" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis" />
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
        lastReviewed="2026-09-16"
        idPrefix="supplements-hub"
      />

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Supplements" }]} />

        <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Pill className="w-3 h-3" /> Supplement Hub
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Arthritis supplements: what actually works
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The UK joint-supplement aisle is overwhelming. This hub links to every supplement
              guide on our site, covering glucosamine, MSM, turmeric, omega-3, collagen, ginger and
              vitamin D. Each one explains what the evidence says, what NICE and the NHS advise, and
              what to check with a GP or pharmacist first.
            </p>
          </div>
        </div>

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <EducationalDisclaimerBox lastReviewed="2026-09-16" />
          <TopicClusterNav path="/supplements" />
          <ArticleCitations citations={CITATIONS_SUPPLEMENTS} />
          <div className="grid sm:grid-cols-2 gap-4">
            {SUPPLEMENTS.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="group rounded-xl border border-border/40 px-5 py-5 hover:bg-accent transition-colors flex flex-col"
              >
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {s.label} <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="block text-sm text-muted-foreground mt-2 leading-relaxed">
                  {s.desc}
                </span>
              </Link>
            ))}
          </div>

          <section className="prose prose-lg max-w-none mt-12 text-foreground/85 prose-headings:font-display prose-headings:text-foreground">
            <h2 id="check-first">Check with a GP or pharmacist first</h2>
            <p>
              Supplements are sold as food products, not medicines, so they do not go through the same
              checks on whether they work. Strength and quality can vary between brands. Before you
              start any supplement, speak to your GP or a pharmacist, especially if you:
            </p>
            <ul>
              <li>take blood thinners such as warfarin, apixaban or clopidogrel</li>
              <li>take methotrexate or another disease-modifying medicine</li>
              <li>have diabetes, liver or kidney disease, or a planned operation</li>
              <li>are pregnant, trying to get pregnant or breastfeeding</li>
              <li>already take several supplements, as ingredients can overlap</li>
            </ul>
            <p>
              A pharmacist can check for interactions for free and without an appointment. Take the
              packet, or a photo of the label, so they can see the exact ingredients and doses. Read our
              guide to <Link to="/blog/medication-supplement-interactions-arthritis">medicine and supplement interactions</Link> before you go.
            </p>

            <h2 id="what-nice-says">What NICE says about glucosamine</h2>
            <p>
              The NICE guideline on osteoarthritis (NG226, 2022) says: "Do not offer glucosamine" to
              manage osteoarthritis. It also says that if someone asks about it, clinicians should explain
              that there is no strong evidence of benefit. This is why glucosamine is not prescribed on the
              NHS for osteoarthritis.
            </p>
            <p>
              Some people still choose to buy it. If you do, check with a pharmacist first, as some
              products are made from shellfish and some may affect blood thinners. Our{" "}
              <Link to="/supplements/glucosamine">glucosamine guide</Link> and our comparison of{" "}
              <Link to="/blog/glucosamine-vs-collagen">glucosamine and collagen</Link> explain the evidence in more detail.
            </p>

            <h2 id="what-works-best">What has stronger evidence than supplements</h2>
            <p>
              NICE says the core treatments for osteoarthritis are therapeutic exercise and, if you are
              overweight, weight management. Any weight loss is likely to help, and NICE notes that losing
              10% of your body weight is likely to be better than 5%. For knee osteoarthritis, NICE
              recommends offering a topical NSAID before other medicines.
            </p>
            <p>
              Supplements, if you use them, should sit on top of these, not replace them. Start with our{" "}
              <Link to="/guides/exercise">exercise guide</Link>, the{" "}
              <Link to="/guides/diet">arthritis diet guide</Link> and the{" "}
              <Link to="/conditions/osteoarthritis">osteoarthritis guide</Link>. For day-to-day pain,
              see <Link to="/guides/arthritis-pain-relief">arthritis pain relief</Link>.
            </p>

            <h2 id="food-first">Food first: omega-3, vitamin D and spices</h2>
            <p>
              Many of the nutrients sold as joint supplements can come from food. The NHS recommends at
              least 2 portions of fish a week, including 1 of oily fish such as salmon, mackerel or
              sardines. If you eat oily fish regularly, you may not need a fish oil capsule. Read about{" "}
              <Link to="/blog/omega-3-foods-for-joints">omega-3 foods for joints</Link> and the{" "}
              <Link to="/blog/fatty-fish-omega-3-arthritis-evidence">evidence on oily fish</Link>.
            </p>
            <p>
              Vitamin D is different, because it is hard to get enough from food. The NHS advises everyone
              in the UK to consider taking 10 micrograms of vitamin D a day during autumn and winter, and
              all year round for some people who get little sun. This supports general bone and muscle
              health. It is not a treatment for arthritis. See{" "}
              <Link to="/blog/vitamin-d-arthritis-uk">vitamin D and arthritis</Link>,{" "}
              <Link to="/blog/vitamin-d-winter-arthritis-frailty-uk">vitamin D in winter</Link> and{" "}
              <Link to="/blog/vitamin-d-and-falls-arthritis-uk">vitamin D and falls</Link>.
            </p>
            <p>
              Turmeric and ginger are safe to cook with in normal amounts. Concentrated supplements are
              different and can interact with medicines. Compare them in{" "}
              <Link to="/blog/ginger-vs-turmeric-for-arthritis">ginger vs turmeric</Link>, and if you take
              methotrexate, read <Link to="/blog/turmeric-and-methotrexate-interaction">turmeric and methotrexate</Link>{" "}
              and talk to your rheumatology team before starting turmeric.
            </p>

            <h2 id="how-to-try">If you decide to try a supplement</h2>
            <ol>
              <li>Check with your GP or pharmacist that it is safe with your medicines and conditions.</li>
              <li>Try one product at a time, so you can tell whether it makes a difference.</li>
              <li>Write down your pain and stiffness each week in a simple diary.</li>
              <li>Agree a trial period with your pharmacist, then stop if you see no clear benefit.</li>
              <li>Tell your GP, rheumatology team and anyone treating you which supplements you take.</li>
              <li>Be wary of products that promise to cure arthritis or rebuild cartilage. No supplement has been shown to do this.</li>
            </ol>

            <h2 id="questions-to-ask">Questions to ask your pharmacist</h2>
            <p>
              Community pharmacists can talk through supplements without an appointment. Taking the product
              or a photo of its label helps them check the ingredients and the amount in each dose. Useful
              questions include:
            </p>
            <ul>
              <li>Is this safe to take with my prescribed medicines, including blood thinners and anti-inflammatories?</li>
              <li>Is it suitable if I am pregnant, breastfeeding, have kidney or liver problems, or am waiting for an operation?</li>
              <li>Does it contain anything I am allergic to, such as shellfish or fish?</li>
              <li>How long would it be reasonable to try it before deciding whether it is helping?</li>
              <li>Is there a treatment with better evidence that I should try first?</li>
            </ul>
            <p>
              Supplements are sold as food products in the UK, so they are not tested for effectiveness in
              the same way as medicines. A higher price or a bold claim on the label does not mean a product
              works better. If a supplement seems to help, keep your GP or rheumatology team informed so it
              stays part of your medicines record.
            </p>

            <h2 id="further-reading">All supplement articles</h2>
            <ul>
              {FURTHER_READING.map((r) => (
                <li key={r.to}>
                  <Link to={r.to}>{r.label}</Link>
                </li>
              ))}
            </ul>

            <h2 id="supplement-faqs">Frequently asked questions</h2>
            {SUPPLEMENT_FAQS.map((f) => (
              <div key={f.question}>
                <h3>{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}

            <h2 id="urgent-help">When to get urgent help</h2>
            <p>
              Stop taking a supplement and contact a pharmacist, your GP or NHS 111 if you get unusual
              bruising or bleeding, yellowing of your skin or eyes, or a rash. Call 999 if you have signs
              of a severe allergic reaction, such as swelling of the lips or throat or difficulty breathing.
            </p>
          </section>

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
                to="/guides/diet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Diet guide
              </Link>
              <Link
                to="/exercises"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Exercise hub
              </Link>
              <Link
                to="/blog/best-supplement-for-knee-joint"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Knee joint supplements (educational)
              </Link>
              <Link
                to="/conditions/osteoarthritis"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Osteoarthritis guide
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
