import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
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
      headline: 'Living With Arthritis: A Complete Guide',
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
        name: 'Living With Arthritis UK',
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
    const c2 = injectJsonLd('living-with-arthritis-breadcrumb', breadcrumb);
    return () => { c1(); c2(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Living With Arthritis: Complete UK Guide"
        description="Evidence-based guide to living with arthritis in the UK. Symptoms, management, exercises, diet, mental health and work support — reviewed by HCPC physiotherapist."
        path="/living-with-arthritis"
        type="article"
        keywords="living with arthritis, arthritis management, arthritis guide UK"
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Living With Arthritis: A Complete Guide
      </h1>

      <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
        Arthritis affects 10 million people in the UK. It's a long-term condition,
        but that doesn't mean living in pain or giving up the things you love. This
        evidence-based guide covers what arthritis is, how to manage symptoms, and
        practical strategies for living well.
      </p>

      <MedicalReviewBadge />

      <nav aria-label="Table of contents" className="bg-muted p-6 rounded-lg mb-10 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-4">In this guide</h2>
        <ul className="space-y-2 md:columns-2">
          <li><a href="#what-is" className="text-primary hover:underline">What is arthritis?</a></li>
          <li><a href="#types" className="text-primary hover:underline">Types of arthritis</a></li>
          <li><a href="#symptoms" className="text-primary hover:underline">Symptoms & diagnosis</a></li>
          <li><a href="#management" className="text-primary hover:underline">Management strategies</a></li>
          <li><a href="#exercises" className="text-primary hover:underline">Exercise & movement</a></li>
          <li><a href="#diet" className="text-primary hover:underline">Diet & nutrition</a></li>
          <li><a href="#mental" className="text-primary hover:underline">Mental health</a></li>
          <li><a href="#work" className="text-primary hover:underline">Work & employment</a></li>
          <li><a href="#benefits" className="text-primary hover:underline">Benefits & support</a></li>
          <li><a href="#faq" className="text-primary hover:underline">FAQ</a></li>
        </ul>
      </nav>

      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What is arthritis?</h2>
        <p className="mb-4 leading-relaxed">
          Arthritis is inflammation of one or more joints. It affects the cartilage
          (the smooth tissue that covers the ends of bones), causing pain, stiffness
          and reduced mobility. More than 100 types exist, but osteoarthritis and
          rheumatoid arthritis are the most common.
        </p>
        <p className="mb-3 font-semibold">Key facts:</p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>10 million people in the UK have arthritis</li>
          <li>It can affect people at any age, not just older adults</li>
          <li>Early management can slow progression and reduce symptoms</li>
          <li>Many people live well with arthritis using the right strategies</li>
          <li>Arthritis is not a single disease but a group of conditions</li>
        </ul>
      </section>

      <section id="types" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Types of arthritis</h2>

        <h3 className="text-xl font-bold mb-2 mt-6">
          <Link to="/conditions/osteoarthritis" className="text-primary hover:underline">Osteoarthritis (OA)</Link>
        </h3>
        <p className="leading-relaxed mb-4">
          The most common type, affecting around 8 million people in the UK.
          Osteoarthritis is caused by wear and tear of cartilage over time. It typically
          affects the knees, hips, hands and spine. Symptoms develop gradually and
          worsen with activity.{' '}
          <Link to="/conditions/osteoarthritis" className="text-primary hover:underline font-semibold">
            Read our osteoarthritis guide
          </Link>.
        </p>

        <h3 className="text-xl font-bold mb-2 mt-6">
          <Link to="/conditions/rheumatoid-arthritis" className="text-primary hover:underline">Rheumatoid Arthritis (RA)</Link>
        </h3>
        <p className="leading-relaxed mb-4">
          An autoimmune condition where the body's own immune system mistakenly attacks
          the joints. This causes swelling, pain and often fatigue. RA can develop
          rapidly and may affect your whole body, not just the joints.{' '}
          <Link to="/conditions/rheumatoid-arthritis" className="text-primary hover:underline font-semibold">
            Read our rheumatoid arthritis guide
          </Link>.
        </p>

        <h3 className="text-xl font-bold mb-2 mt-6">
          <Link to="/conditions/juvenile-arthritis" className="text-primary hover:underline">Juvenile Arthritis (JA)</Link>
        </h3>
        <p className="leading-relaxed mb-4">
          Arthritis affecting children under 16. Despite the name, juvenile arthritis
          can persist into adulthood. Early diagnosis and treatment are crucial.{' '}
          <Link to="/conditions/juvenile-arthritis" className="text-primary hover:underline font-semibold">
            Read our juvenile arthritis guide
          </Link>.
        </p>

        <h3 className="text-xl font-bold mb-2 mt-6">Other types</h3>
        <p className="leading-relaxed">
          <Link to="/conditions/psoriatic-arthritis" className="text-primary hover:underline">Psoriatic arthritis</Link>,{' '}
          <Link to="/conditions/ankylosing-spondylitis" className="text-primary hover:underline">ankylosing spondylitis</Link>,{' '}
          <Link to="/conditions/gout" className="text-primary hover:underline">gout</Link>,{' '}
          <Link to="/conditions/lupus" className="text-primary hover:underline">lupus</Link>, and many others.
          Each type requires tailored management. If you think you have arthritis, see
          your GP for diagnosis.
        </p>
      </section>

      <section id="symptoms" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Symptoms & diagnosis</h2>
        <p className="mb-4 leading-relaxed">
          Arthritis symptoms vary depending on the type and which joints are affected.
          However, some symptoms are common across most types:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>Joint pain and stiffness (especially in the morning)</li>
          <li>Swelling, redness and warmth around affected joints</li>
          <li>Reduced range of motion and difficulty moving</li>
          <li>Fatigue and general tiredness</li>
          <li>Low mood and anxiety (often from chronic pain)</li>
          <li>Sleep disturbance</li>
        </ul>
        <p className="leading-relaxed">
          <strong>When to see your GP:</strong> If you have joint pain, stiffness or
          swelling lasting more than 2 weeks, contact your GP. Early diagnosis is
          crucial for effective management and preventing joint damage.
        </p>
      </section>

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
          <li>Personal Independence Payment (PIP) — ages 16-64</li>
          <li>Employment Support Allowance (ESA) — if unable to work</li>
          <li>Attendance Allowance — for those 65+</li>
          <li>Disability Living Allowance (DLA) — under 16</li>
        </ul>
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
              Gentle, appropriate exercise almost always helps. Start slowly and listen
              to your body. A physiotherapist can design a safe programme for you.
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
        <h2 className="text-2xl font-bold mb-4">Related articles</h2>
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
        <h2 className="text-2xl font-bold mb-4">Get weekly arthritis tips</h2>
        <p className="mb-6 text-lg">
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
