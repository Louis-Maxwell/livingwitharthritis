import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";

const FAQS = [
  { q: 'Why do older adults with arthritis fall more often?', a: 'Arthritis reduces muscle strength, joint stability and balance reactions. Pain alters walking patterns, medications can cause dizziness, and reduced activity erodes confidence â€” together raising fall risk substantially.' },
  { q: 'What exercise helps prevent falls?', a: 'Programmes that combine progressive strength and balance work are commonly used for people at risk of falls. The best programme is one matched to your health, mobility and current balance.' },
  { q: 'Are walking aids a sign of giving up?', a: 'No. A correctly fitted stick or frame increases confidence, reduces falls and lets you stay active longer. They are tools â€” not failures.' },
  { q: 'What should I do immediately after a fall?', a: 'Check for pain or injury before trying to move. If you may be injured, feel unwell or cannot get up safely, use a phone or pendant alarm and keep warm while you wait for help. Call 999 for a serious injury or emergency.' },
  { q: 'Do certain medications increase fall risk?', a: 'Yes. Sedatives, sleeping tablets, blood pressure medications and some painkillers can cause dizziness. Ask your GP for a medication review if you have fallen.' },
  { q: 'Should I get a home safety check?', a: 'A home assessment can identify hazards and useful equipment. Availability and referral routes vary, so ask your GP, local council or UK healthcare service whether an occupational therapy or falls assessment is available locally.' },
];

export default function FallPreventionOlderAdults() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Fall Prevention for Older Adults with Arthritis',
      description: 'Evidence-based fall prevention for older adults with arthritis. Balance training, strength, home safety and immediate response after a fall.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-21', dateModified: '2026-08-22',
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/fall-prevention-older-adults',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Fall Prevention', path: '/guides/fall-prevention-older-adults' },
    ]);
    const c1 = injectJsonLd('fall-prevention-article', article);
    const c2 = injectJsonLd('fall-prevention-faq', faq);
    const c3 = injectJsonLd('fall-prevention-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Fall Prevention with Arthritis"
        description="Fall prevention for older adults: Balance training, home safety, strength exercises & medical assessment. Reduce injury risk significantly."
        path="/guides/fall-prevention-older-adults"
        type="article"
        keywords="fall prevention, falls older adults, balance training, otago exercise, arthritis falls, home safety older"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Fall Prevention</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Fall Prevention for Older Adults with Arthritis</h1>
            <AeoEnhancement route="/guides/fall-prevention-older-adults" />

      <AnswerBox question="How can older adults with arthritis prevent falls?">
        Fall prevention usually combines strength and balance exercise, a
        medication and vision review, suitable footwear, and changes to hazards
        at home. Ask a GP, physiotherapist or local falls service for an
        individual assessment if you have fallen, feel unsteady or are worried
        about falling.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="risk" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Understanding fall risk in arthritis</h2>
        <p className="leading-relaxed mb-4">One in three adults over 65 falls each year â€” more for those with arthritis. Risk factors cluster: muscle weakness, balance loss, slower reactions, joint pain altering gait, medications causing dizziness, vision changes and environmental hazards. Addressing several at once works best.</p>
      </section>

      <section id="home" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Home safety: the checklist</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Remove loose rugs or secure them with non-slip backing</li>
          <li>Install grab rails by the toilet, shower and front door</li>
          <li>Fit bright lighting on stairs and night-lights between bed and bathroom</li>
          <li>Wear supportive, well-fitting footwear indoors â€” not slippers without grip</li>
          <li>Keep frequently-used items within easy reach to avoid stretching or stooping</li>
          <li>Use a stairlift or banister on both sides for steep stairs</li>
        </ul>
      </section>

      <section id="balance" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Balance and proprioception training</h2>
        <p className="leading-relaxed mb-4">Balance is trainable at any age. Start with simple drills at a kitchen counter: stand on one leg 10 seconds (build to 30), heel-to-toe walking, weight shifts. Tai chi reduces falls by around 20% and is suitable for most older adults â€” see our <Link to="/exercises/tai-chi-for-balance" className="text-primary underline">tai chi for balance</Link> guide.</p>
      </section>

      <section id="strength" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Strength training to prevent falls</h2>
        <p className="leading-relaxed mb-4">Strong legs catch you when balance fails. Prioritise quadriceps (sit-to-stand, step-ups), glutes (bridges, sideways leg lifts), calves (heel raises) and core (gentle planks at a counter). Two sessions per week, building from 1 to 3 sets of 10â€“12.</p>
      </section>

      <section id="after" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. When a fall happens: immediate response and recovery</h2>
        <p className="leading-relaxed mb-4">Stay calm and check for pain or injury before moving. If you may be injured, feel unwell or cannot get up safely, use a phone or pendant alarm and keep warm while you wait for help. Call 999 for a serious injury or emergency. Tell your GP or another healthcare professional about a fall so they can consider strength, medication, vision and home hazards.</p>
      </section>

      <section id="sources" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Sources and further guidance</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://www.nhs.uk/conditions/falls/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              NHS: Falls
            </a>
          </li>
          <li>
            <a
              href="https://www.nice.org.uk/guidance/cg161"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              NICE CG161: Falls in older people
            </a>
          </li>
        </ul>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management hub</Link></li>
          <li><Link to="/guides/bone-density-osteoporosis" className="text-primary underline">Bone density &amp; osteoporosis</Link></li>
          <li><Link to="/exercises/tai-chi-for-balance" className="text-primary underline">Tai chi for balance</Link></li>
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link></li>
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
