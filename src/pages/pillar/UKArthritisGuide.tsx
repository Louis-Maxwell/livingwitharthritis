import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";

const Footer = lazy(() => import("@/components/Footer"));

const CONTENT = `
<h2 id="what-is-arthritis">What Is Arthritis?</h2>
<p>Arthritis is not a single disease — it is an umbrella term covering <strong>more than 100 different conditions</strong> that cause pain, swelling, stiffness and reduced movement in and around the joints. In the United Kingdom, approximately <strong>10 million people</strong> live with some form of arthritis, making it one of the most common chronic health conditions in the country (Versus Arthritis, 2024). It affects people of all ages, genders and ethnic backgrounds, though it is significantly more prevalent in those over 45 and in women.</p>
<p>The two most common forms are <strong>osteoarthritis (OA)</strong> and <strong>rheumatoid arthritis (RA)</strong>. OA is a degenerative condition where cartilage — the smooth, protective tissue covering the ends of bones — gradually wears away, leading to bone-on-bone friction. RA is an autoimmune disease where the body's immune system mistakenly attacks the synovial membrane lining the joints, causing chronic inflammation. Other notable types include <strong>psoriatic arthritis</strong>, <strong>gout</strong>, <strong>ankylosing spondylitis</strong>, <strong>juvenile idiopathic arthritis</strong>, and <strong>reactive arthritis</strong>.</p>

<h2 id="how-common-is-arthritis-uk">How Common Is Arthritis in the UK?</h2>
<p>Arthritis affects roughly <strong>1 in 6 adults</strong> in the UK — that is around 10 million people according to Versus Arthritis. It is the leading cause of pain and disability in the country. Every year, over <strong>8.75 million people</strong> seek GP advice for osteoarthritis alone (NICE, 2022). Rheumatoid arthritis affects approximately <strong>400,000 people</strong> in the UK, while psoriatic arthritis affects around <strong>146,000</strong>.</p>
<p>The economic impact is staggering. Arthritis and musculoskeletal conditions account for <strong>30% of all GP consultations</strong> in England and are the single largest cause of work-related disability, costing the UK economy an estimated <strong>£12.6 billion per year</strong> in lost productivity, sick days and healthcare costs (Versus Arthritis, 2024). Despite these figures, arthritis remains chronically underfunded in research compared to cancer and cardiovascular disease.</p>
<p>The prevalence is rising due to an ageing population, increasing obesity rates, and sedentary lifestyles. By 2030, the number of people living with arthritis in the UK is projected to exceed <strong>12 million</strong>.</p>

<h2 id="types-of-arthritis">Types of Arthritis Explained</h2>
<h3 id="osteoarthritis">Osteoarthritis (OA)</h3>
<p>Osteoarthritis is the most common form, affecting over <strong>8.75 million people</strong> in the UK. It is a degenerative "wear and tear" condition where the cartilage cushioning joints gradually breaks down. As cartilage thins, bones begin to rub together, causing pain, swelling, stiffness and reduced range of motion. The joints most commonly affected are the <strong>knees, hips, hands, spine and feet</strong>.</p>
<p>Risk factors include age (most common after 45), female sex, obesity, previous joint injury, repetitive occupational stress, genetics and certain metabolic conditions. Symptoms typically develop slowly: morning stiffness lasting less than 30 minutes, pain that worsens with activity, a grating or crackling sensation (crepitus), swelling around the joint, and gradual loss of flexibility.</p>
<p>There is no cure for OA, but symptoms can be effectively managed through weight loss, regular low-impact exercise, physiotherapy, pain medication and — in severe cases — joint replacement surgery. The NHS provides OA management through GPs, first-contact physiotherapists, and specialist rheumatology clinics.</p>

<h3 id="rheumatoid-arthritis">Rheumatoid Arthritis (RA)</h3>
<p>Rheumatoid arthritis is an autoimmune condition affecting approximately <strong>400,000 people</strong> in the UK. Unlike OA, RA occurs when the immune system mistakenly attacks the synovial membrane lining the joints, causing chronic inflammation that can damage cartilage and bone. RA typically affects joints symmetrically — both wrists, both knees — and can also affect organs including the lungs, heart and eyes.</p>
<p>Symptoms include prolonged morning stiffness (often over 30 minutes), joint pain and swelling (especially in the hands, wrists and feet), fatigue, and general malaise. Early diagnosis is critical: NICE guidelines recommend urgent referral to a rheumatologist within <strong>3 working days</strong> if RA is suspected, as early treatment with disease-modifying anti-rheumatic drugs (DMARDs) like methotrexate can prevent irreversible joint damage.</p>

<h3 id="psoriatic-arthritis">Psoriatic Arthritis (PsA)</h3>
<p>Psoriatic arthritis affects up to <strong>30% of people with psoriasis</strong> and around 146,000 individuals in the UK. It causes joint pain, stiffness and swelling alongside the characteristic skin plaques of psoriasis. PsA can affect any joint but commonly targets the fingers and toes (causing dactylitis or "sausage digits"), the spine and the entheses (where tendons attach to bone).</p>

<h3 id="other-types">Other Types</h3>
<p><strong>Gout</strong> affects around 1.6 million people in the UK and is caused by uric acid crystal deposits in joints, most commonly the big toe. <strong>Ankylosing spondylitis</strong> primarily affects the spine and sacroiliac joints, causing inflammatory back pain and potential spinal fusion. <strong>Juvenile idiopathic arthritis (JIA)</strong> is the most common form in children, affecting approximately 15,000 under-16s in the UK. <strong>Reactive arthritis</strong> develops after infection and <strong>fibromyalgia</strong>, while not technically arthritis, is a related chronic pain condition affecting an estimated 2.9 million UK adults.</p>

<h2 id="symptoms-and-diagnosis">Symptoms and Diagnosis</h2>
<p>Common symptoms across most types of arthritis include:</p>
<ul>
<li><strong>Joint pain</strong> — ranging from dull ache to sharp, debilitating pain</li>
<li><strong>Stiffness</strong> — particularly after rest or in the morning</li>
<li><strong>Swelling</strong> — caused by inflammation or fluid build-up</li>
<li><strong>Redness and warmth</strong> — around affected joints</li>
<li><strong>Reduced range of motion</strong> — difficulty bending, gripping or walking</li>
<li><strong>Fatigue</strong> — especially common in inflammatory types like RA</li>
<li><strong>Crepitus</strong> — grinding, clicking or popping sensations</li>
</ul>
<p>Diagnosis typically involves a GP assessment, blood tests (including CRP, ESR, rheumatoid factor and anti-CCP antibodies for inflammatory arthritis), X-rays and sometimes MRI or ultrasound scans. Your GP may refer you to a <strong>rheumatologist</strong> for specialist diagnosis and management. Under the NHS First Contact Practitioner scheme, you can now see a physiotherapist directly without a GP referral at many practices.</p>

<h2 id="treatment-options">Treatment Options in the UK</h2>
<p>Treatment varies depending on the type and severity of arthritis:</p>
<h3>Conservative Management</h3>
<ul>
<li><strong>Exercise</strong> — the single most effective non-drug treatment. Regular low-impact activity (walking, swimming, cycling) strengthens muscles around joints and reduces pain</li>
<li><strong>Weight management</strong> — losing even 5% of body weight can significantly reduce knee pain in OA</li>
<li><strong>Physiotherapy</strong> — tailored exercise programmes, manual therapy and electrotherapy</li>
<li><strong>Occupational therapy</strong> — joint protection techniques, assistive devices and home adaptations</li>
<li><strong>Diet</strong> — anti-inflammatory Mediterranean-style eating patterns can reduce systemic inflammation</li>
</ul>
<h3>Medications</h3>
<ul>
<li><strong>Paracetamol</strong> — first-line for mild OA pain</li>
<li><strong>NSAIDs</strong> — ibuprofen, naproxen (topical preferred for OA; oral for inflammatory arthritis)</li>
<li><strong>Corticosteroid injections</strong> — short-term relief for acutely inflamed joints</li>
<li><strong>DMARDs</strong> — methotrexate, sulfasalazine, hydroxychloroquine (for RA and PsA)</li>
<li><strong>Biologics</strong> — adalimumab, etanercept, rituximab (for severe inflammatory arthritis)</li>
<li><strong>JAK inhibitors</strong> — tofacitinib, baricitinib (newer targeted therapies for RA)</li>
</ul>
<h3>Surgical Options</h3>
<ul>
<li><strong>Joint replacement</strong> — knee and hip replacements are among the most successful operations performed by the NHS, with over 160,000 procedures annually</li>
<li><strong>Arthroscopy</strong> — keyhole surgery for diagnosis and minor repairs</li>
<li><strong>Joint fusion (arthrodesis)</strong> — for severely damaged smaller joints</li>
</ul>

<h2 id="living-well-with-arthritis">Living Well With Arthritis</h2>
<p>Managing arthritis is about more than medication. A holistic approach that combines physical activity, nutrition, mental health support and community connection delivers the best outcomes. Key strategies include:</p>
<ul>
<li><strong>Stay active</strong> — aim for 150 minutes of moderate activity per week (NHS recommendation)</li>
<li><strong>Eat well</strong> — follow a Mediterranean-style diet rich in omega-3 fatty acids, fruits, vegetables and wholegrains</li>
<li><strong>Manage stress</strong> — mindfulness, meditation and cognitive behavioural therapy (CBT) have all shown benefits</li>
<li><strong>Prioritise sleep</strong> — poor sleep worsens pain perception; aim for 7–9 hours</li>
<li><strong>Pace yourself</strong> — alternate activity with rest to avoid flare-ups</li>
<li><strong>Use assistive devices</strong> — jar openers, long-handled reachers, ergonomic keyboards and walking aids can transform daily life</li>
<li><strong>Connect with others</strong> — peer support groups (online and in person) reduce isolation and improve coping</li>
</ul>

<h2 id="mental-health-and-arthritis">Mental Health and Arthritis</h2>
<p>Living with chronic pain takes a significant toll on mental health. Research shows that people with arthritis are <strong>2–3 times more likely</strong> to experience depression and anxiety compared to the general population (Arthritis Research UK). The relationship is bidirectional: pain worsens mood, and low mood amplifies pain perception.</p>
<p>The NHS provides mental health support through:</p>
<ul>
<li><strong>IAPT (Improving Access to Psychological Therapies)</strong> — free talking therapies including CBT, available via GP referral or self-referral</li>
<li><strong>NHS pain management programmes</strong> — multidisciplinary programmes combining physiotherapy, psychology and occupational therapy</li>
<li><strong>Versus Arthritis helpline</strong> — 0800 5200 520 (free, open weekdays)</li>
<li><strong>Mind</strong> — 0300 123 3393 for general mental health support</li>
</ul>

<h2 id="arthritis-in-younger-people">Arthritis in Younger People</h2>
<p>Arthritis is often perceived as a condition of old age, but this is a harmful myth. Around <strong>15,000 children</strong> in the UK have juvenile idiopathic arthritis, and many adults in their 20s and 30s develop inflammatory conditions like RA, PsA and ankylosing spondylitis. Young people with arthritis face unique challenges including managing education, starting careers, maintaining relationships and family planning while dealing with a chronic condition.</p>
<p>Organisations like <strong>Versus Arthritis</strong> and <strong>NRAS (National Rheumatoid Arthritis Society)</strong> provide dedicated resources for young adults and families of children with arthritis.</p>

<h2 id="research-and-future-treatments">Research and Future Treatments</h2>
<p>Arthritis research in the UK is advancing rapidly. Key areas include:</p>
<ul>
<li><strong>Regenerative medicine</strong> — stem cell therapies and tissue engineering to regrow damaged cartilage</li>
<li><strong>Precision medicine</strong> — using genetic profiling to predict which treatments will work best for individual patients</li>
<li><strong>Digital health</strong> — AI-powered symptom tracking, telemedicine and wearable devices for remote monitoring</li>
<li><strong>New biologics and small molecules</strong> — targeting specific inflammatory pathways with fewer side effects</li>
<li><strong>Microbiome research</strong> — understanding how gut bacteria influence autoimmune arthritis</li>
</ul>
<p>The UK's leading research funders include <strong>Versus Arthritis</strong> (investing over £9 million annually), the <strong>National Institute for Health and Care Research (NIHR)</strong>, and <strong>Medical Research Council (MRC)</strong>. Clinical trials are available through the NHS and the NIHR Clinical Research Network.</p>

<h2 id="key-uk-resources">Key UK Resources</h2>
<ul>
<li><strong>Versus Arthritis</strong> — <a href="https://www.versusarthritis.org" target="_blank" rel="noopener noreferrer">versusarthritis.org</a> — helpline: 0800 5200 520</li>
<li><strong>NRAS</strong> — <a href="https://nras.org.uk" target="_blank" rel="noopener noreferrer">nras.org.uk</a> — helpline: 0800 298 7650</li>
<li><strong>NHS</strong> — <a href="https://www.nhs.uk/conditions/arthritis/" target="_blank" rel="noopener noreferrer">nhs.uk/conditions/arthritis</a></li>
<li><strong>Arthritis Action</strong> — <a href="https://www.arthritisaction.org.uk" target="_blank" rel="noopener noreferrer">arthritisaction.org.uk</a></li>
<li><strong>Citizens Advice</strong> — benefits and PIP support</li>
<li><strong>Living With Arthritis</strong> — free virtual physiotherapy, diet plans and community support</li>
</ul>

<h2 id="sources-disclaimer">Sources &amp; Disclaimer</h2>
<p>This guide draws on publicly available data from the NHS, NICE clinical guidelines (NG100, NG226, CG79), Versus Arthritis, NRAS, and peer-reviewed research published in <em>The Lancet</em>, <em>Annals of the Rheumatic Diseases</em> and <em>BMJ</em>. Statistics cited are the most recent available as of 2024. This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your GP or rheumatologist for personalised guidance.</p>
`;

export default function UKArthritisGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Complete UK Arthritis Guide 2025 – Types, Symptoms, Treatment &amp; Support</title>
        <meta name="description" content="The definitive UK guide to arthritis: types (OA, RA, PsA), symptoms, NHS treatment options, self-management strategies, and support resources. Covers 100+ types affecting 10 million people." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/uk-arthritis" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Complete UK Arthritis Guide 2025",
          "description": "Comprehensive guide to arthritis in the UK covering types, symptoms, NHS treatment and support.",
          "url": "https://livingwitharthritis.org.uk/guides/uk-arthritis",
          "inLanguage": "en-GB",
          "medicalAudience": { "@type": "PatientAudience" },
          "lastReviewed": "2025-01-15"
        })}</script>
      <meta property="og:title" content="Complete UK Arthritis Guide 2025 – Types, Symptoms, Treatment &amp; Support" />
      <meta property="og:description" content="The definitive UK guide to arthritis: types (OA, RA, PsA), symptoms, NHS treatment options, self-management strategies, and support resources. Covers 100+ types affecting 10 million people." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/uk-arthritis" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Complete UK Arthritis Guide 2025 – Types, Symptoms, Treatment &amp; Support" />
      <meta name="twitter:description" content="The definitive UK guide to arthritis: types (OA, RA, PsA), symptoms, NHS treatment options, self-management strategies, and support resources. Covers 100+ types affecting 10 million people." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="The Complete UK Arthritis Guide"
          subtitle="Everything you need to know about arthritis — types, symptoms, treatments and support available across the United Kingdom."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <TableOfContents html={html} />
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/nhs-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Next Guide →</p>
                <p className="font-bold text-foreground">NHS Arthritis Services</p>
              </Link>
              <Link to="/guides/exercise" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Related →</p>
                <p className="font-bold text-foreground">Exercise Guide for Arthritis</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
