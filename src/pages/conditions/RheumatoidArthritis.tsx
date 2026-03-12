import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ShieldAlert, BookOpen, ArrowRight, Shield, Users, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard, ComparisonCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";

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

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Conditions", "item": `${BASE}/#conditions` },
    { "@type": "ListItem", "position": 3, "name": "Rheumatoid Arthritis", "item": `${BASE}/conditions/rheumatoid-arthritis` }
  ]
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
      <title>Rheumatoid Arthritis – Symptoms, Causes & Treatment | Living With Arthritis</title>
      <meta name="description" content="Comprehensive UK guide to rheumatoid arthritis: autoimmune joint inflammation symptoms, early diagnosis, DMARD and biologic treatments, exercises and dietary advice." />
      <meta name="keywords" content="rheumatoid arthritis, rheumatoid arthritis symptoms, rheumatoid arthritis treatment, RA, autoimmune arthritis, DMARDs, biologic therapy, rheumatoid arthritis UK, joint inflammation, rheumatoid arthritis diet" />
      <meta property="og:title" content="Rheumatoid Arthritis – Symptoms, Causes & Treatment" />
      <meta property="og:description" content="Complete UK guide to rheumatoid arthritis: symptoms, diagnosis, modern treatments and self-management." />
      <meta property="og:url" content={`${BASE}/conditions/rheumatoid-arthritis`} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Rheumatoid Arthritis – Symptoms, Causes & Treatment" />
      <meta name="twitter:description" content="Complete UK guide to rheumatoid arthritis: symptoms, diagnosis, modern treatments and self-management." />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={`${BASE}/conditions/rheumatoid-arthritis`} />
      <link rel="alternate" hrefLang="en-GB" href={`${BASE}/conditions/rheumatoid-arthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-600 text-xs font-bold tracking-wider uppercase border border-sky-500/20">
            <Shield className="w-3.5 h-3.5" /> Autoimmune Condition
          </span>
        }
        title={<>Rheumatoid <span className="text-gradient">Arthritis</span></>}
        subtitle="Rheumatoid arthritis (RA) affects around 400,000 people in the UK. Unlike osteoarthritis, RA is an autoimmune condition where the body's immune system attacks the joints. Early diagnosis and treatment are crucial for the best outcomes."
        gradient="from-sky-500/8 via-background to-violet-500/5"
        pattern="grid"
      >
        <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
        </Link>
      </PageHero>
      {/* ─── RA Key Stats ─── */}
      <section className="py-12 lg:py-16 bg-tint-blue">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-sky-600 mb-6">Rheumatoid Arthritis at a Glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="400K" label="People with RA in the UK" icon={<Users className="w-6 h-6" />} color="sky" />
            <StatCounter value="3×" label="More common in women" icon={<Heart className="w-6 h-6" />} color="rose" />
            <StatCounter value="12" suffix=" wks" label="Window of opportunity for treatment" icon={<Clock className="w-6 h-6" />} color="amber" />
            <StatCounter value="30" suffix="+" label="Minutes morning stiffness" icon={<AlertCircle className="w-6 h-6" />} color="violet" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">

        <Section icon={Activity} title="What Is Rheumatoid Arthritis?">
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

        <Section icon={ShieldAlert} title="Symptoms of Rheumatoid Arthritis">
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

        <Section icon={Heart} title="Causes & Risk Factors">
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

        <Section icon={Pill} title="Treatment Options">
          <p>Modern treatment aims to achieve <strong>remission</strong> — a state where the disease is controlled and no active inflammation is present. The UK follows a <strong>"treat to target"</strong> approach.</p>
          <h3>DMARDs (Disease-Modifying Anti-Rheumatic Drugs)</h3>
          <p><strong>Methotrexate</strong> is usually the first-line treatment, often combined with other DMARDs like sulfasalazine or hydroxychloroquine. DMARDs slow disease progression and prevent joint damage — they are the cornerstone of RA treatment.</p>
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

        <Section icon={Dumbbell} title="Exercise for Rheumatoid Arthritis">
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

        <Section icon={Apple} title="Diet & Nutrition">
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

        {/* Related Articles */}
        <section className="mt-16 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Related Articles</h2>
          </div>
          <div className="grid gap-3">
            {[
              { href: "/blog/rheumatoid-arthritis-diet-uk", title: "Best Diet for Rheumatoid Arthritis UK", desc: "Evidence-based anti-inflammatory nutrition guide for RA" },
              { href: "/blog/arthritis-and-omega-3-fish-oil", title: "Omega-3 & Fish Oil for Arthritis", desc: "How omega-3 fatty acids reduce RA inflammation" },
              { href: "/blog/arthritis-fatigue-management", title: "Managing Arthritis Fatigue", desc: "Why RA makes you exhausted and strategies to cope" },
              { href: "/blog/yoga-for-arthritis-beginners", title: "Yoga for Arthritis Beginners", desc: "Gentle modified yoga for joint flexibility and well-being" },
              { href: "/blog/arthritis-and-pregnancy-uk", title: "Arthritis & Pregnancy UK", desc: "Managing RA before, during and after pregnancy" },
              { href: "/blog/arthritis-flare-up-management", title: "Managing Arthritis Flare-Ups", desc: "Strategies for coping when symptoms worsen" },
            ].map((a) => (
              <Link key={a.href} to={a.href} className="group flex items-center justify-between gap-4 rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
                <div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{a.title}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{a.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Other Conditions */}
        <section className="mb-12">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Explore Other Conditions</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/conditions/osteoarthritis" className="group rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Osteoarthritis →</span>
              <span className="block text-xs text-muted-foreground mt-0.5">Degenerative joint disease: symptoms, exercises & diet</span>
            </Link>
            <Link to="/conditions/psoriatic-arthritis" className="group rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Psoriatic Arthritis →</span>
              <span className="block text-xs text-muted-foreground mt-0.5">Joint and skin condition: symptoms, treatment & support</span>
            </Link>
          </div>
        </section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Living well with RA</h2>
          <p className="text-muted-foreground mb-5">Early diagnosis and treatment can achieve remission. Explore our resources or speak with our AI assistant for personalised guidance.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Chat with our AI assistant
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default RheumatoidArthritis;
