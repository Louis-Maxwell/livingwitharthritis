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
import ConditionSubpageLinks from "@/components/ConditionSubpageLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/shoulder-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Shoulder Arthritis – Symptoms, Exercises & Treatment | Living With Arthritis",
  "description": "UK guide to shoulder arthritis: glenohumeral and AC joint OA, rotator cuff arthropathy, the best shoulder exercises, injections and shoulder replacement options.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2026-09-16",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Shoulder Osteoarthritis",
    "alternateName": ["Shoulder OA", "Glenohumeral Arthritis", "AC Joint Arthritis", "Rotator Cuff Arthropathy"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Glenohumeral joint, acromioclavicular (AC) joint, rotator cuff" },
    "riskFactor": ["Age over 60", "Previous shoulder dislocation or fracture", "Rotator cuff tear", "Overhead occupation or sport"],
    "signOrSymptom": ["Deep shoulder pain", "Loss of overhead reach", "Night pain lying on the shoulder", "Crepitus", "Stiffness"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Rotator cuff exercises" },
      { "@type": "MedicalTherapy", "name": "Corticosteroid injection" },
      { "@type": "MedicalTherapy", "name": "Reverse total shoulder replacement" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What does shoulder arthritis feel like?", "acceptedAnswer": { "@type": "Answer", "text": "Most people describe a deep ache at the back of the shoulder that worsens when reaching overhead, behind the back, or lying on that side at night. Stiffness limits putting on coats and reaching seatbelts." } },
    { "@type": "Question", "name": "Is shoulder arthritis the same as a frozen shoulder?", "acceptedAnswer": { "@type": "Answer", "text": "No. Frozen shoulder (adhesive capsulitis) is inflammation of the joint capsule and usually resolves within 1–3 years. Shoulder arthritis is cartilage wear and is progressive — but both can cause similar early symptoms, so accurate diagnosis matters." } },
    { "@type": "Question", "name": "What is the best exercise for shoulder arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Pendulum swings, doorway stretches and gentle external rotation with a resistance band are the most evidence-supported exercises. They protect range of motion and rotator cuff strength without overloading the joint." } },
    { "@type": "Question", "name": "Should I get an injection in my shoulder?", "acceptedAnswer": { "@type": "Answer", "text": "Corticosteroid injections can give 6–12 weeks of meaningful pain relief and are useful to bridge a flare or to allow physiotherapy to progress. Most clinicians limit injections to 2–3 per year." } },
    { "@type": "Question", "name": "When is shoulder replacement needed?", "acceptedAnswer": { "@type": "Answer", "text": "Shoulder replacement is considered when night pain is severe, function is limited despite physiotherapy and injections, and X-rays confirm advanced joint changes. The reverse total shoulder replacement is the most common option in the UK." } }
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

const ShoulderArthritis = () => (
  <>
    <Helmet>
      <title>Shoulder Arthritis: Symptoms & Exercises | LWA UK</title>
      <meta name="description" content="UK guide to shoulder arthritis: glenohumeral & AC joint OA, rotator cuff arthropathy, symptoms, treatment and exercises." />
      <meta name="keywords" content="shoulder arthritis, shoulder osteoarthritis, glenohumeral arthritis, AC joint arthritis, rotator cuff arthropathy, shoulder pain, shoulder exercises arthritis, shoulder replacement, reverse shoulder replacement" />
      <meta property="og:title" content="Shoulder Arthritis – Symptoms, Exercises & Treatment" />
      <meta property="og:description" content="Evidence-based UK guide to shoulder arthritis: exercises, injections, physiotherapy and shoulder replacement." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Shoulder arthritis – symptoms, exercises and treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shoulder Arthritis – Symptoms, Exercises & Treatment" />
      <meta name="twitter:description" content="UK guide to shoulder arthritis: exercises, injections and surgery." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Shoulder Arthritis" }]} />

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
              Shoulder Arthritis
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/shoulder-arthritis" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shoulder arthritis is less common than knee or hand OA but more disabling for daily tasks like dressing, washing hair and reaching overhead. This UK guide covers the three main types, the exercises that help, and when shoulder replacement is the right answer.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Shoulder arthritis at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="700" suffix="K" label="UK adults affected" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="60" suffix="+" label="Typical age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="3" label="Joint sites (GH, AC, cuff)" icon={<Move className="w-6 h-6" />} color="amber" />
            <StatCounter value="90" suffix="%" label="Replacement satisfaction at 5 yrs" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What is shoulder arthritis?">
          <p>"Shoulder arthritis" usually means one of three things:</p>
          <ul>
            <li><strong>Glenohumeral OA</strong> — wear of the main ball-and-socket joint between the upper arm and shoulder blade</li>
            <li><strong>AC joint OA</strong> — wear of the small acromioclavicular joint at the top of the shoulder, often felt as a pinpoint pain</li>
            <li><strong>Rotator cuff arthropathy</strong> — arthritis that develops after a long-standing rotator cuff tear, with the head of the humerus migrating upwards</li>
          </ul>
          <p>Each pattern has slightly different symptoms and treatment, so accurate diagnosis (usually X-ray + clinical exam) matters.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms of shoulder arthritis?">
          <ul>
            <li><strong>Deep shoulder ache</strong> — worse with movement, often felt at the back of the joint</li>
            <li><strong>Night pain</strong> — particularly lying on the affected side</li>
            <li><strong>Loss of reach</strong> — overhead, behind the back (bra strap, back pocket), or across the body</li>
            <li><strong>Crepitus</strong> — grinding or clunking when rotating the arm</li>
            <li><strong>Weakness</strong> — particularly with rotator cuff arthropathy; difficulty lifting a kettle</li>
            <li><strong>Stiffness</strong> — gradual loss of range, especially external rotation</li>
          </ul>
        </Section>

        <Section icon={Heart} title="What causes shoulder arthritis?">
          <ul>
            <li><strong>Age</strong> — most cases develop after 60</li>
            <li><strong>Previous dislocation or fracture</strong> — single biggest risk factor; can cause arthritis 10–20 years later</li>
            <li><strong>Rotator cuff tears</strong> — long-standing tears destabilise the joint and cause secondary arthritis</li>
            <li><strong>Overhead occupation or sport</strong> — painters, decorators, throwing athletes, swimmers</li>
            <li><strong>Inflammatory arthritis</strong> — rheumatoid and psoriatic arthritis can target the shoulder</li>
            <li><strong>Avascular necrosis</strong> — loss of blood supply to the humeral head, sometimes after steroid use or fracture</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily tasks most affected</h3>
          <HorizontalBar items={[
            { label: "Reaching overhead (cupboards)", value: 86, color: "hsl(var(--primary))" },
            { label: "Sleeping on the shoulder", value: 78, color: "hsl(var(--amber))" },
            { label: "Reaching behind the back", value: 70, color: "hsl(var(--sky))" },
            { label: "Washing or drying hair", value: 58, color: "hsl(var(--violet))" },
            { label: "Driving (gear stick / belt)", value: 42, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="What are the best exercises for shoulder arthritis?">
          <p>The aim is to maintain range of motion and rotator cuff strength <em>without</em> impinging the joint. Avoid heavy overhead pressing.</p>
          <h3>Range of motion</h3>
          <ul>
            <li><strong>Pendulum swings</strong> — lean forwards, let the arm hang and swing in small circles. 60 seconds, 2–3× a day.</li>
            <li><strong>Doorway stretch</strong> — forearms on the door frame, gentle lean forwards. Hold 30 seconds.</li>
            <li><strong>Wand-assisted external rotation</strong> — use a broom handle to gently rotate the affected arm outwards.</li>
          </ul>
          <h3>Rotator cuff strength</h3>
          <ul>
            <li><strong>Banded external rotation</strong> — elbow tucked at the side, rotate against light resistance. 2 sets of 12.</li>
            <li><strong>Scapular squeezes</strong> — pull shoulder blades back and down, hold 5 seconds. 10 reps.</li>
            <li><strong>Wall slides</strong> — forearms on the wall, slide upwards within a pain-free range.</li>
          </ul>
          <p><strong>Avoid:</strong> military press, behind-the-neck pulldowns, upright rows, and heavy bench press — all increase impingement risk.</p>
        </Section>

        <Section icon={Apple} title="What diet and lifestyle changes help shoulder arthritis?">
          <p>The same anti-inflammatory eating pattern that helps every form of arthritis applies — see our <Link to="/diet" className="text-primary underline">Diet Hub</Link>. For shoulders specifically:</p>
          <ul>
            <li>Sleep position matters — try lying on the unaffected side with a pillow hugged to the chest to support the painful arm</li>
            <li>Posture work helps: rounded upper-back posture worsens impingement</li>
            <li>Stop smoking — nicotine reduces rotator cuff blood flow and worsens healing</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily shoulder-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="🪢" title="Mobility" description="Pendulums morning & evening" />
            <EmojiCard emoji="🎯" title="Cuff strength" description="Banded rotation, 2× weekly" />
            <EmojiCard emoji="🛌" title="Sleep" description="Off the painful side" />
            <EmojiCard emoji="♨️" title="Heat" description="10 min before exercise" />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is shoulder arthritis treated?">
          <h3>Self-management</h3>
          <ul>
            <li>Daily mobility and cuff routine (above)</li>
            <li>Activity modification — switch to underarm carrying, lower shelves</li>
            <li>Heat before activity, ice after</li>
            <li>Sleep posture adjustments</li>
          </ul>
          <h3>Medical treatments</h3>
          <ul>
            <li><strong>Paracetamol & oral NSAIDs</strong> — short courses for flares</li>
            <li><strong>Physiotherapy</strong> — supervised programme; the single most cost-effective intervention</li>
            <li><strong>Corticosteroid injection</strong> — into the glenohumeral joint, AC joint or subacromial space depending on diagnosis; usually 6–12 weeks of relief</li>
            <li><strong>Hydrodilatation</strong> — sometimes used where stiffness dominates</li>
          </ul>
          <h3>Surgery</h3>
          <p><strong>Reverse total shoulder replacement</strong> is now the most common option in the UK, particularly when there's a rotator cuff tear. <strong>Anatomical total shoulder replacement</strong> is preferred when the cuff is intact. Around 90% of patients report good function and pain relief at 5 years.</p>
        </Section>

        <ConditionBlogStrip
          conditionName="Shoulder arthritis"
          matchCategories={["Exercise", "Treatment"]}
        />

        <ConditionSubpageLinks conditionSlug="shoulder-arthritis" conditionName="Shoulder Arthritis" />

        <ContextualLinks
          heading="Pair shoulder care with the right resources"
          intro="Use these guides alongside your treatment — exercises, diet and related conditions."
          groups={[
            {
              title: "Exercises & movement",
              links: [
                { label: "Shoulder & upper-body exercises", to: "/exercises" },
                { label: "Tai Chi for balance", to: "/exercises/tai-chi-for-balance" },
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
          <CrossLinkBanner preset="condition" exclude="/conditions/shoulder-arthritis" title="Explore related resources" />
        </div>
      </main>
      <div className="container mx-auto px-5 md:px-10 max-w-3xl pb-8">
        <EducationalDisclaimerBox lastReviewed="2026-09-16" />
        <TopicClusterNav path="/conditions/shoulder-arthritis" />
      </div>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default ShoulderArthritis;
