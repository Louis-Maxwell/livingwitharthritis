import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";

const Footer = lazy(() => import("@/components/Footer"));

const STEROID_FAQS = [
  { question: "What is a steroid injection for arthritis?", answer: "A steroid (corticosteroid) injection delivers a small dose of synthetic cortisone directly into an inflamed joint or the soft tissue around it. The medication dampens the inflammation that causes pain, swelling and stiffness — typically giving relief that lasts a few weeks to several months. Common drugs used include methylprednisolone, triamcinolone and hydrocortisone." },
  { question: "How long does a steroid injection last for joint pain?", answer: "Most people feel improvement within 24–72 hours. Pain relief typically lasts 6 weeks to 6 months, depending on the joint, the severity of inflammation and the type of arthritis. Knees and shoulders often respond well; smaller joints in the hands may give shorter relief." },
  { question: "What are the side effects of steroids for arthritis?", answer: "Short-term: a temporary flare of pain in the first 24–48 hours, facial flushing, raised blood sugar (especially in people with diabetes), mild mood changes and skin thinning or pigment change at the injection site. Long-term or repeated use can weaken cartilage, increase infection risk, cause weight gain, osteoporosis and high blood pressure. This is why injections are usually limited to 3–4 per joint per year." },
  { question: "Are steroid tablets used for arthritis?", answer: "Yes. Oral steroids such as prednisolone are commonly used as a short-term 'bridge' in inflammatory arthritis (rheumatoid arthritis, polymyalgia rheumatica, lupus) while slower-acting disease-modifying drugs take effect. They are not routinely used for osteoarthritis because the risks of long-term oral steroids outweigh the benefits." },
  { question: "Can I get a steroid injection on the public health service?", answer: "Yes. Steroid injections are available free through GPs trained in joint injections, First Contact Physiotherapists, rheumatology clinics and orthopaedic services. Waiting times vary from same-week (GP) to several months (hospital outpatient)." },
  { question: "How often can I have steroid injections?", answer: "Most clinicians limit injections to a maximum of 3–4 per joint per year, with at least 3 months between injections in the same joint. Repeated frequent injections can accelerate cartilage damage in osteoarthritis." },
  { question: "Do steroid injections work for osteoarthritis of the knee?", answer: "Evidence shows steroid injections give short-term pain relief (typically 4–8 weeks) for knee osteoarthritis, particularly during flare-ups. NICE guidance (NG226) supports their use as an option when conservative treatment hasn't controlled symptoms, but they should not be the first or only treatment." },
];

const CONTENT = `
<h2 id="overview">Steroids for arthritis: an overview</h2>
<p>Corticosteroids — often shortened to "steroids" — are one of the most widely used treatments for inflammatory joint pain. They are synthetic versions of <strong>cortisol</strong>, a hormone the body produces naturally, and they work by switching off the chemical signals that cause inflammation, swelling and pain.</p>
<p>In arthritis care, steroids are used in three main ways: as <strong>injections into a joint</strong> (intra-articular), as <strong>short courses of tablets</strong> (oral), and occasionally as an <strong>intramuscular injection</strong> for a body-wide effect. Each route has a different role, and choosing the right one depends on the type of arthritis, which joints are affected, and how long-lasting the relief needs to be.</p>
<p>Steroids do not slow the underlying disease in osteoarthritis, and they are not a long-term solution. What they offer is a window of relief — often enough to get someone moving, sleeping, exercising or completing physiotherapy that would otherwise be impossible because of pain.</p>

<h2 id="how-they-work">How steroids work in an inflamed joint</h2>
<p>In a healthy joint, the synovial lining produces a small amount of lubricating fluid. In inflammatory arthritis (rheumatoid arthritis, psoriatic arthritis, gout) and during osteoarthritis flares, this lining becomes thickened and produces excess fluid loaded with inflammatory chemicals — prostaglandins, cytokines and white blood cells.</p>
<p>A steroid injection delivers a concentrated dose directly into this inflamed tissue. Within hours it begins to:</p>
<ul>
<li>Block the production of inflammatory prostaglandins</li>
<li>Reduce the number of immune cells in the joint</li>
<li>Shrink the swollen synovial lining</li>
<li>Lower the volume of excess joint fluid</li>
</ul>
<p>The result is less pressure inside the joint capsule, less mechanical pain, and often a noticeable improvement in range of movement.</p>

<h2 id="injection-types">Types of steroid injection</h2>
<p>The three corticosteroids most commonly used in UK arthritis clinics are:</p>
<ul>
<li><strong>Methylprednisolone (Depo-Medrone)</strong> — medium-acting, widely used for knees, shoulders and hips</li>
<li><strong>Triamcinolone (Kenalog)</strong> — longer-acting, often used for larger joints and tendon sheaths</li>
<li><strong>Hydrocortisone</strong> — shorter-acting, sometimes used in smaller joints like fingers</li>
</ul>
<p>The injection is usually mixed with a small dose of local anaesthetic (lidocaine), which gives almost immediate but brief pain relief while the steroid begins to work over the following 24–72 hours.</p>

<h2 id="what-to-expect">What to expect during a joint injection</h2>
<p>A joint injection takes about 10–15 minutes from start to finish. You can drive yourself home afterwards. Here is what typically happens:</p>
<ul>
<li>The clinician examines the joint and marks the injection site</li>
<li>The skin is cleaned with antiseptic</li>
<li>A fine needle is inserted into the joint space (sometimes guided by ultrasound)</li>
<li>If excess fluid is present, it may be drawn off first (aspiration)</li>
<li>The steroid and local anaesthetic mixture is injected</li>
<li>A small plaster is applied; you rest the joint for 24–48 hours</li>
</ul>
<p>It is common to feel a brief sharp pressure as the needle enters the joint. Most people describe it as uncomfortable rather than painful.</p>

<h2 id="side-effects">Side effects and risks</h2>
<p>Steroid injections are generally safe when given correctly and not used too often. The most common side effects are mild and short-lived:</p>
<ul>
<li><strong>Post-injection flare</strong> — a temporary increase in pain for 24–48 hours, experienced by 1 in 20 people</li>
<li><strong>Facial flushing</strong> — warmth and redness lasting a day or two</li>
<li><strong>Raised blood sugar</strong> — important if you have diabetes; monitor closely for 3–5 days</li>
<li><strong>Skin changes</strong> — thinning or loss of pigment at the injection site (more visible in darker skin)</li>
<li><strong>Mood or sleep disturbance</strong> — brief and self-limiting</li>
</ul>
<p>Rare but more serious risks include joint infection (less than 1 in 10,000), tendon weakening if injected too close to a tendon, and accelerated cartilage loss with repeated injections. This is why most clinicians limit injections to a maximum of <strong>3–4 per joint per year</strong>.</p>

<h2 id="oral-steroids">Oral steroids and inflammatory arthritis</h2>
<p>For people with <strong>rheumatoid arthritis</strong>, <strong>polymyalgia rheumatica</strong>, <strong>lupus</strong> or <strong>vasculitis</strong>, short courses of oral steroids — usually prednisolone — are a standard part of treatment. They are used as a "bridge" to control inflammation rapidly while slower disease-modifying drugs (methotrexate, sulfasalazine, biologics) take effect over 6–12 weeks.</p>
<p>Typical regimens range from a short tapering course over a few weeks to longer maintenance doses in conditions like polymyalgia rheumatica, which may need treatment for 1–2 years.</p>
<p>Long-term oral steroids carry meaningful risks — weight gain, raised blood pressure, osteoporosis, increased infection risk and changes to blood sugar control. Anyone taking prednisolone for more than 3 months should be assessed for <strong>bone protection</strong> (calcium, vitamin D and often a bisphosphonate) under NICE guidance.</p>

<h2 id="osteoarthritis">Steroids for osteoarthritis: what the evidence says</h2>
<p>NICE guidance (NG226, 2022) lists intra-articular steroid injections as an option for osteoarthritis when other measures have not controlled symptoms. Cochrane reviews show short-term pain relief of <strong>4–8 weeks</strong> for knee osteoarthritis, with less convincing evidence for hip and hand osteoarthritis.</p>
<p>Steroids do not slow cartilage loss in osteoarthritis, and there is some evidence that frequent repeat injections (more than 4 per year in the same joint) may accelerate it. For this reason they are best used <strong>strategically</strong> — to break a flare-up cycle, to enable physiotherapy, or to bridge the wait for joint replacement surgery — rather than as a routine treatment.</p>

<h2 id="alternatives">Alternatives to steroid injections</h2>
<p>Steroids are one option among several. Depending on your joint, your diagnosis and your goals, your clinician may discuss:</p>
<ul>
<li><strong>Hyaluronic acid injections</strong> — sometimes offered for knee osteoarthritis, though NICE no longer routinely recommends them on the public health service</li>
<li><strong>Platelet-rich plasma (PRP)</strong> — privately available; evidence is mixed and improving</li>
<li><strong>Topical NSAIDs</strong> — diclofenac or ibuprofen gels are first-line for hand and knee osteoarthritis</li>
<li><strong>Oral pain relief</strong> — paracetamol, short courses of oral NSAIDs with stomach protection</li>
<li><strong>Strengthening exercise and weight management</strong> — the strongest evidence base for long-term improvement in osteoarthritis</li>
<li><strong>Disease-modifying drugs (DMARDs)</strong> — for inflammatory arthritis, the foundation of long-term control</li>
</ul>

<h2 id="how-to-access">How to access steroid treatment in the UK</h2>
<p>Steroid injections and short courses of oral steroids are available free through the public health service. The most common routes are:</p>
<ul>
<li><strong>Your GP</strong> — many GPs are trained to inject knees, shoulders and the base of the thumb</li>
<li><strong>First Contact Physiotherapists</strong> — increasingly trained as independent prescribers and joint injectors; bookable without a GP referral</li>
<li><strong>Rheumatology clinics</strong> — for inflammatory arthritis and complex small-joint injections</li>
<li><strong>Orthopaedic outpatients</strong> — when injections are part of a surgical pathway</li>
<li><strong>Musculoskeletal interface services</strong> — local triage clinics that can inject larger joints quickly</li>
</ul>
<p>Private steroid injections typically cost £150–£300 per joint and are available through physiotherapy clinics, MSK specialists and private rheumatologists if you need faster access.</p>

<h2 id="questions-to-ask">Questions to ask your clinician</h2>
<ul>
<li>How long is this injection likely to last for me?</li>
<li>What is the realistic chance it will help?</li>
<li>How many injections have I had in this joint, and is another safe?</li>
<li>What should I do — and avoid — in the 48 hours after the injection?</li>
<li>How will this affect my diabetes / blood pressure / other medication?</li>
<li>Are there alternatives I should consider first?</li>
<li>What is the plan if this injection doesn't work?</li>
</ul>

<h2 id="key-takeaways">Key takeaways</h2>
<ul>
<li>Steroids reduce inflammation; they don't cure arthritis or repair cartilage.</li>
<li>Injections work best when used <strong>strategically</strong> — to break a flare or enable rehabilitation — not as a long-term routine.</li>
<li>Limit injections to <strong>3–4 per joint per year</strong> to protect cartilage.</li>
<li>Oral steroids are essential in inflammatory arthritis but need bone-protection planning if used long-term.</li>
<li>Available free through GPs, First Contact Physios and rheumatology on the public health service.</li>
<li>Always pair steroid treatment with exercise, weight management and disease-modifying therapy where appropriate.</li>
</ul>
`;

export default function SteroidsGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Steroids for Arthritis – Injections, Tablets, Side Effects &amp; UK Access Guide</title>
        <meta name="description" content="Plain-English guide to steroid injections and tablets for arthritis: how they work, what to expect, side effects, how often you can have them and how to access them on the public health service." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/steroids-for-arthritis" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Steroids for Arthritis – Injections, Tablets, Side Effects &amp; UK Access Guide" />
        <meta property="og:description" content="Plain-English guide to steroid injections and tablets for arthritis: how they work, what to expect, side effects, how often you can have them and how to access them on the public health service." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/steroids-for-arthritis" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Steroids for Arthritis – Injections, Tablets, Side Effects &amp; UK Access Guide" />
        <meta name="twitter:description" content="Plain-English guide to steroid injections and tablets for arthritis: how they work, what to expect, side effects, how often you can have them and how to access them on the public health service." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>
      <PageSchema
        url="/guides/steroids-for-arthritis"
        name="Steroids for Arthritis: UK Guide to Injections & Tablets"
        description="How steroid injections and tablets work for arthritis, side effects, how often you can have them, and how to access them on the public health service."
        medical={{ condition: "Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Steroids for Arthritis" },
        ]}
        faqs={STEROID_FAQS}
        lastReviewed="2026-06-01"
        idPrefix="steroids-guide"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Steroids for Arthritis"
          subtitle="A plain-English guide to corticosteroid injections and tablets — how they work, what to expect, side effects and how to access them in the UK."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Steroid injections and short courses of oral steroids are among the most widely used
            treatments for arthritis pain in the UK. They don't cure arthritis, but used
            strategically they can break a flare-up, reduce inflammation quickly and create a
            window for exercise and rehabilitation to work. This guide explains exactly what
            they do, what to expect, and how to access them on the public health service.
          </p>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">← Related Guide</p>
                <p className="font-bold text-foreground">Arthritis Services Guide</p>
              </Link>
              <Link to="/guides/azathioprine-for-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Medication Guide →</p>
                <p className="font-bold text-foreground">Azathioprine for Arthritis</p>
              </Link>
              <Link to="/guides/knee-replacement-surgery" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Next Guide →</p>
                <p className="font-bold text-foreground">Knee Replacement Surgery</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
