import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";

const FAQS = [
  { q: 'What is sarcopenia?', a: 'Sarcopenia is age-related loss of muscle mass, strength and function. It typically begins after age 40 and accelerates after 60, raising the risk of falls, frailty and disability.' },
  { q: 'Why does arthritis speed up muscle loss?', a: 'Joint pain reduces activity, and chronic inflammation increases muscle protein breakdown. Adults with arthritis can lose muscle two to three times faster than healthy peers.' },
  { q: 'How much protein do I need?', a: 'Older adults benefit from 1.0–1.2 g of protein per kg body weight daily — higher than the standard 0.8 g/kg — split into 25–30 g servings across meals.' },
  { q: 'Is strength training safe with arthritis?', a: 'Yes. Strength training reduces joint pain and improves function when prescribed correctly. Start with low loads, focus on form, and progress slowly under guidance.' },
  { q: 'Do supplements help sarcopenia?', a: 'Vitamin D, creatine and leucine-rich protein (whey, dairy) have the strongest evidence. Always pair supplements with resistance training — neither works alone.' },
  { q: 'How do I know if I have sarcopenia?', a: 'Simple markers: slow walking, weak grip, struggling to rise from a chair without using hands, or losing weight unintentionally. Your GP can refer for a formal assessment.' },
];

export default function SarcopeniaMuscleControl() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Sarcopenia & Arthritis: How to Prevent Muscle Loss',
      description: 'Evidence-based guide to sarcopenia for adults with arthritis. Protein, strength training, supplements and home tests.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-21', dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/sarcopenia-muscle-loss',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const howto = {
      '@context': 'https://schema.org', '@type': 'HowTo',
      name: 'How to perform a quadriceps strengthener for sarcopenia',
      totalTime: 'PT5M',
      step: [
        { '@type': 'HowToStep', name: 'Set up', text: 'Sit tall in a sturdy chair, feet flat on the floor.' },
        { '@type': 'HowToStep', name: 'Lift', text: 'Slowly straighten one knee, lifting the foot until the leg is parallel to the floor.' },
        { '@type': 'HowToStep', name: 'Hold', text: 'Hold for 3 seconds, squeezing the thigh muscle.' },
        { '@type': 'HowToStep', name: 'Lower', text: 'Lower over 3 seconds. Repeat 10–15 times each leg, 2 sets daily.' },
      ],
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Sarcopenia & Muscle Loss', path: '/guides/sarcopenia-muscle-loss' },
    ]);
    const c1 = injectJsonLd('sarcopenia-article', article);
    const c2 = injectJsonLd('sarcopenia-faq', faq);
    const c3 = injectJsonLd('sarcopenia-howto', howto);
    const c4 = injectJsonLd('sarcopenia-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); c4(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Sarcopenia & Arthritis Guide"
        description="Sarcopenia guide: Prevent muscle loss with protein, strength training & nutrition. Combat muscle wasting caused by arthritis & ageing."
        path="/guides/sarcopenia-muscle-loss"
        type="article"
        keywords="sarcopenia, muscle loss, arthritis muscle weakness, protein older adults, strength training over 60"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Sarcopenia &amp; Muscle Loss</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Sarcopenia &amp; Arthritis: How to Prevent Muscle Loss</h1>
            <AeoEnhancement route="/guides/sarcopenia-muscle-control" />

      <AnswerBox question="What is sarcopenia and how is it linked to arthritis?" reviewed="2026-06-21">
        Sarcopenia is age-related loss of muscle mass and strength. Arthritis accelerates it because joint pain reduces activity and chronic inflammation breaks down muscle. Prevention combines 1.0–1.2 g/kg/day protein, twice-weekly resistance training, vitamin D, and treating pain so movement stays possible.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="what" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What is sarcopenia and why arthritis speeds it up</h2>
        <p className="leading-relaxed mb-4">Muscle mass declines about 1% per year from age 40, and strength declines faster — around 3% per year after 60. Arthritis multiplies this loss: pain limits movement, inflammatory cytokines (IL-6, TNF-α) drive muscle breakdown, and steroid medications worsen it further.</p>
        <p className="leading-relaxed">The result is a vicious cycle: weak muscles destabilise joints, joints hurt more, activity drops, muscles weaken further.</p>
      </section>

      <section id="measure" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. How to measure muscle loss at home</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Sit-to-stand:</strong> stand 5 times from a chair without using hands. Over 15 seconds suggests weakness.</li>
          <li><strong>Grip:</strong> struggling to open jars or carry shopping is an early sign.</li>
          <li><strong>Gait:</strong> walking 4 metres in over 5 seconds is a red flag.</li>
          <li><strong>Calf circumference:</strong> below 31 cm correlates with low muscle mass.</li>
        </ul>
      </section>

      <section id="protein" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Protein: how much and which sources work best</h2>
        <p className="leading-relaxed mb-4">Aim for 1.0–1.2 g/kg body weight daily. A 70 kg adult needs 70–84 g. Split across 3 meals — 25–30 g each — to maximise muscle protein synthesis. Leucine-rich sources (whey, eggs, dairy, fish, chicken, soya) are most effective.</p>
        <p className="leading-relaxed">Plant-based? Combine legumes, tofu, tempeh, quinoa and a leucine-rich protein powder. See our <Link to="/diet" className="text-primary underline">diet hub</Link>.</p>
      </section>

      <section id="strength" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Strength training for sarcopenia (adapted for arthritis)</h2>
        <p className="leading-relaxed mb-4">Two sessions per week targeting all major muscle groups: legs (sit-to-stand, step-ups), hips (bridges, clamshells), back (band rows), chest (wall push-ups) and core. Use 8–12 reps at a load you can just complete.</p>
        <p className="leading-relaxed">More in our <Link to="/exercises" className="text-primary underline">exercise hub</Link> and <Link to="/blog/knee-osteoarthritis-exercises" className="text-primary underline">knee OA exercises</Link>.</p>
      </section>

      <section id="supplements" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Medications and supplements that support muscle</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Vitamin D:</strong> 10–25 µg/day, especially October–March (NHS guidance).</li>
          <li><strong>Creatine monohydrate:</strong> 3–5 g/day, combined with resistance work, modestly improves strength in older adults.</li>
          <li><strong>Whey protein:</strong> 20–30 g post-exercise to top up leucine.</li>
          <li><strong>Omega-3:</strong> 2–3 g/day EPA+DHA may reduce muscle protein breakdown.</li>
        </ul>
        <p className="mt-4 leading-relaxed">See <Link to="/supplements" className="text-primary underline">supplements hub</Link>. Always check with a GP if on medication.</p>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management hub</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Fall prevention</Link></li>
          <li><Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">Foods to avoid</Link></li>
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
