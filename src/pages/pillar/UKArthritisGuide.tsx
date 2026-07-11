import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const UK_ARTHRITIS_FAQS = [
  { question: "How many people in the UK have arthritis?", answer: "Around 10 million people in the UK live with arthritis — roughly 1 in 6 adults. Osteoarthritis is by far the most common type, affecting more than 8.75 million people, followed by rheumatoid arthritis (around 400,000) and psoriatic arthritis (around 146,000)." },
  { question: "What is the most common type of arthritis in the UK?", answer: "Osteoarthritis is the most common type, accounting for the large majority of cases. It is sometimes called 'wear and tear' arthritis and most often affects the knees, hips, hands and spine." },
  { question: "Is arthritis a disability in the UK?", answer: "Arthritis is recognised as a disability under the Equality Act 2010 when it has a substantial, long-term effect on day-to-day activities. Many people with arthritis qualify for reasonable workplace adjustments and may be eligible for Personal Independence Payment (PIP)." },
  { question: "Can arthritis be cured?", answer: "There is no cure for most forms of arthritis, but symptoms can be managed effectively with a combination of exercise, weight management, anti-inflammatory diet, physiotherapy and — for inflammatory types — disease-modifying medications that can put the condition into remission." },
  { question: "What is the best treatment for arthritis in the UK?", answer: "NICE guidelines (NG226) recommend a core package of exercise, weight management and patient education first, with medications, physiotherapy and joint replacement surgery added as needed. For inflammatory arthritis, early DMARD treatment from a rheumatology team is critical." },
  { question: "How long do I have to wait to see a rheumatologist on the public health service?", answer: "Waiting times vary widely. The national target is 18 weeks from referral to first appointment, but actual waits range from around 8 weeks in some areas to over 30 weeks in others. Urgent inflammatory arthritis referrals are typically seen within 3 weeks." },
];

const CONTENT = `
<h2 id="what-is-arthritis">What Is Arthritis?</h2>
<p>Arthritis is not one disease. It is an umbrella term for <strong>more than 100 conditions</strong>. They all cause pain, swelling and stiffness in or around the joints.</p>
<p>In the UK, about <strong>10 million people</strong> live with arthritis (Versus Arthritis, 2024). It is one of the most common long-term health conditions in the country. It affects people of all ages and backgrounds. It is more common in women and in people over 45.</p>

<h3 id="main-types-quick">The Main Types at a Glance</h3>
<ul>
<li><strong>Osteoarthritis (OA)</strong> — the "wear and tear" type. Cartilage in the joints thins over time.</li>
<li><strong>Rheumatoid arthritis (RA)</strong> — an autoimmune type. The immune system attacks the joint lining.</li>
<li><strong>Psoriatic arthritis (PsA)</strong> — linked to the skin condition psoriasis.</li>
<li><strong>Gout</strong> — caused by uric acid crystals in the joints.</li>
<li><strong>Ankylosing spondylitis</strong> — mainly affects the spine.</li>
<li><strong>Juvenile idiopathic arthritis</strong> — the main type in children.</li>
</ul>

<h2 id="how-common-is-arthritis-uk">How Common Is Arthritis in the UK?</h2>
<p>Arthritis affects about <strong>1 in 6 adults</strong> in the UK. That is roughly 10 million people. It is the top cause of pain and disability in the country.</p>
<p>Each year, more than <strong>8.75 million people</strong> see a GP about osteoarthritis (NICE, 2022). Rheumatoid arthritis affects around <strong>400,000 people</strong>. Psoriatic arthritis affects around <strong>146,000</strong>.</p>

<h3 id="economic-impact">The Cost to the UK</h3>
<p>The numbers are huge. Arthritis and bone or joint problems make up <strong>30% of all GP visits</strong> in England. They are the biggest cause of time off work.</p>
<p>The total cost to the UK is about <strong>£12.6 billion a year</strong> in lost work, sick days and care (Versus Arthritis, 2024). Even so, arthritis gets far less research funding than cancer or heart disease.</p>
<p>Cases are rising. The UK is ageing. More people are living with obesity and sitting more. By 2030, over <strong>12 million</strong> people in the UK are expected to have arthritis.</p>

<h2 id="types-of-arthritis">Types of Arthritis Explained</h2>
<h3 id="osteoarthritis">Osteoarthritis (OA)</h3>
<p>Osteoarthritis is the most common type. It affects over <strong>8.75 million people</strong> in the UK. It is often called the "wear and tear" type. The cartilage cushioning the joints breaks down over time.</p>
<p>As cartilage thins, bones start to rub. This causes pain, swelling and stiffness. The joints hit hardest are the <strong>knees, hips, hands, spine and feet</strong>.</p>

<h4 id="oa-risk-factors">Who is at risk</h4>
<ul>
<li>Being over 45</li>
<li>Being female</li>
<li>Carrying extra weight</li>
<li>Past joint injury</li>
<li>Repeat strain at work</li>
<li>Family history</li>
</ul>

<h4 id="oa-symptoms">Common symptoms</h4>
<ul>
<li>Morning stiffness that eases within 30 minutes</li>
<li>Pain that gets worse with activity</li>
<li>A grating or crackling feeling (crepitus)</li>
<li>Swelling around the joint</li>
<li>Slow loss of flexibility</li>
</ul>
<p>There is no cure for OA. But symptoms can be managed well. Useful steps include weight loss, gentle exercise, physiotherapy and pain relief. In severe cases, joint replacement surgery can help.</p>

<h3 id="rheumatoid-arthritis">Rheumatoid Arthritis (RA)</h3>
<p>RA is an autoimmune disease. It affects about <strong>400,000 people</strong> in the UK. The immune system attacks the joint lining. This causes long-term inflammation that can damage cartilage and bone.</p>
<p>RA often affects joints on both sides of the body. For example, both wrists or both knees. It can also affect the lungs, heart and eyes.</p>

<h4 id="ra-symptoms">Symptoms to watch for</h4>
<ul>
<li>Morning stiffness lasting more than 30 minutes</li>
<li>Pain and swelling in the hands, wrists or feet</li>
<li>Tiredness and feeling unwell</li>
</ul>
<p>Early diagnosis matters a lot. NICE guidelines say a GP should refer you to a rheumatologist within <strong>3 working days</strong> if RA is suspected. Early treatment with drugs like methotrexate can stop lasting joint damage.</p>

<h3 id="psoriatic-arthritis">Psoriatic Arthritis (PsA)</h3>
<p>PsA affects up to <strong>30% of people with psoriasis</strong>. That is about 146,000 people in the UK. It causes joint pain, stiffness and swelling alongside skin patches.</p>
<p>PsA often hits the fingers and toes. This can cause swollen "sausage digits". It can also affect the spine and the spots where tendons join bone.</p>

<h3 id="other-types">Other Types</h3>
<ul>
<li><strong>Gout</strong> — affects about 1.6 million people. Caused by uric acid crystals, often in the big toe.</li>
<li><strong>Ankylosing spondylitis</strong> — mainly the spine. Can cause inflammatory back pain and stiffening over time.</li>
<li><strong>Juvenile idiopathic arthritis (JIA)</strong> — the main type in children. Around 15,000 under-16s in the UK.</li>
<li><strong>Reactive arthritis</strong> — starts after an infection.</li>
<li><strong>Fibromyalgia</strong> — not arthritis, but a related chronic pain condition. Affects an estimated 2.9 million UK adults.</li>
</ul>

<h2 id="symptoms-and-diagnosis">Symptoms and Diagnosis</h2>
<p>Most types of arthritis share a core set of symptoms:</p>
<ul>
<li><strong>Joint pain</strong> — from a dull ache to sharp pain</li>
<li><strong>Stiffness</strong> — often after rest or in the morning</li>
<li><strong>Swelling</strong> — from inflammation or fluid</li>
<li><strong>Redness and warmth</strong> — around the joint</li>
<li><strong>Less movement</strong> — harder to bend, grip or walk</li>
<li><strong>Fatigue</strong> — common in RA and other inflammatory types</li>
<li><strong>Crepitus</strong> — grinding, clicking or popping</li>
</ul>

<h3 id="how-diagnosis-works">How diagnosis works</h3>
<p>Most people start with a GP visit. The GP may ask for blood tests. These can include CRP, ESR, rheumatoid factor and anti-CCP antibodies. X-rays are common too. MRI or ultrasound may be used in some cases.</p>
<p>Your GP can refer you to a <strong>rheumatologist</strong>. Many practices also let you see a physiotherapist first, without a GP referral, under the First Contact Practitioner scheme.</p>

<h2 id="treatment-options">Treatment Options in the UK</h2>
<p>Treatment depends on the type and how severe the arthritis is. Most plans mix three things: self-care, medication and (sometimes) surgery.</p>

<h3>Conservative Management</h3>
<ul>
<li><strong>Exercise</strong> — the most effective non-drug treatment. Try walking, swimming or cycling.</li>
<li><strong>Weight management</strong> — losing just 5% of body weight can cut knee pain in OA.</li>
<li><strong>Physiotherapy</strong> — guided exercises, hands-on therapy and electrotherapy.</li>
<li><strong>Occupational therapy</strong> — joint protection, aids and home changes.</li>
<li><strong>Diet</strong> — a Mediterranean-style diet can lower inflammation.</li>
</ul>

<h3>Medications</h3>
<ul>
<li><strong>Paracetamol</strong> — first choice for mild OA pain</li>
<li><strong>NSAIDs</strong> — such as ibuprofen or naproxen</li>
<li><strong>Steroid injections</strong> — short-term relief for badly inflamed joints</li>
<li><strong>DMARDs</strong> — such as methotrexate for RA and PsA</li>
<li><strong>Biologics</strong> — such as adalimumab or etanercept for severe cases</li>
<li><strong>JAK inhibitors</strong> — newer targeted drugs for RA</li>
</ul>

<h3>Surgical Options</h3>
<ul>
<li><strong>Joint replacement</strong> — knee and hip replacements are very successful. Over 160,000 are done each year in the UK.</li>
<li><strong>Arthroscopy</strong> — keyhole surgery for diagnosis or minor repairs.</li>
<li><strong>Joint fusion</strong> — used for badly damaged small joints.</li>
</ul>

<h2 id="living-well-with-arthritis">Living Well With Arthritis</h2>
<p>Managing arthritis is about more than medicine. The best results come from a whole-person plan. This means activity, food, mental health support and community.</p>

<h3 id="seven-habits">Seven habits that help</h3>
<ul>
<li><strong>Stay active</strong> — aim for 150 minutes of moderate activity a week.</li>
<li><strong>Eat well</strong> — a Mediterranean-style diet rich in oily fish, fruit, veg and whole grains.</li>
<li><strong>Manage stress</strong> — try mindfulness, meditation or CBT.</li>
<li><strong>Sleep well</strong> — aim for 7–9 hours. Poor sleep makes pain feel worse.</li>
<li><strong>Pace yourself</strong> — mix activity with rest to avoid flare-ups.</li>
<li><strong>Use aids</strong> — jar openers, long-handled reachers and walking aids can help a lot.</li>
<li><strong>Connect with others</strong> — peer groups reduce isolation and improve coping.</li>
</ul>

<h2 id="mental-health-and-arthritis">Mental Health and Arthritis</h2>
<p>Chronic pain wears people down. People with arthritis are <strong>2–3 times more likely</strong> to have depression or anxiety (Arthritis Research UK). The link works both ways. Pain lowers mood, and low mood makes pain feel worse.</p>

<h3 id="mh-support">Where to get help</h3>
<ul>
<li><strong>NHS Talking Therapies (IAPT)</strong> — free talking therapy and CBT. Self-referral is available.</li>
<li><strong>Pain management programmes</strong> — group programmes mixing physio, psychology and OT.</li>
<li><strong>Versus Arthritis helpline</strong> — 0800 5200 520 (free, weekdays).</li>
<li><strong>Mind</strong> — 0300 123 3393 for general mental health support.</li>
</ul>

<h2 id="arthritis-in-younger-people">Arthritis in Younger People</h2>
<p>Many people think arthritis only affects older adults. That is a myth.</p>
<p>About <strong>15,000 children</strong> in the UK have juvenile idiopathic arthritis. Many adults in their 20s and 30s also develop types like RA, PsA or ankylosing spondylitis.</p>
<p>Young people with arthritis face extra challenges. These can include study, work, relationships and family planning. Charities like <strong>Versus Arthritis</strong> and <strong>NRAS</strong> offer tailored support.</p>

<h2 id="research-and-future-treatments">Research and Future Treatments</h2>
<p>UK arthritis research is moving fast. Key areas include:</p>
<ul>
<li><strong>Regenerative medicine</strong> — stem cell therapy to regrow cartilage</li>
<li><strong>Precision medicine</strong> — using DNA to pick the best drug for each person</li>
<li><strong>Digital health</strong> — apps, wearables and remote monitoring</li>
<li><strong>New biologics</strong> — drugs that target inflammation more precisely</li>
<li><strong>The gut microbiome</strong> — how gut bacteria affect autoimmune arthritis</li>
</ul>
<p>Main UK funders include <strong>Versus Arthritis</strong> (over £9 million a year), the <strong>NIHR</strong> and the <strong>Medical Research Council</strong>. Clinical trials are open via the NIHR Clinical Research Network.</p>

<h2 id="key-uk-resources">Key UK Resources</h2>
<ul>
<li><strong>Versus Arthritis</strong> — <a href="https://www.versusarthritis.org" target="_blank" rel="noopener noreferrer">versusarthritis.org</a> — helpline: 0800 5200 520</li>
<li><strong>NRAS</strong> — <a href="https://nras.org.uk" target="_blank" rel="noopener noreferrer">nras.org.uk</a> — helpline: 0800 298 7650</li>
<li><strong>Health and social care (UK Government)</strong> — <a href="https://www.gov.uk/browse/health-and-social-care" target="_blank" rel="noopener noreferrer">gov.uk/browse/health-and-social-care</a></li>
<li><strong>Arthritis Action</strong> — <a href="https://www.arthritisaction.org.uk" target="_blank" rel="noopener noreferrer">arthritisaction.org.uk</a></li>
<li><strong>Citizens Advice</strong> — help with benefits and PIP</li>
<li><strong>Living With Arthritis</strong> — free virtual physio, diet plans and community support</li>
</ul>

<h2 id="sources-disclaimer">Sources &amp; Disclaimer</h2>
<p>This guide draws on public data from the UK health service, NICE guidelines (NG100, NG226, CG79), Versus Arthritis and NRAS. It also uses peer-reviewed research from <em>The Lancet</em>, <em>Annals of the Rheumatic Diseases</em> and the <em>BMJ</em>. Figures are the most recent available as of 2024.</p>
<p>This page is for information only. It is not medical advice. Always speak to your GP or rheumatologist about your own care.</p>
`;

export default function UKArthritisGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Complete UK Arthritis Guide 2025 | Living With Arthritis</title>
        <meta name="description" content="Definitive UK arthritis guide: types (OA, RA, PsA), symptoms, treatments, self-management and support for the 10 million affected." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Complete UK Arthritis Guide 2025",
          "description": "Comprehensive guide to arthritis in the UK covering types, symptoms, standard treatment and support.",
          "url": "https://livingwitharthritis.org.uk/guides/uk-arthritis",
          "inLanguage": "en-GB",
          "medicalAudience": { "@type": "PatientAudience" },
          "lastReviewed": "2025-01-15"
        })}</script>
      <meta property="og:title" content="Complete UK Arthritis Guide 2025 – Types, Symptoms, Treatment &amp; Support" />
      <meta property="og:description" content="The definitive UK guide to arthritis: types (OA, RA, PsA), symptoms, standard treatment options, self-management strategies, and support resources. Covers 100+ types affecting 10 million people." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/uk-arthritis" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Complete UK Arthritis Guide 2025 – Types, Symptoms, Treatment &amp; Support" />
      <meta name="twitter:description" content="The definitive UK guide to arthritis: types (OA, RA, PsA), symptoms, standard treatment options, self-management strategies, and support resources. Covers 100+ types affecting 10 million people." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
      <PageSchema
        url="/guides/uk-arthritis"
        name="The Complete UK Arthritis Guide"
        description="Everything you need to know about arthritis in the UK — types, symptoms, treatments, services and support."
        medical={{ condition: "Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "UK Arthritis Guide" },
        ]}
        faqs={UK_ARTHRITIS_FAQS}
        idPrefix="uk-arthritis-guide"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="The Complete UK Arthritis Guide"
          subtitle="Everything you need to know about arthritis — types, symptoms, treatments and support available across the United Kingdom."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Arthritis is an umbrella term for more than 100 conditions that cause joint pain,
            swelling and stiffness. In the UK, around 10 million people live with arthritis —
            roughly 1 in 6 adults. The most common type is osteoarthritis, followed by
            rheumatoid arthritis and gout. This guide covers the main types, how they are
            diagnosed and treated, and the UK services and benefits available to you.
          </p>
          <TableOfContents html={html} />
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Next Guide →</p>
                <p className="font-bold text-foreground">Arthritis Services</p>
              </Link>
              <Link to="/guides/exercise" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Related →</p>
                <p className="font-bold text-foreground">Exercise Guide for Arthritis</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/uk-arthritis" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
