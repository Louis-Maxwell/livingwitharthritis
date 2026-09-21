import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, Users, TrendingUp, Timer, Footprints } from "lucide-react";
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
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/foot-and-ankle-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Foot & Ankle Arthritis – Symptoms, Footwear & Exercises | Living With Arthritis",
  "description": "UK guide to foot and ankle arthritis: big toe (hallux rigidus), midfoot and ankle osteoarthritis, rheumatoid foot involvement, footwear, orthotics, gentle exercises and when to see a GP or podiatrist.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2026-09-21",
  "dateModified": "2026-09-21",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Foot and Ankle Arthritis",
    "alternateName": ["Ankle Osteoarthritis", "Hallux Rigidus", "Midfoot Arthritis", "Rheumatoid Foot"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Ankle, midfoot and first metatarsophalangeal (big toe) joints" },
    "riskFactor": ["Previous ankle fracture or severe sprain", "Age over 50", "Rheumatoid or psoriatic arthritis", "Repetitive impact or poorly fitting footwear"],
    "signOrSymptom": ["Pain with every step", "Morning stiffness in the ankle or big toe", "Swelling around the ankle or midfoot", "Reduced push-off when walking", "Difficulty finding comfortable shoes"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Supportive footwear and rocker soles" },
      { "@type": "MedicalTherapy", "name": "Podiatry and custom orthotics" },
      { "@type": "MedicalTherapy", "name": "Physiotherapy and graded ankle exercises" },
      { "@type": "MedicalTherapy", "name": "Corticosteroid injection or joint fusion/replacement" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What are the first signs of foot or ankle arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Early signs include morning stiffness in the ankle or big toe, a deep ache with the first steps of the day, swelling around the joint after walking, and shoes that suddenly feel tight over a bony bump on top of the big toe joint." } },
    { "@type": "Question", "name": "What is the best footwear for foot arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Look for a wide, deep toe box, a firm heel counter, cushioned sole, low heel (under 2.5 cm) and adjustable fastenings. For big toe arthritis, a stiff or rocker sole reduces bending at the painful joint. Removable insoles leave room for orthotics." } },
    { "@type": "Question", "name": "What exercises help ankle arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Daily ankle circles, alphabet tracing with the big toe, towel scrunches, gentle calf raises and single-leg balance near a counter maintain mobility and stability. Stop short of sharp pain and warm the foot first. See our ankle arthritis exercises guide for a full routine." } },
    { "@type": "Question", "name": "Can NHS podiatry help with foot arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Ask your GP for a podiatry referral, or self-refer where your area allows it. Podiatrists assess biomechanics, advise on footwear and can prescribe custom orthotics that redistribute pressure away from painful joints." } },
    { "@type": "Question", "name": "When should I see a GP about foot or ankle pain?", "acceptedAnswer": { "@type": "Answer", "text": "Book an appointment if pain lasts more than a few weeks, limits walking, comes with warm swelling or deformity, or follows an old fracture. Seek urgent care for a hot, red, swollen joint with fever — that can be infection or acute crystal arthritis." } }
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

const FootAndAnkleArthritis = () => (
  <>
    <Helmet>
      <title>Foot &amp; Ankle Arthritis UK: Symptoms, Footwear &amp; Exercises | LWA UK</title>
      <meta name="description" content="UK guide to foot and ankle arthritis: hallux rigidus, midfoot and ankle OA, rheumatoid feet, footwear, orthotics, exercises and when to see a GP." />
      <meta name="keywords" content="foot arthritis, ankle arthritis, hallux rigidus, big toe arthritis, midfoot arthritis, ankle osteoarthritis, rheumatoid foot, arthritis footwear UK, ankle exercises arthritis" />
      <meta property="og:title" content="Foot &amp; Ankle Arthritis – Symptoms, Footwear &amp; Exercises" />
      <meta property="og:description" content="Evidence-based UK guide to foot and ankle arthritis: footwear, orthotics, exercises and NHS pathways." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Foot and ankle arthritis – symptoms, footwear and exercises guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Foot &amp; Ankle Arthritis – Symptoms &amp; Footwear" />
      <meta name="twitter:description" content="UK guide to foot and ankle arthritis: footwear, orthotics, exercises and when to see a GP." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <link rel="canonical" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Foot & Ankle Arthritis" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Footprints className="w-3 h-3" /> Joint-specific guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Foot &amp; Ankle Arthritis
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/foot-and-ankle-arthritis" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each foot has dozens of joints, so arthritis here changes every step — from a stiff big toe that blocks push-off to deep ankle ache after an old fracture. This UK educational guide covers the common patterns, footwear and orthotics that help, gentle exercises, and how NHS podiatry and physiotherapy fit in. It is not a diagnosis.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <AnswerBox
          question="What helps foot and ankle arthritis most day to day?"
          reviewed="2026-09-21"
        >
          <p>
            Most people do best with a combination of <strong>supportive footwear</strong> (wide toe box, cushioned or rocker sole),
            {" "}daily <strong>gentle range-of-motion and balance work</strong>, and — where needed —{" "}
            <strong>podiatry orthotics</strong> plus activity pacing. Topical NSAID gel, heat before walking and rest after flares
            settle many symptoms. See a GP or podiatrist if pain limits walking for weeks or a joint is hot and swollen.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="September 2026" />
      </section>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Foot &amp; ankle at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="33" label="Joints in each foot" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="50" suffix="+" label="Typical age for big-toe OA" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="90" suffix="%" label="RA patients develop foot problems" icon={<Footprints className="w-6 h-6" />} color="amber" />
            <StatCounter value="1" label="Pair of shoes can change daily pain" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="Common types of foot and ankle arthritis">
          <ul>
            <li><strong>Big toe arthritis (hallux rigidus)</strong> — the most common foot osteoarthritis. The big toe stiffens and hurts when you push off; a bony bump often appears on top of the joint.</li>
            <li><strong>Midfoot arthritis</strong> — deep ache across the top of the foot, worse on uneven ground or after previous injury.</li>
            <li><strong>Ankle osteoarthritis</strong> — less common than knee or hip OA but often disabling; many cases follow an old fracture, dislocation or repeated severe sprain.</li>
            <li><strong>Rheumatoid or psoriatic arthritis in the feet</strong> — small toe joints, ball-of-foot pain, swelling and deformity; footwear and early rheumatology care matter.</li>
          </ul>
          <p>Gout also loves the big toe — see our <Link to="/conditions/gout" className="text-primary underline">gout guide</Link> if flares are sudden, hot and intensely painful.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms?">
          <ul>
            <li><strong>Pain with every step</strong> — or a deep ache that builds after walking</li>
            <li><strong>Morning stiffness</strong> — brief in osteoarthritis, often longer in inflammatory arthritis</li>
            <li><strong>Swelling</strong> — around the ankle, midfoot or big toe joint</li>
            <li><strong>Reduced push-off</strong> — especially with hallux rigidus</li>
            <li><strong>Instability or fear of falling</strong> — stiff, painful ankles alter balance (see our <Link to="/guides/fall-prevention-older-adults" className="text-primary underline">falls prevention guide</Link>)</li>
            <li><strong>Shoe struggle</strong> — standard footwear presses on bony bumps or swollen toes</li>
          </ul>
        </Section>

        <Section icon={Heart} title="What causes it?">
          <ul>
            <li><strong>Previous injury</strong> — ankle fractures and severe sprains are the leading risk for ankle OA</li>
            <li><strong>Age and cumulative load</strong> — cartilage wear in the big toe and midfoot after 50</li>
            <li><strong>Inflammatory disease</strong> — rheumatoid and psoriatic arthritis frequently involve the feet</li>
            <li><strong>Biomechanics and footwear</strong> — high heels, narrow toe boxes and uncorrected flat or high-arch patterns</li>
            <li><strong>Family history</strong> — especially for hallux rigidus and Heberden-like patterns in the toes</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily tasks most affected</h3>
          <HorizontalBar items={[
            { label: "Walking on uneven ground", value: 84, color: "hsl(var(--primary))" },
            { label: "Standing for long periods", value: 78, color: "hsl(var(--amber))" },
            { label: "Finding comfortable shoes", value: 72, color: "hsl(var(--sky))" },
            { label: "Climbing stairs", value: 61, color: "hsl(var(--violet))" },
            { label: "Getting going after sitting", value: 55, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="What are the best exercises?">
          <p>Keep the ankle and toes moving within a comfortable range. Warm the foot in a basin of warm water for 10 minutes first. Full routine: <Link to="/exercises/ankle-arthritis-exercises" className="text-primary underline">ankle arthritis exercises</Link>.</p>
          <h3>Range of motion</h3>
          <ul>
            <li><strong>Ankle circles</strong> — 10 each way, both feet</li>
            <li><strong>Alphabet tracing</strong> — write letters in the air with your big toe</li>
            <li><strong>Toe spreads and towel scrunches</strong> — strengthen intrinsic foot muscles</li>
          </ul>
          <h3>Strength and balance</h3>
          <ul>
            <li><strong>Heel raises</strong> — hold a counter, rise onto toes, lower slowly. Build to 2 sets of 10–15</li>
            <li><strong>Band dorsiflexion</strong> — pull toes toward you against a light band</li>
            <li><strong>Single-leg stance</strong> — near a wall; progress toward 30 seconds each side</li>
          </ul>
          <p><strong>Avoid:</strong> high-impact jumping, barefoot walking on hard floors during flares, and forcing a painful big toe into deep bend.</p>
        </Section>

        <Section icon={Apple} title="Footwear, orthotics and lifestyle">
          <ul>
            <li><strong>Wide, deep toe box</strong> and adjustable fastenings for day-to-day swelling</li>
            <li><strong>Rocker or stiff sole</strong> for big toe arthritis to reduce joint bend at push-off</li>
            <li><strong>Removable insoles</strong> so NHS or private orthotics can fit</li>
            <li><strong>Low heel</strong> — under about 2.5 cm reduces forefoot pressure</li>
            <li>Pair footwear changes with the same anti-inflammatory pattern in our <Link to="/diet" className="text-primary underline">Diet Hub</Link></li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily foot-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="👟" title="Footwear" description="Wide toe box, grip sole, low heel." />
            <EmojiCard emoji="🔄" title="Mobility" description="Ankle circles and toe work daily." />
            <EmojiCard emoji="⚖️" title="Balance" description="Brief single-leg practice near a counter." />
            <EmojiCard emoji="♨️" title="Warm-up" description="Warm soak before the first walk." />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is it treated in the UK?">
          <h3>Self-management</h3>
          <ul>
            <li>Supportive shoes and activity pacing</li>
            <li>Daily mobility and balance routine</li>
            <li>Topical NSAID gel around the painful joint if suitable for you</li>
            <li>Heat before activity; short ice packs after a flare</li>
          </ul>
          <h3>NHS pathway</h3>
          <ul>
            <li><strong>GP</strong> — assessment, X-rays or blood tests when inflammatory disease is possible</li>
            <li><strong>Podiatry</strong> — biomechanics, orthotics, footwear advice</li>
            <li><strong>Physiotherapy</strong> — graded loading and balance (self-referral in many areas)</li>
            <li><strong>Orthopaedics</strong> — injections, fusion or replacement when conservative care is not enough</li>
            <li><strong>Rheumatology</strong> — if RA, PsA or other inflammatory disease is suspected</li>
          </ul>
          <p>If referrals are delayed, our <Link to="/arthritis-waiting-list-help" className="text-primary underline">waiting-list help guide</Link> covers what you can do meanwhile.</p>
        </Section>

        <Section icon={Activity} title="When should you see your GP?">
          <ul>
            <li>Foot or ankle pain lasting more than a few weeks</li>
            <li>Warm, red or markedly swollen joint</li>
            <li>New deformity, ulcers, or numbness in people with diabetes</li>
            <li>Falls or near-falls linked to unstable ankles</li>
            <li>Known inflammatory arthritis with a new foot flare</li>
          </ul>
        </Section>

        <EducationalDisclaimerBox lastReviewed="2026-09-21" />

        <ArticleFaqSection
          faqs={faqLd.mainEntity.map((f) => ({
            question: f.name,
            answer: f.acceptedAnswer.text,
          }))}
        />

        <ConditionBlogStrip
          conditionName="Foot and ankle arthritis"
          matchCategories={["Exercise", "Treatment"]}
        />

        <ContextualLinks
          heading="Pair foot care with the right resources"
          intro="Use these guides alongside footwear and exercise changes."
          groups={[
            {
              title: "Exercises &amp; movement",
              links: [
                { label: "Ankle arthritis exercises", to: "/exercises/ankle-arthritis-exercises" },
                { label: "All exercise guides", to: "/exercises" },
                { label: "Tai chi for balance", to: "/exercises/tai-chi-for-balance" },
                { label: "Fall prevention", to: "/guides/fall-prevention-older-adults" },
              ],
            },
            {
              title: "Diet &amp; daily life",
              links: [
                { label: "Best diet for arthritis", to: "/diet" },
                { label: "Pain relief guide", to: "/guides/arthritis-pain-relief" },
                { label: "Best walking shoes (blog)", to: "/blog/best-walking-shoes-arthritis-uk" },
              ],
            },
            {
              title: "Related conditions",
              links: [
                { label: "Osteoarthritis (overview)", to: "/conditions/osteoarthritis" },
                { label: "Knee arthritis", to: "/conditions/knee-arthritis" },
                { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
                { label: "Gout", to: "/conditions/gout" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Managing flare-ups", to: "/arthritis-flare-ups" },
                { label: "Help while waiting for care", to: "/arthritis-waiting-list-help" },
                { label: "Disability support", to: "/guides/disability-support" },
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
            <Link to="/blog/foot-and-ankle-arthritis-uk" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read the detailed footwear article
            </Link>
          </div>
          <CrossLinkBanner preset="condition" exclude="/conditions/foot-and-ankle-arthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default FootAndAnkleArthritis;
