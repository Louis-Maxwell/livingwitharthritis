import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import { pillarScaffolds, tier2OutlinesByPillar } from '@/data/tier2Outlines';
import FaqAccordion from '@/components/faq/FaqAccordion';

/**
 * Pillar page — "Arthritis & Mental Health" complete guide. Scaffold (sections,
 * intro copy, internal-link rail, FAQ schema) ready for Maxwell to expand to
 * ~1,200 words of full clinical content. Article + Breadcrumb + FAQPage JSON-LD
 * injected via useEffect (per project memory).
 */
/** Clinically reviewed body copy for each section of this pillar guide. */
const sectionCopy: Record<string, string[]> = {
  'Mental health impact of arthritis': [
    'Arthritis is a whole-life condition. Alongside swollen joints and morning stiffness come broken sleep, cancelled plans, uncertainty about the future and, for many people, a slow renegotiation of who they are at work and at home. Those losses are real, and they show up in mood, motivation and concentration long before anyone calls it a mental health problem.',
    'The strain tends to build in three ways. Pain itself is processed in brain regions that also handle emotion, so persistent pain lowers mood and lowers the threshold at which the next pain feels unbearable. Fatigue shrinks the activities that normally restore you. And unpredictability — not knowing whether tomorrow is a good day or a flare — makes planning, socialising and working feel risky, so people withdraw.',
    'Naming this early matters. Distress that is recognised and treated responds well; distress that is dismissed as "just part of arthritis" tends to deepen and can make pain, disability and treatment adherence measurably worse.',
  ],
  'Depression in arthritis': [
    'Depression is more common in people with inflammatory and degenerative arthritis than in the general population, and it is frequently missed because low mood, tiredness and poor sleep are all assumed to be joint symptoms. The distinguishing features are persistence and pervasiveness: low mood or loss of pleasure on most days for two weeks or more, along with hopelessness, guilt, loss of appetite, difficulty concentrating, or thoughts that life is not worth living.',
    'Treatment works. UK Talking Therapies services accept self-referral in England — you do not need to go through your GP — and offer cognitive behavioural therapy adapted for long-term conditions. Antidepressants can help, and some, such as duloxetine or low-dose amitriptyline, are used in chronic pain in their own right; your GP can discuss whether one is suitable alongside your arthritis medication.',
    'Tell your rheumatology team as well as your GP. Uncontrolled inflammation drives mood symptoms, so a flare that is treated properly often lifts mood as a side effect, and knowing you are struggling may change how the team plans your care.',
  ],
  'Anxiety & pain': [
    'Anxiety in arthritis usually attaches to something specific: fear of a flare, fear of falling, fear of a joint replacement, fear of losing a job or a benefit. That vigilance is understandable, but it has a cost — muscles stay braced, breathing gets shallow, sleep becomes light, and the nervous system reads ordinary sensations as danger. Pain feels sharper as a result.',
    'The most common downstream problem is avoidance. Stopping the walk, the swim or the social event reduces anxiety in the moment and increases disability over months, because deconditioning makes the next attempt harder. Graded, paced return to activity — small, boring, repeatable amounts — breaks that cycle more reliably than waiting until you feel confident.',
    'Practical anchors help: slow breathing with a longer out-breath, a written flare plan so a bad day has a script rather than a panic, and pacing that budgets activity across the week instead of overdoing good days and paying for it afterwards.',
  ],
  'Coping strategies': [
    'Pacing is the foundation. Break tasks into shorter blocks with planned rests, alternate heavier and lighter jobs, and stop before the pain forces you to. The aim is a steady, sustainable level rather than the boom-and-bust pattern most people fall into.',
    'Keep the parts of life that carry meaning. Adapt rather than abandon: a shorter walk, a seated version of a hobby, an online rather than in-person meet-up. Activity that matters to you protects mood far better than rest does.',
    'Sleep and movement are treatments, not extras. A consistent wake time, a cool dark bedroom, timing pain relief so it covers the first part of the night, and daily low-impact movement all improve pain and mood together. Alcohol is a poor sleep aid and worsens both.',
    'Finally, be specific when you ask for help. "I need someone to do the weekly shop on Thursdays" is easier for family to act on than "I am struggling", and it protects you from the exhaustion of explaining an invisible condition over and over.',
  ],
  'Mindfulness & meditation': [
    'Mindfulness does not switch pain off. What trials in chronic pain consistently show is a change in the relationship with pain: less pain-related distress, less interference with daily life, and lower anxiety scores. For many people that is the difference between a day lost and a day managed.',
    'Start small and unglamorous. Ten minutes of guided body scan or breath-focused practice most days, at a time you can protect, beats an ambitious plan you abandon. Free NHS-endorsed apps and audio guides are widely available, and gentle mind-body movement such as tai chi or chair yoga combines the same attentional practice with the joint-friendly exercise arthritis needs anyway.',
    'If your mind wanders constantly, nothing has gone wrong — noticing and returning is the practice. If sitting still increases distress, which sometimes happens with trauma or severe anxiety, use a movement-based version and mention it to your GP or therapist.',
  ],
  'Support resources': [
    'Your GP is the usual first stop and can refer, prescribe and sign-post. In England you can also self-refer to NHS Talking Therapies without seeing your GP first; equivalent services exist across Scotland, Wales and Northern Ireland.',
    'Rheumatology teams often include specialist nurses with a telephone advice line — use it during a flare rather than waiting for the next appointment. Occupational therapy can reduce the daily friction that grinds mood down, and physiotherapy can rebuild confidence in movement after a long avoidant period.',
    'Peer support matters more than people expect, because it removes the work of explaining. Our own community pages and moderated groups are one route; local hospital and council-run pain management programmes are another.',
    'If pain is dominating life, ask about a pain management programme — these are group, multidisciplinary and specifically designed to improve function and mood rather than to eliminate pain.',
  ],
  'When to seek help': [
    'Book a routine GP appointment if low mood, anxiety or sleep problems have lasted more than two weeks, if you have stopped doing things you used to enjoy, if you are drinking more, or if you are taking more pain relief than prescribed to cope with how you feel.',
    'Seek help the same day if you feel unable to keep yourself safe, if you have thoughts of harming yourself, or if you are so distressed you cannot function. Call 111 for urgent advice, Samaritans free on 116 123 at any hour, or text SHOUT to 85258.',
    'Call 999 if you or someone else is in immediate danger, or has taken an overdose. Asking for help early is not an overreaction — it is the same principle as treating a flare before it becomes a hospital admission.',
  ],
};

export default function ArthritisMentalHealth() {

  const pillar = pillarScaffolds.find((p) => p.id === 'mental-health')!;
  const clusters = tier2OutlinesByPillar('mental-health');

  const faqs = [
    {
      question: 'Why does arthritis affect mental health?',
      answer:
        'Persistent pain, fatigue, sleep loss and the grief of changed routines all raise the risk of depression and anxiety. Inflammation itself can also influence mood. Up to one in three people with inflammatory arthritis experience depression at some point.',
    },
    {
      question: 'Is it normal to feel depressed with arthritis?',
      answer:
        'Low mood is common, but persistent depression is treatable — not something you have to live with. If you have had low mood, loss of pleasure or hopelessness most days for two weeks or more, speak to your GP or self-refer to UK healthcare Talking Therapies.',
    },
    {
      question: 'Can mindfulness really help joint pain?',
      answer:
        'Yes. Mindfulness-based programmes are shown in trials to reduce pain interference, anxiety and disability in chronic pain conditions, including arthritis. It does not switch pain off, but it changes your relationship with it.',
    },
    {
      question: 'When should I seek urgent help?',
      answer:
        'If you have thoughts of harming yourself or ending your life, contact 999, Samaritans on 116 123, or 999 or 112. You are not alone, and help is available 24/7.',
    },
  ];

  useEffect(() => {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pillar.title,
      description: pillar.metaDescription,
      author: {
        '@type': 'Person',
        name: 'Maxwell',
        jobTitle: 'First Contact Practitioner',
        identifier: 'HCPC PH128483',
      },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-19',
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: `https://livingwitharthritis.org.uk${pillar.route}`,
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Arthritis & Mental Health', path: pillar.route },
    ]);
    // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
    const c1 = injectJsonLd('mental-health-article', article);
    const c2 = injectJsonLd('mental-health-breadcrumb', breadcrumb);
    return () => { c1(); c2(); };
  }, [pillar.metaDescription, pillar.route, pillar.title]);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Arthritis & Mental Health Guide"
        description={pillar.metaDescription}
        path={pillar.route}
        type="article"
        keywords={pillar.targetKeywords.join(', ')}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Arthritis &amp; Mental Health
      </h1>

      <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
        Living with arthritis is not just a physical experience. Persistent pain,
        fatigue and uncertainty take a real toll on mood, sleep and identity. This
        evidence-based guide covers what to look out for, what helps, and where to
        get support — for you and the people around you.
      </p>


      <nav aria-label="Table of contents" className="bg-muted p-6 rounded-lg mb-10 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-4">In this guide</h2>
        <ul className="space-y-2 md:columns-2">
          {pillar.sections.map((s) => (
            <li key={s}>
              <a href={`#${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="text-primary hover:underline">
                {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {pillar.sections
        .filter((s) => s !== 'FAQs')
        .map((s) => {
          const id = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <section key={id} id={id} className="mb-12 prose prose-lg max-w-none">
              <h2>{s}</h2>
              {(sectionCopy[s] ?? []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </section>
          );
        })}


      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">In-depth articles</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {clusters.map((c) => (
            <li key={c.slug} className="rounded-lg border p-4 hover:bg-accent/40 transition-colors">
              <Link to={`/blog/${c.slug}`} className="font-semibold text-primary hover:underline">
                {c.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {c.targetKeywords.slice(0, 2).join(' Â· ')}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faqs" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <FaqAccordion idPrefix="mental-health" items={faqs} />
      </section>

      <aside className="bg-accent rounded-lg p-6 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-2">Need to talk to someone now?</h2>
        <p className="text-muted-foreground mb-3">
          Samaritans are available 24/7 on <a href="tel:116123" className="text-primary underline">116 123</a>,
          or text SHOUT to 85258. In an emergency, call 999.
        </p>
        <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          Start a chat
        </Link>
      </aside>
    </article>
  );
}
