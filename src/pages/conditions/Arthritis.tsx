import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';

const FAQS = [
  { q: 'What is arthritis?', a: 'Arthritis is an umbrella term for over 100 conditions that cause joint pain, stiffness and swelling. The most common forms in the UK are osteoarthritis (wear-related) and rheumatoid arthritis (inflammatory).' },
  { q: 'What are the early warning signs of arthritis?', a: 'Persistent joint pain, morning stiffness lasting more than 30 minutes, swelling around a joint, reduced range of motion and warmth or redness over a joint. Symptoms lasting more than two weeks warrant a GP review.' },
  { q: 'How is arthritis diagnosed?', a: 'A clinician reviews your symptoms, examines affected joints, and may request blood tests (CRP, ESR, rheumatoid factor, anti-CCP) and imaging (X-ray, ultrasound or MRI) to confirm the type of arthritis.' },
  { q: 'Can arthritis be cured?', a: 'Most forms of arthritis cannot be cured, but symptoms can be effectively managed with exercise, weight management, an anti-inflammatory diet, medication, and in some cases joint replacement surgery.' },
  { q: 'What treatments help most?', a: 'Evidence consistently supports a combination of progressive exercise, weight optimisation, topical or oral anti-inflammatories, physiotherapy and joint protection strategies. Inflammatory arthritis often needs DMARDs or biologics.' },
  { q: 'When should I see a specialist?', a: 'Ask your GP for a rheumatology referral if you have suspected inflammatory arthritis, persistent unexplained joint swelling, or symptoms that are not responding to first-line care.' },
];

export default function Arthritis() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: 'Arthritis: Understanding Joint Pain and Treatment Options',
      description: 'Comprehensive UK guide to arthritis — symptoms, diagnosis, treatment options, and what patients commonly look for at each stage of their journey.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-22', dateModified: new Date().toISOString().slice(0, 10),
      reviewedBy: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      lastReviewed: '2026-06-22',
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/conditions/arthritis',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Conditions', path: '/conditions/arthritis' },
      { name: 'Arthritis', path: '/conditions/arthritis' },
    ]);
    const c1 = injectJsonLd('arthritis-article', article);
    const c2 = injectJsonLd('arthritis-faq', faq);
    const c3 = injectJsonLd('arthritis-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Arthritis: Symptoms, Diagnosis & Treatment | UK Guide"
        description="Arthritis overview: 100+ types, symptoms, diagnosis & treatment options. UK evidence-based guide to living well with arthritis."
        path="/conditions/arthritis"
        type="article"
        keywords="arthritis, arthritis symptoms, arthritis treatment, arthritis uk, joint pain"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Arthritis</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Arthritis: Understanding Joint Pain and Treatment Options</h1>

      <AnswerBox question="What is arthritis and how is it treated?" reviewed="2026-06-22">
        Arthritis describes over 100 conditions that affect the joints — causing pain, stiffness, swelling and reduced movement. Osteoarthritis (wear-related) and rheumatoid arthritis (inflammatory) are the most common forms in the UK. Effective management combines targeted exercise, weight optimisation, an anti-inflammatory diet, medical treatment for pain and inflammation, and — when needed — specialist rheumatology care, injections or joint replacement surgery. Early diagnosis and a structured care plan dramatically improve long-term outcomes.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What arthritis is</h2>
        <p className="mb-4 leading-relaxed">Arthritis is not a single disease — it is a broad term covering more than 100 joint conditions. The two most common are <Link to="/conditions/osteoarthritis" className="text-primary underline">osteoarthritis</Link>, where joint cartilage gradually wears down, and <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">rheumatoid arthritis</Link>, an autoimmune condition where the immune system attacks the joint lining.</p>
        <p className="leading-relaxed">More than 10 million people in the UK live with arthritis. It is the leading cause of pain and disability and affects people of every age — including children with juvenile arthritis.</p>
      </section>

      <section id="symptoms" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Symptoms to watch for</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Joint pain that worsens with activity or after rest</li>
          <li>Morning stiffness lasting more than 30 minutes</li>
          <li>Swelling, warmth or redness around a joint</li>
          <li>Reduced range of movement</li>
          <li>Grating, popping or clicking sounds (crepitus)</li>
          <li>Fatigue and low-grade fever (inflammatory types)</li>
        </ul>
      </section>

      <section id="diagnosis" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. How arthritis is diagnosed</h2>
        <p className="leading-relaxed">A GP or first-contact practitioner will take a detailed history, examine your joints and check for swelling or restricted movement. Blood tests (CRP, ESR, rheumatoid factor, anti-CCP, uric acid) and imaging (X-ray, ultrasound, MRI) help identify the type and severity of arthritis and rule out other causes.</p>
      </section>

      <section id="patients-look-for" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. What patients commonly look for</h2>
        <p className="mb-4 leading-relaxed">People newly diagnosed — and those managing arthritis long-term — typically search for help in four areas:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Pain relief options:</strong> topical and oral anti-inflammatories, heat and cold therapy, compression supports, splints and pain-relief gels.</li>
          <li><strong>Diagnostics:</strong> faster access to imaging and rheumatology assessment, sometimes via private clinics.</li>
          <li><strong>Specialist care:</strong> physiotherapy, rheumatology, podiatry and occupational therapy.</li>
          <li><strong>Supplements & nutrition:</strong> glucosamine, chondroitin, collagen, omega-3, turmeric and an anti-inflammatory eating pattern.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">This is educational information only — we don&apos;t endorse specific brands or products. Always speak to a clinician before starting a new treatment, supplement or device.</p>
      </section>

      <section id="treatments" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Evidence-based treatment options</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Exercise:</strong> progressive strength, mobility and aerobic training reduce pain and improve function — see our <Link to="/guides/exercise" className="text-primary underline">exercise guide</Link>.</li>
          <li><strong>Weight management:</strong> a 5–10% reduction in body weight significantly reduces knee and hip load.</li>
          <li><strong>Anti-inflammatory diet:</strong> Mediterranean-style eating — see our <Link to="/guides/diet" className="text-primary underline">diet guide</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid</Link>.</li>
          <li><strong>Medication:</strong> paracetamol, topical and oral NSAIDs, DMARDs and biologics for inflammatory arthritis.</li>
          <li><strong>Injections & surgery:</strong> corticosteroid or hyaluronic acid injections, and joint replacement when conservative care has been exhausted.</li>
          <li><strong>Mental health support:</strong> chronic pain affects mood — see our <Link to="/arthritis-mental-health" className="text-primary underline">mental health guide</Link>.</li>
        </ul>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related conditions and guides</h2>
        <ul className="space-y-2">
          <li><Link to="/conditions/osteoarthritis" className="text-primary underline">Osteoarthritis</Link></li>
          <li><Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">Rheumatoid arthritis</Link></li>
          <li><Link to="/conditions/psoriatic-arthritis" className="text-primary underline">Psoriatic arthritis</Link></li>
          <li><Link to="/conditions/gout" className="text-primary underline">Gout</Link></li>
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link></li>
          <li><Link to="/guides/musculoskeletal-health" className="text-primary underline">Musculoskeletal health</Link></li>
        </ul>
      </section>

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
