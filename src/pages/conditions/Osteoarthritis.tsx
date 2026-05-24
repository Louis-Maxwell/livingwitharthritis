import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, BookOpen, ArrowRight, Users, TrendingUp, Timer, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import ReadNextCards from "@/components/ReadNextCards";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const BASE = "https://livingwitharthritis.org.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Osteoarthritis – Symptoms, Causes & Management | Living With Arthritis",
  "description": "Comprehensive guide to osteoarthritis (OA): symptoms, causes, risk factors, diagnosis, treatment options, exercises, diet and self-management tips for UK patients.",
  "url": `${BASE}/conditions/osteoarthritis`,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2025-12-15",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Osteoarthritis",
    "alternateName": ["OA", "Degenerative Joint Disease", "Wear and Tear Arthritis"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Synovial joints (knees, hips, hands, spine)" },
    "riskFactor": ["Age over 50", "Obesity", "Previous joint injury", "Female sex", "Genetics"],
    "signOrSymptom": ["Joint pain", "Stiffness", "Swelling", "Reduced range of motion", "Crepitus"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Physical therapy" },
      { "@type": "MedicalTherapy", "name": "Weight management" },
      { "@type": "MedicalTherapy", "name": "Low-impact exercise" },
      { "@type": "MedicalTherapy", "name": "Anti-inflammatory diet" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": `${BASE}/conditions/osteoarthritis`
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Conditions", "item": `${BASE}/#conditions` },
    { "@type": "ListItem", "position": 3, "name": "Osteoarthritis", "item": `${BASE}/conditions/osteoarthritis` }
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Osteoarthritis is the most common form of arthritis, a degenerative joint disease where the protective cartilage cushioning the ends of bones gradually wears down, causing pain, stiffness, and reduced mobility." } },
    { "@type": "Question", "name": "What causes osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "OA is caused by gradual cartilage breakdown. Risk factors include age over 50, obesity, previous joint injuries, genetics, repetitive joint stress, and female sex." } },
    { "@type": "Question", "name": "Can osteoarthritis be cured?", "acceptedAnswer": { "@type": "Answer", "text": "There is no cure for osteoarthritis, but symptoms can be effectively managed through exercise, weight management, physical therapy, anti-inflammatory diet, and medication." } },
    { "@type": "Question", "name": "What is the best exercise for osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Low-impact exercises like walking, swimming, cycling, and tai chi are recommended. Strength training and flexibility exercises also help support joints and reduce stiffness." } },
    { "@type": "Question", "name": "What foods help osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "An anti-inflammatory Mediterranean diet rich in oily fish, vegetables, olive oil, nuts, berries, and whole grains can help reduce inflammation and manage symptoms." } }
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

const Osteoarthritis = () => (
  <>
    <Helmet>
      <title>Osteoarthritis – Symptoms, Causes & Management | Living With Arthritis</title>
      <meta name="description" content="Everything you need to know about osteoarthritis: symptoms like joint pain and stiffness, causes, risk factors, best exercises, diet tips, and treatment options for UK patients." />
      <meta name="keywords" content="osteoarthritis, osteoarthritis symptoms, osteoarthritis treatment, osteoarthritis exercises, osteoarthritis diet, OA, degenerative joint disease, knee arthritis, hip arthritis, hand arthritis, joint pain relief, what causes arthritis, is arthritis curable, difference between osteoarthritis and rheumatoid arthritis, anti-inflammatory diet, arthritis medication, mobility aids for arthritis, musculoskeletal conditions" />
      <meta property="og:title" content="Osteoarthritis – Symptoms, Causes & Management" />
      <meta property="og:description" content="Comprehensive guide to osteoarthritis including symptoms, causes, exercises, diet and self-management for UK patients." />
      <meta property="og:url" content={`${BASE}/conditions/osteoarthritis`} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Osteoarthritis – Symptoms, Causes & Management guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Osteoarthritis – Symptoms, Causes & Management" />
      <meta name="twitter:description" content="Comprehensive guide to osteoarthritis for UK patients: symptoms, exercises, diet and treatment." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={`${BASE}/conditions/osteoarthritis`} />
      <link rel="alternate" hrefLang="en-GB" href={`${BASE}/conditions/osteoarthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Osteoarthritis" }]} />

      {/* Decorative hero header */}
      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12%" cy="35%" r="3" fill="hsl(var(--primary))" />
          <circle cx="78%" cy="20%" r="2.5" fill="hsl(var(--secondary))" />
          <circle cx="65%" cy="75%" r="2" fill="hsl(var(--primary))" />
        </svg>

        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
              <Activity className="w-3 h-3" /> Condition Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Osteoarthritis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Osteoarthritis (OA) is the most common form of arthritis in the UK, affecting over 8.75 million people. This comprehensive guide covers everything you need to know about living with and managing osteoarthritis.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      {/* ─── Key Stats ─── */}
      <section className="py-12 lg:py-16 bg-tint-green">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Osteoarthritis at a Glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="8.75" suffix="M" label="People affected in the UK" icon={<Users className="w-6 h-6" />} color="emerald" />
            <StatCounter value="50" suffix="+" label="Most common age of onset" icon={<Timer className="w-6 h-6" />} color="sky" />
            <StatCounter value="40" suffix="%" label="Pain reduction with exercise" icon={<TrendingUp className="w-6 h-6" />} color="amber" />
            <StatCounter value="5" suffix="%" label="Weight loss target for relief" icon={<Scale className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What Is Osteoarthritis?">
          <p>Osteoarthritis is a degenerative joint disease where the protective cartilage that cushions the ends of your bones gradually wears down over time. As cartilage deteriorates, bones begin to rub against each other, causing pain, swelling, stiffness, and reduced mobility.</p>
          <p>Unlike inflammatory types of arthritis, OA is primarily a mechanical condition — though inflammation does play a role, particularly during flare-ups. It most commonly affects the <strong>knees, hips, hands, and spine</strong>, but can occur in any joint.</p>
          <h3>How Common Is Osteoarthritis in the UK?</h3>
          <p>According to Versus Arthritis, approximately <strong>8.75 million people</strong> in the UK have sought treatment for osteoarthritis. It is the single most common cause of disability among older adults in England and Wales, and its prevalence is rising due to an ageing population and increasing obesity rates.</p>
        </Section>

        <Section icon={ThermometerSun} title="Symptoms of Osteoarthritis">
          <p>Symptoms typically develop slowly and worsen over time. They may include:</p>
          <ul>
            <li><strong>Joint pain</strong> — especially during or after activity, often described as a deep ache</li>
            <li><strong>Stiffness</strong> — particularly after rest or first thing in the morning (usually lasting less than 30 minutes)</li>
            <li><strong>Swelling</strong> — caused by inflammation of soft tissues around the joint</li>
            <li><strong>Tenderness</strong> — the joint may feel tender when light pressure is applied</li>
            <li><strong>Loss of flexibility</strong> — difficulty moving the joint through its full range</li>
            <li><strong>Grating sensation (crepitus)</strong> — a feeling or sound of bone rubbing on bone</li>
            <li><strong>Bone spurs</strong> — extra lumps of bone that form around the affected joint</li>
          </ul>
          <h3>When to See a GP</h3>
          <p>If you experience persistent joint pain or stiffness that doesn't improve, book an appointment with your GP. Early diagnosis can help you access the right support and slow progression.</p>
        </Section>

        <Section icon={Heart} title="Causes & Risk Factors">
          <p>Osteoarthritis develops when the cartilage protecting bone surfaces breaks down faster than it can repair itself. Several factors increase your risk:</p>
          <ul>
            <li><strong>Age</strong> — most common after age 50, though younger people can develop it after injury</li>
            <li><strong>Sex</strong> — women are more commonly affected, particularly after menopause</li>
            <li><strong>Obesity</strong> — excess weight places additional stress on weight-bearing joints; losing even 5% of body weight can significantly reduce knee pain</li>
            <li><strong>Previous joint injury</strong> — trauma from sports, accidents, or occupational overuse</li>
            <li><strong>Genetics</strong> — a family history increases risk</li>
            <li><strong>Repetitive stress</strong> — occupations involving repeated movements (kneeling, heavy lifting)</li>
            <li><strong>Other conditions</strong> — diabetes, metabolic disorders, and congenital joint issues</li>
          </ul>
        </Section>

        {/* ─── Risk Factor Chart ─── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 p-6 rounded-2xl bg-tint-amber border border-border/30">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Risk Factor Prevalence</h3>
          <HorizontalBar items={[
            { label: "Age over 50", value: 85, color: "hsl(var(--primary))" },
            { label: "Obesity / overweight", value: 72, color: "hsl(var(--amber))" },
            { label: "Previous joint injury", value: 58, color: "hsl(var(--sky))" },
            { label: "Female sex", value: 55, color: "hsl(var(--violet))" },
            { label: "Genetic factors", value: 40, color: "hsl(var(--emerald))" },
          ]} />
        </motion.div>

        <Section icon={Dumbbell} title="Best Exercises for Osteoarthritis">
          <p>Regular exercise is one of the most effective treatments for OA. It strengthens muscles around joints, improves flexibility, reduces pain, and helps manage weight. Always start gradually and consult a physiotherapist if unsure.</p>
          <h3>Aerobic / Low-Impact</h3>
          <ul>
            <li><strong>Walking</strong> — aim for 30 minutes most days; use supportive footwear</li>
            <li><strong>Swimming & water aerobics</strong> — buoyancy reduces joint stress while providing excellent exercise</li>
            <li><strong>Cycling</strong> — stationary or outdoor; gentle on knees and hips</li>
          </ul>
          <h3>Strengthening</h3>
          <ul>
            <li><strong>Straight-leg raises</strong> — strengthen quadriceps without stressing the knee</li>
            <li><strong>Wall sits</strong> — build leg strength gradually</li>
            <li><strong>Bridges</strong> — target glutes and core stability</li>
            <li><strong>Resistance bands</strong> — gentle, progressive strengthening</li>
          </ul>
          <h3>Flexibility & Balance</h3>
          <ul>
            <li><strong>Yoga</strong> — improves range of motion and mental well-being</li>
            <li><strong>Tai chi</strong> — evidence-based benefits for balance and pain reduction</li>
            <li><strong>Daily stretching</strong> — 5-10 minutes morning and evening</li>
          </ul>
        </Section>

        <Section icon={Apple} title="Best Diet for Osteoarthritis">
          <p>An <strong>anti-inflammatory diet</strong>, particularly the Mediterranean diet, is the most evidence-supported dietary approach for OA management. It can help reduce inflammation, manage weight, and improve overall joint health.</p>
          <h3>Foods to Eat</h3>
          <ul>
            <li><strong>Oily fish</strong> — salmon, mackerel, sardines (omega-3 fatty acids, at least twice weekly)</li>
            <li><strong>Colourful vegetables</strong> — broccoli, spinach, kale, peppers (antioxidants)</li>
            <li><strong>Berries</strong> — blueberries, strawberries, cherries (anthocyanins)</li>
            <li><strong>Olive oil</strong> — extra virgin (oleocanthal has anti-inflammatory properties)</li>
            <li><strong>Nuts & seeds</strong> — walnuts, almonds, flaxseeds</li>
            <li><strong>Whole grains</strong> — oats, brown rice, quinoa</li>
            <li><strong>Turmeric & ginger</strong> — natural anti-inflammatory compounds</li>
          </ul>
          <h3>Foods to Limit</h3>
          <ul>
            <li>Processed and ultra-processed foods</li>
            <li>Added sugars and sugary drinks</li>
            <li>Red and processed meats</li>
            <li>Refined carbohydrates</li>
            <li>Excessive alcohol</li>
          </ul>
        </Section>

        {/* ─── Quick Self-Management Tips ─── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Daily Self-Care Checklist</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <EmojiCard emoji="🚶" title="Stay Active" description="30 min walking daily" />
            <EmojiCard emoji="⚖️" title="Healthy Weight" description="Reduces knee pressure by 4× per lb" />
            <EmojiCard emoji="🐟" title="Eat Well" description="Omega-3 rich Mediterranean diet" />
            <EmojiCard emoji="😴" title="Sleep Well" description="7-9 hours for joint recovery" />
          </div>
        </motion.div>

        <Section icon={Pill} title="Treatment & Management">
          <p>While there is no cure for osteoarthritis, a combination of approaches can significantly improve quality of life:</p>
          <h3>Self-Management</h3>
          <ul>
            <li>Stay active with regular low-impact exercise</li>
            <li>Maintain a healthy weight</li>
            <li>Pace activities to avoid overloading joints</li>
            <li>Use heat or cold packs for symptom relief</li>
            <li>Try supportive aids (walking sticks, splints, shoe insoles)</li>
          </ul>
          <h3>Medical Treatments</h3>
          <ul>
            <li><strong>Paracetamol & NSAIDs</strong> — for pain and inflammation (topical NSAIDs preferred for knees/hands)</li>
            <li><strong>Physiotherapy</strong> — tailored exercise programmes and manual therapy</li>
            <li><strong>Steroid injections</strong> — for short-term relief during severe flare-ups</li>
            <li><strong>Joint replacement surgery</strong> — for severe cases when other treatments have not worked</li>
          </ul>
          <h3>Supplements</h3>
          <p>Glucosamine, chondroitin, and collagen supplements have some evidence for modest symptom relief, though results are mixed. Turmeric/curcumin (500-1000 mg/day) shows more consistent anti-inflammatory benefits. Always consult your GP before starting supplements.</p>
        </Section>

        {/* Live Blog & Stories — Advice & Guidance */}
        <ConditionBlogStrip
          conditionName="Osteoarthritis"
          matchCategories={["Exercise", "Nutrition", "Treatment"]}
        />

        {/* Contextual SEO links */}
        <ContextualLinks
          heading="Pair osteoarthritis care with the right resources"
          intro="Use these guides alongside your treatment — diet, exercise, flare-up planning and other arthritis types worth knowing about."
          groups={[
            {
              title: "Diet & supplements",
              links: [
                { label: "Best diet for osteoarthritis", to: "/diet" },
                { label: "Mediterranean diet pillar guide", to: "/guides/diet" },
                { label: "Foods to avoid with arthritis", to: "/blog/category/nutrition" },
                { label: "Glucosamine, collagen, turmeric — what works", to: "/blog/category/supplements" },
              ],
            },
            {
              title: "Exercise & movement",
              links: [
                { label: "Knee arthritis exercises", to: "/exercises" },
                { label: "Hip arthritis exercises", to: "/exercises" },
                { label: "Hand arthritis exercises", to: "/exercises" },
                { label: "Tai Chi for balance", to: "/exercises/tai-chi-for-balance" },
                { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
              ],
            },
            {
              title: "Flare-ups & support",
              links: [
                { label: "Managing arthritis flare-ups", to: "/arthritis-flare-ups" },
                { label: "Help while waiting for rheumatology", to: "/arthritis-waiting-list-help" },
                { label: "Community & peer support", to: "/community" },
                { label: "Browse the Advice Hub", to: "/blog-hub" },
              ],
            },
            {
              title: "Other conditions",
              links: [
                { label: "Knee arthritis", to: "/conditions/knee-arthritis" },
                { label: "Hand arthritis", to: "/conditions/hand-arthritis" },
                { label: "Shoulder arthritis", to: "/conditions/shoulder-arthritis" },
                { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
                { label: "Psoriatic arthritis", to: "/conditions/psoriatic-arthritis" },
                { label: "Gout", to: "/conditions/gout" },
                { label: "Ankylosing spondylitis", to: "/conditions/ankylosing-spondylitis" },
                { label: "Fibromyalgia", to: "/conditions/fibromyalgia" },
                { label: "Lupus (SLE)", to: "/conditions/lupus" },
              ],
            },
          ]}
        />

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Need more support?</h2>
          <p className="text-muted-foreground mb-5">Explore our resources, start a chat, or book a virtual physiotherapy consultation.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Start a chat
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
          <CrossLinkBanner preset="condition" exclude="/conditions/osteoarthritis" title="Explore related resources" />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default Osteoarthritis;
