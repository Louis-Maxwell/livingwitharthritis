import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_FEBUXOSTAT } from "@/data/clinical/ukCitations";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const FEBUXOSTAT_FAQS = [
  { question: "What is febuxostat used for?", answer: "Febuxostat (brand names Adenuric, Uloric) is a urate-lowering medication used to prevent gout attacks in adults whose uric acid levels remain high despite lifestyle measures, or who cannot tolerate allopurinol. By lowering uric acid in the blood, it gradually dissolves the crystals in joints that cause gout flares." },
  { question: "How long does febuxostat take to work?", answer: "Febuxostat begins lowering uric acid within 24–48 hours, but it can take 3–6 months of consistent daily dosing to dissolve existing crystal deposits in the joints. Many people experience more frequent gout flares in the first 3–6 months as the crystals shift — this does not mean the medication has failed." },
  { question: "What are the side effects of febuxostat?", answer: "Common side effects include nausea, diarrhoea, headache, raised liver enzymes and a rash. More serious risks include cardiovascular events in people with existing heart disease, severe skin reactions (Stevens–Johnson syndrome) and liver injury. Tell your prescriber immediately about chest pain, breathlessness, jaundice or a spreading rash." },
  { question: "Is febuxostat better than allopurinol?", answer: "For most people, allopurinol is tried first because it is cheaper and has decades of safety data. Febuxostat is used when allopurinol is not tolerated, when uric acid targets cannot be reached on maximum allopurinol, or in people with reduced kidney function where allopurinol dosing is restricted. Febuxostat is at least as effective at lowering uric acid." },
  { question: "What is the target uric acid level on febuxostat?", answer: "For most people the target is below 360 µmol/L (6 mg/dL). In severe gout with tophi or frequent flares, the target is lower — below 300 µmol/L (5 mg/dL) — to encourage faster crystal dissolution. Your prescriber will check blood levels at 2–4 weeks, then every 3–6 months." },
  { question: "Do I need to take colchicine with febuxostat?", answer: "Often, yes — but only if your rheumatology team or GP prescribes it. Starting urate-lowering treatment can trigger flares as crystals dissolve. Clinicians commonly prescribe short-term flare prophylaxis (for example colchicine or an NSAID if suitable) for the early months. Do not start or stop prophylaxis yourself." },
  { question: "Can I drink alcohol on febuxostat?", answer: "Alcohol — especially beer and spirits — raises uric acid and provokes gout flares. Febuxostat will still work, but heavy drinking undermines the treatment and increases pressure on the liver. Moderate wine intake is the lowest-risk choice; staying within 14 UK units per week is sensible." },
];

const CONTENT = `
<h2 id="overview">Febuxostat for gout: an overview</h2>
<p>Gout is the most common form of inflammatory arthritis, affecting around <strong>1 in 40 adults</strong> in the UK. It happens when uric acid in the blood rises high enough to form sharp crystals inside joints — most often the big toe, but also the ankle, knee, wrist and fingers. The body's immune response to these crystals causes the sudden, severe pain of a gout attack.</p>
<p>Febuxostat (sold as <strong>Adenuric</strong> in the UK and <strong>Uloric</strong> in the US) is a <strong>urate-lowering therapy</strong>: it doesn't treat the pain of an attack, but taken every day it lowers the level of uric acid in the blood, gradually dissolves the crystal deposits already in the joints, and over time prevents new attacks.</p>
<p>It is one of two main long-term gout medications used in the UK, the other being <strong>allopurinol</strong>. Both work by blocking <em>xanthine oxidase</em>, the enzyme that produces uric acid. Febuxostat is a more targeted blocker and is the recommended option when allopurinol has not worked, has caused side effects, or cannot be dosed high enough because of reduced kidney function.</p>

<h2 id="how-it-works">How febuxostat works</h2>
<p>Uric acid is a normal waste product made when the body breaks down purines — chemicals found in cells and in some foods. Most people clear it efficiently through the kidneys. In gout, either too much uric acid is produced, too little is excreted, or both.</p>
<p>Febuxostat blocks the xanthine oxidase enzyme so the body produces less uric acid in the first place. Blood levels begin to fall within 24–48 hours, and most people reach the recommended target of below <strong>360 µmol/L (6 mg/dL)</strong> within 4–8 weeks of starting treatment.</p>
<p>Once uric acid is below this threshold for long enough, the crystal deposits in the joints — and the larger lumps known as <strong>tophi</strong> under the skin — slowly dissolve. This is what protects against future attacks and reverses long-term joint damage.</p>

<h2 id="who-its-for">Who febuxostat is for</h2>
<p>NICE guidance (TA164) recommends febuxostat for adults with chronic gout where uric acid crystal deposition has already caused damage and where allopurinol is either contraindicated or not tolerated. In practice, your GP or rheumatologist may consider febuxostat if:</p>
<ul>
<li>You have had <strong>two or more gout attacks in a year</strong></li>
<li>You have <strong>tophi</strong> (firm lumps of urate crystals under the skin)</li>
<li>You have <strong>urate kidney stones</strong></li>
<li>You have <strong>chronic kidney disease</strong> that limits allopurinol dosing</li>
<li>You experienced a rash, raised liver enzymes or other side effects on allopurinol</li>
<li>Your uric acid level remains above target despite maximum allopurinol</li>
</ul>

<h2 id="dose-and-monitoring">How clinicians typically monitor febuxostat</h2>
<p>UK labels and BNF summaries describe common starting strengths (often discussed as 80 mg once daily, sometimes increased toward 120 mg if uric acid remains above target). <strong>Your rheumatology team sets your dose</strong> — do not start, increase or stop febuxostat based on this educational page. Follow the SmPC / patient leaflet they give you.</p>
<p>Your prescriber will usually arrange:</p>
<ul>
<li>A blood test for <strong>uric acid</strong> at 2–4 weeks, then every 3–6 months</li>
<li>A blood test for <strong>liver function</strong> at 2 months and then yearly</li>
<li>A discussion about <strong>flare prophylaxis</strong> with colchicine or a low-dose NSAID for the first 3–6 months</li>
</ul>
<p>It is essential to keep taking febuxostat <strong>every day</strong>, including during a gout attack. Stopping and starting urate-lowering therapy causes the uric acid level to swing, which triggers more attacks.</p>

<h2 id="side-effects">Side effects and safety</h2>
<p>Most people tolerate febuxostat well. The most common side effects are mild and short-lived:</p>
<ul>
<li>Nausea, diarrhoea or stomach discomfort</li>
<li>Headache</li>
<li>Mildly raised liver enzymes on blood tests</li>
<li>A mild rash</li>
</ul>
<p>Less common but more serious risks include:</p>
<ul>
<li><strong>Cardiovascular events</strong> — large trials have shown a small increase in heart-related events in people with established heart or vascular disease. The European Medicines Agency advises caution in this group; allopurinol is usually preferred unless not tolerated.</li>
<li><strong>Severe skin reactions</strong> — including Stevens–Johnson syndrome. Stop the medication and seek urgent medical advice if a rash spreads or blisters appear.</li>
<li><strong>Liver injury</strong> — rare but reported. Report yellowing of the skin or eyes, dark urine or persistent abdominal pain.</li>
</ul>

<h2 id="febuxostat-vs-allopurinol">Febuxostat vs allopurinol: which is better?</h2>
<p>For most newly diagnosed gout, <strong>allopurinol is first-line</strong>: it is cheaper, has decades of safety data, and is effective for the majority. Febuxostat is reserved for the situations listed above.</p>
<p>Head-to-head trials show febuxostat lowers uric acid at least as effectively as allopurinol, and often faster. It does not need dose adjustment in mild-to-moderate kidney disease, which is a major practical advantage. The trade-off is the cardiovascular signal in high-risk patients and the higher prescription cost.</p>

<h2 id="lifestyle">Lifestyle alongside febuxostat</h2>
<p>Medication does the heavy lifting in lowering uric acid, but diet and lifestyle reduce the burden and protect kidney function:</p>
<ul>
<li><strong>Limit alcohol</strong> — especially beer (high in purines) and spirits</li>
<li><strong>Cut sugary drinks</strong> — fructose raises uric acid as much as alcohol</li>
<li><strong>Reduce red meat, offal and shellfish</strong> — the highest-purine foods</li>
<li><strong>Drink 2 litres of water a day</strong> to help the kidneys clear urate</li>
<li><strong>Lose excess weight gradually</strong> — crash dieting and fasting raise uric acid temporarily</li>
<li><strong>Eat low-fat dairy and cherries</strong> — both associated with lower flare risk</li>
</ul>
<p>For a full anti-inflammatory eating pattern that supports gout and other forms of arthritis, see our <a href="/diet/foods-to-avoid-with-arthritis">foods to avoid with arthritis</a> guide.</p>

<h2 id="when-to-seek-help">When to seek urgent help</h2>
<ul>
<li>A <strong>spreading rash, blistering, or peeling skin</strong> — stop febuxostat and contact a doctor immediately.</li>
<li><strong>Chest pain, breathlessness or signs of stroke</strong> — call 999.</li>
<li><strong>Yellow skin or eyes, dark urine, or persistent right-sided abdominal pain</strong> — possible liver injury.</li>
<li>A gout attack that <strong>doesn't settle within a week</strong> on usual treatment — speak to your GP about flare control.</li>
</ul>

<h2 id="key-takeaways">Key takeaways</h2>
<ul>
<li>Febuxostat lowers uric acid by blocking xanthine oxidase, gradually dissolving crystal deposits in joints.</li>
<li>It is used when allopurinol is not tolerated or not effective, and when kidney function limits allopurinol dosing.</li>
<li>Target uric acid is below 360 µmol/L (300 µmol/L in severe gout with tophi).</li>
<li>Take it every single day — including during a flare — and pair it with colchicine for the first 3–6 months.</li>
<li>Watch for skin reactions, liver changes and cardiovascular risk in people with established heart disease.</li>
<li>Diet, alcohol and weight management amplify the benefit but do not replace daily medication.</li>
</ul>
`;

export default function FebuxostatGoutGuide() {
  const html = addHeadingIds(CONTENT);
  return (
    <>
      <Helmet>
        <title>Febuxostat for Gout — UK Guide | Living With Arthritis</title>
        <meta name="description" content="UK guide to febuxostat (Adenuric) for gout: how it works, dosing, monitoring, side effects, how it compares with allopurinol, and lifestyle tips." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Febuxostat for Gout – UK Guide to Dose, Side Effects & Monitoring" />
        <meta property="og:description" content="How febuxostat lowers uric acid and prevents gout attacks — dosing, monitoring, side effects, and how it compares with allopurinol." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/febuxostat-for-gout" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <PageSchema
        url="/guides/febuxostat-for-gout"
        name="Febuxostat for Gout: UK Guide"
        description="How febuxostat lowers uric acid and prevents gout attacks — dose, monitoring, side effects and lifestyle support."
        medical={{ condition: "Gout" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Febuxostat for Gout" },
        ]}
        faqs={FEBUXOSTAT_FAQS}
        lastReviewed="2026-09-15"
        idPrefix="febuxostat-guide"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Febuxostat for Gout"
          subtitle="A plain-English UK guide to dosing, monitoring, side effects and how febuxostat compares with allopurinol."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Febuxostat (Adenuric) is a daily tablet that lowers uric acid to prevent gout
            attacks. Used when allopurinol isn't tolerated or strong enough, it gradually
            dissolves the crystal deposits in joints that drive flares. This guide explains
            how it works, what to expect, and how to get the most from it.
          </p>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/painkillers-and-nsaids" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Related Guide →</p>
                <p className="font-bold text-foreground">Painkillers &amp; NSAIDs for Arthritis</p>
              </Link>
              <Link to="/guides/steroids-for-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Medication Guide →</p>
                <p className="font-bold text-foreground">Steroids for Arthritis</p>
              </Link>
              <Link to="/diet/foods-to-avoid-with-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Diet →</p>
                <p className="font-bold text-foreground">Foods to Avoid with Arthritis</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="container mx-auto px-5 md:px-10 max-w-3xl pb-8">
        <ArticleCitations citations={CITATIONS_FEBUXOSTAT} />
        <EducationalDisclaimerBox lastReviewed="2026-09-15" />
        <TopicClusterNav path="/guides/febuxostat-for-gout" />
      </div>
      <GuideOnwardJourney currentPath="/guides/febuxostat-for-gout" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


