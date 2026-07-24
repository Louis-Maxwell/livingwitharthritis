import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import AnswerBox from '@/components/seo/AnswerBox';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";

const FAQS = [
  { q: 'What is the difference between osteoporosis and osteoarthritis?', a: 'Osteoporosis weakens bones, raising fracture risk. Osteoarthritis wears the cartilage in joints, causing pain and stiffness. Both can co-exist but have different causes and treatments.' },
  { q: 'Can I have both at the same time?', a: 'Yes — and many post-menopausal women do. Hormonal change, reduced activity from joint pain, and shared risk factors mean dual diagnosis is common.' },
  { q: 'How much calcium do I need?', a: 'UK adults need 700 mg/day, rising to 1,200 mg/day for post-menopausal women and adults with osteoporosis. Sources include dairy, fortified plant milks, sardines, leafy greens and beans.' },
  { q: 'Is weight-bearing exercise safe with arthritis?', a: 'Yes, when prescribed correctly. Walking, dancing, stair climbing and graded resistance training stimulate bone without damaging joints. Avoid high-impact loading on already-painful joints.' },
  { q: 'When should I get a bone density scan?', a: 'NICE recommends DEXA scans for post-menopausal women under 65 with risk factors (low BMI, family history, fragility fracture, long-term steroids), and all women over 65.' },
  { q: 'Do I need bone medication?', a: 'Bisphosphonates and other treatments are recommended when DEXA T-score is below -2.5, or with a prior fragility fracture. Your GP or specialist will assess fracture risk using FRAX.' },
  { q: 'What are the symptoms of osteoporosis?', a: 'Osteoporosis is often called a "silent" condition because it typically has no symptoms until a fracture occurs — most commonly in the wrist, hip or spine. Loss of height over time, a stooped posture, or back pain from a spinal compression fracture can be later warning signs.' },
  { q: 'What are the main risk factors for osteoporosis?', a: 'Being female and post-menopausal, family history of fracture, low body weight, smoking, high alcohol intake, long-term steroid use, and conditions that reduce mobility all raise risk. Early menopause and some inflammatory arthritis conditions also increase risk independently.' },
  { q: 'How does osteoporosis connect to falls and frailty?', a: 'Osteoporosis itself does not cause falls, but it turns a minor fall into a serious fracture. That is why bone density, muscle strength and falls prevention are usually managed together in older adults — see our falls prevention and frailty guides below.' },
  { q: 'Can osteoporosis be reversed?', a: 'Bone density loss can be slowed, partially rebuilt, and fracture risk substantially reduced with the right combination of nutrition, weight-bearing exercise and, where indicated, medication — but full reversal to youthful bone density is not generally realistic. Early action gives the best results.' },
];

export default function BoneDensityOsteoporosis() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: 'Bone Density & Osteoarthritis: Managing Both Conditions',
      description: 'Dual management for osteoarthritis and osteoporosis. Calcium, vitamin D, magnesium, exercise and screening — UK guide.',
      author: { '@type': 'Person', name: 'Maxwell', jobTitle: 'First Contact Practitioner', identifier: 'HCPC PH128483' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-21', dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/bone-density-osteoporosis',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Bone Density & Osteoporosis', path: '/guides/bone-density-osteoporosis' },
    ]);
    const c1 = injectJsonLd('bone-density-article', article);
    const c2 = injectJsonLd('bone-density-faq', faq);
    const c3 = injectJsonLd('bone-density-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Bone Density & Osteoarthritis"
        description="Bone density & osteoarthritis: Manage both conditions together. Symptoms, risk factors, calcium, vitamin D, exercise & screening guidance from HCPC."
        path="/guides/bone-density-osteoporosis"
        type="article"
        keywords="osteoporosis osteoarthritis, bone density arthritis, osteoporosis symptoms, osteoporosis risk factors, calcium vitamin d, dexa scan, weight bearing exercise"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <span>Bone Density &amp; Osteoporosis</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">Bone Density &amp; Osteoarthritis: Managing Both Conditions</h1>
            <AeoEnhancement route="/guides/bone-density-osteoporosis" />

      <AnswerBox question="Can you have osteoarthritis and osteoporosis at the same time?" reviewed="2026-06-21">
        Yes — they are different conditions but often coexist, especially in post-menopausal women. Osteoarthritis affects joint cartilage; osteoporosis weakens bones. Dual management focuses on calcium (700–1,200 mg/day), vitamin D, weight-bearing exercise, strength training and DEXA screening when appropriate.
      </AnswerBox>

      <MedicalReviewBadge reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />

      <section id="difference" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Osteoporosis vs osteoarthritis: what is the difference?</h2>
        <p className="leading-relaxed mb-4"><strong>Osteoarthritis</strong> is a joint disease: cartilage thins, bones rub, pain and stiffness follow. <strong>Osteoporosis</strong> is a bone disease: bones lose density and become fragile, raising fracture risk — often silently until a fall.</p>
      </section>

      <section id="symptoms-risk" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Symptoms and risk factors</h2>
        <p className="leading-relaxed mb-4">Osteoporosis is often called a "silent" condition because there are usually no symptoms until a fracture happens — most commonly in the wrist, hip or spine. Gradual loss of height, a stooped or curved upper back, and unexplained back pain from a spinal compression fracture can be later warning signs.</p>
        <p className="leading-relaxed">Key risk factors include being female and post-menopausal, a family history of hip fracture, low body weight, smoking, high alcohol intake, long-term oral steroid use, early menopause, and reduced mobility from another condition. Some inflammatory arthritis conditions also raise risk independently of steroid use.</p>
      </section>

      <section id="overlap" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Why arthritis and weak bones often occur together</h2>
        <p className="leading-relaxed mb-4">Pain reduces activity, and inactivity weakens bones. Steroid medications used in inflammatory arthritis directly reduce bone density. Post-menopausal oestrogen loss accelerates both conditions. Sarcopenia and low body weight magnify the risk.</p>
      </section>

      <section id="minerals" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Calcium, vitamin D, magnesium: the mineral strategy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Calcium:</strong> 700–1,200 mg/day from dairy, fortified milks, sardines, leafy greens.</li>
          <li><strong>Vitamin D:</strong> 10 µg/day October–March (NHS), or 25 µg/day if deficient.</li>
          <li><strong>Magnesium:</strong> 300 mg/day (men), 270 mg/day (women) from nuts, seeds, wholegrains.</li>
          <li><strong>Vitamin K2:</strong> emerging evidence; sources include fermented dairy, eggs.</li>
        </ul>
      </section>

      <section id="exercise" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Load-bearing exercise for bone and joint health</h2>
        <p className="leading-relaxed mb-4">Bones respond to load. Walking, dancing, tai chi, stair climbing and progressive resistance training all stimulate bone formation. Aim for 30 minutes of weight-bearing activity most days plus 2 strength sessions weekly. Avoid high-impact loading on inflamed or already-damaged joints.</p>
      </section>

      <section id="screening" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">6. Screening, testing and when medication is needed</h2>
        <p className="leading-relaxed mb-4">A DEXA scan measures bone mineral density. NICE recommends scanning post-menopausal women with risk factors, anyone on long-term steroids, and those with a fragility fracture. Treatment (bisphosphonates, denosumab, HRT) is considered when T-score is below -2.5 or after a fragility fracture.</p>
      </section>

      <section id="reversibility" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">7. Can bone density loss be reversed?</h2>
        <p className="leading-relaxed">Bone loss can be slowed, partially rebuilt and fracture risk substantially reduced through the right combination of nutrition, weight-bearing exercise and, where clinically indicated, medication. Full reversal to youthful bone density isn't generally realistic, which is why earlier action — ideally before or around menopause — gives the best long-term outcome.</p>
      </section>

      <section id="later-life" className="mb-12 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">8. Bone health, falls and frailty: the bigger picture</h2>
        <p className="leading-relaxed mb-4">Osteoporosis rarely causes a fall by itself — its real danger is turning a minor stumble into a serious fracture. That's why bone density is best managed alongside muscle strength and falls prevention, not in isolation.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Falls prevention for older adults</Link> — reducing fall risk at home</li>
          <li><Link to="/guides/sarcopenia-muscle-loss" className="text-primary underline">Sarcopenia &amp; muscle loss</Link> — building the strength that protects bones</li>
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management hub</Link> — the wider picture of ageing well</li>
          <li><Link to="/guides/musculoskeletal-health" className="text-primary underline">Musculoskeletal health</Link> — the full MSK picture</li>
          <li><Link to="/guides/preventative-msk-health" className="text-primary underline">Preventative MSK health</Link> — staying ahead of problems</li>
        </ul>
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/guides/sarcopenia-muscle-loss" className="text-primary underline">Sarcopenia &amp; muscle loss</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Fall prevention</Link></li>
          <li><Link to="/guides/frailty-management-hub" className="text-primary underline">Frailty management</Link></li>
          <li><Link to="/guides/disability-support" className="text-primary underline">Disability support</Link></li>
          <li><Link to="/supplements" className="text-primary underline">Supplements hub</Link></li>
          <li><Link to="/diet" className="text-primary underline">Diet hub</Link></li>
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
