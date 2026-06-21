import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';

const FAQS = [
  { q: 'What is frailty?', a: 'Frailty is a clinical state of reduced reserve and resilience across multiple body systems, leaving older adults more vulnerable to falls, hospital admission and slower recovery.' },
  { q: 'Does arthritis cause frailty?', a: 'Arthritis does not directly cause frailty, but pain, inflammation and inactivity accelerate muscle loss and reduce function — pushing people into pre-frail or frail states earlier.' },
  { q: 'Can frailty be reversed?', a: 'Yes. Mild and moderate frailty often improves with progressive resistance training, adequate protein (1.0–1.2 g/kg/day), social engagement and treatment of underlying conditions.' },
  { q: 'How is frailty measured?', a: 'Clinicians use tools such as the Clinical Frailty Scale, gait speed (<0.8 m/s), grip strength and the Fried phenotype (weakness, slowness, exhaustion, low activity, weight loss).' },
  { q: 'What exercise is safest for frail older adults?', a: 'Supervised seated strength work, sit-to-stand repetitions, resistance bands and balance drills — progressed gradually. Avoid high-impact loading until strength returns.' },
  { q: 'When should I ask for help?', a: 'Speak to your GP if you notice unintentional weight loss, more than one fall in 12 months, exhaustion, or struggling with daily tasks like dressing or shopping.' },
];

export default function FrailtyManagementHub() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Frailty & Arthritis: A Complete Management Hub',
      description: 'Evidence-based guide to preventing and reversing frailty in adults with arthritis. Strength, nutrition, mood, cognition and social pillars.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-21', dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/frailty-management-hub',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides/frailty-management-hub' },
      { name: 'Frailty Management', path: '/guides/frailty-management-hub' },
    ]);
    const c1 = injectJsonLd('frailty-hub-article', article);
    const c2 = injectJsonLd('frailty-hub-faq', faq);
    const c3 = injectJsonLd('frailty-hub-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Frailty & Arthritis: Complete Management Hub | UK Guide"
        description="Evidence-based hub on frailty and arthritis. Reversible strategies covering strength, nutrition, cognition, mood and social connection — reviewed by HCPC physio."
        path="/guides/frailty-management-hub"
        type="article"
        keywords="frailty arthritis, frailty prevention, reverse frailty, sarcopenia, older adults arthritis"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Frailty Management</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Frailty &amp; Arthritis: A Complete Management Hub</h1>

      <AnswerBox question="What is frailty and can it be reversed?" reviewed="2026-06-21">
        Frailty is a state of reduced physical reserve common in older adults with arthritis. The good news: mild and moderate frailty can be reversed with progressive strength training, adequate protein, social engagement, mood support and treatment of underlying conditions. Early intervention is most effective.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What is frailty and how does it connect to arthritis?</h2>
        <p className="mb-4 leading-relaxed">Frailty is a clinical syndrome of reduced reserve across multiple body systems — muscle, bone, balance, cognition and immunity. Adults with arthritis are at higher risk because chronic pain reduces activity, accelerating muscle loss (sarcopenia) and balance decline.</p>
        <p className="leading-relaxed">Around 10% of people aged 65+ in the UK are living with frailty, rising to 25–50% over 85. The Clinical Frailty Scale, gait speed and grip strength help clinicians identify who is pre-frail or frail.</p>
      </section>

      <section id="pillars" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. The five pillars of frailty prevention</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Strength:</strong> progressive resistance training 2–3 times per week.</li>
          <li><strong>Nutrition:</strong> 1.0–1.2 g/kg protein/day plus vitamin D, calcium and adequate calories.</li>
          <li><strong>Cognition:</strong> regular mental stimulation, reading, puzzles, learning.</li>
          <li><strong>Mood:</strong> identify and treat depression and anxiety early.</li>
          <li><strong>Social connection:</strong> isolation doubles frailty risk — community, family and groups protect.</li>
        </ul>
      </section>

      <section id="exercise" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Exercise for frailty: safe progressions</h2>
        <p className="mb-4 leading-relaxed">Start seated. Sit-to-stand from a chair (aim for 10–15 reps), heel raises, knee extensions with ankle weights, and resistance band rows build the legs and trunk safely. Add balance work — single-leg standing at a counter — once strength returns.</p>
        <p className="leading-relaxed">See our <Link to="/exercises" className="text-primary underline">exercise hub</Link> for progressions.</p>
      </section>

      <section id="nutrition" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Nutrition strategies for muscle preservation</h2>
        <p className="mb-4 leading-relaxed">Spread protein across meals: 25–30 g per meal triggers muscle protein synthesis better than one large serving. Sources include eggs, Greek yoghurt, fish, lean meat, beans and tofu. Pair with vitamin D (10 µg/day October–March, NHS guidance) and adequate calories.</p>
        <p className="leading-relaxed">Read our <Link to="/diet" className="text-primary underline">diet hub</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid with arthritis</Link>.</p>
      </section>

      <section id="help" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. When to ask for help: red flags and support services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unintentional weight loss greater than 5% in 12 months</li>
          <li>More than one fall in 12 months</li>
          <li>New or worsening exhaustion most days</li>
          <li>Struggling with dressing, washing or shopping</li>
          <li>Slower walking pace (under 0.8 m/s)</li>
        </ul>
        <p className="mt-4 leading-relaxed">Speak to your GP, who can refer to community physiotherapy, falls clinics and social prescribing.</p>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/guides/sarcopenia-muscle-loss" className="text-primary underline">Sarcopenia &amp; muscle loss</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Fall prevention for older adults</Link></li>
          <li><Link to="/guides/bone-density-osteoporosis" className="text-primary underline">Bone density &amp; osteoporosis</Link></li>
          <li><Link to="/conditions/osteoarthritis" className="text-primary underline">Osteoarthritis guide</Link></li>
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
