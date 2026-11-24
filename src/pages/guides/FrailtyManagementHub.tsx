import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import RecommendedNextStep from "@/components/RecommendedNextStep";

const FAQS = [
  { q: 'What is frailty?', a: 'Frailty is a clinical state of reduced reserve and resilience across multiple body systems, leaving older adults more vulnerable to falls, hospital admission and slower recovery.' },
  { q: 'Does arthritis cause frailty?', a: 'Arthritis does not directly cause frailty, but pain, inflammation and inactivity accelerate muscle loss and reduce function — pushing people into pre-frail or frail states earlier.' },
  { q: 'Can frailty be reversed?', a: 'Frailty needs an individual assessment and care plan. Exercise, nutrition support and treatment review may help maintain function, but improvement varies and reversal cannot be promised.' },
  { q: 'How is frailty measured?', a: 'Clinicians use tools such as the Clinical Frailty Scale, gait speed (<0.8 m/s), grip strength and the Fried phenotype (weakness, slowness, exhaustion, low activity, weight loss).' },
  { q: 'What exercise is safest for frail older adults?', a: 'Supervised seated strength work, sit-to-stand repetitions, resistance bands and balance drills — progressed gradually. Avoid high-impact loading until strength returns.' },
  { q: 'When should I ask for help?', a: 'Speak to your GP if you notice unintentional weight loss, more than one fall in 12 months, exhaustion, or struggling with daily tasks like dressing or shopping.' },
];

export default function FrailtyManagementHub() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Frailty & Arthritis: A Complete Management Hub',
      description: 'Evidence-based guide to assessing frailty and supporting function in adults with arthritis. Strength, nutrition, mood, cognition and social pillars.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis' },
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
        title="Frailty & Arthritis Guide"
        description="Frailty & arthritis guide: Individual assessment, activity, nutrition and falls support."
        path="/guides/frailty-management-hub"
        type="article"
        keywords="frailty arthritis, frailty prevention, frailty support, sarcopenia, older adults arthritis"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Frailty Management</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Frailty &amp; Arthritis: A Complete Management Hub</h1>
      <p className="my-6 text-sm">Editorial safety update: 24 November 2026. This updated information is awaiting a separate clinical review.</p>

      <AnswerBox question="What is frailty and can it be reversed?" >
        Frailty means reduced reserve and resilience. If everyday activities are becoming harder, ask your GP for an assessment. Care should reflect your needs, priorities, medicines and other conditions. Support may include tailored activity, nutrition advice and treatment review. Improvement varies; reversal cannot be promised.
      </AnswerBox>

      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What is frailty and how does it connect to arthritis?</h2>
        <p className="mb-4 leading-relaxed">Frailty is a clinical syndrome of reduced reserve across multiple body systems — muscle, bone, balance, cognition and immunity. Adults with arthritis are at higher risk because chronic pain reduces activity, accelerating muscle loss (sarcopenia) and balance decline.</p>
        <p className="leading-relaxed">A clinician can assess frailty alongside your other health conditions, medicines, daily activities and priorities.</p>
      </section>

      <section id="pillars" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. The five pillars of frailty prevention</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Strength:</strong> progressive resistance training 2–3 times per week.</li>
          <li><strong>Nutrition:</strong> individual nutrition assessment if appetite is poor or weight loss is unintentional.</li>
          <li><strong>Cognition:</strong> regular mental stimulation, reading, puzzles, learning.</li>
          <li><strong>Mood:</strong> identify and treat depression and anxiety early.</li>
          <li><strong>Social connection:</strong> ask about loneliness and support that matters to the person.</li>
        </ul>
      </section>

      <section id="exercise" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Exercise for frailty: safe progressions</h2>
        <p className="mb-4 leading-relaxed">Ask a physiotherapist about activity suited to your strength, balance and health conditions. Seated or supported exercises may be appropriate. Do not attempt unsupported balance exercises if you are at risk of falling.</p>
        <p className="leading-relaxed">See our <Link to="/exercises" className="text-primary underline">exercise hub</Link> for progressions.</p>
      </section>

      <RecommendedNextStep path="/guides/frailty-management-hub" placement="mid" />
      <section id="nutrition" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Nutrition strategies for muscle preservation</h2>
        <p className="mb-4 leading-relaxed">If you have poor appetite, difficulty eating or unintentional weight loss, ask your GP about nutrition assessment and dietitian support. Any supplements or protein targets should reflect your needs and health conditions.</p>
        <p className="leading-relaxed">Read our <Link to="/guides/diet" className="text-primary underline">diet hub</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid with arthritis</Link>.</p>
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

      <section id="family-focus" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">6. What families are looking for</h2>
        <p className="mb-4 leading-relaxed">Many adult children begin researching frailty after a parent has a fall, loses weight or struggles with day-to-day tasks. Support should be tailored to the person and may involve activity, nutrition, home safety and practical help.</p>
        <p className="leading-relaxed mb-4">Your GP can advise on assessment and suitable local support. The plan should reflect the person's needs and preferences.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Common frailty solutions</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nutrition support if assessment identifies a need</li>
          <li>Supplements only when suitable for an identified need</li>
          <li>Medical alert systems, personal alarms and fall detectors</li>
          <li>Home modifications — grab rails, ramps, improved lighting, removing trip hazards</li>
          <li>Geriatric assessments (Comprehensive Geriatric Assessment) and frailty case management</li>
          <li>Balance, resistance and tai chi programmes — group or one-to-one</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">Educational information only — we don&apos;t endorse specific brands or providers. Speak to your GP, community physiotherapy or social services for personalised recommendations.</p>
      </section>

      <p className="my-8">Source: <a className="underline" href="https://www.nice.org.uk/guidance/ng56/chapter/recommendations">NICE NG56 recommendations on multimorbidity and frailty assessment</a>.</p>
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
