import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const AZA_FAQS = [
  {
    question: "What is azathioprine used for in arthritis?",
    answer:
      "Azathioprine is an immunosuppressant disease-modifying drug (DMARD) used to calm an overactive immune system in inflammatory and autoimmune conditions. In arthritis care it is most often prescribed for lupus (SLE), vasculitis, severe rheumatoid arthritis that hasn't responded to first-line DMARDs, and inflammatory arthritis linked to inflammatory bowel disease. It works gradually over 8â€“12 weeks to reduce joint inflammation, lower flare frequency and allow steroid doses to be tapered.",
  },
  {
    question: "How long does azathioprine take to work?",
    answer:
      "Most people start to feel a reduction in joint pain, stiffness and fatigue between 8 and 12 weeks after starting treatment, with maximum benefit by 3â€“6 months. Because it acts slowly, it is often started alongside a short course of prednisolone (oral steroid), which controls inflammation while azathioprine builds up.",
  },
  {
    question: "What is TPMT testing and why does it matter before azathioprine?",
    answer:
      "TPMT (thiopurine methyltransferase) is an enzyme that breaks azathioprine down. About 1 in 300 people have very low or absent TPMT activity, which dramatically raises the risk of severe bone-marrow suppression. UK guidance (BNF and BSR) recommends a TPMT blood test before the first dose. People with low TPMT may need a much lower dose; those with absent TPMT should not take azathioprine at all.",
  },
  {
    question: "What are the side effects of azathioprine?",
    answer:
      "Common, usually mild: nausea, loss of appetite, mild hair thinning and a flu-like feeling in the first few weeks. More serious risks that need monitoring include bone-marrow suppression (low white cells, anaemia, low platelets), liver inflammation, pancreatitis, increased risk of infection and a small long-term increase in risk of certain skin cancers and lymphoma. Regular blood tests are how these are picked up early.",
  },
  {
    question: "How often do I need blood tests on azathioprine?",
    answer:
      "Typical UK rheumatology shared-care monitoring: full blood count and liver function tests every 1â€“2 weeks for the first 6 weeks, then every 4 weeks for 3 months, then every 12 weeks long term once the dose is stable. Your rheumatology team or GP under a shared-care agreement will arrange this.",
  },
  {
    question: "Can I drink alcohol on azathioprine?",
    answer:
      "Small amounts of alcohol are generally accepted, but heavy or regular drinking increases the strain on the liver â€” which azathioprine is already working through. UK rheumatology teams typically advise staying within 14 units per week, spread across the week, and avoiding binge drinking. If your liver tests rise, your team may ask you to stop alcohol completely.",
  },
  {
    question: "Is azathioprine safe in pregnancy?",
    answer:
      "Azathioprine is one of the few immunosuppressants considered acceptable to continue during pregnancy and breastfeeding when the underlying condition needs it â€” long-term safety data from women with lupus and inflammatory bowel disease are reassuring. Stopping it can trigger flares that may harm both mother and baby. Always plan pregnancy with your rheumatology team; do not stop azathioprine without specialist advice.",
  },
  {
    question: "What medications interact with azathioprine?",
    answer:
      "The most important interaction is with allopurinol (used for gout) â€” it blocks the breakdown of azathioprine and can cause severe bone-marrow toxicity. The azathioprine dose must be cut to about a quarter, or a different DMARD chosen. Other interactions: live vaccines (avoid), warfarin (dose changes), trimethoprim and co-trimoxazole (raise blood-cell suppression risk), and ACE inhibitors (rare anaemia). Always tell every prescriber, including your dentist and pharmacist, that you take azathioprine.",
  },
];

const CONTENT = `
<h2 id="overview">Azathioprine for arthritis: an overview</h2>
<p>Azathioprine is an <strong>immunosuppressant disease-modifying anti-rheumatic drug (DMARD)</strong> that has been used in UK rheumatology for more than 50 years. It works by quietening an overactive immune system â€” the underlying problem in lupus, vasculitis, rheumatoid arthritis and several other inflammatory conditions â€” rather than just masking pain.</p>
<p>It is rarely the first DMARD tried in rheumatoid arthritis (methotrexate is), but it is a mainstay treatment for <strong>systemic lupus erythematosus (SLE)</strong>, <strong>vasculitis</strong>, <strong>autoimmune hepatitis-associated arthritis</strong>, and as a steroid-sparing option when long-term prednisolone is causing problems. It is also widely used in inflammatory bowel disease, where joint involvement is common.</p>
<p>Azathioprine works slowly â€” most people notice improvement at 8â€“12 weeks and full benefit by 3â€“6 months â€” so it is usually started alongside a short course of oral steroid that controls symptoms while the DMARD builds up.</p>

<h2 id="how-it-works">How azathioprine works</h2>
<p>Azathioprine is a "prodrug": once swallowed, the body converts it to <strong>6-mercaptopurine</strong>, which interferes with the building blocks (purines) that immune cells need to multiply. By slowing the production of the most active lymphocytes, it dampens down the autoimmune attack on joints, kidneys, blood vessels and other tissues.</p>
<p>Because it suppresses immune cell turnover rather than blocking a single inflammatory signal, azathioprine is broadly active across many autoimmune conditions â€” but the same mechanism is why blood monitoring is essential.</p>

<h2 id="conditions">Conditions azathioprine is used for</h2>
<ul>
<li><strong>Systemic lupus erythematosus (SLE)</strong> â€” first- or second-line steroid-sparing agent, particularly for joint, skin and mild kidney involvement</li>
<li><strong>Vasculitis</strong> (granulomatosis with polyangiitis, microscopic polyangiitis, polyarteritis nodosa) â€” used for maintenance after remission is induced</li>
<li><strong>Rheumatoid arthritis</strong> â€” when methotrexate, sulfasalazine, hydroxychloroquine and leflunomide are unsuitable</li>
<li><strong>Inflammatory bowel disease with arthritis</strong> â€” treats both gut and joint disease</li>
<li><strong>Autoimmune hepatitis</strong> with joint symptoms</li>
<li><strong>Polymyositis and dermatomyositis</strong> â€” as a steroid-sparing agent</li>
<li><strong>BehÃ§et's disease</strong> with arthritis or uveitis</li>
</ul>

<h2 id="before-starting">Before you start: TPMT testing and baseline checks</h2>
<p>UK rheumatology shared-care guidance requires several checks before the first dose:</p>
<ul>
<li><strong>TPMT enzyme test</strong> â€” a single blood test that identifies the small number of people who break azathioprine down too slowly and are at high risk of toxicity</li>
<li><strong>Full blood count</strong> (FBC) â€” baseline white cells, haemoglobin and platelets</li>
<li><strong>Liver function tests</strong> (LFTs) â€” baseline ALT, AST and bilirubin</li>
<li><strong>Urea and electrolytes</strong> (U&amp;Es) â€” kidney function</li>
<li><strong>Hepatitis B, hepatitis C and HIV screen</strong> â€” to avoid reactivating hidden infections</li>
<li><strong>Varicella (chickenpox) immunity check</strong> â€” vaccination may be needed before starting</li>
<li><strong>Up-to-date pneumococcal and annual flu vaccines</strong> â€” give before starting where possible</li>
</ul>
<p>If your TPMT activity is low, your specialist will start at a much lower dose or choose a different DMARD. If it is absent, azathioprine should not be used.</p>

<h2 id="dosing">How azathioprine is taken</h2>
<p>Azathioprine is taken as tablets (usually 25&nbsp;mg or 50&nbsp;mg). Typical starting doses are in the region of 1&nbsp;mg per kg of body weight per day, increased gradually to a target of 2â€“2.5&nbsp;mg/kg/day depending on the condition, blood results and TPMT status. Your rheumatology team will set your dose â€” never change it without specialist advice.</p>
<p>Practical tips:</p>
<ul>
<li>Take with or just after food to reduce nausea</li>
<li>Split the daily dose (morning and evening) if a single dose causes stomach upset</li>
<li>Take it at the same time each day so it's easy to remember</li>
<li>Don't crush or break the tablets â€” wash your hands after handling</li>
<li>Store at room temperature, away from children</li>
</ul>

<h2 id="monitoring">Blood-test monitoring on azathioprine</h2>
<p>Regular monitoring is what makes long-term azathioprine safe. A typical UK shared-care schedule looks like this:</p>
<ul>
<li><strong>Weeks 0â€“6:</strong> FBC and LFTs every 1â€“2 weeks while the dose is being increased</li>
<li><strong>Months 2â€“3:</strong> every 4 weeks</li>
<li><strong>Long term (stable dose):</strong> every 12 weeks indefinitely</li>
<li><strong>After any dose change:</strong> back to fortnightly bloods for 6 weeks</li>
</ul>
<p>Your GP will usually do the bloods under a shared-care agreement with your rheumatology team. Don't skip them, even when you feel well â€” they pick up bone-marrow or liver problems before you would notice symptoms.</p>

<h2 id="side-effects">Side effects of azathioprine</h2>
<h3>Common and usually mild</h3>
<ul>
<li>Nausea, loss of appetite or mild stomach upset (especially in the first few weeks)</li>
<li>Mild hair thinning</li>
<li>A flu-like feeling â€” aches, mild fever, headache â€” in the first 1â€“2 weeks. If this is severe or persistent, contact your team; it can occasionally be a hypersensitivity reaction that means azathioprine must be stopped</li>
<li>Mouth ulcers</li>
</ul>
<h3>Less common but important</h3>
<ul>
<li><strong>Bone-marrow suppression</strong> â€” low white cells (raised infection risk), anaemia or low platelets (easy bruising, bleeding)</li>
<li><strong>Liver inflammation</strong> â€” usually picked up on routine bloods before symptoms appear</li>
<li><strong>Pancreatitis</strong> â€” severe upper-abdominal pain radiating to the back; needs urgent assessment</li>
<li><strong>Increased risk of infections</strong> â€” including shingles and chest infections</li>
<li><strong>Long-term skin-cancer risk</strong> â€” sun protection (SPF 50, hats, covered clothing) is important; check your skin regularly</li>
<li><strong>Small long-term increase in lymphoma risk</strong> â€” particularly with very long use; the absolute risk remains low and is usually outweighed by disease benefit</li>
</ul>
<p>Contact your rheumatology team urgently if you develop fever, sore throat, unusual bruising or bleeding, severe stomach pain, yellowing of the skin or eyes, or a new rash.</p>

<h2 id="interactions">Drug interactions to know</h2>
<ul>
<li><strong>Allopurinol</strong> (for gout) â€” the most dangerous interaction. It blocks the breakdown of azathioprine; the azathioprine dose must be reduced to about a quarter, or a different DMARD chosen. Tell every prescriber if you take both.</li>
<li><strong>Febuxostat</strong> â€” same problem as allopurinol; avoid the combination.</li>
<li><strong>Trimethoprim, co-trimoxazole</strong> â€” raise the risk of low blood counts.</li>
<li><strong>Warfarin</strong> â€” INR can change; more frequent monitoring is needed.</li>
<li><strong>ACE inhibitors</strong> (ramipril, lisinopril) â€” occasionally cause anaemia when combined.</li>
<li><strong>Live vaccines</strong> (MMR, yellow fever, nasal flu, BCG, shingles Zostavax) â€” avoid while on azathioprine. The non-live shingles vaccine (Shingrix), inactivated flu and pneumococcal vaccines are recommended.</li>
</ul>

<h2 id="pregnancy">Azathioprine, pregnancy and breastfeeding</h2>
<p>Azathioprine is one of the few immunosuppressants that <strong>can usually be continued safely during pregnancy and breastfeeding</strong> when the underlying condition requires ongoing treatment. Long-term registry data from women with lupus and inflammatory bowel disease show no consistent increase in major birth defects. Untreated flares of lupus or vasculitis carry significant risks to both mother and baby, so stopping azathioprine in pregnancy is usually <em>not</em> recommended.</p>
<p>Plan any pregnancy with your rheumatology team. Men taking azathioprine can father children safely; older advice to stop the drug before conception has been superseded.</p>

<h2 id="lifestyle">Living well on azathioprine</h2>
<ul>
<li><strong>Sun protection</strong> â€” daily SPF 50 on exposed skin, covered clothing, hat. Have any new or changing moles checked promptly.</li>
<li><strong>Vaccinations</strong> â€” annual inactivated flu, pneumococcal, COVID-19 boosters and the non-live shingles vaccine (Shingrix). Avoid live vaccines.</li>
<li><strong>Infections</strong> â€” contact your GP early for sore throats, chesty coughs, urinary symptoms or shingles-type rashes. Don't wait it out.</li>
<li><strong>Alcohol</strong> â€” stay within 14 units per week; avoid binges. Stop completely if your liver tests rise.</li>
<li><strong>Diet and exercise</strong> â€” the usual anti-inflammatory pattern (see our <a href="/guides/diet">Diet Guide</a> and <a href="/guides/exercise">Exercise Guide</a>) supports general health and helps offset steroid side effects if you are also on prednisolone.</li>
<li><strong>Travel</strong> â€” get pre-travel advice 6â€“8 weeks ahead; some destinations need vaccines that must be planned around your immunosuppression.</li>
</ul>

<h2 id="how-to-access">How azathioprine is prescribed in the UK</h2>
<p>Azathioprine for arthritis is a <strong>specialist-initiated</strong> drug. The typical pathway is:</p>
<ul>
<li>Diagnosis and decision to treat by a <strong>rheumatologist</strong> (or other relevant specialist)</li>
<li>Baseline checks, TPMT test and counselling at the rheumatology clinic</li>
<li>First few weeks of prescribing and monitoring by the specialist team</li>
<li>Once the dose is stable, prescribing handed to the <strong>GP under a shared-care agreement</strong>, with the rheumatology team still reviewing you 6â€“12 monthly</li>
</ul>
<p>Shared-care arrangements mean your GP can issue repeats, do your monitoring bloods and act on results â€” but anything unusual (low counts, raised liver enzymes, infections, planning pregnancy) should be flagged to your specialist team.</p>

<h2 id="questions-to-ask">Questions to ask your rheumatology team</h2>
<ul>
<li>Why is azathioprine the right DMARD for me, rather than methotrexate or another option?</li>
<li>What was my TPMT result, and how does it affect my dose?</li>
<li>What target dose are we working towards, and over how many weeks?</li>
<li>Who arranges my monitoring bloods â€” and what do I do if I'm called for one I can't attend?</li>
<li>Which symptoms should make me contact you urgently?</li>
<li>Which vaccines should I have, and which should I avoid?</li>
<li>What's the plan for pregnancy / fatherhood if relevant?</li>
<li>If azathioprine doesn't work or I can't tolerate it, what's the next option?</li>
</ul>

<h2 id="key-takeaways">Key takeaways</h2>
<ul>
<li>Azathioprine is a steroid-sparing DMARD widely used in lupus, vasculitis and some forms of inflammatory arthritis.</li>
<li>It works slowly â€” expect 8â€“12 weeks for benefit, 3â€“6 months for full effect.</li>
<li>A <strong>TPMT blood test</strong> before starting is essential to avoid severe toxicity.</li>
<li>Regular FBC and liver-function monitoring is what makes long-term use safe.</li>
<li>The dangerous interaction to remember is <strong>allopurinol</strong>; tell every prescriber.</li>
<li>It is usually safe to continue in pregnancy and breastfeeding under specialist supervision.</li>
<li>Pair with sun protection, vaccinations, early infection care, and exercise / diet support for the best long-term outcome.</li>
</ul>

<p><em>This guide is educational and does not replace advice from your rheumatology team or GP. Always follow the dose and monitoring plan your specialist has set for you. Reference standards: BNF (British National Formulary) and British Society for Rheumatology (BSR) DMARD safety guidelines.</em></p>
`;

export default function AzathioprineGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Azathioprine for Arthritis â€” UK Patient Guide</title>
        <meta
          name="description"
          content="UK guide to azathioprine for arthritis: how it works, who it's for, TPMT testing, blood monitoring, side effects and safe long-term use."
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Azathioprine for Arthritis: UK Guide" />
        <meta property="og:description" content="How azathioprine works in lupus, vasculitis and inflammatory arthritis â€” TPMT testing, dosing, side effects, monitoring and interactions." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/azathioprine-for-arthritis" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azathioprine for Arthritis: UK Guide" />
        <meta name="twitter:description" content="How azathioprine works in lupus, vasculitis and inflammatory arthritis â€” TPMT testing, dosing, side effects, monitoring and interactions." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>
      <PageSchema
        url="/guides/azathioprine-for-arthritis"
        name="Azathioprine for Arthritis: UK Guide to Uses, Side Effects & Monitoring"
        description="How azathioprine works for lupus, vasculitis and inflammatory arthritis â€” TPMT testing, dosing, blood monitoring, side effects, interactions and pregnancy."
        medical={{ condition: "Inflammatory Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Azathioprine for Arthritis" },
        ]}
        faqs={AZA_FAQS}
        lastReviewed="2026-06-25"
        idPrefix="azathioprine-guide"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Azathioprine for Arthritis"
          subtitle="A plain-English UK guide to azathioprine â€” how it works, TPMT testing, dosing, side effects, blood monitoring and the conditions it's prescribed for."
          badge="Medication Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Azathioprine is one of the oldest and most widely used disease-modifying drugs in UK
            rheumatology, prescribed for lupus, vasculitis, severe rheumatoid arthritis and
            several other autoimmune conditions. This guide explains exactly how it works, why
            TPMT testing matters before your first dose, what blood monitoring you'll need, and
            the side effects and interactions to be aware of â€” written in plain English and
            reviewed against UK BNF and British Society for Rheumatology standards.
          </p>
          <TableOfContents html={html} />
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
          />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Related medication &amp; condition guides</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/steroids-for-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">â† Medication Guide</p>
                <p className="font-bold text-foreground">Steroids for Arthritis</p>
                <p className="text-sm text-muted-foreground mt-1">Injections, tablets, side effects and UK access.</p>
              </Link>
              <Link to="/conditions/rheumatoid-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Condition â†’</p>
                <p className="font-bold text-foreground">Rheumatoid Arthritis</p>
                <p className="text-sm text-muted-foreground mt-1">Symptoms, DMARDs, biologics and lifestyle.</p>
              </Link>
              <Link to="/conditions/lupus" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Condition â†’</p>
                <p className="font-bold text-foreground">Lupus (SLE)</p>
                <p className="text-sm text-muted-foreground mt-1">Why azathioprine is a first-line steroid-sparing option.</p>
              </Link>
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Access â†’</p>
                <p className="font-bold text-foreground">UK Health Services Guide</p>
                <p className="text-sm text-muted-foreground mt-1">Rheumatology, shared care and how to get seen.</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/azathioprine-for-arthritis" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


