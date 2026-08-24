import { Helmet } from "react-helmet-async";
import PageSchema from "@/components/seo/PageSchema";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import { useSafeHtml } from "@/utils/sanitizeHtml";

const Footer = lazy(() => import("@/components/Footer"));

const CONTENT = `
<h2 id="introduction">Benefits and Financial Support for Arthritis in the UK</h2>
<p>Living with arthritis can have a significant financial impact. Reduced working hours, early retirement, the cost of medications, travel to appointments, home adaptations and specialist equipment all place financial strain on individuals and families. Yet many people with arthritis in the UK are unaware of the <strong>benefits and financial support</strong> they may be entitled to.</p>
<p>According to Versus Arthritis, <strong>1 in 4 people</strong> with musculoskeletal conditions who are eligible for benefits are not claiming them. This guide explains every major benefit available, with a particular focus on <strong>Personal Independence Payment (PIP)</strong>, the primary disability benefit for working-age adults in England and Wales.</p>

<h2 id="personal-independence-payment">Personal Independence Payment (PIP)</h2>
<p>PIP is a tax-free, non-means-tested benefit designed to help with the <strong>extra costs of living with a long-term health condition or disability</strong>. It is available to people aged 16 to State Pension age in England and Wales (replaced by Adult Disability Payment in Scotland). Importantly, PIP is available whether you work or not â€” it is not an out-of-work benefit.</p>

<h3 id="pip-components">PIP Components and Rates (2024/25)</h3>
<p>PIP has two components, and you can claim either or both:</p>
<p><strong>Daily Living Component</strong> â€” for help with everyday tasks like preparing food, washing, dressing, managing medications and communicating:</p>
<ul>
<li>Standard rate: <strong>Â£72.65 per week</strong></li>
<li>Enhanced rate: <strong>Â£108.55 per week</strong></li>
</ul>
<p><strong>Mobility Component</strong> â€” for help getting around:</p>
<ul>
<li>Standard rate: <strong>Â£28.70 per week</strong></li>
<li>Enhanced rate: <strong>Â£75.75 per week</strong></li>
</ul>
<p>At the enhanced rate for both components, PIP provides up to <strong>Â£184.30 per week</strong> (Â£9,584 per year), which can make a transformative difference to quality of life.</p>

<h3 id="pip-eligibility">Who Is Eligible?</h3>
<p>To qualify for PIP, you must:</p>
<ul>
<li>Be aged 16 to State Pension age</li>
<li>Have a health condition or disability that has affected you for at least <strong>3 months</strong> and is expected to continue for at least <strong>9 months</strong></li>
<li>Have difficulty with daily living activities and/or mobility due to your condition</li>
<li>Be resident in England or Wales (Scotland has Adult Disability Payment)</li>
</ul>
<p>There is <strong>no minimum level of disability</strong> required â€” PIP is assessed based on how your condition affects you on your worst days, not on your diagnosis alone. Many people with arthritis qualify, including those with osteoarthritis, rheumatoid arthritis, psoriatic arthritis and other forms.</p>

<h3 id="pip-activities">PIP Activities and Descriptors</h3>
<p>PIP is assessed across <strong>12 activities</strong> â€” 10 for daily living and 2 for mobility. Each activity has a set of descriptors worth 0â€“12 points. You need:</p>
<ul>
<li><strong>8 points</strong> for the standard rate of either component</li>
<li><strong>12 points</strong> for the enhanced rate of either component</li>
</ul>
<p><strong>Daily Living Activities:</strong></p>
<ol>
<li><strong>Preparing food</strong> â€” can you chop, peel, use a cooker safely? Arthritis affecting hands/wrists is very relevant</li>
<li><strong>Taking nutrition</strong> â€” can you cut food and lift cups/utensils to your mouth?</li>
<li><strong>Managing therapy or monitoring a health condition</strong> â€” includes managing medications, doing prescribed exercises, attending appointments</li>
<li><strong>Washing and bathing</strong> â€” can you wash your body, get in/out of a bath or shower?</li>
<li><strong>Managing toilet needs</strong> â€” relevant if hip, knee or hand arthritis affects this</li>
<li><strong>Dressing and undressing</strong> â€” can you do buttons, zips, put on socks/shoes?</li>
<li><strong>Communicating verbally</strong> â€” generally less relevant for arthritis unless fatigue/pain affects concentration</li>
<li><strong>Reading and understanding signs</strong> â€” may be relevant if brain fog or medication side effects affect cognition</li>
<li><strong>Engaging with other people face to face</strong> â€” relevant if depression/anxiety from chronic pain affects social interaction</li>
<li><strong>Making budgeting decisions</strong> â€” relevant if cognitive effects of pain/fatigue affect decision-making</li>
</ol>
<p><strong>Mobility Activities:</strong></p>
<ol>
<li><strong>Planning and following journeys</strong> â€” relevant if pain/fatigue affects your ability to plan or cope with travel</li>
<li><strong>Moving around</strong> â€” can you stand and then move more than 200 metres, 50 metres, 20 metres? This is the key mobility descriptor for arthritis</li>
</ol>

<h3 id="pip-application">How to Apply for PIP</h3>
<ol>
<li><strong>Call the PIP new claims line</strong>: 0800 917 2222 (Mondayâ€“Friday, 8amâ€“5pm). You will be asked basic details and sent a <strong>"How your disability affects you"</strong> questionnaire (PIP2 form)</li>
<li><strong>Complete the PIP2 form</strong>: This is the most important stage. Describe your <strong>worst days</strong>, not your best. Explain what you cannot do, what causes pain, what takes longer, and where you need help or use aids. Be specific: "I cannot grip a kettle safely due to hand pain and stiffness" rather than "I have difficulty in the kitchen"</li>
<li><strong>Gather supporting evidence</strong>: Attach letters from your GP, rheumatologist, physiotherapist, occupational therapist or consultant. Include medication lists, clinic letters and any photos of swollen joints or hand deformities</li>
<li><strong>Attend a face-to-face or telephone assessment</strong>: An independent healthcare professional (usually a nurse or physiotherapist working for contractors like Capita or Atos) will assess your needs. Describe your worst days honestly</li>
<li><strong>Receive your decision</strong>: Decisions typically take 8â€“16 weeks. If awarded, PIP is usually granted for a fixed period (1â€“10 years) and then reviewed</li>
</ol>

<h3 id="pip-tips">Tips for a Successful PIP Claim</h3>
<ul>
<li><strong>Describe your worst days</strong> â€” the assessment is about how you are affected at your most limited, not on a good day</li>
<li><strong>Mention variability</strong> â€” arthritis is a fluctuating condition; explain how bad days differ from good days</li>
<li><strong>Include fatigue</strong> â€” chronic fatigue is a major feature of inflammatory arthritis and counts toward daily living activities</li>
<li><strong>Mention pain</strong> â€” describe the type, intensity and impact of pain on each activity</li>
<li><strong>Note time taken</strong> â€” if a task takes you twice as long as someone without arthritis, this counts</li>
<li><strong>List all aids and adaptations</strong> â€” jar openers, perching stools, grab rails, orthotics, walking sticks, wheelchairs</li>
<li><strong>Keep a pain diary</strong> â€” a 2-week diary showing daily symptom levels strengthens your claim significantly</li>
<li><strong>Get help completing the form</strong> â€” Citizens Advice, Versus Arthritis and local welfare rights services offer free support</li>
</ul>

<h3 id="pip-mandatory-reconsideration">If Your PIP Claim Is Refused</h3>
<p>If you disagree with the decision, you have the right to challenge it:</p>
<ol>
<li><strong>Mandatory Reconsideration</strong> â€” request this within <strong>1 month</strong> of the decision. Provide additional evidence. Around <strong>17% of reconsiderations</strong> result in a changed decision (DWP, 2024)</li>
<li><strong>Appeal to a tribunal</strong> â€” if reconsideration fails, appeal to the Social Security and Child Support Tribunal within 1 month. You'll have a hearing before an independent panel. <strong>Around 70% of PIP appeals are successful</strong> (Ministry of Justice, 2024), so it is well worth pursuing if you believe your needs were underestimated</li>
</ol>
<p>Free help with appeals is available from Citizens Advice, law centres, and Versus Arthritis (helpline: 0800 5200 520).</p>

<h2 id="other-benefits">Other Benefits You May Be Entitled To</h2>

<h3 id="attendance-allowance">Attendance Allowance</h3>
<p>If you are <strong>over State Pension age</strong>, Attendance Allowance replaces PIP. It has two rates:</p>
<ul>
<li>Lower rate: <strong>Â£72.65 per week</strong> (daytime or night-time needs)</li>
<li>Higher rate: <strong>Â£108.55 per week</strong> (day and night needs)</li>
</ul>
<p>There is no mobility component, but qualifying opens access to additional benefits like Pension Credit, Council Tax Reduction and Carer's Allowance for someone who helps you.</p>

<h3 id="employment-support">Employment and Support Allowance (ESA)</h3>
<p>If arthritis prevents you from working and you have enough National Insurance contributions, you may qualify for <strong>New Style ESA</strong>. This provides:</p>
<ul>
<li>Up to <strong>Â£90.50 per week</strong> (support group) or Â£75.50 (work-related activity group)</li>
<li>Available for up to 365 days (contribution-based)</li>
</ul>

<h3 id="universal-credit">Universal Credit</h3>
<p>If you have limited income and savings, Universal Credit may provide additional financial support. If you have a <strong>Limited Capability for Work and Work-Related Activity (LCWRA)</strong> determination, you receive an extra <strong>Â£416.19 per month</strong>. Having PIP also often passports you to the LCWRA element without a separate assessment.</p>

<h3 id="carers-allowance">Carer's Allowance</h3>
<p>If someone provides care for you for at least <strong>35 hours per week</strong> and you receive the daily living component of PIP at the enhanced rate (or Attendance Allowance at the higher rate), your carer may be eligible for <strong>Carer's Allowance</strong> of <strong>Â£81.90 per week</strong>.</p>

<h3 id="blue-badge">Blue Badge Scheme</h3>
<p>The Blue Badge allows you to park closer to your destination. You automatically qualify if you receive the <strong>enhanced rate mobility component of PIP</strong> (scoring 8+ points on the "moving around" activity). You can also apply via your local council if you have a condition that affects your ability to walk, even if you don't receive PIP mobility.</p>
<p>Apply through your local council â€” the process typically takes 6â€“12 weeks.</p>

<h3 id="motability">Motability Scheme</h3>
<p>If you receive the <strong>enhanced rate mobility component of PIP</strong>, you can use it to lease a car, powered wheelchair or scooter through the <strong>Motability Scheme</strong>. You exchange some or all of your mobility payment for a vehicle, with insurance, servicing, breakdown cover and adaptations included. Over <strong>640,000 people</strong> in the UK use Motability.</p>

<h3 id="disabled-facilities-grant">Disabled Facilities Grant</h3>
<p>Local authorities provide grants of up to <strong>Â£30,000</strong> (England) for home adaptations such as:</p>
<ul>
<li>Walk-in showers and level-access bathrooms</li>
<li>Stair lifts</li>
<li>Ramps and widened doorways</li>
<li>Kitchen modifications</li>
</ul>
<p>Apply through your local council. An occupational therapist assessment is usually required.</p>

<h3 id="council-tax-reduction">Council Tax Reduction</h3>
<p>If you receive PIP or Attendance Allowance, you may be eligible for a <strong>Council Tax reduction</strong> or exemption. Some councils also offer a <strong>disability reduction scheme</strong> if your property has been adapted (e.g., an extra bathroom). Contact your local council to check eligibility.</p>

<h3 id="exemptions">Prescription Charge Exemptions</h3>
<p>In England, if you meet certain criteria you may be exempt from prescription charges:</p>
<ul>
<li>If you receive certain benefits (income-based ESA, Universal Credit below threshold)</li>
<li>If you have a medical exemption certificate (currently limited to specific conditions â€” arthritis alone does not qualify, but some related conditions do)</li>
<li>If you are over 60 or under 16 (or under 19 in full-time education)</li>
<li>A <strong>Prescription Prepayment Certificate</strong> (Â£111.60/year) covers unlimited prescriptions and saves money if you have 12+ items per year</li>
</ul>
<p>Scotland, Wales and Northern Ireland provide <strong>free prescriptions</strong> for all residents.</p>

<h2 id="workplace-rights">Your Rights at Work</h2>
<p>Under the <strong>Equality Act 2010</strong>, arthritis is likely to qualify as a disability if it has a <strong>substantial and long-term adverse effect</strong> on your ability to carry out normal day-to-day activities. This means your employer must make <strong>reasonable adjustments</strong>, which could include:</p>
<ul>
<li>Flexible working hours or home working</li>
<li>Ergonomic workstation adaptations</li>
<li>Modified duties during flare-ups</li>
<li>Extra breaks</li>
<li>Reserved parking close to the entrance</li>
<li>Time off for medical appointments</li>
</ul>
<p><strong>Access to Work</strong> is a government scheme that can fund workplace adjustments costing more than what's reasonable for the employer â€” including specialist equipment, support workers and taxi fares. Apply through GOV.UK or call 0800 121 7479.</p>

<h2 id="where-to-get-help">Where to Get Free Help</h2>
<ul>
<li><strong>Citizens Advice</strong> â€” free benefits advice and form-filling help: <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer">citizensadvice.org.uk</a> or 0800 144 8848</li>
<li><strong>Versus Arthritis helpline</strong> â€” 0800 5200 520 (includes benefits advice)</li>
<li><strong>Turn2us</strong> â€” benefits calculator and grants directory: <a href="https://www.turn2us.org.uk" target="_blank" rel="noopener noreferrer">turn2us.org.uk</a></li>
<li><strong>Scope</strong> â€” disability rights and benefits support: <a href="https://www.scope.org.uk" target="_blank" rel="noopener noreferrer">scope.org.uk</a></li>
<li><strong>Local welfare rights services</strong> â€” many councils offer free benefits advice</li>
<li><strong>NRAS</strong> â€” National Rheumatoid Arthritis Society: <a href="https://nras.org.uk" target="_blank" rel="noopener noreferrer">nras.org.uk</a></li>
<li><strong>GOV.UK</strong> â€” official PIP information: <a href="https://www.gov.uk/pip" target="_blank" rel="noopener noreferrer">gov.uk/pip</a></li>
</ul>

<h2 id="sources-benefits">Sources &amp; Disclaimer</h2>
<p>This guide is based on GOV.UK official benefit rates and eligibility criteria (2024/25), DWP statistics, Ministry of Justice tribunal statistics, and guidance from Citizens Advice and Versus Arthritis. Benefit rates are subject to annual uprating (usually in April). This information is for educational purposes only and does not constitute legal or financial advice. For personalised advice, contact Citizens Advice or a qualified welfare rights adviser.</p>
`;

export default function BenefitsPIPGuide() {
  const html = addHeadingIds(CONTENT);

  const PIP_GUIDE_FAQS = [
    { question: "How much is PIP worth for arthritis?", answer: "PIP has two components you can claim either or both of. The Daily Living component pays Â£72.65/week (standard) or Â£108.55/week (enhanced); the Mobility component pays Â£28.70/week (standard) or Â£75.75/week (enhanced). At the enhanced rate for both, PIP is worth up to Â£184.30 per week (Â£9,584 per year)." },
    { question: "Do I need a specific arthritis diagnosis to qualify for PIP?", answer: "No â€” there is no minimum level of disability or specific diagnosis required. PIP is assessed on how your condition affects you on your worst days, not on diagnosis alone. Many people with osteoarthritis, rheumatoid arthritis, psoriatic arthritis and other forms of arthritis qualify." },
    { question: "How long do I need to have had arthritis to claim PIP?", answer: "Your condition must have affected you for at least 3 months and be expected to continue for at least 9 months. You must also be aged 16 to State Pension age and resident in England or Wales (Scotland has Adult Disability Payment instead)." },
    { question: "What happens if my PIP claim is refused?", answer: "You can request a Mandatory Reconsideration within 1 month of the decision, providing additional evidence â€” around 17% of reconsiderations result in a changed decision (DWP, 2024). If that fails, you can appeal to the Social Security and Child Support Tribunal within 1 month; around 70% of PIP appeals are successful (Ministry of Justice, 2024)." },
    { question: "What benefit replaces PIP once I reach State Pension age?", answer: "Attendance Allowance replaces PIP if you are over State Pension age. It pays Â£72.65/week (lower rate, day or night needs) or Â£108.55/week (higher rate, day and night needs), though it has no mobility component." },
    { question: "Can I get help with a PIP application for arthritis?", answer: "Yes â€” free help with PIP applications and appeals is available from Citizens Advice, law centres, and Versus Arthritis (helpline: 0800 5200 520)." },
  ];

  return (
    <>
      <PageSchema
        url="/guides/benefits-pip"
        name="UK Arthritis Benefits & PIP Guide"
        description="Guide to UK benefits for arthritis: PIP, Attendance Allowance, Blue Badge, Motability, workplace rights and Disabled Facilities Grant."
        medical={{ condition: "Arthritis" }}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Benefits & PIP Guide" },
        ]}
        faqs={PIP_GUIDE_FAQS}
        idPrefix="benefits-pip-guide"
      />
      <Helmet>
        <title>UK Arthritis Benefits & PIP Guide | Living With Arthritis</title>
        <meta name="description" content="Guide to UK benefits for arthritis: PIP, Attendance Allowance, Blue Badge, Motability, workplace rights and Disabled Facilities Grant." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content="Arthritis Benefits &amp; PIP Guide UK â€“ Personal Independence Payment, Blue Badge &amp; More" />
      <meta property="og:description" content="Complete guide to UK benefits for arthritis: PIP (Personal Independence Payment), Attendance Allowance, Blue Badge, Motability, workplace rights, Disabled Facilities Grant and where to get free help." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/benefits-pip" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Benefits &amp; PIP Guide UK â€“ Personal Independence Payment, Blue Badge &amp; More" />
      <meta name="twitter:description" content="Complete guide to UK benefits for arthritis: PIP (Personal Independence Payment), Attendance Allowance, Blue Badge, Motability, workplace rights, Disabled Facilities Grant and where to get free help." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "Arthritis Benefits & PIP Guide UK",
        "description": "Complete guide to PIP, Universal Credit, Attendance Allowance and other financial support for people living with arthritis in the UK.",
        "url": "https://livingwitharthritis.org.uk/guides/benefits-pip",
        "inLanguage": "en-GB",
        "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
        "about": { "@type": "MedicalCondition", "name": "Arthritis" },
        "publisher": { "@type": "Organization", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] }
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://livingwitharthritis.org.uk/guides/uk-arthritis" },
          { "@type": "ListItem", "position": 3, "name": "Benefits & PIP Guide", "item": "https://livingwitharthritis.org.uk/guides/benefits-pip" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Can I get PIP for arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PIP is assessed on how your condition affects you, not on your diagnosis. Many people with osteoarthritis, rheumatoid arthritis, psoriatic arthritis and other forms qualify. You must have been affected for at least 3 months and expect it to continue for at least 9 months." } },
          { "@type": "Question", "name": "How much PIP can I get for arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "At the enhanced rate for both components, PIP provides up to Â£184.30 per week (Â£9,584 per year) in 2024/25. The daily living component alone ranges from Â£72.65 to Â£108.55 per week." } },
          { "@type": "Question", "name": "What is the difference between PIP and Attendance Allowance for arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "PIP is for people of working age (16 to State Pension age). Attendance Allowance is for people over State Pension age. Both are non-means-tested and can be claimed whether you work or not." } },
          { "@type": "Question", "name": "What if my PIP claim is refused?", "acceptedAnswer": { "@type": "Answer", "text": "Request a Mandatory Reconsideration within one month. If that fails, appeal to the Social Security and Child Support Tribunal â€” around 70% of PIP appeals succeed at tribunal (Ministry of Justice, 2024)." } }
        ]
      })}</script>
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Benefits &amp; PIP Support Guide"
          subtitle="Everything you need to know about claiming disability benefits, PIP, Blue Badge, Motability and workplace rights when living with arthritis in the UK."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">â† Previous Guide</p>
                <p className="font-bold text-foreground">Arthritis Services</p>
              </Link>
              <Link to="/guides/uk-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Start from â†’</p>
                <p className="font-bold text-foreground">Complete UK Arthritis Guide</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/benefits-pip" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


