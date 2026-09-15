import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextReadStrip from "@/components/NextReadStrip";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import RelatedArticles from "@/components/RelatedArticles";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import ReadNextCards from "@/components/ReadNextCards";
import ConditionSubpageLinks from "@/components/ConditionSubpageLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";

const BASE = "https://livingwitharthritis.org.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Osteoarthritis – Symptoms, Causes & Management | Living With Arthritis",
  "description": "Comprehensive guide to osteoarthritis (OA): symptoms, causes, risk factors, diagnosis, treatment options, exercises, diet and self-management tips for UK patients.",
  "url": `${BASE}/conditions/osteoarthritis`,
  "inLanguage": "en-GB",
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "datePublished": "2025-06-01",
  "dateModified": "2025-12-15",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/og/landing-share.png` } },
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
      <title>Osteoarthritis in the UK: symptoms, treatment &amp; exercises</title>
      <meta name="description" content="Osteoarthritis (OA) in the UK: how to recognise symptoms, when to see a GP, NICE-aligned treatment, exercises and diet — written for patients." />
      <meta name="keywords" content="osteoarthritis, osteoarthritis symptoms, osteoarthritis treatment, osteoarthritis exercises, osteoarthritis diet, OA, degenerative joint disease, knee arthritis, hip arthritis, hand arthritis, joint pain relief, what causes arthritis, is arthritis curable, difference between osteoarthritis and rheumatoid arthritis, anti-inflammatory diet, arthritis medication, mobility aids for arthritis, musculoskeletal conditions" />
      <meta property="og:title" content="Osteoarthritis – Symptoms, Causes & Management" />
      <meta property="og:description" content="Osteoarthritis treatment & management: Degenerative joint disease explained. Learn about medications, injections, surgery & lifestyle strategies." />
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
      <meta name="twitter:description" content="Osteoarthritis treatment & management: Degenerative joint disease explained. Learn about medications, injections, surgery & lifestyle strategies." />
      <meta name="twitter:image" content={`${BASE}/images/og-osteoarthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={`${BASE}/conditions/osteoarthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": `${BASE}/conditions/osteoarthritis`,
        "inLanguage": "en-GB",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] }
      })}</script>
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
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Activity className="w-3 h-3" /> Condition Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              Osteoarthritis: UK symptoms, treatment and exercises
            </h1>
            <LastReviewed date={LAST_REVIEWED_ISO} className="mb-5" />
            <AeoEnhancement route="/conditions/osteoarthritis" />
            <p className="speakable-intro text-lg text-muted-foreground leading-relaxed">
              Osteoarthritis (OA) is the most common form of arthritis in the UK — joint pain and stiffness that you can often manage with exercise, weight advice and NHS care pathways; this page is general information, not a diagnosis.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <AnswerBox
          question="What is the best treatment for osteoarthritis?"
          reviewed="2026-06-13"
        >
          <p>
            NICE recommends tailored therapeutic exercise for everyone with
            osteoarthritis and weight management where appropriate. Other
            options depend on the joint, symptoms and other health conditions,
            and can include topical anti-inflammatory medicines,
            physiotherapy and, for severe symptoms that have not improved,
            referral to discuss joint surgery.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />
      </section>

      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" role="main" tabIndex={-1} className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Activity} title="What Is Osteoarthritis?">
          <p>Osteoarthritis is a degenerative joint disease where the protective cartilage that cushions the ends of your bones gradually wears down over time. As cartilage deteriorates, bones begin to rub against each other, causing pain, swelling, stiffness, and reduced mobility.</p>
          <p>Unlike inflammatory types of arthritis, OA is primarily a mechanical condition — though inflammation does play a role, particularly during flare-ups. It most commonly affects the <strong>knees, hips, hands, and spine</strong>, but can occur in any joint.</p>
          <h3>How Common Is Osteoarthritis in the UK?</h3>
          <p>According to Versus Arthritis, approximately <strong>8.75 million people</strong> in the UK have sought treatment for osteoarthritis. It is the single most common cause of disability among older adults in England and Wales, and its prevalence is rising due to an ageing population and increasing obesity rates.</p>
        </Section>

        <Section icon={ThermometerSun} title="What are the symptoms of osteoarthritis?">
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

        <Section icon={Heart} title="What causes osteoarthritis?">
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

        <Section icon={Dumbbell} title="What are the best exercises for osteoarthritis?">
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

        <Section icon={Apple} title="What is the best diet for osteoarthritis?">
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
            <EmojiCard emoji="🚶" title="Stay Active" description="Regular low-impact exercise like walking, swimming, or cycling strengthens muscles and reduces joint pain." />
            <EmojiCard emoji="⚖️" title="Healthy Weight" description="Losing just 5% of body weight can significantly reduce pain in knees, hips, and other weight-bearing joints." />
            <EmojiCard emoji="🐟" title="Eat Well" description="An anti-inflammatory Mediterranean diet rich in fish, vegetables, and olive oil helps manage symptoms." />
            <EmojiCard emoji="😴" title="Sleep Well" description="Good sleep supports healing and pain management. Use pillows to support affected joints at night." />
          </div>
        </motion.div>

        <Section icon={Pill} title="How is osteoarthritis treated?">
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

        <Section icon={Pill} title="The Osteoarthritis Journey: From Diagnosis to Management">
          <p>Osteoarthritis is the most common form of arthritis — a degenerative, wear-related condition that develops slowly over years. Most people first notice deep joint ache after activity, morning stiffness that eases within 30 minutes, and a gradual loss of range of movement. Diagnosis is usually clinical, supported by X-ray when needed.</p>
          <p>Management is a journey, not a single decision. Conservative care — exercise, weight optimisation, an anti-inflammatory diet, pacing and supportive aids — is the foundation for everyone. If symptoms progress, escalation can include topical or oral anti-inflammatories, physiotherapy-led rehabilitation, injections, and, when conservative care has been exhausted, joint replacement surgery. Decisions are shared between you, your GP, physiotherapist and (if needed) an orthopaedic surgeon.</p>
          <h3>Common OA Interventions</h3>
          <ul>
            <li><strong>Unloader knee braces</strong> — offload the affected compartment in medial knee OA</li>
            <li><strong>Imaging</strong> — X-ray, MRI or ultrasound when red flags or surgical planning warrant it</li>
            <li><strong>Viscosupplementation</strong> — hyaluronic acid (gel) injections, often for knee OA</li>
            <li><strong>Corticosteroid injections</strong> — short-term flare control</li>
            <li><strong>Joint replacement surgery</strong> — knee, hip or thumb replacement for end-stage OA</li>
            <li><strong>Regenerative medicine</strong> — platelet-rich plasma (PRP) and stem-cell options, where evidence is still developing</li>
          </ul>
          <p>For exercise programmes see our <Link to="/exercises" className="text-primary underline">exercise hub</Link> or the joint-specific <Link to="/guides/hip-exercises-for-osteoarthritis" className="text-primary underline">hip osteoarthritis exercise routine</Link>. For nutrition strategy see our <Link to="/guides/diet" className="text-primary underline">diet guide</Link> and <Link to="/diet/foods-to-avoid-with-arthritis" className="text-primary underline">foods to avoid with arthritis</Link>.</p>
          <p className="text-sm text-muted-foreground italic">Educational information only — we don&apos;t endorse specific brands, devices or providers. Always discuss treatment escalation with your clinician.</p>
        </Section>

        <section className="mb-12" aria-labelledby="osteoarthritis-sources">
          <h2
            id="osteoarthritis-sources"
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5"
          >
            Sources and further guidance
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.nice.org.uk/guidance/ng226"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                NICE NG226: Osteoarthritis in over 16s
              </a>
            </li>
            <li>
              <a
                href="https://www.nhs.uk/conditions/osteoarthritis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                NHS: Osteoarthritis
              </a>
            </li>
          </ul>
        </section>

        {/* Live Blog & Stories — Advice & Guidance */}
        <ConditionBlogStrip
          conditionName="Osteoarthritis"
          matchCategories={["Exercise", "Nutrition", "Treatment"]}
        />

        {/* Contextual SEO links */}
        <ConditionSubpageLinks conditionSlug="osteoarthritis" conditionName="Osteoarthritis" />

        {/* Contextual SEO links */}
        <ContextualLinks
          heading="Pair osteoarthritis care with the right resources"
          intro="Use these guides alongside your treatment — diet, exercise, flare-up planning and other arthritis types worth knowing about."
          groups={[
            {
              title: "Diet & supplements",
              links: [
                { label: "Anti-inflammatory diet for arthritis", to: "/blog/anti-inflammatory-diet" },
                { label: "Mediterranean diet pillar guide", to: "/guides/diet" },
                { label: "Foods to avoid with arthritis", to: "/diet/foods-to-avoid-with-arthritis" },
                { label: "Glucosamine, collagen, turmeric — what works", to: "/supplements/glucosamine" },
              ],
            },
            {
              title: "Exercise & movement",
              links: [
                { label: "Knee arthritis exercises", to: "/blog/knee-arthritis-exercises-uk" },
                { label: "Hip arthritis exercises", to: "/guides/hip-exercises-for-osteoarthritis" },
                { label: "Hand arthritis exercises", to: "/exercises" },
                { label: "Tai Chi for arthritis", to: "/exercises/tai-chi-for-arthritis" },
                { label: "Cycling with arthritis", to: "/blog/arthritis-and-cycling-uk" },
                { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
              ],
            },
            {
              title: "Medical treatments",
              links: [
                { label: "Arthritis medication guide", to: "/blog/arthritis-medication-guide" },
                { label: "NSAIDs and paracetamol comparison", to: "/guides/paracetamol-vs-ibuprofen-for-arthritis" },
                { label: "Joint replacement surgery", to: "/blog/joint-replacement-surgery" },
                { label: "TENS machines for arthritis pain", to: "/blog/tens-machines-arthritis-uk" },
              ],
            },
            {
              title: "Flare-ups & support",
              links: [
                { label: "Managing arthritis flare-ups", to: "/arthritis-flare-ups" },
                { label: "Help while waiting for rheumatology", to: "/arthritis-waiting-list-help" },
                { label: "Community & peer support", to: "/community" },
                { label: "Browse the Advice Hub", to: "/blog-hub" },
                { label: "Osteoarthritis library note", to: "/library/osteoarthritis" },
                { label: "What is osteoarthritis? FAQ", to: "/faq/what-is-osteoarthritis" },
                { label: "OA vs RA FAQ", to: "/faq/osteoarthritis-vs-rheumatoid-arthritis" },
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
          
      <EducationalDisclaimerBox />
      <TopicClusterNav path="/conditions/osteoarthritis" />
<CrossLinkBanner preset="condition" exclude="/conditions/osteoarthritis" title="Explore related resources" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <RelatedArticles
            currentSlug=""
            currentCategory="Osteoarthritis"
            clusters={["knee-oa", "hip-oa", "exercise", "diet"]}
            heading="Related arthritis reading"
          />
        </div>
      </main>
      <InternalLinks />
      <NextReadStrip currentPath="/conditions/osteoarthritis" />
      <Footer />
    </div>
  </>
);

export default Osteoarthritis;
