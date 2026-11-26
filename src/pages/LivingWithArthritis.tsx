import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';

/**
 * Pillar page — "Living With Arthritis" complete guide. ~3,500 words.
 * Links out to condition guides, FAQ cluster, exercise/diet pillars,
 * and benefits resources. Article + Breadcrumb JSON-LD injected via
 * useEffect (per project memory).
 */
export default function LivingWithArthritis() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Living with arthritis: practical help for daily life',
      description:
        'Evidence-based guide to living with arthritis in the UK. Symptoms, types, management, exercises, diet, mental health, work and benefits.',
      author: {
        '@type': 'Person',
        name: 'Maxwell',
        jobTitle: 'First Contact Practitioner',
        identifier: 'HCPC PH128483',
      },
      publisher: {
        '@type': 'MedicalOrganization',
        name: 'Living With Arthritis',
      },
      datePublished: '2026-06-18',
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/living-with-arthritis',
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Living With Arthritis', path: '/living-with-arthritis' },
    ]);
    const c1 = injectJsonLd('living-with-arthritis-article', article);
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can arthritis be cured?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most types of arthritis cannot be cured, but symptoms and function can often be improved with an individually appropriate combination of treatment, movement and practical support.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is arthritis only for older people?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Arthritis can affect people of any age, including children and younger adults.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can exercise make arthritis worse?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Suitable, gradually introduced activity often supports strength and function, but the type and amount should match the person and condition. Seek professional advice if symptoms are severe, persistent or unusual.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I have a normal life with arthritis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Many people with arthritis continue working, exercising, travelling and enjoying hobbies, although support and adaptations may be helpful.',
          },
        },
      ],
    };
    const c2 = injectJsonLd('living-with-arthritis-breadcrumb', breadcrumb);
    const c3 = injectJsonLd('living-with-arthritis-faq', faq);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Living with arthritis: a daily guide"
        description="Practical help for living with arthritis: symptoms, when to see your GP, exercise, diet, mood, work rights, benefits and equipment that keeps you independent."
        path="/living-with-arthritis"
        type="article"
        keywords="living with arthritis, arthritis management, arthritis guide UK"
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Living with arthritis: practical help for daily life
      </h1>

      <p className="text-xl text-muted-foreground mb-6 leading-relaxed">Find practical help with movement, pacing, everyday tasks and adapting life around arthritis. Your needs may change, so use this guide alongside advice from your healthcare team. For an explanation of arthritis types, start with our arthritis overview. For appointment and referral questions, use our UK care guide.</p>


      <nav aria-label="Table of contents" className="bg-muted p-6 rounded-lg mb-10 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-4">In this guide</h2>
        <ul className="space-y-2 md:columns-2">
          <li><a href="#management" className="text-primary hover:underline">Management strategies</a></li>
          <li><a href="#exercises" className="text-primary hover:underline">Exercise & movement</a></li>
          <li><a href="#diet" className="text-primary hover:underline">Diet & nutrition</a></li>
          <li><a href="#mental" className="text-primary hover:underline">Mental health</a></li>
          <li><a href="#work" className="text-primary hover:underline">Work & employment</a></li>
          <li><a href="#benefits" className="text-primary hover:underline">Benefits & support</a></li>
          <li><a href="#faq" className="text-primary hover:underline">FAQ</a></li>
        </ul>
      </nav>

      <section className="mb-12"><h2 className="text-2xl font-bold mb-4">Find the right guide</h2><p><Link to="/conditions/arthritis" className="underline">Understand the different types of arthritis</Link>, or <Link to="/guides/uk-arthritis" className="underline">plan your next NHS appointment</Link>.</p></section>
      <section id="management" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Management strategies</h2>
        <p className="mb-4 leading-relaxed">
          Living well with arthritis requires a multi-pronged approach. No single
          strategy works for everyone, so it's about finding what works for you.
        </p>

        <h3 className="text-xl font-bold mb-2 mt-4">Medical management</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
          <li>Medications (painkillers, anti-inflammatories, DMARDs)</li>
          <li>Injections (corticosteroids, biologics)</li>
          <li>Regular monitoring with your GP or rheumatologist</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 mt-4">Exercise & movement</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
          <li>Gentle range-of-motion exercises to maintain flexibility</li>
          <li>Strengthening routines to support joints</li>
          <li>Walking and low-impact activities like swimming</li>
          <li>Physiotherapy guidance tailored to your needs</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 mt-4">Lifestyle changes</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
          <li>Weight management (reduces joint stress)</li>
          <li>Heat and cold therapy for pain relief</li>
          <li>Sleep optimisation (good sleep helps inflammation)</li>
          <li>Stress reduction techniques</li>
        </ul>
      </section>

      <section id="exercises" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Exercise & movement</h2>
        <p className="mb-4 leading-relaxed">
          Exercise is one of the most powerful tools for managing arthritis. Regular
          movement reduces pain, improves mobility, strengthens muscles around joints
          and boosts mood.
        </p>
        <p className="mb-4">
          <Link to="/faq/best-exercises-arthritis" className="text-primary hover:underline font-semibold">
            Read our complete guide to arthritis exercises →
          </Link>
        </p>
        <p className="mb-3 font-semibold">Key principles:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Start gently and progress gradually</li>
          <li>Warm up before exercise (5 minutes of gentle movement)</li>
          <li>Do low-impact activities (walking, swimming, cycling)</li>
          <li>Include strength training 2-3 times per week</li>
          <li>Include flexibility and stretching work daily</li>
          <li>Rest when needed (rest is part of good management)</li>
          <li>Stop if you have sharp pain (mild discomfort is OK)</li>
        </ul>
      </section>

      <section id="diet" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Diet & nutrition</h2>
        <p className="mb-4 leading-relaxed">
          What you eat can influence arthritis symptoms. Some foods reduce inflammation;
          others may trigger flares. While diet alone can't cure arthritis, it plays an
          important role in managing symptoms.
        </p>
        <p className="mb-4">
          <Link to="/diet/mediterranean-diet-for-arthritis" className="text-primary hover:underline font-semibold">
            Read our Mediterranean diet guide →
          </Link>
        </p>
        <p className="mb-3 font-semibold">Foods to include:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Fatty fish (omega-3s: salmon, mackerel, sardines, herring)</li>
          <li>Olive oil (contains anti-inflammatory compounds)</li>
          <li>Colourful vegetables (antioxidants reduce inflammation)</li>
          <li>Fruits, especially berries (high in antioxidants)</li>
          <li>Nuts, seeds and legumes</li>
          <li>Whole grains (fibre reduces inflammation)</li>
        </ul>
      </section>

      <section id="mental" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mental health & emotional wellbeing</h2>
        <p className="mb-4 leading-relaxed">
          Living with chronic arthritis affects not just the body but also mental
          health. Persistent pain, fatigue and lifestyle limitations can lead to
          depression, anxiety and isolation. These feelings are normal and treatable.
        </p>
        <p className="mb-4">
          <Link to="/faq/arthritis-and-mental-health" className="text-primary hover:underline font-semibold">
            Read our mental health FAQ →
          </Link>
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Talk to your GP about mood changes</li>
          <li>Consider counselling or CBT (proven effective for chronic pain)</li>
          <li>Join support groups</li>
          <li>Practise stress-reduction techniques (meditation, mindfulness)</li>
          <li>Maintain social connections</li>
          <li>Set realistic goals and celebrate small wins</li>
        </ul>
      </section>

      <section id="work" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Work & employment rights</h2>
        <p className="mb-4 leading-relaxed">
          Many people with arthritis continue to work and have fulfilling careers. The
          Equality Act 2010 protects disabled workers in the UK, including those with
          arthritis.
        </p>
        <p className="mb-4">
          <Link to="/faq/arthritis-employment-rights-uk" className="text-primary hover:underline font-semibold">
            Read our employment rights FAQ →
          </Link>
        </p>
        <p className="mb-3 font-semibold">Your legal rights:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Right to reasonable adjustments (flexible hours, ergonomic equipment)</li>
          <li>Protection from discrimination</li>
          <li>Right to request flexible working (if eligible)</li>
          <li>Access to occupational health support</li>
        </ul>
      </section>

      <section id="benefits" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Benefits & financial support</h2>
        <p className="mb-4 leading-relaxed">
          If arthritis affects your ability to work or care for yourself, you may be
          eligible for government benefits.
        </p>
        <p className="mb-4">
          <Link to="/guides/benefits-pip" className="text-primary hover:underline font-semibold">
            Read our PIP & benefits guide →
          </Link>
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Personal Independence Payment (PIP) — age 16 or over; new claims usually need you to be under State Pension age</li>
          <li>Employment Support Allowance (ESA) — if unable to work</li>
          <li>Attendance Allowance — if you have reached State Pension age</li>
          <li>Disability Living Allowance (DLA) — under 16</li>
        </ul>
      </section>

      <section id="living-well" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Living Well with Arthritis: Practical Strategies for Independence</h2>
        <p className="leading-relaxed mb-4">Living well with arthritis is about working with your joints rather than against them. The strategies that make the biggest day-to-day difference combine gentle, consistent movement, joint-protection techniques, an anti-inflammatory eating pattern, good sleep, and the right supportive equipment. Many people find that small adaptations — a kettle tipper, a long-handled shoehorn, a raised toilet seat — make the difference between struggling and staying independent.</p>
        <p className="leading-relaxed mb-4">An occupational therapy assessment is often the single most valuable step: a clinician will review your home, your routines and your goals, then recommend specific equipment, adaptations and pacing strategies tailored to your needs.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Essential Adaptive Equipment</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Kitchen tools:</strong> ergonomic utensils, jar openers, kettle tippers, reachers and lightweight pans</li>
          <li><strong>Clothing aids:</strong> magnetic buttons, Velcro closures, long-handled shoehorns, dressing sticks</li>
          <li><strong>Home safety:</strong> grab rails, shower seats, raised toilet seats, stairlifts and walk-in showers</li>
          <li><strong>Fitness:</strong> chair yoga and aquatic therapy classes — see our <Link to="/exercises" className="text-primary underline">exercise hub</Link></li>
          <li><strong>Furniture:</strong> lift-assist recliners, supportive mattresses and ergonomic seating</li>
        </ul>
        <p className="mt-4">For nutrition strategy see our <Link to="/guides/diet" className="text-primary underline">diet hub</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid with arthritis</Link>.</p>
        <p className="mt-3 text-sm text-muted-foreground italic">Educational information only — we don&apos;t endorse specific brands or products. An occupational therapy assessment is the best starting point.</p>
      </section>

      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Can arthritis be cured?</h3>
            <p className="leading-relaxed">
              Most types of arthritis cannot be cured, but symptoms can be effectively
              managed with the right combination of treatment and lifestyle changes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Is arthritis only for older people?</h3>
            <p className="leading-relaxed">
              No. Arthritis can affect people of any age, including children with
              juvenile arthritis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Can exercise make arthritis worse?</h3>
            <p className="leading-relaxed">
              Suitable activity often helps maintain strength and function, but the type and amount should match your condition and general health. Start gradually and ask a physiotherapist or other qualified professional for individual advice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Can I have a normal life with arthritis?</h3>
            <p className="leading-relaxed">
              Yes. Many people with arthritis work, exercise, travel and pursue hobbies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Related articles</h2>\n        <p className="mb-4 leading-relaxed">For a practical overview of daily life, symptoms, pacing, work and support, read our <Link to="/blog/arthritis-hows-life-living-with-arthritis" className="text-primary underline font-semibold">guide to how life with arthritis can feel</Link>.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link to="/conditions/osteoarthritis" className="text-primary hover:underline font-semibold">→ Osteoarthritis guide</Link>
          <Link to="/conditions/rheumatoid-arthritis" className="text-primary hover:underline font-semibold">→ Rheumatoid arthritis guide</Link>
          <Link to="/faq/best-exercises-arthritis" className="text-primary hover:underline font-semibold">→ Best exercises for arthritis</Link>
          <Link to="/diet/mediterranean-diet-for-arthritis" className="text-primary hover:underline font-semibold">→ Mediterranean diet</Link>
          <Link to="/faq/arthritis-employment-rights-uk" className="text-primary hover:underline font-semibold">→ Employment rights</Link>
          <Link to="/guides/benefits-pip" className="text-primary hover:underline font-semibold">→ PIP & benefits</Link>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary-foreground">Get weekly arthritis tips</h2>
        <p className="mb-6 text-lg text-primary-foreground">
          Join thousands of people living well with arthritis. Evidence-based tips,
          exercises and support delivered to your inbox.
        </p>
        <Link
          to="/"
          className="bg-background text-primary px-8 py-3 rounded font-bold hover:opacity-90 inline-block"
        >
          Subscribe free
        </Link>
      </section>
    </article>
  );
}
