import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, Users, TrendingUp, Timer, Hand } from "lucide-react";
import { motion } from "framer-motion";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/hand-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Hand Arthritis – Symptoms, Exercises & Treatment | Living With Arthritis",
  "description": "UK guide to hand and finger arthritis: thumb base (CMC) arthritis, finger joint OA, symptoms, the best hand exercises, splints, topical treatments and surgical options.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2026-05-13",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Hand Osteoarthritis",
    "alternateName": ["Hand OA", "Finger Arthritis", "Thumb Base Arthritis", "CMC Arthritis"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Finger DIP and PIP joints, thumb carpometacarpal (CMC) joint" },
    "riskFactor": ["Age over 50", "Female sex", "Family history (Heberden's nodes)", "Repetitive grip work"],
    "signOrSymptom": ["Bony lumps on fingers (Heberden's, Bouchard's nodes)", "Thumb base pain when pinching", "Stiffness", "Reduced grip strength"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Hand therapy exercises" },
      { "@type": "MedicalTherapy", "name": "Thumb splint" },
      { "@type": "MedicalTherapy", "name": "Topical NSAIDs" },
      { "@type": "MedicalTherapy", "name": "Trapeziectomy" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Conditions", "item": `${BASE}/#conditions` },
    { "@type": "ListItem", "position": 3, "name": "Hand Arthritis", "item": URL }
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What are the first signs of hand arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Early signs include stiffness in the fingers in the morning, a dull ache at the base of the thumb when opening jars or turning keys, and small bony lumps on the end finger joints (Heberden's nodes)." } },
    { "@type": "Question", "name": "What is the best exercise for arthritic hands?", "acceptedAnswer": { "@type": "Answer", "text": "A daily 5-minute routine of fist-to-fan, finger-to-thumb touches, and gentle putty squeezes maintains range of motion and grip strength without overloading inflamed joints." } },
    { "@type": "Question", "name": "Do hand splints actually help?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — for thumb base (CMC) arthritis, a custom or off-the-shelf neoprene splint reduces pain during pinching tasks and is recommended by NICE as part of first-line care." } },
    { "@type": "Question", "name": "Are the bony lumps on my fingers permanent?", "acceptedAnswer": { "@type": "Answer", "text": "Heberden's and Bouchard's nodes are bone changes and don't shrink, but the pain associated with their formation usually settles within 1–2 years. The remaining stiffness can be managed with exercise." } },
    { "@type": "Question", "name": "When is hand surgery needed?", "acceptedAnswer": { "@type": "Answer", "text": "Surgery (most commonly trapeziectomy for thumb base arthritis or joint fusion for severe finger OA) is reserved for persistent pain that hasn't responded to splinting, exercise, injections and topical NSAIDs over 6+ months." } }
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

const HandArthritis = () => (
  <>
    <Helmet>
      <title>Hand Arthritis – Symptoms, Exercises & Treatment | Living With Arthritis</title>
      <meta name="description" content="UK guide to hand and finger arthritis: thumb base (CMC) pain, Heberden's nodes, the best hand exercises, splints, topical treatments and when to consider surgery." />
      <meta name="keywords" content="hand arthritis, finger arthritis, thumb arthritis, thumb base arthritis, CMC arthritis, Heberden's nodes, Bouchard's nodes, hand osteoarthritis, hand exercises arthritis, hand splint" />
      <meta property="og:title" content="Hand Arthritis – Symptoms, Exercises & Treatment" />
      <meta property="og:description" content="Evidence-based UK guide to hand and finger arthritis: exercises, splints, topical treatments and surgery options." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hand arthritis – symptoms, exercises and treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hand Arthritis – Symptoms, Exercises & Treatment" />
      <meta name="twitter:description" content="UK guide to hand and finger arthritis: exercises, splints and treatment." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.jpg`} />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={URL} />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Hand Arthritis" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
              <Hand className="w-3 h-3" /> Joint-specific guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Hand Arthritis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hand arthritis affects the small finger joints and the base of the thumb. This UK guide explains the difference between Heberden's nodes, Bouchard's nodes and thumb base (CMC) arthritis — and the exercises, splints and treatments that help most.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Hand arthritis at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="1.9" suffix="M" label="UK adults with hand OA" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="3" suffix="×" label="More common in women" icon={<Hand className="w-6 h-6" />} color="amber" />
            <StatCounter value="40" suffix="+" label="Typical age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="35" suffix="%" label="Pain reduction with splinting" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What is hand arthritis?">
          <p>Hand arthritis usually means osteoarthritis of one or more of these joints:</p>
          <ul>
            <li><strong>DIP joints</strong> — the end finger joints, where Heberden's nodes form</li>
            <li><strong>PIP joints</strong> — the middle finger joints, where Bouchard's nodes form</li>
            <li><strong>Thumb base (CMC joint)</strong> — between the thumb and wrist; the most disabling form because it controls pinch grip</li>
          </ul>
          <p>Inflammatory arthritis (rheumatoid, psoriatic) typically targets different joints — see our <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline">rheumatoid arthritis</Link> guide if morning stiffness lasts over an hour or multiple knuckles are swollen and warm.</p>
        </Section>

        <Section icon={ThermometerSun} title="Symptoms of hand arthritis">
          <ul>
            <li><strong>Heberden's nodes</strong> — small bony bumps on the end finger joints</li>
            <li><strong>Bouchard's nodes</strong> — similar bumps on the middle finger joints</li>
            <li><strong>Thumb base pain</strong> — sharp ache when opening jars, turning keys or wringing out a cloth</li>
            <li><strong>Reduced grip strength</strong> — buttons, zips and bottle tops become harder</li>
            <li><strong>Morning stiffness</strong> — usually under 30 minutes; eases with gentle movement</li>
            <li><strong>Crepitus</strong> — clicking or grating with thumb movement</li>
          </ul>
        </Section>

        <Section icon={Heart} title="Causes & risk factors">
          <ul>
            <li><strong>Age</strong> — most common after 50</li>
            <li><strong>Sex</strong> — women are 2–3× more likely to develop hand OA, particularly around menopause</li>
            <li><strong>Genetics</strong> — Heberden's nodes run strongly in families</li>
            <li><strong>Occupation & hobbies</strong> — sustained pinch grip (musicians, hairdressers, sewing, gardening)</li>
            <li><strong>Previous injury</strong> — fractures, ligament sprains, dislocations</li>
            <li><strong>Joint hypermobility</strong> — particularly at the thumb base</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Most affected joints (UK clinic data)</h3>
          <HorizontalBar items={[
            { label: "Thumb base (CMC)", value: 82, color: "hsl(var(--primary))" },
            { label: "DIP joints (fingertips)", value: 74, color: "hsl(var(--amber))" },
            { label: "PIP joints (middle)", value: 48, color: "hsl(var(--sky))" },
            { label: "Wrist", value: 22, color: "hsl(var(--violet))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="Best exercises for hand arthritis">
          <p>A short daily routine maintains range of motion and grip strength better than any supplement. Aim for 5 minutes, twice a day, in a warm room or after a warm shower.</p>
          <h3>Range of motion</h3>
          <ul>
            <li><strong>Fist-to-fan</strong> — close into a soft fist, then fully open. 10 reps each hand.</li>
            <li><strong>Finger-to-thumb touches</strong> — touch each fingertip to the thumb tip in turn. 2 sets.</li>
            <li><strong>Thumb circles</strong> — slow, controlled circles in both directions. 10 reps.</li>
          </ul>
          <h3>Strength</h3>
          <ul>
            <li><strong>Putty squeezes</strong> — soft therapy putty, 10 squeezes; progress to firmer putty over weeks</li>
            <li><strong>Pinch strengthening</strong> — pinch a clothes peg, hold 3 seconds, release. 10 reps.</li>
            <li><strong>Rubber-band finger extension</strong> — band around all five fingers, open against resistance</li>
          </ul>
        </Section>

        <Section icon={Apple} title="Diet & lifestyle">
          <p>The same anti-inflammatory pattern that helps every type of arthritis applies — see our <Link to="/diet" className="text-primary underline">Diet Hub</Link>. For hands specifically:</p>
          <ul>
            <li>Stay hydrated — joint cartilage is 70% water</li>
            <li>Oily fish twice a week for omega-3</li>
            <li>Vitamin D level — common deficiency in the UK; ask your GP if you're unsure</li>
            <li>Limit smoking and excess alcohol — both worsen small-joint pain</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily hand-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="✋" title="Move" description="5 min mobility, twice daily" />
            <EmojiCard emoji="🧤" title="Splint" description="During heavy tasks" />
            <EmojiCard emoji="♨️" title="Heat" description="Warm soak in the morning" />
            <EmojiCard emoji="🛠️" title="Adapt" description="Easy-grip kitchen tools" />
          </div>
        </motion.div>

        <Section icon={Pill} title="Treatment & management">
          <h3>Self-management</h3>
          <ul>
            <li>Daily exercise routine (above)</li>
            <li>Warm soaks or paraffin wax baths to ease stiffness</li>
            <li>Adaptive equipment — chunky pen grips, jar openers, loop scissors</li>
            <li>Pacing — break up long pinch-grip tasks (texting, gardening)</li>
          </ul>
          <h3>Medical treatments</h3>
          <ul>
            <li><strong>Topical NSAIDs</strong> — diclofenac or ibuprofen gel, first-line per NICE</li>
            <li><strong>Thumb splint</strong> — neoprene or custom thermoplastic; reduces CMC pain by ~35%</li>
            <li><strong>Corticosteroid injection</strong> — particularly useful for the thumb base joint</li>
            <li><strong>Hand therapy</strong> — supervised programme from an occupational therapist or physiotherapist</li>
          </ul>
          <h3>Surgery</h3>
          <p><strong>Trapeziectomy</strong> (removal of the trapezium bone at the thumb base) is the most common hand-arthritis operation in the UK, with around 80% of patients reporting good pain relief. Finger joint <strong>fusion</strong> or <strong>replacement</strong> is reserved for severe deformity.</p>
        </Section>

        <ConditionBlogStrip
          conditionName="Hand arthritis"
          matchCategories={["Exercise", "Treatment"]}
        />

        <ContextualLinks
          heading="Pair hand care with the right resources"
          intro="Use these guides alongside your treatment — exercises, diet and related conditions."
          groups={[
            {
              title: "Exercises & movement",
              links: [
                { label: "Hand & finger exercises", to: "/exercises" },
                { label: "Tai Chi for joint health", to: "/exercises/tai-chi-for-balance" },
                { label: "Exercises to avoid", to: "/guides/exercise" },
              ],
            },
            {
              title: "Diet & supplements",
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
                { label: "Knee arthritis", to: "/conditions/knee-arthritis" },
                { label: "Shoulder arthritis", to: "/conditions/shoulder-arthritis" },
                { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
                { label: "Psoriatic arthritis", to: "/conditions/psoriatic-arthritis" },
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
          <CrossLinkBanner preset="condition" exclude="/conditions/hand-arthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default HandArthritis;
