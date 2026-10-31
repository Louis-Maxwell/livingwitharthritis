import UrgentHelpAndSources from "@/components/seo/UrgentHelpAndSources";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import LastReviewed, { LAST_REVIEWED_ISO } from '@/components/LastReviewed';
import EducationalDisclaimerBox from '@/components/seo/EducationalDisclaimerBox';
import TopicClusterNav from '@/components/seo/TopicClusterNav';
import { LOUIS_MAXWELL_REF } from '@/lib/louisMaxwell';

const FAQS = [
  { q: 'What is arthritis?', a: 'Arthritis is an umbrella term for over 100 conditions that cause joint pain, stiffness and swelling. The most common forms in the UK are osteoarthritis (wear-related) and rheumatoid arthritis (inflammatory).' },
  { q: 'What are the early warning signs of arthritis?', a: 'Persistent joint pain, morning stiffness lasting more than 30 minutes, swelling around a joint, reduced range of motion and warmth or redness over a joint. Symptoms lasting more than two weeks warrant a GP review.' },
  { q: 'How is arthritis diagnosed?', a: 'A clinician reviews your symptoms, examines affected joints, and may request blood tests (CRP, ESR, rheumatoid factor, anti-CCP) and imaging (X-ray, ultrasound or MRI) to confirm the type of arthritis.' },
  { q: 'Can arthritis be cured?', a: 'Most forms of arthritis cannot be cured, but symptoms can often be managed with exercise, weight management, medicines, and in some cases joint replacement surgery.' },
  { q: 'What treatments help most?', a: 'For osteoarthritis, NICE says the core treatments are therapeutic exercise and, if needed, weight management, with medicines such as topical NSAIDs alongside. Inflammatory arthritis usually needs DMARDs or biologics from a rheumatology team.' },
  { q: 'When should I see a specialist?', a: 'Ask your GP for a rheumatology referral if you have suspected inflammatory arthritis, persistent unexplained joint swelling, or symptoms that are not responding to first-line care.' },
  // Added 2026-07-28; covered by Louis Maxwell's clinical review of all site content (recorded 23 and 26 Oct 2026, HCPC PH128483).
  { q: 'Can arthritis come and go?', a: 'For some types, yes. Inflammatory arthritis (like rheumatoid or psoriatic arthritis) commonly flares and eases in cycles — periods of active symptoms followed by remission. Gout is defined by sudden attacks with symptom-free periods between them. Osteoarthritis behaves differently: it’s typically a gradual, progressive condition, though day-to-day pain can still vary with activity, weather, or overuse. If symptoms are genuinely disappearing and returning, that pattern itself is a useful thing to describe to a GP or rheumatologist, since it helps narrow down which type of arthritis is involved.' },
];

const TYPES = [
  { to: '/conditions/osteoarthritis', label: 'Osteoarthritis', desc: 'The most common type. Affects cartilage and the whole joint, often knees, hips and hands.' },
  { to: '/conditions/rheumatoid-arthritis', label: 'Rheumatoid arthritis', desc: 'An autoimmune condition where the immune system attacks the joint lining.' },
  { to: '/conditions/psoriatic-arthritis', label: 'Psoriatic arthritis', desc: 'Inflammatory arthritis linked to the skin condition psoriasis.' },
  { to: '/conditions/gout', label: 'Gout', desc: 'Sudden, very painful attacks caused by urate crystals in a joint.' },
  { to: '/conditions/ankylosing-spondylitis', label: 'Ankylosing spondylitis', desc: 'Inflammatory arthritis mainly affecting the spine.' },
  { to: '/conditions/axial-spondyloarthritis', label: 'Axial spondyloarthritis', desc: 'The wider group of inflammatory back conditions.' },
  { to: '/conditions/reactive-arthritis', label: 'Reactive arthritis', desc: 'Joint inflammation that can follow an infection.' },
  { to: '/conditions/juvenile-arthritis', label: 'Juvenile arthritis', desc: 'Arthritis in children and young people.' },
  { to: '/conditions/lupus', label: 'Lupus', desc: 'An autoimmune condition that can affect joints, skin and organs.' },
  { to: '/conditions/polymyalgia-rheumatica', label: 'Polymyalgia rheumatica', desc: 'Pain and stiffness in the shoulders and hips, usually in older adults.' },
  { to: '/conditions/fibromyalgia', label: 'Fibromyalgia', desc: 'Widespread pain that often occurs alongside arthritis.' },
  { to: '/conditions/calcific-tendinitis', label: 'Calcific tendinitis', desc: 'Calcium deposits in a tendon, often in the shoulder.' },
];

const JOINTS = [
  { to: '/conditions/knee-arthritis', label: 'Knee arthritis' },
  { to: '/conditions/hip-arthritis', label: 'Hip arthritis' },
  { to: '/conditions/hand-arthritis', label: 'Hand arthritis' },
  { to: '/conditions/shoulder-arthritis', label: 'Shoulder arthritis' },
  { to: '/conditions/elbow-arthritis', label: 'Elbow arthritis' },
  { to: '/conditions/foot-and-ankle-arthritis', label: 'Foot and ankle arthritis' },
];

export default function Arthritis() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: 'Arthritis: Understanding Joint Pain and Treatment Options',
      description: 'Comprehensive UK guide to arthritis — symptoms, diagnosis, treatment options, and what patients commonly look for at each stage of their journey.',
      author: LOUIS_MAXWELL_REF,
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis' },
      datePublished: '2026-06-22', dateModified: new Date().toISOString().slice(0, 10),
      reviewedBy: LOUIS_MAXWELL_REF,
      lastReviewed: '2026-09-16',
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
        title="Arthritis: Types & UK Treatments | Living With Arthritis" includeSiteName={false}
        description="Arthritis overview: 100+ types, symptoms, diagnosis & treatment options. UK evidence-based guide to living well with arthritis."
        path="/conditions/arthritis"
        type="article"
        keywords="arthritis, arthritis symptoms, arthritis treatment, arthritis uk, joint pain"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Arthritis</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Arthritis: Understanding Joint Pain and Treatment Options</h1>
      <LastReviewed date={LAST_REVIEWED_ISO} className="mb-6 -mt-4" />

      <AnswerBox question="What is arthritis and how is it treated?" reviewed="2026-06-22">
        Arthritis describes over 100 conditions that affect the joints — causing pain, stiffness, swelling and reduced movement. Osteoarthritis (wear-related) and rheumatoid arthritis (inflammatory) are the most common forms in the UK. Effective management combines targeted exercise, weight optimisation, an anti-inflammatory diet, medical treatment for pain and inflammation, and — when needed — specialist rheumatology care, injections or joint replacement surgery. For inflammatory types, early diagnosis and treatment matter, so see a GP if you have persistent joint swelling.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Louis Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What is arthritis?</h2>
        <p className="mb-4 leading-relaxed">Arthritis is not a single disease — it is a broad term covering more than 100 joint conditions. The two most common are <Link to="/conditions/osteoarthritis" className="text-primary underline">osteoarthritis</Link>, where joint cartilage gradually wears down, and <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">rheumatoid arthritis</Link>, an autoimmune condition where the immune system attacks the joint lining.</p>
        <p className="leading-relaxed">Arthritis is common in the UK and can affect people of any age, including children with <Link to="/conditions/juvenile-arthritis" className="text-primary underline">juvenile arthritis</Link>. Different types behave differently, so knowing which type you have helps you and your clinician choose the right care.</p>
      </section>

      <section id="symptoms" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What are the symptoms of arthritis?</h2>
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
        <h2 className="text-2xl font-bold mb-4">How is arthritis diagnosed?</h2>
        <p className="leading-relaxed">A GP or first-contact practitioner will take a detailed history, examine your joints and check for swelling or restricted movement. Blood tests (CRP, ESR, rheumatoid factor, anti-CCP, uric acid) and imaging (X-ray, ultrasound, MRI) help identify the type and severity of arthritis and rule out other causes.</p>
      </section>

      <section id="patients-look-for" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What do arthritis patients commonly look for?</h2>
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
        <h2 className="text-2xl font-bold mb-4">What are the evidence-based treatment options for arthritis?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Exercise:</strong> progressive strength, mobility and aerobic training reduce pain and improve function — see our <Link to="/guides/exercise" className="text-primary underline">exercise guide</Link>.</li>
          <li><strong>Weight management:</strong> if you are overweight, NICE says any weight loss is likely to help people with osteoarthritis, and losing 10% of body weight is likely to be better than 5%.</li>
          <li><strong>Anti-inflammatory diet:</strong> Mediterranean-style eating — see our <Link to="/guides/diet" className="text-primary underline">diet guide</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid</Link>.</li>
          <li><strong>Medication:</strong> for knee osteoarthritis NICE recommends a topical NSAID first, with oral NSAIDs considered if needed. Inflammatory arthritis is usually treated with DMARDs and sometimes biologics, prescribed by a rheumatology team. See our <Link to="/guides/arthritis-pain-relief" className="text-primary underline">pain relief guide</Link>.</li>
          <li><strong>Injections and surgery:</strong> corticosteroid injections can give short-term relief for some people. NICE advises against hyaluronic acid injections for osteoarthritis. Joint replacement may be discussed when symptoms seriously affect your life despite other treatment.</li>
          <li><strong>Mental health support:</strong> chronic pain affects mood — see our <Link to="/arthritis-mental-health" className="text-primary underline">mental health guide</Link>.</li>
        </ul>
      </section>

      <section id="types" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Types of arthritis: find your condition guide</h2>
        <p className="mb-4 leading-relaxed">Pick the type you have been diagnosed with, or the one your clinician is checking for. Each guide covers symptoms, tests, treatment and self-management.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {TYPES.map((t) => (
            <Link key={t.to} to={t.to} className="block rounded-lg border border-border p-4 hover:bg-muted">
              <span className="font-semibold text-primary">{t.label}</span>
              <span className="block text-sm text-muted-foreground mt-1">{t.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="by-joint" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Arthritis by joint</h2>
        <p className="mb-4 leading-relaxed">If you know where it hurts but not yet which type of arthritis it is, start with the joint:</p>
        <ul className="grid sm:grid-cols-2 gap-2 list-disc pl-6">
          {JOINTS.map((j) => (
            <li key={j.to}><Link to={j.to} className="text-primary underline">{j.label}</Link></li>
          ))}
        </ul>
      </section>

      <section id="urgent" className="mb-12 border-l-4 border-destructive bg-destructive/5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">When to get help urgently</h2>
        <p className="mb-3 leading-relaxed">Contact your GP practice the same day, or call NHS 111, if a single joint suddenly becomes hot, red, swollen and very painful, especially if you also feel feverish or unwell. This can be a sign of a joint infection, which needs urgent treatment.</p>
        <p className="leading-relaxed">Call 999 if you have a serious injury, cannot move a limb, or have chest pain or difficulty breathing.</p>
      </section>

      <section id="living-well" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Living well with arthritis: next steps</h2>
        <p className="mb-4 leading-relaxed">Once you know the type, these guides help with day-to-day life:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link>: work, home, relationships and self-management.</li>
          <li><Link to="/guides/arthritis-pain-relief" className="text-primary underline">Arthritis pain relief</Link>: practical steps for painful days.</li>
          <li><Link to="/guides/understanding-pain" className="text-primary underline">Understanding pain</Link>: why arthritis hurts and how pain works.</li>
          <li><Link to="/arthritis-flare-ups" className="text-primary underline">Managing flare-ups</Link>.</li>
          <li><Link to="/guides/exercise" className="text-primary underline">Exercise</Link> and <Link to="/guides/diet" className="text-primary underline">diet</Link> guides.</li>
          <li><Link to="/supplements" className="text-primary underline">Supplements</Link>: what the evidence and NICE say.</li>
          <li><Link to="/guides/newly-diagnosed" className="text-primary underline">Newly diagnosed</Link>: your first weeks.</li>
          <li><Link to="/guides/benefits-pip" className="text-primary underline">PIP and benefits</Link>: money help if arthritis affects daily life.</li>
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

      <UrgentHelpAndSources path="/conditions/arthritis" />
      <EducationalDisclaimerBox lastReviewed="2026-09-16" />
      <TopicClusterNav path="/conditions/arthritis" />
    </article>
  );
}
