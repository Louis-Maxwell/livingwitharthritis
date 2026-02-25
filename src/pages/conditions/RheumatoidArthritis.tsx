import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

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
      <meta property="og:locale" content="en_GB" />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={`${BASE}/conditions/rheumatoid-arthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
        <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-8 hover:gap-2.5 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 mb-3 block">Condition Guide</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Rheumatoid Arthritis
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Rheumatoid arthritis (RA) affects around 400,000 people in the UK. Unlike osteoarthritis, RA is an autoimmune condition where the body's immune system attacks the joints. Early diagnosis and treatment are crucial for the best outcomes.
          </p>
        </motion.div>

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

        <div className="mt-16 p-8 rounded-2xl bg-accent border border-border/30">
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
      <Footer />
    </div>
  </>
);

export default RheumatoidArthritis;
