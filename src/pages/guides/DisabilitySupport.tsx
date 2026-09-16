import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";

const FAQS = [
  { q: 'What is considered a disability in the UK?', a: 'Under the Equality Act 2010, a disability is a physical or mental impairment that has a substantial and long-term (12+ months) effect on your ability to do normal daily activities.' },
  { q: 'What benefits are available for disability?', a: 'Personal Independence Payment (PIP), Attendance Allowance (65+), Employment Support Allowance (ESA), Disability Living Allowance (DLA, under 16), Carer&apos;s Allowance and Access to Work grants. Eligibility depends on age and impact on daily life.' },
  { q: 'How do I make my home more accessible?', a: 'Common modifications include ramps, stairlifts, walk-in showers, grab rails, raised toilet seats, wider doorways and accessible kitchens. Local authority Disabled Facilities Grants can help fund larger changes.' },
  { q: 'Where do I start with mobility equipment?', a: 'Start with an occupational therapy assessment — either via your GP or privately. They can recommend the right wheelchair, scooter, walking aid or seating system for your needs.' },
  { q: 'Can I get help with work-related adjustments?', a: 'Yes. Access to Work grants can pay for adapted equipment, support workers, travel costs and disability awareness training for colleagues.' },
  { q: 'What is assistive technology?', a: 'Hardware and software that supports independence — screen readers, voice control, eye-tracking, smart-home devices, communication aids and environmental controls.' },
];

export default function DisabilitySupport() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: 'Disability Support: Accessibility, Equipment and Independence',
      description: 'UK guide to disability support — mobility solutions, home accessibility, benefits, legal services and assistive technology. Reviewed by HCPC physio.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-22', dateModified: new Date().toISOString().slice(0, 10),
      reviewedBy: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      lastReviewed: '2026-09-16',
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/disability-support',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides/disability-support' },
      { name: 'Disability Support', path: '/guides/disability-support' },
    ]);
    const c1 = injectJsonLd('disability-article', article);
    const c2 = injectJsonLd('disability-faq', faq);
    const c3 = injectJsonLd('disability-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Disability Support UK Guide"
        description="Disability support guide: Accessibility, equipment, legal services & benefits. Navigate disability support services in the UK."
        path="/guides/disability-support"
        type="article"
        keywords="disability support, accessibility, mobility equipment, disability benefits uk, assistive technology, home modifications"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Disability Support</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Disability Support: Accessibility, Equipment and Independence</h1>
      <p className="speakable-intro text-lg text-muted-foreground mb-6 leading-relaxed">UK guide to disability support for people with arthritis — mobility, home adaptations, benefits (including PIP), Access to Work and assistive technology. Educational information only; start with an occupational therapy assessment for personalised advice.</p>
            <AeoEnhancement route="/guides/disability-support" />

      <AnswerBox question="What disability support is available in the UK?" reviewed="2026-09-14">
        Disability support covers everything that helps someone live independently — mobility equipment, accessible home modifications, financial benefits, legal advice and assistive technology. In the UK that means wheelchairs and scooters, ramps and stairlifts, Personal Independence Payment, Access to Work grants, Disabled Facilities Grants, occupational therapy assessments and increasingly smart-home and communication technology. Starting with an occupational therapy assessment — through your GP or privately — is the most efficient way to access the right combination of equipment, modifications and funding for your situation.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="September 2026" />

      <section id="understanding" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Understanding disability support needs</h2>
        <p className="leading-relaxed mb-4">Disability is defined by the Equality Act 2010 as a physical or mental impairment with a substantial, long-term effect on daily life. Around 16 million people in the UK — almost 1 in 4 — live with a disability, with musculoskeletal conditions among the most common causes.</p>
        <p className="leading-relaxed">Support is most effective when it is coordinated: clinical assessment, equipment, home modifications, finances and emotional support working together.</p>
      </section>

      <section id="mobility" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Mobility solutions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Walking aids — sticks, frames, rollators</li>
          <li>Manual and powered wheelchairs</li>
          <li>Mobility scooters for indoor and outdoor use</li>
          <li>Vehicle adaptations and Wheelchair Accessible Vehicles</li>
          <li>Motability Scheme for leasing adapted vehicles using qualifying benefits</li>
        </ul>
      </section>

      <section id="home" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Home accessibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Entry ramps and step lifts</li>
          <li>Stairlifts and through-floor lifts</li>
          <li>Walk-in showers, wet rooms and accessible bathrooms</li>
          <li>Grab rails, raised toilet seats and bath seats</li>
          <li>Accessible kitchen design — height-adjustable worktops, pull-down shelving</li>
          <li>Smart-home environmental controls — lights, heating, blinds</li>
        </ul>
        <p className="mt-4 leading-relaxed">Disabled Facilities Grants from your local council can help fund larger adaptations.</p>
      </section>

      <section id="legal-financial" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Legal and financial services</h2>
        <p className="leading-relaxed mb-4">Benefits navigation is one of the most common — and most overwhelming — areas. Specialist advisors at Citizens Advice, Scope and welfare-rights services can help with applications, appeals and tribunals.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/guides/benefits-pip" className="text-primary underline">Personal Independence Payment (PIP)</Link> — ages 16 to State Pension age</li>
          <li>Attendance Allowance — State Pension age and over</li>
          <li>Employment Support Allowance (ESA)</li>
          <li>Access to Work — workplace adjustments and equipment</li>
          <li>Disabled Facilities Grants — local council funding for home adaptations</li>
          <li>Carer&apos;s Allowance — for unpaid carers</li>
        </ul>
      </section>

      <section id="assistive-tech" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Assistive technology and care planning</h2>
        <p className="leading-relaxed">Assistive technology has expanded enormously — screen readers, voice control, eye-tracking, communication aids, smart-home automation and personal alarm systems all support independence. Care planning brings clinical, social and family input together to set goals and review progress over time.</p>
      </section>

      <section id="resources" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Resources commonly searched for</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Powered and manual wheelchairs</li>
          <li>Mobility scooters and walking aids</li>
          <li>Home modifications and accessible-build contractors</li>
          <li>Disability benefits advice and welfare-rights services</li>
          <li>Care planning and case-management services</li>
          <li>Assistive technology — screen readers, eye-tracking, voice control</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">Educational information only — we don&apos;t endorse specific providers, brands or services. Start with an occupational therapy assessment for personalised recommendations.</p>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link></li>
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management hub</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Fall prevention for older adults</Link></li>
          <li><Link to="/guides/musculoskeletal-health" className="text-primary underline">Musculoskeletal health</Link></li>
          <li><Link to="/guides/benefits-pip" className="text-primary underline">PIP &amp; benefits guide</Link></li>
        </ul>
      </section>

      <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
      <EducationalDisclaimerBox lastReviewed="2026-09-16" />
      <TopicClusterNav path="/guides/disability-support" />

      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        {FAQS.map((f) => (
          <div key={f.q} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
            <p className="leading-relaxed text-foreground/85">{f.a}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
