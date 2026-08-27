import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";

const FAQS = [
  { q: 'What does musculoskeletal mean?', a: 'Musculoskeletal (MSK) refers to the bones, joints, muscles, tendons, ligaments and nerves that allow you to move. MSK conditions are the leading cause of disability worldwide.' },
  { q: 'What is the difference between acute and chronic MSK pain?', a: 'Acute pain lasts under 12 weeks and usually follows an injury or flare. Chronic pain persists beyond 12 weeks and often needs a graded rehabilitation programme rather than rest alone.' },
  { q: 'When should I see a physiotherapist?', a: 'Book an assessment if MSK pain limits work, sleep or daily activity for more than two weeks, or if you have weakness, numbness or pain that wakes you at night.' },
  { q: 'Can workplace ergonomics really prevent MSK problems?', a: 'Yes. Evidence shows correct desk setup, regular movement breaks and supported posture reduce neck, shoulder and lower-back pain in office workers.' },
  { q: 'Do I need a scan for back or joint pain?', a: 'Most MSK conditions do not require imaging â€” a clinical assessment is usually enough. Scans are reserved for red-flag symptoms, suspected fractures or when surgery is being considered.' },
  { q: 'What home strategies help most?', a: 'Movement, graded strength training, sleep, stress management, postural variety and targeted supports such as insoles or lumbar cushions are the highest-value home interventions.' },
  { q: 'What are the common symptoms of an MSK condition?', a: 'Pain, stiffness, swelling, reduced range of movement, weakness and a catching or grinding sensation in a joint are the most common signs. Symptoms that worsen with rest rather than movement, or that wake you at night, warrant a clinical assessment.' },
  { q: 'Can I refer myself to physiotherapy on the UK healthcare system?', a: 'Many UK healthcare areas in the UK now offer MSK self-referral, meaning you can book a physiotherapy assessment directly without seeing your GP first. Availability varies by local Integrated Care Board, so check your GP practice website or NHS.uk for the self-referral option in your area.' },
  { q: 'What does a good MSK diet look like?', a: 'There is no single "MSK diet", but a Mediterranean-style pattern â€” vegetables, oily fish, whole grains, olive oil and legumes â€” combined with maintaining a healthy weight reduces load on weight-bearing joints and supports general tissue health. See our diet hub for specifics.' },
  { q: 'How does musculoskeletal health change with age?', a: 'Muscle mass and bone density naturally decline with age, and joint tissue becomes less resilient. This is why MSK health overlaps closely with frailty, sarcopenia and falls prevention in later life â€” see our dedicated guides on each below.' },
  { q: 'Is there a self-assessment score for MSK problems?', a: 'Clinicians often use validated tools such as the STarT Back Screening Tool for lower back pain, or region-specific outcome measures, to gauge severity and guide treatment. Our free self-assessment tool can help you organise your symptoms before a clinical appointment.' },
  { q: 'What mobility aids or equipment might help?', a: 'Depending on the condition, options range from simple insoles and lumbar cushions to walking aids, splints or orthotics. An occupational therapist or physiotherapist can recommend equipment matched to your specific needs â€” self-selecting equipment without assessment can sometimes do more harm than good.' },
];

export default function MusculoskeletalHealth() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: 'Musculoskeletal Health: Back, Neck and Repetitive Strain',
      description: 'UK guide to musculoskeletal health â€” acute vs chronic conditions, physiotherapy, workplace ergonomics and home strategies. Reviewed by HCPC physio.',
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
        title="Musculoskeletal Health Guide"
        description="Musculoskeletal health guide: symptoms, causes, diagnosis, back and neck pain, repetitive strain, workplace ergonomics, UK healthcare pathways and rehabilitation."
        path="/guides/musculoskeletal-health"
        type="article"
        keywords="musculoskeletal, msk health, msk symptoms, back pain, neck pain, repetitive strain, workplace ergonomics, physiotherapy, msk self referral, msk diet, msk in elderly"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Musculoskeletal Health</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Musculoskeletal Health: Back, Neck and Repetitive Strain</h1>
            <AeoEnhancement route="/guides/musculoskeletal-health" />

      <AnswerBox question="What is musculoskeletal health and why does it matter?" reviewed="2026-06-22">
        Musculoskeletal (MSK) health covers the bones, joints, muscles, tendons and ligaments that allow you to move. MSK conditions â€” back pain, neck pain, repetitive strain and joint disorders â€” are the single biggest cause of years lived with disability in the UK. Most MSK problems split into acute (under 12 weeks, often injury-related) and chronic (longer-term, needing graded rehabilitation). Physiotherapy, workplace ergonomics, targeted exercise and supportive home tools are the highest-value interventions. Early assessment, graded movement and posture variety prevent most acute problems from becoming chronic.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="what-is" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. What MSK dysfunction is and why it matters</h2>
        <p className="leading-relaxed mb-4">Musculoskeletal disorders include back and neck pain, repetitive strain injuries (RSI), tendinopathies, joint conditions and post-injury rehabilitation. They affect around 1 in 5 UK adults at any one time and account for over 30 million working days lost each year.</p>
        <p className="leading-relaxed">MSK health overlaps heavily with arthritis â€” many of the same exercise, weight and posture principles apply across both fields.</p>
      </section>

      <section id="symptoms-causes" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Common symptoms and causes</h2>
        <p className="leading-relaxed mb-4">MSK symptoms vary by site but commonly include:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Pain</strong> â€” aching, sharp, or a dull background ache that changes with movement or time of day</li>
          <li><strong>Stiffness</strong> â€” particularly first thing in the morning or after sitting still</li>
          <li><strong>Swelling or warmth</strong> around a joint, which can suggest inflammation</li>
          <li><strong>Reduced range of movement</strong> â€” difficulty reaching, bending or turning fully</li>
          <li><strong>Weakness</strong> in the surrounding muscles, often from disuse during a painful episode</li>
          <li><strong>Clicking, catching or grinding</strong> sensations within a joint</li>
        </ul>
        <p className="leading-relaxed mb-4">Causes range from a one-off injury or overuse (repetitive strain from typing, lifting or sport), through mechanical wear (osteoarthritis), to inflammatory disease (rheumatoid or psoriatic arthritis), poor load management, deconditioning, or simply the accumulated effect of prolonged static posture at a desk.</p>
        <p className="leading-relaxed">Certain symptoms need same-day medical attention rather than self-management: sudden severe swelling, redness and heat over a joint, fever alongside joint pain, numbness or weakness spreading down a limb, or loss of bladder/bowel control alongside back pain. If any of these apply to you, contact 999 or 112 or your GP promptly rather than waiting.</p>
      </section>

      <section id="acute-chronic" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Acute vs. chronic MSK conditions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Acute (under 12 weeks):</strong> short-term, often follows a strain, sprain or flare. Relative rest, gradual return to movement and pain modulation are the priority.</li>
          <li><strong>Chronic (over 12 weeks):</strong> needs a structured rehabilitation plan â€” graded strength, mobility, pacing, sleep and stress strategies.</li>
        </ul>
      </section>

      <section id="diagnosis" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Diagnosis and assessment</h2>
        <p className="leading-relaxed mb-4">Most MSK conditions are diagnosed through a clinical history and physical examination rather than imaging. A physiotherapist or GP will typically ask about the pattern of pain, what aggravates or eases it, any red-flag symptoms, and your work or activity demands, before testing movement, strength and specific joint signs.</p>
        <p className="leading-relaxed mb-4">Validated screening tools â€” such as the STarT Back Screening Tool for lower back pain â€” help clinicians judge whether simple advice, physiotherapy, or a more specialist pathway is the right next step. Our free <Link to="/self-assessment" className="text-primary underline">self-assessment tool</Link> can help you organise your symptoms and history ahead of an appointment, though it is educational and does not replace a clinical diagnosis.</p>
        <p className="leading-relaxed">Imaging (X-ray, ultrasound or MRI) is reserved for suspected fractures, red-flag symptoms, or when the result would change treatment â€” for example before considering injections or surgery.</p>
      </section>

      <section id="care" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Physiotherapy, chiropractic care and sports massage</h2>
        <p className="leading-relaxed mb-4">Physiotherapy is the first-line, evidence-backed treatment for most MSK conditions. Chiropractic and osteopathic care may help in selected cases. Sports and remedial massage support recovery from soft-tissue injuries and tightness, but should sit alongside â€” not replace â€” active rehabilitation.</p>
        <p className="leading-relaxed">A good clinician will combine hands-on treatment with a progressive home exercise programme. Many UK healthcare areas now offer MSK physiotherapy self-referral â€” meaning you can book directly without a GP appointment first. Check your GP practice website or search "physiotherapy self-referral" plus your area on NHS.uk to see what's available locally.</p>
      </section>

      <section id="exercise-diet" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">6. Exercise and diet for MSK health</h2>
        <p className="leading-relaxed mb-4">Movement â€” not rest â€” is the foundation of most MSK recovery plans. Graded strength training around the affected area, combined with general aerobic activity (walking, swimming or cycling), reduces pain and rebuilds capacity over time. Our <Link to="/exercises" className="text-primary underline">exercise hub</Link> has condition-specific routines to start from.</p>
        <p className="leading-relaxed">There's no single "MSK diet", but maintaining a healthy weight measurably reduces load on weight-bearing joints (hips, knees, lower back), and a Mediterranean-style eating pattern â€” vegetables, oily fish, whole grains, olive oil and legumes â€” is generally associated with lower systemic inflammation. See our <Link to="/diet" className="text-primary underline">diet &amp; nutrition hub</Link> for practical guidance.</p>
      </section>

      <section id="ergonomics" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">7. Workplace ergonomics and occupational assessment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Monitor at eye level, screen an arm&apos;s length away</li>
          <li>Elbows at ~90Â°, wrists neutral, feet flat or supported</li>
          <li>Chair providing lumbar support and seat depth that allows two fingers behind the knees</li>
          <li>Move position every 30â€“45 minutes â€” sit, stand, walk</li>
          <li>Document camera, headset and split keyboard for those with neck or wrist symptoms</li>
        </ul>
      </section>

      <section id="home" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">8. Home solutions: insoles, taping and posture support</h2>
        <p className="leading-relaxed">Off-the-shelf insoles, kinesiology tape, posture-reminder devices and lumbar cushions can help symptom control while you rehabilitate. They work best as part of a wider strength and movement programme â€” never as a standalone fix. For anything beyond simple, general supports, an occupational therapist or physiotherapist can match equipment to your specific needs â€” self-selecting specialist equipment without assessment can sometimes do more harm than good.</p>
      </section>

      <section id="msk-later-life" className="mb-12 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">9. MSK health in later life: frailty, sarcopenia and falls</h2>
        <p className="leading-relaxed mb-4">Muscle mass and bone density naturally decline with age, and joint tissue becomes less resilient to load â€” which is why musculoskeletal health overlaps so closely with frailty, sarcopenia (age-related muscle loss) and falls risk in later life. Strength and balance work that supports MSK recovery earlier in life is the same foundation that protects independence later on.</p>
        <p className="leading-relaxed mb-4">If MSK symptoms are appearing alongside general slowing down, reduced grip strength, or a fall or near-fall, it's worth looking at these related guides:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management hub</Link> â€” recognising and managing frailty</li>
          <li><Link to="/guides/sarcopenia-muscle-loss" className="text-primary underline">Sarcopenia &amp; muscle loss</Link> â€” age-related muscle decline and how to counter it</li>
          <li><Link to="/guides/bone-density-osteoporosis" className="text-primary underline">Bone density &amp; osteoporosis</Link> â€” protecting skeletal strength</li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Falls prevention for older adults</Link> â€” reducing fall risk at home</li>
          <li><Link to="/guides/preventative-msk-health" className="text-primary underline">Preventative MSK health</Link> â€” staying ahead of problems before they start</li>
        </ul>
      </section>

      <section id="patients-look-for" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">MSK solutions patients commonly look for</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Private physiotherapy</strong> for faster assessment and treatment</li>
          <li><strong>Diagnostic imaging</strong> â€” ultrasound, MRI â€” when red flags or persistent symptoms warrant it</li>
          <li><strong>Workplace ergonomic evaluations</strong> for office, hybrid and manual roles</li>
          <li><strong>Custom insoles and orthotics</strong> for foot, ankle or knee mechanics</li>
          <li><strong>Ergonomic office furniture</strong> â€” adjustable chairs, sit-stand desks, monitor arms</li>
          <li><strong>Sports and remedial massage</strong> alongside active rehabilitation</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">Educational information only â€” we don&apos;t endorse specific brands or products. Speak to a clinician before purchasing equipment or starting a new programme.</p>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/exercises" className="text-primary underline">Exercise hub</Link></li>
          <li><Link to="/diet" className="text-primary underline">Diet &amp; nutrition hub</Link></li>
          <li><Link to="/self-assessment" className="text-primary underline">Self-assessment tool</Link></li>
          <li><Link to="/guides/preventative-msk-health" className="text-primary underline">Preventative MSK health</Link></li>
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management</Link></li>
          <li><Link to="/guides/sarcopenia-muscle-loss" className="text-primary underline">Sarcopenia &amp; muscle loss</Link></li>
          <li><Link to="/guides/bone-density-osteoporosis" className="text-primary underline">Bone density &amp; osteoporosis</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Falls prevention</Link></li>
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
