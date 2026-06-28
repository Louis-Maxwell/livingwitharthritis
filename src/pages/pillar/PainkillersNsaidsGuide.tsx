import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const NSAID_FAQS = [
  { question: "What is the best painkiller for arthritis?", answer: "There is no single 'best' painkiller — the right choice depends on the type of arthritis, the joints involved, your other health conditions and what else you take. NICE guidance (NG226) recommends topical NSAID gels (such as diclofenac or ibuprofen) as the first-line painkiller for knee and hand osteoarthritis, with oral NSAIDs added at the lowest effective dose if topical treatment isn't enough. Paracetamol is now considered a weak option for osteoarthritis but is still useful for short-term, mild pain." },
  { question: "Are NSAIDs safe to take every day?", answer: "Long-term daily oral NSAIDs (ibuprofen, naproxen, diclofenac) raise the risk of stomach ulcers, kidney damage, raised blood pressure and cardiovascular events. They should be used at the lowest dose for the shortest time that controls symptoms, almost always with a stomach-protecting tablet (such as omeprazole or lansoprazole) if used for more than a few weeks. Topical NSAID gels are much safer for daily use because very little is absorbed into the bloodstream." },
  { question: "Can I take paracetamol and ibuprofen together for arthritis?", answer: "Yes — paracetamol and ibuprofen work through different mechanisms and can be taken together. A common pattern is paracetamol regularly (up to 1 g four times a day) with ibuprofen added at flare-ups. Always stay within the maximum dose for each drug and check with a pharmacist if you take other medications." },
  { question: "What's the difference between ibuprofen, naproxen and diclofenac?", answer: "All three are non-steroidal anti-inflammatory drugs (NSAIDs) that block the COX enzymes which drive inflammation and pain. Ibuprofen is short-acting (every 6–8 hours), naproxen is longer-acting (twice daily) and often preferred for arthritis, and diclofenac is potent but carries a higher cardiovascular risk so is usually used as a topical gel rather than tablets. The choice depends on dosing convenience and your individual risk profile." },
  { question: "Are codeine and tramadol safe for arthritis pain?", answer: "Weak opioids such as codeine, dihydrocodeine and tramadol can help short-term, but NICE no longer recommends routine opioid use for osteoarthritis because of limited benefit and significant risks — constipation, drowsiness, dependence and falls in older adults. They are reserved for short courses when other treatments have failed and a clear plan to stop is agreed." },
  { question: "Why does my doctor prescribe a stomach-protector with NSAIDs?", answer: "NSAIDs reduce the protective mucus lining of the stomach, increasing the risk of ulcers and bleeding. A proton-pump inhibitor (omeprazole, lansoprazole, esomeprazole) blocks acid production and reduces this risk significantly. Anyone aged over 65, anyone with a history of ulcers, and anyone taking NSAIDs daily for more than a few weeks should be prescribed one." },
  { question: "Can I use ibuprofen gel and ibuprofen tablets at the same time?", answer: "Topical NSAID absorption into the bloodstream is very low (around 5%), so combining the two is rarely a problem for short-term use. However, your prescriber may still advise against it if you are on a daily oral dose, have kidney problems, or are on other anti-inflammatory or blood-thinning medication. Check with a pharmacist." },
];

const CONTENT = `
<h2 id="overview">Painkillers and NSAIDs for arthritis: an overview</h2>
<p>Painkillers are the most widely used treatments for arthritis in the UK — and the most widely misunderstood. The right medication, at the right dose, for the right length of time can transform daily life. The wrong one, used for too long, can cause stomach bleeding, kidney damage and avoidable cardiovascular events.</p>
<p>This guide covers the four main groups: <strong>topical NSAIDs</strong>, <strong>oral NSAIDs</strong>, <strong>paracetamol</strong>, and <strong>weak opioids</strong>. It follows NICE guidance (NG226 for osteoarthritis) and the British National Formulary recommendations used in UK clinical practice.</p>

<h2 id="first-line">First-line: topical NSAID gels</h2>
<p>For knee and hand osteoarthritis, NICE now recommends a <strong>topical NSAID gel</strong> as the first painkiller to try. Diclofenac (Voltarol) and ibuprofen (Nurofen) gels deliver the anti-inflammatory effect directly to the joint, with only about 5% of the drug absorbed into the bloodstream.</p>
<p>This means most of the benefit with much less of the risk: very low rates of stomach ulcers, kidney problems and cardiovascular events compared with oral tablets. They are well-suited for older adults and anyone with high blood pressure, kidney disease or stomach problems.</p>
<p>To get the most from a topical NSAID:</p>
<ul>
<li>Apply a length of gel about the size of the joint (2–4 g for a knee)</li>
<li>Massage in firmly for 1–2 minutes</li>
<li>Use 3–4 times a day, every day, for at least 2 weeks before judging if it works</li>
<li>Wash hands after applying — and don't apply to broken skin</li>
</ul>

<h2 id="oral-nsaids">Oral NSAIDs: ibuprofen, naproxen, diclofenac</h2>
<p>If topical NSAIDs and exercise haven't controlled symptoms, an oral NSAID is the next step. The three most common in UK prescribing are:</p>
<ul>
<li><strong>Ibuprofen</strong> — 200–400 mg three or four times a day. Short-acting; useful for short flares.</li>
<li><strong>Naproxen</strong> — 250–500 mg twice daily. Longer-acting and often preferred for ongoing arthritis pain. Has a lower cardiovascular risk than other oral NSAIDs.</li>
<li><strong>Diclofenac</strong> — effective but carries a higher cardiovascular risk, so usually prescribed as a topical gel rather than tablets.</li>
</ul>
<p>All oral NSAIDs share the same risk profile: stomach ulcers and bleeding, kidney injury, raised blood pressure, fluid retention, and a small increase in heart attack and stroke risk. These risks rise with dose, age, and duration of use.</p>
<p>Anyone taking an oral NSAID for more than a few weeks should be on a <strong>proton-pump inhibitor</strong> (omeprazole, lansoprazole, esomeprazole) to protect the stomach. Anyone over 65, with a history of ulcers, or on blood-thinners should be on one from day one.</p>

<h2 id="paracetamol">Paracetamol: useful but limited</h2>
<p>Paracetamol used to be the standard first-line painkiller for osteoarthritis. NICE downgraded it in 2022 after evidence reviews showed only modest benefit at best. It remains useful for:</p>
<ul>
<li>Short-term, mild pain</li>
<li>Topping up an NSAID at flare-ups</li>
<li>People who can't take NSAIDs (kidney disease, ulcer history, certain heart conditions)</li>
</ul>
<p>The maximum dose for adults is <strong>1 g four times daily (4 g total per 24 hours)</strong>, with at least 4 hours between doses. Lower doses are needed in older adults, lower body weight, and liver disease.</p>

<h2 id="opioids">Codeine, tramadol and stronger opioids</h2>
<p>NICE no longer recommends routine opioid use for osteoarthritis. The benefits are small, and the risks — constipation, drowsiness, falls in older adults, dependence — are significant. Weak opioids (codeine, dihydrocodeine, tramadol) are reserved for short courses when:</p>
<ul>
<li>Other treatments have genuinely been tried and failed</li>
<li>A specific event (e.g. waiting for joint replacement) requires temporary cover</li>
<li>A clear plan to stop within weeks is agreed</li>
</ul>
<p>Strong opioids (morphine, oxycodone, fentanyl patches) have no routine place in arthritis care. If you have been on opioids for joint pain for more than a few months, a structured review with your GP or pain clinic is the right next step.</p>

<h2 id="who-should-not">Who should avoid which painkiller</h2>
<ul>
<li><strong>Kidney disease</strong> — avoid oral NSAIDs; topical NSAIDs and paracetamol are usually safer.</li>
<li><strong>Heart failure or recent heart attack</strong> — avoid oral NSAIDs (especially diclofenac).</li>
<li><strong>Stomach ulcer or bleeding history</strong> — avoid oral NSAIDs unless essential, always with a stomach-protector.</li>
<li><strong>Asthma triggered by aspirin or NSAIDs</strong> — avoid all NSAIDs.</li>
<li><strong>Liver disease</strong> — reduce paracetamol dose to 500 mg–1 g three times daily; check with prescriber.</li>
<li><strong>Pregnancy</strong> — avoid NSAIDs (especially after 20 weeks); paracetamol is usually preferred.</li>
<li><strong>Anticoagulants (warfarin, DOACs)</strong> — combining with NSAIDs significantly raises bleeding risk.</li>
</ul>

<h2 id="combining">Combining painkillers safely</h2>
<p>The safest combinations for arthritis pain are:</p>
<ul>
<li><strong>Topical NSAID + paracetamol</strong> — very low side-effect burden</li>
<li><strong>Oral NSAID + paracetamol</strong> — different mechanisms, both within their maximum doses</li>
<li><strong>Oral NSAID + paracetamol + short-course codeine</strong> — only for flares, with a stop plan</li>
</ul>
<p>Never combine two oral NSAIDs (e.g. ibuprofen and naproxen) — the risks multiply without extra benefit. Check with a pharmacist before adding any over-the-counter painkiller to a prescribed medication.</p>

<h2 id="alternatives">What works alongside painkillers</h2>
<p>Painkillers are most effective when they enable the things that actually change arthritis over the long term:</p>
<ul>
<li><strong>Strengthening and aerobic exercise</strong> — the strongest evidence base for reducing arthritis pain</li>
<li><strong>Weight management</strong> — every 1 kg lost reduces force across the knee by about 4 kg with each step</li>
<li><strong>Heat, cold and pacing</strong> — simple, cheap and effective for daily flares</li>
<li><strong>Steroid injections</strong> — strategic short-term relief that enables rehabilitation (see our <a href="/guides/steroids-for-arthritis">steroids guide</a>)</li>
<li><strong>Disease-modifying drugs</strong> — for inflammatory arthritis, the foundation of long-term control</li>
</ul>

<h2 id="when-to-review">When to ask for a medication review</h2>
<ul>
<li>You've been on a daily NSAID for more than 3 months without a recent kidney and blood-pressure check</li>
<li>You're on an opioid for arthritis pain and haven't had a structured review</li>
<li>Your painkillers aren't working as well as they did</li>
<li>You're getting indigestion, black stools, or unusual bruising</li>
<li>You're stacking over-the-counter painkillers on top of prescribed ones</li>
</ul>

<h2 id="key-takeaways">Key takeaways</h2>
<ul>
<li>Topical NSAID gels are first-line for knee and hand osteoarthritis — most of the benefit, very little of the risk.</li>
<li>Oral NSAIDs work but should be used at the lowest dose for the shortest time, almost always with a stomach-protector.</li>
<li>Paracetamol is helpful as a top-up or for people who can't take NSAIDs; it is no longer first-line.</li>
<li>Opioids have a very limited role in arthritis pain — short courses only, with a stop plan.</li>
<li>The right combination depends on your kidneys, your heart, your stomach and the rest of your medication list.</li>
<li>Painkillers buy time for the treatments that actually change arthritis: movement, strength, weight management and disease-modifying drugs.</li>
</ul>
`;

export default function PainkillersNsaidsGuide() {
  const html = addHeadingIds(CONTENT);
  return (
    <>
      <Helmet>
        <title>Painkillers & NSAIDs for Arthritis – UK Guide to Safer Pain Relief</title>
        <meta name="description" content="Evidence-based UK guide to painkillers and NSAIDs for arthritis: topical gels, ibuprofen, naproxen, paracetamol, codeine — what to use, what to avoid, and when to review." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/painkillers-and-nsaids" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Painkillers & NSAIDs for Arthritis – UK Guide to Safer Pain Relief" />
        <meta property="og:description" content="Topical gels, oral NSAIDs, paracetamol and opioids for arthritis — what works, what to avoid, when to ask for a review." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/painkillers-and-nsaids" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <PageSchema
        url="/guides/painkillers-and-nsaids"
        name="Painkillers & NSAIDs for Arthritis: UK Guide"
        description="Topical gels, oral NSAIDs, paracetamol and opioids for arthritis — what works, what to avoid, when to ask for a review."
        medical={{ condition: "Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Painkillers & NSAIDs" },
        ]}
        faqs={NSAID_FAQS}
        lastReviewed="2026-06-28"
        idPrefix="nsaids-guide"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Painkillers & NSAIDs for Arthritis"
          subtitle="Topical gels, oral NSAIDs, paracetamol and opioids — what works, what to avoid, and how to use them safely."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Painkillers are the most widely used arthritis treatment — and the most often
            misused. NICE now recommends topical NSAID gels as first-line for knee and hand
            osteoarthritis, with oral NSAIDs, paracetamol and short-course opioids reserved
            for specific situations. This guide explains exactly what to use, what to avoid,
            and how to combine them safely.
          </p>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/steroids-for-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Related Guide →</p>
                <p className="font-bold text-foreground">Steroids for Arthritis</p>
              </Link>
              <Link to="/guides/febuxostat-for-gout" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Medication Guide →</p>
                <p className="font-bold text-foreground">Febuxostat for Gout</p>
              </Link>
              <Link to="/guides/azathioprine-for-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Medication Guide →</p>
                <p className="font-bold text-foreground">Azathioprine for Arthritis</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/painkillers-and-nsaids" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
