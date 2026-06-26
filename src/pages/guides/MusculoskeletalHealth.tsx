import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';

const FAQS = [
  { q: 'What does musculoskeletal mean?', a: 'Musculoskeletal (MSK) refers to the bones, joints, muscles, tendons, ligaments and nerves that allow you to move. MSK conditions are the leading cause of disability worldwide.' },
  { q: 'What is the difference between acute and chronic MSK pain?', a: 'Acute pain lasts under 12 weeks and usually follows an injury or flare. Chronic pain persists beyond 12 weeks and often needs a graded rehabilitation programme rather than rest alone.' },
  { q: 'When should I see a physiotherapist?', a: 'Book an assessment if MSK pain limits work, sleep or daily activity for more than two weeks, or if you have weakness, numbness or pain that wakes you at night.' },
  { q: 'Can workplace ergonomics really prevent MSK problems?', a: 'Yes. Evidence shows correct desk setup, regular movement breaks and supported posture reduce neck, shoulder and lower-back pain in office workers.' },
  { q: 'Do I need a scan for back or joint pain?', a: 'Most MSK conditions do not require imaging — a clinical assessment is usually enough. Scans are reserved for red-flag symptoms, suspected fractures or when surgery is being considered.' },
  { q: 'What home strategies help most?', a: 'Movement, graded strength training, sleep, stress management, postural variety and targeted supports such as insoles or lumbar cushions are the highest-value home interventions.' },
];

export default function MusculoskeletalHealth() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: 'Musculoskeletal Health: Back, Neck and Repetitive Strain',
      description: 'UK guide to musculoskeletal health — acute vs chronic conditions, physiotherapy, workplace ergonomics and home strategies. Reviewed by HCPC physio.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-22', dateModified: new Date().toISOString().slice(0, 10),
      reviewedBy: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      lastReviewed: '2026-06-22',
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/musculoskeletal-health',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides/musculoskeletal-health' },
      { name: 'Musculoskeletal Health', path: '/guides/musculoskeletal-health' },
    ]);
    const c1 = injectJsonLd('msk-article', article);
    const c2 = injectJsonLd('msk-faq', faq);
    const c3 = injectJsonLd('msk-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Musculoskeletal Health: Back, Neck & Repetitive Strain | UK Guide"
        description="Musculoskeletal health guide: Back pain, neck pain, repetitive strain & prevention. Workplace ergonomics & rehabilitation strategies."
        path="/guides/musculoskeletal-health"
        type="article"
        keywords="musculoskeletal, msk health, back pain, neck pain, repetitive strain, workplace ergonomics, physiotherapy"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Musculoskeletal Health</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Musculoskeletal Health: Back, Neck and Repetitive Strain</h1>

      <AnswerBox question="What is musculoskeletal health and why does it matter?" reviewed="2026-06-22">
        Musculoskeletal (MSK) health covers the bones, joints, muscles, tendons and ligaments that allow you to move. MSK conditions — back pain, neck pain, repetitive strain and joint disorders — are the single biggest cause of years lived with disability in the UK. Most MSK problems split into acute (under 12 weeks, often injury-related) and chronic (longer-term, needing graded rehabilitation). Physiotherapy, workplace ergonomics, targeted exercise and supportive home tools are the highest-value interventions. Early assessment, graded movement and posture variety prevent most acute problems from becoming chronic.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What MSK dysfunction is and why it matters</h2>
        <p className="leading-relaxed mb-4">Musculoskeletal disorders include back and neck pain, repetitive strain injuries (RSI), tendinopathies, joint conditions and post-injury rehabilitation. They affect around 1 in 5 UK adults at any one time and account for over 30 million working days lost each year.</p>
        <p className="leading-relaxed">MSK health overlaps heavily with arthritis — many of the same exercise, weight and posture principles apply across both fields.</p>
      </section>

      <section id="acute-chronic" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Acute vs. chronic MSK conditions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Acute (under 12 weeks):</strong> short-term, often follows a strain, sprain or flare. Relative rest, gradual return to movement and pain modulation are the priority.</li>
          <li><strong>Chronic (over 12 weeks):</strong> needs a structured rehabilitation plan — graded strength, mobility, pacing, sleep and stress strategies.</li>
        </ul>
      </section>

      <section id="care" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Physiotherapy, chiropractic care and sports massage</h2>
        <p className="leading-relaxed mb-4">Physiotherapy is the first-line, evidence-backed treatment for most MSK conditions. Chiropractic and osteopathic care may help in selected cases. Sports and remedial massage support recovery from soft-tissue injuries and tightness, but should sit alongside — not replace — active rehabilitation.</p>
        <p className="leading-relaxed">A good clinician will combine hands-on treatment with a progressive home exercise programme.</p>
      </section>

      <section id="ergonomics" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Workplace ergonomics and occupational assessment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Monitor at eye level, screen an arm&apos;s length away</li>
          <li>Elbows at ~90°, wrists neutral, feet flat or supported</li>
          <li>Chair providing lumbar support and seat depth that allows two fingers behind the knees</li>
          <li>Move position every 30–45 minutes — sit, stand, walk</li>
          <li>Document camera, headset and split keyboard for those with neck or wrist symptoms</li>
        </ul>
      </section>

      <section id="home" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Home solutions: insoles, taping and posture support</h2>
        <p className="leading-relaxed">Off-the-shelf insoles, kinesiology tape, posture-reminder devices and lumbar cushions can help symptom control while you rehabilitate. They work best as part of a wider strength and movement programme — never as a standalone fix.</p>
      </section>

      <section id="patients-look-for" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">MSK solutions patients commonly look for</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Private physiotherapy</strong> for faster assessment and treatment</li>
          <li><strong>Diagnostic imaging</strong> — ultrasound, MRI — when red flags or persistent symptoms warrant it</li>
          <li><strong>Workplace ergonomic evaluations</strong> for office, hybrid and manual roles</li>
          <li><strong>Custom insoles and orthotics</strong> for foot, ankle or knee mechanics</li>
          <li><strong>Ergonomic office furniture</strong> — adjustable chairs, sit-stand desks, monitor arms</li>
          <li><strong>Sports and remedial massage</strong> alongside active rehabilitation</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">Educational information only — we don&apos;t endorse specific brands or products. Speak to a clinician before purchasing equipment or starting a new programme.</p>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/exercises" className="text-primary underline">Exercise hub</Link></li>
          <li><Link to="/guides/preventative-msk-health" className="text-primary underline">Preventative MSK health</Link></li>
          <li><Link to="/conditions/arthritis" className="text-primary underline">Arthritis overview</Link></li>
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link></li>
          <li><Link to="/guides/disability-support" className="text-primary underline">Disability support</Link></li>
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
