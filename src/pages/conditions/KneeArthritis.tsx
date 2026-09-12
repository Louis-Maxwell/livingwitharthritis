import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, Users, TrendingUp, Timer, Scale } from "lucide-react";
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
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/conditions/knee-arthritis`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Knee Arthritis – Symptoms, Exercises & Treatment | Living With Arthritis",
  "description": "UK guide to knee arthritis (osteoarthritis of the knee): symptoms, causes, best exercises, weight management, treatment options and when to consider knee replacement.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2026-05-13",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Knee Osteoarthritis",
    "alternateName": ["Knee OA", "Knee Arthritis", "Tibiofemoral Osteoarthritis"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Knee joint (tibiofemoral and patellofemoral compartments)" },
    "riskFactor": ["Age over 50", "Obesity", "Previous meniscus or ACL injury", "Female sex", "Occupational kneeling"],
    "signOrSymptom": ["Knee pain on stairs", "Morning stiffness", "Swelling", "Crepitus", "Giving way"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Quadriceps strengthening" },
      { "@type": "MedicalTherapy", "name": "Weight loss" },
      { "@type": "MedicalTherapy", "name": "Topical NSAIDs" },
      { "@type": "MedicalTherapy", "name": "Total knee replacement" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What does knee arthritis feel like?", "acceptedAnswer": { "@type": "Answer", "text": "Most people describe a deep ache around the kneecap or inner knee that worsens going up or down stairs, kneeling, or after long periods of sitting. Morning stiffness usually eases within 30 minutes of moving." } },
    { "@type": "Question", "name": "What is the best exercise for knee arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Quadriceps strengthening (straight-leg raises, wall sits) combined with low-impact cardio such as cycling, swimming or walking is the most evidence-based approach. NICE recommends exercise as a core treatment for everyone with knee OA." } },
    { "@type": "Question", "name": "Should I keep walking with knee arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Regular walking strengthens the muscles that protect the joint and reduces pain over time. Build up gradually, wear cushioned shoes, and use walking poles if needed." } },
    { "@type": "Question", "name": "When is a knee replacement needed?", "acceptedAnswer": { "@type": "Answer", "text": "Knee replacement is usually considered when pain disturbs sleep, severely limits daily activity, and conservative measures (exercise, weight management, painkillers, injections) have not worked over several months." } },
    { "@type": "Question", "name": "Does losing weight help knee arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — every pound of body weight transmits roughly four pounds of force through the knee. Studies show a 5–10% weight loss can significantly reduce pain and improve function." } }
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

const KneeArthritis = () => (
  <>
    <Helmet>
      <title>Knee Arthritis in the UK: Symptoms & Exercises | Living With Arthritis</title>
      <meta name="description" content="Knee arthritis symptoms, treatment & exercises: Pain relief strategies, exercises & when to see a specialist. Complete management guide." />
      <meta name="keywords" content="knee arthritis, knee osteoarthritis, knee OA, knee pain, arthritic knee, knee arthritis exercises, knee arthritis treatment, knee replacement, quadriceps exercises, NICE knee osteoarthritis" />
      <meta property="og:title" content="Knee Arthritis – Symptoms, Exercises & Treatment" />
      <meta property="og:description" content="Knee arthritis symptoms, treatment & exercises: Pain relief strategies, exercises & when to see a specialist. Complete management guide." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Knee arthritis – symptoms, exercises and treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Knee Arthritis – Symptoms, Exercises & Treatment" />
      <meta name="twitter:description" content="Knee arthritis symptoms, treatment & exercises: Pain relief strategies, exercises & when to see a specialist. Complete management guide." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Knee Arthritis" }]} />

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
              Knee Arthritis
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/knee-arthritis" />
            <p className="speakable-intro text-lg text-muted-foreground leading-relaxed">
              The knee is the most commonly affected joint in osteoarthritis. This guide covers what knee arthritis feels like, the exercises that help most, and the treatment ladder used in the UK — from self-management through to knee replacement.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <AnswerBox
          question="What is the best treatment for knee arthritis?"
          reviewed="2026-06-13"
        >
          <p>
            UK NICE guidance ranks <strong>quadriceps strengthening</strong> and
            <strong> weight loss</strong> as the most effective treatments for knee osteoarthritis,
            cutting pain by around 50%. Add topical NSAID gel for daily pain, oral NSAIDs for
            flares, and a steroid injection if needed. Knee replacement is highly successful
            but reserved for severe pain that limits daily life after non-surgical options have
            been tried.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />
      </section>

      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Knee arthritis at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="4.11" suffix="M" label="UK adults with knee OA" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="45" suffix="+" label="Typical age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="4" suffix="×" label="Force per lb of body weight" icon={<Scale className="w-6 h-6" />} color="amber" />
            <StatCounter value="50" suffix="%" label="Pain drop with strength training" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What is knee arthritis?">
          <p>Knee arthritis is the gradual wearing down of the cartilage that lines the knee joint. The knee has three compartments — medial (inside), lateral (outside) and patellofemoral (under the kneecap) — and arthritis can affect any combination of them.</p>
          <p>As cartilage thins, the bones underneath thicken, small bony spurs (osteophytes) form, and the lining of the joint can become inflamed. This produces the familiar mix of pain, stiffness and swelling.</p>
          <h3>How common is it in the UK?</h3>
          <p>Around <strong>4.11 million</strong> people in the UK live with knee osteoarthritis, making it the single most common cause of mobility loss in older adults.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms of knee arthritis?">
          <ul>
            <li><strong>Pain on stairs</strong> — particularly going downstairs, when load on the patellofemoral joint peaks</li>
            <li><strong>Morning stiffness</strong> — usually under 30 minutes; longer suggests inflammatory arthritis</li>
            <li><strong>Swelling</strong> — a "boggy" feeling around the kneecap, often worse after activity</li>
            <li><strong>Crepitus</strong> — grinding or clicking when bending the knee</li>
            <li><strong>Giving way</strong> — the knee buckles momentarily, usually because the quadriceps have weakened</li>
            <li><strong>Reduced range</strong> — difficulty fully straightening or bending the knee</li>
          </ul>
        </Section>

        <Section icon={Heart} title="What causes knee arthritis?">
          <ul>
            <li><strong>Age</strong> — most cases develop after 45</li>
            <li><strong>Body weight</strong> — every extra pound transmits ~4 lb of force through the knee</li>
            <li><strong>Previous injury</strong> — meniscus tears, ACL ruptures and fractures multiply risk 3–6×</li>
            <li><strong>Occupation</strong> — repeated kneeling, squatting or heavy lifting (carpet fitters, tilers, farmers)</li>
            <li><strong>Sex</strong> — women are roughly 1.5× more likely to develop knee OA after menopause</li>
            <li><strong>Alignment</strong> — bow-legs (varus) load the medial compartment; knock-knees (valgus) load the lateral</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Symptom impact (typical patient survey)</h3>
          <HorizontalBar items={[
            { label: "Pain on stairs", value: 88, color: "hsl(var(--primary))" },
            { label: "Morning stiffness", value: 76, color: "hsl(var(--amber))" },
            { label: "Swelling after activity", value: 64, color: "hsl(var(--sky))" },
            { label: "Sleep disturbance", value: 52, color: "hsl(var(--violet))" },
            { label: "Giving way", value: 38, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="What are the best exercises for knee arthritis?">
          <p>NICE lists exercise as a <strong>core treatment</strong> for everyone with knee OA — not optional. The most effective programmes combine quadriceps strengthening with low-impact aerobic work.</p>
          <h3>Strengthening</h3>
          <ul>
            <li><strong>Straight-leg raises</strong> — the safest way to load the quadriceps without bending the knee. 3 sets of 10, daily.</li>
            <li><strong>Wall sits</strong> — start at 10 seconds, build to 60. Stop above 90° of knee bend if painful.</li>
            <li><strong>Step-ups</strong> — onto a low step, controlling the lowering phase. 2 sets of 10 each leg.</li>
            <li><strong>Glute bridges</strong> — strong glutes reduce knee load by improving hip mechanics.</li>
          </ul>
          <h3>Low-impact cardio</h3>
          <ul>
            <li><strong>Stationary cycling</strong> — set the saddle high enough that the knee is almost straight at the bottom</li>
            <li><strong>Swimming or aqua-aerobics</strong> — buoyancy removes 70–90% of body weight from the joint</li>
            <li><strong>Walking</strong> — start with 10-minute blocks, build to 30; cushioned shoes only</li>
          </ul>
        </Section>

        <Section icon={Apple} title="What diet helps knee arthritis?">
          <p>Weight loss is the single most powerful non-surgical treatment for knee arthritis. A 5% reduction in body weight typically delivers a 20–30% drop in knee pain. Pair calorie control with the Mediterranean pattern covered in our <Link to="/diet" className="text-primary underline">Diet Hub</Link>:</p>
          <ul>
            <li>Oily fish twice a week (salmon, mackerel, sardines)</li>
            <li>Plenty of vegetables, berries, nuts, olive oil and whole grains</li>
            <li>Limit ultra-processed food, sugary drinks and excess alcohol</li>
          </ul>
        </Section>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily knee-care checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="🦵" title="Strength" description="Straight-leg raises and wall sits — start small, build slowly." />
            <EmojiCard emoji="🚴" title="Cycle" description="Cycling is easier on the knee than running or jumping." />
            <EmojiCard emoji="⚖️" title="Weight" description="Losing 5% of body weight often eases knee load a lot." />
            <EmojiCard emoji="🧊" title="Ice" description="Ten minutes after activity if the knee is warm or swollen." />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is knee arthritis treated?">
          <h3>Self-management</h3>
          <ul>
            <li>Daily strengthening programme</li>
            <li>Weight management</li>
            <li>Heat before activity, ice after</li>
            <li>Walking pole on the opposite side to offload the painful knee</li>
          </ul>
          <h3>Medical treatments</h3>
          <ul>
            <li><strong>Topical NSAIDs</strong> (ibuprofen or diclofenac gel) — first-line per NICE for knee OA</li>
            <li><strong>Oral NSAIDs / paracetamol</strong> — short courses where topical isn't enough</li>
            <li><strong>Corticosteroid injection</strong> — short-term flare relief, typically lasting 4–12 weeks</li>
            <li><strong>Physiotherapy</strong> — supervised exercise plus manual therapy</li>
          </ul>
          <h3>Surgery</h3>
          <p><strong>Total or partial knee replacement</strong> is considered when pain disturbs sleep, severely limits daily activity, and at least 3–6 months of conservative treatment has not worked. Around 100,000 knee replacements are performed in the UK each year, with 90%+ still functioning well at 15 years.</p>
        </Section>

        <ConditionBlogStrip
          conditionName="Knee arthritis"
          matchCategories={["Exercise", "Treatment", "Nutrition"]}
        />

        <ConditionSubpageLinks conditionSlug="knee-arthritis" conditionName="Knee Arthritis" />

        <ContextualLinks
          heading="Pair knee care with the right resources"
          intro="Use these guides alongside your treatment — exercises, diet and the wider osteoarthritis picture."
          groups={[
            {
              title: "Exercises & movement",
              links: [
                { label: "Knee-specific exercises", to: "/exercises" },
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
                { label: "Hand arthritis", to: "/conditions/hand-arthritis" },
                { label: "Shoulder arthritis", to: "/conditions/shoulder-arthritis" },
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
          
      <EducationalDisclaimerBox />
      <TopicClusterNav path="/conditions/knee-arthritis" />
<CrossLinkBanner preset="condition" exclude="/conditions/knee-arthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default KneeArthritis;
