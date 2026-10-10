import { Helmet } from "react-helmet-async";
import { lazyWithRetry } from "@/lib/chunkRecovery";
import PageSchema from "@/components/seo/PageSchema";
import Header from "@/components/Header";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";

import { sanitizeHtml } from "@/utils/sanitizeHtml";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

const CONTENT = `
<h2 id="introduction">Benefits and Financial Support for Arthritis in the UK</h2>
<p>Living with arthritis can have a significant financial impact. Reduced working hours, early retirement, the cost of medications, travel to appointments, home adaptations and specialist equipment all place financial strain on individuals and families. Yet many people with arthritis in the UK are unaware of the <strong>benefits and financial support</strong> they may be entitled to.</p>
<p>This guide focuses on preparing a PIP claim and finding the right support. For the eligibility question first, read <a href="/blog/pip-for-arthritis-uk">can you claim PIP for arthritis?</a></p>

<h2 id="personal-independence-payment">Personal Independence Payment (PIP)</h2>
<p>PIP is a tax-free, non-means-tested benefit designed to help with the <strong>extra costs of living with a long-term health condition or disability</strong>. It is available to people aged 16 to State Pension age in England and Wales (replaced by Adult Disability Payment in Scotland). Importantly, PIP is available whether you work or not — it is not an out-of-work benefit.</p>

<h3 id="pip-components">PIP components and current rates</h3><p>PIP has daily living and mobility components, each with standard and enhanced rates. Check the <a href="https://www.gov.uk/pip/how-much-youll-get">current official rates</a> rather than relying on an old payment figure.</p>
<h3 id="pip-eligibility">Who Is Eligible?</h3>
<p>To qualify for PIP, you must:</p>
<ul>
<li>Be aged 16 to State Pension age</li>
<li>Have a health condition or disability that has affected you for at least <strong>3 months</strong> and is expected to continue for at least <strong>9 months</strong></li>
<li>Have difficulty with daily living activities and/or mobility due to your condition</li>
<li>Be resident in England or Wales (Scotland has Adult Disability Payment)</li>
</ul>
<p>PIP is assessed against daily living and mobility criteria, not a diagnosis alone. Explain whether you can complete activities safely, repeatedly, adequately and in a reasonable time, and how often difficulties arise. Many people with arthritis qualify, including those with osteoarthritis, rheumatoid arthritis, psoriatic arthritis and other forms.</p>

<h3 id="pip-activities">PIP Activities and Descriptors</h3>
<p>PIP is assessed across <strong>12 activities</strong> — 10 for daily living and 2 for mobility. Each activity has a set of descriptors worth 0–12 points. You need:</p>
<ul>
<li><strong>8 points</strong> for the standard rate of either component</li>
<li><strong>12 points</strong> for the enhanced rate of either component</li>
</ul>
<p><strong>Daily Living Activities:</strong></p>
<ol>
<li><strong>Preparing food</strong> — can you chop, peel, use a cooker safely? Arthritis affecting hands/wrists is very relevant</li>
<li><strong>Taking nutrition</strong> — can you cut food and lift cups/utensils to your mouth?</li>
<li><strong>Managing therapy or monitoring a health condition</strong> — includes managing medications, doing prescribed exercises, attending appointments</li>
<li><strong>Washing and bathing</strong> — can you wash your body, get in/out of a bath or shower?</li>
<li><strong>Managing toilet needs</strong> — relevant if hip, knee or hand arthritis affects this</li>
<li><strong>Dressing and undressing</strong> — can you do buttons, zips, put on socks/shoes?</li>
<li><strong>Communicating verbally</strong> — generally less relevant for arthritis unless fatigue/pain affects concentration</li>
<li><strong>Reading and understanding signs</strong> — may be relevant if brain fog or medication side effects affect cognition</li>
<li><strong>Engaging with other people face to face</strong> — relevant if depression/anxiety from chronic pain affects social interaction</li>
<li><strong>Making budgeting decisions</strong> — relevant if cognitive effects of pain/fatigue affect decision-making</li>
</ol>
<p><strong>Mobility Activities:</strong></p>
<ol>
<li><strong>Planning and following journeys</strong> — relevant if pain/fatigue affects your ability to plan or cope with travel</li>
<li><strong>Moving around</strong> — can you stand and then move more than 200 metres, 50 metres, 20 metres? This is the key mobility descriptor for arthritis</li>
</ol>

<h3 id="pip-application">How to Apply for PIP</h3>
<ol>
<li><strong>Call the PIP new claims line</strong>: 0800 917 2222 (Monday–Friday, 8am–5pm). You will be asked basic details and sent a <strong>"How your disability affects you"</strong> questionnaire (PIP2 form)</li>
<li><strong>Complete the PIP2 form</strong>: This is the most important stage. Describe better and worse days and how often they occur. Explain what you cannot do, what causes pain, what takes longer, and where you need help or use aids. Be specific: "I cannot grip a kettle safely due to hand pain and stiffness" rather than "I have difficulty in the kitchen"</li>
<li><strong>Gather supporting evidence</strong>: Attach letters from your GP, rheumatologist, physiotherapist, occupational therapist or consultant. Include medication lists, clinic letters and any photos of swollen joints or hand deformities</li>
<li><strong>Attend a face-to-face or telephone assessment</strong>: An independent healthcare professional  will assess your needs. Explain the range and frequency of your difficulties honestly</li>
<li><strong>Receive your decision</strong>: Keep the decision letter and check any review date or challenge deadline. Processing times and award lengths vary.</li>
</ol>

<h3 id="pip-tips">Tips for a Successful PIP Claim</h3>
<ul>
<li><strong>Describe variation honestly</strong> — give examples from better and worse days; do not describe your worst day as every day</li>
<li><strong>Mention variability</strong> — arthritis is a fluctuating condition; explain how bad days differ from good days</li>
<li><strong>Include fatigue</strong> — chronic fatigue is a major feature of inflammatory arthritis and counts toward daily living activities</li>
<li><strong>Mention pain</strong> — describe the type, intensity and impact of pain on each activity</li>
<li><strong>Note time taken</strong> — if a task takes you twice as long as someone without arthritis, this counts</li>
<li><strong>List all aids and adaptations</strong> — jar openers, perching stools, grab rails, orthotics, walking sticks, wheelchairs</li>
<li><strong>Keep a pain diary</strong> — a <a href="/resources/pip-evidence-diary">printable PIP evidence diary</a> can help you record daily symptoms and prepare for a claim</li>
<li><strong>Get help completing the form</strong> — Citizens Advice, Arthritis UK and local welfare rights services offer free support</li>
</ul>

<h3 id="pip-mandatory-reconsideration">If Your PIP Claim Is Refused</h3>
<p>If you disagree with the decision, you have the right to challenge it:</p>
<ol>
<li><strong>Mandatory Reconsideration</strong> — request this within <strong>1 month</strong> of the decision. Provide additional evidence.</li>
<li><strong>Appeal to a tribunal</strong> — if reconsideration fails, appeal to the Social Security and Child Support Tribunal within 1 month. You'll have a hearing before an independent panel. Get advice on your evidence and the deadline; there is no guarantee of a changed decision</li>
</ol>
<p>Free help with appeals is available from Citizens Advice, law centres, and Arthritis UK (helpline: 0800 5200 520).</p>

<h2 id="other-benefits">Other Benefits You May Be Entitled To</h2>

<h3 id="attendance-allowance">Attendance Allowance</h3>
<p>For a new disability-benefit claim after State Pension age, check the appropriate <a href="https://www.gov.uk/attendance-allowance">Attendance Allowance pathway</a>. Existing PIP may continue after State Pension age; do not stop it simply because you have reached that age. Scotland has a different pension-age disability-benefit pathway.</p>
<h3 id="employment-support">Employment and Support Allowance (ESA)</h3>
<p>Check <a href="https://www.gov.uk/employment-support-allowance">New Style ESA guidance</a> for eligibility, current amounts and duration. Do not assume a PIP award determines entitlement to a separate benefit.</p>
<h3 id="universal-credit">Universal Credit</h3>
<p>Use the <a href="https://www.gov.uk/universal-credit">official Universal Credit guidance</a> and personalised welfare advice. PIP does not automatically establish limited capability for work or entitlement to an additional Universal Credit element.</p>

<h3 id="carers-allowance">Carer's Allowance</h3>
<p>Check the <a href="https://www.gov.uk/carers-allowance/eligibility">Carer’s Allowance eligibility rules</a>. Either rate of the PIP daily living component can be a qualifying benefit; additional conditions apply to the carer.</p>

<h3 id="blue-badge">Blue Badge Scheme</h3>
<p>Blue Badge rules depend on where you live and your circumstances. Check the <a href="https://www.gov.uk/apply-blue-badge">official application guidance</a>; do not assume a PIP award alone always means automatic eligibility.</p>
<p>Your local council can explain its application process.</p>

<h3 id="motability">Motability Scheme</h3>
<p>If you receive the <strong>enhanced rate mobility component of PIP</strong>, you can use it to lease a car, powered wheelchair or scooter through the <strong>Motability Scheme</strong>. You exchange some or all of your mobility payment for a vehicle, with insurance, servicing, breakdown cover and adaptations included.</p>

<h3 id="disabled-facilities-grant">Disabled Facilities Grant</h3>
<p>Local authorities provide grants of up to <strong>£30,000</strong> (England) for home adaptations such as:</p>
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
<li>If you have a medical exemption certificate (currently limited to specific conditions — arthritis alone does not qualify, but some related conditions do)</li>
<li>If you are over 60 or under 16 (or under 19 in full-time education)</li>
<li>Check <a href="https://www.nhs.uk/nhs-services/prescriptions/save-money-with-a-prescription-prepayment-certificate-ppc/">current prescription prepayment certificate costs</a> if you pay for regular prescriptions.</li>
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
<p><strong>Access to Work</strong> is a government scheme that can fund workplace adjustments costing more than what's reasonable for the employer — including specialist equipment, support workers and taxi fares. Read our <a href="/library/access-to-work">Access to Work library guide</a>, apply through <a href="https://www.gov.uk/access-to-work" target="_blank" rel="noopener noreferrer">GOV.UK</a> or call 0800 121 7479.</p>

<h2 id="where-to-get-help">Where to Get Free Help</h2>
<ul>
<li><strong>Citizens Advice</strong> — free benefits advice and form-filling help: <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer">citizensadvice.org.uk</a> or 0800 144 8848</li>
<li><strong>Arthritis UK helpline (formerly Versus Arthritis)</strong> — 0800 5200 520 (includes benefits advice)</li>
<li><strong>Turn2us</strong> — benefits calculator and grants directory: <a href="https://www.turn2us.org.uk" target="_blank" rel="noopener noreferrer">turn2us.org.uk</a></li>
<li><strong>Scope</strong> — disability rights and benefits support: <a href="https://www.scope.org.uk" target="_blank" rel="noopener noreferrer">scope.org.uk</a></li>
<li><strong>Local welfare rights services</strong> — many councils offer free benefits advice</li>
<li><strong>NRAS</strong> — National Rheumatoid Arthritis Society: <a href="https://nras.org.uk" target="_blank" rel="noopener noreferrer">nras.org.uk</a></li>
<li><strong>GOV.UK</strong> — official PIP information: <a href="https://www.gov.uk/pip" target="_blank" rel="noopener noreferrer">gov.uk/pip</a></li>
</ul>

<h2 id="sources-benefits">Sources &amp; Disclaimer</h2>
<p>Use the linked official sources for current rules and amounts. This is educational guidance, not individual welfare advice. Editorial corrections made 10 October 2026; updated wording is pending clinical and welfare review. <a href="https://www.gov.uk/government/publications/personal-independence-payment-assessment-guide-for-assessment-providers/pip-assessment-guide-part-2-the-assessment-criteria">DWP assessment criteria</a> explain reliability and fluctuating conditions.</p>
`;

export default function BenefitsPIPGuide() {
  const html = addHeadingIds(CONTENT);

  const PIP_GUIDE_FAQS = [
    {
      question: "How do I claim PIP for arthritis in the UK?",
      answer:
        "Call the PIP new claims line on 0800 917 2222 (or claim via GOV.UK where available), complete the 'How your disability affects you' (PIP2) form describing better and worse days and how often difficulties occur, attach GP/rheumatology evidence, attend the assessment, then wait for the decision. Keep a symptom diary — Living With Arthritis offers a free PIP evidence diary at /resources/pip-evidence-diary. This is educational guidance only; always check https://www.gov.uk/pip and get regulated welfare advice for your own claim.",
    },

    {
      question: "How much is PIP for arthritis in 2026/27?",
      answer:
        "PIP has daily living and mobility components, each with standard and enhanced rates. Check the current amounts at https://www.gov.uk/pip/how-much-youll-get. An award depends on the assessment criteria, not the arthritis diagnosis alone.",
    },
    {
      question: "Can I claim PIP for osteoarthritis or rheumatoid arthritis?",
      answer:
        "Yes — PIP is not diagnosis-led. Assessors look at how arthritis affects daily living and mobility across time, including reliability and frequency (points for activities such as cooking, dressing, managing treatments and moving around). Osteoarthritis, rheumatoid arthritis, psoriatic arthritis and other forms can all qualify if the functional impact is enough.",
    },
    {
      question: "How long must arthritis have affected me before I claim PIP?",
      answer:
        "Your difficulties must have lasted at least 3 months and be expected to continue for at least 9 months. You usually need to be aged 16 to State Pension age and living in England or Wales (Scotland uses Adult Disability Payment; Northern Ireland has a separate PIP system).",
    },
    {
      question: "What if my PIP claim for arthritis is refused?",
      answer:
        "Ask for a Mandatory Reconsideration within 1 month and send stronger evidence (rheumatology letters, OT/physio notes, a diary of bad days). If that fails, appeal to the Social Security and Child Support Tribunal within 1 month — an adviser can help you assess the next step. Free help is available from Citizens Advice and welfare rights services.",
    },
    {
      question: "What replaces PIP after State Pension age?",
      answer:
        "Attendance Allowance is the main disability benefit if you claim after State Pension age (it has no mobility component). Check current rates and the appropriate pathway for where you live. If you already get PIP when you reach State Pension age, PIP can often continue — check GOV.UK or a benefits adviser before stopping a claim.",
    },
    {
      question: "Where can I get free help with a PIP form for arthritis?",
      answer:
        "Citizens Advice, local welfare rights / law centres, and disability charities can help with PIP2 forms and appeals. Arthritis UK (formerly Versus Arthritis) runs a helpline on 0800 5200 520. Living With Arthritis (charity 1218461) publishes this guide for education only — we are independent of Arthritis UK and cannot replace regulated advice.",
    },
    {
      question: "Does PIP affect other benefits or mean-tested support?",
      answer:
        "PIP itself is not means-tested and is usually ignored as income for Universal Credit, but it can unlock premiums, Blue Badge eligibility routes, Motability (enhanced mobility) and carer entitlement. Always check a benefits calculator (e.g. Turn2us or Entitledto) or an adviser for your household.",
    },
    {
      question: "Can I work while claiming PIP for arthritis?",
      answer:
        "Yes. PIP is not an out-of-work benefit — you can work full-time, part-time or not at all if you meet the daily living or mobility criteria. Tell DWP if your needs change a lot, and ask your employer about Equality Act reasonable adjustments and Access to Work support.",
    },
    {
      question: "How should I describe arthritis flares on the PIP form?",
      answer:
        "Describe better and worse days and how often they occur. Do not imply that your worst day is every day. Cover morning stiffness, pain, fatigue, extra time needed, aids you use, and what you cannot do safely or repeatedly (for example gripping a kettle or walking on a flare day). A short symptom diary helps — use our free printable PIP evidence diary at /resources/pip-evidence-diary.",
    },
    {
      question: "What if I live in Scotland — is PIP different?",
      answer:
        "In Scotland, working-age adults claim Adult Disability Payment (ADP) from Social Security Scotland instead of PIP. If you move between Scotland and England or Wales, report the move and claim the correct benefit so payments are not interrupted — check mygov.scot for ADP and GOV.UK for PIP.",
    },
  ];

  return (
    <>
      <PageSchema
        url="/guides/benefits-pip"
        name="PIP Application Guide: Forms, Evidence & Next Steps"
        description="Prepare a PIP claim for arthritis: application steps, evidence diary, assessments and challenges. Find current official rates and country-specific claim routes."
        medical={{ condition: "Arthritis" }}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Benefits & PIP Guide" },
        ]}
        faqs={PIP_GUIDE_FAQS}
        idPrefix="benefits-pip-guide"
      />
      <Helmet>
        <title>PIP Application Guide: Forms, Evidence & Next Steps | Living With Arthritis</title>
        <meta name="description" content="Prepare a PIP claim for arthritis: application steps, evidence diary, assessments and challenges. Find current official rates and country-specific claim routes." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/guides/benefits-pip" />
      <meta property="og:title" content="PIP Application Guide: Forms, Evidence & Next Steps" />
      <meta property="og:description" content="Prepare a PIP claim for arthritis: application steps, evidence diary, assessments and challenges. Find current official rates and country-specific claim routes." />

      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/benefits-pip" />
      <meta property="og:site_name" content="Living With Arthritis" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PIP Application Guide: Forms, Evidence & Next Steps" />
      <meta name="twitter:description" content="Prepare a PIP claim for arthritis: application steps, evidence diary, assessments and challenges. Find current official rates and country-specific claim routes." />
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
        "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk" },
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
      {/* FAQPage JSON-LD is emitted once by PageSchema (faqs={PIP_GUIDE_FAQS})
          for the questions rendered visibly in the accordion below. The
          second, hand-written FAQPage block that used to sit here duplicated
          the schema and covered questions that were not visible on the page. */}
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="PIP application guide: forms, evidence and next steps"
          subtitle="Step-by-step Personal Independence Payment guidance for arthritis — eligibility, PIP2 form, assessment tips, appeals and free diary tools. Educational only; check GOV.UK for your claim."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AeoEnhancement route="/guides/benefits-pip" />
          <TopicClusterNav path="/guides/benefits-pip" />
          <p className="speakable-intro text-muted-foreground text-base leading-relaxed mb-8">
            How to claim PIP for arthritis in the UK: call 0800 917 2222 (or use GOV.UK), complete the PIP2 form describing better and worse days and their frequency, attach clinical evidence, attend the assessment, then challenge refusals via Mandatory Reconsideration if needed. Always check https://www.gov.uk/pip and get welfare advice for your own claim — this page is educational only.
          </p>
          <div className="mb-10 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6 print:hidden">
            <p className="text-sm font-semibold text-foreground m-0 mb-2">Free tool: printable PIP evidence diary</p>
            <p className="text-sm text-muted-foreground m-0 mb-4">
              Record a typical week of daily living and mobility before you fill the PIP2 form — then bring the notes to an adviser.
            </p>
            <Link
              to="/resources/pip-evidence-diary"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
            >
              Open the PIP evidence diary
            </Link>
          </div>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
          <section id="benefits-pip-faq" className="mt-16 pt-8 border-t border-border/30">
            <h2 className="font-display font-bold text-2xl mb-6">Frequently asked questions</h2>
            <FaqAccordion
              idPrefix="benefits-pip-faq"
              items={PIP_GUIDE_FAQS}
              injectSchema={false}
            />
          </section>
          <div className="mt-16 pt-8 border-t border-border/30">

            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">← Previous Guide</p>
                <p className="font-bold text-foreground">Arthritis Services</p>
              </Link>
              <Link to="/guides/uk-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Start from →</p>
                <p className="font-bold text-foreground">Complete UK Arthritis Guide</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-5 md:px-10 max-w-3xl pb-8">
        <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
        <EducationalDisclaimerBox reviewStatus="pending" pendingText="Updated wording pending clinical and welfare review." />
      </div>
<GuideOnwardJourney currentPath="/guides/benefits-pip" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


