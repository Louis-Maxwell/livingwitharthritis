import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, Users, TrendingUp, Timer, Scale, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import ConditionSubpageLinks from "@/components/ConditionSubpageLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";
import ArticleFaqSection from "@/components/article/ArticleFaqSection";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/hip-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Hip Arthritis – Symptoms, Exercises & Pain Relief | Living With Arthritis",
  "description": "UK guide to hip arthritis (osteoarthritis of the hip): symptoms, causes, best exercises, how to relieve hip pain while sleeping, treatment options and when to consider hip replacement.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-23",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Hip Osteoarthritis",
    "alternateName": ["Hip OA", "Hip Arthritis", "Coxarthrosis"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Hip joint (acetabulofemoral)" },
    "riskFactor": ["Age over 50", "Obesity", "Previous hip injury", "Hip dysplasia", "Occupational heavy lifting"],
    "signOrSymptom": ["Groin pain", "Stiffness after sitting", "Pain at night", "Reduced range of motion", "Limp"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Hip strengthening exercise" },
      { "@type": "MedicalTherapy", "name": "Weight loss" },
      { "@type": "MedicalTherapy", "name": "Topical and oral NSAIDs" },
      { "@type": "MedicalTherapy", "name": "Total hip replacement" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What does hip arthritis feel like?", "acceptedAnswer": { "@type": "Answer", "text": "Most people feel a deep ache in the groin or front of the hip that worsens with walking, standing up from a chair, or putting on socks. Stiffness is common after sitting and first thing in the morning, usually easing within 30 minutes of moving." } },
    { "@type": "Question", "name": "How do I relieve hip pain while sleeping?", "acceptedAnswer": { "@type": "Answer", "text": "Sleep on your back or on the unaffected side with a firm pillow between your knees to keep the hips aligned. A medium-firm mattress, a warm bath before bed, and a topical NSAID gel applied to the hip help reduce night pain. Avoid sleeping on the painful side and don't tuck your top knee in front of the bottom one — it twists the joint." } },
    { "@type": "Question", "name": "What is the best exercise for hip arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Glute and hip-abductor strengthening (bridges, clams, side-lying leg raises) combined with low-impact cardio such as cycling, swimming or pool walking is the most evidence-based approach. NICE recommends exercise as a core treatment for everyone with hip OA." } },
    { "@type": "Question", "name": "Should I keep walking with hip arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Regular walking strengthens the muscles that support the hip and reduces pain over time. Build up gradually, wear cushioned shoes, and use a walking pole in the hand opposite to the painful hip to offload the joint by up to 25%." } },
    { "@type": "Question", "name": "When is a hip replacement needed?", "acceptedAnswer": { "@type": "Answer", "text": "Hip replacement is usually considered when pain disturbs sleep, severely limits walking or daily activity, and conservative measures (exercise, weight management, painkillers, injections) have not worked over several months. UK outcomes are excellent — over 95% of hip replacements still function well at 10 years." } },
    { "@type": "Question", "name": "Does losing weight help hip arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The hip carries roughly three times body weight when walking and up to five times when climbing stairs, so even small weight loss meaningfully reduces joint load and pain." } },
    /* DRAFT — added 2026-07-28, NOT yet clinically reviewed. Flagging for
       the site's clinical reviewer before this is treated as reviewed
       content; do not update LAST_REVIEWED_ISO/reviewer badge for this
       page until it's been checked. */
    { "@type": "Question", "name": "Can hip arthritis cause pain down the leg?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — this is a well-recognised pattern called referred pain. Hip arthritis pain often radiates to the groin, the front or side of the thigh, and sometimes as far as the knee, because the hip joint shares nerve pathways with these areas. This can make it feel like the problem is in your leg or knee rather than your hip, which is one reason hip arthritis is sometimes initially misdiagnosed. Pain that's worse with weight-bearing or walking, combined with stiffness after rest, points more toward the hip as the true source." } }
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

const HipArthritis = () => (
  <>
    <Helmet>
      <title>Hip Arthritis: Symptoms, Exercises & Relief | UK</title>
      <meta name="description" content="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
      <meta name="keywords" content="hip arthritis, hip osteoarthritis, hip OA, hip pain, how to relieve hip pain while sleeping, hip arthritis exercises, hip arthritis treatment, hip replacement, glute exercises hip" />
      <meta property="og:title" content="Hip Arthritis – Symptoms, Exercises & Pain Relief" />
      <meta property="og:description" content="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hip arthritis – symptoms, exercises and treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hip Arthritis – Symptoms, Exercises & Pain Relief" />
      <meta name="twitter:description" content="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Hip Arthritis" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Activity className="w-3 h-3" /> Joint-specific guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Hip Arthritis
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/hip-arthritis" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hip osteoarthritis is one of the most common causes of groin and outer-hip pain in adults over 45. This guide covers what hip arthritis feels like, the exercises that help most, how to sleep without flaring it up, and the UK treatment ladder — from self-management through to hip replacement.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <AnswerBox
          question="What is the best treatment for hip arthritis?"
          reviewed="2026-06-23"
        >
          <p>
            UK NICE guidance ranks <strong>hip strengthening exercise</strong> and
            <strong> weight loss</strong> as the most effective treatments for hip osteoarthritis,
            cutting pain by around 40–50%. Add topical NSAID gel or oral NSAIDs for flares,
            a steroid injection if needed, and a walking pole in the opposite hand to offload
            the joint. Total hip replacement is one of the most successful operations in
            medicine — reserved for severe pain that limits daily life after non-surgical
            options have been tried.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />
      </section>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Hip arthritis at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="3.2" suffix="M" label="UK adults with hip OA" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="45" suffix="+" label="Typical age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="3" suffix="Ã—" label="Body weight through hip when walking" icon={<Scale className="w-6 h-6" />} color="amber" />
            <StatCounter value="95" suffix="%" label="Hip replacements lasting 10+ yrs" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What is hip arthritis?">
          <p>Hip arthritis is the gradual wearing down of the cartilage lining the ball-and-socket hip joint (the femoral head and acetabulum). As cartilage thins, the bones underneath thicken, small bony spurs (osteophytes) form, and the joint capsule can become inflamed — producing the familiar mix of groin pain, stiffness and reduced range of motion.</p>
          <h3>How common is it in the UK?</h3>
          <p>Around <strong>3.2 million</strong> people in the UK live with hip osteoarthritis. Roughly 100,000 hip replacements are performed each year through the UK healthcare system and private sector combined.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms of hip arthritis?">
          <ul>
            <li><strong>Groin or front-of-thigh pain</strong> — the most reliable sign; pain felt only on the outside of the hip is more often bursitis or gluteal tendinopathy</li>
            <li><strong>Stiffness after sitting</strong> — the "movie-theatre sign" of having to walk a few stiff steps after standing up</li>
            <li><strong>Difficulty with socks and shoes</strong> — reduced hip flexion and internal rotation make foot care harder</li>
            <li><strong>Night pain</strong> — aching that wakes you up, especially when lying on the affected side</li>
            <li><strong>Limp</strong> — a shortened stance phase on the painful leg</li>
            <li><strong>Reduced walking distance</strong> — a gradual drop in how far you can comfortably walk</li>
          </ul>
        </Section>

        <Section icon={Heart} title="What causes hip arthritis?">
          <ul>
            <li><strong>Age</strong> — most cases develop after 45</li>
            <li><strong>Body weight</strong> — the hip carries 3Ã— body weight when walking and up to 5Ã— when climbing stairs</li>
            <li><strong>Previous hip injury</strong> — fractures, labral tears and dislocations multiply risk</li>
            <li><strong>Hip dysplasia or impingement (FAI)</strong> — abnormal joint shape concentrates load on a small area of cartilage</li>
            <li><strong>Occupation</strong> — heavy lifting, prolonged standing and farming</li>
            <li><strong>Genetics</strong> — strong family history increases risk roughly 2Ã—</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Symptom impact (typical patient survey)</h3>
          <HorizontalBar items={[
            { label: "Groin pain on walking", value: 86, color: "hsl(var(--primary))" },
            { label: "Stiffness after sitting", value: 78, color: "hsl(var(--amber))" },
            { label: "Sleep disturbance", value: 64, color: "hsl(var(--sky))" },
            { label: "Difficulty with socks/shoes", value: 58, color: "hsl(var(--violet))" },
            { label: "Limp", value: 41, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="What are the best exercises for hip arthritis?">
          <p>NICE lists exercise as a <strong>core treatment</strong> for everyone with hip OA — not optional. The most effective programmes combine glute and hip-abductor strengthening with low-impact aerobic work.</p>
          <h3>Strengthening</h3>
          <ul>
            <li><strong>Glute bridges</strong> — 3 sets of 10, daily. Builds the hip extensors that protect the joint.</li>
            <li><strong>Side-lying leg raises</strong> — strengthens gluteus medius, the key hip-stabiliser.</li>
            <li><strong>Clams</strong> — knees bent, lift the top knee against a band. Targets external rotators.</li>
            <li><strong>Sit-to-stand</strong> — from a kitchen chair, hands off. Builds quad and glute strength in one move.</li>
          </ul>
          <h3>Low-impact cardio</h3>
          <ul>
            <li><strong>Stationary cycling</strong> — raise the saddle so the hip never bends past 90°</li>
            <li><strong>Swimming or aqua-aerobics</strong> — buoyancy removes 70–90% of body weight from the joint; avoid breaststroke kick if it provokes groin pain</li>
            <li><strong>Walking</strong> — start with 10-minute blocks, build to 30; cushioned shoes and a pole in the opposite hand</li>
          </ul>
          <p>For a step-by-step home routine, follow our <Link to="/guides/hip-exercises-for-osteoarthritis" className="text-primary underline">8-move hip osteoarthritis exercise guide</Link>, or pair this page with our <Link to="/exercises" className="text-primary underline">exercise library</Link> for video-guided sessions.</p>
        </Section>

        <Section icon={Moon} title="How to relieve hip pain while sleeping">
          <p>Night pain is one of the most disabling parts of hip arthritis. Small changes to position and surface make a big difference:</p>
          <ul>
            <li><strong>Sleep on your back</strong> with a pillow under the knees to take tension off the hip flexors</li>
            <li><strong>If you side-sleep</strong>, lie on the unaffected side with a firm pillow between the knees so the top leg doesn't drop across the body and twist the painful hip</li>
            <li><strong>Avoid the painful side</strong> — direct pressure on an arthritic hip almost always worsens night pain</li>
            <li><strong>Mattress</strong> — a medium-firm mattress (or a memory-foam topper on a too-firm bed) reduces pressure points</li>
            <li><strong>Pre-bed routine</strong> — a warm bath or shower for 10 minutes plus topical NSAID gel applied to the hip 30 minutes before bed</li>
            <li><strong>Stay warm</strong> — a cold joint stiffens overnight; an extra layer or heated underblanket helps</li>
          </ul>
          <p>If pain still wakes you most nights despite these changes, ask your GP about a short course of oral NSAIDs or a hip injection. Persistent night pain is also one of the clearest signals it's time to discuss <Link to="/conditions/hip-arthritis" className="text-primary underline">surgical options</Link>.</p>
        </Section>

        <Section icon={Apple} title="What diet helps hip arthritis?">
          <p>Weight loss is the single most powerful non-surgical treatment for hip arthritis. A 5% reduction in body weight typically delivers a 20–30% drop in hip pain. Pair calorie control with the Mediterranean pattern covered in our <Link to="/diet" className="text-primary underline">Diet Hub</Link>:</p>
          <ul>
            <li>Oily fish twice a week (salmon, mackerel, sardines)</li>
            <li>Plenty of vegetables, berries, nuts, olive oil and whole grains</li>
            <li>Limit ultra-processed food, sugary drinks and excess alcohol</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily hip-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="ðŸ‘" title="Glutes" description="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
            <EmojiCard emoji="ðŸš´" title="Cycle" description="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
            <EmojiCard emoji="âš–ï¸" title="Weight" description="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
            <EmojiCard emoji="ðŸ›ï¸" title="Sleep" description="Hip arthritis treatment: Exercise, mobility aids, injections & surgery options. Manage pain & maintain independence with evidence-based strategies." />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is hip arthritis treated?">
          <h3>Self-management</h3>
          <ul>
            <li>Daily glute and hip-abductor programme</li>
            <li>Weight management</li>
            <li>Heat before activity, ice after</li>
            <li>Walking pole in the hand opposite the painful hip — offloads the joint by ~25%</li>
          </ul>
          <h3>Medical treatments</h3>
          <ul>
            <li><strong>Topical NSAIDs</strong> (ibuprofen or diclofenac gel) — useful for surface ache</li>
            <li><strong>Oral NSAIDs / paracetamol</strong> — short courses where topical isn't enough</li>
            <li><strong>Intra-articular steroid injection</strong> — usually image-guided for the hip; relief typically lasts 4–12 weeks</li>
            <li><strong>Physiotherapy</strong> — supervised exercise plus manual therapy</li>
          </ul>
          <h3>Surgery</h3>
          <p><strong>Total hip replacement</strong> is considered when pain disturbs sleep, severely limits daily activity, and at least 3–6 months of conservative treatment has not worked. UK outcomes are excellent — over 95% of hip replacements are still functioning well at 10 years and around 85% at 20 years.</p>
        </Section>

        <ArticleFaqSection
          faqs={faqLd.mainEntity.map((f) => ({
            question: f.name,
            answer: f.acceptedAnswer.text,
          }))}
        />

        <ConditionBlogStrip
          conditionName="Hip arthritis"
          matchCategories={["Exercise", "Treatment", "Nutrition"]}
        />

        <ConditionSubpageLinks conditionSlug="hip-arthritis" conditionName="Hip Arthritis" />

        <ContextualLinks
          heading="Pair hip care with the right resources"
          intro="Use these guides alongside your treatment — exercises, diet and the wider osteoarthritis picture."
          groups={[
            {
              title: "Exercises & movement",
              links: [
                { label: "Hip exercises for osteoarthritis (8-move routine)", to: "/guides/hip-exercises-for-osteoarthritis" },
                { label: "Hip-specific exercise library", to: "/exercises" },
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
          <p className="text-muted-foreground mb-5">Start a chat or browse the Advice Hub for joint-specific articles.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Start a chat
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
          <CrossLinkBanner preset="condition" exclude="/conditions/hip-arthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default HipArthritis;
