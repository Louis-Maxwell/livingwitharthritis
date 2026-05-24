import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";

const Footer = lazy(() => import("@/components/Footer"));

const CONTENT = `
<h2 id="overview">Overview of Arthritis Services</h2>
<p>The National Health Service provides a comprehensive framework of arthritis care across England, Scotland, Wales and Northern Ireland. From initial GP consultations through to specialist rheumatology clinics, joint replacement surgery and community rehabilitation, the health service offers a multi-layered system of support. Understanding how to navigate this system effectively can dramatically improve your experience and outcomes.</p>
<p>In England alone, musculoskeletal (MSK) conditions account for approximately <strong>30% of all GP consultations</strong> (the health service Digital, 2023). The health service spends an estimated <strong>£10.2 billion annually</strong> on musculoskeletal care, making it one of the largest areas of healthcare expenditure. Despite this, waiting times for rheumatology appointments have increased significantly since 2020, with some areas reporting waits of <strong>6–12 months</strong> for a first specialist appointment.</p>

<h2 id="gp-and-first-contact">Your GP and First Contact Physiotherapists</h2>
<p>Your journey through the arthritis care pathway typically begins with your <strong>General Practitioner (GP)</strong>. GPs are trained to assess joint pain, order initial blood tests and imaging, prescribe first-line medications, and refer to specialists when necessary.</p>
<p>However, one of the most significant recent developments in the health service musculoskeletal care is the introduction of <strong>First Contact Practitioners (FCPs)</strong>. These are specialist physiotherapists embedded within GP practices who can assess, diagnose and manage musculoskeletal conditions — including arthritis — <strong>without requiring a GP referral</strong>. Since 2019, the health service has trained and deployed over <strong>4,000 FCPs</strong> across England as part of the Additional Roles Reimbursement Scheme (ARRS).</p>
<p>FCPs can:</p>
<ul>
<li>Assess your joint symptoms on the same day or within days</li>
<li>Order X-rays and blood tests</li>
<li>Provide exercise programmes and self-management advice</li>
<li>Refer directly to rheumatology, orthopaedics or other specialists</li>
<li>Prescribe certain medications (if qualified as an independent prescriber)</li>
</ul>
<p>To access an FCP, simply contact your GP practice and ask to book an appointment with the musculoskeletal physiotherapist or first contact practitioner. Not all practices have one, but the number is growing rapidly.</p>

<h2 id="rheumatology-referral">Getting a Rheumatology Referral</h2>
<p>If your GP or FCP suspects an inflammatory type of arthritis (such as RA, PsA or ankylosing spondylitis), they should refer you to a <strong>rheumatologist</strong> — a hospital-based consultant who specialises in inflammatory joint diseases. NICE guidelines (NG100) state that suspected RA should be referred <strong>urgently</strong>, ideally within <strong>3 working days</strong>, because early treatment with DMARDs within the first 12 weeks of symptom onset significantly improves long-term outcomes.</p>
<p>What to expect at your first rheumatology appointment:</p>
<ul>
<li>A thorough clinical examination of your joints</li>
<li>Review of blood tests (CRP, ESR, RF, anti-CCP antibodies)</li>
<li>Possible ultrasound scan of affected joints (increasingly done in clinic)</li>
<li>Discussion of treatment options, typically starting with methotrexate for RA</li>
<li>Goal-setting using a treat-to-target approach (aiming for low disease activity or remission)</li>
</ul>
<p>The <strong>the health service standard for rheumatology</strong> is an 18-week referral-to-treatment (RTT) target. However, actual waiting times vary considerably by region. As of 2024, the average wait for a rheumatology first appointment in England is approximately <strong>14 weeks</strong>, but some Integrated Care Boards (ICBs) report waits exceeding 26 weeks.</p>
<p><strong>Tips for faster access:</strong></p>
<ul>
<li>Ask your GP to mark the referral as <strong>urgent</strong> if inflammatory arthritis is suspected</li>
<li>Request a <strong>choose and book</strong> appointment — you may find shorter waits at a hospital further away</li>
<li>Some the health service trusts offer <strong>triage services</strong> where a rheumatology nurse reviews referrals and fast-tracks urgent cases</li>
<li>Check if your area has an <strong>Early Inflammatory Arthritis (EIA) clinic</strong> — these are dedicated rapid-access services</li>
</ul>

<h2 id="physiotherapy">the health service Physiotherapy for Arthritis</h2>
<p>Physiotherapy is a cornerstone of arthritis management and is available free through the public health service. NICE guidelines recommend exercise therapy as a <strong>first-line treatment</strong> for osteoarthritis, ahead of medication. the health service physiotherapy services include:</p>
<ul>
<li><strong>Individual assessment</strong> — a physiotherapist evaluates your mobility, strength, pain and function</li>
<li><strong>Tailored exercise programmes</strong> — specific to your joints and condition</li>
<li><strong>Group exercise classes</strong> — many the health service trusts run arthritis-specific group sessions</li>
<li><strong>Hydrotherapy</strong> — warm-water exercise sessions available at some hospitals</li>
<li><strong>Manual therapy</strong> — hands-on treatment for joint mobilisation</li>
<li><strong>Education and self-management</strong> — teaching you to manage symptoms independently</li>
</ul>
<p>Access is via GP or FCP referral, or in some areas through <strong>self-referral</strong>. The health service website (<a href="https://www.gov.uk/browse/health-and-social-care" target="_blank" rel="noopener noreferrer">gov.uk/health</a>) lists self-referral physiotherapy services near you. Waiting times for the health service physiotherapy typically range from <strong>4–12 weeks</strong>.</p>

<h2 id="pain-management">the health service Pain Management Programmes</h2>
<p>For people with chronic arthritis pain that hasn't responded adequately to standard treatments, the health service offers multidisciplinary <strong>pain management programmes (PMPs)</strong>. These are typically run by a team including a pain consultant, psychologist, physiotherapist and occupational therapist.</p>
<p>PMPs focus on:</p>
<ul>
<li><strong>Understanding pain</strong> — pain neuroscience education</li>
<li><strong>Pacing and activity management</strong> — avoiding boom-bust cycles</li>
<li><strong>Cognitive behavioural therapy (CBT)</strong> — changing unhelpful pain-related thoughts and behaviours</li>
<li><strong>Acceptance and Commitment Therapy (ACT)</strong> — psychological flexibility</li>
<li><strong>Graded exercise</strong> — building activity levels safely</li>
<li><strong>Medication review</strong> — optimising or reducing pain medication</li>
</ul>
<p>Referral is typically through your GP or rheumatologist. PMPs are available in most the health service regions, though waiting times can be <strong>6–18 months</strong>.</p>

<h2 id="joint-replacement">Joint Replacement Surgery through the public health service</h2>
<p>When conservative treatments fail to adequately manage pain and function, <strong>joint replacement surgery</strong> may be recommended. The health service performs over <strong>160,000 hip and knee replacements</strong> annually, making them among the most common and successful operations in the health service (NJR, 2024).</p>
<p>Key facts about the health service joint replacement:</p>
<ul>
<li><strong>Success rates</strong> — over 95% of patients report significant pain reduction; 90% of knee replacements last 15+ years</li>
<li><strong>Eligibility</strong> — based on clinical need, not age; assessed by orthopaedic surgeon</li>
<li><strong>Waiting times</strong> — the health service target is 18 weeks, but actual waits average <strong>6–12 months</strong> in 2024</li>
<li><strong>Prehabilitation</strong> — many trusts now offer "prehab" programmes to optimise fitness before surgery</li>
<li><strong>Recovery</strong> — most patients return to normal activities within 3–6 months</li>
<li><strong>Cost</strong> — fully funded through the public health service; no charge to the patient</li>
</ul>
<p>The <strong>National Joint Registry (NJR)</strong> tracks every joint replacement performed in England, Wales, Northern Ireland and the Isle of Man, ensuring quality and safety monitoring.</p>

<h2 id="medications-the health service">Medications Available through the public health service</h2>
<p>The health service provides all medically necessary arthritis medications at standard prescription cost (currently <strong>£9.90 per item</strong> in England as of 2024; free in Scotland, Wales and Northern Ireland). Key medications include:</p>
<ul>
<li><strong>Paracetamol and NSAIDs</strong> — first-line pain relief</li>
<li><strong>Corticosteroids</strong> — short courses for flares, injections for localised inflammation</li>
<li><strong>DMARDs</strong> — methotrexate, sulfasalazine, hydroxychloroquine, leflunomide</li>
<li><strong>Biologics</strong> — adalimumab (Humira), etanercept (Enbrel), rituximab, tocilizumab, secukinumab</li>
<li><strong>JAK inhibitors</strong> — tofacitinib, baricitinib, upadacitinib</li>
</ul>
<p>If you take regular prescribed medication, a <strong>Prescription Prepayment Certificate (PPC)</strong> can save significant money. A 12-month PPC costs <strong>£111.60</strong> (2024) and covers unlimited prescriptions — worthwhile if you have more than 11 items per year.</p>

<h2 id="mental-health-support">Mental Health Support Through the health service</h2>
<p>The health service recognises the profound impact of chronic pain on mental health. Services available include:</p>
<ul>
<li><strong>IAPT (Improving Access to Psychological Therapies)</strong> — free CBT and counselling, self-referral available at <a href="https://www.gov.uk/browse/health-and-social-care" target="_blank" rel="noopener noreferrer">gov.uk/health</a></li>
<li><strong>the health service pain psychology</strong> — specialist psychologists within pain management teams</li>
<li><strong>Social prescribing</strong> — link workers who connect you with community activities, support groups and local services</li>
<li><strong>Crisis support</strong> — the health service 111 (option 2 for mental health crisis) or Samaritans 116 123</li>
</ul>

<h2 id="devolved-nations">Differences Across the UK Nations</h2>
<p>Healthcare is devolved in the UK, meaning services differ between England, Scotland, Wales and Northern Ireland:</p>
<ul>
<li><strong>Scotland</strong> — Scotland's health service provides free prescriptions for all. Musculoskeletal services are managed through Health Boards. The Scottish Intercollegiate Guidelines Network (SIGN) publishes its own clinical guidelines.</li>
<li><strong>Wales</strong> — Wales's health service also provides free prescriptions. Arthritis care is delivered through Local Health Boards. Wales has invested in community musculoskeletal services.</li>
<li><strong>Northern Ireland</strong> — Free prescriptions. Services delivered through Health and Social Care (HSC) trusts. Waiting times have historically been longer than England.</li>
<li><strong>England</strong> — Standard prescription charges apply (unless exempt). Services commissioned by Integrated Care Boards (ICBs). Most FCPs are deployed here.</li>
</ul>

<h2 id="how-to-get-the-most">How to Get the Most From Arthritis Services</h2>
<ul>
<li><strong>Prepare for appointments</strong> — write down your symptoms, questions and medication list</li>
<li><strong>Ask about self-referral</strong> — for physiotherapy, IAPT and some community services</li>
<li><strong>Use the health service online services</strong> — book appointments, order repeat prescriptions and view records through the public health service App</li>
<li><strong>Request a care plan</strong> — if you have a long-term condition, you're entitled to an annual review and personalised care plan</li>
<li><strong>Know your rights</strong> — the health service Constitution gives you the right to treatment within 18 weeks of referral</li>
<li><strong>Consider Patient Advice and Liaison Service (PALS)</strong> — if you're unhappy with your care</li>
<li><strong>Join a support group</strong> — many the health service trusts partner with Versus Arthritis to run hospital-based support groups</li>
</ul>

<h2 id="sources-the health service">Sources &amp; Disclaimer</h2>
<p>Information sourced from the health service Digital, NICE guidelines (NG100, NG226, CG177, CG79), the National Joint Registry Annual Report 2024, England's health service workforce data, and Versus Arthritis. This guide is for educational purposes and does not constitute medical advice. Always consult your healthcare team for personalised guidance.</p>
`;

export default function HealthServicesGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Arthritis Services UK – GP, Rheumatology, Physio &amp; Joint Replacement Guide</title>
        <meta name="description" content="Complete guide to arthritis services: GP referrals, first contact physiotherapists, rheumatology clinics, pain management, joint replacement surgery and mental health support across the UK." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/health-services" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content="Arthritis Services UK – GP, Rheumatology, Physio &amp; Joint Replacement Guide" />
      <meta property="og:description" content="Complete guide to arthritis services: GP referrals, first contact physiotherapists, rheumatology clinics, pain management, joint replacement surgery and mental health support across the UK." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/health-services" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Services UK – GP, Rheumatology, Physio &amp; Joint Replacement Guide" />
      <meta name="twitter:description" content="Complete guide to arthritis services: GP referrals, first contact physiotherapists, rheumatology clinics, pain management, joint replacement surgery and mental health support across the UK." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
    </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Arthritis Services Guide"
          subtitle="How to access free arthritis care through the public health service — from your first GP visit to specialist rheumatology, physiotherapy and joint replacement surgery."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/uk-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">← Previous Guide</p>
                <p className="font-bold text-foreground">Complete UK Arthritis Guide</p>
              </Link>
              <Link to="/guides/benefits-pip" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Next Guide →</p>
                <p className="font-bold text-foreground">Benefits &amp; PIP Support</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
