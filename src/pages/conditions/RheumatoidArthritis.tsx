import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ShieldAlert, BookOpen, ArrowRight, Shield, Users, Clock, AlertCircle, Timer } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { StatCounter, WaveDivider, ComparisonCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import RelatedArticles from "@/components/RelatedArticles";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import ConditionSubpageLinks from "@/components/ConditionSubpageLinks";
import ReadNextCards from "@/components/ReadNextCards";
import LastReviewed, { LAST_REVIEWED_ISO } from "@/components/LastReviewed";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import AnswerBox from "@/components/seo/AnswerBox";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import ArticleFaqSection from "@/components/article/ArticleFaqSection";

const BASE = "https://livingwitharthritis.org.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Rheumatoid Arthritis – Symptoms, Causes & Treatment | Living With Arthritis",
  "description": "Complete guide to rheumatoid arthritis (RA): an autoimmune condition causing joint inflammation. Learn about symptoms, diagnosis, treatment, exercises and diet for UK patients.",
  "url": `${BASE}/conditions/rheumatoid-arthritis`,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2025-12-15",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Rheumatoid Arthritis",
    "alternateName": ["RA", "Rheumatoid Disease"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Synovial joints (hands, wrists, feet, knees)" },
    "riskFactor": ["Female sex", "Genetics (HLA-DR4)", "Smoking", "Age 30-60", "Obesity"],
    "signOrSymptom": ["Symmetrical joint pain", "Morning stiffness over 30 minutes", "Fatigue", "Joint swelling", "Joint deformity"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "DMARDs (Disease-Modifying Anti-Rheumatic Drugs)" },
      { "@type": "MedicalTherapy", "name": "Biologic therapies" },
      { "@type": "MedicalTherapy", "name": "Physical therapy" },
      { "@type": "MedicalTherapy", "name": "Anti-inflammatory diet" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": `${BASE}/conditions/rheumatoid-arthritis`
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is rheumatoid arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Rheumatoid arthritis (RA) is a chronic autoimmune disease where the immune system mistakenly attacks the lining of the joints (synovium), causing inflammation, pain, swelling, and eventually joint damage." } },
    { "@type": "Question", "name": "How is rheumatoid arthritis different from osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Unlike osteoarthritis which is a wear-and-tear condition, RA is an autoimmune disease. RA typically affects joints symmetrically, causes prolonged morning stiffness (over 30 minutes), and can affect other organs. OA is localised and caused by cartilage breakdown." } },
    { "@type": "Question", "name": "What is the best treatment for rheumatoid arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Early treatment with DMARDs (disease-modifying anti-rheumatic drugs) such as methotrexate is the gold standard. Biologic therapies may be added if DMARDs alone aren't sufficient. Exercise, diet, and stress management also play important roles." } },
    { "@type": "Question", "name": "Can rheumatoid arthritis be cured?", "acceptedAnswer": { "@type": "Answer", "text": "There is currently no cure, but early aggressive treatment can achieve remission in many patients. Modern therapies have dramatically improved outcomes, allowing many people with RA to lead active, fulfilling lives." } },
    { "@type": "Question", "name": "Does diet affect rheumatoid arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. An anti-inflammatory Mediterranean diet rich in omega-3 fatty acids, fruits, vegetables, and whole grains can help reduce inflammation and complement medical treatment. Some patients also find benefit from eliminating specific trigger foods." } }
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

const RheumatoidArthritis = () => (
  <>
    <Helmet>
      <title>Rheumatoid Arthritis: Symptoms, Causes & Treatment (UK)</title>
      <meta name="description" content="Rheumatoid arthritis treatment: Inflammatory arthritis guide covering medications, flare management & achieving remission. Expert care plan." />
      <meta name="keywords" content="rheumatoid arthritis, what is rheumatoid arthritis, rheumatoid arthritis symptoms, rheumatoid arthritis treatment, RA, autoimmune arthritis, DMARDs, methotrexate, biologic therapy, rheumatoid arthritis UK, rheumatoid arthritis diet, anti-inflammatory diet, difference between osteoarthritis and rheumatoid arthritis, is rheumatoid arthritis curable, early signs of RA, rheumatoid arthritis hands, joint inflammation" />
      <meta property="og:title" content="Rheumatoid Arthritis – Symptoms, Causes & Treatment" />
      <meta property="og:description" content="Rheumatoid arthritis treatment: Inflammatory arthritis guide covering medications, flare management & achieving remission. Expert care plan." />
      <meta property="og:url" content={`${BASE}/conditions/rheumatoid-arthritis`} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-rheumatoid-arthritis.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Rheumatoid Arthritis – Symptoms, Causes & Treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Rheumatoid Arthritis – Symptoms, Causes & Treatment" />
      <meta name="twitter:description" content="Rheumatoid arthritis treatment: Inflammatory arthritis guide covering medications, flare management & achieving remission. Expert care plan." />
      <meta name="twitter:image" content={`${BASE}/images/og-rheumatoid-arthritis.webp`} />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={`${BASE}/conditions/rheumatoid-arthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Rheumatoid Arthritis" }]} />
      <PageHero
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
            <Shield className="w-3.5 h-3.5" /> Autoimmune Condition
          </span>
        }
        title={<>Rheumatoid <span className="text-gradient">Arthritis</span></>}
        subtitle="Rheumatoid arthritis (RA) affects around 400,000 people in the UK. Unlike osteoarthritis, RA is an autoimmune condition where the body's immune system attacks the joints. Early diagnosis and treatment are crucial for the best outcomes."
        gradient="from-primary/8 via-background to-primary/5"
        pattern="grid"
      >
        <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
        </Link>
      </PageHero>
      <section className="container mx-auto px-6 md:px-10 max-w-3xl pt-10">
        <LastReviewed date={LAST_REVIEWED_ISO} className="mb-6" />
        <AnswerBox
          question="What is the best treatment for rheumatoid arthritis?"
          reviewed="2026-06-13"
        >
          <p>
            UK rheumatology guidelines recommend starting a <strong>DMARD</strong> — usually
            <strong> methotrexate</strong> — within 12 weeks of diagnosis to slow joint damage,
            often combined with a short steroid course to settle inflammation. If response is
            poor, a <strong>biologic or JAK inhibitor</strong> is added. Early aggressive
            treatment, regular blood monitoring and physiotherapy give the best long-term joint
            function.
          </p>
        </AnswerBox>
        <MedicalReviewBadge compact reviewer="Maxwell" title="First Contact Practitioner" credential="HCPC PH128483" date="June 2026" />
      </section>
      {/* ─── RA Key Stats ─── */}
      <section className="py-12 lg:py-16 bg-tint-blue">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-primary mb-6">Rheumatoid Arthritis at a Glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="400K" label="People with RA in the UK" icon={<Users className="w-6 h-6" />} color="sky" />
            <StatCounter value="3×" label="More common in women" icon={<Heart className="w-6 h-6" />} color="rose" />
            <StatCounter value="12" suffix=" wks" label="Window of opportunity for treatment" icon={<Clock className="w-6 h-6" />} color="amber" />
            <StatCounter value="30" suffix="+" label="Minutes morning stiffness" icon={<AlertCircle className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">

        <Section icon={Activity} title="What is rheumatoid arthritis?">
          <p>Rheumatoid arthritis is a chronic autoimmune disease in which the immune system mistakenly attacks the <strong>synovium</strong> — the lining of the membranes that surround your joints. This causes inflammation that can eventually destroy cartilage and bone within the joint.</p>
          <p>RA typically affects joints <strong>symmetrically</strong> — if one wrist is affected, the other usually is too. It most commonly begins in the small joints of the hands, wrists, and feet, but can affect larger joints and even other body systems including the skin, eyes, lungs, heart, and blood vessels.</p>
          <h3>RA vs Osteoarthritis: Key Differences</h3>
          <ul>
            <li><strong>Cause:</strong> RA is autoimmune; OA is degenerative wear-and-tear</li>
            <li><strong>Pattern:</strong> RA is symmetrical; OA often affects one side more</li>
            <li><strong>Morning stiffness:</strong> RA lasts over 30 minutes; OA usually under 30 minutes</li>
            <li><strong>Age of onset:</strong> RA can start at any age (commonly 30-60); OA typically after 50</li>
            <li><strong>Systemic effects:</strong> RA can affect organs; OA is localised to joints</li>
          </ul>
        </Section>

        {/* ─── RA vs OA Visual Comparison ─── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <ComparisonCard
            leftTitle="Rheumatoid Arthritis"
            rightTitle="Osteoarthritis"
            rows={[
              { label: "Cause", left: "Autoimmune attack on joints", right: "Wear-and-tear cartilage loss" },
              { label: "Pattern", left: "Symmetrical (both sides)", right: "Often one side or localised" },
              { label: "Stiffness", left: "30+ minutes, often hours", right: "Usually under 30 minutes" },
              { label: "Onset", left: "Any age (commonly 30–60)", right: "Typically after age 50" },
            ]}
          />
        </motion.div>

        <Section icon={ShieldAlert} title="What are the symptoms of rheumatoid arthritis?">
          <p>RA symptoms can vary in severity and may come and go in periods called flares. Common symptoms include:</p>
          <ul>
            <li><strong>Joint pain and swelling</strong> — warm, tender joints, especially in hands, wrists, and feet</li>
            <li><strong>Prolonged morning stiffness</strong> — lasting more than 30 minutes, often hours</li>
            <li><strong>Fatigue</strong> — persistent tiredness and lack of energy</li>
            <li><strong>Symmetrical joint involvement</strong> — both sides of the body affected equally</li>
            <li><strong>Rheumatoid nodules</strong> — firm lumps under the skin near affected joints</li>
            <li><strong>General malaise</strong> — feeling unwell, flu-like symptoms during flares</li>
            <li><strong>Weight loss</strong> — unexplained weight loss in early stages</li>
          </ul>
          <h3>Early Warning Signs</h3>
          <p>See your GP urgently if you experience persistent joint swelling, morning stiffness lasting over 30 minutes, or fatigue with joint symptoms. Early treatment within the first 12 weeks of symptoms (<strong>"window of opportunity"</strong>) dramatically improves long-term outcomes.</p>
        </Section>

        <Section icon={Heart} title="What causes rheumatoid arthritis?">
          <p>The exact cause of RA is unknown, but it involves a combination of genetic and environmental factors:</p>
          <ul>
            <li><strong>Genetics</strong> — the HLA-DR4 gene increases susceptibility; family history raises risk</li>
            <li><strong>Sex</strong> — women are 2-3 times more likely to develop RA than men</li>
            <li><strong>Smoking</strong> — the single most significant modifiable risk factor; smokers have higher risk and more severe disease</li>
            <li><strong>Age</strong> — can occur at any age but most commonly starts between 30 and 60</li>
            <li><strong>Obesity</strong> — increases risk and can reduce treatment effectiveness</li>
            <li><strong>Hormonal factors</strong> — changes in hormone levels (pregnancy, menopause) can influence RA</li>
          </ul>
        </Section>

        <Section icon={BookOpen} title="How is rheumatoid arthritis diagnosed?">
          <p>There is no single test for RA — diagnosis combines symptoms, blood tests and imaging. If you have persistent joint swelling or morning stiffness lasting over 30 minutes, your GP will usually refer you to a rheumatologist.</p>
          <h3>Blood tests</h3>
          <ul>
            <li><strong>Rheumatoid factor (RF)</strong> — an antibody present in around 70-80% of people with RA, though it can also be positive in other conditions or absent in early disease</li>
            <li><strong>Anti-CCP antibodies</strong> — more specific to RA than RF and can appear years before symptoms start</li>
            <li><strong>ESR and CRP</strong> — inflammatory markers that rise during active disease and help track flares</li>
          </ul>
          <h3>Imaging</h3>
          <p><strong>X-rays</strong> can show joint space narrowing and bone erosion, though early RA often looks normal on X-ray. <strong>Ultrasound</strong> and <strong>MRI</strong> are more sensitive and can detect synovitis (joint lining inflammation) before permanent damage occurs — useful for catching RA early, within the "window of opportunity."</p>
          <p>A rheumatologist confirms diagnosis using a combination of these results alongside the pattern and duration of your symptoms, since no single blood test or scan is diagnostic on its own.</p>
        </Section>

        <Section icon={Pill} title="How is rheumatoid arthritis treated?">
          <p>Modern treatment aims to achieve <strong>remission</strong> — a state where the disease is controlled and no active inflammation is present. The UK follows a <strong>"treat to target"</strong> approach.</p>
          <h3>DMARDs (Disease-Modifying Anti-Rheumatic Drugs)</h3>
          <p><strong>Methotrexate</strong> is usually the first-line treatment, often combined with other DMARDs like sulfasalazine or hydroxychloroquine. If first-line DMARDs are not tolerated or effective, <a href="/guides/azathioprine-for-arthritis"><strong>azathioprine</strong></a> may be used as an alternative immunosuppressant DMARD. DMARDs slow disease progression and prevent joint damage — they are the cornerstone of RA treatment.</p>
          <h3>Biologic Therapies</h3>
          <p>If DMARDs alone are insufficient, <strong>biologic therapies</strong> (anti-TNF drugs, rituximab, tocilizumab, abatacept) or <strong>JAK inhibitors</strong> (tofacitinib, baricitinib) may be prescribed. These target specific parts of the immune system driving inflammation.</p>
          <h3>Symptom Relief</h3>
          <ul>
            <li><strong>NSAIDs</strong> — reduce pain and inflammation</li>
            <li><strong>Corticosteroids</strong> — short-term use during flares (oral or injection)</li>
            <li><strong>Physiotherapy</strong> — maintain joint function and strength</li>
            <li><strong>Occupational therapy</strong> — adapt daily activities to protect joints</li>
          </ul>
        </Section>

        <Section icon={Dumbbell} title="What exercises help rheumatoid arthritis?">
          <p>Exercise is safe and beneficial for RA — it reduces fatigue, improves mood, and maintains joint function. The key is choosing appropriate activities and adapting intensity during flares.</p>
          <ul>
            <li><strong>Hydrotherapy / swimming</strong> — warm water eases stiffness; buoyancy protects joints</li>
            <li><strong>Walking</strong> — start with short distances and gradually increase</li>
            <li><strong>Gentle yoga</strong> — focus on modified poses; avoid extreme positions during flares</li>
            <li><strong>Hand exercises</strong> — maintain grip strength and dexterity</li>
            <li><strong>Strength training</strong> — light weights, higher repetitions, avoiding inflamed joints</li>
            <li><strong>Range of motion exercises</strong> — daily gentle stretches to preserve flexibility</li>
          </ul>
          <p><strong>During flares:</strong> reduce intensity but try to maintain some gentle movement. Complete rest can worsen stiffness. Listen to your body and work with your physiotherapist.</p>
        </Section>

        <Section icon={Apple} title="What foods help rheumatoid arthritis?">
          <p>While no diet can cure RA, anti-inflammatory eating patterns can complement medical treatment and help manage symptoms:</p>
          <h3>Recommended</h3>
          <ul>
            <li><strong>Oily fish</strong> — salmon, mackerel, sardines (omega-3s reduce inflammation)</li>
            <li><strong>Fruits & vegetables</strong> — wide variety for antioxidants</li>
            <li><strong>Olive oil</strong> — extra virgin, rich in anti-inflammatory oleocanthal</li>
            <li><strong>Turmeric</strong> — curcumin has evidence-based anti-inflammatory effects</li>
            <li><strong>Green tea</strong> — polyphenols may help modulate immune response</li>
          </ul>
          <h3>Foods to Limit</h3>
          <ul>
            <li>Processed foods and refined sugars (promote inflammation)</li>
            <li>Excessive red meat</li>
            <li>Alcohol (can interact with RA medications, particularly methotrexate)</li>
            <li>Trans fats and fried foods</li>
          </ul>
          <p><strong>Important:</strong> If you are on methotrexate, discuss alcohol intake and folic acid supplementation with your rheumatologist.</p>
        </Section>

        <ArticleFaqSection
          faqs={faqLd.mainEntity.map((f) => ({
            question: f.name,
            answer: f.acceptedAnswer.text,
          }))}
        />

        {/* Live Blog & Stories — Advice & Guidance */}
        <ConditionBlogStrip
          conditionName="Rheumatoid Arthritis"
          matchCategories={["Treatment", "Health", "Lifestyle"]}
        />

        <ConditionSubpageLinks conditionSlug="rheumatoid-arthritis" conditionName="Rheumatoid Arthritis" />

        <ContextualLinks
          heading="Pair rheumatoid arthritis care with the right resources"
          intro="Combine your medication plan with diet, exercise, flare-up support and the wider arthritis community."
          groups={[
            {
              title: "Diet & supplements",
              links: [
                { label: "Best diet for rheumatoid arthritis", to: "/diet" },
                { label: "Mediterranean diet pillar guide", to: "/guides/diet" },
                { label: "Foods to avoid with arthritis", to: "/blog/category/nutrition" },
                { label: "Turmeric, omega-3 and collagen — what works", to: "/blog/category/supplements" },
              ],
            },
            {
              title: "Exercise & movement",
              links: [
                { label: "Arthritis-friendly exercises", to: "/exercises" },
                { label: "Hand & wrist exercises for RA", to: "/exercises" },
                { label: "Tai Chi for balance & stiffness", to: "/exercises/tai-chi-for-balance" },
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
                { label: "Osteoarthritis", to: "/conditions/osteoarthritis" },
                { label: "Psoriatic arthritis", to: "/conditions/psoriatic-arthritis" },
                { label: "Ankylosing spondylitis", to: "/conditions/ankylosing-spondylitis" },
                { label: "Lupus (SLE)", to: "/conditions/lupus" },
                { label: "Fibromyalgia", to: "/conditions/fibromyalgia" },
                { label: "Juvenile arthritis", to: "/conditions/juvenile-arthritis" },
              ],
            },
          ]}
        />

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">How do you live well with rheumatoid arthritis?</h2>
          <p className="text-muted-foreground mb-5">Early diagnosis and treatment can achieve remission. Explore our resources or start a chat for personalised guidance.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Start a chat
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
          <ReadNextCards
            heading="Read next on rheumatoid arthritis"
            subheading="The most useful next steps if you found this guide helpful."
            items={[
              {
                to: "/exercises",
                eyebrow: "Self-help",
                title: "Safe exercises for RA",
                description: "Gentle movement that protects joints during flares and builds strength between them.",
                readTime: "5 min",
                icon: Dumbbell,
                tint: "bg-tint-emerald",
                accent: "text-primary",
              },
              {
                to: "/diet",
                eyebrow: "Nutrition",
                title: "Anti-inflammatory diet for RA",
                description: "Mediterranean and omega-3 rich foods that may reduce inflammation and stiffness.",
                readTime: "6 min",
                icon: Apple,
                tint: "bg-tint-amber",
                accent: "text-primary",
              },
              {
                to: "/tools/waiting-time-calculator",
                eyebrow: "Free tool",
                title: "rheumatology waiting time",
                description: "Early RA referral matters — estimate your local 2026 wait and act fast.",
                readTime: "2 min",
                icon: Timer,
                tint: "bg-tint-sky",
                accent: "text-primary",
              },
            ]}
          />
          <CrossLinkBanner preset="condition" exclude="/conditions/rheumatoid-arthritis" title="Explore related resources" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <RelatedArticles
            currentSlug=""
            currentCategory="Rheumatoid Arthritis"
            clusters={["rheumatoid", "flare-ups", "diet", "supplements"]}
            heading="Related arthritis reading"
          />
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default RheumatoidArthritis;
