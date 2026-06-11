import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextReadStrip from "@/components/NextReadStrip";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame, Thermometer, Moon, Utensils, Dumbbell, Brain,
  AlertTriangle, CheckCircle2, ArrowRight, BookOpen,
  Clock, ShieldCheck, HeartPulse, Snowflake, Activity,
  Pill, Apple, BadgeCheck, ChevronRight
} from "lucide-react";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const defined = (v: string) => `hsl(var(${v}))`;

/* ---------- table-of-contents data ---------- */
const toc = [
  { id: "what-is", label: "What Is a Flare-Up?" },
  { id: "triggers", label: "Common Triggers" },
  { id: "symptoms", label: "Recognising Symptoms" },
  { id: "immediate", label: "Immediate Relief" },
  { id: "diet", label: "Diet & Nutrition" },
  { id: "exercise", label: "Exercise During Flares" },
  { id: "mental-health", label: "Mental Health" },
  { id: "medications", label: "Medications & Supplements" },
  { id: "when-gp", label: "When to See Your GP" },
  { id: "prevention", label: "Prevention Strategies" },
  { id: "faq", label: "FAQs" },
];

/* ---------- FAQ data for JSON-LD ---------- */
const faqs = [
  {
    q: "How long does an arthritis flare-up last?",
    a: "Most flare-ups last between a few days and two weeks. If symptoms persist beyond two weeks or worsen rapidly, contact your GP or rheumatology team for advice.",
  },
  {
    q: "Can weather trigger arthritis flare-ups?",
    a: "Many people in the UK report increased joint pain and stiffness during cold, damp weather. While research is mixed, barometric pressure changes may affect joint fluid pressure. Keeping warm and staying active indoors can help.",
  },
  {
    q: "Should I rest or exercise during a flare-up?",
    a: "A combination is best. Rest the most affected joints but keep moving gently. Low-impact activities like swimming, walking, or chair-based stretches help maintain mobility without aggravating inflammation.",
  },
  {
    q: "What foods make arthritis flare-ups worse?",
    a: "Pro-inflammatory foods such as processed meats, refined sugar, fried foods, excess alcohol, and foods high in saturated fat can worsen inflammation. An anti-inflammatory Mediterranean-style diet is widely recommended.",
  },
  {
    q: "Is turmeric effective for arthritis flare-ups?",
    a: "Research supports curcumin (the active compound in turmeric) at around 500–1000 mg/day with piperine for improved absorption. Studies show it can reduce pain and inflammation, sometimes comparable to NSAIDs. Always consult your GP before starting supplements.",
  },
];

/* ---------- Section heading ---------- */
const SectionHeading = ({ id, icon: Icon, children }: { id: string; icon: React.ElementType; children: React.ReactNode }) => (
  <motion.h2
    id={id}
    className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground mt-14 mb-5 scroll-mt-24"
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
      <Icon className="w-5 h-5" />
    </span>
    {children}
  </motion.h2>
);

/* ---------- Trigger card ---------- */
const TriggerCard = ({ icon: Icon, title, desc, color }: { icon: React.ElementType; title: string; desc: string; color: string }) => (
  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-5 flex gap-4 items-start">
      <span className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0`} style={{ background: defined(color) }}>
        <Icon className="w-5 h-5 text-foreground/70" />
      </span>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

/* ---------- Quick-tip pill ---------- */
const Tip = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-muted-foreground leading-relaxed">
    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

/* ========== PAGE ========== */
export default function ArthritisFlareUps() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "How to Manage Arthritis Flare-Ups — A Complete UK Guide",
    description:
      "Comprehensive UK guide to managing arthritis flare-ups: triggers, symptoms, immediate relief, diet, exercise, mental health, medications, and prevention strategies.",
    url: "https://livingwitharthritis.org.uk/arthritis-flare-ups",
    inLanguage: "en-GB",
    datePublished: "2026-03-11",
    dateModified: "2026-03-11",
    publisher: {
      "@type": "Organization",
      name: "Living With Arthritis",
      url: "https://livingwitharthritis.org.uk",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };

  return (
    <>
      <Helmet>
        <title>Managing Arthritis Flare-Ups | Living With Arthritis</title>
        <meta name="description" content="A kind UK guide to easing arthritis flare-ups: spotting triggers, fast relief, gentle exercises, anti-inflammatory food and prevention tips." />
        <meta name="keywords" content="arthritis flare up, arthritis flare up what to do, managing arthritis flare ups, arthritis pain relief, arthritis triggers, anti-inflammatory diet, arthritis flare up treatment, joint swelling causes, chronic pain management, arthritis in cold weather, best pain relief for arthritis, how to reduce joint inflammation, arthritis symptoms, arthritis medication, natural remedies for arthritis" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/arthritis-flare-ups" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/arthritis-flare-ups" />
        <meta property="og:title" content="How to Manage Arthritis Flare-Ups — A Complete UK Guide" />
        <meta property="og:description" content="Expert UK guide on managing arthritis flare-ups: triggers, relief strategies, diet, exercise and prevention." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/arthritis-flare-ups" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Manage Arthritis Flare-Ups — A Complete UK Guide" />
        <meta name="twitter:description" content="Expert UK guide on managing arthritis flare-ups: triggers, relief strategies, diet, exercise and prevention." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Arthritis Flare-Ups", "item": "https://livingwitharthritis.org.uk/arthritis-flare-ups" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to manage an arthritis flare-up",
          "description": "Five evidence-based steps to reduce pain and inflammation during an arthritis flare-up.",
          "totalTime": "PT20M",
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Apply ice or heat", "text": "Apply an ice pack wrapped in a towel for 15–20 minutes to swollen joints. Use a warm compress for stiffness without swelling." },
            { "@type": "HowToStep", "position": 2, "name": "Rest the joint", "text": "Reduce load on the affected joint but avoid complete immobility — perform gentle range-of-motion movements every few hours." },
            { "@type": "HowToStep", "position": 3, "name": "Take over-the-counter pain relief", "text": "Apply topical ibuprofen gel directly to the joint as a first-line option. Oral paracetamol or ibuprofen may also help — follow dosage guidance." },
            { "@type": "HowToStep", "position": 4, "name": "Elevate and support", "text": "Elevate swollen joints above heart level where possible. Use compression garments or splints recommended by your physiotherapist." },
            { "@type": "HowToStep", "position": 5, "name": "Pace your activities", "text": "Break tasks into smaller chunks with rest periods. Use assistive devices to reduce joint stress and avoid the boom-and-bust cycle." }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://livingwitharthritis.org.uk/arthritis-flare-ups",
          "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] }
        })}</script>
      </Helmet>

      <Header />
      <PageBreadcrumb segments={[{ label: "Arthritis Flare-Ups" }]} />

      {/* ─── Hero ─── */}
      <PageHero
        badge={
          <Badge variant="outline" className="text-sm font-medium border-primary/30 text-primary bg-primary/5">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Pillar Guide · 12 min read
          </Badge>
        }
        title={
          <>
            How to Manage Arthritis Flare-Ups
            <span className="block text-primary">A Complete UK Guide</span>
          </>
        }
        subtitle="Evidence-based strategies to recognise, relieve, and prevent arthritis flare-ups — written for UK patients and aligned with national clinical and NICE guidance."
      >
        {/* Quick-jump TOC */}
        <nav aria-label="Table of contents" className="flex flex-wrap gap-2">
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card hover:bg-primary/5 hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors"
            >
              {t.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* ─── Main content ─── */}
      <article className="container mx-auto px-6 md:px-10 max-w-4xl py-12 lg:py-16">

        {/* Intro */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          If you live with <strong>osteoarthritis, rheumatoid arthritis, or psoriatic arthritis</strong>, you'll know that symptoms don't stay constant. Periods of increased pain, swelling, and stiffness — known as <em>flare-ups</em> — can disrupt daily life without warning. In the UK alone, over <strong>10 million people</strong> live with arthritis, and flare management is one of the most searched topics among patients.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          This comprehensive guide brings together the latest evidence on <strong>what triggers flare-ups, how to find relief quickly, and practical strategies to reduce their frequency</strong>. Whether you've been recently diagnosed or have managed arthritis for years, this page is designed to be your go-to resource.
        </p>

        {/* ────── Section 1: What Is a Flare-Up? ────── */}
        <SectionHeading id="what-is" icon={Flame}>What Is an Arthritis Flare-Up?</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A flare-up is a temporary period when your arthritis symptoms — pain, stiffness, swelling, and fatigue — become noticeably worse than your usual baseline. Flares can last anywhere from <strong>a few hours to several weeks</strong>, depending on the type of arthritis and the trigger.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          In <strong>osteoarthritis (OA)</strong>, flares are often triggered by overuse of a joint or changes in weather. In <strong>rheumatoid arthritis (RA)</strong> and <strong>psoriatic arthritis (PsA)</strong>, flares are driven by immune system activity and can be more unpredictable. Understanding the difference matters because the management approach varies.
        </p>
        <Card className="border-l-4 border-l-primary bg-primary/[0.03] mb-8">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Key point:</strong> Flare-ups are a normal part of living with arthritis. Having a plan in place can significantly reduce their impact on your quality of life and help you feel more in control.
            </p>
          </CardContent>
        </Card>

        {/* ────── Section 2: Common Triggers ────── */}
        <SectionHeading id="triggers" icon={AlertTriangle}>Common Flare-Up Triggers</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Identifying your personal triggers is one of the most powerful steps you can take. While triggers vary between individuals, research and patient surveys consistently highlight these common culprits:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <TriggerCard icon={Snowflake} title="Cold & Damp Weather" desc="UK winters are a well-known trigger. Low barometric pressure may increase joint fluid pressure, while cold reduces blood flow to extremities." color="--tint-blue" />
          <TriggerCard icon={Activity} title="Overexertion" desc="Doing too much on a 'good day' is a classic pattern. Pacing activities is crucial to avoid the boom-and-bust cycle." color="--tint-green" />
          <TriggerCard icon={Moon} title="Poor Sleep" desc="Sleep deprivation increases inflammatory cytokines and lowers pain thresholds. Prioritising sleep hygiene is essential." color="--tint-violet" />
          <TriggerCard icon={Brain} title="Stress & Anxiety" desc="Psychological stress triggers cortisol dysregulation and heightened inflammation, directly worsening arthritis symptoms." color="--tint-rose" />
          <TriggerCard icon={Utensils} title="Pro-Inflammatory Diet" desc="Excess sugar, processed foods, saturated fats, and alcohol promote systemic inflammation that fuels flare-ups." color="--tint-amber" />
          <TriggerCard icon={Pill} title="Missed Medications" desc="Skipping or inconsistently taking prescribed DMARDs or biologics (in RA/PsA) can trigger rebound flares." color="--tint-peach" />
        </div>

        {/* ────── Section 3: Recognising Symptoms ────── */}
        <SectionHeading id="symptoms" icon={Thermometer}>Recognising Flare-Up Symptoms Early</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Catching a flare early allows you to intervene before it peaks. Watch for these warning signs — many patients report subtle changes <strong>24–48 hours before a full flare</strong>:
        </p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
          <ul className="space-y-2">
            <Tip>Increased joint stiffness, especially morning stiffness lasting over 30 minutes</Tip>
            <Tip>Swelling, warmth, or redness around one or more joints</Tip>
            <Tip>Unusual fatigue or a general feeling of being unwell</Tip>
            <Tip>Pain that disrupts sleep or wakes you at night</Tip>
          </ul>
          <ul className="space-y-2">
            <Tip>Reduced grip strength or difficulty with fine motor tasks</Tip>
            <Tip>Mood changes — irritability, low mood, or brain fog</Tip>
            <Tip>Skin flares (in psoriatic arthritis)</Tip>
            <Tip>Increased reliance on pain medication</Tip>
          </ul>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Keeping a symptom diary helps you spot patterns and identify your unique early warning signs. Our <Link to="/self-help" className="text-primary font-medium hover:underline">Self Help Tool</Link> makes finding the right exercises effortless.
        </p>

        {/* ────── Section 4: Immediate Relief ────── */}
        <SectionHeading id="immediate" icon={HeartPulse}>Immediate Relief During a Flare-Up</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When a flare hits, your priority is to <strong>reduce inflammation, manage pain, and protect the affected joint</strong>. Here's a practical action plan aligned with national clinical guidance:
        </p>

        <div className="space-y-4 mb-8">
          {[
            { n: "1", title: "Apply Ice or Heat", text: "Use an ice pack wrapped in a towel for 15–20 minutes on swollen joints to reduce inflammation. For stiffness without significant swelling, a warm compress or hot water bottle may be more effective. Alternate as needed." },
            { n: "2", title: "Rest the Affected Joint", text: "Reduce load on the flaring joint but avoid complete immobility, which can increase stiffness. Gentle range-of-motion movements every few hours maintain flexibility." },
            { n: "3", title: "Use Over-the-Counter Pain Relief", text: "Topical NSAIDs (e.g., ibuprofen gel) applied directly to the joint are a first-line option with fewer systemic side effects. Oral paracetamol or ibuprofen may also help — follow dosage guidance and consult your pharmacist." },
            { n: "4", title: "Elevate and Support", text: "Elevate swollen joints above heart level where possible. Use supports, splints, or compression garments recommended by your physiotherapist to reduce strain." },
            { n: "5", title: "Pace Your Activities", text: "Break tasks into smaller chunks with rest periods. Use assistive devices — jar openers, long-handled reachers, ergonomic tools — to reduce joint stress." },
          ].map((step) => (
            <Card key={step.n} className="border-0 shadow-sm">
              <CardContent className="p-5 flex gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ────── Mid-page CTA ────── */}
        <Card className="border-0 bg-gradient-to-r from-primary/5 to-secondary/5 mb-12">
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">Get Personalised Exercise Support</h3>
              <p className="text-sm text-muted-foreground">Our Help Chat can recommend exercises, diet tips, and coping strategies tailored to your arthritis type.</p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <Link to="/chat">
                Start a chat <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* ────── Section 5: Diet & Nutrition ────── */}
        <SectionHeading id="diet" icon={Apple}>Diet & Nutrition During Flare-Ups</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          What you eat directly affects inflammation levels. During a flare, doubling down on an <strong>anti-inflammatory diet</strong> can accelerate recovery. The <strong>Mediterranean diet</strong> is the most studied and recommended pattern for arthritis patients.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <Card className="border-0 shadow-sm bg-[hsl(var(--tint-green))]">
            <CardContent className="p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Eat More
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Fatty fish (salmon, mackerel, sardines) — aim for 2 portions/week</li>
                <li>• Berries, cherries, and dark leafy greens</li>
                <li>• Extra virgin olive oil as your primary cooking fat</li>
                <li>• Nuts and seeds (walnuts, flaxseeds, chia)</li>
                <li>• Whole grains, legumes, and pulses</li>
                <li>• Turmeric with black pepper, ginger, garlic</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-[hsl(var(--tint-rose))]">
            <CardContent className="p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" /> Eat Less
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Processed and red meats</li>
                <li>• Refined sugars and sugary drinks</li>
                <li>• Fried foods and trans fats</li>
                <li>• Excessive alcohol (especially during flares)</li>
                <li>• White bread, pastries, and refined carbohydrates</li>
                <li>• High-sodium processed foods</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Turmeric</strong> deserves special mention: a 2016 systematic review found that <strong>curcumin at around 1000 mg/day</strong> significantly reduced arthritis pain and inflammation, sometimes comparable to NSAIDs. Take it with piperine (black pepper extract) for better absorption. Always check with your GP if you're on blood thinners.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          For detailed meal plans and anti-inflammatory recipes, visit our <Link to="/diet" className="text-primary font-medium hover:underline">Diet & Nutrition Hub</Link>.
        </p>

        {/* ────── Section 6: Exercise ────── */}
        <SectionHeading id="exercise" icon={Dumbbell}>Exercise During Flare-Ups</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          It might seem counterintuitive, but <strong>complete rest during a flare can make things worse</strong>. Gentle movement prevents stiffness, maintains muscle strength around the joint, and supports blood flow to promote healing.
        </p>

        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Flare-Friendly Exercise Guide</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Gentle Range-of-Motion", items: ["Ankle circles", "Wrist rotations", "Shoulder rolls", "Knee bends"], time: "5–10 min, 2×/day" },
                { label: "Low-Impact Cardio", items: ["Short walks (10–15 min)", "Stationary cycling (low resistance)", "Pool walking or aqua therapy"], time: "15–20 min, most days" },
                { label: "Restorative Stretching", items: ["Chair yoga", "Gentle hamstring stretches", "Cat-cow spinal movement", "Deep breathing exercises"], time: "10–15 min, daily" },
              ].map((col) => (
                <div key={col.label}>
                  <h4 className="text-sm font-bold text-foreground mb-2">{col.label}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                    {col.items.map((i) => <li key={i}>• {i}</li>)}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                    <Clock className="w-3.5 h-3.5" /> {col.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>The golden rule:</strong> if exercise increases your pain significantly for more than 2 hours afterwards, you've done too much. Scale back and try again more gently. Between flares, build up with our structured programmes on the <Link to="/exercises" className="text-primary font-medium hover:underline">Exercise Hub</Link>.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Hydrotherapy (exercising in warm water) is particularly effective during flares — the buoyancy reduces joint load by up to 90% while the warmth soothes stiffness. Ask your GP or physiotherapist about public hydrotherapy referrals.
        </p>

        {/* ────── Section 7: Mental Health ────── */}
        <SectionHeading id="mental-health" icon={Brain}>Mental Health & Emotional Wellbeing</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The psychological impact of flare-ups is often underestimated. Living with unpredictable pain affects mood, relationships, work, and self-esteem. Research shows that <strong>people with arthritis are 2–3 times more likely to experience anxiety or depression</strong> than the general population.
        </p>
        <ul className="space-y-2 mb-4">
          <Tip><strong>Mindfulness-Based Stress Reduction (MBSR):</strong> Clinical trials show 8-week MBSR programmes reduce pain perception and improve coping in arthritis patients. Free resources are available through the official UK health apps library.</Tip>
          <Tip><strong>Cognitive Behavioural Therapy (CBT):</strong> NICE recommends CBT for chronic pain. It helps reframe catastrophic thinking patterns that amplify the pain experience. Ask your GP for an GP referral.</Tip>
          <Tip><strong>Peer Support:</strong> Connecting with others who understand is powerful. Join our <Link to="/community" className="text-primary font-medium hover:underline">Community Hub</Link> for moderated discussions and shared experiences.</Tip>
          <Tip><strong>Pacing & Acceptance:</strong> Learning to pace activities and accept limitations on bad days (without guilt) is a clinically recognised strategy that reduces the boom-bust cycle.</Tip>
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-8">
          If you're struggling emotionally during a flare, the national mental health helpline is available 24/7 on <strong>111 (option 2)</strong>, and the Samaritans can be reached on <strong>116 123</strong>.
        </p>

        {/* ────── Section 8: Medications & Supplements ────── */}
        <SectionHeading id="medications" icon={Pill}>Medications & Supplements</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your medication strategy during a flare depends on your type of arthritis and what your rheumatologist or GP has prescribed. Here's a general overview aligned with NICE guidance:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground border-b border-border">Option</th>
                <th className="text-left p-3 font-semibold text-foreground border-b border-border">When to Use</th>
                <th className="text-left p-3 font-semibold text-foreground border-b border-border">Notes</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border"><td className="p-3 font-medium text-foreground">Topical NSAIDs</td><td className="p-3">First-line for localised OA flares</td><td className="p-3">Ibuprofen gel — fewer side effects than oral</td></tr>
              <tr className="border-b border-border"><td className="p-3 font-medium text-foreground">Oral NSAIDs</td><td className="p-3">Moderate-severe OA/RA flares</td><td className="p-3">Use lowest effective dose, short duration; gastroprotection may be needed</td></tr>
              <tr className="border-b border-border"><td className="p-3 font-medium text-foreground">Corticosteroids</td><td className="p-3">Severe RA/PsA flares</td><td className="p-3">Short courses or joint injections — prescribed by rheumatology</td></tr>
              <tr className="border-b border-border"><td className="p-3 font-medium text-foreground">DMARDs / Biologics</td><td className="p-3">Ongoing RA/PsA management</td><td className="p-3">Do not stop during flares — contact your team for dose review</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Paracetamol</td><td className="p-3">Mild pain, or alongside other treatments</td><td className="p-3">Limited anti-inflammatory effect; safer long-term profile</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-3">Evidence-Based Supplements</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { name: "Curcumin (Turmeric)", dose: "500–1000 mg/day", evidence: "Strong", note: "Take with piperine; anti-inflammatory comparable to NSAIDs in some trials" },
            { name: "Omega-3 Fish Oil", dose: "2–3 g EPA+DHA/day", evidence: "Moderate-Strong", note: "Reduces morning stiffness and joint tenderness in RA" },
            { name: "Glucosamine + Chondroitin", dose: "1500 mg + 1200 mg/day", evidence: "Mixed", note: "Some patients report benefit; may take 2–3 months to notice effects" },
          ].map((s) => (
            <Card key={s.name} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground text-sm mb-1">{s.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{s.dose}</p>
                <Badge variant="outline" className="text-xs mb-2">{s.evidence} evidence</Badge>
                <p className="text-xs text-muted-foreground">{s.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ────── Section 9: When to See Your GP ────── */}
        <SectionHeading id="when-gp" icon={ShieldCheck}>When to See Your GP</SectionHeading>
        <Card className="border-l-4 border-l-destructive bg-destructive/[0.03] mb-8">
          <CardContent className="p-5">
            <h3 className="font-bold text-foreground mb-3">Seek medical advice if:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <Tip>A flare lasts more than <strong>two weeks</strong> despite self-management</Tip>
              <Tip>You develop a <strong>hot, red, significantly swollen joint</strong> — this could indicate infection (septic arthritis), which is a medical emergency</Tip>
              <Tip>You experience <strong>new symptoms</strong> such as fever, unexplained weight loss, or rash alongside joint pain</Tip>
              <Tip>Your current medications are <strong>no longer controlling symptoms</strong> effectively</Tip>
              <Tip>Flare-ups are becoming <strong>more frequent or severe</strong> over time</Tip>
              <Tip>You're experiencing <strong>significant mood changes</strong>, anxiety, or depression related to your condition</Tip>
            </ul>
          </CardContent>
        </Card>

        {/* ────── Section 10: Prevention ────── */}
        <SectionHeading id="prevention" icon={BadgeCheck}>Prevention Strategies</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mb-4">
          While you can't eliminate flare-ups entirely, you can significantly reduce their frequency and severity with consistent, proactive habits:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Follow a Mediterranean Diet", desc: "Anti-inflammatory eating reduces baseline inflammation levels, making flares less likely and less severe." },
            { title: "Maintain a Healthy Weight", desc: "Every pound lost removes approximately 4 pounds of pressure from your knees. Even modest weight loss (5–10%) improves symptoms." },
            { title: "Exercise Regularly Between Flares", desc: "Build strength, flexibility, and cardiovascular fitness when you're feeling well. Stronger muscles better protect joints." },
            { title: "Prioritise Sleep", desc: "Aim for 7–9 hours. Use sleep hygiene practices: consistent bedtime, cool room, no screens 1 hour before bed." },
            { title: "Manage Stress Proactively", desc: "Build mindfulness, breathing exercises, or journaling into your daily routine — don't wait until you're overwhelmed." },
            { title: "Take Medications Consistently", desc: "For RA/PsA, consistent DMARD or biologic use is the single most important factor in preventing flares." },
            { title: "Pace Your Activities", desc: "Use the 'activity-rest-activity' pattern. Plan demanding tasks for your best times of day and alternate with rest." },
            { title: "Track Your Patterns", desc: "Use a symptom diary to identify personal triggers — weather, food, activity, stress — and adjust proactively." },
          ].map((item) => (
            <Card key={item.title} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ────── Section 11: FAQs ────── */}
        <SectionHeading id="faq" icon={BookOpen}>Frequently Asked Questions</SectionHeading>
        <div className="space-y-4 mb-12">
          {faqs.map((f, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ────── Final CTA ────── */}
        <Card className="border-0 bg-gradient-to-br from-primary/8 via-background to-secondary/5 overflow-hidden">
          <CardContent className="p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Take Control of Your Arthritis</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Use our free tools to track symptoms, access personalised exercise programmes, and get evidence-based guidance — all designed for UK arthritis patients.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/self-help">
                  Self Help Tool <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/exercises">
                  Exercise Hub <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/chat">
                  Help Chat <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ────── Medical Disclaimer ────── */}
        <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
          <strong>Medical disclaimer:</strong> This guide is for educational purposes only and does not replace professional medical advice. Content is aligned with publicly available national clinical and NICE guidance as of March 2026. Always consult your GP, rheumatologist, or physiotherapist before making changes to your treatment plan. In an emergency, call 999.
        </p>
        <CrossLinkBanner preset="flareup" exclude="/arthritis-flare-ups" title="More arthritis resources" />
        <ContextualLinks
          heading="Reduce flare-ups, long term"
          intro="Flare-ups respond best to a combined plan: anti-inflammatory food, gentle daily movement, mental health support and the right condition-specific treatment."
          groups={[
            {
              title: "Calm inflammation through food",
              links: [
                { label: "Anti-inflammatory diet for arthritis", to: "/diet" },
                { label: "Foods to avoid during a flare-up", to: "/blog/category/nutrition" },
                { label: "Turmeric, omega-3 and collagen — what works", to: "/blog/category/supplements" },
                { label: "Mediterranean diet pillar guide", to: "/guides/diet" },
              ],
            },
            {
              title: "Move without making it worse",
              links: [
                { label: "Arthritis-friendly exercises", to: "/exercises" },
                { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
                { label: "Tai Chi for balance & stiffness", to: "/exercises/tai-chi-for-balance" },
                { label: "Self-help joint tool", to: "/self-help" },
              ],
            },
            {
              title: "Conditions linked to flares",
              links: [
                { label: "Rheumatoid arthritis flares", to: "/conditions/rheumatoid-arthritis" },
                { label: "Osteoarthritis pain management", to: "/conditions/osteoarthritis" },
                { label: "Gout attacks — what to do", to: "/conditions/gout" },
                { label: "Lupus flare triggers", to: "/conditions/lupus" },
                { label: "Fibromyalgia pacing strategies", to: "/conditions/fibromyalgia" },
              ],
            },
          ]}
        />

        <section aria-labelledby="evidence-pain-management" className="mt-16 border-t border-border pt-12">
          <h2 id="evidence-pain-management" className="font-serif text-3xl md:text-4xl text-foreground mb-6">
            Evidence-based management of arthritis and chronic musculoskeletal pain
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Chronic pain is one of the most common reasons people in the UK seek medical help, and arthritis and fibromyalgia are two of the leading drivers. Search behaviour reflects this — huge volumes of people look up knee arthritis, fibromyalgia and back pain relief every month. Managing these conditions well requires a combined approach: appropriate medical input, physiotherapy and steady lifestyle change, rather than reliance on any single intervention.
            </p>
            <p>
              Osteoarthritis is a degenerative joint disease driven by gradual cartilage loss. When it affects weight-bearing joints such as the knee or hip, simple things — walking, climbing stairs, standing up from a chair — can become painful. First-line management is conservative: weight management to reduce load on the joints, and progressive strengthening of the surrounding muscles so they can act as shock absorbers. When conservative care is not enough, additional options include Transcutaneous Electrical Nerve Stimulation (TENS), a non-invasive method that uses low-voltage currents to interrupt pain signals and stimulate endorphin release. TENS is not a cure, but it is a useful adjunct for many people who want to reduce reliance on stronger painkillers.
            </p>
            <p>
              Fibromyalgia is a different problem. It is characterised by widespread musculoskeletal pain alongside fatigue, disrupted sleep and brain-fog. Rather than a structural joint disease, fibromyalgia is increasingly understood as a disorder of pain processing in the central nervous system: sensory signals are amplified, so ordinary stimuli register as painful. Management focuses on calming that overactive signalling — graded aerobic exercise, sleep hygiene, pacing, cognitive approaches, and sometimes medications such as duloxetine or pregabalin under specialist guidance.
            </p>
            <p>
              Back pain follows similar principles. Acute back pain usually settles with gentle movement and time; chronic back pain responds best to a structured plan that strengthens the deep core muscles and corrects long-standing posture habits. Injections, short courses of steroids or nerve blocks can give meaningful temporary relief, but they rarely fix the underlying cause. The most durable results come from consistent stretching, strengthening and gradual return to normal activity guided by a physiotherapist.
            </p>
            <p className="text-sm italic">
              This is general information, not medical advice. Speak to a GP, rheumatologist or physiotherapist before starting any new treatment or stopping existing medication.
            </p>
          </div>
        </section>
      </article>


      <InternalLinks />
      <NextReadStrip currentPath="/arthritis-flare-ups" />
      <Footer />
    </>
  );
}
