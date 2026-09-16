import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, Users, TrendingUp, Timer, Move } from "lucide-react";
import { motion } from "framer-motion";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";
import AnswerBox from "@/components/seo/AnswerBox";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import ArticleFaqSection from "@/components/article/ArticleFaqSection";
import ConditionSubpageLinks from "@/components/ConditionSubpageLinks";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/elbow-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Elbow Pain & Arthritis – Symptoms, Causes & Exercises | Living With Arthritis",
  "description": "UK guide to elbow pain and elbow arthritis: causes of elbow joint pain, tennis and golfer's elbow, osteoarthritis and rheumatoid involvement, the best gentle exercises, UK healthcare treatment options and when to see a GP.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2026-06-12",
  "dateModified": "2026-06-12",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Elbow Arthritis",
    "alternateName": ["Elbow Osteoarthritis", "Elbow Joint Pain", "Elbow Pain"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Humeroulnar, humeroradial and proximal radioulnar joints" },
    "riskFactor": ["Previous elbow fracture or dislocation", "Heavy manual or overhead work", "Throwing or racquet sports", "Rheumatoid or psoriatic arthritis"],
    "signOrSymptom": ["Elbow pain with bending or straightening", "Loss of full extension", "Locking or catching", "Tingling in ring and little fingers", "Stiffness after rest"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Physiotherapy and graded exercise" },
      { "@type": "MedicalTherapy", "name": "Topical and oral NSAIDs" },
      { "@type": "MedicalTherapy", "name": "Corticosteroid injection" },
      { "@type": "MedicalTherapy", "name": "Arthroscopic debridement or elbow replacement" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What does elbow arthritis feel like?", "acceptedAnswer": { "@type": "Answer", "text": "Most people describe a deep ache on the outside or back of the elbow that worsens when straightening the arm fully or carrying a heavy bag. Many lose the last few degrees of extension, so the arm no longer goes completely straight." } },
    { "@type": "Question", "name": "Is elbow pain always arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "No. The most common causes of elbow pain in UK adults are tennis elbow (lateral epicondylitis) and golfer's elbow (medial epicondylitis) — tendon overload conditions rather than joint arthritis. True elbow arthritis is less common and usually follows an old fracture or develops in people with rheumatoid arthritis." } },
    { "@type": "Question", "name": "What is the best exercise for elbow arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Gentle range-of-motion work — bending and straightening the elbow within a pain-free range, plus forearm rotations (palm up, palm down) — is the most evidence-supported routine. Light isometric grip work protects forearm strength without loading the joint." } },
    { "@type": "Question", "name": "Should I see a GP about elbow pain?", "acceptedAnswer": { "@type": "Answer", "text": "See your GP if elbow pain lasts more than six weeks, wakes you at night, locks or catches, or is accompanied by tingling into the ring and little fingers — that pattern can indicate ulnar nerve irritation that benefits from early treatment." } },
    { "@type": "Question", "name": "Can elbow arthritis be cured?", "acceptedAnswer": { "@type": "Answer", "text": "Arthritis itself isn't cured, but most people manage symptoms well with exercise, activity modification, topical NSAIDs and occasional corticosteroid injections. Elbow replacement is reserved for severe pain or loss of function and gives good relief in around 85% of cases." } }
  ]
};

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="prose prose-lg max-w-none text-foreground/85 prose-headings:font-display prose-headings:text-foreground prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground">
      {children}
    </div>
  </motion.section>
);

const ElbowArthritis = () => (
  <>
    <Helmet>
      <title>Elbow Arthritis in the UK: Causes & Exercises | LWA UK</title>
      <meta name="description" content="UK guide to elbow pain and arthritis: causes of elbow joint pain, tennis and golfer's elbow, osteoarthritis, the best gentle exercises and when to see a GP." />
      <meta name="keywords" content="elbow pain, elbow joint pain, elbow arthritis, elbow osteoarthritis, tennis elbow, golfer's elbow, elbow pain causes, elbow exercises, elbow pain uk, painful elbow" />
      <meta property="og:title" content="Elbow Pain & Arthritis – Causes, Exercises & UK Treatment" />
      <meta property="og:description" content="Evidence-based UK guide to elbow pain and arthritis: gentle exercises, injections, physiotherapy and when to see your GP." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Elbow pain and arthritis – causes, exercises and treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Elbow Pain & Arthritis – Causes & Exercises" />
      <meta name="twitter:description" content="UK guide to elbow pain and arthritis: gentle exercises, injections and treatment." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Elbow Arthritis" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Move className="w-3 h-3" /> Joint-specific guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Elbow Pain &amp; Arthritis
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/elbow-arthritis" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Elbow pain affects roughly 1 in 20 UK adults each year. Most cases are tendon overload — tennis or golfer's elbow — but true elbow arthritis is increasingly recognised, particularly after old fractures and in people with rheumatoid arthritis. This UK guide explains the main causes, the exercises that help, and when to ask your GP for a referral.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <AnswerBox
          question="What is the best treatment for elbow arthritis?"
          reviewed="2026-06-13"
        >
          <p>
            Gentle range-of-motion work — bending and straightening the elbow within a
            pain-free range, plus forearm rotations — is the most evidence-supported daily
            routine. For flare-ups, <strong>topical NSAID gel</strong> or a <strong>corticosteroid
            injection</strong> settles pain. <strong>Elbow replacement</strong> is reserved for
            severe pain or loss of function and gives good relief in around 85% of cases.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />
      </section>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Elbow pain at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="5" suffix="%" label="UK adults with elbow pain yearly" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="40" suffix="+" label="Typical age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="3" label="Joint compartments involved" icon={<Move className="w-6 h-6" />} color="amber" />
            <StatCounter value="85" suffix="%" label="Pain relief after elbow replacement" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What causes elbow pain?">
          <p>"Elbow pain" is a symptom, not a diagnosis. The four most common UK causes are:</p>
          <ul>
            <li><strong>Tennis elbow (lateral epicondylitis)</strong> — pain on the outer elbow from overload of the forearm extensor tendons. Affects manual workers, racquet-sport players and anyone doing repetitive gripping.</li>
            <li><strong>Golfer's elbow (medial epicondylitis)</strong> — pain on the inner elbow from overload of the forearm flexor tendons.</li>
            <li><strong>Elbow osteoarthritis</strong> — cartilage wear in the joint itself, usually after an old fracture, dislocation or years of heavy manual work.</li>
            <li><strong>Inflammatory arthritis</strong> — rheumatoid, psoriatic and juvenile arthritis frequently involve the elbow, causing warm swelling and morning stiffness lasting over an hour.</li>
          </ul>
          <p>Other causes include cubital tunnel syndrome (ulnar nerve irritation), olecranon bursitis ("student's elbow"), and gout — see our <Link to="/conditions/gout" className="text-primary underline">gout guide</Link> for more.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms of elbow arthritis?">
          <ul>
            <li><strong>Deep elbow ache</strong> — worse when bending or straightening fully, often felt at the back of the joint</li>
            <li><strong>Loss of full extension</strong> — the arm no longer straightens the last few degrees, an early and very specific sign</li>
            <li><strong>Locking or catching</strong> — loose fragments of cartilage can cause sudden brief locks</li>
            <li><strong>Crepitus</strong> — grinding when rotating the forearm (palm up, palm down)</li>
            <li><strong>Tingling in the ring and little fingers</strong> — bone spurs can press on the ulnar nerve as it runs behind the elbow</li>
            <li><strong>Morning stiffness</strong> — brief in osteoarthritis (under 30 minutes), prolonged in rheumatoid arthritis (over an hour)</li>
          </ul>
        </Section>

        <Section icon={Heart} title="What causes elbow arthritis?">
          <ul>
            <li><strong>Previous fracture or dislocation</strong> — the single biggest risk factor for elbow OA; arthritis can develop 10–20 years later</li>
            <li><strong>Heavy manual or overhead work</strong> — builders, decorators, mechanics and labourers</li>
            <li><strong>Throwing and racquet sports</strong> — repetitive valgus stress damages the inner elbow</li>
            <li><strong>Rheumatoid arthritis</strong> — the elbow is one of the most frequently affected joints in RA</li>
            <li><strong>Gout and pseudogout</strong> — crystal deposits can trigger sudden, intensely painful elbow flares</li>
            <li><strong>Age</strong> — symptoms most often appear after 40</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily tasks most affected</h3>
          <HorizontalBar items={[
            { label: "Carrying shopping bags", value: 82, color: "hsl(var(--primary))" },
            { label: "Straightening the arm fully", value: 76, color: "hsl(var(--amber))" },
            { label: "Turning a key or doorknob", value: 64, color: "hsl(var(--sky))" },
            { label: "Lifting a kettle or pan", value: 58, color: "hsl(var(--violet))" },
            { label: "Pushing up from a chair", value: 45, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="What are the best exercises for elbow arthritis?">
          <p>The aim is to preserve bending, straightening and forearm rotation <em>without</em> overloading the joint. Stop short of sharp pain, and use heat for 10 minutes before starting.</p>
          <h3>Range of motion</h3>
          <ul>
            <li><strong>Active elbow bends</strong> — sit with the arm supported on a table, slowly bend and straighten the elbow. 10 reps, 2–3× a day.</li>
            <li><strong>Forearm rotations</strong> — elbow tucked at the side, turn the palm up then down. 10 each way.</li>
            <li><strong>Wall-supported triceps stretch</strong> — gently encourage the last few degrees of extension by placing the forearm flat on a wall.</li>
          </ul>
          <h3>Strength</h3>
          <ul>
            <li><strong>Isometric grip</strong> — squeeze a soft ball for 5 seconds, release. 10 reps. Builds forearm strength without joint loading.</li>
            <li><strong>Light wrist curls</strong> — 0.5–1 kg, palm up and palm down. 2 sets of 10.</li>
            <li><strong>Banded biceps curls</strong> — light resistance band, full range, slow tempo. 2 sets of 12.</li>
          </ul>
          <p><strong>Avoid:</strong> heavy bench press, dips, kettlebell snatches, locked-out triceps extensions and any throwing — all spike compressive load through the elbow.</p>
          <p>For joint-by-joint routines that pair with elbow care, browse our <Link to="/exercises" className="text-primary underline">exercise hub</Link>.</p>
        </Section>

        <Section icon={Apple} title="What diet and lifestyle changes help elbow arthritis?">
          <p>The same anti-inflammatory eating pattern that helps every form of arthritis applies — see our <Link to="/diet" className="text-primary underline">Diet Hub</Link>. For elbows specifically:</p>
          <ul>
            <li>Switch a heavy shoulder bag for a backpack to take load off the arm</li>
            <li>Use a thicker pen, kitchen-knife handle or gardening-tool grip — wider grips reduce flexor-tendon strain</li>
            <li>If you wake with a bent, painful elbow, a soft night splint can ease symptoms by morning</li>
            <li>Lose excess weight — every kilogram off the body lowers systemic inflammation</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily elbow-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="🔄" title="Mobility" description="Bend and straighten morning and evening." />
            <EmojiCard emoji="✊" title="Grip" description="Soft-ball squeezes daily, stop if it spikes pain." />
            <EmojiCard emoji="🎒" title="Load" description="Use a backpack, not a single-shoulder bag." />
            <EmojiCard emoji="♨️" title="Heat" description="Ten minutes of heat before exercise." />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is elbow arthritis treated?">
          <h3>Self-management</h3>
          <ul>
            <li>Daily mobility and grip routine (above)</li>
            <li>Activity modification — share heavy loads between both hands</li>
            <li>Heat before activity, ice for 10 minutes after a flare</li>
            <li>Topical NSAID gel applied around the joint 3× daily</li>
          </ul>
          <h3>Medical treatments</h3>
          <ul>
            <li><strong>Paracetamol &amp; oral NSAIDs</strong> — short courses for flares, taken with food</li>
            <li><strong>Physiotherapy</strong> — supervised graded loading; the most cost-effective single intervention</li>
            <li><strong>Corticosteroid injection</strong> — into the joint or around the epicondyle depending on diagnosis; usually 6–12 weeks of relief</li>
            <li><strong>Ultrasound-guided injection</strong> — used when surface landmarks are unclear or for recurrent tennis elbow</li>
          </ul>
          <h3>Surgery</h3>
          <p><strong>Arthroscopic debridement</strong> (keyhole clean-up of loose bodies and bone spurs) can buy years of relief in earlier disease. <strong>Total elbow replacement</strong> is reserved for severe rheumatoid involvement or end-stage OA, with around 85% of patients reporting good pain relief at 5 years. Replacements have stricter lifting limits than knees or hips, so they're used selectively.</p>
        </Section>

        <Section icon={Activity} title="When should you see your GP?">
          <p>Book an appointment if any of the following apply:</p>
          <ul>
            <li>Elbow pain has lasted more than six weeks</li>
            <li>The joint is warm, red or swollen — possible inflammatory or septic cause</li>
            <li>You can't fully straighten the elbow</li>
            <li>Tingling or numbness in the ring and little fingers</li>
            <li>Night pain wakes you regularly</li>
            <li>You have known rheumatoid or psoriatic arthritis and a new flare</li>
          </ul>
          <p>If your appointment is delayed, our <Link to="/arthritis-waiting-list-help" className="text-primary underline">waiting-list help guide</Link> covers what you can do in the meantime.</p>
        </Section>

        <ArticleFaqSection
          faqs={faqLd.mainEntity.map((f) => ({
            question: f.name,
            answer: f.acceptedAnswer.text,
          }))}
        />

        <ConditionBlogStrip
          conditionName="Elbow arthritis"
          matchCategories={["Exercise", "Treatment"]}
        />

        <ConditionSubpageLinks conditionSlug="elbow-arthritis" conditionName="Elbow Arthritis" />

        <ContextualLinks
          heading="Pair elbow care with the right resources"
          intro="Use these guides alongside your treatment — exercises, diet and related conditions."
          groups={[
            {
              title: "Exercises &amp; movement",
              links: [
                { label: "All exercise guides", to: "/exercises" },
                { label: "Tai Chi for arthritis", to: "/exercises/tai-chi-for-arthritis" },
                { label: "Exercises to avoid", to: "/guides/exercise" },
              ],
            },
            {
              title: "Diet &amp; supplements",
              links: [
                { label: "Best diet for arthritis", to: "/diet" },
                { label: "Mediterranean diet pillar", to: "/guides/diet" },
                { label: "Glucosamine, collagen, turmeric", to: "/blog/category/supplements" },
              ],
            },
            {
              title: "Related conditions",
              links: [
                { label: "Osteoarthritis (overview)", to: "/conditions/osteoarthritis" },
                { label: "Shoulder arthritis", to: "/conditions/shoulder-arthritis" },
                { label: "Hand arthritis", to: "/conditions/hand-arthritis" },
                { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Managing flare-ups", to: "/arthritis-flare-ups" },
                { label: "Help while waiting for care", to: "/arthritis-waiting-list-help" },
                { label: "Self-help tool", to: "/self-help-tool" },
              ],
            },
          ]}
        />

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Need more support?</h2>
          <p className="text-muted-foreground mb-5">Start a chat or browse the Advice Hub.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Start a chat
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
          <CrossLinkBanner preset="condition" exclude="/conditions/elbow-arthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default ElbowArthritis;
